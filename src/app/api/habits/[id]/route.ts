import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/DB";
import Habit from "@/models/Habit";
import { habitSchema } from "@/lib/validation/habitValidation";
import { parse } from "path";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  await dbConnect();
  const { id } = params;
  console.log("Fetching habit with id:", id);

  const habit = await Habit.findById(id).populate("userId").populate("categoryId");
  if (!habit) return NextResponse.json({ message: "Habit not found" }, { status: 404 });

  return NextResponse.json(habit);
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  await dbConnect();
  const { id } = params;
  const body = await request.json();

  const parsed = habitSchema.safeParse(body);
  if (!parsed.success) {
    const errors = parsed.error.issues.map(issue => ({
      field: issue.path.join("."), 
      message: issue.message,
    }));

    return NextResponse.json(
      { message: "Validation failed", errors },
      { status: 400 }
    );
  }

  const updatedHabit = await Habit.findByIdAndUpdate(id, parsed.data, { new: true });
  if (!updatedHabit)
    return NextResponse.json({ message: "Habit not found" }, { status: 404 });

  return NextResponse.json(updatedHabit);
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  await dbConnect();
  const { id } = params;

  const deletedHabit = await Habit.findByIdAndDelete(id);
  if (!deletedHabit) return NextResponse.json({ message: "Habit not found" }, { status: 404 });

  return NextResponse.json({ message: "Habit deleted successfully", habit: deletedHabit });
}
