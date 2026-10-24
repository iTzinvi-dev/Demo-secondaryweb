class SoundEngine {
  private ctx: AudioContext | null = null;

  private getContext(): AudioContext | null {
    if (typeof window === 'undefined') return null;
    if (!this.ctx) {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
    return this.ctx;
  }

  public playChimeNote(frequency = 587.33, duration = 0.8): void {
    const ctx = this.getContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(frequency, now);

    gain.gain.setValueAtTime(0.001, now);
    gain.gain.exponentialRampToValueAtTime(0.07, now + 0.03);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + duration);
  }

  public playCatMeow(): void {
    const ctx = this.getContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(520, now);
    osc.frequency.exponentialRampToValueAtTime(780, now + 0.14);
    osc.frequency.exponentialRampToValueAtTime(460, now + 0.38);

    gain.gain.setValueAtTime(0.001, now);
    gain.gain.exponentialRampToValueAtTime(0.08, now + 0.05);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.42);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.44);
  }

  public playPaperRustle(): void {
    this.playChimeNote(659.25, 0.5);
    setTimeout(() => this.playChimeNote(783.99, 0.65), 100);
  }

  public playLavenderBloom(): void {
    const notes = [587.33, 739.99, 880];
    notes.forEach((freq, idx) => {
      setTimeout(() => this.playChimeNote(freq, 0.7), idx * 90);
    });
  }

  public playCandleExtinguish(index: number): void {
    const scale = [523.25, 587.33, 659.25, 783.99, 1046.5];
    this.playChimeNote(scale[index % scale.length], 0.75);
  }

  public playCelebrationChord(): void {
    const notes = [523.25, 659.25, 783.99, 987.77, 1046.5];
    notes.forEach((freq, idx) => {
      setTimeout(() => this.playChimeNote(freq, 1.3), idx * 110);
    });
  }
}

export const soundEngine = new SoundEngine();
