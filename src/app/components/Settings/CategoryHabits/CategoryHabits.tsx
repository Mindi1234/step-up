"use client";

import { useEffect, useState } from "react";
import { toUrlName } from "@/app/components/Settings/CategoryItem/CategoryItem";
import { useCategoriesStore } from "@/app/store/useCategoriesStore";
import { useHabitAppStore } from "@/app/store/habitAppStore/store"; // ← הסטור המאוחד!
import { useRouter } from "next/navigation";
import Loader from "@/app/components/Loader/Loader";
import { IHabit } from "@/interfaces/IHabit";
import HabitForm from "@/app/components/Habit/AddHabit/HabitForm/HabitForm";
import HabitsListDisplay from "../HabitsListDisplay/HabitsListDisplay";

interface CategoryHabitsProps {
    routeName: string;
}

export default function CategoryHabits({ routeName }: CategoryHabitsProps) {
    const router = useRouter();
    const [editingHabit, setEditingHabit] = useState<IHabit | null>(null);
    const [openMenuId, setOpenMenuId] = useState<string | null>(null);

    const { categories, fetchCategories, loading: catLoading } = useCategoriesStore();

    const habits = useHabitAppStore((s) => s.habits);
    const loadingHabits = useHabitAppStore((s) => s.loadingHabits);
    const fetchHabits = useHabitAppStore((s) => s.fetchHabits);
    const deleteHabit = useHabitAppStore((s) => s.deleteHabit);
    const updateHabit = useHabitAppStore((s) => s.updateHabit);

    useEffect(() => {
        fetchCategories();
        fetchHabits();
    }, []);

    if (catLoading || loadingHabits) {
        return <Loader />;
    }

    const category = categories.find(
        (c) => toUrlName(c.name) === routeName
    );

    if (!category) {
        return <div style={{ padding: 20 }}>⚠ Category not found</div>;
    }

    const habitsInCategory = habits.filter(
        (h) => String(h.categoryId) === String(category._id)
    );

    // 🟦 פתיחת טופס עריכה
    const handleEdit = (habit: IHabit) => {
        setEditingHabit(habit);
        setOpenMenuId(null);
    };

    // 🟦 עדכון הרגל
    const handleUpdateHabit = async (data: any) => {
        if (!editingHabit?._id) return;

        await updateHabit(editingHabit.id, {
            name: data.name,
            description: data.description,
            categoryId: data.categoryId,
            reminderTime: data.reminderTime,
            days: data.days,
        });

        // ❌ לא צריך fetchHabits (סטור מאוחד עושה את זה)
        setEditingHabit(null);
    };

    // 🟦 מחיקת הרגל
    const handleDelete = async (habitId: string) => {
        if (confirm("Are you sure you want to delete this habit?")) {
            await deleteHabit(habitId);
            // ❌ לא צריך fetchHabits יותר
        }
    };

    const toggleMenu = (habitId: string) => {
        setOpenMenuId(openMenuId === habitId ? null : habitId);
    };

    const closeMenu = () => {
        setOpenMenuId(null);
    };

    return (
        <div style={{ padding: "16px" }}>
            <HabitsListDisplay
                category={category}
                habitsInCategory={habitsInCategory}
                openMenuId={openMenuId}
                onToggleMenu={toggleMenu}
                onCloseMenu={closeMenu}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onGoBack={() => router.push('/settings')}
            />

            {editingHabit && (
                <HabitForm
                    categories={categories}
                    onSubmit={handleUpdateHabit}
                    onCancel={() => setEditingHabit(null)}
                    initialData={{
                        name: editingHabit.name,
                        description: editingHabit.description || "",
                        categoryId: String(editingHabit.categoryId),
                        reminderTime: editingHabit.reminderTime,
                        days: editingHabit.days || [false, false, false, false, false, false, false]
                    }}
                />
            )}
        </div>
    );
}
