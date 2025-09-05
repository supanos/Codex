import { useState } from 'react';
import axios from 'axios';

export default function Contact() {
  const [form, setForm] = useState({ name:'', email:'', message:'' });
  const [sent, setSent] = useState(false);
  const submit = async e => {
    e.preventDefault();
    await axios.post('/api/contact', form);
    setSent(true);
  };
  if (sent) return <div className="p-4 text-white">Thanks!</div>;
  return (
    <form onSubmit={submit} className="p-4 flex flex-col gap-2 text-black">
      <input placeholder="Name" value={form.name} onChange={e=>setForm({...form,name:e.target.value})} />
      <input placeholder="Email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} />
      <textarea placeholder="Message" value={form.message} onChange={e=>setForm({...form,message:e.target.value})} />
      <button className="bg-blue-500 text-white px-4 py-2" type="submit">Send</button>
    </form>
  );
}
