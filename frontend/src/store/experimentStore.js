import { create } from "zustand";

export const useExperimentStore = create((set) => ({
  experiments: [],
  setExperiments: (data) => set({ experiments: data }),
}));