import { useState } from "react";
import { motion } from "framer-motion";
import WeddingSection from "@/components/WeddingSection";
import HeroSection from "@/components/HeroSection";
import LoveCharmSection from "@/components/LoveCharmSection";
import CountdownTimer from "@/components/CountdownTimer";
import Divider from "@/components/Divider";
import FloatingPetals from "@/components/FloatingPetals";
import RSVPSection from "@/components/RSVPSection";
import VenueSection from "@/components/VenueSection";
import WeddingModelSection from "@/components/WeddingModelSection";
import flowers from "@/assets/flowers.png";
import lilySingle from "@/assets/lily-single.png";
import lilyCluster from "@/assets/lily-cluster.png";
import sketchedBg from "@/assets/sketched-floral-bg.jpg";

const WEDDING_DATE = new Date("2026-05-30T16:00:00");

const Index = () => {

  return (
    <div className="relative overflow-x-hidden">

      <motion.div
        className="relative"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
      >
        <FloatingPetals />

        <div
          aria-hidden="true"
          style={{
            position: "fixed",
            inset: 0,
            backgroundImage: `url(${sketchedBg})`,
            backgroundRepeat: "repeat",
            backgroundSize: "650px",
            opacity: 0.29,
            zIndex: 1,
            pointerEvents: "none",
          }}
        />

        {/* ===== HERO ===== */}
        {/* ===== HERO ===== */}
        <WeddingSection
          className="relative overflow-hidden min-h-[80vh]"
          style={{
            background: "linear-gradient(180deg, hsl(var(--cream)) 0%, hsl(var(--background)) 50%, hsl(var(--cream)) 100%)",
          }}
        >
          <HeroSection />
        </WeddingSection>

        {/* ===== 3D COUPLE MODEL ===== */}
        <WeddingSection
          className="relative overflow-hidden"
          style={{
            background: "linear-gradient(180deg, hsl(var(--cream)) 0%, hsl(var(--background)) 50%, hsl(var(--cream)) 100%)",
          }}
        >
          <WeddingModelSection />
        </WeddingSection>

        {/* ===== LOVE CHARM ===== */}
        <WeddingSection
          className="relative overflow-hidden"
          style={{
            background: "linear-gradient(180deg, hsl(var(--cream)) 0%, hsl(var(--background)) 50%, hsl(var(--cream)) 100%)",
          }}
        >
          <LoveCharmSection />
        </WeddingSection>

        {/* ===== COUNTDOWN ===== */}
        <WeddingSection
          className="relative"
          style={{
            background: "linear-gradient(180deg, hsl(var(--cream)) 0%, hsl(var(--background)) 50%, hsl(var(--cream)) 100%)",
          }}
        >
          <motion.img
            src={lilySingle}
            alt=""
            className="absolute top-6 right-4 w-14 sm:w-18 opacity-12 rotate-[25deg]"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 0.12 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5 }}
            loading="lazy"
            width={512}
            height={768}
          />
          <div className="text-center relative z-10">
            <p className="section-kicker mb-3">Counting Down To</p>
            <h2 className="section-title mb-8">Our Special Day</h2>
            <Divider />
            <div className="mt-6">
              <CountdownTimer targetDate={WEDDING_DATE} />
            </div>
          </div>
        </WeddingSection>

        {/* ===== VENUE ===== */}
        <WeddingSection
          className="relative overflow-hidden"
          style={{
            background: "linear-gradient(180deg, hsl(var(--cream)) 0%, hsl(var(--background)) 50%, hsl(var(--cream)) 100%)",
          }}
        >
          <motion.img
            src={lilySingle}
            alt=""
            className="absolute -bottom-2 -left-4 w-16 sm:w-20 opacity-10 rotate-[10deg]"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 0.1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5 }}
            loading="lazy"
            width={512}
            height={768}
          />
          <VenueSection />
        </WeddingSection>

        {/* ===== RSVP ===== */}
        <WeddingSection
          className="relative overflow-hidden"
          style={{
            background: "linear-gradient(180deg, hsl(var(--cream)) 0%, hsl(var(--background)) 50%, hsl(var(--cream)) 100%)",
          }}
        >
          <motion.img
            src={lilyCluster}
            alt=""
            className="absolute top-4 -right-6 w-20 sm:w-28 opacity-10 rotate-[-20deg]"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 0.1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5 }}
            loading="lazy"
            width={768}
            height={768}
          />
          <RSVPSection />
        </WeddingSection>

        {/* ===== FOOTER ===== */}
        <section
          className="py-10 text-center relative overflow-hidden"
          style={{
            background: "linear-gradient(180deg, hsl(var(--background)) 0%, hsl(var(--cream)) 100%)",
          }}
        >
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="relative z-10"
          >
            <img src={flowers} alt="" className="w-16 mx-auto mb-4 opacity-40" loading="lazy" width={512} height={512} />
            <p className="font-display text-3xl md:text-4xl text-envelope-dark mb-3">
              Sudev & Thilini
            </p>
            <p className="font-body text-[10px] tracking-[0.3em] uppercase text-envelope-dark font-semibold">
              May 30, 2026 · Swarna Banquet Hall
            </p>
            <Divider />
            <p className="font-heading text-sm text-envelope font-semibold italic">
              We can't wait to celebrate with you
            </p>
          </motion.div>
        </section>
      </motion.div>
    </div>
  );
};

export default Index;