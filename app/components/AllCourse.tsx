import { createCourse } from "../actions/createCourse";
import { Course } from "./Course";

export const AllCourse = async () => {
  const allCourses = await createCourse();
  return <Course allCourses={allCourses} />;
};
