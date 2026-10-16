// Express 4 does not catch errors from async handlers, and an uncaught rejection
// stops the server. Wrap every async route in this.
export const handle = (fn) => (req, res, next) =>
  fn(req, res, next).catch((e) => {
    console.error(e);
    res.status(500).json({ error: 'Something went wrong' });
  });
