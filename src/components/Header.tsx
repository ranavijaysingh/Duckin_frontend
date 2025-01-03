import { Moon, Sun, Squirrel } from "lucide-react";

interface HeaderProps {
  darkMode: boolean;
  setDarkMode: (value: boolean) => void;
}

export function Header({ darkMode, setDarkMode }: HeaderProps) {
  return (
    <div className="flex justify-between items-center mb-8">
      <h1 className="text-3xl font-bold flex flex-row mx-auto my-0">
        DuckIn
        <Squirrel className="w-11 h-11 text-3xl" />
      </h1>
      <button
        onClick={() => setDarkMode(!darkMode)}
        className={`p-2 rounded-full ${
          darkMode ? "bg-gray-800 text-gray-200" : "bg-gray-200 text-gray-800"
        }`}
      >
        {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
      </button>
    </div>
  );
}
