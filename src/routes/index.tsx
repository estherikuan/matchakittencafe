import { createFileRoute } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { useMemo, useState } from "react";
import cafeExterior from "@/assets/cafe-exterior.png";
import chalkboard from "@/assets/chalkboard-sign.png";

export const Route = createFileRoute("/")({
  component: CafeExterior,
  head: () => ({
    meta: [
      { title: "Matcha Kitten's Café — Portfolio" },
      {
        name: "description",
        content:
          "A cozy hand-painted matcha café. Peek at the menu or step inside to explore Matcha Kitten's work.",
      },
    ],
  }),
});

type MenuItem = { title: string; sub: string; href?: string };
const MENU: MenuItem[] = [
  { title: "chaday.app", sub: "— today's special" },
  { title: "Portal Courtyard", sub: "— seasonal blend" },
  { title: "Case Study №1", sub: "— brewing soon" },
];

function CafeExterior() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [entering, setEntering] = useState(false);

  const petals = useMemo(
    () =>
      Array.from({ length: 18 }).map((_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 12,
        duration: 14 + Math.random() * 10,
        size: 8 + Math.random() * 10,
        sway: 20 + Math.random() * 40,
        rot: Math.random() * 360,
      })),
    [],
  );

  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-cream text-ink font-[var(--font-body)]">
      {/* Sky wash */}
      <div
        className="absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(120% 80% at 50% 100%, oklch(0.93 0.04 90) 0%, oklch(0.88 0.05 100) 40%, oklch(0.82 0.06 110) 100%)",
        }}
      />

      {/* Scene */}
      <section className="relative mx-auto flex min-h-screen max-w-[1400px] flex-col items-center justify-end px-4 pb-6 pt-10 sm:pt-16">
        {/* Title whisper */}
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.3 }}
          className="pointer-events-none absolute left-1/2 top-6 z-20 -translate-x-1/2 text-center sm:top-10"
        >
          <p
            className="text-[0.7rem] uppercase tracking-[0.4em] text-matcha-deep/70"
            style={{ fontFamily: "var(--font-body)" }}
          >
            welcome to
          </p>
          <h1
            className="mt-1 text-3xl leading-none text-wood-deep sm:text-5xl"
            style={{ fontFamily: "var(--font-display)", fontStyle: "italic", fontWeight: 500 }}
          >
            Matcha Kitten's Café
          </h1>
        </motion.div>

        {/* Cafe illustration + hotspots */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
          className="relative w-full max-w-[1200px]"
        >
          <motion.img
            src={cafeExterior}
            alt="A hand-painted matcha café with a small kitten barista at the door"
            width={1600}
            height={1200}
            className="pointer-events-none block h-auto w-full select-none drop-shadow-[0_30px_60px_rgba(80,60,30,0.25)]"
            animate={{ y: [0, -4, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            draggable={false}
          />

          {/* Door hotspot — center bottom of the cafe */}
          <button
            onClick={() => setEntering(true)}
            aria-label="Step inside the café"
            className="group absolute left-[41%] top-[52%] h-[38%] w-[14%] rounded-t-[40%] focus:outline-none"
          >
            <span className="pointer-events-none absolute inset-0 rounded-t-[40%] bg-lantern/0 transition duration-500 group-hover:bg-lantern/25 group-focus-visible:bg-lantern/30" />
            <motion.span
              className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-parchment/95 px-3 py-1 text-xs text-wood-deep shadow-md opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100"
              style={{ fontFamily: "var(--font-hand)", fontSize: "1.05rem" }}
              transition={{ duration: 0.3 }}
            >
              step inside →
            </motion.span>
          </button>

          {/* Chalkboard hotspot — bottom right area */}
          <button
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Read today's menu"
            aria-expanded={menuOpen}
            className="group absolute left-[6%] top-[68%] h-[26%] w-[13%] focus:outline-none"
          >
            <span className="pointer-events-none absolute inset-0 rounded-lg ring-0 ring-lantern/60 transition duration-500 group-hover:ring-4 group-focus-visible:ring-4" />
            <motion.span
              className="pointer-events-none absolute -top-7 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-parchment/95 px-3 py-1 text-wood-deep shadow-md opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100"
              style={{ fontFamily: "var(--font-hand)", fontSize: "1.05rem" }}
            >
              today's menu
            </motion.span>
          </button>
        </motion.div>

        {/* Footer hint */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6, duration: 1 }}
          className="mt-6 text-center text-sm text-wood-deep/70"
          style={{ fontFamily: "var(--font-hand)", fontSize: "1.15rem" }}
        >
          tap the door to come in · peek at the chalkboard for today's specials
        </motion.p>
      </section>

      {/* Falling cherry petals */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {petals.map((p) => (
          <motion.span
            key={p.id}
            className="absolute -top-6 rounded-full"
            style={{
              left: `${p.left}%`,
              width: p.size,
              height: p.size * 0.7,
              background:
                "radial-gradient(circle at 30% 30%, oklch(0.92 0.06 15), oklch(0.82 0.09 10))",
              filter: "blur(0.3px)",
              transform: `rotate(${p.rot}deg)`,
            }}
            animate={{
              y: ["-5vh", "110vh"],
              x: [0, p.sway, -p.sway * 0.6, 0],
              rotate: [p.rot, p.rot + 240],
            }}
            transition={{
              duration: p.duration,
              delay: p.delay,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}
      </div>

      {/* Chalkboard menu overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-40 flex items-center justify-center bg-ink/40 backdrop-blur-sm px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMenuOpen(false)}
          >
            <motion.div
              onClick={(e) => e.stopPropagation()}
              initial={{ scale: 0.85, rotate: -3, opacity: 0, y: 30 }}
              animate={{ scale: 1, rotate: -1.5, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, rotate: -3, opacity: 0, y: 20 }}
              transition={{ type: "spring", stiffness: 180, damping: 18 }}
              className="relative w-full max-w-md"
            >
              <img
                src={chalkboard}
                alt=""
                width={800}
                height={1008}
                className="pointer-events-none h-auto w-full select-none drop-shadow-2xl"
                draggable={false}
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center px-[18%] py-[22%] text-parchment">
                <p
                  className="mb-3 text-center text-sm uppercase tracking-[0.35em] text-parchment/80"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  today's menu
                </p>
                <div
                  className="mb-4 h-px w-16 bg-parchment/50"
                  aria-hidden
                />
                <ul className="w-full space-y-3">
                  {MENU.map((m, i) => (
                    <motion.li
                      key={m.title}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.15 + i * 0.1 }}
                      className="text-center"
                    >
                      <p
                        className="text-xl leading-tight text-parchment"
                        style={{ fontFamily: "var(--font-hand)" }}
                      >
                        {m.title}
                      </p>
                      <p
                        className="text-xs text-parchment/70"
                        style={{ fontFamily: "var(--font-hand)" }}
                      >
                        {m.sub}
                      </p>
                    </motion.li>
                  ))}
                </ul>
                <button
                  onClick={() => setMenuOpen(false)}
                  className="mt-6 rounded-full border border-parchment/40 px-4 py-1 text-xs uppercase tracking-widest text-parchment/80 transition hover:bg-parchment/10"
                >
                  close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Entering transition (placeholder for next scene) */}
      <AnimatePresence>
        {entering && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-wood-deep"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="max-w-md px-6 text-center text-parchment"
            >
              <p
                className="text-4xl"
                style={{ fontFamily: "var(--font-hand)" }}
              >
                *the little bell chimes*
              </p>
              <p
                className="mt-4 text-sm uppercase tracking-[0.35em] text-parchment/70"
              >
                the interior scene is brewing…
              </p>
              <button
                onClick={() => setEntering(false)}
                className="mt-8 rounded-full border border-parchment/40 px-5 py-2 text-xs uppercase tracking-widest text-parchment/80 transition hover:bg-parchment/10"
              >
                step back outside
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}