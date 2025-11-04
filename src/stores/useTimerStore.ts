import { create } from 'zustand';

export const useTimerStore = create<{
  timeLeft: number;
  timerActive: boolean;
  startTimer: (seconds: number) => void;
  stopTimer: () => void;
  tick: () => void;
  resetTimer: () => void;
}>((set, get) => ({
  // put logic here
  timeLeft: 0,
  timerActive: false,
  startTimer: (seconds) => {
    /* put logic here */
  },
  stopTimer: () => {
    /* put logic here */
  },
  tick: () => {
    /* put logic here */
  },
  resetTimer: () => {
    /* put logic here */
  },
}));
