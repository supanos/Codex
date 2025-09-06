import Scoreboard from '../components/Scoreboard';

export default function Home() {
  return (
    <div className="p-4">
      <h1 className="text-2xl text-white mb-4">Welcome to Supono's Sports Bar</h1>
      <Scoreboard />
    </div>
  );
}
