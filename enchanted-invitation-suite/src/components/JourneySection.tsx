import { motion } from "framer-motion";
import Divider from "./Divider";
import lilySingle from "@/assets/lily-single.png";
import sketchedBg from "@/assets/sketched-floral-bg.jpg";

const JourneySection = () => {
  return (
    <div className="relative z-10 w-full max-w-5xl mx-auto">
      <div className="text-center mb-8">
        <p className="section-kicker mb-3">Our Love Story</p>
        <h2 className="section-title">A Beautiful Journey</h2>
        <Divider />
      </div>

      {/* Dual cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6 px-2 sm:px-4">
        {/* Card 1: Sketched floral background card */}
        <motion.div
          className="relative h-72 md:h-80 rounded-sm overflow-hidden group flex items-end"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <img
            src={sketchedBg}
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
            loading="lazy"
            width={1024}
            height={1024}
          />
          {/* Gradient overlay */}
          <div
            className="absolute inset-0"
            style={{
              background: "linear-gradient(180deg, hsl(var(--background) / 0.3) 0%, hsl(var(--envelope-blue) / 0.5) 100%)",
            }}
          />
          {/* Lily accent */}
          <img
            src={lilySingle}
            alt=""
            className="absolute top-4 right-4 w-14 opacity-30 rotate-[20deg]"
            loading="lazy"
            width={512}
            height={768}
          />
          {/* Text */}
          <div className="relative z-10 p-6 text-white">
            <p className="font-display text-3xl md:text-4xl drop-shadow-lg">Our Story</p>
            <p className="font-body text-[10px] tracking-[0.3em] uppercase mt-2 opacity-80">
              Where it all began
            </p>
          </div>
        </motion.div>

        {/* Card 2: Faded elegant card with animated details */}
        <motion.div
          className="relative h-72 md:h-80 rounded-sm overflow-hidden flex flex-col justify-center px-6 sm:px-8 py-8"
          style={{
            background: "linear-gradient(145deg, hsl(var(--card) / 0.9), hsl(var(--cream) / 0.95))",
            boxShadow: "0 20px 60px hsl(var(--envelope-blue) / 0.1)",
            border: "1px solid hsl(var(--gold-light) / 0.25)",
          }}
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1], delay: 0.2 }}
        >
          {/* Corner accents */}
          <div className="absolute top-3 left-3 w-8 h-8 border-t border-l border-gold-light/30" />
          <div className="absolute bottom-3 right-3 w-8 h-8 border-b border-r border-gold-light/30" />

          <motion.p
            className="font-heading text-base md:text-lg italic text-envelope-dark/80 leading-relaxed mb-5"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            "Every love story is beautiful, but ours is my favourite."
          </motion.p>

          <motion.div
            className="space-y-3"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.7, duration: 0.8 }}
          >
            {[
              { label: "Wedding Ceremony", detail: "May 30, 2026 · 4:00 PM" },
              { label: "Wedding Reception", detail: "Grand Ballroom · 6:00 PM" },
              { label: "Dinner & Dance", detail: "Celebration until midnight" },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-3">
                <div className="w-1 h-7 bg-gold/40 rounded-full" />
                <div>
                  <p className="font-body text-[9px] tracking-[0.3em] uppercase text-gold">{item.label}</p>
                  <p className="font-heading text-sm text-foreground/70">{item.detail}</p>
                </div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default JourneySection;
