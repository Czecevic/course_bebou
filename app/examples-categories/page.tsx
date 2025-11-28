"use client";

import { useState, useMemo } from "react";
import type { CourseItem } from "@/app/actions/getCourse";
import { CategoryFilter } from "@/app/components/Course/CategoryFilter";
import { CategoryGroup } from "@/app/components/Course/CategoryGroup";
import { useCourseState } from "@/app/components/Course/useCourseState";
import { sortCourses } from "@/app/components/Course/utils";

interface ExamplePageProps {
  allCourses: CourseItem[];
}
export default function ExampleCategoriesPage({ allCourses }: ExamplePageProps) {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [viewMode, setViewMode] = useState<"grouped" | "filtered">("grouped");
  const [sortType, setSortType] = useState<"name" | "status" | "none">("none");
  
  const { checkedMap, isPending, handleToggle } = useCourseState(allCourses);

  // Filtrer les courses par catégories sélectionnées
  const filteredCourses = useMemo(() => {
    if (selectedCategories.length === 0) {
      return allCourses;
    }
    return allCourses.filter((course) => 
      course.categorie && selectedCategories.includes(course.categorie)
    );
  }, [allCourses, selectedCategories]);

  // Trier les courses filtrées
  const sortedCourses = useMemo(
    () => sortCourses(filteredCourses, sortType, checkedMap),
    [filteredCourses, sortType, checkedMap]
  );

  // Calculer les statistiques
  const stats = useMemo(() => {
    const categoryCount: Record<string, number> = {};
    let total = 0;
    let checked = 0;

    allCourses.forEach((course) => {
      total++;
      if (course.checked) checked++;
      if (course.categorie) {
        categoryCount[course.categorie] = (categoryCount[course.categorie] || 0) + 1;
      }
    });

    return { categoryCount, total, checked };
  }, [allCourses]);

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">
          Exemples de manipulation des catégories
        </h1>
        <p className="text-gray-600">
          Cette page démontre différentes façons de manipuler les catégories d'aliments
        </p>
      </header>

      {/* Statistiques */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Statistiques</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="text-sm text-gray-600">Total d'aliments</p>
            <p className="text-2xl font-bold text-blue-600">{stats.total}</p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <p className="text-sm text-gray-600">Aliments cochés</p>
            <p className="text-2xl font-bold text-green-600">{stats.checked}</p>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg">
            <p className="text-sm text-gray-600">Catégories</p>
            <p className="text-2xl font-bold text-purple-600">
              {Object.keys(stats.categoryCount).length}
            </p>
          </div>
        </div>
        <div className="mt-4">
          <h3 className="text-sm font-semibold mb-2">Répartition par catégorie :</h3>
          <div className="flex flex-wrap gap-2">
            {Object.entries(stats.categoryCount).map(([category, count]) => (
              <span
                key={category}
                className="px-3 py-1 bg-gray-100 rounded-full text-sm"
              >
                {category}: {count}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Contrôles */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6 space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex gap-2">
            <button
              onClick={() => setViewMode("grouped")}
              className={`px-4 py-2 rounded-md font-medium transition-colors ${
                viewMode === "grouped"
                  ? "bg-gray-800 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              Vue groupée
            </button>
            <button
              onClick={() => setViewMode("filtered")}
              className={`px-4 py-2 rounded-md font-medium transition-colors ${
                viewMode === "filtered"
                  ? "bg-gray-800 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              Vue filtrée
            </button>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setSortType("none")}
              className={`px-3 py-1.5 text-sm rounded-md ${
                sortType === "none"
                  ? "bg-gray-800 text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
            >
              Aucun tri
            </button>
            <button
              onClick={() => setSortType("name")}
              className={`px-3 py-1.5 text-sm rounded-md ${
                sortType === "name"
                  ? "bg-gray-800 text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
            >
              Par nom
            </button>
            <button
              onClick={() => setSortType("status")}
              className={`px-3 py-1.5 text-sm rounded-md ${
                sortType === "status"
                  ? "bg-gray-800 text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
            >
              Par statut
            </button>
          </div>
        </div>

        {/* Filtre de catégories */}
        {viewMode === "filtered" && (
          <CategoryFilter
            courses={allCourses}
            selectedCategories={selectedCategories}
            onCategoriesChange={setSelectedCategories}
          />
        )}
      </div>

      {/* Affichage des courses */}
      <div className="bg-white rounded-lg shadow-md p-6">
        {isPending && (
          <div className="mb-4 text-sm text-gray-500 animate-pulse">
            Synchronisation en cours...
          </div>
        )}
        
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
                <div
                  key={course.id}
                  className={`p-4 rounded-lg border-2 ${
                    checkedMap.get(course.id)
                      ? "bg-green-50 border-green-300"
                      : "bg-white border-gray-200"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-800">
                        {course.aliment || "Sans nom"}
                      </h3>
                      <p className="text-sm text-gray-500 mt-1">
                        {course.categorie || "Sans catégorie"}
                      </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer ml-4">
                      <input
                        type="checkbox"
                        checked={checkedMap.get(course.id) ?? false}
                        onChange={() => handleToggle(course.id)}
                        disabled={isPending}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500 peer-disabled:opacity-50"></div>
                    </label>
                  </div>
                </div>
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
    </div>
  );
}

