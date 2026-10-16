import express from 'express';
import cookieParser from 'cookie-parser';
import { authRouter, readSession } from './auth.js';
import { resultsRouter } from './results.js';
import { dashboardRouter } from './dashboard.js';

const app = express();
// The client reaches the API through Vite's proxy (same origin), so no CORS is needed.
app.use(express.json());
app.use(cookieParser());
app.use(readSession);

app.get('/api/health', (_req, res) => res.json({ ok: true }));
app.use('/api/auth', authRouter);
app.use('/api/results', resultsRouter);
app.use('/api/dashboard', dashboardRouter);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`API listening on http://localhost:${port}`));
