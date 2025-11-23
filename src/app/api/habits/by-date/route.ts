import { dbConnect } from "@/lib/DB";
import { authenticate } from "@/lib/server/authMiddleware";
import Habit from "@/models/Habit";
import HabitLog from "@/models/HabitLog";
import { endOfDayUTC, startOfDayUTC } from "@/utils/date";
import { NextResponse } from "next/server";


export async function GET(req: Request) {
    try {
        await dbConnect();

        const user = await authenticate(req);
        const userId = user._id;

        const { searchParams } = new URL(req.url);
        const dateParam = searchParams.get("date");
        if (!dateParam) {
            return NextResponse.json({ message: "date is required" }, { status: 400 });
        }

        const date = new Date(dateParam);
        const weekday = date.getUTCDay();
        const start = startOfDayUTC(date);
        const end = endOfDayUTC(date);

        const habits = await Habit.find({ userId });

        const result = [];

        for (const habit of habits) {
            const shouldRunToday = habit.days?.[weekday] ?? false;
            if (!shouldRunToday) continue;

            let log = await HabitLog.findOne({
                habitId: habit._id,
                date: { $gte: start, $lte: end },
            });

            if (!log) {
                log = await HabitLog.create({
                    habitId: habit._id,
                    userId,
                    date: start,
                    isDone: false,
                });
            }
            result.push({
                habitId: habit._id,
                name: habit.name,
                categoryId: habit.categoryId,
                reminderTime: habit.reminderTime,
                description: habit.description,
                logId: log._id,
                isDone: log.isDone,
                date: log.date,
            });
        }
        return NextResponse.json(result);


    } catch (error) {
        console.error("GET /api/habits/by-date error:", error);
        return NextResponse.json({ message: "server error" }, { status: 500 });
    }

} 