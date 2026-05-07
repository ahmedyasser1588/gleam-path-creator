import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Music, Pause, SkipForward, Heart } from "lucide-react";
import birthdayNight from "@/assets/music/birthday-night.mp3";
import kolSana from "@/assets/music/kol-sana.mp3";
import elwalaWala from "@/assets/music/elwala-wala.mp3";
import elyoumEid from "@/assets/music/elyoum-eid.mp3";
import yallaHalan from "@/assets/music/yalla-halan.mp3";
import sanaHelwa from "@/assets/music/sana-helwa.mp3";

const SONGS = [
  birthdayNight,
  kolSana,
  elwalaWala,
  elyoumEid,
  yallaHalan,
  sanaHelwa,
];

const MusicPlayer = () => {
  const [playing, setPlaying] = useState(false);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const currentSongIndexRef = useRef(0);
  const hasInteractedRef = useRef(false);
  const errorCountRef = useRef(0);
  const lastErrorTimeRef = useRef(0);
  const switchingRef = useRef(false);

  useEffect(() => {
    currentSongIndexRef.current = currentSongIndex;
  }, [currentSongIndex]);

  // Get or lazily create the audio element. Critical: first creation must happen
  // inside a user gesture for mobile (iOS Safari / Chrome Android) autoplay rules.
  const getAudio = (): HTMLAudioElement => {
    if (!audioRef.current) {
      const audio = new Audio();
      audio.preload = "metadata";
      audio.src = SONGS[currentSongIndexRef.current];

      audio.addEventListener("ended", () => {
        const next = (currentSongIndexRef.current + 1) % SONGS.length;
        currentSongIndexRef.current = next;
        setCurrentSongIndex(next);
        audio.src = SONGS[next];
        audio.play().catch((err) => console.log("Auto-next failed:", err));
      });

      audio.addEventListener("error", () => {
        if (switchingRef.current) return;
        // Throttle: if we get a burst of errors, stop instead of looping forever
        const now = Date.now();
        if (now - lastErrorTimeRef.current < 3000) {
          errorCountRef.current += 1;
        } else {
          errorCountRef.current = 1;
        }
        lastErrorTimeRef.current = now;

        if (errorCountRef.current >= SONGS.length) {
          console.log("Too many audio errors — stopping playback.");
          setPlaying(false);
          return;
        }

        const next = (currentSongIndexRef.current + 1) % SONGS.length;
        currentSongIndexRef.current = next;
        setCurrentSongIndex(next);
        audio.src = SONGS[next];
        audio.play().catch((err) => {
          console.log("Fallback song failed:", err);
          setPlaying(false);
        });
      });

      audioRef.current = audio;
    }
    return audioRef.current;
  };

  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const playSongAt = (index: number) => {
    const audio = getAudio();
    switchingRef.current = true;
    audio.pause();
    audio.src = SONGS[index];
    switchingRef.current = false;
    // Don't call load() — setting src triggers load automatically.
    // Calling load() then play() can cause AbortError on mobile.
    const playPromise = audio.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => setPlaying(true))
        .catch((err) => {
          console.log("Error playing:", err);
          setPlaying(false);
        });
    }
  };

  const changeRandomSong = () => {
    if (SONGS.length <= 1) return;
    let randomIndex;
    do {
      randomIndex = Math.floor(Math.random() * SONGS.length);
    } while (randomIndex === currentSongIndex);
    setCurrentSongIndex(randomIndex);
    currentSongIndexRef.current = randomIndex;
    playSongAt(randomIndex);
  };

  const togglePlay = () => {
    const audio = getAudio();

    if (playing) {
      audio.pause();
      setPlaying(false);
      return;
    }

    // First tap on mobile: just play current src directly (no reload)
    // to keep inside the user-gesture chain.
    const playPromise = audio.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          hasInteractedRef.current = true;
          errorCountRef.current = 0;
          setPlaying(true);
        })
        .catch((err) => {
          console.log("Initial play blocked, retrying with explicit src:", err);
          // Retry once with explicit src reset (still synchronous-ish)
          audio.src = SONGS[currentSongIndexRef.current];
          audio
            .play()
            .then(() => {
              hasInteractedRef.current = true;
              setPlaying(true);
            })
            .catch((err2) => {
              console.log("Retry failed:", err2);
              setPlaying(false);
            });
        });
    }
  };

  return (
    <>
      <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 flex flex-col items-center gap-3">
        <AnimatePresence>
          {playing && (
            <motion.button
              onClick={changeRandomSong}
              initial={{ opacity: 0, y: 10, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.8 }}
              className="bg-white/20 backdrop-blur-md p-2 rounded-full border border-white/30 text-accent hover:bg-white/40 shadow-lg"
            >
              <SkipForward className="w-4 h-4" />
            </motion.button>
          )}
        </AnimatePresence>

        <motion.button
          onClick={togglePlay}
          className="relative glass-card p-4 rounded-full glow-pink shadow-lg border border-white/20 bg-white/10"
          style={{ backdropFilter: "blur(12px)" }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <div className="absolute -top-1 -right-1">
            <Heart className="w-4 h-4 text-accent fill-accent animate-pulse" />
          </div>

          <div className="relative">
            <motion.div
              className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center border border-accent/20"
              animate={playing ? { rotate: 360 } : { rotate: 0 }}
              transition={playing ? { duration: 4, repeat: Infinity, ease: "linear" } : {}}
            >
              <div className="w-2.5 h-2.5 rounded-full bg-accent/40" />
            </motion.div>

            <div className="absolute inset-0 flex items-center justify-center">
              <AnimatePresence mode="wait">
                {playing ? (
                  <motion.div key="pause" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    <Pause className="w-4 h-4 text-accent" />
                  </motion.div>
                ) : (
                  <motion.div key="music" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    <Music className="w-4 h-4 text-accent" />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.button>
      </div>
    </>
  );
};

export default MusicPlayer;
