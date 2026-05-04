import { motion } from "framer-motion";
import Divider from "./Divider";
import { MapPin, ExternalLink } from "lucide-react";

const GOOGLE_MAPS_URL = "https://maps.app.goo.gl/7bZ5LhJsoYJwxXYB9?g_st=ic";

const VenueSection = () => {
  return (
    <div className="relative z-10 flex flex-col items-center w-full text-center px-6">
      <p className="section-kicker mb-3">The Venue</p>
      <h2 className="section-title mb-8 leading-snug break-words md:whitespace-nowrap">
        Wedding Reception
      </h2>
      <Divider />

      <div className="mt-8 space-y-10 w-full max-w-lg">
        {/* Ceremony */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center"
        >
          <p className="font-display text-3xl text-envelope-dark mb-2">Wedding Reception</p>
          <p className="font-heading text-xl text-foreground italic">Swarna Banquet Hall</p>
          <p className="font-body text-sm text-foreground/70">306/2 Kadawatha Road, Ganemulla</p>
          <p className="font-heading text-lg text-gold mt-3">6.30 PM - 11.30 PM</p>
        </motion.div>

        {/* Wedding Reception
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-col items-center"
        >
          <p className="font-display text-3xl text-envelope-dark mb-2">Wedding Reception</p>
          <p className="font-heading text-xl text-foreground italic">Same venue</p>
          <p className="font-heading text-lg text-gold mt-3">4:00 PM</p>
        </motion.div> */}

        {/* Map link */}
        <motion.a
          href={GOOGLE_MAPS_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 px-8 py-3 border border-gold-light/50 rounded-sm font-body text-xs tracking-[0.3em] uppercase text-envelope-dark hover:bg-envelope hover:text-primary-foreground transition-all duration-300 group"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          <MapPin className="w-4 h-4" />
          View on Map
          <ExternalLink className="w-3 h-3 opacity-50 group-hover:opacity-100 transition-opacity" />
        </motion.a>
      </div>
    </div>
  );
};

export default VenueSection;