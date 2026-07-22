## Goal

Turn the note jar prototype into a real feature: notes get saved to Lovable Cloud, visitors see a live count of how many notes have been left in the jar, and Esther gets a private admin page to read them.

## What visitors see

- Note jar hover tooltip updates to something like "leave a note · N notes in the jar" so people know others have contributed. Count is live from the database.
- Submitting a note posts it to Lovable Cloud (name optional, note required, both length-capped). The paper-rustle sound + thank-you state stay as they are.
- After a successful submit, the jar count increments (optimistically, then confirmed).
- No visitor can read others' notes — only the count is public.

## Admin page (`/notes`)

- Route lives under the auth-gated area so only signed-in users can view it.
- Only Esther's account can actually load the notes (checked via a `user_roles` table + `has_role('admin')` — never a hardcoded email in client code).
- Shows a list of notes: name (or "anonymous"), note body, timestamp, newest first.
- Simple, on-theme styling (parchment card list) — not a full dashboard.

## Backend (Lovable Cloud)

Enable Lovable Cloud, then create:

- `notes` table: `id`, `name` (nullable), `body` (text, capped), `created_at`.
- `app_role` enum + `user_roles` table + `has_role()` security-definer function (per project convention for admin checks).
- RLS:
  - `INSERT` for `anon` + `authenticated` (public can leave a note).
  - `SELECT` restricted to admins only (`has_role(auth.uid(), 'admin')`).
- A public `notes_count` view or an RPC that returns just the integer count, granted to `anon` — so the jar can show the count without exposing rows.
- Grants set explicitly per project convention.

Server functions (all in `src/lib/notes.functions.ts`):

- `submitNote({ name, body })` — public, validates with Zod (trim, length caps, basic anti-spam like max length + rate-limit-by-IP-in-memory best-effort), inserts via the publishable-key server client.
- `getNotesCount()` — public, returns `{ count }` from the view/RPC.
- `listNotes()` — uses `requireSupabaseAuth`, verifies caller has `admin` role, returns notes.

## Frontend wiring

- `CafeInterior.tsx`: fetch count via TanStack Query on mount + after successful submit; show it in the jar tooltip. Submit handler swaps `localStorage` for `submitNote` server fn via `useMutation`.
- New `src/routes/_authenticated/notes.tsx` route with `head()` metadata, loader that calls `listNotes`, styled list.
- Auth: add a minimal `/auth` sign-in page (email + password + Google, per Cloud defaults) if not already present — needed so Esther can sign in to reach `/notes`.
- After Esther signs up once, grant her the `admin` role via a one-time insert.

## Technical notes

- Uses Lovable Cloud (Supabase under the hood).
- `notes` writes go through a publishable-key server client (RLS allows anon INSERT with column checks); reads are admin-only via `requireSupabaseAuth` + `has_role`.
- Count endpoint uses a `SECURITY DEFINER` SQL function returning `bigint`, granted to `anon` — avoids exposing row-level data.
- Basic abuse mitigation: length caps (name ≤ 60, body ≤ 500), reject empty bodies, strip control chars. (Full rate limiting would need extra infra — flag if you want it.)

## Open question

Do you want the jar to also show a small "recent notes" teaser (e.g. first names only, or just a "someone just left a note ✿" ping), or keep it to just the count for privacy? Default in this plan: count only.
