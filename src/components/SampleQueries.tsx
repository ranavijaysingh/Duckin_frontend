import { BarChart3, Users, Calendar, DollarSign } from "lucide-react";

interface SampleQueriesProps {
  darkMode: boolean;
  onQuerySelect: (query: string) => void;
}

export function SampleQueries({ darkMode, onQuerySelect }: SampleQueriesProps) {
  const sampleQueries = [
    {
      icon: <BarChart3 className="w-4 h-4" />,
      text: "Show me the top 5 customers by total orders",
    },
    {
      icon: <Users className="w-4 h-4" />,
      text: "Calculate average order value by country",
    },
    {
      icon: <Calendar className="w-4 h-4" />,
      text: "List all orders from the past month",
    },
    {
      icon: <DollarSign className="w-4 h-4" />,
      text: "Find customers who spent more than $1000",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
      {sampleQueries.map((sample, index) => (
        <button
          key={index}
          onClick={() => onQuerySelect(sample.text)}
          className={`flex items-center gap-3 p-4 rounded-lg text-left transition-colors
            ${
              darkMode
                ? "bg-gray-800 hover:bg-gray-700"
                : "bg-white hover:bg-gray-100 shadow-sm"
            }`}
        >
          {sample.icon}
          <span className="text-sm">{sample.text}</span>
        </button>
      ))}
    </div>
  );
}
