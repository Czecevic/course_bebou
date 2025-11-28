"use server";

import { drizzle } from "drizzle-orm/neon-http";
import { courseTable } from "../lib/schema";
const db = drizzle(process.env.DATABASE_URL!);

export const createCourse = async () => {
  const course = await db.select().from(courseTable);
  return course;
};
