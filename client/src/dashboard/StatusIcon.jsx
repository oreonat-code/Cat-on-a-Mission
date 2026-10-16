// Shape carries the status alongside colour: full circle + tick, half-filled, empty ring.
export default function StatusIcon({ status }) {
  if (status === 'done') {
    return (
      <svg className="status-icon" width="22" height="22" viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="12" cy="12" r="11" className="fill-ink" />
        <path d="M6.5 12.5l3.5 3.5 7-8" className="stroke-on-fill" strokeWidth="2.6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }
  if (status === 'part') {
    return (
      <svg className="status-icon" width="22" height="22" viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="12" cy="12" r="10" fill="none" className="stroke-ink" strokeWidth="2.4" />
        <path d="M12 2a10 10 0 0 1 0 20z" className="fill-ink" />
      </svg>
    );
  }
  return (
    <svg className="status-icon" width="22" height="22" viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="10" fill="none" className="stroke-line-strong" strokeWidth="2.4" />
    </svg>
  );
}
