import { motion } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence } from "framer-motion";
import cafeExterior from "@/assets/cafe-exterior.png";
import lofiTrack from "@/assets/lofi-nemuko.mp3.asset.json";
import meowSound from "@/assets/cat-meow.mp3.asset.json";

type Props = { onEnter: () => void };

export function CafeExterior({ onEnter }: Props) {
  const [peek, setPeek] = useState(false);
  const [muted, setMuted] = useState(true);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const a = audioRef.current;
    if (!a) return;
    a.volume = 0.35;
    if (muted) {
      a.pause();
    } else {
      a.play().catch(() => {});
    }
  }, [muted]);

  useEffect(() => {
    const meow = new Audio(meowSound.url);
    meow.volume = 0.7;
    const play = () => {
      meow.play().catch(() => {});
      window.removeEventListener("pointerdown", play);
      window.removeEventListener("keydown", play);
    };
    // try immediately; if browser blocks autoplay, wait for first interaction
    meow.play().catch(() => {
      window.addEventListener("pointerdown", play, { once: true });
      window.addEventListener("keydown", play, { once: true });
    });
    return () => {
      window.removeEventListener("pointerdown", play);
      window.removeEventListener("keydown", play);
    };
  }, []);

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
      <audio ref={audioRef} src={lofiTrack.url} loop preload="auto" />
      <button
        onClick={() => setMuted((m) => !m)}
        aria-label={muted ? "Play café music" : "Pause café music"}
        aria-pressed={!muted}
        className="group fixed bottom-6 right-6 z-30 flex flex-col items-center gap-2 focus:outline-none"
      >
        <motion.span
          className="pointer-events-none absolute -inset-3 rounded-full"
          animate={
            muted
              ? { boxShadow: ["0 0 0 0 rgba(120,90,40,0.35)", "0 0 0 14px rgba(120,90,40,0)"] }
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
                "radial-gradient(circle at 30% 30%, oklch(0.72 0.16 25), oklch(0.5 0.18 20))",
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
                  <a
                    href="https://chaday.app"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ fontFamily: "var(--font-hand)", fontSize: "1.5rem" }}
                    className="text-wood-deep underline decoration-matcha-deep/40 decoration-1 underline-offset-4 transition hover:decoration-matcha-deep"
                  >
                    chaday.app
                  </a>
                  <p className="text-xs text-wood/70">— web application</p>
                </li>
                <li>
                  <a
                    href="https://portalcourtyard.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ fontFamily: "var(--font-hand)", fontSize: "1.5rem" }}
                    className="text-wood-deep underline decoration-matcha-deep/40 decoration-1 underline-offset-4 transition hover:decoration-matcha-deep"
                  >
                    Portal Courtyard
                  </a>
                  <p className="text-xs text-wood/70">— web development</p>
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