import { useState } from "react";
interface CustomCheckboxProps {
  label: string;
  initialChecked?: boolean;
}
const CustomCheckbox = ({
  label,
  initialChecked = false,
}: CustomCheckboxProps) => {
  const [isChecked, setIsChecked] = useState(initialChecked);

  const handleChange = () => {
    setIsChecked(!isChecked);
  };

  return (
    <label className="flex items-center cursor-pointer">
      {/* Hidden native checkbox */}
      <input
        type="checkbox"
        className="sr-only peer" // sr-only hides it visually but keeps it accessible
        checked={isChecked}
        onChange={handleChange}
      />

      {/* Custom styled checkbox */}
      <div
        className="  w-5 h-5 rounded-md border border-[#ACACAC]   flex items-center justify-center
                      peer-checked:bg-green-500 peer-checked:border-green-500 transition-colors duration-200"
      >
        {isChecked && (
          <svg
            className="w-3 h-3 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 13l4 4L19 7"
            />
          </svg>
        )}
      </div>

      {/* Label */}
      <span className="ml-2 text-gray-700">{label}</span>
    </label>
  );
};

export default CustomCheckbox;
