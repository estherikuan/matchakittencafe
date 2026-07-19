import { motion } from "framer-motion";
import { useMemo, useState } from "react";
import { AnimatePresence } from "framer-motion";
import cafeExterior from "@/assets/cafe-exterior.png";

type Props = { onEnter: () => void };

export function CafeExterior({ onEnter }: Props) {
  const [peek, setPeek] = useState(false);

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
    <div className="relative min-h-screen w-full overflow-hidden">
      <div
        className="absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(120% 80% at 50% 100%, oklch(0.93 0.04 90) 0%, oklch(0.88 0.05 100) 40%, oklch(0.82 0.06 110) 100%)",
        }}
      />

      <section className="relative mx-auto flex min-h-screen max-w-[1400px] flex-col items-center justify-center px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.3 }}
          className="pointer-events-none absolute left-1/2 top-8 z-20 -translate-x-1/2 text-center sm:top-12"
        >
          <p className="text-[0.7rem] uppercase tracking-[0.4em] text-matcha-deep/70">
            welcome to
          </p>
          <h1
            className="mt-1 text-3xl leading-none text-wood-deep sm:text-5xl"
            style={{ fontFamily: "var(--font-display)", fontStyle: "italic", fontWeight: 500 }}
          >
            Matcha Kitten's Café
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.98, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto w-full max-w-[980px]"
        >
          <motion.img
            src={cafeExterior}
            alt="A hand-painted matcha café with a kitten barista at the door"
            width={1600}
            height={1200}
            className="pointer-events-none block h-auto w-full select-none rounded-2xl drop-shadow-[0_30px_60px_rgba(80,60,30,0.25)]"
            animate={{ y: [0, -4, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            draggable={false}
          />

          <button
            onClick={onEnter}
            aria-label="Step inside the café"
            className="group absolute left-[27%] top-[32%] h-[45%] w-[18%] rounded-t-[30%] focus:outline-none"
          >
            <span className="pointer-events-none absolute inset-0 rounded-t-[30%] bg-lantern/0 transition duration-500 group-hover:bg-lantern/25 group-focus-visible:bg-lantern/30" />
            <span
              className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-parchment/95 px-3 py-1 text-wood-deep shadow-md opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100"
              style={{ fontFamily: "var(--font-hand)", fontSize: "1.1rem" }}
            >
              step inside →
            </span>
          </button>

          <button
            onClick={() => setPeek((v) => !v)}
            aria-label="Peek at today's menu"
            aria-expanded={peek}
            className="group absolute left-[13%] top-[55%] h-[28%] w-[16%] focus:outline-none"
          >
            <span className="pointer-events-none absolute inset-0 rounded-lg ring-0 ring-lantern/60 transition duration-500 group-hover:ring-4 group-focus-visible:ring-4" />
            <span
              className="pointer-events-none absolute -top-7 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-parchment/95 px-3 py-1 text-wood-deep shadow-md opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100"
              style={{ fontFamily: "var(--font-hand)", fontSize: "1.1rem" }}
            >
              peek at the menu
            </span>
          </button>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6, duration: 1 }}
          className="mt-6 text-center text-wood-deep/70"
          style={{ fontFamily: "var(--font-hand)", fontSize: "1.2rem" }}
        >
          tap the door to come in · peek at the chalkboard for today's specials
        </motion.p>
      </section>

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

      <AnimatePresence>
        {peek && (
          <motion.div
            className="fixed inset-0 z-40 flex items-center justify-center bg-ink/40 backdrop-blur-sm px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setPeek(false)}
          >
            <motion.div
              onClick={(e) => e.stopPropagation()}
              initial={{ scale: 0.9, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
              className="max-w-sm rounded-2xl bg-parchment p-8 text-center shadow-2xl"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 20% 10%, oklch(0.96 0.03 90) 0%, oklch(0.9 0.04 82) 100%)",
              }}
            >
              <p className="text-xs uppercase tracking-[0.35em] text-matcha-deep/70">
                ON THE MENU
              </p>
              <div className="mx-auto mt-3 h-px w-12 bg-wood/40" />
              <ul className="mt-5 space-y-4">
                <li>
                  <p style={{ fontFamily: "var(--font-hand)", fontSize: "1.5rem" }} className="text-wood-deep">
                    chaday.app
                  </p>
                  <p className="text-xs text-wood/70">— today's special</p>
                </li>
                <li>
                  <p style={{ fontFamily: "var(--font-hand)", fontSize: "1.5rem" }} className="text-wood-deep">
                    Portal Courtyard
                  </p>
                  <p className="text-xs text-wood/70">— seasonal blend</p>
                </li>
                <li>
                  <p style={{ fontFamily: "var(--font-hand)", fontSize: "1.5rem" }} className="text-wood-deep">
                    Case Study №1
                  </p>
                  <p className="text-xs text-wood/70">— brewing soon</p>
                </li>
              </ul>
              <button
                onClick={onEnter}
                className="mt-6 rounded-full bg-matcha-deep px-5 py-2 text-xs uppercase tracking-widest text-parchment shadow-md transition hover:brightness-110"
              >
                come inside →
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}