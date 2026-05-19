import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Mail } from "lucide-react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

export function FloatingCTA() {
  const { t } = useTranslation();
  const contactHighlightClasses = [
    "shadow-[0_0_0_1px_rgba(168,85,247,0.6),_0_0_48px_rgba(168,85,247,0.22)]",
    "border-[rgba(168,85,247,0.65)]",
    "-translate-y-0.5",
  ];
  const [delayElapsed, setDelayElapsed] = useState(false);
  const [showFab, setShowFab] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [isDesktop, setIsDesktop] = useState(() => window.matchMedia("(min-width: 768px)").matches);

  useEffect(() => {
    const timer = window.setTimeout(() => setDelayElapsed(true), 2000);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 768px)");
    const updateDesktop = () => setIsDesktop(mediaQuery.matches);

    updateDesktop();
    mediaQuery.addEventListener("change", updateDesktop);

    return () => mediaQuery.removeEventListener("change", updateDesktop);
  }, []);

  useEffect(() => {
    const evaluateVisibility = () => {
      const hero = document.getElementById("hero");
      const contact = document.getElementById("contact");

      const heroPast = hero ? hero.getBoundingClientRect().bottom < 0 : false;
      const contactVisible = contact
        ? (() => {
          const rect = contact.getBoundingClientRect();
          return rect.top < window.innerHeight * 0.75 && rect.bottom > window.innerHeight * 0.2;
        })()
        : false;

      setShowFab(delayElapsed && heroPast && !contactVisible);
    };

    evaluateVisibility();
    window.addEventListener("scroll", evaluateVisibility, { passive: true });
    window.addEventListener("resize", evaluateVisibility);

    return () => {
      window.removeEventListener("scroll", evaluateVisibility);
      window.removeEventListener("resize", evaluateVisibility);
    };
  }, [delayElapsed]);

  const handleClick = () => {
    const contact = document.getElementById("contact");

    if (!contact) {
      return;
    }

    contact.scrollIntoView({ behavior: "smooth", block: "start" });
    contact.classList.add(...contactHighlightClasses);
    window.setTimeout(() => contact.classList.remove(...contactHighlightClasses), 1600);
  };

  return (
    <AnimatePresence>
      {showFab ? (
        <motion.div
          className="fixed bottom-6 right-6 z-50 md:bottom-8 md:right-8"
          initial={{ opacity: 0, scale: 0.7, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.75, y: 18 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
        >
          <motion.button
            type="button"
            layout
            onClick={handleClick}
            onHoverStart={() => setHovered(true)}
            onHoverEnd={() => setHovered(false)}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            animate={{
              boxShadow: [
                "0 0 18px rgba(168, 85, 247, 0.45)",
                "0 0 30px rgba(168, 85, 247, 0.68)",
                "0 0 18px rgba(168, 85, 247, 0.45)",
              ],
            }}
            transition={{ duration: 2.8, ease: "easeInOut", repeat: Infinity }}
            className={`inline-flex items-center rounded-full bg-primary text-white shadow-[0_0_20px_rgba(168,85,247,0.48)] transition-shadow duration-300 hover:shadow-[0_0_35px_rgba(168,85,247,0.75)] ${isDesktop && hovered ? "gap-2 px-5 py-3" : "gap-0 px-3.5 py-3"
              }`}
          >
            <Mail className="h-5 w-5" />
            <AnimatePresence>
              {isDesktop && hovered ? (
                <motion.span
                  initial={{ opacity: 0, x: -6 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -6 }}
                  className="inline-flex items-center gap-1 text-sm font-semibold"
                >
                  {t("fab.hireMe")}
                  <ArrowRight className="h-4 w-4" />
                </motion.span>
              ) : null}
            </AnimatePresence>
          </motion.button>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}