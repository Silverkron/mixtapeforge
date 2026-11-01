import { test } from "node:test";
import assert from "node:assert/strict";
import { readdir, readFile } from "node:fs/promises";
import { parse } from "yaml";
const root = new URL("../src/content/articles/", import.meta.url);
const locales = ["en", "it", "fr", "de", "es"];
test("all guides have complete localized counterparts and valid references", async () => {
  const catalogs = {};
  for (const lang of locales) {
    const names = (await readdir(new URL(`${lang}/`, root)))
      .filter((n) => n.endsWith(".md"))
      .sort();
    assert.ok(names.length >= 76, `${lang} article count`);
    assert.ok(
      names.includes("flux-stereo-tool.md"),
      `${lang}: missing FLUX guide`,
    );
    assert.ok(
      names.includes("nak-t100-practical-guide.md"),
      `${lang}: missing NAK T-100 guide`,
    );
    catalogs[lang] = {};
    const titles = new Set();
    for (const name of names) {
      const source = await readFile(new URL(`${lang}/${name}`, root), "utf8");
      const match = source.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]+)$/);
      assert.ok(match, `${lang}/${name}: frontmatter`);
      const data = parse(match[1]);
      const body = match[2];
      assert.equal(data.id, name.slice(0, -3));
      assert.equal(data.lang, lang);
      assert.ok(data.title.length >= 10);
      assert.ok(!titles.has(data.title), `duplicate title ${data.title}`);
      titles.add(data.title);
      assert.ok(data.description.length >= 30);
      assert.ok(data.primaryKeyword.length >= 3);
      assert.ok(
        data.secondaryKeywords.length >= 2 &&
          data.secondaryKeywords.length <= 5,
        `${lang}/${name}: secondary keywords`,
      );
      assert.equal(
        new Set(data.secondaryKeywords).size,
        data.secondaryKeywords.length,
        `${lang}/${name}: duplicate secondary keywords`,
      );
      assert.ok(data.answer.length >= 40 && data.answer.length <= 900);
      assert.ok(
        ["informational", "task", "evaluation", "diagnosis"].includes(
          data.searchIntent,
        ),
        `${lang}/${name}: search intent`,
      );
      assert.ok(data.sources.length > 0);
      assert.ok(body.trim().length > 0, `${lang}/${name}: missing body`);
      assert.ok(
        (body.match(/^## /gm) || []).length >= 1,
        `${lang}/${name}: missing sections`,
      );
      assert.ok(
        !/\bTODO\b/.test(body) &&
          !/lorem ipsum|coming soon|translation pending/i.test(body),
        `${lang}/${name}: placeholder`,
      );
      for (const s of data.sources)
        assert.equal(new URL(s.url).protocol, "https:");
      catalogs[lang][data.id] = { ...data, body };
    }
  }
  const ids = Object.keys(catalogs.en).sort();
  for (const lang of locales) {
    assert.deepEqual(Object.keys(catalogs[lang]).sort(), ids);
    for (const data of Object.values(catalogs[lang])) {
      assert.ok(
        [
          "explainer",
          "procedure",
          "measurement",
          "troubleshooting",
          "maintenance",
        ].includes(data.guideType),
        `${lang}/${data.id}: guide type`,
      );
      assert.equal(
        data.guideType,
        catalogs.en[data.id].guideType,
        `${lang}/${data.id}: guide type differs`,
      );
      assert.equal(
        data.searchIntent,
        catalogs.en[data.id].searchIntent,
        `${lang}/${data.id}: search intent differs`,
      );
      for (const field of ["prerequisites", "next", "related"]) {
        assert.ok(
          Array.isArray(data[field]),
          `${lang}/${data.id}: missing ${field}`,
        );
        assert.equal(
          new Set(data[field]).size,
          data[field].length,
          `${lang}/${data.id}: duplicate ${field}`,
        );
        for (const id of data[field]) {
          assert.notEqual(
            id,
            data.id,
            `${lang}/${data.id}: self link in ${field}`,
          );
          assert.ok(
            catalogs[lang][id],
            `${lang}/${data.id}: missing ${field} ${id}`,
          );
        }
        assert.deepEqual(
          data[field],
          catalogs.en[data.id][field],
          `${lang}/${data.id}: ${field} differs between languages`,
        );
      }
      const contextual = [
        ...data.body.matchAll(/\]\(\.\.\/([a-z0-9-]+)\/\)/g),
      ].map((match) => match[1]);
      assert.ok(
        new Set(contextual).size >= 2,
        `${lang}/${data.id}: fewer than two contextual guide links`,
      );
      for (const id of contextual) {
        assert.ok(
          catalogs[lang][id],
          `${lang}/${data.id}: broken contextual link ${id}`,
        );
        assert.notEqual(
          id,
          data.id,
          `${lang}/${data.id}: contextual self link`,
        );
      }
      if (lang !== "en")
        assert.notEqual(
          data.body,
          catalogs.en[data.id].body,
          `${lang}/${data.id}: untranslated body`,
        );
    }
    const visited = new Set();
    function visit(id, chain = []) {
      assert.ok(
        !chain.includes(id),
        `${lang}: prerequisite cycle ${[...chain, id].join(" → ")}`,
      );
      if (visited.has(id)) return;
      for (const prerequisite of catalogs[lang][id].prerequisites)
        visit(prerequisite, [...chain, id]);
      visited.add(id);
    }
    for (const id of ids) visit(id);
    const linked = new Set(
      Object.values(catalogs[lang]).flatMap((data) => [
        ...data.prerequisites,
        ...data.next,
        ...data.related,
        ...[...data.body.matchAll(/\]\(\.\.\/([a-z0-9-]+)\/\)/g)].map(
          (match) => match[1],
        ),
      ]),
    );
    for (const id of ids)
      assert.ok(linked.has(id), `${lang}/${id}: no incoming guide links`);
  }
  const strategy = await readFile(
    new URL("../../../ARTICLE_STRATEGY.md", root),
    "utf8",
  );
  const topicStrategy = strategy.slice(strategy.indexOf("## Topic strategies"));
  assert.ok(topicStrategy.length > 0, "strategy topic section");
  assert.equal(
    (topicStrategy.match(/^\| `[a-z0-9-]+` \|/gm) || []).length,
    ids.length,
    "strategy table must cover every article ID",
  );
  for (const id of ids)
    assert.match(strategy, new RegExp(`^\\| \`${id}\` \\|`, "m"));
});
