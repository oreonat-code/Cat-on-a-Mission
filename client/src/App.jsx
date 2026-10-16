import { useEffect, useState } from 'react';

export default function App() {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState('');
  const [error, setError] = useState('');

  async function load() {
    const res = await fetch('/api/todos');
    const body = await res.json();
    if (!res.ok) return setError(body.error);
    setError('');
    setTodos(body);
  }

  useEffect(() => { load(); }, []);

  async function add(e) {
    e.preventDefault();
    if (!title.trim()) return;
    await fetch('/api/todos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title }),
    });
    setTitle('');
    load();
  }

  async function remove(id) {
    await fetch(`/api/todos/${id}`, { method: 'DELETE' });
    load();
  }

  return (
    <main style={{ maxWidth: 480, margin: '40px auto', fontFamily: 'sans-serif' }}>
      <h1>Team 8 Todos</h1>
      <form onSubmit={add}>
        <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="New todo" />
        <button type="submit">Add</button>
      </form>
      {error && <p style={{ color: 'crimson' }}>{error}</p>}
      <ul>
        {todos.map((t) => (
          <li key={t.id}>
            {t.title} <button onClick={() => remove(t.id)}>x</button>
          </li>
        ))}
      </ul>
    </main>
  );
}
