import { useState, useMemo, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Navigation from "@/components/Navigation";
import CustomCursor from "@/components/CustomCursor";
import MusicPlayer from "@/components/MusicPlayer";
import HeroPage from "@/pages/HeroPage";
import JourneyPage from "@/pages/JourneyPage";
import CelebrationPage from "@/pages/CelebrationPage";
import MemoriesPage from "@/pages/MemoriesPage";
import WhyILoveYou from "@/components/WhyILoveYou";
import EsoBot from "@/components/EsoBot";
import FlowerGarden from "@/components/FlowerGarden";

// التاريخ والوقت المظبوط
const BIRTHDAY = new Date("2026-04-06T12:12:00");

const Index = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [now, setNow] = useState(new Date());

  // تحديث الوقت كل ثانية عشان الـ Lock يفك لوحده أول ما الساعة تيجي 10:52
  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const isBirthday = useMemo(() => {
    return now >= BIRTHDAY;
  }, [now]);

  const navigateTo = (page: number) => {
    // لو لسه مجاش عيد الميلاد، مسموح بس بصفحة الـ Entrance (رقم 0)
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
        lockedPages={!isBirthday ? [1, 2, 3] : []}
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
          ) : currentPage === 2 ? (
            <CelebrationPage />
          ) : (
            <MemoriesPage />
          )}
          {currentPage !== 0 && <FlowerGarden />}
        </motion.div>
      </AnimatePresence>

      <WhyILoveYou />
      <EsoBot />
    </div>
  );
};

export default Index;