import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Scoreboard() {
  const [scores, setScores] = useState({ nfl: [], mlb: [] });

  const fetchScores = async () => {
    const res = await axios.get('/api/scores');
    setScores(res.data);
  };

  useEffect(() => {
    fetchScores();
    const interval = setInterval(fetchScores, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="text-white">
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
