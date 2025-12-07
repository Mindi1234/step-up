import { IHabit } from "@/interfaces/IHabit";
import { ArrowLeft } from "lucide-react";
import HabitItem from "@/app/components/Settings/HabitItem/HabitItem";
import { ICategory } from "@/interfaces/ICategory"; 

interface HabitsListDisplayProps {
    category: ICategory;
    habitsInCategory: IHabit[];
    openMenuId: string | null;
    onToggleMenu: (habitId: string) => void;
    onCloseMenu: () => void;
    onEdit: (habit: IHabit) => void;
    onDelete: (habitId: string) => void;
    onGoBack: () => void;
}

export default function HabitsListDisplay({
    category,
    habitsInCategory,
    openMenuId,
    onToggleMenu,
    onCloseMenu,
    onEdit,
    onDelete,
    onGoBack
}: HabitsListDisplayProps) {
    return (
        <>
            <button
                onClick={onGoBack}
                style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    marginBottom: '16px',
                    color: '#6b7280',
                    fontSize: '14px'
                }}
            >
                <ArrowLeft size={16} />
                Back
            </button>

            <h1 style={{ fontSize: "1.6rem", marginBottom: "8px" }}>
                {category.name}
            </h1>

            <p style={{ color: "#6b7280", marginBottom: "20px" }}>
                Habits in this category
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                {habitsInCategory.map((habit) => (
                    <HabitItem
                        key={String(habit!._id)}
                        habit={habit}
                        isMenuOpen={openMenuId === String(habit._id)}
                        onToggleMenu={() => onToggleMenu(String(habit._id))}
                        onCloseMenu={onCloseMenu}
                        onEdit={() => onEdit(habit)}
                        onDelete={() => onDelete(String(habit._id))}
                    />
                ))}
            </div>

            {habitsInCategory.length === 0 && (
                <p style={{ marginTop: "20px", color: "#9ca3af" }}>
                    No habits in this category yet.
                </p>
            )}
        </>
    );
}