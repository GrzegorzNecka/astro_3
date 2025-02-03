import type { APIRoute } from "astro";
import { getCollection } from "astro:content";

// Dodaj tę linię jeśli używasz trybu statycznego
export const prerender = false;

export const GET: APIRoute = async ({ request }) => {
    const url = new URL(request.url);
    const count = url.searchParams.get("count");

    try {
        const episodes = await getCollection("episodes");
        const limitedEpisodes = count ? episodes.slice(0, parseInt(count)) : episodes;

        return new Response(
            JSON.stringify(
                limitedEpisodes.map((episode) => ({
                    id: episode.id,
                    title: episode.data.title,
                    link: episode.data.link,
                }))
            ),
            {
                status: 200,
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
    } catch (error) {
        return new Response(JSON.stringify({ error: "Failed to fetch episodes" }), { status: 500 });
    }
};
