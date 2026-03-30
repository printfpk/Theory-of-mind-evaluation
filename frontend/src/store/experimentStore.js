import { create } from "zustand";
import { fetchEvaluations, runEvaluation } from "../services/api";

export const useExperimentStore = create((set, get) => ({
  experiments: [],
  isLoading: false,
  error: null,
  
  setExperiments: (data) => set({ experiments: data }),

  loadExperiments: async () => {
    set({ isLoading: true, error: null });
    try {
      const data = await fetchEvaluations();
      set({ experiments: data, isLoading: false });
    } catch (error) {
      set({ error: error.message, isLoading: false });
    }
  },

  executeExperiment: async (payload) => {
    set({ isLoading: true, error: null });
    try {
      const newExp = await runEvaluation(payload);
      set((state) => ({ 
        experiments: [newExp, ...state.experiments],
        isLoading: false 
      }));
      return newExp;
    } catch (error) {
      set({ error: error.message, isLoading: false });
      throw error;
    }
  }
}));