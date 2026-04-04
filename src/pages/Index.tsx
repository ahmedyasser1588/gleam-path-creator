import { useState, useMemo } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Navigation from "@/components/Navigation";
import CustomCursor from "@/components/CustomCursor";
import MusicPlayer from "@/components/MusicPlayer";
import HeroPage from "@/pages/HeroPage";
import JourneyPage from "@/pages/JourneyPage";
import CelebrationPage from "@/pages/CelebrationPage";
import ConnectionPage from "@/pages/ConnectionPage";
import { getBirthdayPhase } from "@/lib/birthday-config";

const Index = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const phase = useMemo(() => getBirthdayPhase(), []);

  // Phase locking: only Countdown/Hero visible pre-10-days
  // Pre-birthday (10 days): Hero + scratch cards
  // Birthday: Full site unlocked
  const isPageLocked = (pageIndex: number) => {
    if (phase === "birthday") return false; // All unlocked
    if (phase === "pre-birthday") return false; // All accessible during 10-day countdown
    // "countdown" phase — only hero accessible
    return pageIndex > 0;
  };

  const navigateTo = (page: number) => {
    if (isPageLocked(page)) return;
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <CustomCursor />
      <Navigation currentPage={currentPage} onNavigate={navigateTo} lockedPages={phase === "countdown" ? [1, 2, 3] : []} />
      <MusicPlayer />

      <AnimatePresence mode="wait">
        <motion.div
          key={currentPage}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4 }}
        >
          {currentPage === 0 ? (
            <HeroPage onNext={() => navigateTo(1)} />
          ) : currentPage === 1 ? (
            <JourneyPage />
          ) : currentPage === 2 ? (
            <CelebrationPage />
          ) : (
            <ConnectionPage />
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default Index;
