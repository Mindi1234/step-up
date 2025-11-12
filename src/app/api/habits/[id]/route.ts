import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/DB";
import Habit from "@/models/Habit";
import mongoose from "mongoose";

export async function GET(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  await dbConnect();
  const { id } = await context.params;
  
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return NextResponse.json({ message: "Invalid ID format" }, { status: 400 });
  }

  const habit = await Habit.findById(id).populate("userId").populate("categoryId");
  
  if (!habit) {
    return NextResponse.json({ message: "Habit not found" }, { status: 404 });
  }

  return NextResponse.json(habit);
}

export async function PUT(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  await dbConnect();
  const { id } = await context.params;
  const body = await request.json();

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return NextResponse.json({ message: "Invalid ID format" }, { status: 400 });
  }

  const updatedHabit = await Habit.findByIdAndUpdate(id, body, { new: true });
  
  if (!updatedHabit) {
    return NextResponse.json({ message: "Habit not found" }, { status: 404 });
  }

  return NextResponse.json(updatedHabit);
}

export async function DELETE(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  await dbConnect();
  const { id } = await context.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return NextResponse.json({ message: "Invalid ID format" }, { status: 400 });
  }

  const deletedHabit = await Habit.findByIdAndDelete(id);
  
  if (!deletedHabit) {
    return NextResponse.json({ message: "Habit not found" }, { status: 404 });
  }

  return NextResponse.json({ message: "Habit deleted successfully", habit: deletedHabit });
}