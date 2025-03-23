const API_BASE_URL = "http://localhost:3000";  // No need for full URL

export async function fetchData(endpoint: string, method: string = "GET", body?: object) {
  try {
    const response = await fetch(`${API_BASE_URL}/${endpoint}`, {
      method,
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer your_token_here" // If needed
      },
      body: body ? JSON.stringify(body) : undefined, // Convert object to JSON string
      credentials: "include" // Ensure cookies & auth headers are sent
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
}
