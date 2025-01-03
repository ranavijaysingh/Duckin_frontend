import { Send, Upload } from "lucide-react";
import { ChangeEvent, useRef, useState } from "react";
import { executeQuery, uploadCSV } from "../services/api";

interface QueryInputProps {
  darkMode: boolean;
  query: string;
  onQueryChange: (value: string) => void;
}

export function QueryInput({
  darkMode,
  query,
  onQueryChange,
}: QueryInputProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [results, setResults] = useState<any[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);

  const handleFileUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.name.toLowerCase().endsWith(".csv")) {
      setError("Only CSV files are supported");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("file", file);
      const response = await uploadCSV(formData);
      console.log("resonse");
      console.log(response);
      setResults(response.data);
      setUploadedFileName(file.name);
      onQueryChange("");
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to upload CSV file"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleQueryExecution = async () => {
    if (!query.trim()) {
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await executeQuery(query);
      setResults(response.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Query execution failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div
        className={`relative rounded-xl overflow-hidden
        ${darkMode ? "bg-gray-800" : "bg-white shadow-lg"}`}
      >
        <textarea
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          placeholder="Enter your SQL query..."
          className={`w-full p-4 min-h-[200px] resize-none outline-none
            ${
              darkMode
                ? "bg-gray-800 text-white placeholder-gray-500"
                : "bg-white text-gray-900 placeholder-gray-400"
            }`}
        />
        <div
          className={`flex items-center gap-2 p-3 border-t
          ${darkMode ? "border-gray-700" : "border-gray-100"}`}
        >
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileUpload}
            accept=".csv"
            className="hidden"
          />
          <button
            onClick={() => fileInputRef.current?.click()}
            disabled={loading}
            className={`flex items-center gap-2 p-2 rounded-lg
              ${darkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"}
              ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
            title="Upload CSV File"
          >
            <Upload className="w-4 h-4" />
            <span className="text-sm">Upload CSV</span>
          </button>

          {uploadedFileName && (
            <span
              className={`text-sm ${
                darkMode ? "text-gray-400" : "text-gray-600"
              }`}
            >
              {uploadedFileName}
            </span>
          )}

          <div className="flex-1" />

          <button
            onClick={handleQueryExecution}
            disabled={loading || !query.trim()}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium
              ${
                darkMode
                  ? "bg-blue-600 hover:bg-blue-700 text-white"
                  : "bg-blue-500 hover:bg-blue-600 text-white"
              }
              ${
                loading || !query.trim() ? "opacity-50 cursor-not-allowed" : ""
              }`}
          >
            <Send className="w-4 h-4" />
            {loading ? "Processing..." : "Run Query"}
          </button>
        </div>
      </div>

      {error && (
        <div className="p-4 rounded-lg bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-100">
          {error}
        </div>
      )}

      {results && (
        <div
          className={`rounded-lg overflow-hidden ${
            darkMode ? "bg-gray-800" : "bg-white"
          }`}
        >
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className={darkMode ? "bg-gray-700" : "bg-gray-50"}>
                <tr>
                  {Object.keys(results[0] || {}).map((key) => (
                    <th
                      key={key}
                      className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
                    >
                      {key}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {results.map((row, i) => (
                  <tr key={i}>
                    {Object.values(row).map((value: any, j) => (
                      <td
                        key={j}
                        className="px-6 py-4 whitespace-nowrap text-sm"
                      >
                        {value?.toString()}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
