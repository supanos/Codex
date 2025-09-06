import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Scoreboard() {
  const [scores, setScores] = useState({ nfl: [], mlb: [] });
  const [error, setError] = useState('');
  const API_URL = import.meta.env.VITE_API_URL || '/api';

  const fetchScores = async () => {
    try {
      // Öncelik: birleşik endpoint
      const res = await axios.get(`${API_URL}/scores`);
      if (res.data && res.data.nfl && res.data.mlb) {
        setScores(res.data);
        setError('');
      } else {
        // fallback: ayrı endpointleri çağır
        const [nflRes, mlbRes] = await Promise.all([
          axios.get(`${API_URL}/scores/nfl`),
          axios.get(`${API_URL}/scores/mlb`),
        ]);
        setScores({ nfl: nflRes.data, mlb: mlbRes.data });
        setError('');
      }
    } catch (err) {
      console.error('Failed to fetch scores', err);
      setError('Failed to load scores');
    }
  };

  useEffect(() => {
    fetchScores();
    const interval = setInterval(fetchScores, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="text-white">
      {error && <p className="text-red-500 mb-2">{error}</p>}
      <h2 className="text-xl font-bold mb-2">NFL</h2>
      {scores.nfl.map(game => (
        <div key={game.id} className="mb-2">
          {game.competitors.map(c => (
            <span key={c.name} className="mr-2">{c.name}: {c.score}</span>
          ))}
          <span>{game.status}</span>
        </div>
      ))}
      <h2 className="text-xl font-bold mt-4 mb-2">MLB</h2>
      {scores.mlb.map(game => (
        <div key={game.id} className="mb-2">
          {game.competitors.map(c => (
            <span key={c.name} className="mr-2">{c.name}: {c.score}</span>
          ))}
          <span>{game.status}</span>
        </div>
      ))}
    </div>
  );
}
