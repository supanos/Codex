const express = require('express');
const axios = require('axios');
const router = express.Router();

async function fetchScoreboard(url) {
  const { data } = await axios.get(url);
  return data.events.map(e => ({
    id: e.id,
    name: e.name,
    shortName: e.shortName,
    status: e.status.type.description,
    competitors: e.competitions[0].competitors.map(c => ({
      name: c.team.displayName,
      score: c.score,
      homeAway: c.homeAway,
    })),
  }));
}

// Separate endpoints
router.get('/nfl', async (_req, res) => {
  try {
    const games = await fetchScoreboard('https://site.api.espn.com/apis/site/v2/sports/football/nfl/scoreboard');
    res.json(games);
  } catch (e) {
    res.status(500).json({ message: 'Failed to fetch NFL scores' });
  }
});

router.get('/mlb', async (_req, res) => {
  try {
    const games = await fetchScoreboard('https://site.api.espn.com/apis/site/v2/sports/baseball/mlb/scoreboard');
    res.json(games);
  } catch (e) {
    res.status(500).json({ message: 'Failed to fetch MLB scores' });
  }
});

// Combined endpoint
router.get('/', async (_req, res) => {
  try {
    const nfl = await fetchScoreboard('https://site.api.espn.com/apis/site/v2/sports/football/nfl/scoreboard');
    const mlb = await fetchScoreboard('https://site.api.espn.com/apis/site/v2/sports/baseball/mlb/scoreboard');
    res.json({ nfl, mlb });
  } catch (e) {
    res.status(500).json({ message: 'Failed to fetch scores' });
  }
});

module.exports = router;
