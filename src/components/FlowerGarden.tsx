import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const SESSION_KEY = "eso-garden-counted-session";

const flowerColors = [
  "hsl(350, 40%, 65%)",
  "hsl(340, 60%, 75%)",
  "hsl(30, 50%, 70%)",
  "hsl(350, 100%, 85%)",
  "hsl(320, 40%, 70%)",
];

const Flower1 = ({ color, size }: { color: string; size: number }) => (
  <svg width={size} height={size} viewBox="0 0 60 60" fill="none">
    {[0, 60, 120, 180, 240, 300].map((r) => (
      <ellipse key={r} cx="30" cy="14" rx="9" ry="14" fill={color} opacity={0.85} transform={`rotate(${r} 30 30)`} />
    ))}
    <circle cx="30" cy="30" r="7" fill="hsl(40, 80%, 75%)" />
  </svg>
);

const Flower2 = ({ color, size }: { color: string; size: number }) => (
  <svg width={size} height={size} viewBox="0 0 60 60" fill="none">
    {[0, 72, 144, 216, 288].map((r) => (
      <ellipse key={r} cx="30" cy="12" rx="10" ry="16" fill={color} opacity={0.8} transform={`rotate(${r} 30 30)`} />
    ))}
    <circle cx="30" cy="30" r="6" fill="hsl(350, 30%, 55%)" />
  </svg>
);

const Flower3 = ({ color, size }: { color: string; size: number }) => (
  <svg width={size} height={size} viewBox="0 0 60 60" fill="none">
    {[0, 45, 90, 135, 180, 225, 270, 315].map((r) => (
      <ellipse key={r} cx="30" cy="16" rx="7" ry="12" fill={color} opacity={0.75} transform={`rotate(${r} 30 30)`} />
    ))}
    <circle cx="30" cy="30" r="8" fill="hsl(40, 70%, 80%)" />
  </svg>
);

const flowerTypes = [Flower1, Flower2, Flower3];

const letterPatterns: Record<string, number[][]> = {
  I: [[1,1,1],[0,1,0],[0,1,0],[0,1,0],[1,1,1]],
  L: [[1,0,0],[1,0,0],[1,0,0],[1,0,0],[1,1,1]],
  O: [[1,1,1],[1,0,1],[1,0,1],[1,0,1],[1,1,1]],
  V: [[1,0,1],[1,0,1],[1,0,1],[0,1,0],[0,1,0]],
  E: [[1,1,1],[1,0,0],[1,1,0],[1,0,0],[1,1,1]],
  U: [[1,0,1],[1,0,1],[1,0,1],[1,0,1],[1,1,1]],
  S: [[1,1,1],[1,0,0],[1,1,1],[0,0,1],[1,1,1]],
  " ": [[0],[0],[0],[0],[0]],
};

interface FlowerPos {
  id: number;
  x: number;
  y: number;
  type: number;
  color: string;
  size: number;
}

const buildFlowerPositions = (): FlowerPos[] => {
  const text = "I LOVE U ESO";
  const positions: FlowerPos[] = [];
  let colOffset = 0;
  let id = 0;

  for (const char of text) {
    const pattern = letterPatterns[char] || letterPatterns[" "];
    for (let row = 0; row < pattern.length; row++) {
      for (let col = 0; col < pattern[row].length; col++) {
        if (pattern[row][col]) {
          positions.push({
            id: id++,
            x: colOffset + col,
            y: row,
            type: id % 3,
            color: flowerColors[id % flowerColors.length],
            size: 28,
          });
        }
      }
    }
    colOffset += (pattern[0]?.length || 1) + 1;
  }

  return positions;
};

const allPositions = buildFlowerPositions();
const MAX_FLOWERS = allPositions.length;

const FlowerGarden = () => {
  const [visitCount, setVisitCount] = useState(0);
  const hasTracked = useRef(false);

  useEffect(() => {
    if (hasTracked.current) return;
    hasTracked.current = true;

    const run = async () => {
      // Read current count first so the garden shows progress immediately
      const { data: current } = await supabase
        .from("visit_stats")
        .select("count")
        .eq("id", "flower_garden")
        .maybeSingle();
      const currentCount = current?.count ?? 0;

      // Only count one visit per browser session (prevents inflating from refreshes)
      const alreadyCounted = sessionStorage.getItem(SESSION_KEY) === "1";
      if (alreadyCounted) {
        setVisitCount(((currentCount - 1) % MAX_FLOWERS) + 1);
        return;
      }

      sessionStorage.setItem(SESSION_KEY, "1");
      const { data: incremented } = await supabase.rpc("increment_visit", {
        stat_id: "flower_garden",
      });
      const total = (incremented as number) ?? currentCount + 1;
      // Wrap so the phrase resets after it completes
      const display = ((total - 1) % MAX_FLOWERS) + 1;
      setVisitCount(display);
    };

    run();
  }, []);

  const visibleFlowers = allPositions.slice(0, visitCount);
  const maxCol = allPositions.reduce((m, p) => Math.max(m, p.x), 0) + 1;
  const maxRow = 5;

  return (
    <section className="py-12 px-4">
      <div className="max-w-4xl mx-auto text-center mb-8">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Heart className="w-5 h-5 text-accent fill-accent" />
          <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground">
            Our Growing Love Garden
          </h2>
          <Heart className="w-5 h-5 text-accent fill-accent" />
        </div>
        <p className="font-body text-muted-foreground text-sm" dir="rtl">
          كل مرة بتزوري الصفحة، وردة جديدة بتكبر  🌸
        </p>
        <p className="font-body text-xs text-muted-foreground mt-1">
          {visitCount} / {MAX_FLOWERS} 🌷
        </p>
      </div>

      <div
        className="max-w-4xl mx-auto relative rounded-2xl border border-border bg-card/50 overflow-hidden"
        style={{ height: 280 }}
      >
        <div
          className="absolute bottom-0 left-0 right-0 h-16 rounded-b-2xl"
          style={{ background: "linear-gradient(to top, hsla(120, 30%, 75%, 0.3), transparent)" }}
        />

        <div className="absolute inset-0 flex items-center justify-center" style={{ padding: "20px" }}>
          <div
            className="relative"
            style={{
              width: `${maxCol * 32}px`,
              height: `${maxRow * 36}px`,
              maxWidth: "100%",
            }}
          >
            {visibleFlowers.map((f, i) => {
              const FlowerComp = flowerTypes[f.type];
              return (
                <motion.div
                  key={f.id}
                  className="absolute"
                  style={{
                    left: `${(f.x / maxCol) * 100}%`,
                    top: `${(f.y / maxRow) * 100}%`,
                  }}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{
                    type: "spring",
                    damping: 12,
                    delay: i * 0.03,
                  }}
                >
                  <FlowerComp color={f.color} size={f.size} />
                </motion.div>
              );
            })}
          </div>
        </div>

        {visitCount === 0 && (
          <div className="absolute inset-0 flex items-center justify-center text-muted-foreground font-body text-sm">
            الحديقة لسه بتبدأ... 🌱
          </div>
        )}
      </div>
    </section>
  );
};

export default FlowerGarden;
