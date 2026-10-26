import { useSyncExternalStore } from "react";
import en from "./locales/en.json";
import es from "./locales/es.json";
import fr from "./locales/fr.json";
export type Locale = "it" | "en" | "es" | "fr";
export const languages = {
  it: "Italiano",
  en: "English",
  es: "Español",
  fr: "Français",
};
const catalogs: Record<Exclude<Locale, "it">, Record<string, string>> = {
  en,
  es,
  fr,
};
let locale: Locale = "it";
try {
  const saved = localStorage.getItem("cassette-language");
  const preferred =
    saved ??
    (import.meta.env.MODE === "test" ? "it" : navigator.language.slice(0, 2));
  if (preferred in languages) locale = preferred as Locale;
} catch {
  /* SSR and restricted storage use Italian. */
}
const listeners = new Set<() => void>();
export const localeTag = () =>
  ({ it: "it-IT", en: "en-GB", es: "es-ES", fr: "fr-FR" })[locale];
export function setLocale(next: Locale) {
  if (!(next in languages)) return;
  locale = next;
  try {
    localStorage.setItem("cassette-language", next);
  } catch {
    /* Session preference still works. */
  }
  if (typeof document !== "undefined") document.documentElement.lang = next;
  listeners.forEach((fn) => fn());
}
export function useLocale() {
  return useSyncExternalStore(
    (fn) => {
      listeners.add(fn);
      return () => listeners.delete(fn);
    },
    () => locale,
  );
}
const sourceByTranslation = new Map<string, string>();
for (const catalog of Object.values(catalogs))
  for (const [key, value] of Object.entries(catalog))
    if (!sourceByTranslation.has(value)) sourceByTranslation.set(value, key);
const dynamic = Object.keys(en)
  .filter((k) => /\{\d+\}/.test(k))
  .map((key) => {
    const names: number[] = [];
    const escaped = key
      .split(/(\{\d+\})/)
      .map((part) => {
        if (/^\{\d+\}$/.test(part)) {
          names.push(Number(part.slice(1, -1)));
          return "(.*?)";
        }
        return part.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      })
      .join("");
    return { key, names, pattern: new RegExp("^" + escaped + "$") };
  });
export function t(source: string, values: unknown[] = []): string {
  let key = source.trim().replace(/\s+/g, " ");
  if (!(key in en)) key = sourceByTranslation.get(key) ?? key;
  if (locale !== "it" && !catalogs[locale][key] && !values.length) {
    for (const item of dynamic) {
      const match = item.pattern.exec(source.trim());
      if (match) {
        key = item.key;
        values = [];
        item.names.forEach((n, i) => (values[n] = match[i + 1]));
        break;
      }
    }
  }
  const translated = locale === "it" ? key : (catalogs[locale][key] ?? key);
  const prefix = source.match(/^\s*/)?.[0] ?? "",
    suffix = source.match(/\s*$/)?.[0] ?? "";
  return (
    prefix +
    translated.replace(/\{(\d+)\}/g, (_, i) =>
      String(values[Number(i)] ?? `{${i}}`),
    ) +
    suffix
  );
}
if (typeof document !== "undefined") document.documentElement.lang = locale;
