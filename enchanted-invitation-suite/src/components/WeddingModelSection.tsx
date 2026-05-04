import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Divider from "@/components/Divider";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "model-viewer": any;
    }
  }
}

/* ───────── tiny floating-heart particle ───────── */
const Heart = ({ delay, left, size, duration }: { delay: number; left: string; size: number; duration: number }) => (
  <motion.span
    className="absolute bottom-0 pointer-events-none select-none text-gold/40"
    style={{ left, fontSize: size }}
    initial={{ opacity: 0, y: 0 }}
    animate={{ opacity: [0, 0.7, 0.7, 0], y: -320 }}
    transition={{ delay, duration, repeat: Infinity, ease: "easeOut" }}
    aria-hidden
  >
    ♥
  </motion.span>
);

/* ───────── sparkle dot ───────── */
const Sparkle = ({ delay, top, left, size }: { delay: number; top: string; left: string; size: number }) => (
  <motion.span
    className="absolute rounded-full bg-gold/50 pointer-events-none"
    style={{ top, left, width: size, height: size }}
    initial={{ opacity: 0, scale: 0 }}
    animate={{ opacity: [0, 1, 0], scale: [0, 1.2, 0] }}
    transition={{ delay, duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
    aria-hidden
  />
);

const WeddingModelSection = () => {
  useEffect(() => {
    void import("@google/model-viewer");
  }, []);

  const hearts = [
    { delay: 0, left: "15%", size: 16, duration: 4.5 },
    { delay: 1.2, left: "40%", size: 12, duration: 5 },
    { delay: 2, left: "70%", size: 18, duration: 4 },
    { delay: 0.8, left: "85%", size: 10, duration: 5.5 },
    { delay: 3, left: "28%", size: 14, duration: 4.8 },
    { delay: 1.8, left: "55%", size: 11, duration: 5.2 },
  ];

  const sparkles = [
    { delay: 0, top: "10%", left: "8%", size: 4 },
    { delay: 1, top: "25%", left: "90%", size: 3 },
    { delay: 0.5, top: "65%", left: "5%", size: 5 },
    { delay: 2, top: "15%", left: "75%", size: 3 },
    { delay: 1.5, top: "80%", left: "92%", size: 4 },
    { delay: 0.3, top: "50%", left: "12%", size: 3 },
    { delay: 2.5, top: "35%", left: "95%", size: 5 },
    { delay: 1.8, top: "72%", left: "18%", size: 4 },
  ];

  return (
    <div className="w-full max-w-5xl mx-auto text-center relative z-10 px-4">
      {/* Section heading */}
      <motion.p
        className="section-kicker mb-3"
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        Our Wedding Design
      </motion.p>

      <Divider />

      {/* Romantic quote above model */}
      <motion.p
        className="font-heading text-sm md:text-base italic text-envelope-dark font-semibold mt-4 mb-6"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3, duration: 1 }}
      >
        "A love story written in the stars"
      </motion.p>

      {/* Model container with cinematic styling */}
      <motion.div
        className="relative mt-2 rounded-3xl overflow-hidden border border-gold-light/30 shadow-2xl"
        style={{
          background: "linear-gradient(180deg, hsl(var(--cream)) 0%, hsl(var(--cream-dark) / 0.6) 50%, hsl(var(--gold-light) / 0.15) 100%)",
          boxShadow: "0 30px 80px hsl(var(--gold) / 0.12), 0 0 40px hsl(var(--gold-light) / 0.08), inset 0 1px 0 hsl(0 0% 100% / 0.5)",
        }}
        initial={{ opacity: 0, y: 30, scale: 0.96 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
      >
        {/* Soft glow overlay at top */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-32 rounded-full pointer-events-none z-10"
          style={{
            background: "radial-gradient(ellipse, hsl(var(--gold-light) / 0.15) 0%, transparent 70%)",
          }}
        />

        {/* Floating hearts */}
        {hearts.map((h, i) => (
          <Heart key={`heart-${i}`} {...h} />
        ))}

        {/* Sparkle particles */}
        {sparkles.map((s, i) => (
          <Sparkle key={`sparkle-${i}`} {...s} />
        ))}

        {/* The 3D model */}
        <model-viewer
          src="/Meshy_AI_Royal_Indian_Wedding__0504063638_texture.glb"
          alt="Ivory and gold wedding couple 3D model"
          camera-controls
          touch-action="pan-y"
          shadow-intensity="1.2"
          shadow-softness="0.8"
          environment-image="neutral"
          exposure="1.1"
          auto-rotate
          auto-rotate-delay="0"
          rotation-per-second="12deg"
          ar
          style={{
            width: "100%",
            height: "clamp(420px, 60vw, 620px)",
            background: "transparent",
          }}
        />

        {/* Bottom fade gradient */}
        <div
          className="absolute bottom-0 left-0 right-0 h-20 pointer-events-none z-10"
          style={{
            background: "linear-gradient(to top, hsl(var(--cream-dark) / 0.4) 0%, transparent 100%)",
          }}
        />
      </motion.div>

      {/* Decorative gold line beneath */}
      <motion.div
        className="flex items-center justify-center gap-3 mt-6"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.6, duration: 0.8 }}
      >
        <div className="h-px w-16 bg-gold-light/40" />
        <div className="w-2 h-2 rotate-45 bg-gold/40" />
        <div className="h-px w-16 bg-gold-light/40" />
      </motion.div>
    </div>
  );
};

export default WeddingModelSection;