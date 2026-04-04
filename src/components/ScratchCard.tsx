import { useRef, useState, useCallback } from "react";

interface ScratchCardProps {
  message: string;
  width?: number;
  height?: number;
}

const ScratchCard = ({ message, width = 300, height = 150 }: ScratchCardProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [revealed, setRevealed] = useState(false);
  const isDrawing = useRef(false);

  const getCtx = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return null;
    const ctx = canvas.getContext("2d");
    return ctx;
  }, []);

  const initCanvas = useCallback(() => {
    const ctx = getCtx();
    if (!ctx) return;
    const canvas = canvasRef.current!;
    ctx.fillStyle = "#B76E79";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.font = "14px Montserrat, sans-serif";
    ctx.fillStyle = "#fff";
    ctx.textAlign = "center";
    ctx.fillText("✨ Scratch Here ✨", canvas.width / 2, canvas.height / 2 + 5);
  }, [getCtx]);

  const scratch = useCallback(
    (x: number, y: number) => {
      const ctx = getCtx();
      if (!ctx) return;
      ctx.globalCompositeOperation = "destination-out";
      ctx.beginPath();
      ctx.arc(x, y, 20, 0, Math.PI * 2);
      ctx.fill();

      // Check reveal percentage
      const canvas = canvasRef.current!;
      const data = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
      let transparent = 0;
      for (let i = 3; i < data.length; i += 4) {
        if (data[i] === 0) transparent++;
      }
      if (transparent / (data.length / 4) > 0.5) setRevealed(true);
    },
    [getCtx]
  );

  const getPos = (e: React.MouseEvent | React.TouchEvent) => {
    const canvas = canvasRef.current!;
    const rect = canvas.getBoundingClientRect();
    const touch = "touches" in e ? e.touches[0] : e;
    return { x: touch.clientX - rect.left, y: touch.clientY - rect.top };
  };

  return (
    <div className="glass-card p-6 inline-block">
      <div className="relative" style={{ width, height }}>
        <div className="absolute inset-0 flex items-center justify-center text-center p-4 font-display text-lg text-foreground">
          {message}
        </div>
        {!revealed && (
          <canvas
            ref={(el) => {
              if (el) {
                canvasRef.current = el;
                setTimeout(initCanvas, 50);
              }
            }}
            width={width}
            height={height}
            className="absolute inset-0 rounded-lg"
            style={{ cursor: "crosshair" }}
            onMouseDown={() => { isDrawing.current = true; }}
            onMouseUp={() => { isDrawing.current = false; }}
            onMouseMove={(e) => { if (isDrawing.current) { const p = getPos(e); scratch(p.x, p.y); } }}
            onTouchStart={() => { isDrawing.current = true; }}
            onTouchEnd={() => { isDrawing.current = false; }}
            onTouchMove={(e) => { const p = getPos(e); scratch(p.x, p.y); }}
          />
        )}
      </div>
    </div>
  );
};

export default ScratchCard;
