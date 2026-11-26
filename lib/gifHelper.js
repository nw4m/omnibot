/*
by wisky =

https://github.com/nw4m/omnibot
https://discord.gg/JRkD2gRbzT
*/

const fetch = require('node-fetch');

const TENOR_API_KEY = process.env.TENOR_API_KEY;

async function getRandomTenorGif(query) {
  try {
    if (!TENOR_API_KEY) return null;
    const response = await fetch(
      `https://tenor.googleapis.com/v2/search?q=${encodeURIComponent(query)}&key=${TENOR_API_KEY}&limit=20&media_filter=gif`
    );
    if (!response.ok) return null;
    const data = await response.json();
    if (!data.results || data.results.length === 0) return null;
    const random = data.results[Math.floor(Math.random() * data.results.length)];
    return random.media_formats?.gif?.url ?? null;
  } catch (error) {
    console.error('Tenor API error:', error);
    return null;
  }
}

module.exports = { getRandomTenorGif };

/*
by wisky =

https://github.com/nw4m/omnibot
https://discord.gg/JRkD2gRbzT
*/
