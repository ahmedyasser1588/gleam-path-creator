import { useState, useMemo } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Navigation from "@/components/Navigation";
import CustomCursor from "@/components/CustomCursor";
import MusicPlayer from "@/components/MusicPlayer";
import HeroPage from "@/pages/HeroPage";
import JourneyPage from "@/pages/JourneyPage";
import CelebrationPage from "@/pages/CelebrationPage";

// ✏️ غيّر التاريخ ده لتاريخ عيد الميلاد اللي انت عايزه
const BIRTHDAY = new Date("2026-04-10T00:00:00");

const Index = () => {
  const [currentPage, setCurrentPage] = useState(0);

  const isBirthday = useMemo(() => {
    return new Date() >= BIRTHDAY;
  }, []);

  const navigateTo = (page: number) => {
    // قبل عيد الميلاد: بس صفحة Entrance مفتوحة
    if (!isBirthday && page > 0) return;
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <CustomCursor />
      <Navigation
        currentPage={currentPage}
        onNavigate={navigateTo}
        lockedPages={!isBirthday ? [1, 2] : []}
      />
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
            <HeroPage onNext={() => navigateTo(1)} birthday={BIRTHDAY} />
          ) : currentPage === 1 ? (
            <JourneyPage />
          ) : (
            <CelebrationPage />
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default Index;
