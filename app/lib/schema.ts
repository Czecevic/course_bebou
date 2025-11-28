import { boolean, pgTable, serial, text } from "drizzle-orm/pg-core";

export const courseTable = pgTable("courses_bebous", {
  id: serial().primaryKey(),
  present: boolean().notNull(),
  aliment: text(),
});
