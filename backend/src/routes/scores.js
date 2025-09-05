const express = require('express');
const axios = require('axios');

const router = express.Router();

/** Format Date to ESPN expected YYYYMMDD (falls back to today if invalid). */
function toYYYYMMDD(dateStr) {
  const d = dateStr ? new Date(dateStr) : new Date();
  // Guard against invalid dates
  if (isNaN(d.getTime())) return toYYYYMMDD();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}${m}${day}`;
}

/** Map ESPN scoreboard payload into a compact structure. */
function mapEvents(data) {
  const events = data?.events || [];
  return events.map((e) => {
    const comp = e?.competitions?.[0]?.competitors || [];
    return {
      id: e?.id,
      name: e?.name,
      shortName: e?.shortName,
      status: e?.status?.type?.description,
      start: e?.date,
      venue: e?.competitions?.[0]?.venue?.fullName,
      competitors: comp.map((c) => ({
        name: c?.team?.displayName,
        abbreviation: c?.team?.abbreviation,
        score: c?.score,
        homeAway: c?.homeAway,
        winner: c?.winner ?? null,
        record: c?.records?.[0]?.summary || null,
      })),
    };
  });
}

/** Fetch and normalize a single league scoreboard. */
async function fetchScoreboard(league, dateParam) {
  const base = league === 'nfl'
    ? 'https://site.api.espn.com/apis/site/v2/sports/football/nfl/scoreboard'
    : 'https://site.api.espn.com/apis/site/v2/sports/baseball/mlb/scoreboard';

  const dates = toYYYYMMDD(dateParam);
  const url = `${base}?dates=${dates}`;

  const { data } = await axios.get(url, { timeout: 10000 });
  return mapEvents(data);
}

/** NFL endpoint — optional ?date=YYYY-MM-DD */
router.get('/nfl', async (req, res) => {
  try {
    const games = await fetchScoreboard('nfl', req.query.date);
    res.set('Cache-Control', 'public, max-age=30'); // kısa süreli cache
    res.json(games);
  } catch (e) {
    console.error('NFL fetch error:', e?.message);
    res.status(500).json({ message: 'Failed to fetch NFL scores' });
  }
});

/** MLB endpoint — optional ?date=YYYY-MM-DD */
router.get('/mlb', async (req, res) => {
  try {
    const games = await fetchScoreboard('mlb', req.query.date);
    res.set('Cache-Control', 'public, max-age=30');
    res.json(games);
  } catch (e) {
    console.error('MLB fetch error:', e?.message);
    res.status(500).json({ message: 'Failed to fetch MLB scores' });
  }
});

/** Combined endpoint — returns { nfl, mlb } — optional ?date=YYYY-MM-DD */
router.get('/', async (req, res) => {
  try {
    const date = req.query.date;
    const [nfl, mlb] = await Promise.all([
      fetchScoreboard('nfl', date),
      fetchScoreboard('mlb', date),
    ]);
    res.set('Cache-Control', 'public, max-age=30');
    res.json({ nfl, mlb });
  } catch (e) {
    console.error('Combined scores fetch error:', e?.message);
    res.status(500).json({ message: 'Failed to fetch scores' });
  }
});

module.exports = router;
