import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Heart, MapPin } from "lucide-react";
import WhyILoveYouCard from "@/components/WhyILoveYou";
import FlowerGarden from "@/components/FlowerGarden";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const memories = [

  { coords: [30.0622555, 31.2709438] as [number, number], title: " الزمالك", photo: "images/zamalk.jpeg", text: "كانت احلييي قعده علي النيل مع من اُحب ❤️" },

  { coords: [30.0908598, 31.3229569] as [number, number], title: "الكوربة", photo: "images/korba.jpeg", text: "تقريبا جربنا هناك كل حاجه حرفيااا♥️😂" },

  { coords: [30.0932644, 31.3256038] as [number, number], title: "حديقة الأهرام", photo: "images/ahram.jpeg", text: "منقدرش ننسي مكانا المعتمددد♥️♥️😂" },

  { coords: [30.1393376, 31.7310905] as [number, number], title: "مدينة بدر", photo: "images/badr_city.jpeg", text: "الصحرراء الجردااااء بس مميزه عموما علشان كان اول مره ادوووق اكلك ☝️(مليون من مليون ونجمه وبوسه)" },

  { coords: [30.0335807, 31.2119212] as [number, number], title: "الدقي", photo: "images/dokki.jpg.jpeg", text: "من اول خروجاتناااااا سوااا" },

  { coords: [30.0525548, 31.2009516] as [number, number], title: "المهندسين", photo: "images/mohandessen.jpeg", text: "المهندسين ورخروجات الصبح المريبه دي ♥️😂" },

  { coords: [30.0268743, 31.2345072] as [number, number], title: "القصر العيني", photo: "images/3ani.jpeg", text: "القصر العيني والمشروع البايظ بس عموما حابب اننا كنا في الحوارات دي سوا ♥️😂" },

  { coords: [30.0527616, 31.2497858] as [number, number], title: "العتبة", photo: "images/attaba.jpeg", text: "وسط الزحمة مابشوفش غيرك😘😘♥️" },

  { coords: [30.0473538, 31.2347103] as [number, number], title: "وسط البلد", photo: "images/elbalad.jpeg", text: "السينماااا ومشكلتنا الكبيره اننا مش هنرووووووح سواا😘😘♥️" },

  { coords: [30.0808317, 31.3649451] as [number, number], title: "الماظه مول", photo: "images/almaza.jpeg", text: "المول اللي عرفنا ان الكار دا مش كارناا" },

];

const heartIcon = L.divIcon({
  className: "custom-heart-marker",
  html: `<div class="heart-pin"><svg width="32" height="32" viewBox="0 0 24 24" fill="hsl(350, 40%, 65%)" stroke="hsl(350, 30%, 55%)" stroke-width="1.5"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg></div>`,
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -34],
});

const MemoriesPage = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersRef = useRef<L.Marker[]>([]);

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    const map = L.map(mapRef.current, {
      center: [30.06, 31.25],
      zoom: 11,
      zoomControl: false,
      attributionControl: false,
    });

    L.control.zoom({ position: "bottomright" }).addTo(map);

    L.tileLayer("https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png", {
      maxZoom: 19,
    }).addTo(map);

    memories.forEach((m) => {
      const marker = L.marker(m.coords, { icon: heartIcon }).addTo(map);
      marker.bindPopup(
        `<div class="memory-popup" dir="rtl">
          <div class="memory-popup-img-wrapper">
            <img src="${m.photo}" alt="${m.title}" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex'" />
            <div class="memory-popup-placeholder" style="display:none">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="hsl(350,40%,75%)" stroke="none"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
            </div>
          </div>
          <h3 class="memory-popup-title">${m.title}</h3>
          <p class="memory-popup-text">${m.text}</p>
        </div>`,
        { className: "romantic-popup", maxWidth: 260 }
      );
      markersRef.current.push(marker);
    });

    mapInstanceRef.current = map;

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  return (
    <div className="min-h-screen bg-background pt-20 sm:pt-24">
      {/* Header */}
      <motion.div
        className="text-center py-6 sm:py-8 px-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex items-center justify-center gap-2 mb-3">
          <Heart className="w-5 h-5 sm:w-6 sm:h-6 text-accent fill-accent" />
          <h1 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-foreground">
            Our Memories
          </h1>
          <Heart className="w-5 h-5 sm:w-6 sm:h-6 text-accent fill-accent" />
        </div>
        <p className="font-body text-muted-foreground text-sm md:text-base max-w-md mx-auto px-2">
          كل مكان فيه ذكرى حلوة معاكي يا إيسو 💕
        </p>
      </motion.div>

      {/* Map */}
      <motion.div
        className="px-4 pb-8 max-w-5xl mx-auto"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <div className="rounded-2xl overflow-hidden border border-border shadow-xl">
          <div ref={mapRef} className="w-full h-[60vh] md:h-[70vh]" />
        </div>
      </motion.div>

      {/* Legend */}
      <motion.div
        className="pb-8 px-4 max-w-5xl mx-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        <div className="flex flex-wrap gap-3 justify-center">
          {memories.map((m, i) => (
            <motion.div
              key={i}
              className="flex items-center gap-1.5 bg-card border border-border rounded-full px-3 py-1.5 text-xs font-body text-foreground"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 + i * 0.05 }}
            >
              <MapPin className="w-3 h-3 text-accent" />
              {m.title}
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Secret for Eso Card */}
      <div className="pb-8 px-4">
        <WhyILoveYouCard />
      </div>

      {/* Flower Garden */}
      <FlowerGarden />
    </div>
  );
};

export default MemoriesPage;
