import { motion, AnimatePresence } from "framer-motion";
import envelopeClosed from "@/assets/envelope-closed.png";
import envelopeOpen from "@/assets/envelope-open.png";

interface EnvelopeSceneProps {
  onOpen: () => void;
  isOpened: boolean;
}

const EnvelopeScene = ({ onOpen, isOpened }: EnvelopeSceneProps) => {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center cursor-pointer"
      onClick={!isOpened ? onOpen : undefined}
      initial={{ opacity: 1 }}
      animate={isOpened ? { opacity: 0, scale: 1.1 } : { opacity: 1 }}
      transition={{ duration: 1.5, ease: [0.4, 0, 0.2, 1], delay: isOpened ? 1 : 0 }}
      style={{
        pointerEvents: isOpened ? "none" : "auto",
        background:
          "linear-gradient(180deg, hsl(var(--background)) 0%, hsl(var(--envelope-blue) / 0.18) 55%, hsl(var(--envelope-blue) / 0.35) 100%)",
      }}
    >
      {/* Soft radial glow */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          background: "radial-gradient(ellipse at center, hsl(38 60% 55% / 0.15) 0%, transparent 70%)",
        }}
      />

      {/* Main envelope */}
      <div className="relative">
        <AnimatePresence mode="wait">
          {!isOpened ? (
            <motion.div
              key="closed"
              className="relative"
              initial={{ scale: 0.7, opacity: 0, y: 40 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 1.1, opacity: 0, rotateX: -30 }}
              transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <img
                src={envelopeClosed}
                alt="Wedding invitation envelope"
                className="w-64 sm:w-72 md:w-96 drop-shadow-2xl"
                width={800}
                height={600}
              />
              {/* Pulsing tap indicator */}
              <motion.div
                className="absolute inset-0 flex items-center justify-center"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
              >
                <div className="w-16 h-16 rounded-full border border-gold-light/60 flex items-center justify-center backdrop-blur-sm bg-card/20">
                  <span className="font-heading text-[10px] tracking-[0.25em] text-primary-foreground/90 uppercase">Open</span>
                </div>
              </motion.div>
            </motion.div>
          ) : (
            <motion.div
              key="open"
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: -20 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <img
                src={envelopeOpen}
                alt="Opened wedding invitation"
                className="w-64 sm:w-72 md:w-96 drop-shadow-2xl"
                width={800}
                height={900}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Text below */}
      {!isOpened && (
        <motion.div
          className="mt-10 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 1 }}
        >
          <p className="font-display text-2xl md:text-3xl text-envelope-dark mb-2">
            You're Invited
          </p>
          <motion.p
            className="font-body text-[10px] tracking-[0.4em] uppercase text-muted-foreground"
            animate={{ opacity: [0.4, 0.8, 0.4] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Tap to open
          </motion.p>
        </motion.div>
      )}
    </motion.div>
  );
};

export default EnvelopeScene;
