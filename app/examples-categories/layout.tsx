import { getCourses } from "@/app/actions/getCourse";
import ExampleCategoriesPage from "./page";

export default async function ExamplesLayout() {
  const allCourses = await getCourses();
  return <ExampleCategoriesPage allCourses={allCourses} />;
}

