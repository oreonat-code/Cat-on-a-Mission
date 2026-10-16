import { Link } from 'react-router-dom';

export default function PlaceholderView({ title, text = 'This page is not built yet.' }) {
  return (
    <div className="panel card">
      <h2>{title}</h2>
      <p>{text}</p>
    </div>
  );
}

export function NotFoundView({ title }) {
  return (
    <div className="panel card">
      <h2>{title}</h2>
      <p>
        It may have been removed, or the link is wrong. <Link to="/dashboard">Back to Home</Link>
      </p>
    </div>
  );
}

// Shown while a dashboard request is loading or after it fails.
export function LoadState({ error }) {
  if (!error) return <p className="crumbs">Loading…</p>;
  return (
    <div className="panel card">
      <h2>Could not load this page</h2>
      <p>Check your connection, then refresh the page.</p>
    </div>
  );
}
