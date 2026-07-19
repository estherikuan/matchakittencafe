import { createFileRoute } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { useRef, useState } from "react";
import { CafeExterior } from "@/components/scene/CafeExterior";
import { CafeInterior } from "@/components/scene/CafeInterior";
import bellSound from "@/assets/bell-ring.mp3.asset.json";

type Scene = "exterior" | "transition" | "interior";

export const Route = createFileRoute("/")({
  component: Cafe,
  head: () => ({
    meta: [
      { title: "Matcha Kitten's Café — Portfolio" },
      {
        name: "description",
        content:
          "A cozy hand-painted matcha café. Step inside to explore Matcha Kitten's work.",
      },
    ],
  }),
});

function Cafe() {
  const [scene, setScene] = useState<Scene>("exterior");
  const bellRef = useRef<HTMLAudioElement | null>(null);

  const chime = () => {
    const a = bellRef.current;
    if (!a) return;
    a.currentTime = 0;
    a.volume = 0.6;
    a.play().catch(() => {});
  };

  const enter = () => {
    chime();
    setScene("transition");
    // let the door-chime overlay linger, then settle into the interior
    window.setTimeout(() => setScene("interior"), 1400);
  };

  const leave = () => {
    chime();
    setScene("transition");
    window.setTimeout(() => setScene("exterior"), 1000);
  };

  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-cream text-ink" style={{ fontFamily: "var(--font-body)" }}>
      <audio ref={bellRef} src={bellSound.url} preload="auto" />
      <AnimatePresence mode="wait">
        {scene === "exterior" && (
          <motion.div
            key="exterior"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
          >
            <CafeExterior onEnter={enter} />
          </motion.div>
        )}

        {scene === "interior" && (
          <motion.div
            key="interior"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
          >
            <CafeInterior onLeave={leave} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Door-chime transition curtain */}
      <AnimatePresence>
        {scene === "transition" && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-wood-deep"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-center text-parchment"
            >
              <p style={{ fontFamily: "var(--font-hand)", fontSize: "2.25rem" }}>
                *ding — the little bell chimes*
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}