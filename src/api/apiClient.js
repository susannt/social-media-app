const BASE_URL = "https://v2.api.noroff.dev";

/**
 * Sends a request to the Noroff API.
 * Automatically adds the API key and access token when available.
 *
 * @param {string} endpoint The API endpoint.
 * @param {object} options Fetch options.
 * @returns {Promise<object>} The API response.
 */
export async function apiClient(endpoint, options = {}) {
  const apiKey = localStorage.getItem("apiKey");
  const accessToken = localStorage.getItem("accessToken");

  const headers = {
    "Content-Type": "application/json",
  };

  if (apiKey) {
    headers["X-Noroff-API-Key"] = apiKey;
  }

  if (accessToken) {
    headers["Authorization"] = `Bearer ${accessToken}`;
  }

  const response = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      ...headers,
      ...options.headers,
    },
  });

  const text = await response.text();

  const result = text ? JSON.parse(text) : {};

  return result;
}
