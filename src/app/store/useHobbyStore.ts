import { create } from "zustand";
import { IHabit } from "@/interfaces/IHabit";

interface HabitStore {
  habits: IHabit[];
  loading: boolean;
  error: string | null;

  fetchHabits: (userId: string) => Promise<void>;
  addHabit: (habit: IHabit) => Promise<void>;
  updateHabit: (habitId: string, updatedData: Partial<IHabit>) => Promise<void>;
  deleteHabit: (habitId: string) => Promise<void>;
}

export const useHabitStore = create<HabitStore>((set) => ({
  habits: [],
  loading: false,
  error: null,

  fetchHabits: async (userId: string) => {
    set({ loading: true, error: null });

    try {
      const res = await fetch(`/api/habits?userId=${userId}`, {
        credentials: "include",
      });
      if (!res.ok) throw new Error("Failed to load habits");

      const data = await res.json();
      set({ habits: data, loading: false });
    } catch (err: any) {
      set({ error: err.message, loading: false });
    }
  },

  addHabit: async (habit: IHabit) => {
    set({ loading: true, error: null });

    try {
      const res = await fetch("/api/habits", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(habit),
      });

      if (!res.ok) throw new Error("Failed to add habit");

      const newHabit = await res.json();

      set((state) => ({
        habits: [...state.habits, newHabit],
        loading: false,
      }));
    } catch (err: any) {
      set({ error: err.message, loading: false });
    }
  },

  updateHabit: async (habitId: string, updatedData: Partial<IHabit>) => {
    set({ loading: true, error: null });

    try {
      const res = await fetch(`/api/habits/${habitId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(updatedData),
      });

      if (!res.ok) throw new Error("Failed to update habit");

      const updatedHabit = await res.json();

      set((state) => ({
        habits: state.habits.map((h) =>
          h._id === habitId ? updatedHabit : h
        ),
        loading: false,
      }));
    } catch (err: any) {
      set({ error: err.message, loading: false });
    }
  },

  deleteHabit: async (habitId: string) => {
    set({ loading: true, error: null });

    try {
      const res = await fetch(`/api/habits/${habitId}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (!res.ok) throw new Error("Failed to delete habit");

      set((state) => ({
        habits: state.habits.filter((h) => h._id !== habitId),
        loading: false,
      }));
    } catch (err: any) {
      set({ error: err.message, loading: false });
    }
  },
}));
