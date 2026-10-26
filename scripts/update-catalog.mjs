import fs from "node:fs";
import ts from "typescript";
import path from "node:path";
const keys = new Set();
const add = (s) => {
  s = s.trim().replace(/\s+/g, " ");
  if (s.length > 1 && /[A-Za-zÀ-ÿ]{2}/.test(s)) keys.add(s);
};
function files(d) {
  return fs
    .readdirSync(d, { withFileTypes: true })
    .flatMap((e) =>
      e.isDirectory() ? files(path.join(d, e.name)) : [path.join(d, e.name)],
    );
}
for (const f of files("src").filter(
  (f) => /\.tsx?$/.test(f) && !f.includes(".test.") && !f.includes("i18n"),
)) {
  const sf = ts.createSourceFile(
    f,
    fs.readFileSync(f, "utf8"),
    99,
    true,
    f.endsWith(".tsx") ? 4 : 3,
  );
  function visit(n) {
    if (
      ts.isCallExpression(n) &&
      n.expression.getText(sf) === "translate" &&
      ts.isStringLiteral(n.arguments[0])
    )
      add(n.arguments[0].text);
    if (
      f.endsWith("equalizer.ts") &&
      ts.isPropertyAssignment(n) &&
      ["name", "description"].includes(n.name.getText(sf)) &&
      ts.isStringLiteral(n.initializer)
    )
      add(n.initializer.text);
    ts.forEachChild(n, visit);
  }
  visit(sf);
}
const cat = JSON.parse(fs.readFileSync("src/artwork/catalog.json"));
for (const s of cat.styles) {
  for (const key of ["name", "family", "description"]) add(s[key]);
  for (const p of s.palettes) add(p.name);
}
for (const p of JSON.parse(fs.readFileSync("src/calibration-protocol.json"))
  .phases)
  add(p.name);
for (const file of files("src-tauri/src").filter(
  (f) =>
    f.endsWith(".rs") &&
    !f.includes("/bin/") &&
    !f.endsWith("/artwork.rs") &&
    !f.endsWith("/artwork_fonts.rs"),
)) {
  let raw = fs.readFileSync(file, "utf8").split("#[cfg(test)]")[0];
  for (const m of raw.matchAll(/"((?:[^"\\]|\\.)*)"/g)) {
    let s = m[1];
    if (
      !/[A-Za-zÀ-ÿ].*\s.*[A-Za-zÀ-ÿ]/.test(s) ||
      s.includes("\\") ||
      /[<>#]|^https?:|^data:|^font-|^text\{|^line|^\//.test(s)
    )
      continue;
    let i = 0;
    s = s.replace(/\{[^{}]*\}/g, () => `{${i++}}`);
    add(s);
  }
}
fs.writeFileSync(
  "src/locales/source.json",
  JSON.stringify([...keys].sort(), null, 2),
);
console.log(keys.size);
