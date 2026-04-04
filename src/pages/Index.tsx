import { useState, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Navigation from "@/components/Navigation";
import CustomCursor from "@/components/CustomCursor";
import MusicPlayer from "@/components/MusicPlayer";
import HeroPage from "@/pages/HeroPage";
import JourneyPage from "@/pages/JourneyPage";
import CelebrationPage from "@/pages/CelebrationPage";
import ConnectionPage from "@/pages/ConnectionPage";

const Index = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const pages = [HeroPage, JourneyPage, CelebrationPage, ConnectionPage];

  const navigateTo = (page: number) => {
    setCurrentPage(page);
    containerRef.current?.scrollTo({ top: 0, behavior: "smooth" });
  };

  const CurrentPageComponent = pages[currentPage];

  return (
    <div ref={containerRef} className="relative min-h-screen overflow-x-hidden">
      <CustomCursor />
      <Navigation currentPage={currentPage} onNavigate={navigateTo} />
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
          ) : (
            <CurrentPageComponent />
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default Index;
