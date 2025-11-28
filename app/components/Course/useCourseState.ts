import { useCallback, useEffect, useRef, useState, useTransition } from "react";
import { togglePresent } from "@/app/actions/togglePresent";
import type { CourseItem } from "@/app/actions/getCourse";

const DEBOUNCE_DELAY = 500;

export const useCourseState = (initialCourses: CourseItem[]) => {
  const [checkedMap, setCheckedMap] = useState<Map<number, boolean>>(() => {
    const map = new Map<number, boolean>();
    initialCourses.forEach((course) => {
      map.set(course.id, course.checked);
    });
    return map;
  });

  const [isPending, startTransition] = useTransition();
  const timeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);

  const handleToggle = useCallback((courseId: number) => {
    setCheckedMap((prev) => {
      const newMap = new Map(prev);
      const currentValue = newMap.get(courseId) ?? false;
      newMap.set(courseId, !currentValue);
      return newMap;
    });
  }, []);

  useEffect(() => {
    if (checkedMap.size === 0) return;

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      const updates = Array.from(checkedMap.entries()).map(([id, checked]) => ({
        id,
        checked,
      }));

      startTransition(async () => {
        await togglePresent(updates);
      });
    }, DEBOUNCE_DELAY);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [checkedMap]);

  return {
    checkedMap,
    isPending,
    handleToggle,
  };
};

