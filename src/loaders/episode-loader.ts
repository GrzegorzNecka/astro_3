export interface Episode {
    id: string;
    title: string;
    link: string;
}

export async function episodeLoader(): Promise<Episode[]> {
    const PODCAST_URL = "https://anchor.fm/s/e2cb03d0/podcast/rss";
    const response = await fetch(PODCAST_URL);
    const feedXml = await response.text();

    const itemRegex = /[\s\S]*?<\/item>/g;
    const items = [...feedXml.matchAll(itemRegex)];

    const titles = items.map((item) => {
        const titleMatch = item[0].match(/<title><!\[CDATA\[(.*?)\]\]><\/title>/);
        return titleMatch ? titleMatch[1] : "";
    });

    const links = items.map((item) => {
        const linkMatch = item[0].match(/<link>(.*?)<\/link>/);
        return linkMatch ? linkMatch[1] : "";
    });

    return titles.map((title, i) => ({
        id: `ep-${i}`,
        title,
        link: links[i],
    }));
}
