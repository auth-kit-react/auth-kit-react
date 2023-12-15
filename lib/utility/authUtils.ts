import ky from "ky";
import { setCookie, eraseCookie } from "./cookieUtils";
import { AuthUtilsOptions } from "../../types/types";
import { useAuth } from "../AuthProvider";

interface LoginResponse {
  token: string;
  // Add other response properties as needed
}

/**
 * Performs user authentication by sending a POST request with the provided credentials.
 * @param {string} username - The username.
 * @param {string} password - The password.
 * @param {AuthUtilsOptions} options - Authentication options.
 * @returns {Promise<void>} - A promise that resolves when authentication is successful.
 * @throws {Error} - Throws an error if authentication fails.
 */
export async function login(
  username: string,
  password: string,
  options: AuthUtilsOptions
): Promise<void> {
  try {
    const loginUrl = `${options.baseUrl}${options.loginEndpoint}`;
    const response: LoginResponse = await ky
      .post(loginUrl, {
        json: { username, password },
      })
      .json();

    const { token } = response;

    // Store the token in a cookie
    setCookie("authToken", token, { expires: options.cookieExpires ?? 3600 }); // Adjust as needed
  } catch (error) {
    // Handle authentication error
    throw new Error("Authentication failed");
  }
}

/**
 * Logs the user out by sending a POST request to the logout endpoint.
 * @param {AuthUtilsOptions} options - Logout options.
 * @throws {Error} - Throws an error if logout fails.
 */
export function logout(options: AuthUtilsOptions): void {
  try {
    const logoutUrl = `${options.baseUrl}${options.logoutUrl}`;
    // You might want to include additional headers or handle the response accordingly
    ky.post(logoutUrl, {
      // Include any other data required for your logout API
    });

    // Clear the authentication token from the cookie
    eraseCookie("authToken");
  } catch (error) {
    // Handle logout error
    throw new Error("Logout failed");
  }
}

/**
 * Checks if the user is authenticated.
 * @returns {boolean} - `true` if the user is authenticated, otherwise `false`.
 */
export function useProtectedRoute(): boolean {
  const { token } = useAuth();

  // Check if the user is authenticated
  return !!token;
}
