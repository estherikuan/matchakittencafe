import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import cafeInterior from "@/assets/cafe-interior.png";
import lofiTrack from "@/assets/cutie-japan-lofi.mp3.asset.json";

type Props = { onLeave: () => void };

type MenuItem = {
  id: string;
  title: string;
  sub: string;
  href?: string;
  external?: boolean;
};

const MENU: MenuItem[] = [
  { id: "chaday", title: "chaday.app", sub: "web application for matcha enthusiasts", href: "https://chaday.app", external: true },
  { id: "portal", title: "Portal Courtyard", sub: "web development for local bnb", href: "https://portalcourtyard.com/", external: true },
  { id: "about", title: "About the barista", sub: "a little note from me" },
  { id: "email", title: "Email", sub: "estherikuan@yahoo.com", href: "mailto:estherikuan@yahoo.com", external: true },
  { id: "linkedin", title: "LinkedIn", sub: "esther-kuan", href: "https://www.linkedin.com/in/esther-kuan/", external: true },
];

export function CafeInterior({ onLeave }: Props) {
  const [selected, setSelected] = useState<MenuItem | null>(null);
  const [muted, setMuted] = useState(true);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const a = audioRef.current;
    if (!a) return;
    a.volume = 0.35;
    if (muted) a.pause();
    else a.play().catch(() => {});
  }, [muted]);

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-wood-deep">
      <audio ref={audioRef} src={lofiTrack.url} loop preload="auto" />
      <button
        onClick={() => setMuted((m) => !m)}
        aria-label={muted ? "Play café music" : "Pause café music"}
        aria-pressed={!muted}
        className="group absolute right-6 top-6 z-30 flex flex-col items-center gap-2 focus:outline-none"
      >
        <motion.span
          className="pointer-events-none absolute -inset-3 rounded-full"
          animate={
            muted
              ? { boxShadow: ["0 0 0 0 rgba(240,220,180,0.35)", "0 0 0 14px rgba(240,220,180,0)"] }
              : { boxShadow: "0 0 0 0 rgba(0,0,0,0)" }
          }
          transition={{ duration: 1.8, repeat: muted ? Infinity : 0, ease: "easeOut" }}
        />
        <motion.span
          aria-hidden
          className="relative flex h-16 w-16 items-center justify-center rounded-full shadow-[0_10px_20px_rgba(30,20,10,0.35)] ring-1 ring-black/40 transition-transform group-hover:scale-105"
          style={{
            background:
              "repeating-radial-gradient(circle at center, oklch(0.18 0.01 60) 0px, oklch(0.18 0.01 60) 2px, oklch(0.13 0.01 60) 3px, oklch(0.13 0.01 60) 4px)",
          }}
          animate={{ rotate: muted ? 0 : 360 }}
          transition={
            muted
              ? { duration: 0.4, ease: "easeOut" }
              : { duration: 4, repeat: Infinity, ease: "linear" }
          }
        >
          <span
            className="flex h-6 w-6 items-center justify-center rounded-full text-[10px] font-bold uppercase tracking-tight text-parchment shadow-inner"
            style={{
              background:
                "radial-gradient(circle at 30% 30%, oklch(0.75 0.14 145), oklch(0.5 0.15 150))",
            }}
          >
            {muted ? "▶" : "♪"}
          </span>
          <span className="absolute h-1.5 w-1.5 rounded-full bg-parchment/90" />
        </motion.span>
        <span
          className="rounded-full bg-parchment/90 px-2 py-0.5 text-[0.6rem] uppercase tracking-[0.25em] text-wood-deep shadow"
          style={{ fontFamily: "var(--font-hand)", letterSpacing: "0.15em" }}
        >
          {muted ? "press play" : "now spinning"}
        </span>
      </button>
      {/* soft interior ambient wash */}
      <div
        className="absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(70% 60% at 50% 40%, oklch(0.86 0.05 85) 0%, oklch(0.72 0.05 70) 55%, oklch(0.42 0.05 55) 100%)",
        }}
      />

      <section className="relative mx-auto flex min-h-screen max-w-[1400px] flex-col items-center justify-center px-4 py-12">
        {/* Camera-settle framing */}
        <motion.div
          initial={{ opacity: 0, scale: 1.08 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto w-full max-w-[1080px]"
        >
          {/* Painted interior backdrop */}
          <motion.img
            src={cafeInterior}
            alt="Inside the matcha café — the kitten whisks a bowl of matcha behind the counter"
            width={1600}
            height={1200}
            className="pointer-events-none block h-auto w-full select-none rounded-2xl shadow-[0_40px_80px_rgba(30,20,10,0.45)]"
            animate={{ y: [0, -3, 0] }}
            transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
            draggable={false}
          />

          {/* Pendant lamp warm glow — sits over the lamp in the painting */}
          <motion.div
            aria-hidden
            className="pointer-events-none absolute"
            style={{
              left: "44%",
              top: "3%",
              width: "16%",
              height: "22%",
              background:
                "radial-gradient(circle, oklch(0.92 0.14 80 / 0.55) 0%, oklch(0.85 0.12 75 / 0.15) 45%, transparent 70%)",
              filter: "blur(6px)",
              mixBlendMode: "screen",
            }}
            animate={{ opacity: [0.75, 1, 0.85, 1, 0.75] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* Steam rising from the matcha bowl */}
          <div
            aria-hidden
            className="pointer-events-none absolute"
            style={{ left: "26%", top: "48%", width: "10%", height: "22%" }}
          >
            {[0, 1, 2].map((i) => (
              <motion.span
                key={i}
                className="absolute left-1/2 bottom-0 h-8 w-8 -translate-x-1/2 rounded-full"
                style={{
                  background:
                    "radial-gradient(circle, oklch(1 0 0 / 0.55) 0%, oklch(1 0 0 / 0) 70%)",
                  filter: "blur(2px)",
                }}
                animate={{
                  y: [0, -60, -120],
                  x: [0, i === 1 ? 6 : -6, 0],
                  scale: [0.6, 1.1, 1.4],
                  opacity: [0, 0.65, 0],
                }}
                transition={{
                  duration: 3.6,
                  delay: i * 1.2,
                  repeat: Infinity,
                  ease: "easeOut",
                }}
              />
            ))}
          </div>

          {/* Left ivy sway */}
          <motion.div
            aria-hidden
            className="pointer-events-none absolute left-0 top-0 h-[35%] w-[10%] origin-top"
            animate={{ rotate: [-1.5, 1.5, -1.5] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            style={{ transformOrigin: "top center" }}
          />
          {/* Right ivy sway */}
          <motion.div
            aria-hidden
            className="pointer-events-none absolute right-0 top-0 h-[40%] w-[12%] origin-top"
            animate={{ rotate: [1.5, -1.5, 1.5] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            style={{ transformOrigin: "top center" }}
          />

          {/* Menu overlay — sits on the blank chalkboard in the painting */}
          <div
            className="absolute grid gap-2 text-left"
            style={{
              left: "6%",
              top: "12%",
              width: "36%",
              height: "30%",
              alignContent: "center",
            }}
          >
            <motion.p
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4, duration: 0.6 }}
              className="text-center text-parchment/70"
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "0.65rem",
                letterSpacing: "0.35em",
                textTransform: "uppercase",
              }}
            >
              {"\n"}
            </motion.p>
            <ul className="mt-1 grid grid-cols-1 gap-1 sm:grid-cols-2 sm:grid-rows-3 sm:grid-flow-col" style={{ marginLeft: "18px", marginTop: "18px" }}>
              {MENU.map((m, i) => (
                <motion.li
                  key={m.id}
                  initial={{ opacity: 0, x: -6 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.5 + i * 0.12, duration: 0.5 }}
                  style={m.id === "about" || m.id === "email" || m.id === "linkedin" ? { marginLeft: "18px" } : undefined}
                >
                  <button
                    onClick={() =>
                      m.external && m.href
                        ? window.open(m.href, "_blank", "noopener,noreferrer")
                        : setSelected(m)
                    }
                    className="group block w-full rounded-md px-2 py-1 text-left text-parchment/95 transition hover:bg-parchment/10 focus:bg-parchment/10 focus:outline-none"
                    style={{ fontFamily: "var(--font-hand)" }}
                  >
                    <span className="flex items-baseline gap-1.5 text-[clamp(1.0625rem,1.625vw,1.4375rem)] leading-tight">
                      <span className="text-parchment/60">·</span>
                      <span className="underline decoration-parchment/0 decoration-1 underline-offset-4 transition-all group-hover:decoration-parchment/60">
                        {m.title}
                      </span>
                      {m.external && (
                        <span className="text-[0.8125rem] text-parchment/50">↗</span>
                      )}
                    </span>
                    <span className="ml-3 block text-[0.875rem] text-parchment/55">
                      {m.sub}
                    </span>
                  </button>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Kitten whisking — subtle bob + Instagram tooltip on hover */}
          <motion.a
            href="https://www.instagram.com/matcha.kitten"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Visit Matcha Kitten on Instagram"
            className="group absolute z-20"
            style={{ left: "22%", top: "38%", width: "18%", height: "30%" }}
            animate={{ rotate: [-0.6, 0.6, -0.6] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          >
            <span className="sr-only">Follow Matcha Kitten on Instagram</span>
            <span
              className="pointer-events-none absolute left-1/2 -top-4 -translate-x-1/2 -translate-y-full whitespace-nowrap rounded-xl bg-parchment px-4 py-2 text-wood-deep opacity-0 shadow-[0_10px_24px_rgba(30,20,10,0.35)] transition-all duration-300 group-hover:-translate-y-full group-hover:opacity-100 group-focus-visible:opacity-100"
              style={{ fontFamily: "var(--font-hand)", fontSize: "1.05rem" }}
            >
              psst — follow me on instagram ↗
              <span
                aria-hidden
                className="absolute left-1/2 top-full -translate-x-1/2 -translate-y-1/2 rotate-45 h-3 w-3 bg-parchment"
              />
            </span>
          </motion.a>

        </motion.div>

        {/* Bottom bar: hint + leave */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2, duration: 0.8 }}
          className="relative mt-6 flex w-full max-w-[1080px] items-center justify-center gap-3 text-parchment/80"
        >
          <button
            onClick={onLeave}
            className="absolute left-0 top-1/2 -translate-y-1/2 rounded-full border border-parchment/30 bg-ink/40 px-4 py-2 text-xs uppercase tracking-widest text-parchment/80 backdrop-blur-sm transition hover:bg-parchment/10"
          >
            ← back outside
          </button>
          <p style={{ fontFamily: "var(--font-hand)", fontSize: "1.4375rem" }}>
            welcome in — take a seat, order from the menu
          </p>
        </motion.div>
      </section>

      {/* Selected menu item — a little note card slides in */}
      <AnimatePresence>
        {selected && (
          <motion.div
            className="fixed inset-0 z-40 flex items-center justify-center bg-ink/50 backdrop-blur-sm px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
          >
            <motion.div
              onClick={(e) => e.stopPropagation()}
              initial={{ y: 30, scale: 0.95, opacity: 0, rotate: -1 }}
              animate={{ y: 0, scale: 1, opacity: 1, rotate: -0.5 }}
              exit={{ y: 20, scale: 0.95, opacity: 0 }}
              transition={{ type: "spring", stiffness: 200, damping: 22 }}
              className="max-w-md rounded-xl p-8 text-center shadow-2xl"
              style={{
                background:
                  "radial-gradient(circle at 20% 10%, oklch(0.96 0.03 90) 0%, oklch(0.9 0.04 82) 100%)",
              }}
            >
              <p className="text-xs uppercase tracking-[0.35em] text-matcha-deep/70">
                on the menu
              </p>
              <h3
                className="mt-3 text-3xl text-wood-deep"
                style={{ fontFamily: "var(--font-display)", fontStyle: "italic" }}
              >
                {selected.title}
              </h3>
              <p className="mt-1 text-sm text-wood/70">{selected.sub}</p>
              <p
                className="mt-6 text-wood-deep/80"
                style={{ fontFamily: "var(--font-hand)", fontSize: "1.1rem" }}
              >
                *the kitten pours you a cup — this case study is still steeping. come back soon.*
              </p>
              <button
                onClick={() => setSelected(null)}
                className="mt-6 rounded-full border border-wood/30 px-4 py-1.5 text-xs uppercase tracking-widest text-wood-deep transition hover:bg-wood/10"
              >
                close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}