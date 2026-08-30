import { glob } from 'astro/loaders';
import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
	// Load Markdown and MDX files in the `src/content/blog/` directory.
	loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
	// Type-check frontmatter using a schema
	schema: z.object({
		title: z.string(),
		description: z.string(),
		// Transform string to Date object
		pubDate: z.coerce.date(),
		updatedDate: z.coerce.date().optional(),
		heroImage: z.string().optional(),
	}),
});

const opensource = defineCollection({
	// Load Markdown and MDX files in the `src/content/opensource/` directory.
	loader: glob({ base: './src/content/opensource', pattern: '**/*.{md,mdx}' }),
	schema: z.object({
		title: z.string(),
		type: z.enum(['pull request', 'issue', 'omarchy plugins']),
		repo: z.string(),
		href: z.string(),
		status: z.enum(['merged', 'open', 'published']),
		description: z.string(),
		date: z.string(),
		tags: z.array(z.string()),
		order: z.number().optional(),
	}),
});

export const collections = { blog, opensource };
