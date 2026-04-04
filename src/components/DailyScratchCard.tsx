import { useRef, useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface DailyScratchCardProps {
  day: number;
  title: string;
  message: string;
}

const STORAGE_KEY = "birthday-scratch-";

const DailyScratchCard = ({ day, title, message }: DailyScratchCardProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [revealed, setRevealed] = useState(false);
  const isDrawing = useRef(false);
  const width = 320;
  const height = 180;

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY + day);
    if (stored === "true") setRevealed(true);
  }, [day]);

  const initCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Rose gold metallic gradient
    const grad = ctx.createLinearGradient(0, 0, width, height);
    grad.addColorStop(0, "#B76E79");
    grad.addColorStop(0.3, "#E8A8B0");
    grad.addColorStop(0.5, "#D4A574");
    grad.addColorStop(0.7, "#E8A8B0");
    grad.addColorStop(1, "#B76E79");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, width, height);

    // Add metallic shimmer lines
    ctx.strokeStyle = "rgba(255, 255, 255, 0.15)";
    ctx.lineWidth = 1;
    for (let i = 0; i < width; i += 8) {
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i + 40, height);
      ctx.stroke();
    }

    // Text on scratch surface
    ctx.font = "bold 16px Montserrat, sans-serif";
    ctx.fillStyle = "rgba(255, 255, 255, 0.9)";
    ctx.textAlign = "center";
    ctx.fillText("✨ Scratch to Reveal ✨", width / 2, height / 2 - 5);
    ctx.font = "12px Montserrat, sans-serif";
    ctx.fillText(title, width / 2, height / 2 + 20);
  }, [title]);

  const scratch = useCallback(
    (x: number, y: number) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      ctx.globalCompositeOperation = "destination-out";
      ctx.beginPath();
      ctx.arc(x, y, 22, 0, Math.PI * 2);
      ctx.fill();

      // Check reveal percentage
      const data = ctx.getImageData(0, 0, width, height).data;
      let transparent = 0;
      for (let i = 3; i < data.length; i += 4) {
        if (data[i] === 0) transparent++;
      }
      if (transparent / (data.length / 4) > 0.45) {
        setRevealed(true);
        localStorage.setItem(STORAGE_KEY + day, "true");
      }
    },
    [day]
  );

  const getPos = (e: React.MouseEvent | React.TouchEvent) => {
    const canvas = canvasRef.current!;
    const rect = canvas.getBoundingClientRect();
    const touch = "touches" in e ? e.touches[0] : e;
    return { x: touch.clientX - rect.left, y: touch.clientY - rect.top };
  };

  return (
    <motion.div
      className="glass-card p-6 inline-block"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: "spring", stiffness: 200 }}
    >
      <h4 className="font-display text-lg font-semibold text-foreground text-center mb-4">{title}</h4>
      <div className="relative rounded-xl overflow-hidden" style={{ width, height }}>
        {/* Hidden message underneath */}
        <div className="absolute inset-0 flex items-center justify-center p-6 bg-gradient-to-br from-blush to-primary/30">
          <p className="font-body text-sm text-foreground text-center leading-relaxed">{message}</p>
        </div>

        {/* Scratch canvas overlay */}
        <AnimatePresence>
          {!revealed && (
            <motion.canvas
              ref={(el) => {
                if (el) {
                  canvasRef.current = el;
                  setTimeout(initCanvas, 50);
                }
              }}
              exit={{ opacity: 0 }}
              width={width}
              height={height}
              className="absolute inset-0 rounded-xl"
              style={{ cursor: "crosshair" }}
              onMouseDown={() => { isDrawing.current = true; }}
              onMouseUp={() => { isDrawing.current = false; }}
              onMouseLeave={() => { isDrawing.current = false; }}
              onMouseMove={(e) => { if (isDrawing.current) scratch(getPos(e).x, getPos(e).y); }}
              onTouchStart={() => { isDrawing.current = true; }}
              onTouchEnd={() => { isDrawing.current = false; }}
              onTouchMove={(e) => { e.preventDefault(); scratch(getPos(e).x, getPos(e).y); }}
            />
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default DailyScratchCard;
