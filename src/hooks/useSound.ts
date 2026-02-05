import { useCallback, useRef, useEffect } from 'react';
import { Howl } from 'howler';
import { getItem, setItem, STORAGE_KEYS } from '../lib/storage';

type SoundName =
  | 'timerTick'
  | 'monsterAppear'
  | 'monsterDefeat'
  | 'victory'
  | 'gentleBuzz'
  | 'wheelSpin'
  | 'wheelStop'
  | 'bingoStamp'
  | 'bingoFanfare'
  | 'xpGain'
  | 'badgeUnlock'
  | 'buttonClick';

const SOUND_FILES: Record<SoundName, string> = {
  timerTick: '/sounds/timer-tick.mp3',
  monsterAppear: '/sounds/monster-appear.mp3',
  monsterDefeat: '/sounds/monster-defeat.mp3',
  victory: '/sounds/victory.mp3',
  gentleBuzz: '/sounds/gentle-buzz.mp3',
  wheelSpin: '/sounds/wheel-spin.mp3',
  wheelStop: '/sounds/wheel-stop.mp3',
  bingoStamp: '/sounds/bingo-stamp.mp3',
  bingoFanfare: '/sounds/bingo-fanfare.mp3',
  xpGain: '/sounds/xp-gain.mp3',
  badgeUnlock: '/sounds/badge-unlock.mp3',
  buttonClick: '/sounds/button-click.mp3',
};

export function useSound() {
  const soundsRef = useRef<Map<SoundName, Howl>>(new Map());
  const enabledRef = useRef(getItem<boolean>(STORAGE_KEYS.soundEnabled, true));

  useEffect(() => {
    // Lazy-load sounds on first interaction
    const loadSounds = () => {
      if (soundsRef.current.size > 0) return;
      for (const [name, src] of Object.entries(SOUND_FILES)) {
        soundsRef.current.set(name as SoundName, new Howl({
          src: [src],
          preload: true,
          volume: 0.5,
        }));
      }
      document.removeEventListener('click', loadSounds);
      document.removeEventListener('touchstart', loadSounds);
    };
    document.addEventListener('click', loadSounds, { once: true });
    document.addEventListener('touchstart', loadSounds, { once: true });

    return () => {
      document.removeEventListener('click', loadSounds);
      document.removeEventListener('touchstart', loadSounds);
      soundsRef.current.forEach(h => h.unload());
      soundsRef.current.clear();
    };
  }, []);

  const play = useCallback((name: SoundName) => {
    if (!enabledRef.current) return;
    const howl = soundsRef.current.get(name);
    if (howl) {
      howl.play();
    }
  }, []);

  const toggleMute = useCallback(() => {
    enabledRef.current = !enabledRef.current;
    setItem(STORAGE_KEYS.soundEnabled, enabledRef.current);
    return enabledRef.current;
  }, []);

  const isEnabled = useCallback(() => enabledRef.current, []);

  return { play, toggleMute, isEnabled };
}
