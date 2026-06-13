import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Plus, Check, Trash2, Sparkles, Heart, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

type Place = {
  id: string;
  name: string;
  visited: boolean;
  created_at: string;
};

const PlacesWishlist = () => {
  const [places, setPlaces] = useState<Place[]>([]);
  const [input, setInput] = useState("");
  const [justChecked, setJustChecked] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);

  // Initial load + realtime sync across devices
  useEffect(() => {
    let mounted = true;

    const load = async () => {
      const { data, error } = await supabase
        .from("places")
        .select("id, name, visited, created_at")
        .order("created_at", { ascending: false });
      if (!mounted) return;
      if (error) {
        toast.error("مش قادرين نحمّل الأماكن");
      } else {
        setPlaces((data as Place[]) || []);
      }
      setLoading(false);
    };
    load();

    const channel = supabase
      .channel("places-changes")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "places" },
        () => load()
      )
      .subscribe();

    return () => {
      mounted = false;
      supabase.removeChannel(channel);
    };
  }, []);

  const addPlace = async (e: React.FormEvent) => {
    e.preventDefault();
    const name = input.trim();
    if (!name || adding) return;
    setAdding(true);
    setInput("");
    const { error } = await supabase.from("places").insert({ name });
    if (error) {
      toast.error("مش قادرين نضيف المكان");
      setInput(name);
    }
    setAdding(false);
  };

  const toggle = async (id: string, current: boolean) => {
    // Optimistic
    setPlaces((p) => p.map((pl) => (pl.id === id ? { ...pl, visited: !current } : pl)));
    if (!current) {
      setJustChecked(id);
      setTimeout(() => setJustChecked((c) => (c === id ? null : c)), 900);
    }
    const { error } = await supabase
      .from("places")
      .update({ visited: !current, visited_at: !current ? new Date().toISOString() : null })
      .eq("id", id);
    if (error) {
      toast.error("مش قادرين نحدّث");
      setPlaces((p) => p.map((pl) => (pl.id === id ? { ...pl, visited: current } : pl)));
    }
  };

  const remove = async (id: string) => {
    const prev = places;
    setPlaces((p) => p.filter((pl) => pl.id !== id));
    const { error } = await supabase.from("places").delete().eq("id", id);
    if (error) {
      toast.error("مش قادرين نمسح");
      setPlaces(prev);
    }
  };

  const visitedCount = places.filter((p) => p.visited).length;
  const progress = places.length ? (visitedCount / places.length) * 100 : 0;

  return (
    <motion.div
      className="px-4 pb-12 max-w-3xl mx-auto"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <div className="glass-card p-6 sm:p-8 dir-rtl">
        {/* Header */}
        <div className="flex items-center justify-center gap-2 mb-2">
          <Sparkles className="w-5 h-5 text-accent" />
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-gradient-rose">
            أماكن نفسنا نروحها سوا
          </h2>
          <Heart className="w-5 h-5 text-accent fill-accent" />
        </div>
        <p className="text-center text-sm text-muted-foreground mb-6">
          اكتبي أي مكان نفسك نروحه يا إيسو 💕 محفوظ على طول وهيظهر من أي جهاز
        </p>

        {/* Progress */}
        {places.length > 0 && (
          <div className="mb-6">
            <div className="flex justify-between text-xs font-body text-muted-foreground mb-1.5">
              <span>{visitedCount} من {places.length} مكان</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <div className="h-2 rounded-full bg-muted overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-[hsl(var(--rose-gold-light))] to-[hsl(var(--rose-gold))]"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              />
            </div>
          </div>
        )}

        {/* Add form */}
        <form onSubmit={addPlace} className="flex gap-2 mb-6" dir="rtl">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="مثلا المعادي او ايا مكان جديد عموما ممكن نبقي نحطه هنا علشان مننساش"
            className="flex-1 rounded-full bg-white/70 border border-border focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/30 px-4 py-2.5 text-sm font-body text-foreground placeholder:text-muted-foreground transition-all"
          />
          <motion.button
            type="submit"
            disabled={adding}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-1.5 rounded-full bg-gradient-to-r from-[hsl(var(--rose-gold-light))] to-[hsl(var(--rose-gold))] text-white font-body font-semibold px-5 py-2.5 text-sm shadow-petal hover:shadow-glow transition-shadow disabled:opacity-60"
          >
            {adding ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
            ضيفي
          </motion.button>
        </form>

        {/* List */}
        <ul className="space-y-2.5">
          <AnimatePresence initial={false}>
            {loading ? (
              <motion.li
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex items-center justify-center py-8 text-sm text-muted-foreground"
              >
                <Loader2 className="w-4 h-4 animate-spin mr-2" />
                بنحمّل الأماكن...
              </motion.li>
            ) : places.length === 0 ? (
              <motion.li
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center py-8 text-sm text-muted-foreground italic"
              >
                لسه ما ضفتيش أي مكان... 🌸
              </motion.li>
            ) : (
              places.map((p) => (
                <motion.li
                  key={p.id}
                  layout
                  initial={{ opacity: 0, x: 30, scale: 0.9 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: -30, scale: 0.9 }}
                  transition={{ type: "spring", stiffness: 320, damping: 26 }}
                  className={`relative group flex items-center gap-3 p-3 sm:p-4 rounded-2xl border transition-all ${
                    p.visited
                      ? "bg-accent/10 border-accent/30"
                      : "bg-white/60 border-border hover:border-accent/40"
                  }`}
                >
                  {/* Checkbox */}
                  <motion.button
                    type="button"
                    onClick={() => toggle(p.id, p.visited)}
                    whileTap={{ scale: 0.85 }}
                    className={`relative shrink-0 w-7 h-7 rounded-full flex items-center justify-center border-2 transition-colors ${
                      p.visited
                        ? "bg-gradient-to-br from-[hsl(var(--rose-gold-light))] to-[hsl(var(--rose-gold))] border-transparent"
                        : "bg-white border-accent/40 hover:border-accent"
                    }`}
                    aria-label={p.visited ? "Mark as not visited" : "Mark as visited"}
                  >
                    <AnimatePresence>
                      {p.visited && (
                        <motion.span
                          key="check"
                          initial={{ scale: 0, rotate: -45 }}
                          animate={{ scale: 1, rotate: 0 }}
                          exit={{ scale: 0 }}
                          transition={{ type: "spring", stiffness: 500, damping: 18 }}
                        >
                          <Check className="w-4 h-4 text-white" strokeWidth={3} />
                        </motion.span>
                      )}
                    </AnimatePresence>
                    <AnimatePresence>
                      {justChecked === p.id && p.visited && (
                        <>
                          {[...Array(6)].map((_, i) => (
                            <motion.span
                              key={i}
                              className="absolute w-1.5 h-1.5 rounded-full bg-accent"
                              initial={{ scale: 0, x: 0, y: 0, opacity: 1 }}
                              animate={{
                                scale: 1,
                                x: Math.cos((i / 6) * Math.PI * 2) * 22,
                                y: Math.sin((i / 6) * Math.PI * 2) * 22,
                                opacity: 0,
                              }}
                              exit={{ opacity: 0 }}
                              transition={{ duration: 0.7, ease: "easeOut" }}
                            />
                          ))}
                        </>
                      )}
                    </AnimatePresence>
                  </motion.button>

                  {/* Name */}
                  <div className="flex-1 min-w-0 flex items-center gap-2">
                    <MapPin
                      className={`w-4 h-4 shrink-0 ${
                        p.visited ? "text-accent" : "text-muted-foreground"
                      }`}
                    />
                    <span
                      className={`font-body text-sm sm:text-base truncate transition-all ${
                        p.visited
                          ? "line-through text-muted-foreground"
                          : "text-foreground"
                      }`}
                    >
                      {p.name}
                    </span>
                  </div>

                  {/* Delete */}
                  <motion.button
                    type="button"
                    onClick={() => remove(p.id)}
                    whileHover={{ scale: 1.1, rotate: -8 }}
                    whileTap={{ scale: 0.9 }}
                    className="shrink-0 p-2 rounded-full text-muted-foreground hover:text-destructive hover:bg-destructive/10 opacity-0 group-hover:opacity-100 focus:opacity-100 transition-opacity"
                    aria-label="Delete"
                  >
                    <Trash2 className="w-4 h-4" />
                  </motion.button>
                </motion.li>
              ))
            )}
          </AnimatePresence>
        </ul>
      </div>
    </motion.div>
  );
};

export default PlacesWishlist;
