import { motion } from "framer-motion";
import envelopeOpen from "@/assets/envelope-open.png";
import lilySingle from "@/assets/lily-single.png";
import lilyCluster from "@/assets/lily-cluster.png";
import Divider from "./Divider";

const HeroSection = () => {
  return (
    <div className="relative z-20 flex flex-col items-center w-full max-w-7xl mx-auto px-2 py-8 md:py-12">
      <div className="relative z-20 flex flex-col items-center w-full max-w-7xl mx-auto px-2 py-6 md:py-10">
        {/* Lily cluster top-right decoration */}
        <motion.img
          src={lilyCluster}
          alt=""
          className="absolute -top-6 right-0 sm:-right-8 w-28 sm:w-36 md:w-44 opacity-30 rotate-[15deg] z-30"
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 0.30 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5 }}
          loading="lazy"
          width={768}
          height={768}
        />

        {/* Single lily left decoration */}
        <motion.img
          src={lilySingle}
          alt=""
          className="absolute -bottom-8 -left-2 sm:-left-10 w-20 sm:w-24 md:w-32 opacity-15 -rotate-[20deg] z-30"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 0.45 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, delay: 0.3 }}
          loading="lazy"
          width={512}
          height={768}
        />

        {/* Lily cluster bottom-right */}
        <motion.img
          src={lilyCluster}
          alt=""
          className="absolute bottom-10 -right-4 sm:-right-12 w-20 sm:w-28 opacity-12 rotate-[40deg] z-30"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.12 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, delay: 0.5 }}
          loading="lazy"
          width={768}
          height={768}
        />

        {/* Single lily top-left */}
        <motion.img
          src={lilySingle}
          alt=""
          className="absolute top-16 -left-4 sm:-left-8 w-14 sm:w-18 opacity-10 rotate-[45deg] z-30"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, delay: 0.7 }}
          loading="lazy"
          width={512}
          height={768}
        />

        {/* ── MOBILE: envelope static behind, card centered on top ── */}
        {/* ── DESKTOP: side-by-side layout unchanged ── */}
        <div className="relative w-full md:w-auto md:flex md:flex-row md:items-center md:justify-center md:mx-auto">

          {/* Envelope — mobile only, absolutely positioned, no animation */}
          <div className="absolute inset-0 flex items-start justify-center md:hidden pointer-events-none z-10">
            <img
              src={envelopeOpen}
              alt="Wedding invitation envelope"
              className="w-[110vw] max-w-[620px] sm:w-[90vw] drop-shadow-2xl"
              width={1024}
              height={896}
            />
          </div>

          {/* Envelope — desktop only, with animation */}
          <motion.img
            src={envelopeOpen}
            alt="Wedding invitation envelope"
            className="hidden md:block md:w-[640px] lg:w-[760px] xl:w-[840px] drop-shadow-2xl relative z-10 md:order-2 flex-shrink-0"
            initial={{ opacity: 0, y: -40, scale: 0.85 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
            width={1024}
            height={896}
          />

          {/* Invitation card — centered over envelope on mobile, side-by-side on desktop */}
          {/* Invitation card — centered over envelope on mobile, side-by-side on desktop */}
          <motion.div
            className="relative z-20
    -ml-5 mr-auto mt-[260px] sm:mt-[250px] w-[72vw] sm:w-[56vw] px-6 py-8 sm:px-5 sm:py-6
    md:order-1 md:mx-0 md:mt-20 lg:mt-24 md:-mr-20 lg:-mr-24 md:w-[400px] lg:w-[460px] md:px-12 md:py-12"
            style={{
              background: "hsl(0, 45%, 97%)",
              boxShadow: "0 25px 80px hsl(var(--envelope-blue) / 0.15), 0 2px 6px hsl(var(--border) / 0.5)",
              clipPath: "polygon(5% 0%, 95% 0%, 100% 3%, 100% 97%, 95% 100%, 5% 100%, 0% 97%, 0% 3%)",
            }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
          >
            {/* Inner border */}
            <div
              className="absolute inset-2.5 pointer-events-none"
              style={{
                border: "1px solid rgba(107, 26, 26, 0.2)",
                borderRadius: "2px",
              }}
            />

            <p
              className="font-body text-[10px] sm:text-[10px] md:text-[11px] tracking-[0.5em] uppercase mb-4 text-center"
              style={{ color: "#000000" }}
            >
              We{" "}
              <span style={{ color: "#000000" }}>joyfully invite you</span>
              <br />
              to celebrate
            </p>

            <div className="text-center">
              <h1
                className="font-display text-5xl md:text-6xl leading-tight"
                style={{ color: "#7A1530", fontWeight: 200 }}
              >
                Sudev
              </h1>
              <motion.p
                className="font-display text-3xl sm:text-2xl md:text-3xl my-1"
                style={{ color: "#691A2B", fontWeight: 400 }}
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.8, type: "spring", stiffness: 200 }}
              >
                &amp;
              </motion.p>
              <h1
                className="font-display text-5xl md:text-6xl leading-tight"
                style={{ color: "#7A1530", fontWeight: 500 }}
              >
                Thilini
              </h1>
            </div>

            {/* Gold divider */}
            <div className="flex items-center justify-center gap-2 my-4">
              <div className="h-px w-12 bg-gold-light/60" />
              <div className="w-1.5 h-1.5 rotate-45 bg-gold/60" />
              <div className="h-px w-12 bg-gold-light/60" />
            </div>

            <p
              className="font-heading text-base md:text-lg tracking-[0.2em] text-center italic"
              style={{ color: "#000000" }}
            >
              May 30, 2026
            </p>
            <p
              className="font-body text-[10px] tracking-[0.35em] uppercase mt-2 sm:mt-1.5 text-center"
              style={{ color: "#000000" }}
            >
              Swarna Banquet Hall
            </p>
          </motion.div>
        </div>

        {/* Romantic quote */}
        <motion.p
          className="font-heading text-sm md:text-base italic text-envelope-dark/80 mt-6 max-w-xs text-center self-center md:mx-auto font-semibold"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 1, duration: 1.2 }}
        >
          "Two souls, one heart — forever entwined in love."
        </motion.p>
      </div>
    </div>
  );
};

export default HeroSection;