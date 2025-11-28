import { db } from "@/app/lib/drizzle";
import { courseTable } from "@/app/lib/schema";
import { NextRequest } from "next/server";

export const PUT = async (req: NextRequest) => {
  const body = await req.json();
  console.log(body);
  await db.update(courseTable).set({
    present: body.present,
  });
  Response.json("bien envoyé");
};
