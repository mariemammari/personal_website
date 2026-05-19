import { AnimatePresence, motion } from "framer-motion";
import { lazy, Suspense, useEffect, useState } from "react";
import { BrowserRouter, Navigate, Route, Routes, useLocation, useParams } from "react-router-dom";
import { LoadingOverlay } from "./components/ui/LoadingOverlay";
import { PageTransition } from "./components/ui/PageTransition";
import { BackgroundLayers } from "./components/ui/BackgroundLayers";
import { CommandPalette } from "./components/ui/CommandPalette";
import { EmailModal } from "./components/ui/EmailModal";
import { CONTACT_EMAIL } from "./data/contact";
import { EMAIL_MODAL_EVENT } from "./utils/emailModal";
import i18n from "./i18n";

const Home = lazy(() => import("./pages/Home").then((module) => ({ default: module.Home })));
const ProjectDetailPage = lazy(() => import("./pages/ProjectDetailPage").then((module) => ({ default: module.ProjectDetailPage })));

function LocaleHome() {
  const params = useParams();
  const lang = params.lang;

  useEffect(() => {
    if (lang === "en" || lang === "fr") {
      void i18n.changeLanguage(lang);
      document.documentElement.lang = lang;
    }
  }, [lang]);

  if (lang !== "en" && lang !== "fr") {
    return <Navigate to="/en" replace />;
  }

  return <Home />;
}

function AnimatedRoutes() {
  const location = useLocation();
  const [isTransitioning, setIsTransitioning] = useState(true);
  const [cmdOpen, setCmdOpen] = useState(false);
  const [emailOpen, setEmailOpen] = useState(false);

  useEffect(() => {
    setIsTransitioning(true);
    const timer = window.setTimeout(() => setIsTransitioning(false), 520);
    return () => window.clearTimeout(timer);
  }, [location.pathname]);

  // Global Ctrl+K / ⌘K shortcut
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        setCmdOpen((v) => !v);
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  useEffect(() => {
    const handleOpen = () => setEmailOpen(true);
    window.addEventListener(EMAIL_MODAL_EVENT, handleOpen);
    return () => window.removeEventListener(EMAIL_MODAL_EVENT, handleOpen);
  }, []);

  return (
    <>
      <AnimatePresence mode="wait">
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.24, ease: "easeOut" }}
          className="relative min-h-screen overflow-hidden isolate bg-background text-white font-mono"
        >
          <BackgroundLayers />
          <AnimatePresence>
            {isTransitioning ? <PageTransition /> : null}
          </AnimatePresence>
          <div className="relative z-10">
            <Suspense fallback={<LoadingOverlay />}>
              <Routes location={location}>
                <Route path="/" element={<Navigate to="/en" replace />} />
                <Route path="/:lang" element={<LocaleHome />} />
                <Route path="/:lang/projects/:id" element={<ProjectDetailPage />} />
                <Route path="*" element={<Navigate to="/en" replace />} />
              </Routes>
            </Suspense>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Command Palette — rendered outside the page so it's always on top */}
      <CommandPalette open={cmdOpen} onClose={() => setCmdOpen(false)} />
      <EmailModal
        open={emailOpen}
        onClose={() => setEmailOpen(false)}
        email={CONTACT_EMAIL}
      />
    </>
  );
}

function App() {
  const [booting, setBooting] = useState(true);

  useEffect(() => {
    const timer = window.setTimeout(() => setBooting(false), 900);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <BrowserRouter>
      {booting ? <LoadingOverlay /> : <AnimatedRoutes />}
    </BrowserRouter>
  );
}

export default App;
