/**
 * Options for configuring authentication utilities.
 * @typedef {Object} AuthUtilsOptions
 * @property {string} baseUrl - The base URL for authentication-related requests.
 * @property {string} loginEndpoint - The endpoint for the login request.
 * @property {string} logoutUrl - The URL for the logout request.
 * @property {number} [cookieExpires] - The expiration time for the authentication cookie (optional).
 */
export interface AuthUtilsOptions {
  baseUrl: string
  loginEndpoint: string
  logoutUrl: string
  cookieExpires?: number
}

/**
 * Properties provided by the authentication context.
 * @typedef {Object} AuthContextProps
 * @property {string | null} token - The authentication token or null if not authenticated.
 * @property {(username: string, password: string) => Promise<void>} login - A function for user login.
 * @property {() => void} logout - A function for user logout.
 * @property {<T>(endpoint: string) => [T | null, boolean, string | null]} useAuthenticatedApi -
 *   A function to retrieve authenticated API data with loading and error indicators.
 */
export interface AuthContextProps {
  token: string | null
  login: (username: string, password: string) => Promise<void>
  logout: () => void
  useAuthenticatedApi: <T>(
    endpoint: string,
  ) => [T | null, boolean, string | null]
}

/**
 * Props for the authentication provider component.
 * @typedef {Object} AuthProviderProps
 * @property {React.ReactNode} children - The child elements to be wrapped by the authentication provider.
 * @property {AuthUtilsOptions} authUtilsOptions - The configuration options for authentication utilities.
 */
export interface AuthProviderProps {
  children: React.ReactNode
  authUtilsOptions: AuthUtilsOptions
}

// enum HttpMethod {
//   GET = 'GET',
//   POST = 'POST',
//   PATCH = 'PATCH',
//   PUT = 'PUT',
//   DELETE = 'DELETE',
// }
