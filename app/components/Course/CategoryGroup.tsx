"use client";

import type { CourseItem } from "@/app/actions/getCourse";
import { CourseCard } from "./CourseCard";
import { useMemo } from "react";

interface CategoryGroupProps {
  courses: CourseItem[];
  checkedMap: Map<number, boolean>;
  isPending: boolean;
  onToggle: (courseId: number) => void;
}

/**
 * Composant qui groupe les aliments par catégorie
 * Affiche chaque catégorie avec ses aliments
 */
export const CategoryGroup = ({
  courses,
  checkedMap,
  isPending,
  onToggle,
}: CategoryGroupProps) => {
  // Groupe les courses par catégorie
  const groupedByCategory = useMemo(() => {
    const groups: Record<string, CourseItem[]> = {};
    const uncategorized: CourseItem[] = [];

    courses.forEach((course) => {
      if (course.categorie) {
        if (!groups[course.categorie]) {
          groups[course.categorie] = [];
        }
        groups[course.categorie].push(course);
      } else {
        uncategorized.push(course);
      }
    });

    // Trier les catégories par ordre alphabétique
    const sortedCategories = Object.keys(groups).sort();

    return { groups, sortedCategories, uncategorized };
  }, [courses]);

  return (
    <div className="space-y-6">
      {/* Afficher les catégories */}
      {groupedByCategory.sortedCategories.map((category) => (
        <div key={category} className="space-y-3">
          <h3 className="text-xl font-bold text-white uppercase border-b-2 border-gray-300 pb-2">
            {category} ({groupedByCategory.groups[category].length})
          </h3>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {groupedByCategory.groups[category].map((course) => (
              <CourseCard
                key={course.id}
                course={course}
                isChecked={checkedMap.get(course.id) ?? false}
                isPending={isPending}
                onToggle={onToggle}
              />
            ))}
          </div>
        </div>
      ))}

      {/* Afficher les aliments sans catégorie */}
      {groupedByCategory.uncategorized.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-xl font-bold text-gray-800 border-b-2 border-gray-300 pb-2">
            Sans catégorie ({groupedByCategory.uncategorized.length})
          </h3>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {groupedByCategory.uncategorized.map((course) => (
              <CourseCard
                key={course.id}
                course={course}
                isChecked={checkedMap.get(course.id) ?? false}
                isPending={isPending}
                onToggle={onToggle}
              />
            ))}
          </div>
        </div>
      )}

      {courses.length === 0 && (
        <div className="text-center text-gray-500 py-8">
          Aucun aliment trouvé
        </div>
      )}
    </div>
  );
};

