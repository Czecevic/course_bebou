"use server";

import { db } from "@/app/lib/drizzle";
import { courseTable } from "@/app/lib/schema";

export async function createAlimentationAction(aliment: string, categorie: string) {
  try {
    await db.insert(courseTable).values({ aliment, checked: false, categorie});
    return { success: true };
  } catch (error) {
    console.error("Erreur lors de la création de l'alimentation:", error);
    return { success: false, error: "Erreur lors de la création de l'alimentation" };
  }
}