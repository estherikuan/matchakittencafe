import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, ArrowRight, ArrowLeft } from "lucide-react";
import cafeInterior from "@/assets/cafe-interior.png";
import lofiTrack from "@/assets/cutie-japan-lofi.mp3.asset.json";
import lovableIcon from "@/assets/lovable-icon.webp.asset.json";
import claudeIcon from "@/assets/claude-icon.webp.asset.json";
import recordImage from "@/assets/record-player.webp.asset.json";
import estherPhoto from "@/assets/esther.jpeg.asset.json";

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
  { id: "flowforger", title: "FlowForger", sub: "AI workflow tool", href: "https://asanabuilder-ai.lovable.app", external: true },
  { id: "about", title: "About the barista", sub: "a little note from me" },
];

export function CafeInterior({ onLeave }: Props) {
  const [selected, setSelected] = useState<MenuItem | null>(null);
  const [muted, setMuted] = useState(true);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const a = audioRef.current;
    if (a) {
      a.volume = 0.35;
      if (muted) a.pause();
      else a.play().catch(() => {});
    }
  }, [muted]);

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-wood-deep">
      <audio ref={audioRef} src={lofiTrack.url} loop preload="auto" />
      {/* soft interior ambient wash */}
      <div
        className="absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(70% 60% at 50% 40%, oklch(0.86 0.05 85) 0%, oklch(0.72 0.05 70) 55%, oklch(0.42 0.05 55) 100%)",
        }}
      />

      <section className="relative mx-auto flex min-h-screen max-w-[1400px] flex-col items-center justify-center px-1 py-2 pb-32 sm:px-2 sm:py-8 sm:pb-32 lg:px-4 lg:py-12 lg:pb-36 portrait:justify-start portrait:pt-3 portrait:pb-32">
        {/* Camera-settle framing */}
        <motion.div
          initial={{ opacity: 0, scale: 1.08 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto w-full max-w-[1080px] overflow-hidden rounded-2xl portrait:h-[78vh]"
        >
          {/* Zoomable scene — in portrait the image is object-cover cropped so the
              cat + chalkboard fill the frame; overlays are repositioned to match. */}
          <div className="relative portrait:h-full portrait:w-full landscape:scale-100">
          {/* Painted interior backdrop */}
          <motion.img
            src={cafeInterior}
            alt="Inside the matcha café — the kitten whisks a bowl of matcha behind the counter"
            width={1600}
            height={1200}
            className="pointer-events-none block h-auto w-full select-none rounded-2xl shadow-[0_40px_80px_rgba(30,20,10,0.45)] portrait:h-full portrait:w-full portrait:object-cover portrait:object-[6%_0%]"
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
            className="absolute grid gap-2 text-left overflow-hidden portrait:!left-[6%] portrait:!top-[9%] portrait:!w-[81%] portrait:!h-[26%]"
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
            <ul className="mt-1 grid grid-cols-1 gap-x-3 gap-y-0.5 sm:gap-y-1 md:grid-cols-2 ml-1 sm:ml-[18px] mt-1 sm:mt-[18px] pr-1">
              {MENU.map((m, i) => {
                const pos: Record<string, string> = {
                  chaday: "md:col-start-1 md:row-start-1",
                  portal: "md:col-start-1 md:row-start-2",
                  flowforger: "md:col-start-2 md:row-start-1",
                  about: "md:col-start-2 md:row-start-2",
                };
                return (
                <motion.li
                  key={m.id}
                  initial={{ opacity: 0, x: -6 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.5 + i * 0.12, duration: 0.5 }}
                  className={`${pos[m.id]} min-w-0`}
                >
                  <button
                    onClick={() =>
                      m.external && m.href
                        ? window.open(m.href, "_blank", "noopener,noreferrer")
                        : setSelected(m)
                    }
                    className="group block w-full rounded-md px-1 py-0.5 sm:px-2 sm:py-1 text-left text-parchment/95 transition hover:bg-parchment/10 focus:bg-parchment/10 focus:outline-none"
                  >
                    <span
                      className="flex items-baseline gap-1 sm:gap-1.5 text-[clamp(0.6rem,2.2vw,1.4375rem)] portrait:text-[clamp(1rem,3.6vw,1.6rem)] leading-tight"
                      style={{ fontFamily: "var(--font-hand)" }}
                    >
                      <span className="text-parchment/60">·</span>
                      <span className="underline decoration-parchment/0 decoration-1 underline-offset-4 transition-all group-hover:decoration-parchment/60">
                        {m.title}
                      </span>
                      {m.external && (
                        <ArrowUpRight
                          aria-hidden
                          className="inline-block h-[0.9em] w-[0.9em] shrink-0 self-center text-parchment/50"
                          strokeWidth={2}
                        />
                      )}
                    </span>
                    <span
                      className="ml-2 sm:ml-3 block text-[clamp(0.55rem,1.5vw,0.875rem)] portrait:text-[clamp(0.75rem,2.2vw,1rem)] leading-tight text-parchment/55"
                      style={{ fontFamily: "var(--font-body)" }}
                    >
                      {m.sub}
                    </span>
                  </button>
                </motion.li>
                );
              })}
            </ul>
          </div>

          {/* Kitten whisking — subtle bob + Instagram tooltip on hover */}
          <motion.a
            href="https://www.instagram.com/matcha.kitten"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Visit Matcha Kitten on Instagram"
            className="group absolute z-20 portrait:!left-[42%] portrait:!top-[38%] portrait:!w-[41%] portrait:!h-[30%]"
            style={{ left: "22%", top: "38%", width: "18%", height: "30%" }}
            animate={{ rotate: [-0.6, 0.6, -0.6] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          >
            <span className="sr-only">Follow Matcha Kitten on Instagram</span>
            <span
              className="pointer-events-none absolute left-full top-1/2 ml-4 -translate-y-1/2 whitespace-nowrap rounded-xl bg-parchment px-4 py-2 text-wood-deep opacity-0 shadow-[0_10px_24px_rgba(30,20,10,0.35)] transition-all duration-300 group-hover:ml-6 group-hover:opacity-100 group-focus-visible:opacity-100 portrait:left-1/2 portrait:right-auto portrait:top-0 portrait:ml-0 portrait:-translate-x-1/2 portrait:-translate-y-[calc(100%+8px)] portrait:group-hover:ml-0 portrait:opacity-100"
              style={{ fontFamily: "var(--font-hand)", fontSize: "1.05rem" }}
            >
              <span className="inline-flex items-center gap-1">
                Make matcha with me!
                <ArrowUpRight aria-hidden className="h-[1em] w-[1em]" strokeWidth={2} />
              </span>
              <span
                aria-hidden
                className="absolute right-full top-1/2 -translate-y-1/2 translate-x-1/2 rotate-45 h-3 w-3 bg-parchment portrait:right-auto portrait:left-1/2 portrait:top-full portrait:-translate-x-1/2 portrait:-translate-y-1/2"
              />
            </span>
          </motion.a>

          {/* Bowls & cup on second shelf — reveal the tools I build with */}
          <div
            className="group absolute z-20 portrait:hidden"
            style={{ left: "58%", top: "28%", width: "32%", height: "12%" }}
            tabIndex={0}
            aria-label="Tools I build with"
          >
            <span
            className="pointer-events-none absolute left-1/2 -top-3 -translate-x-1/2 -translate-y-full flex w-max items-center gap-3 whitespace-nowrap rounded-2xl bg-parchment py-3 pl-5 pr-6 text-wood-deep opacity-0 shadow-[0_10px_24px_rgba(30,20,10,0.35)] transition-all duration-300 group-hover:-translate-y-full group-hover:opacity-100 group-focus-visible:opacity-100"
              style={{ fontFamily: "var(--font-hand)", fontSize: "1rem" }}
            >
            <span className="mr-1 inline-flex items-center gap-1">
              tools I build with
              <ArrowRight aria-hidden className="h-[1em] w-[1em]" strokeWidth={2} />
            </span>
            <img src={lovableIcon.url} alt="Lovable" className="h-8 w-8 shrink-0 rounded-md" />
            <img src={claudeIcon.url} alt="Claude" className="h-8 w-8 shrink-0 rounded-md" />
              <span
                aria-hidden
                className="absolute left-1/2 top-full -translate-x-1/2 -translate-y-1/2 rotate-45 h-3 w-3 bg-parchment"
              />
            </span>
          </div>

          </div>

          {/* Back outside — stays anchored to the frame, not the zoomed scene */}
          <button
            onClick={onLeave}
            aria-label="Head back outside"
            className="group absolute bottom-4 left-4 z-30 rounded-full bg-parchment/95 px-4 py-1.5 text-wood-deep shadow-md transition hover:bg-parchment hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-lantern/60"
            style={{ fontFamily: "var(--font-hand)", fontSize: "1.1rem" }}
          >
            <span className="inline-flex items-center gap-1.5">
              <ArrowLeft aria-hidden className="h-[1em] w-[1em]" strokeWidth={2} />
              back outside 🐾
            </span>
          </button>
        </motion.div>

        {/* Bottom bar: hint + leave */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2, duration: 0.8 }}
          className="relative mt-6 flex w-full max-w-[1080px] items-center justify-center gap-3 text-parchment/80"
        >
          <p style={{ fontFamily: "var(--font-hand)", fontSize: "1.4375rem" }}>
            welcome in — take a seat, order from the menu, spin the record for the vibes!
          </p>
        </motion.div>

        <div className="mt-10 flex w-full justify-center">
          <button
            onClick={() => setMuted((m) => !m)}
            aria-label={muted ? "Play café music" : "Pause café music"}
            aria-pressed={!muted}
            className="group relative flex flex-col items-center gap-2 focus:outline-none"
          >
            <motion.span
              className="pointer-events-none absolute -inset-2 rounded-2xl"
              animate={
                muted
                  ? { boxShadow: ["0 0 0 0 rgba(240,220,180,0.35)", "0 0 0 14px rgba(240,220,180,0)"] }
                  : { boxShadow: "0 0 0 0 rgba(0,0,0,0)" }
              }
              transition={{ duration: 1.8, repeat: muted ? Infinity : 0, ease: "easeOut" }}
            />
            <img
              src={recordImage.url}
              alt=""
              aria-hidden
              className="relative h-24 w-24 select-none object-contain drop-shadow-[0_10px_18px_rgba(30,20,10,0.35)] transition-transform group-hover:scale-105"
            />
            <span
              className="rounded-full bg-parchment/90 px-2 py-0.5 text-[0.6rem] uppercase tracking-[0.25em] text-wood-deep shadow"
              style={{ fontFamily: "var(--font-hand)", letterSpacing: "0.15em" }}
            >
              {muted ? "press play" : "now spinning"}
            </span>
          </button>
        </div>
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
              {selected.id === "about" && (
                <div className="mt-5 flex justify-center">
                  <svg width="0" height="0" className="absolute" aria-hidden>
                    <defs>
                      <clipPath id="flowerClip" clipPathUnits="objectBoundingBox">
                        <path d="M0.5,0.02 C0.62,0.02 0.7,0.11 0.68,0.22 C0.79,0.18 0.9,0.24 0.92,0.36 C0.94,0.46 0.88,0.55 0.79,0.58 C0.88,0.64 0.92,0.75 0.86,0.85 C0.79,0.95 0.66,0.96 0.58,0.88 C0.56,0.97 0.48,1.0 0.4,0.97 C0.31,0.94 0.27,0.85 0.3,0.77 C0.2,0.82 0.09,0.77 0.06,0.66 C0.03,0.56 0.09,0.46 0.19,0.43 C0.09,0.38 0.05,0.27 0.11,0.18 C0.18,0.08 0.31,0.08 0.38,0.16 C0.39,0.07 0.44,0.02 0.5,0.02 Z" />
                      </clipPath>
                    </defs>
                  </svg>
                  <div className="relative h-40 w-40">
                    <div
                      className="absolute inset-0"
                      style={{
                        background:
                          "radial-gradient(circle at 40% 35%, oklch(0.86 0.09 145), oklch(0.72 0.11 140))",
                        clipPath: "url(#flowerClip)",
                        transform: "scale(1.06)",
                      }}
                    />
                    <img
                      src={estherPhoto.url}
                      alt="Esther, aka Matcha Kitten"
                      className="absolute inset-0 h-full w-full object-cover"
                      style={{ clipPath: "url(#flowerClip)", objectPosition: "50% 18%", transform: "scale(1.35)", transformOrigin: "50% 25%" }}
                    />
                  </div>
                </div>
              )}
              <div
                className="mt-8 text-wood-deep/80"
                style={{ fontFamily: "var(--font-hand)", fontSize: "1.1rem" }}
              >
                *hands over a matcha*<br /><br />
                <div style={{ fontFamily: "var(--font-body)", fontSize: "1rem" }}>
                  Hi there, I am Esther aka Matcha Kitten.<br />
                  I design and build products using AI tools to go from 0 →1.&nbsp;<br /><br />
                  Right now I am building Chaday — the matcha database and journal app for enthusiasts.<br /><br />
                  &nbsp;Before this, I spent a few years in UX design and program management — now I build my own products, with AI as a creative partner instead of a team.
                </div>
              </div>
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