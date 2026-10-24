import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { soundEngine } from '../utils/soundEngine';

export const PaperAirplaneSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [unfolded, setUnfolded] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const planeX = useTransform(scrollYProgress, [0.1, 0.5, 0.9], ['-6%', '45%', '98%']);
  const planeY = useTransform(scrollYProgress, [0.1, 0.5, 0.9], ['80%', '24%', '10%']);
  const planeRotate = useTransform(scrollYProgress, [0.1, 0.5, 0.9], [12, -4, -14]);

  const handleLaunch = () => {
    soundEngine.playPaperRustle();
    setUnfolded((prev) => !prev);
  };

  return (
    <div ref={containerRef} className="relative mx-auto my-16 max-w-[840px] px-6 py-12">
      {/* Flight line & airplane */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <svg
          viewBox="0 0 840 280"
          fill="none"
          className="h-full w-full opacity-25"
          aria-hidden="true"
        >
          <path
            d="M 20 230 C 260 210, 480 80, 800 40"
            stroke="#2B2725"
            strokeWidth="1.2"
            strokeDasharray="5 5"
          />
        </svg>

        <motion.div
          style={{ left: planeX, top: planeY, rotate: planeRotate }}
          className="absolute h-10 w-16 -translate-x-1/2 -translate-y-1/2 cursor-pointer pointer-events-auto"
          onClick={handleLaunch}
        >
          <svg
            viewBox="0 0 100 65"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="h-full w-full drop-shadow-xs transition-transform hover:scale-110"
          >
            <polygon points="4,34 94,6 46,42" fill="#FAF8F5" stroke="#2B2725" strokeWidth="1.4" />
            <polygon points="46,42 94,6 56,58" fill="#ECE7DF" stroke="#2B2725" strokeWidth="1.4" />
          </svg>
        </motion.div>
      </div>

      {/* Clean text section */}
      <div className="relative z-10 flex flex-col items-center text-center">
        <span className="font-handwritten text-2xl text-[#8C827A]">
          uronto kagojer biman
        </span>
        <h3 className="mt-1 font-qurov text-2xl md:text-3xl text-[#201D1B]">
          Chotto ekta shopno pathiye dilam
        </h3>
        <p className="mt-3 max-w-[480px] text-sm leading-relaxed text-[#57534E]">
          Scroll korar shomoy biman ti ure jachhe. Click kore khule dekho ki lekha ache.
        </p>

        <button
          type="button"
          onClick={handleLaunch}
          className="mt-4 rounded-full border border-[#201D1B]/15 bg-white/70 px-4 py-1.5 text-xs font-medium tracking-wide text-[#201D1B] transition-colors hover:bg-white"
        >
          {unfolded ? 'Biman bondho koro' : 'Kagojer biman ti kholo'}
        </button>

        {unfolded && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 max-w-[420px] rounded-xl border border-[#201D1B]/10 bg-white/90 p-5 shadow-xs"
          >
            <p className="font-handwritten text-2xl text-[#2B2725] leading-relaxed">
              “Premi, tomar 16 bochhor er protita din hok anonde bhora. Shob shopno shotti hok.”
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
};
