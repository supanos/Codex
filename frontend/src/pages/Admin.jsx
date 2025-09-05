import { useState, useEffect } from 'react';
import axios from 'axios';

export default function Admin() {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [creds, setCreds] = useState({ username:'', password:'' });
  const [events, setEvents] = useState([]);
  const [form, setForm] = useState({ title:'', description:'', time:'' });

  const login = async e => {
    e.preventDefault();
    const res = await axios.post('/api/auth/login', creds);
    localStorage.setItem('token', res.data.token);
    setToken(res.data.token);
  };

  const fetchEvents = () => {
    axios.get('/api/events').then(r => setEvents(r.data));
  };

  useEffect(() => { if (token) fetchEvents(); }, [token]);

  const createEvent = async e => {
    e.preventDefault();
    await axios.post('/api/events', form, { headers:{ Authorization:`Bearer ${token}` }});
    setForm({ title:'', description:'', time:'' });
    fetchEvents();
  };

  if (!token) return (
    <form onSubmit={login} className="p-4 flex flex-col gap-2 text-black">
      <input placeholder="Username" value={creds.username} onChange={e=>setCreds({...creds,username:e.target.value})} />
      <input placeholder="Password" type="password" value={creds.password} onChange={e=>setCreds({...creds,password:e.target.value})} />
      <button className="bg-blue-500 text-white px-4 py-2" type="submit">Login</button>
    </form>
  );

  return (
    <div className="p-4 text-white">
      <h1 className="text-2xl mb-4">Manage Events</h1>
      <form onSubmit={createEvent} className="flex flex-col gap-2 text-black mb-4">
        <input placeholder="Title" value={form.title} onChange={e=>setForm({...form,title:e.target.value})} />
        <input placeholder="Time" value={form.time} onChange={e=>setForm({...form,time:e.target.value})} />
        <textarea placeholder="Description" value={form.description} onChange={e=>setForm({...form,description:e.target.value})} />
        <button className="bg-green-500 text-white" type="submit">Add</button>
      </form>
      {events.map(e => (
        <div key={e.id} className="mb-2">
          {e.title} - {new Date(e.time).toLocaleString()}
        </div>
      ))}
    </div>
  );
}
