"use server";

import { db } from "@/app/lib/drizzle";
import { courseTable } from "@/app/lib/schema";

export interface CourseItem {
  id: number;
  aliment: string | null;
  checked: boolean;
  categorie : string | null;
}

export async function getCourses(): Promise<CourseItem[]> {
  return await db.select().from(courseTable);
}
