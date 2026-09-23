import { apiClient } from "./apiClient.js";

const LOGIN_ENDPOINT = "/auth/login";

/**
 * Logs in a user.
 *
 * @param {object} credentials The user's email and password.
 * @returns {Promise<object>} The user's profile.
 */
export async function loginUser(credentials) {
  const response = await apiClient(LOGIN_ENDPOINT, {
    method: "POST",
    body: JSON.stringify(credentials),
  });

  const { accessToken, ...profile } = response.data;

  if (accessToken) {
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("profile", JSON.stringify(profile));

    return profile;
  }

  throw new Error("Login successful, but no access token received.");
}

/**
 * Logs out the current user.
 */
export function logoutUser() {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("profile");
}