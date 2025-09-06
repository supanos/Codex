import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Events() {
  const [events, setEvents] = useState([]);
  useEffect(() => { axios.get('/api/events').then(res => setEvents(res.data)); }, []);
  return (
    <div className="p-4 text-white">
      <h1 className="text-2xl mb-4">Events</h1>
      {events.map(e => (
        <div key={e.id} className="mb-2">
          <div className="font-bold">{e.title}</div>
          <div>{new Date(e.time).toLocaleString()}</div>
          <div>{e.description}</div>
        </div>
      ))}
    </div>
  );
}
