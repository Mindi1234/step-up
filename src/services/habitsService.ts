import { IHabit } from "@/interfaces/IHabit";
import { ITodayHabit } from "@/interfaces/ITodayHabit";

export async function getUserHabits(): Promise<IHabit[]> {
    const res = await fetch(`/api/user-habits`, {
        method: "GET",
        credentials: "include",
    });
    return res.json();
}

// export async function getTodayHabits(date?: Date) {
//   const targetDate = date || new Date();
//   const dateString = targetDate.toISOString().split("T")[0];

//   const response = await fetch(
//     `/api/habits/today?date=${dateString}`,
//     {
//       method: "GET",
//       credentials: "include",
//     }
//   );

//   if (!response.ok) {
//     throw new Error("Failed to fetch habits for today");
//   }

//   const data = await response.json();
//   return data;
// }

export async function getTodayHabits(date?: Date, retries = 3) {
  const targetDate = date || new Date();
  const dateString = targetDate.toISOString().split("T")[0];

  for (let i = 0; i < retries; i++) {
    try {
      const response = await fetch(
        `/api/habits/today?date=${dateString}`,
        {
          method: "GET",
          credentials: "include",
          signal: AbortSignal.timeout(10000),
        }
      );

      if (!response.ok) {
        if (i < retries - 1 && response.status === 500) {
          console.log(`Retry ${i + 1}/${retries} for getTodayHabits`);
          await new Promise(resolve => setTimeout(resolve, 1000 * (i + 1))); 
          continue;
        }
        throw new Error("Failed to fetch habits for today");
      }

      const data = await response.json();
      return data;
      
    } catch (error) {
      console.error(`Attempt ${i + 1} failed:`, error);
      if (i === retries - 1) {
        throw error;
      }
      await new Promise(resolve => setTimeout(resolve, 1000 * (i + 1)));
    }
  }
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
