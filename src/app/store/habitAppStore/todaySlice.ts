import { StateCreator } from "zustand";
import { HabitAppSlice, TodaySlice } from "./types";

import { getHabitsByDate } from "@/services/client/habitsService";
import { updateHabitStatus } from "@/services/client/habitLogService";

export const createTodaySlice: StateCreator<
  HabitAppSlice,
  [],
  [],
  TodaySlice
> = (set, get) => ({
  todayHabits: [],
  realTodayHabits: [],
  loadingToday: false,

  fetchTodayHabits: async (date) => {
    set({ loadingToday: true });

    const data = await getHabitsByDate(date);
    set({
      todayHabits: data || [],
      loadingToday: false,
    });
  },
  fetchRealTodayHabits: async () => {
    const today = new Date().toISOString().split("T")[0];
    const data = await getHabitsByDate(today);

    set({ realTodayHabits: data || [] })
  },
  toggleTodayStatus: async (logId) => {
    const prevHabitsBeforeUpdate = get().todayHabits;
    const prevRealTodayHabits = get().realTodayHabits;

    const updatedTodayHabits = prevHabitsBeforeUpdate.map(h =>
      h.logId === logId ? { ...h, isDone: !h.isDone } : h
    );

    const updatedRealTodayHabits = prevRealTodayHabits.map(h =>
      h.logId === logId ? { ...h, isDone: !h.isDone } : h
    );

    set({
      todayHabits: updatedTodayHabits,
      realTodayHabits: updatedRealTodayHabits,
    });

    try {
      await updateHabitStatus(logId);
    } catch (error) {
      set({
        todayHabits: prevHabitsBeforeUpdate,
        realTodayHabits: prevRealTodayHabits,
      }); console.error("Failed to update habit status", error);
    }
  },
});
