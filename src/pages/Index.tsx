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
import { BIRTHDAY_DATE } from "@/lib/birthday-config"; // تأكد من المسار حسب مشروعك
// جوه ملف Index.tsx
const Index = () => {
  const [currentPage, setCurrentPage] = useState(0);
  
  // نرجع نستخدم الدالة الأصلية لأننا عدلناها في ملف الـ config
  const phase = useMemo(() => getBirthdayPhase(), []); 

  const isPageLocked = (pageIndex: number) => {
    if (phase === "birthday") return false; 
    return pageIndex > 0;
  };

  // ... باقي الكود كما هو

  // Phase locking: only Countdown/Hero visible pre-10-days
  // Pre-birthday (10 days): Hero + scratch cards
  // Birthday: Full site unlocked
  const isPageLocked = (pageIndex: number) => {
    if (phase === "birthday") return false; // All unlocked on the day
    // Before birthday — only hero/entrance accessible
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
      <Navigation currentPage={currentPage} onNavigate={navigateTo} lockedPages={phase !== "birthday" ? [1, 2, 3] : []} />
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
