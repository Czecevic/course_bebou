type SortType = "name" | "status" | "none";

interface SortButtonsProps {
  sortType: SortType;
  onSortChange: (type: SortType) => void;
}

const SORT_OPTIONS: { value: SortType; label: string }[] = [
  { value: "none", label: "Aucun" },
  { value: "name", label: "Par nom" },
  { value: "status", label: "Par statut" },
];

export const SortButtons = ({ sortType, onSortChange }: SortButtonsProps) => {
  return (
    <div className="flex items-center gap-2 bg-white rounded-lg border border-gray-300 p-1">
      {SORT_OPTIONS.map((option) => (
        <button
          key={option.value}
          onClick={() => onSortChange(option.value)}
          className={`px-3 py-1.5 text-sm font-medium rounded transition-colors ${
            sortType === option.value
              ? "bg-gray-800 text-white"
              : "text-gray-700 hover:bg-gray-100"
          }`}
          aria-pressed={sortType === option.value}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
};

