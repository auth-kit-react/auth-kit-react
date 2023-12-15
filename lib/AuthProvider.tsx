import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useMemo,
} from 'react'
import { login, logout } from './utility/authUtils'
import { ApiClient, useApi } from './utility/apiClientUtils'
import { type AuthContextProps, type AuthProviderProps } from '../types/types'
import ProtectedRoute from './ProtectedRoute'
import { getCookie } from './utility/cookieUtils'

/**
 * Context to manage authentication state and provide it to its descendants.
 * @type {React.Context<AuthContextProps | undefined>}
 */
const AuthContext = createContext<AuthContextProps | undefined>(undefined)

/**
 * AuthProvider: A component to provide authentication context to its children.
 * @param {AuthProviderProps} props - Props for AuthProvider component.
 * @returns {React.ReactElement} - JSX element representing the AuthProvider.
 */
export const AuthProvider: React.FC<AuthProviderProps> = ({
  children,
  authUtilsOptions,
}) => {
  /**
   * State to manage the authentication token.
   * @type {[string | null, React.Dispatch<React.SetStateAction<string | null>>]}
   */
  const [token, setToken] = useState<string | null>(getCookie('authToken'))

  /**
   * Effect to run on component mount (placeholder for future enhancements).
   */
  useEffect(() => {
    // No changes needed here since we're now using cookies
  }, [])

  /**
   * Function to handle user login.
   * @param {string} username - User's username.
   * @param {string} password - User's password.
   * @returns {Promise<void>} - A Promise that resolves when the login is successful.
   */
  const handleLogin = async (
    username: string,
    password: string,
  ): Promise<void> => {
    await login(username, password, authUtilsOptions)
    setToken(getCookie('authToken'))
  }

  /**
   * Function to handle user logout.
   */
  const handleLogout = (): void => {
    logout(authUtilsOptions)
    setToken(null)
  }

  /**
   * API client instance with the current authentication token.
   * @type {ApiClient}
   */
  const apiClient = new ApiClient(authUtilsOptions.baseUrl, token)

  /**
   * Function to provide an authenticated API hook.
   * @type {AuthContextProps["useAuthenticatedApi"]}
   */
  const useAuthenticatedApi: AuthContextProps['useAuthenticatedApi'] = (
    endpoint,
  ) => {
    return useApi(endpoint, apiClient)
  }

  /**
   * Memoized context value to avoid unnecessary re-renders.
   * @type {AuthContextProps}
   */
  const memoizedValue = useMemo(
    () => ({
      token,
      login: handleLogin,
      logout: handleLogout,
      useAuthenticatedApi,
    }),
    [token, handleLogin, handleLogout, useAuthenticatedApi],
  )

  /**
   * Provide the authentication context to its children.
   * @returns {React.ReactElement} - JSX element representing the AuthProvider context.
   */
  return (
    <AuthContext.Provider value={memoizedValue}>
      {children}
    </AuthContext.Provider>
  )
}

/**
 * useAuth: A custom hook to consume the authentication context.
 * @returns {AuthContextProps} - Authentication context properties.
 * @throws {Error} - Throws an error if used outside of an AuthProvider.
 */
const useAuth = (): AuthContextProps => {
  const context = useContext(AuthContext)

  if (context === null || context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }

  return context
}

// Export additional components for external use
export { ProtectedRoute, useAuth }
