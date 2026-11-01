import { defineCollection } from "astro:content";
import { z } from "astro/zod";
import { glob } from "astro/loaders";
import { scenes } from "./lib/image-scenes";

const articles = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/articles" }),
  schema: z.object({
    id: z.string().regex(/^[a-z0-9-]+$/),
    lang: z.enum(["en", "it", "fr", "de", "es"]),
    title: z.string().min(10),
    description: z.string().min(30),
    primaryKeyword: z.string().min(3),
    secondaryKeywords: z.array(z.string().min(2)).min(2).max(5),
    searchIntent: z.enum(["informational", "task", "evaluation", "diagnosis"]),
    answer: z.string().min(40).max(900),
    category: z.enum([
      "recording",
      "covers",
      "culture",
      "noise-reduction",
      "troubleshooting",
      "calibration",
    ]),
    image: z.enum(scenes),
    updated: z.coerce.date(),
    sources: z.array(z.object({ title: z.string(), url: z.url() })).min(1),
    guideType: z.enum([
      "explainer",
      "procedure",
      "measurement",
      "troubleshooting",
      "maintenance",
    ]),
    prerequisites: z.array(z.string()),
    next: z.array(z.string()),
    related: z.array(z.string()),
  }),
});
export const collections = { articles };
