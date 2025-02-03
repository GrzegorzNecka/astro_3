import { useState, useEffect } from "react";
import type { Episode } from "../loaders/episode-loader";

export default function EpisodesGrid({ count }: { count: number }) {
    const [episodes, setEpisodes] = useState<Episode[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchEpisodes = async () => {
            try {
                const response = await fetch(`/api/episodes?count=${count}`);
                if (!response.ok) {
                    throw new Error("Failed to fetch episodes");
                }
                const data = await response.json();

                setEpisodes(data);
            } catch (err) {
                setError(err instanceof Error ? err.message : "An error occurred");
            } finally {
                setIsLoading(false);
            }
        };

        fetchEpisodes();
    }, [count]);

    if (isLoading) {
        return <div className="flex justify-center p-8">Loading episodes...</div>;
    }

    if (error) {
        return <div className="text-red-500 p-8">{error}</div>;
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
            {episodes.map((episode) => (
                <article
                    key={episode.id}
                    className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
                >
                    <h2 className="text-xl font-semibold mb-4">{episode.title}</h2>
                    <a
                        href={`/blog/${episode.id}`}
                        className="text-blue-600 hover:text-blue-800 underline"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Listen to episode
                    </a>
                </article>
            ))}
        </div>
    );
}
