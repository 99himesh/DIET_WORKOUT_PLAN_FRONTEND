import { useEffect, useState } from "react";

const Loader = () => {
    const [audio, setAudio] = useState(null);

  useEffect(() => {
    const music = new Audio(
      "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
    );

    music.loop = true;
    music.volume = 0.2;

    setAudio(music);

    music.play().catch(() => {
      console.log("Browser blocked autoplay");
    });

    return () => {
      music.pause();
      music.currentTime = 0;
    };
  }, []);

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-[#07110D">
      {/* Loader */}
      <div className="relative w-20 h-20 mb-6">
        <div className="absolute inset-0 rounded-full border-4 border-[#123326]" />

        <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-[#00C896] border-r-[#39FF88] animate-spin" />

        <div className="absolute inset-4 rounded-full bg-[#0D1B15] flex items-center justify-center">
          <span className="text-2xl">💪</span>
        </div>
      </div>

      {/* Title */}
      <h2 className="text-xl font-semibold text-white">
        Creating Your Fitness Plan
      </h2>

      {/* Description */}
      <p className="text-[#9CAFA5] text-sm mt-2 text-center">
        AI is preparing your personalized diet & workout plan...
      </p>

      {/* Loading dots */}
      <div className="flex gap-2 mt-5">
        <span className="w-2 h-2 bg-[#00C896] rounded-full animate-bounce [animation-delay:-0.3s]" />
        <span className="w-2 h-2 bg-[#00C896] rounded-full animate-bounce [animation-delay:-0.15s]" />
        <span className="w-2 h-2 bg-[#39FF88] rounded-full animate-bounce" />
      </div>
    </div>
  );
};

export default Loader;