import { motion } from "framer-motion";
import Divider from "./Divider";
import lilySingle from "@/assets/lily-single.png";

const LoveCharmSection = () => {
  return (
    <div className="relative z-10 text-center max-w-lg mx-auto">
      {/* Lily accent */}
      <motion.img
        src={lilySingle}
        alt=""
        className="absolute -top-6 -right-8 w-16 sm:w-20 opacity-15 rotate-[30deg]"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.15 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5 }}
        loading="lazy"
        width={512}
        height={768}
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <p className="font-body text-[9px] tracking-[0.5em] uppercase text-envelope-dark font-semibold mb-4">A Celebration of</p>
        <h2 className="font-display text-5xl md:text-6xl text-envelope-dark mb-2">Love</h2>
      </motion.div>

      <Divider />

      {/* Charm elements */}
      <div className="grid grid-cols-3 gap-6 mt-8 max-w-sm mx-auto">
        {[
          { icon: "💍", label: "Commitment", text: "Two hearts bound" },
          { icon: "✨", label: "Blessing", text: "A sacred vow" },
          { icon: "🕊️", label: "Eternity", text: "Forever as one" },
        ].map((item, i) => (
          <motion.div
            key={item.label}
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 * i, duration: 0.7 }}
          >
            <div
              className="w-14 h-14 rounded-full mx-auto mb-3 flex items-center justify-center text-xl"
              style={{
                background: "linear-gradient(135deg, hsl(var(--cream)), hsl(var(--card)))",
                boxShadow: "0 8px 30px hsl(var(--envelope-blue) / 0.1)",
                border: "1px solid hsl(var(--gold-light) / 0.3)",
              }}
            >
              {item.icon}
            </div>
            <p className="font-body text-[9px] tracking-[0.3em] uppercase text-gold">{item.label}</p>
            <p className="font-heading text-xs text-envelope-dark/80 italic mt-1">{item.text}</p>
          </motion.div>
        ))}
      </div>

      {/* Quote card */}
      <motion.div
        className="mt-10 px-6 py-5 relative"
        style={{
          background: "hsl(var(--card) / 0.5)",
          border: "1px solid hsl(var(--gold-light) / 0.2)",
        }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5, duration: 1 }}
      >
        <div className="absolute top-2 left-2 w-6 h-6 border-t border-l border-gold-light/30" />
        <div className="absolute bottom-2 right-2 w-6 h-6 border-b border-r border-gold-light/30" />
        <p className="font-heading text-base md:text-lg italic text-envelope-dark/70 leading-relaxed">
          "In all the world, there is no heart for me like yours.<br />
          In all the world, there is no love for you like mine."
        </p>
        <p className="font-body text-[9px] tracking-[0.3em] uppercase text-foreground/70 mt-3">
          — Maya Angelou
        </p>
      </motion.div>
    </div>
  );
};

export default LoveCharmSection;
