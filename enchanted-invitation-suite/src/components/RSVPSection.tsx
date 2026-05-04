import { motion } from "framer-motion";
import { useState } from "react";
import axios from "axios";
import Divider from "./Divider";
import flowers from "@/assets/flowers.png";

const RSVPSection = () => {
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";
  const [formData, setFormData] = useState({ name: "", attending: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!formData.name || !formData.attending) {
      setError("Please provide your name and attendance selection.");
      return;
    }
    try {
      console.log(apiBaseUrl);
      setSubmitting(true);
      await axios.post(`${apiBaseUrl}/api/rsvp`, formData, {
        headers: { "Content-Type": "application/json" },
      });
      setSubmitted(true);
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        const apiError = err.response?.data as { error?: string } | undefined;
        setError(apiError?.error || "RSVP server is unavailable. Please run backend and frontend separately.");
      } else if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Something went wrong");
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="relative z-10 text-center w-full max-w-md mx-auto text-envelope-dark">
      <motion.img
        src={flowers}
        alt=""
        className="w-20 mx-auto mb-4 opacity-40"
        loading="lazy"
        width={512}
        height={512}
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 0.4, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      />
      <p className="section-kicker mb-3">Kindly Respond</p>
      <h2 className="section-title mb-8">RSVP</h2>
      <Divider />

      {submitted ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-8"
        >
          <p className="font-display text-3xl text-envelope-dark font-semibold mb-4">Thank You!</p>
          <p className="font-body text-sm text-envelope font-semibold">We can't wait to celebrate with you.</p>
        </motion.div>
      ) : (
        <form onSubmit={handleSubmit} className="mt-8 space-y-6 text-left">
          <div>
            <label className="font-body text-[10px] tracking-[0.3em] uppercase text-envelope block mb-2 font-semibold">Your Name</label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full bg-transparent border-b border-gold-light/50 py-3 font-heading text-lg text-foreground/80 focus:outline-none focus:border-envelope transition-colors placeholder:text-muted-foreground/40"
              placeholder="Enter your full name"
            />
          </div>

          <div>
            <label className="font-body text-[10px] tracking-[0.3em] uppercase text-envelope block mb-3 font-semibold">Will you attend?</label>
            <div className="flex gap-4 justify-center">
              {["Joyfully Accept", "Regretfully Decline"].map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => setFormData({ ...formData, attending: option })}
                  className={`px-6 py-3 border rounded-sm font-body text-xs tracking-wider uppercase transition-all duration-300 ${
                    formData.attending === option
                      ? "bg-envelope-dark text-primary-foreground border-envelope-dark shadow-lg"
                      : "border-gold-light/50 text-envelope hover:border-envelope-dark hover:text-envelope-dark"
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="font-body text-[10px] tracking-[0.3em] uppercase text-envelope block mb-2 font-semibold">Message for the Couple</label>
            <textarea
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="w-full bg-transparent border-b border-gold-light/50 py-3 font-heading text-lg text-foreground/80 focus:outline-none focus:border-envelope transition-colors resize-none placeholder:text-muted-foreground/40"
              rows={3}
              placeholder="Your warm wishes..."
            />
          </div>

          <motion.button
            type="submit"
            className="w-full py-4 bg-envelope-dark text-primary-foreground font-body text-xs tracking-[0.3em] uppercase rounded-sm shadow-lg hover:bg-envelope hover:shadow-xl transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed font-semibold"
            disabled={submitting}
            whileHover={{ scale: submitting ? 1 : 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {submitting ? "Sending..." : "Send RSVP"}
          </motion.button>

          {error && (
            <p className="text-center text-sm text-red-500">{error}</p>
          )}
        </form>
      )}
    </div>
  );
};

export default RSVPSection;
