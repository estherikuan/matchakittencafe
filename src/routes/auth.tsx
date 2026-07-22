import { createFileRoute, useNavigate, redirect } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable/index";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "Sign in — Matcha Kitten's Café" },
      { name: "description", content: "Sign in to the café's little back room." },
      { name: "robots", content: "noindex" },
    ],
  }),
  beforeLoad: async () => {
    if (typeof window === "undefined") return;
    const { data } = await supabase.auth.getUser();
    if (data.user) throw redirect({ to: "/notes" });
  },
  component: AuthPage,
});

function AuthPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  useEffect(() => {
    const { data: sub } = supabase.auth.onAuthStateChange((_e, session) => {
      if (session) navigate({ to: "/notes" });
    });
    return () => sub.subscription.unsubscribe();
  }, [navigate]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setMsg(null);
    try {
      if (mode === "signup") {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: { emailRedirectTo: window.location.origin + "/auth" },
        });
        if (error) throw error;
        setMsg("check your email to confirm.");
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
      }
    } catch (err) {
      setMsg(err instanceof Error ? err.message : "something went wrong");
    } finally {
      setBusy(false);
    }
  };

  const google = async () => {
    setBusy(true);
    const res = await lovable.auth.signInWithOAuth("google", {
      redirect_uri: window.location.origin + "/auth",
    });
    if (res.error) {
      setMsg(res.error.message ?? "google sign-in failed");
      setBusy(false);
    }
  };

  return (
    <main className="min-h-screen bg-cream text-ink flex items-center justify-center px-4" style={{ fontFamily: "var(--font-body)" }}>
      <div className="w-full max-w-sm rounded-2xl bg-parchment p-8 shadow-[0_24px_48px_rgba(30,20,10,0.2)]">
        <p className="text-xs uppercase tracking-[0.35em] text-matcha-deep/70 text-center">the back room</p>
        <h1 className="mt-2 text-center text-3xl text-wood-deep" style={{ fontFamily: "var(--font-display)", fontStyle: "italic" }}>
          {mode === "signup" ? "join the café" : "welcome back"}
        </h1>

        <form onSubmit={onSubmit} className="mt-6 grid gap-3">
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="email"
            className="rounded-lg border border-wood/20 bg-cream px-3 py-2 focus:outline-none focus:ring-2 focus:ring-matcha-deep/40"
          />
          <input
            type="password"
            required
            minLength={6}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="password"
            className="rounded-lg border border-wood/20 bg-cream px-3 py-2 focus:outline-none focus:ring-2 focus:ring-matcha-deep/40"
          />
          <button
            type="submit"
            disabled={busy}
            className="mt-1 rounded-full bg-wood-deep px-5 py-2 text-parchment shadow-md transition hover:-translate-y-0.5 disabled:opacity-60"
            style={{ fontFamily: "var(--font-hand)", fontSize: "1.05rem" }}
          >
            {busy ? "…" : mode === "signup" ? "sign up" : "sign in"}
          </button>
        </form>

        <div className="mt-3 flex items-center gap-2 text-xs text-wood/50">
          <div className="h-px flex-1 bg-wood/20" />
          or
          <div className="h-px flex-1 bg-wood/20" />
        </div>

        <button
          onClick={google}
          disabled={busy}
          className="mt-3 w-full rounded-full border border-wood/20 bg-cream px-5 py-2 text-wood-deep transition hover:bg-wood/5 disabled:opacity-60"
          style={{ fontFamily: "var(--font-hand)", fontSize: "1.05rem" }}
        >
          continue with google
        </button>

        {msg && <p className="mt-4 text-center text-sm text-wood-deep/70">{msg}</p>}

        <button
          onClick={() => setMode((m) => (m === "signin" ? "signup" : "signin"))}
          className="mt-6 block w-full text-center text-xs uppercase tracking-widest text-wood-deep/60 hover:text-wood-deep"
        >
          {mode === "signin" ? "no account? sign up" : "have an account? sign in"}
        </button>
      </div>
    </main>
  );
}