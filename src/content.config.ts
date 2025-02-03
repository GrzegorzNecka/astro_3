import { defineCollection, z } from "astro:content";
import { episodeLoader } from "./loaders/episode-loader";

const episodes = defineCollection({
    loader: episodeLoader,
    schema: z.object({
        title: z.string(),
        link: z.string(),
    }),
});

export const collections = { episodes };
