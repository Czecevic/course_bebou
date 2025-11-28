"use client";
import { useMemo, useState } from "react";
import type { CourseItem } from "@/app/actions/getCourse";
import { CourseCard } from "./Course/CourseCard";
import { SortButtons } from "./Course/SortButtons";
import { sortCourses } from "./Course/utils";
import { useCourseState } from "./Course/useCourseState";
import { CategoryFilter } from "./Course/CategoryFilter";
import { CategoryGroup } from "./Course/CategoryGroup";
import Link from "next/link";

interface CourseProps {
  allCourses: CourseItem[];
}

type ViewMode = "grid" | "grouped";

export const Course = ({ allCourses }: CourseProps) => {
  const [sortType, setSortType] = useState<"name" | "status" | "none">("none");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const { checkedMap, isPending, handleToggle } = useCourseState(allCourses);

  // Filtrer les courses par catégories sélectionnées
  const filteredCourses = useMemo(() => {
    if (selectedCategories.length === 0) {
      return allCourses;
    }
    return allCourses.filter(
      (course) =>
        course.categorie && selectedCategories.includes(course.categorie)
    );
  }, [allCourses, selectedCategories]);

  // Trier les courses filtrées
  const sortedCourses = useMemo(
    () => sortCourses(filteredCourses, sortType, checkedMap),
    [filteredCourses, sortType, checkedMap]
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
        <div className="flex items-center gap-3 flex-wrap">
          {isPending && (
            <span className="text-sm text-gray-500 animate-pulse">
              Synchronisation...
            </span>
          )}
          <Link
            href="/create-aliment"
            className="bg-gray-500 text-white px-4 py-2 rounded-md cursor-pointer hover:bg-gray-600 transition-colors font-medium text-sm"
          >
            Ajouter un aliment
          </Link>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setViewMode("grid")}
              className={`px-3 py-1.5 text-sm font-medium rounded transition-colors ${
                viewMode === "grid"
                  ? "bg-gray-800 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              Liste
            </button>
            <button
              onClick={() => setViewMode("grouped")}
              className={`px-3 py-1.5 text-sm font-medium rounded transition-colors ${
                viewMode === "grouped"
                  ? "bg-gray-800 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              Par catégorie
            </button>
          </div>
          <SortButtons sortType={sortType} onSortChange={setSortType} />
        </div>
      </header>

      {/* Filtre de catégories */}
      <div className="mb-6 bg-white rounded-lg shadow-md p-4">
        <CategoryFilter
          courses={allCourses}
          selectedCategories={selectedCategories}
          onCategoriesChange={setSelectedCategories}
        />
      </div>

      {/* Affichage des courses */}
      {viewMode === "grouped" ? (
        <CategoryGroup
          courses={sortedCourses}
          checkedMap={checkedMap}
          isPending={isPending}
          onToggle={handleToggle}
        />
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {sortedCourses.length > 0 ? (
            sortedCourses.map((course) => (
              <CourseCard
                key={course.id}
                course={course}
                isChecked={checkedMap.get(course.id) ?? false}
                isPending={isPending}
                onToggle={handleToggle}
              />
            ))
          ) : (
            <div className="col-span-full text-center text-gray-500 py-8">
              {selectedCategories.length > 0
                ? "Aucun aliment trouvé pour les catégories sélectionnées"
                : "Aucun aliment trouvé"}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
