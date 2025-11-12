"use client";

import { useState, useEffect } from "react";
import HabitForm from "../HabitForm/HabitForm";
export interface ICategoryFront {
  _id: string;
  name: string;
  image?: string;
  colorTheme?: string;
}

export default function NewHabit() {
  const [categories, setCategories] = useState<ICategoryFront[]>([]);
  const [isOpen, setIsOpen] = useState(false); 

  useEffect(() => {
    // ================================
    // MOCK לטסטים – אפשר למחוק אחר כך
    const mockCategories: ICategoryFront[] = [
      { _id: "1", name: "Health", image: "", colorTheme: "#bcdbdf" },
      { _id: "2", name: "Study", image: "", colorTheme: "#183c5c" },
      { _id: "3", name: "Hobby", image: "", colorTheme: "#99c8ce" },
    ];

    const fetchCategoriesMock = () => {
      return new Promise<ICategoryFront[]>((resolve) => {
        setTimeout(() => resolve(mockCategories), 500);
      });
    };

    fetchCategoriesMock().then((data) => setCategories(data));
    // ================================

    // כאן יהיה ה-fetch האמיתי בעתיד
    // fetch("/api/categories")
    //   .then(res => res.json())
    //   .then(data => setCategories(data));

  }, []);

  const handleAddHabit = (data: any) => {
    console.log("Adding habit:", data);
    alert("Habit added! Check console for details."); 
    setIsOpen(false); 
  };

  const handleCancel = () => {
    setIsOpen(false); 
  };

  return (
    <div>
      <button
        className="btn-primary p-2 rounded"
        onClick={() => setIsOpen(true)}
      >
        + Add Habit
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-md w-full max-w-md relative">
            <HabitForm
              categories={categories}
              onSubmit={handleAddHabit}
              onCancel={handleCancel}
            />
          </div>
        </div>
      )}
    </div>
  );
}
