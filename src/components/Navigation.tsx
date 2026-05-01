import { motion, AnimatePresence } from "framer-motion";
import { Heart, Lock } from "lucide-react";

interface NavigationProps {
  currentPage: number;
  onNavigate: (page: number) => void;
  lockedPages?: number[];
}

const pages = ["Main", "Journey", "Celebration", "Memories ❤️"];

const Navigation = ({ currentPage, onNavigate, lockedPages = [] }: NavigationProps) => {
  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50 glass py-2 sm:py-3 px-2 sm:px-6"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ delay: 0.5, type: "spring" }}
    >
      <div className="max-w-5xl mx-auto flex items-center justify-between gap-2">
        <motion.div whileHover={{ scale: 1.1 }} className="flex items-center gap-1.5 shrink-0">
          <Heart className="w-4 h-4 sm:w-5 sm:h-5 text-accent fill-accent" />
          <span className="hidden sm:inline font-display text-sm font-semibold text-foreground">Birthday</span>
        </motion.div>
        <div className="flex gap-1 overflow-x-auto no-scrollbar -mx-1 px-1">
          {pages.map((page, i) => {
            const locked = lockedPages.includes(i);
            return (
              <motion.button
                key={page}
                onClick={() => !locked && onNavigate(i)}
                className={`shrink-0 px-2.5 sm:px-3 py-1.5 rounded-full text-[11px] sm:text-xs font-body transition-colors flex items-center gap-1 whitespace-nowrap ${
                  locked
                    ? "text-muted-foreground/50 cursor-not-allowed"
                    : currentPage === i
                    ? "bg-accent text-accent-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
                whileHover={locked ? {} : { scale: 1.05 }}
                whileTap={locked ? {} : { scale: 0.95 }}
                layout
                animate={locked ? { opacity: 0.5 } : { opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <AnimatePresence>
                  {locked && (
                    <motion.span
                      initial={{ width: 12, opacity: 1 }}
                      exit={{ width: 0, opacity: 0 }}
                      transition={{ duration: 0.4 }}
                      className="overflow-hidden inline-flex"
                    >
                      <Lock className="w-3 h-3" />
                    </motion.span>
                  )}
                </AnimatePresence>
                {page}
              </motion.button>
            );
          })}
        </div>
      </div>
    </motion.nav>
  );
};

export default Navigation;
