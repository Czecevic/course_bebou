import { getCourses } from "@/app/actions/getCourse";
import { Course } from "./Course";

export const AllCourse = async () => {
  const allCourses = await getCourses();
  return <Course allCourses={allCourses} />;
};
