/*
by wisky =

https://github.com/nw4m/omnibot
https://discord.gg/JRkD2gRbzT
*/

const axios = require("axios");

const GIPHY_API_KEY = process.env.GIPHY_API_KEY;

async function getRandomTenorGif(query) {
  try {
    if (!GIPHY_API_KEY) return null;
    const response = await axios.get("https://api.giphy.com/v1/gifs/search", {
      params: {
        api_key: GIPHY_API_KEY,
        q: query,
        limit: 20,
        rating: "pg-13"
      }
    });
    const results = response.data?.data;
    if (!results || results.length === 0) return null;
    const random = results[Math.floor(Math.random() * results.length)];
    return random.images?.original?.url ?? null;
  } catch (error) {
    console.error(`GIPHY API error:`, error.message);
    return null;
  }
}

module.exports = { getRandomTenorGif };

/*
by wisky =

https://github.com/nw4m/omnibot
https://discord.gg/JRkD2gRbzT
*/
