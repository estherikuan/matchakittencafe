import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { listNotes } from "@/lib/notes.functions";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/_authenticated/notes")({
  head: () => ({
    meta: [
      { title: "The Note Jar — Matcha Kitten's Café" },
      { name: "description", content: "Notes visitors have dropped in the café jar." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: NotesAdmin,
});

function NotesAdmin() {
  const navigate = useNavigate();
  const fetchNotes = useServerFn(listNotes);
  const { data, isLoading, error } = useQuery({
    queryKey: ["notes-admin"],
    queryFn: () => fetchNotes(),
  });

  const signOut = async () => {
    await supabase.auth.signOut();
    navigate({ to: "/auth", replace: true });
  };

  return (
    <main className="min-h-screen bg-cream text-ink px-4 py-12" style={{ fontFamily: "var(--font-body)" }}>
      <div className="mx-auto max-w-2xl">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-matcha-deep/70">the note jar</p>
            <h1 className="mt-1 text-4xl text-wood-deep" style={{ fontFamily: "var(--font-display)", fontStyle: "italic" }}>
              notes from visitors
            </h1>
          </div>
          <button
            onClick={signOut}
            className="rounded-full border border-wood/30 px-3 py-1.5 text-xs uppercase tracking-widest text-wood-deep hover:bg-wood/10"
          >
            sign out
          </button>
        </div>

        {isLoading && <p className="mt-8 text-wood/60">reading the jar…</p>}
        {error && (
          <p className="mt-8 rounded-lg bg-parchment p-4 text-wood-deep">
            {error instanceof Error && error.message === "Forbidden"
              ? "this jar isn't yours to read. ask matcha kitten to grant you admin access."
              : error instanceof Error
                ? error.message
                : "couldn't load notes"}
          </p>
        )}

        {data && data.length === 0 && (
          <p className="mt-8 text-wood/60">the jar is empty for now ✿</p>
        )}

        <ul className="mt-8 grid gap-4">
          {data?.map((n) => (
            <li
              key={n.id}
              className="rounded-xl bg-parchment p-5 shadow-[0_10px_24px_rgba(30,20,10,0.15)]"
            >
              <div className="flex items-baseline justify-between gap-4">
                <p
                  className="text-lg text-wood-deep"
                  style={{ fontFamily: "var(--font-display)", fontStyle: "italic" }}
                >
                  {n.name?.trim() || "anonymous friend"}
                </p>
                <p className="text-xs text-wood/50">
                  {new Date(n.created_at).toLocaleString()}
                </p>
              </div>
              <p
                className="mt-2 whitespace-pre-wrap text-wood-deep/90"
                style={{ fontFamily: "var(--font-hand)", fontSize: "1.15rem" }}
              >
                {n.body}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}