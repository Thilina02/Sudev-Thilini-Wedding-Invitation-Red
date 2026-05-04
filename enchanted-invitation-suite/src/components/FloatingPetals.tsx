import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const FloatingPetals = () => {
  const [petals, setPetals] = useState<Array<{ id: number; x: number; delay: number; duration: number; size: number }>>([]);

  useEffect(() => {
    const generated = Array.from({ length: 12 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      delay: Math.random() * 8,
      duration: 8 + Math.random() * 10,
      size: 6 + Math.random() * 10,
    }));
    setPetals(generated);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-40 overflow-hidden">
      {petals.map((petal) => (
        <motion.div
          key={petal.id}
          className="absolute rounded-full opacity-20"
          style={{
            left: `${petal.x}%`,
            width: petal.size,
            height: petal.size,
            background: `radial-gradient(circle, hsl(var(--gold-light)), hsl(var(--envelope-blue) / 0.3))`,
          }}
          initial={{ y: -20, opacity: 0, rotate: 0 }}
          animate={{
            y: ["0vh", "105vh"],
            opacity: [0, 0.3, 0.2, 0],
            rotate: [0, 360],
            x: [0, 30, -20, 10],
          }}
          transition={{
            duration: petal.duration,
            delay: petal.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
};

export default FloatingPetals;
