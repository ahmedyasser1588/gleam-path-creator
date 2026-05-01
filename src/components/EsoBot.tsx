const EsoBot = () => {
  return (
    <button
      onClick={() => window.open("https://ai-embrace-craft.lovable.app/", "_blank")}
      aria-label="Open Eso-Bot chat"
      className="fixed bottom-4 left-4 sm:bottom-6 sm:left-6 z-40 w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center text-2xl sm:text-3xl text-white bg-accent shadow-lg border-2 border-white hover:scale-110 transition-transform"
    >
      ❤️
    </button>
  );
};

export default EsoBot;
