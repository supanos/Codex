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

router.get('/nfl', async (_req, res) => {
  try {
    const date = new Date().toISOString().split('T')[0];
    const games = await fetchScoreboard(`https://site.api.espn.com/apis/site/v2/sports/football/nfl/scoreboard?dates=${date}`);
    res.json(games);
  } catch (e) {
    res.status(500).json({ message: 'Failed to fetch scores' });
  }
});

router.get('/mlb', async (_req, res) => {
  try {
    const date = new Date().toISOString().split('T')[0];
    const games = await fetchScoreboard(`https://site.api.espn.com/apis/site/v2/sports/baseball/mlb/scoreboard?dates=${date}`);
    res.json(games);
  } catch (e) {
    res.status(500).json({ message: 'Failed to fetch scores' });
  }
});

router.get('/', async (_req, res) => {
  try {
    const date = new Date().toISOString().split('T')[0];
    const [nfl, mlb] = await Promise.all([
      fetchScoreboard(`https://site.api.espn.com/apis/site/v2/sports/football/nfl/scoreboard?dates=${date}`),
      fetchScoreboard(`https://site.api.espn.com/apis/site/v2/sports/baseball/mlb/scoreboard?dates=${date}`),
    ]);
    res.json({ nfl, mlb });
  } catch (e) {
    res.status(500).json({ message: 'Failed to fetch scores' });
  }
});

module.exports = router;
