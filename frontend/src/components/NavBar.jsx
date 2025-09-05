import { Link } from 'react-router-dom';

export default function NavBar() {
  return (
    <nav className="bg-gray-800 text-white p-4 flex gap-4">
      <Link to="/">Home</Link>
      <Link to="/menu">Menu</Link>
      <Link to="/events">Events</Link>
      <Link to="/sports">Sports Live</Link>
      <Link to="/contact">Contact</Link>
    </nav>
  );
}
