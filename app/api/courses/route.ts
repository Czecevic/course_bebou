import { db } from "@/app/lib/drizzle";
import { courseTable } from "@/app/lib/schema";
import { NextRequest } from "next/server";

export const POST = async (req: NextRequest) => {
  const body = await req.json();
  await db
    .insert(courseTable)
    .values({
      aliment: body.aliment,
      present: body.present,
    })
    .returning();
  Response.json("bien envoyé");
};
