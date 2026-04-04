import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, MailOpen, Lock } from "lucide-react";

interface EnvelopeProps {
  title: string;
  message: string;
  condition: string;
  isUnlocked?: boolean;
}

const Envelope = ({ title, message, condition, isUnlocked = true }: EnvelopeProps) => {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      className="glass-card p-5 w-full max-w-sm cursor-pointer"
      whileHover={{ scale: 1.02 }}
      onClick={() => isUnlocked && setOpen(!open)}
    >
      <div className="flex items-center gap-3 mb-2">
        {isUnlocked ? (
          open ? <MailOpen className="w-5 h-5 text-accent" /> : <Mail className="w-5 h-5 text-accent" />
        ) : (
          <Lock className="w-5 h-5 text-muted-foreground" />
        )}
        <h4 className="font-display text-base font-semibold text-foreground">{title}</h4>
      </div>
      <p className="text-xs text-muted-foreground mb-2">{condition}</p>

      <AnimatePresence>
        {open && isUnlocked && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="pt-3 border-t border-border">
              <p className="text-sm text-foreground font-body leading-relaxed">{message}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Envelope;
