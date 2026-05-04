import { motion } from "framer-motion";

const WEDDING_DAY = 30;
const MONTH = "May";
const YEAR = 2026;

// May 2026: starts on Friday, week starts Monday so offset = 4
const DAYS_IN_MONTH = 31;
const START_DAY = 4; // 0=Mon, 4=Fri
const DAY_NAMES = ["M", "T", "W", "T", "F", "S", "S"];

const WeddingCalendar = () => {
  const blanks = Array.from({ length: START_DAY }, (_, i) => i);
  const days = Array.from({ length: DAYS_IN_MONTH }, (_, i) => i + 1);

  return (
    <div className="text-center">
      <p className="font-body text-[8px] tracking-[0.4em] uppercase text-envelope-dark font-semibold mb-2">Save the Date</p>
      <div
        className="inline-block px-5 py-4 sm:px-6 sm:py-5"
        style={{
          background: "hsl(0 0% 100% / 0.9)",
          boxShadow: "0 10px 40px hsl(var(--envelope-blue) / 0.1), 0 1px 3px hsl(var(--border) / 0.4)",
          border: "1px solid hsl(var(--gold-light) / 0.25)",
        }}
      >
        {/* Month/Year header */}
        <p className="font-heading text-lg sm:text-xl text-envelope font-semibold tracking-[0.15em] mb-3">
          {MONTH} {YEAR}
        </p>

        {/* Day names */}
        <div className="grid grid-cols-7 gap-0 mb-1">
          {DAY_NAMES.map((d, i) => (
            <div key={i} className="w-7 h-6 sm:w-8 sm:h-7 flex items-center justify-center">
              <span className="font-body text-[8px] sm:text-[9px] tracking-wider uppercase text-envelope font-semibold">{d}</span>
            </div>
          ))}
        </div>

        {/* Calendar grid */}
        <div className="grid grid-cols-7 gap-0">
          {blanks.map((_, i) => (
            <div key={`b-${i}`} className="w-7 h-7 sm:w-8 sm:h-8" />
          ))}
          {days.map((day) => {
            const isWeddingDay = day === WEDDING_DAY;
            return (
              <div key={day} className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center relative">
                {isWeddingDay ? (
                  <motion.div
                    className="w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center"
                    style={{
                      background: "#7A1530",
                      boxShadow: "0 2px 12px rgba(122, 21, 48, 0.45)",
                    }}
                    animate={{ scale: [1, 1.08, 1] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <span className="font-heading text-xs sm:text-sm font-bold" style={{ color: "#ffffff" }}>
                      {day}
                    </span>
                  </motion.div>
                ) : (
                  <span className="font-heading text-[10px] sm:text-xs text-envelope-dark font-semibold">{day}</span>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default WeddingCalendar;