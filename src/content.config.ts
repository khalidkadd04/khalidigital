import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const projects = defineCollection({
  loader: glob({
    pattern: '**/*.md',
    base: './src/content/projects',
  }),

  schema: z.object({
    title: z.string(),
    summary: z.string(),
    description: z.string(),
    tags: z.array(z.string()),
    category: z.enum(['bi', 'marketing', 'analytics', 'strategy']),
    date: z.coerce.date(),
    featured: z.boolean().optional().default(false),
    order: z.number().int().optional().default(100),
    visibility: z.enum(['both', 'projects_only', 'home_only', 'hidden']).optional().default('both'),
    status: z.string().optional(),
    link: z.string().url().optional(),
    image: z.string().optional(),
    gallery: z
      .array(
        z.union([
          z.string(),
          z.object({
            image: z.string(),
            caption: z.string().optional(),
          }),
        ])
      )
      .optional()
      .default([]),
    metrics: z
      .array(
        z.object({
          value: z.string(),
          label: z.string(),
        })
      )
      .max(3)
      .optional(),
  }),
});

export const collections = {
  projects,
};
