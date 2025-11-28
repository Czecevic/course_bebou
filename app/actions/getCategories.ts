"use server";

import { db } from "@/app/lib/drizzle";
import { courseTable } from "@/app/lib/schema";
import { isNotNull } from "drizzle-orm";

/**
 * Récupère toutes les catégories uniques depuis la base de données
 * @returns Un tableau de catégories (sans doublons, triées)
 */
export async function getCategories(): Promise<string[]> {
  const result = await db
    .selectDistinct({ categorie: courseTable.categorie })
    .from(courseTable)
    .where(isNotNull(courseTable.categorie))
    .orderBy(courseTable.categorie);

  return result.map((row) => row.categorie as string);
}

/**
 * Récupère le nombre d'aliments par catégorie
 * @returns Un objet avec les catégories comme clés et le nombre d'aliments comme valeurs
 */
export async function getCategoriesWithCount(): Promise<
  Record<string, number>
> {
  const courses = await db.select().from(courseTable).execute();

  const countMap: Record<string, number> = {};

  courses.forEach((course) => {
    if (course.categorie) {
      countMap[course.categorie] = (countMap[course.categorie] || 0) + 1;
    }
  });

  return countMap;
}
