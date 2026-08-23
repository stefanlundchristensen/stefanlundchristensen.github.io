import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const posts = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/posts' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    updated: z.coerce.date().optional(),
    draft: z.boolean().default(false),
    tags: z.array(z.string()).default([]),
    categories: z.array(z.string()).default([]),
    description: z.string().optional(),
    linkedinPost: z.string().optional(),
    twitterPost: z.string().optional(),
    // Marks are derived from the post's own structure, so there is nothing to
    // configure — only to suppress, for a post the mark doesn't suit.
    visual: z.enum(['auto', 'none']).default('auto'),
  }),
});

export const collections = { posts };
