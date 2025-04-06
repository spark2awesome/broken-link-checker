
export default async function handler(req, res) {
  const { url } = req.query;

  try {
    const response = await fetch(url);
    const html = await response.text();
    const links = Array.from(html.matchAll(/href=\"(http.*?)\"/g)).map(m => m[1]);

    const brokenLinks = [];

    for (let link of links) {
      try {
        const res = await fetch(link, { method: 'HEAD' });
        if (!res.ok) brokenLinks.push(link);
      } catch (err) {
        brokenLinks.push(link);
      }
    }

    res.status(200).json({ brokenLinks });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch URL content' });
  }
}
