"use client";

import { useMemo } from "react";
import type { CourseItem } from "@/app/actions/getCourse";

interface CategoryFilterProps {
  courses: CourseItem[];
  selectedCategories: string[];
  onCategoriesChange: (categories: string[]) => void;
}

/**
 * Composant pour filtrer les aliments par catégorie
 * Permet de sélectionner/désélectionner plusieurs catégories
 */
export const CategoryFilter = ({
  courses,
  selectedCategories,
  onCategoriesChange,
}: CategoryFilterProps) => {
  // Récupère toutes les catégories uniques depuis les courses
  const availableCategories = useMemo(() => {
    const categories = new Set<string>();
    courses.forEach((course) => {
      if (course.categorie) {
        categories.add(course.categorie);
      }
    });
    return Array.from(categories).sort();
  }, [courses]);

  const toggleCategory = (category: string) => {
    if (selectedCategories.includes(category)) {
      onCategoriesChange(selectedCategories.filter((c) => c !== category));
    } else {
      onCategoriesChange([...selectedCategories, category]);
    }
  };

  const selectAll = () => {
    onCategoriesChange(availableCategories);
  };

  const deselectAll = () => {
    onCategoriesChange([]);
  };

  if (availableCategories.length === 0) {
    return (
      <div className="text-sm text-gray-500 p-2">
        Aucune catégorie disponible
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-gray-700">
          Filtrer par catégorie
        </h3>
        <div className="flex gap-2">
          <button
            onClick={selectAll}
            className="text-xs bg-gray-600 hover:bg-gray-800 p-2 rounded-xl"
          >
            Tout sélectionner
          </button>
          <button
            onClick={deselectAll}
            className="text-xs bg-gray-600 hover:bg-gray-800 p-2 rounded-xl"
          >
            Tout désélectionner
          </button>
        </div>
      </div>
      <div className="flex flex-wrap gap-2">
        {availableCategories.map((category) => {
          const isSelected = selectedCategories.includes(category);
          const majForCategory =
            category.charAt(0).toUpperCase() + category.slice(1);
          const displayCategory = category.includes("_")
            ? majForCategory.replaceAll("_", " ")
            : majForCategory;
          return (
            <button
              key={category}
              onClick={() => toggleCategory(category)}
              className={`px-3 py-1.5 text-sm font-medium rounded-full transition-colors ${
                isSelected
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              {displayCategory}
            </button>
          );
        })}
      </div>
      {selectedCategories.length > 0 && (
        <p className="text-xs text-gray-500">
          {selectedCategories.length} catégorie(s) sélectionnée(s)
        </p>
      )}
    </div>
  );
};
