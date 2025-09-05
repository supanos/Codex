import { useEffect, useState, useCallback } from 'react';
import axios from 'axios';

type Team = {
  name?: string;
  abbreviation?: string;
  score?: string | number;
  homeAway?: 'home' | 'away';
  winner?: boolean | null;
  record?: string | null;
};

type Game = {
  id: string;
  name?: string;
  shortName?: string;
  status?: string;
  start?: string;
  venue?: string;
  competitors: Team[];
};

type Scores = {
  nfl: Game[];
  mlb: Game[];
};

export default function Scoreboard() {
  const [scores, setScores] = useState<Scores>({ nfl: [], mlb: [] });
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [lastUpdated, setLastUpdated] = useState<string>('');

  const fetchScores = useCallback(async () => {
    try {
      setError('');
      // Öncelik: birleşik endpoint
      const res = await axios.get('/api/scores');
      let nextScores: Scores;

      if (res.data?.nfl && res.data?.mlb) {
        nextScores = res.data as Scores;
      } else {
        // Fallback: ayrı endpointler
        const [nflRes, mlbRes] = await Promise.all([
          axios.get('/api/scores/nfl'),
          axios.get('/api/scores/mlb'),
        ]);
        nextScores = { nfl: nflRes.data, mlb: mlbRes.data };
      }

      setScores(nextScores);
      setLastUpdated(new Date().toLocaleTimeString());
    } catch (err) {
      console.error('Failed to fetch scores', err);
      setError('Failed to load scores');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchScores();
    const interval = setInterval(fetchScores, 60_000); // 60s auto-refresh
    return () => clearInterval(interval);
  }, [fetchScores]);

  const GameRow = ({ game }: { game: Game }) => {
    const home = game.competitors.find(c => c.homeAway === 'home') ?? game.competitors[0];
    const away = game.competitors.find(c => c.homeAway === 'away') ?? game.competitors[1];

    return (
      <div className="mb-3 rounded-xl bg-black/30 p-3">
        <div className="text-sm opacity-80">
          {game.status || 'Scheduled'} {game.start ? `• ${new Date(game.start).toLocaleTimeString()}` : ''}
          {game.venue ? ` • ${game.venue}` : ''}
        </div>
        <div className="mt-1 font-medium">
          <div className="flex items-center justify-between">
            <span className={home?.winner ? 'font-extrabold' : ''}>
              {home?.abbreviation || home?.name}: {home?.score ?? '-'}
              {home?.record ? ` (${home.record})` : ''}
            </span>
            <span className="mx-2 opacity-80">vs</span>
            <span className={away?.winner ? 'font-extrabold' : ''}>
              {away?.abbreviation || away?.name}: {away?.score ?? '-'}
              {away?.record ? ` (${away.record})` : ''}
            </span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="text-white">
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Scoreboard</h1>
        <div className="text-sm opacity-80">
          {loading ? 'Loading…' : lastUpdated ? `Last updated: ${lastUpdated}` : null}
        </div>
      </div>

      {error && <p className="mb-3 rounded-md bg-red-600/20 p-2 text-red-300">{error}</p>}

      <h2 className="mb-2 text-xl font-bold">NFL</h2>
      {scores.nfl.length === 0 && !loading && <p className="mb-4 opacity-70">No NFL games found.</p>}
      {scores.nfl.map(game => (
        <GameRow key={`nfl-${game.id}`} game={game} />
      ))}

      <h2 className="mt-6 mb-2 text-xl font-bold">MLB</h2>
      {scores.mlb.length === 0 && !loading && <p className="mb-2 opacity-70">No MLB games found.</p>}
      {scores.mlb.map(game => (
        <GameRow key={`mlb-${game.id}`} game={game} />
      ))}
    </div>
  );
}
