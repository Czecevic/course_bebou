"use client";
import { useEffect, useState } from "react";

interface CourseItemProps {
  id: number;
  aliment: string | null;
  present: boolean;
}

export const Course = ({ allCourses }: { allCourses: CourseItemProps[] }) => {
  const [checked, setChecked] = useState(
    allCourses.map((course) => course.present)
  );
  useEffect(() => {
    fetch("/api/courses/togglePresent", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(checked),
    });
  }, [checked]);
  return (
    <div>
      {allCourses.map((course: CourseItemProps, idx: number) => {
        return (
          <div key={course.id}>
            <h1>{course.aliment}</h1>
            <input
              type="checkbox"
              checked={checked[idx]}
              onChange={() =>
                setChecked((prev) => {
                  const updated = [...prev];
                  updated[idx] = !updated[idx];
                  return updated;
                })
              }
            ></input>
          </div>
        );
      })}
    </div>
  );
};
