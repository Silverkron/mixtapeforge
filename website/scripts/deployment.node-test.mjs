import { test } from "node:test";
import assert from "node:assert/strict";
import { deployment } from "./deployment.mjs";
test("local builds do not invent a public domain", () =>
  assert.deepEqual(deployment({}), { site: undefined, base: "/" }));
test("repository Pages uses the repository path", () =>
  assert.deepEqual(
    deployment({
      GITHUB_REPOSITORY: "Owner/cassette-maker",
      GITHUB_REPOSITORY_OWNER: "Owner",
    }),
    { site: "https://owner.github.io", base: "/cassette-maker/" },
  ));
test("user Pages has no repository prefix", () =>
  assert.deepEqual(
    deployment({
      GITHUB_REPOSITORY: "Owner/Owner.github.io",
      GITHUB_REPOSITORY_OWNER: "Owner",
    }),
    { site: "https://owner.github.io", base: "/" },
  ));
test("custom domain and normalized explicit path", () =>
  assert.deepEqual(
    deployment({ SITE_URL: "https://example.org/", BASE_PATH: "//tapes//" }),
    { site: "https://example.org", base: "/tapes/" },
  ));
test("custom domain is an origin, not a path", () =>
  assert.throws(() => deployment({ SITE_URL: "https://example.org/tapes" })));
test("public plain HTTP is rejected", () =>
  assert.throws(() => deployment({ SITE_URL: "http://example.org" })));
test("production domain uses the site root", () =>
  assert.deepEqual(
    deployment({
      SITE_URL: "https://mixtapeforge.lucasciacca.com",
      BASE_PATH: "/",
    }),
    { site: "https://mixtapeforge.lucasciacca.com", base: "/" },
  ));

test("the actual publishing script exports only static files and preserves branch history", async () => {
  const { mkdtemp, mkdir, readFile, writeFile, rm } =
    await import("node:fs/promises");
  const { tmpdir } = await import("node:os");
  const { join } = await import("node:path");
  const { execFileSync } = await import("node:child_process");
  const { parse } = await import("yaml");
  const temp = await mkdtemp(join(tmpdir(), "cassette-pages-test-"));
  try {
    const remote = join(temp, "remote.git"),
      checkout = join(temp, "checkout"),
      artifact = join(temp, "site-artifact"),
      source = join(temp, "static");
    const run = (command, args, cwd = temp) =>
      execFileSync(command, args, {
        cwd,
        encoding: "utf8",
        stdio: ["ignore", "pipe", "pipe"],
      }).trim();
    run("git", ["init", "--bare", remote]);
    run("git", ["init", "-b", "main", checkout]);
    await writeFile(
      join(checkout, "README.md"),
      "source files must not be published",
    );
    run("git", ["add", "."], checkout);
    run(
      "git",
      [
        "-c",
        "user.name=Test",
        "-c",
        "user.email=test@example.org",
        "commit",
        "-m",
        "Source",
      ],
      checkout,
    );
    run("git", ["remote", "add", "origin", remote], checkout);
    await mkdir(join(source, "en"), { recursive: true });
    await mkdir(artifact);
    await writeFile(join(source, "en", "index.html"), "<h1>First build</h1>");
    await writeFile(join(source, ".nojekyll"), "");
    const pack = () =>
      run("tar", ["-cf", join(artifact, "artifact.tar"), "-C", source, "."]);
    pack();
    const workflow = parse(
      await readFile(
        new URL("../../.github/workflows/website.yml", import.meta.url),
        "utf8",
      ),
    );
    const script = workflow.jobs.publish.steps.find(
      (step) => step.name === "Update generated HTML branch",
    ).run;
    const publish = () =>
      execFileSync("bash", ["-c", script], {
        cwd: checkout,
        env: { ...process.env, RUNNER_TEMP: temp },
        stdio: ["ignore", "pipe", "pipe"],
      });
    publish();
    const git = (...args) => run("git", ["--git-dir", remote, ...args]);
    const first = git("rev-parse", "refs/heads/gh-pages");
    assert.equal(git("show", "gh-pages:en/index.html"), "<h1>First build</h1>");
    assert.equal(git("ls-tree", "--name-only", "gh-pages"), ".nojekyll\nen");
    publish();
    assert.equal(git("rev-parse", "refs/heads/gh-pages"), first);
    await writeFile(join(source, "en", "index.html"), "<h1>Updated build</h1>");
    pack();
    publish();
    assert.equal(git("rev-parse", "gh-pages^"), first);
    assert.equal(
      git("show", "gh-pages:en/index.html"),
      "<h1>Updated build</h1>",
    );
  } finally {
    await rm(temp, { recursive: true, force: true });
  }
});
