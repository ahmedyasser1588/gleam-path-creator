import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Music, Pause, SkipForward, Heart } from "lucide-react";

const MusicPlayer = () => {
  const songs = [
    "/Music/happy brithday to you.mp3",
    "/Music/3id milad elila.mp3",
    "/Music/Kol Sana w enta.mp3",
    "/Music/elwala wala.mp3",
    "/Music/elyoum 3id.mp3",
    "/Music/yalla 7alan balan.mp3",
    "/Music/sana 7elwa.mp3",
  ].map((p) => encodeURI(p));

  const [playing, setPlaying] = useState(false);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Initialize audio element once
  useEffect(() => {
    const audio = new Audio();
    audio.preload = "auto";
    audio.src = songs[0];
    audioRef.current = audio;

    const handleEnded = () => {
      const next = (currentSongIndexRef.current + 1) % songs.length;
      currentSongIndexRef.current = next;
      setCurrentSongIndex(next);
      audio.src = songs[next];
      audio.play().catch((err) => console.log("Auto-next failed:", err));
    };

    const handleError = (e: Event) => {
      console.log("Audio error:", (e.target as HTMLAudioElement)?.error);
    };

    audio.addEventListener("ended", handleEnded);
    audio.addEventListener("error", handleError);

    return () => {
      audio.pause();
      audio.removeEventListener("ended", handleEnded);
      audio.removeEventListener("error", handleError);
      audioRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Keep an up-to-date ref of the current index for the ended handler
  const currentSongIndexRef = useRef(0);
  useEffect(() => {
    currentSongIndexRef.current = currentSongIndex;
  }, [currentSongIndex]);

  const playSongAt = (index: number) => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.src = songs[index];
    audio.load();
    audio
      .play()
      .then(() => setPlaying(true))
      .catch((err) => {
        console.log("Error playing:", err);
        setPlaying(false);
      });
  };

  const changeRandomSong = () => {
    if (songs.length <= 1) return;
    let randomIndex;
    do {
      randomIndex = Math.floor(Math.random() * songs.length);
    } while (randomIndex === currentSongIndex);
    setCurrentSongIndex(randomIndex);
    playSongAt(randomIndex);
  };

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      audio.pause();
      setPlaying(false);
    } else {
      audio
        .play()
        .then(() => setPlaying(true))
        .catch((err) => {
          console.log("Error playing, retrying:", err);
          playSongAt(currentSongIndex);
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
