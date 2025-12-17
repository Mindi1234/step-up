import { useHabitAppStore } from "@/app/store/habitAppStore/store";

export function useTodayProgress() {
    const realTodayHabits = useHabitAppStore(s => s.realTodayHabits);

    const total = realTodayHabits.length;
    const done = realTodayHabits.filter(h => h.isDone).length;
    const percent = total === 0 ? 0 : Math.round((done / total) * 100);

    return { total, done, percent };
}