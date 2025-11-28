import type { CourseItem } from "@/app/actions/getCourse";

type SortType = "name" | "status" | "none";

const getCourseName = (course: CourseItem): string => {
  return (course.aliment || "Sans nom").toLowerCase();
};

const compareNames = (a: CourseItem, b: CourseItem): number => {
  return getCourseName(a).localeCompare(getCourseName(b), "fr");
};

export const sortCourses = (
  courses: CourseItem[],
  sortType: SortType,
  checkedMap: Map<number, boolean>
): CourseItem[] => {
  const sorted = [...courses];

  if (sortType === "name") {
    return sorted.sort(compareNames);
  }

  if (sortType === "status") {
    return sorted.sort((a, b) => {
      const aChecked = checkedMap.get(a.id) ?? false;
      const bChecked = checkedMap.get(b.id) ?? false;

      if (aChecked === bChecked) {
        return compareNames(a, b);
      }

      // Non validés d'abord, puis validés
      return aChecked ? -1 : 1;
    });
  }

  return sorted;
};

