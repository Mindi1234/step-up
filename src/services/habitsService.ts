import { IHabit } from "@/interfaces/IHabit";
import { ITodayHabit } from "@/interfaces/ITodayHabit";

export async function getUserHabits(): Promise<IHabit[]> {
    const res = await fetch(`/api/user-habits`, {
        method: "GET",
        credentials: "include",
    });
    return res.json();
}

export async function getTodayHabits(date?: Date) {
  const targetDate = date || new Date();
  const dateString = targetDate.toISOString().split("T")[0];

  const response = await fetch(
    `/api/habits/today?date=${dateString}`,
    {
      method: "GET",
      credentials: "include",
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch habits for today");
  }

  const data = await response.json();
  return data;
}

export async function updateHabitStatus(habitId: string, date?: Date) {
  const targetDate = date || new Date();

  const dateString = targetDate.toISOString().split("T")[0];

  const response = await fetch(`/api/habits/${habitId}/toggle`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ date: dateString }),
  });

  if (!response.ok) {
    throw new Error("Failed to update habit status");
  }

  const data = await response.json();
  return data.habit;
}
