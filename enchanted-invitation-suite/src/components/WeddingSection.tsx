import { motion } from "framer-motion";
import { ReactNode, CSSProperties } from "react";

interface WeddingSectionProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  style?: CSSProperties;
}

const WeddingSection = ({ children, className = "", delay = 0, style }: WeddingSectionProps) => {
  return (
    <motion.section
      className={`w-full flex flex-col items-center justify-center px-6 py-12 md:py-16 relative ${className}`}
      style={style}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1], delay }}
    >
      {children}
    </motion.section>
  );
};

export default WeddingSection;
