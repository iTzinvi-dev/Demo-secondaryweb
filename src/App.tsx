import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Sparkles, Heart } from 'lucide-react';
import { premiStory } from './data/storybookData';
import { CatEasterEgg } from './components/CatEasterEgg';
import { PaperAirplaneSection } from './components/PaperAirplaneSection';
import { DigitalScrapbookSection } from './components/DigitalScrapbookSection';
import { ThreeBirthdayCake } from './components/ThreeBirthdayCake';
import { PetalBackground } from './components/PetalBackground';
import confetti from 'canvas-confetti';

export default function App() {
  const [wishUnlocked, setWishUnlocked] = useState(false);

  const handleCakeAllBlown = () => {
    setWishUnlocked(true);

    // Celebratory confetti explosion animation when the wish section reveals
    confetti({
      particleCount: 110,
      spread: 95,
      origin: { y: 0.62 },
      colors: ['#E11D48', '#F43F5E', '#F59E0B', '#FBBF24', '#FAF8F5', '#8B5CF6'],
      disableForReducedMotion: true,
    });

    setTimeout(() => {
      confetti({
        particleCount: 75,
        angle: 60,
        spread: 65,
        origin: { x: 0.05, y: 0.68 },
        colors: ['#E11D48', '#F59E0B', '#B45309', '#FAF8F5'],
        disableForReducedMotion: true,
      });
      confetti({
        particleCount: 75,
        angle: 120,
        spread: 65,
        origin: { x: 0.95, y: 0.68 },
        colors: ['#E11D48', '#F59E0B', '#B45309', '#FAF8F5'],
        disableForReducedMotion: true,
      });
    }, 320);

    setTimeout(() => {
      confetti({
        particleCount: 85,
        spread: 110,
        origin: { y: 0.48 },
        colors: ['#F59E0B', '#E11D48', '#DEB887', '#FFFFFF'],
        disableForReducedMotion: true,
      });
    }, 700);
  };

  return (
    <div className="relative min-h-screen bg-[#FAF8F5] text-[#201D1B] selection:bg-[#EAE4DC] selection:text-[#1A1817]">
      {/* Drifting Flower Petals Background */}
      <PetalBackground />

      {/* Minimal Top Header */}
      <header className="sticky top-0 z-40 flex items-center justify-between border-b border-[#201D1B]/6 bg-[#FAF8F5]/90 px-8 py-5 backdrop-blur-md">
        <span className="font-qurov text-lg font-medium tracking-wide text-[#201D1B]">
          Premi
        </span>
        <div className="relative inline-flex items-center gap-1.5">
          <span className="font-serif italic text-xs tracking-widest uppercase text-[#78716C]">
            My Little Princess
          </span>
          <motion.span
            animate={{
              y: [0, -3.5, 0],
              scale: [1, 1.12, 1],
              opacity: [0.7, 1, 0.7],
            }}
            transition={{
              duration: 2.8,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="inline-flex items-center"
            aria-hidden="true"
          >
            <Heart className="h-3 w-3 fill-[#E11D48]/30 text-[#E11D48] transition-transform hover:scale-125" />
          </motion.span>
          <motion.span
            animate={{
              y: [0, -8, -13],
              x: [0, 2, -2],
              opacity: [0, 0.7, 0],
              scale: [0.6, 0.85, 0.5],
            }}
            transition={{
              duration: 3.6,
              repeat: Infinity,
              ease: 'easeOut',
              delay: 1.2,
            }}
            className="pointer-events-none absolute -top-1 -right-2 inline-flex items-center"
            aria-hidden="true"
          >
            <Heart className="h-2 w-2 fill-[#E11D48] text-[#E11D48]" />
          </motion.span>
        </div>
      </header>

      <main className="mx-auto max-w-[800px] px-6">
        {/* Hero Section with Slow Reveal */}
        <motion.section
          initial={{ opacity: 0, y: 36 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
          className="pt-24 pb-16 text-center md:pt-32 md:pb-24"
        >
          <span className="font-handwritten text-2xl text-[#8C827A] md:text-3xl">
            shuvo jonmodin
          </span>

          <h1 className="mt-2 font-qurov text-4xl leading-tight font-medium tracking-tight text-[#201D1B] md:text-6xl">
            Premi, 16 Bochorer Shuru
          </h1>

          <p className="mx-auto mt-4 max-w-[460px] text-base leading-relaxed text-[#57534E]">
            {premiStory.heroIntro} {premiStory.heroSub}
          </p>
        </motion.section>

        {/* Beloved Mochi the Cat in Grid Box Style */}
        <motion.div
          initial={{ opacity: 0, y: 36 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-10% 0px' }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <CatEasterEgg />
        </motion.div>

        {/* Paper Airplane Flying Easter Egg Section */}
        <motion.div
          initial={{ opacity: 0, y: 36 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-10% 0px' }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <PaperAirplaneSection />
        </motion.div>

        {/* Interactive Digital Keepsake / Scrapbook in Grid Box Style */}
        <motion.div
          initial={{ opacity: 0, y: 36 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-10% 0px' }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <DigitalScrapbookSection folios={premiStory.scrapbookFolios} />
        </motion.div>

        {/* 4 Reasons Premi is Special - Grid Box Style */}
        <motion.section
          initial={{ opacity: 0, y: 36 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-10% 0px' }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="my-20"
        >
          <div className="text-center">
            <span className="font-serif italic text-xs tracking-widest uppercase text-[#8C827A]">
              Keno Premi Eto Special
            </span>
            <h2 className="mt-1 font-qurov text-2xl font-medium text-[#201D1B] md:text-3xl">
              Choto Choto Karon
            </h2>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {premiStory.reasons.map((reason) => (
              <div
                key={reason.number}
                className="flex flex-col justify-between rounded-2xl border border-[#201D1B]/8 bg-white/80 p-6 shadow-xs transition-all hover:border-[#201D1B]/15"
              >
                <div>
                  <span className="font-mono text-xs text-[#B45309]">{reason.number}.</span>
                  <h3 className="mt-1 font-qurov text-lg font-medium text-[#201D1B]">
                    {reason.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#57534E]">
                    {reason.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Interactive 3D Birthday Cake Section - Strictly 1-Time Blow Out */}
        <motion.section
          id="cake"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-10% 0px' }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="my-24 border-t border-[#201D1B]/8 pt-16 md:my-32"
        >
          <div className="text-center">
            <span className="font-handwritten text-2xl text-[#8C827A]">
              16 ti candle
            </span>
            <h2 className="mt-1 font-qurov text-3xl font-medium text-[#201D1B] md:text-4xl">
              Candle gulo nibhiye wish koro
            </h2>
            <p className="mx-auto mt-2 max-w-[440px] text-sm text-[#78716C]">
              Nicher button-e click kore 16 ti candle nibhao ar Premi-r jonno wish unlock koro.
            </p>
          </div>

          <div className="mt-8">
            <ThreeBirthdayCake onAllBlown={handleCakeAllBlown} />
          </div>

          {/* Slow-Revealed Birthday Wish (Permanently Unlocked) */}
          {wishUnlocked && (
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
              className="mx-auto mt-14 max-w-[580px] rounded-2xl border border-[#201D1B]/10 bg-white p-8 text-center shadow-sm md:p-12"
            >
              <Sparkles className="mx-auto h-5 w-5 text-[#B45309]" />

              <h3 className="mt-4 font-qurov text-2xl font-medium text-[#201D1B] leading-relaxed md:text-3xl">
                {premiStory.birthdayWish.heading}
              </h3>

              <div className="mt-6 space-y-4 text-sm leading-relaxed text-[#4A4542] text-left sm:text-center">
                {premiStory.birthdayWish.paragraphs.map((p, idx) => (
                  <p key={idx}>{p}</p>
                ))}
              </div>

              <div className="mt-8 border-t border-[#201D1B]/8 pt-6">
                <p className="font-handwritten text-2xl text-[#201D1B]">
                  {premiStory.birthdayWish.author}
                </p>
              </div>
            </motion.div>
          )}
        </motion.section>
      </main>

      <footer className="border-t border-[#201D1B]/6 py-10 text-center">
        <p className="font-serif italic text-xs text-[#8C827A]">
          Premi · My Little Princess · 16th Birthday Storybook
        </p>
      </footer>
    </div>
  );
}
