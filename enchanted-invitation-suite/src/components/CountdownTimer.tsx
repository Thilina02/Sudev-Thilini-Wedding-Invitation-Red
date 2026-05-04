import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import WeddingCalendar from "./WeddingCalendar";

interface CountdownTimerProps {
  targetDate: Date;
}

const CountdownTimer = ({ targetDate }: CountdownTimerProps) => {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  function calculateTimeLeft() {
    const diff = targetDate.getTime() - new Date().getTime();
    if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    return {
      days: Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((diff / (1000 * 60)) % 60),
      seconds: Math.floor((diff / 1000) % 60),
    };
  }

  useEffect(() => {
    const timer = setInterval(() => setTimeLeft(calculateTimeLeft()), 1000);
    return () => clearInterval(timer);
  }, []);

  const units = [
    { label: "Days", value: timeLeft.days },
    { label: "Hours", value: timeLeft.hours },
    { label: "Minutes", value: timeLeft.minutes },
    { label: "Seconds", value: timeLeft.seconds },
  ];

  return (
    <div className="flex flex-col items-center gap-8">
      {/* Countdown units */}
      <div className="flex gap-4 sm:gap-6 md:gap-10 justify-center">
        {units.map(({ label, value }, i) => (
          <motion.div
            key={label}
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 * i, duration: 0.6 }}
          >
            <div
              className="w-16 h-16 sm:w-18 sm:h-18 md:w-22 md:h-22 rounded-lg flex items-center justify-center mb-2 relative overflow-hidden"
              style={{
                background: "linear-gradient(135deg, hsl(var(--card) / 0.8), hsl(var(--cream)))",
                boxShadow: "0 4px 30px hsl(var(--envelope-blue) / 0.1), inset 0 1px 0 hsl(var(--gold-light) / 0.3)",
                border: "1px solid hsl(var(--gold-light) / 0.3)",
              }}
            >
              {/* Glow effect */}
              <div
                className="absolute inset-0 opacity-20"
                style={{
                  background: "radial-gradient(circle at center, hsl(var(--gold) / 0.3), transparent 70%)",
                }}
              />
              <motion.span
                key={value}
                className="font-heading text-2xl md:text-3xl font-light text-envelope-dark relative z-10"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                {String(value).padStart(2, "0")}
              </motion.span>
            </div>
            <span className="font-body text-[9px] md:text-[10px] tracking-[0.25em] uppercase text-foreground/70">
              {label}
            </span>
          </motion.div>
        ))}
      </div>

      {/* Wedding Calendar — rendered once, below the countdown */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.8, duration: 1 }}
      >
        <WeddingCalendar />
      </motion.div>
    </div>
  );
};

export default CountdownTimer;