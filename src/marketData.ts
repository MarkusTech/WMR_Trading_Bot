import axios from "axios";

const API_URL = "https://api.exchangeratesapi.io/latest"; // Example API URL

export const getMarketData = async (symbol: string): Promise<any[]> => {
  try {
    const response = await axios.get(`${API_URL}?base=EUR&symbols=USD`);
    console.log("API Response:", response.data); // Log the response

    const rates = response.data.rates;

    // Ensure rates is an object and has expected keys
    if (
      !rates ||
      typeof rates !== "object" ||
      Object.keys(rates).length === 0
    ) {
      throw new Error("No valid rates data available from API.");
    }

    return Object.keys(rates).map((key) => ({
      close: rates[key],
      // Add other necessary fields here if available
    }));
  } catch (error) {
    console.error("Error fetching market data:", error);
    throw error; // Rethrow to handle it in the caller
  }
};
