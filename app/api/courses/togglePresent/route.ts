import { db } from "@/app/lib/drizzle";
import { courseTable } from "@/app/lib/schema";
import { NextRequest, NextResponse } from "next/server";
import { eq } from "drizzle-orm";

export const PUT = async (req: NextRequest) => {
  try {
    const body = await req.json();

    // Validation du format
    if (
      !Array.isArray(body) ||
      body.length === 0 ||
      typeof body[0] !== "object" ||
      !("id" in body[0])
    ) {
      return NextResponse.json(
        { error: "Format invalide. Envoyez un tableau d'objets {id, present}" },
        { status: 400 }
      );
    }

    // Mise à jour en parallèle pour de meilleures performances
    await Promise.all(
      body.map((item: { id: number; checked: boolean }) =>
        db
          .update(courseTable)
          .set({ checked: item.checked })
          .where(eq(courseTable.id, item.id))
      )
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Erreur lors de la mise à jour:", error);
    return NextResponse.json(
      { error: "Erreur lors de la mise à jour" },
      { status: 500 }
    );
  }
};
