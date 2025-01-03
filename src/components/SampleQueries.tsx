interface SampleQueriesProps {
  darkMode: boolean;
  onQuerySelect: (query: string) => void;
}

export function SampleQueries({ darkMode, onQuerySelect }: SampleQueriesProps) {
  const sampleQueries = [
    {
      text: "Show All",
    },
    {
      text: "Show Top 15 entries",
    },
    {
      text: "Show entries where Country is New Zealand",
    },
    {
      text: "show all where index<92",
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
          <span className="text-sm">{sample.text}</span>
        </button>
      ))}
    </div>
  );
}
