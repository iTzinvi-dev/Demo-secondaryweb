import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Heart, X } from 'lucide-react';
import { soundEngine } from '../utils/soundEngine';

export const CatEasterEgg: React.FC = () => {
  const [petCount, setPetCount] = useState(0);
  const [avatarError, setAvatarError] = useState(false);
  const [isReacting, setIsReacting] = useState(false);
  const [showSecretPopup, setShowSecretPopup] = useState(false);

  const handlePetCat = () => {
    soundEngine.playCatMeow();
    setIsReacting(true);
    setPetCount((prev) => prev + 1);
    setTimeout(() => setIsReacting(false), 600);
  };

  const handleToggleSecret = (e: React.MouseEvent) => {
    e.stopPropagation();
    soundEngine.playChimeNote(783.99, 0.4);
    setShowSecretPopup((prev) => !prev);
  };

  const banglishCatMessages = [
    'Mew! Mochi Premi ke shuvo 16th jonmodin janachhe!',
    'Purrrr... Mochi Premi-r pashe thakle shobcheye shanto thake.',
    'Mew! Mochi bolche ajke Premi shobcheye boro cake pabe!',
    'Purr... Mochi Premi-r jonno onek bhalobasha niye ashche.',
    'Mew! 16th birthday te Mochi Premi ke chotto ekta hug dilo! ❤️',
  ];

  const currentMessage =
    petCount === 0
      ? 'Mochi ekhane ghumachhe. Ektu ador kore dao...'
      : banglishCatMessages[(petCount - 1) % banglishCatMessages.length];

  return (
    <div className="mx-auto my-12 max-w-[760px] px-6">
      <div className="relative overflow-visible rounded-2xl border border-[#201D1B]/10 bg-white/80 p-6 shadow-xs backdrop-blur-xs transition-all hover:border-[#201D1B]/18 md:p-8">
        {/* Subtle Secret Dot on the Top-Right */}
        <div className="absolute top-4 right-4 z-20">
          <button
            type="button"
            onClick={handleToggleSecret}
            className="group relative flex h-6 w-6 items-center justify-center rounded-full transition-transform hover:scale-110 active:scale-95"
            title="A secret..."
            aria-label="Secret dot note"
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#B45309] opacity-40" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#B45309]/80 shadow-xs" />
            </span>
          </button>

          {/* Secret Message Popup */}
          <AnimatePresence>
            {showSecretPopup && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: -4 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: -4 }}
                transition={{ duration: 0.2 }}
                className="absolute top-8 right-0 z-30 w-[240px] rounded-xl border border-[#201D1B]/15 bg-white p-3.5 shadow-lg text-left"
              >
                <div className="flex items-start justify-between gap-2">
                  <p className="font-handwritten text-lg leading-snug text-[#201D1B]">
                    “mochi ami ei hehehe, onno cat dibo? Ehhh tumi shudhu amar...”
                  </p>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowSecretPopup(false);
                    }}
                    className="text-[#8C827A] hover:text-[#201D1B]"
                    aria-label="Close note"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
          <div className="flex items-center gap-5">
            {/* Interactive Animated Mochi Avatar - Stable, Consistent & Bouncy on Reaction */}
            <button
              type="button"
              onClick={handlePetCat}
              className="group relative flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl border border-[#201D1B]/10 bg-[#FAF8F5] shadow-xs transition-transform duration-200 hover:scale-105 active:scale-95"
              aria-label="Pet Mochi the Cat"
            >
              {!avatarError ? (
                <motion.img
                  animate={isReacting ? { scale: [1, 1.2, 0.9, 1.05, 1], rotate: [0, -6, 6, 0] } : {}}
                  transition={{ duration: 0.5 }}
                  src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Animals/Cat%20Face.png"
                  alt="Mochi the Cat"
                  referrerPolicy="no-referrer"
                  onError={() => setAvatarError(true)}
                  className="h-14 w-14 object-contain animate-gentle-float"
                />
              ) : (
                <span className="font-serif text-2xl font-semibold text-[#57534E]">🐱</span>
              )}

              {/* Floating Hearts burst on tap */}
              {petCount > 0 && (
                <motion.div
                  key={petCount}
                  initial={{ opacity: 0, scale: 0.5, y: 0 }}
                  animate={{ opacity: 1, scale: 1.2, y: -26 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.6 }}
                  className="pointer-events-none absolute -top-1"
                >
                  <Heart className="h-4 w-4 fill-[#B45309] text-[#B45309]" />
                </motion.div>
              )}
            </button>

            {/* Mochi's Speech Box */}
            <div className="text-left">
              <div className="flex items-center gap-2 text-xs text-[#78716C]">
                <Sparkles className="h-3.5 w-3.5 text-[#B45309]" />
                <span className="font-medium tracking-wide">Mochi the Cozy Cat</span>
                <span aria-hidden="true">·</span>
                <span className="font-mono text-[11px]">
                  {petCount === 0 ? 'Ghumonto' : `Ador kora hoyeche ${petCount} bar`}
                </span>
              </div>

              <AnimatePresence mode="wait">
                <motion.p
                  key={petCount}
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.22 }}
                  className="mt-1.5 font-handwritten text-2xl text-[#201D1B] leading-tight md:text-3xl"
                >
                  “{currentMessage}”
                </motion.p>
              </AnimatePresence>
            </div>
          </div>

          {/* Action button */}
          <button
            type="button"
            onClick={handlePetCat}
            className="rounded-full border border-[#201D1B]/15 bg-[#FAF8F5] px-5 py-2.5 text-xs font-medium text-[#201D1B] transition-all hover:bg-white hover:shadow-xs active:scale-95 whitespace-nowrap shrink-0"
          >
            {petCount > 0 ? 'Aro ador koro' : 'Mochi ke ador koro'}
          </button>
        </div>
      </div>
    </div>
  );
};
