import { boolean, pgTable, serial, text } from "drizzle-orm/pg-core";



export const courseTable = pgTable("courses_bebous", {
  id: serial().primaryKey(),
  checked: boolean().notNull(),
  aliment: text(),
  categorie : text()
});
