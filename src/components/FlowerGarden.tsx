import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";

const STORAGE_KEY = "eso-garden-visits";
const MAX_FLOWERS = 20;

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
      <ellipse
        key={r}
        cx="30" cy="14" rx="9" ry="14"
        fill={color}
        opacity={0.85}
        transform={`rotate(${r} 30 30)`}
      />
    ))}
    <circle cx="30" cy="30" r="7" fill="hsl(40, 80%, 75%)" />
  </svg>
);

const Flower2 = ({ color, size }: { color: string; size: number }) => (
  <svg width={size} height={size} viewBox="0 0 60 60" fill="none">
    {[0, 72, 144, 216, 288].map((r) => (
      <ellipse
        key={r}
        cx="30" cy="12" rx="10" ry="16"
        fill={color}
        opacity={0.8}
        transform={`rotate(${r} 30 30)`}
      />
    ))}
    <circle cx="30" cy="30" r="6" fill="hsl(350, 30%, 55%)" />
  </svg>
);

const Flower3 = ({ color, size }: { color: string; size: number }) => (
  <svg width={size} height={size} viewBox="0 0 60 60" fill="none">
    {[0, 45, 90, 135, 180, 225, 270, 315].map((r) => (
      <ellipse
        key={r}
        cx="30" cy="16" rx="7" ry="12"
        fill={color}
        opacity={0.75}
        transform={`rotate(${r} 30 30)`}
      />
    ))}
    <circle cx="30" cy="30" r="8" fill="hsl(40, 70%, 80%)" />
  </svg>
);

const flowerTypes = [Flower1, Flower2, Flower3];

interface PlacedFlower {
  id: number;
  x: number;
  y: number;
  type: number;
  color: string;
  size: number;
  delay: number;
}

const generateFlowers = (count: number): PlacedFlower[] => {
  const flowers: PlacedFlower[] = [];
  for (let i = 0; i < count; i++) {
    // Use deterministic seed so layout is stable
    const seed = i * 7 + 3;
    flowers.push({
      id: i,
      x: (seed * 13) % 90 + 5,
      y: (seed * 17) % 60 + 20,
      type: i % 3,
      color: flowerColors[i % flowerColors.length],
      size: 36 + (seed % 20),
      delay: i * 0.12,
    });
  }
  return flowers;
};

const FlowerGarden = () => {
  const [visitCount, setVisitCount] = useState(0);

  useEffect(() => {
    const prev = parseInt(localStorage.getItem(STORAGE_KEY) || "0", 10);
    const next = Math.min(prev + 1, MAX_FLOWERS);
    localStorage.setItem(STORAGE_KEY, String(next));
    setVisitCount(next);
  }, []);

  const flowers = generateFlowers(visitCount);

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
          كل مرة بتزوري الصفحة، وردة جديدة بتكبر في حديقتنا 🌸
        </p>
        <p className="font-body text-xs text-muted-foreground mt-1">
          {visitCount} / {MAX_FLOWERS} 🌷
        </p>
      </div>

      <div className="max-w-4xl mx-auto relative rounded-2xl border border-border bg-card/50 overflow-hidden"
        style={{ height: 280 }}
      >
        {/* Grass */}
        <div className="absolute bottom-0 left-0 right-0 h-16 rounded-b-2xl" style={{ background: "linear-gradient(to top, hsla(120, 30%, 75%, 0.3), transparent)" }} />

        {flowers.map((f) => {
          const FlowerComp = flowerTypes[f.type];
          return (
            <motion.div
              key={f.id}
              className="absolute"
              style={{ left: `${f.x}%`, top: `${f.y}%` }}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{
                type: "spring",
                damping: 12,
                delay: f.delay,
              }}
            >
              <FlowerComp color={f.color} size={f.size} />
            </motion.div>
          );
        })}

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
