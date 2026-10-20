# Code For Good 26!

# Gamified Learning & Early Intervention

## Overview
An educational solution designed to make assessments more engaging for children while helping teachers identify learning gaps early. By turning assessments into interactive, game-like experiences, the platform encourages children to learn through play while giving teachers actionable insights into their students' progress.

## Problem Statement
**How might we gamify assessments for children so that teachers can identify learning gaps early and give students enough time to catch up?**

Traditional assessments may not always keep children engaged or provide teachers with timely insights into specific areas where students struggle. Without early identification, these learning gaps can accumulate and become harder to address.

## Our Solution
Our platform reimagines assessments as engaging, game-based activities that make learning more enjoyable for children. Assessment results are translated into insights that help teachers understand each student's strengths, weaknesses, and areas requiring additional support.

## Key Objectives
- **Engage through gamification:** Make assessments interactive and enjoyable to encourage participation.
- **Identify learning gaps early:** Highlight concepts and skills that students have yet to master.
- **Empower teachers with insights:** Provide a clearer picture of individual and class-wide learning progress.
- **Enable timely intervention:** Help teachers provide targeted support before learning gaps widen.

## Vision
We aim to bridge the gap between assessment and action, transforming assessments from a way of measuring performance into an opportunity to improve learning. By combining engaging experiences for children with actionable insights for teachers, we hope to help every child get the support they need, when they need it most.

React (Vite) + Express + Postgres (Supabase).

## Setup
1. Create a Supabase project. In its SQL editor, run `schema.sql`, then `seed.sql` for made-up demo data.
2. `cp server/.env.example server/.env` and fill in `SUPABASE_URL` (project URL only), `SUPABASE_SERVICE_KEY`
   (the `sb_secret_...` key) and `SESSION_SECRET` (any long random string).
3. Add a teacher: in Supabase, Authentication > Users > Add user with `teacher@example.com` and a password
   (tick "Auto Confirm User"). `seed.sql` links that email to teacher ID `T001`.
4. `npm run install:all`
5. `npm run dev` — client on http://localhost:5173, API on http://localhost:5000

## How data flows
- Login: `POST /api/auth/lookup` (ID), then `POST /api/auth/login` for teachers. The server sets an httpOnly
  session cookie; the browser never talks to Supabase directly.
- Game: `saveResult()` in `client/src/game/results.js` posts each answer to `POST /api/results`.
- Dashboard: reads `GET /api/dashboard/...` (teachers only).
