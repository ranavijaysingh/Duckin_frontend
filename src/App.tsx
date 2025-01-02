import { useState } from "react";
import { Header } from "./components/Header";
import { SampleQueries } from "./components/SampleQueries";
import { QueryInput } from "./components/QueryInput";

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [query, setQuery] = useState("");

  return (
    <div
      className={`min-h-screen ${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"
      }`}
    >
      <div className="max-w-4xl mx-auto px-4 py-8">
        <Header darkMode={darkMode} setDarkMode={setDarkMode} />

        <p className="text-gray-500 mb-8">
          Analyze your data using natural language queries
        </p>

        <SampleQueries darkMode={darkMode} onQuerySelect={setQuery} />

        <QueryInput
          darkMode={darkMode}
          query={query}
          onQueryChange={setQuery}
        />
      </div>
    </div>
  );
}

export default App;
