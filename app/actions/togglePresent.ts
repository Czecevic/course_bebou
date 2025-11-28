"use server";

import { db } from "@/app/lib/drizzle";
import { courseTable } from "@/app/lib/schema";
import { eq } from "drizzle-orm";

interface ToggleItem {
  id: number;
  checked: boolean;
}

export async function togglePresent(items: ToggleItem[]) {
  try {
    // Mise à jour en parallèle pour de meilleures performances
    await Promise.all(
      items.map((item) =>
        db
          .update(courseTable)
          .set({ checked: item.checked })
          .where(eq(courseTable.id, item.id))
      )
    );
    return { success: true };
  } catch (error) {
    console.error("Erreur lors de la mise à jour:", error);
    return { success: false, error: "Erreur lors de la mise à jour" };
  }
}

