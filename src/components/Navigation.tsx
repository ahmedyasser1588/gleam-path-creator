import { motion } from "framer-motion";
import { Heart } from "lucide-react";

interface NavigationProps {
  currentPage: number;
  onNavigate: (page: number) => void;
}

const pages = ["Entrance", "Journey", "Celebration", "Connection"];

const Navigation = ({ currentPage, onNavigate }: NavigationProps) => {
  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50 glass py-3 px-6"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ delay: 0.5, type: "spring" }}
    >
      <div className="max-w-5xl mx-auto flex items-center justify-between">
        <motion.div whileHover={{ scale: 1.1 }} className="flex items-center gap-2">
          <Heart className="w-5 h-5 text-accent fill-accent" />
          <span className="font-display text-sm font-semibold text-foreground">Birthday</span>
        </motion.div>
        <div className="flex gap-1">
          {pages.map((page, i) => (
            <motion.button
              key={page}
              onClick={() => onNavigate(i)}
              className={`px-3 py-1.5 rounded-full text-xs font-body transition-colors ${
                currentPage === i
                  ? "bg-accent text-accent-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {page}
            </motion.button>
          ))}
        </div>
      </div>
    </motion.nav>
  );
};

export default Navigation;
