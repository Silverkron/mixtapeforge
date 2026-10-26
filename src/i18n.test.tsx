// @vitest-environment jsdom
import { afterEach, it, expect } from "vitest";
import {
  act,
  cleanup,
  render,
  fireEvent,
  screen,
} from "@testing-library/react";
import { t, setLocale, useLocale, languages, type Locale } from "./i18n";
import en from "./locales/en.json";
import es from "./locales/es.json";
import fr from "./locales/fr.json";
import sources from "./locales/source.json";
afterEach(() => {
  cleanup();
  setLocale("it");
  localStorage.removeItem("cassette-language");
});
it("has complete catalogs and preserves every interpolation in all four languages", () => {
  for (const catalog of [en, es, fr]) {
    expect(Object.keys(catalog).sort()).toEqual([...sources].sort());
    for (const key of sources) {
      const text = (catalog as Record<string, string>)[key];
      expect(text.trim()).not.toBe("");
      expect(text.match(/\{\d+\}/g)?.sort() ?? []).toEqual(
        key.match(/\{\d+\}/g)?.sort() ?? [],
      );
    }
  }
  const names = {
    it: "Piastra",
    en: "Cassette deck",
    es: "Pletina",
    fr: "Platine cassette",
  };
  for (const locale of Object.keys(languages) as Locale[]) {
    setLocale(locale);
    expect(t("Piastra")).toBe(names[locale]);
    expect(t("MixtapeForge")).toBe("MixtapeForge");
    expect(t("MixtapeForge — Mixtape")).toBe("MixtapeForge — Mixtape");
    expect(t("LATO {0}", ["B"])).toContain("B");
    expect(document.documentElement.lang).toBe(locale);
  }
});
it("updates live without changing the user’s text and translates native errors with parameters", () => {
  function Sample() {
    const locale = useLocale();
    return (
      <>
        <select
          aria-label="language"
          value={locale}
          onChange={(e) => setLocale(e.target.value as Locale)}
        >
          {Object.keys(languages).map((v) => (
            <option key={v}>{v}</option>
          ))}
        </select>
        <button>{t("Salva")}</button>
        <input
          aria-label="user title"
          defaultValue="La mia mixtape personale"
        />
      </>
    );
  }
  render(<Sample />);
  for (const locale of ["en", "es", "fr", "it"]) {
    fireEvent.change(screen.getByLabelText("language"), {
      target: { value: locale },
    });
    expect(
      (screen.getByLabelText("user title") as HTMLInputElement).value,
    ).toBe("La mia mixtape personale");
    expect(screen.getByRole("button").textContent).toBe(t("Salva"));
  }
  act(() => setLocale("en"));
  expect(t("Sorgente modificata: My  Song")).toContain("My  Song");
  expect(t("Sorgente modificata: My  Song")).not.toContain(
    "Sorgente modificata",
  );
});
