const API_URL = "http://localhost:3000/api";

export async function executeQuery(query: string): Promise<any> {
  try {
    const response = await fetch(`${API_URL}/query/execute`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || "Query execution failed");
    }

    return await response.json();
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
}

export async function uploadCSV(formData: FormData): Promise<any> {
  try {
    const response = await fetch(`${API_URL}/query/upload-csv`, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || "CSV upload failed");
    }

    return await response.json();
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
}
