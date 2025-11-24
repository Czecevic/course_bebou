"use client";
import { useState } from "react";

interface ButtonProps {
  numCourse: number;
}

export const Button = ({ numCourse }: ButtonProps) => {
  const [statusCourse, setStatusCourse] = useState(numCourse);
  console.log();
  return (
    <button
      className="bg-amber-300 rounded-2xl p-3 text-black cursor-pointer"
      onClick={() => setStatusCourse((prevState) => (prevState === 0 ? 1 : 0))}
    >
      {statusCourse == 1 ? "a prendre" : "pas besoin"}
    </button>
  );
};
