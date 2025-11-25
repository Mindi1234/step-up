
import { ITodayHabit } from "@/interfaces/ITodayHabit";

export const hexToRgba = (hex: string, alpha: number): string => {
  const c = hex.replace("#", "");
  const r = parseInt(c.substring(0, 2), 16);
  const g = parseInt(c.substring(2, 4), 16);
  const b = parseInt(c.substring(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

export const getCategoryStyle = (habit: ITodayHabit) => {
  const originalColor = habit.category?.colorTheme || "#f3f4f6";
  const pastelColor = hexToRgba(originalColor, 0.45);

  return {
    backgroundColor: pastelColor,
  };
};



