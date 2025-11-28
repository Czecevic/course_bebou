import type { CourseItem } from "@/app/actions/getCourse";

interface CourseCardProps {
  course: CourseItem;
  isChecked: boolean;
  isPending: boolean;
  onToggle: (courseId: number) => void;
}

export const CourseCard = ({
  course,
  isChecked,
  isPending,
  onToggle,
}: CourseCardProps) => {
  const displayName = course.aliment || "Sans nom";

  return (
    <div
      className={`flex flex-col px-4 py-1 rounded-lg shadow-md transition-all duration-200 ${
        isChecked
          ? "bg-green-50 border-2 border-green-300"
          : "bg-white border-2 border-gray-200"
      }`}
    >
      <div className="flex items-center justify-between mb-2">
        <div className="flex-1">
          <h3
            className={`text-lg font-semibold ${
              isChecked ? "text-green-800" : "text-gray-800 line-through"
            }`}
          >
            {displayName}
          </h3>
        </div>
        <label className="relative inline-flex items-center cursor-pointer ml-4">
          <input
            type="checkbox"
            checked={isChecked}
            onChange={() => onToggle(course.id)}
            disabled={isPending}
            className="sr-only peer"
            aria-label={`Marquer ${displayName} comme ${
              isChecked ? "non validé" : "validé"
            }`}
          />
          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500 peer-disabled:opacity-50"></div>
        </label>
      </div>
    </div>
  );
};
