import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BookOpen, Sparkles, ChevronLeft, ChevronRight, Heart } from 'lucide-react';
import { ScrapbookFolio } from '../data/storybookData';
import { soundEngine } from '../utils/soundEngine';

interface DigitalScrapbookSectionProps {
  folios: ScrapbookFolio[];
}

export const DigitalScrapbookSection: React.FC<DigitalScrapbookSectionProps> = ({ folios }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [hugHeartsCount, setHugHeartsCount] = useState(0);
  const currentFolio = folios[activeIndex] || folios[0];

  const handleSelectFolio = (index: number) => {
    soundEngine.playPaperRustle();
    setActiveIndex(index);
  };

  const handleNext = () => {
    soundEngine.playPaperRustle();
    setActiveIndex((prev) => (prev + 1) % folios.length);
  };

  const handlePrev = () => {
    soundEngine.playPaperRustle();
    setActiveIndex((prev) => (prev - 1 + folios.length) % folios.length);
  };

  const handleHugClick = () => {
    soundEngine.playChimeNote(659.25, 0.6);
    setHugHeartsCount((prev) => prev + 1);
  };

  return (
    <section className="mx-auto my-20 max-w-[760px] px-6">
      {/* Header & Tabs in clean grid box style */}
      <div className="flex flex-col justify-between gap-4 border-b border-[#201D1B]/8 pb-5 sm:flex-row sm:items-end">
        <div>
          <span className="font-serif italic text-xs tracking-widest uppercase text-[#8C827A]">
            Keepsake Folios
          </span>
          <h2 className="mt-1 font-qurov text-2xl font-medium text-[#201D1B] md:text-3xl">
            Premi-r Chotto Scrapbook
          </h2>
        </div>

        {/* Folio Tabs */}
        <div className="flex items-center gap-1 rounded-full border border-[#201D1B]/10 bg-white/70 p-1 backdrop-blur-xs">
          {folios.map((folio, idx) => (
            <button
              key={folio.id}
              type="button"
              onClick={() => handleSelectFolio(idx)}
              className={`rounded-full px-3.5 py-1.5 text-xs font-medium transition-all ${
                activeIndex === idx
                  ? 'bg-[#201D1B] text-[#FAF8F5] shadow-xs'
                  : 'text-[#78716C] hover:text-[#201D1B]'
              }`}
            >
              {folio.folioLabel}
            </button>
          ))}
        </div>
      </div>

      {/* Main Grid Box Folio Card */}
      <div className="relative mt-6 overflow-hidden rounded-2xl border border-[#201D1B]/10 bg-white/90 p-6 shadow-xs backdrop-blur-xs md:p-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentFolio.id}
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -12 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="grid grid-cols-1 items-center gap-8 md:grid-cols-12"
          >
            {/* Visual keepsake box */}
            <div className="flex flex-col items-center justify-center rounded-xl border border-[#201D1B]/8 bg-[#FAF8F5] p-6 text-center md:col-span-5">
              {currentFolio.isChibiHug ? (
                /* Chibi Male & Female Hugging Animation Box */
                <button
                  type="button"
                  onClick={handleHugClick}
                  className="group relative flex h-28 w-32 cursor-pointer flex-col items-center justify-center rounded-2xl bg-white p-2 shadow-xs transition-transform duration-200 hover:scale-105 active:scale-95"
                  aria-label="Chibi Hug"
                >
                  {/* Floating hearts on click */}
                  {hugHeartsCount > 0 && (
                    <motion.div
                      key={hugHeartsCount}
                      initial={{ opacity: 0, scale: 0.5, y: 0 }}
                      animate={{ opacity: 1, scale: 1.2, y: -24 }}
                      className="pointer-events-none absolute -top-2 flex gap-1"
                    >
                      <Heart className="h-3.5 w-3.5 fill-[#E11D48] text-[#E11D48]" />
                      <Heart className="h-3 w-3 fill-[#F43F5E] text-[#F43F5E]" />
                    </motion.div>
                  )}

                  <svg
                    viewBox="0 0 160 140"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-20 w-24 select-none animate-gentle-float"
                  >
                    {/* Floating mini heart */}
                    <path
                      d="M80 20 C80 14, 72 10, 68 14 C64 10, 56 14, 56 20 C56 26, 68 34, 68 34 C68 34, 80 26, 80 20 Z"
                      fill="#E11D48"
                      opacity="0.8"
                    />

                    {/* Boy Chibi (Left) */}
                    <g transform="translate(18, 25)">
                      {/* Body */}
                      <path d="M 36 60 L 58 60 L 64 105 L 30 105 Z" fill="#64748B" />
                      {/* Head */}
                      <circle cx="46" cy="40" r="23" fill="#FDE6D8" stroke="#1E1B24" strokeWidth="1.8" />
                      {/* Boy Hair */}
                      <path
                        d="M 23 38 C 23 18, 69 18, 69 38 C 69 30, 58 24, 46 24 C 34 24, 23 30, 23 38 Z"
                        fill="#334155"
                      />
                      {/* Closed Eye (smiling hug) */}
                      <path d="M 36 40 Q 40 44 44 40" stroke="#1E1B24" strokeWidth="1.6" strokeLinecap="round" />
                      {/* Soft blush */}
                      <ellipse cx="33" cy="46" rx="4" ry="2" fill="#F43F5E" fillOpacity="0.4" />
                      {/* Arm wrapping around */}
                      <path
                        d="M 44 65 C 55 60, 75 62, 82 72"
                        stroke="#64748B"
                        strokeWidth="7"
                        strokeLinecap="round"
                      />
                    </g>

                    {/* Girl Chibi / Premi (Right) */}
                    <g transform="translate(54, 28)">
                      {/* Dress */}
                      <path d="M 32 58 L 56 58 L 65 102 L 23 102 Z" fill="#F472B6" />
                      {/* Head */}
                      <circle cx="44" cy="38" r="22" fill="#FDE6D8" stroke="#1E1B24" strokeWidth="1.8" />
                      {/* Long Hair with little bow */}
                      <path
                        d="M 22 36 C 22 17, 66 17, 66 36 C 66 28, 55 22, 44 22 C 33 22, 22 28, 22 36 Z"
                        fill="#475569"
                      />
                      <path d="M 64 36 Q 72 65 60 84" stroke="#475569" strokeWidth="8" strokeLinecap="round" />
                      {/* Little Hair Ribbon */}
                      <circle cx="32" cy="24" r="3.5" fill="#E11D48" />
                      {/* Closed Eye (happy warm hug) */}
                      <path d="M 48 38 Q 52 42 56 38" stroke="#1E1B24" strokeWidth="1.6" strokeLinecap="round" />
                      {/* Blush */}
                      <ellipse cx="57" cy="44" rx="4" ry="2" fill="#F43F5E" fillOpacity="0.5" />
                      {/* Arm hugging back */}
                      <path
                        d="M 34 66 C 22 62, 4 64, -2 74"
                        stroke="#F472B6"
                        strokeWidth="7"
                        strokeLinecap="round"
                      />
                    </g>
                  </svg>

                  <span className="text-[10px] text-[#A8A29E] group-hover:text-[#E11D48]">
                    Click for hugs ({hugHeartsCount})
                  </span>
                </button>
              ) : (
                /* Standard Icon Keepsake */
                <div className="relative flex h-24 w-24 items-center justify-center rounded-2xl bg-white shadow-xs">
                  <img
                    src={currentFolio.emojiIcon}
                    alt={currentFolio.title}
                    referrerPolicy="no-referrer"
                    className="h-14 w-14 object-contain animate-gentle-float"
                  />
                </div>
              )}

              <span className="mt-4 font-serif italic text-xs text-[#78716C]">
                {currentFolio.date}
              </span>

              <div className="mt-2 inline-flex items-center gap-1.5 rounded-full border border-[#201D1B]/10 bg-white px-3 py-1 text-[11px] text-[#57534E]">
                <span>{currentFolio.isChibiHug ? '💖' : '🌸'}</span>
                <span>{currentFolio.botanicalTag}</span>
              </div>
            </div>

            {/* Narrative text box */}
            <div className="flex flex-col justify-between md:col-span-7">
              <div>
                <div className="flex items-center gap-2 text-xs text-[#78716C]">
                  <BookOpen className="h-3.5 w-3.5 text-[#B45309]" />
                  <span>{currentFolio.folioLabel}</span>
                </div>

                <h3 className="mt-2 font-qurov text-xl font-medium text-[#201D1B] md:text-2xl">
                  {currentFolio.title}
                </h3>

                <p className="mt-3 text-sm leading-relaxed text-[#57534E]">
                  {currentFolio.body}
                </p>

                {/* Handwritten Margin Note Box */}
                <div className="mt-5 rounded-xl border border-[#201D1B]/8 bg-[#FAF8F5] p-4">
                  <div className="flex items-center gap-1.5 text-xs text-[#78716C]">
                    <Sparkles className="h-3 w-3 text-[#B45309]" />
                    <span>Penciled note</span>
                  </div>
                  <p className="mt-1 font-handwritten text-xl text-[#201D1B] leading-tight">
                    “{currentFolio.handwrittenNote}”
                  </p>
                </div>
              </div>

              {/* Prev / Next controls */}
              <div className="mt-6 flex items-center justify-between border-t border-[#201D1B]/6 pt-4">
                <button
                  type="button"
                  onClick={handlePrev}
                  className="inline-flex items-center gap-1 text-xs text-[#78716C] hover:text-[#201D1B]"
                >
                  <ChevronLeft className="h-3.5 w-3.5" />
                  <span>Ager page</span>
                </button>

                <span className="font-mono text-xs text-[#A8A29E]">
                  0{activeIndex + 1} / 0{folios.length}
                </span>

                <button
                  type="button"
                  onClick={handleNext}
                  className="inline-flex items-center gap-1 text-xs text-[#78716C] hover:text-[#201D1B]"
                >
                  <span>Porertaa</span>
                  <ChevronRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};
