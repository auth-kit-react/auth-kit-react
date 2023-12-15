import ky, { type Options } from 'ky'
import { useState, useEffect } from 'react'

/**
 * Class representing an API client.
 */
export class ApiClient {
  private readonly baseUrl: string
  private authToken: string | null

  /**
   * Creates an instance of ApiClient.
   * @param {string} baseUrl - The base URL of the API.
   * @param {string | null} authToken - The authentication token.
   */
  constructor(baseUrl: string, authToken: string | null) {
    this.baseUrl = baseUrl
    this.authToken = authToken
  }

  /**
   * Sets the authentication token.
   * @param {string | null} authToken - The authentication token.
   */
  setAuthToken(authToken: string | null): void {
    this.authToken = authToken
  }

  /**
   * Gets the request configuration for the API request.
   * @returns {Options} - The request configuration.
   */
  private getRequestConfig(): Options {
    const headers: Record<string, string> = {}

    if (this.authToken !== null && this.authToken !== undefined) {
      headers.Authorization = `Bearer ${this.authToken}`
    }

    return { headers }
  }

  /**
   * Sends a GET request to the specified endpoint.
   * @template T - The expected response type.
   * @param {string} endpoint - The API endpoint.
   * @returns {Promise<T>} - The response data.
   */
  async get<T>(endpoint: string): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`
    const config = this.getRequestConfig()

    return await ky.get(url, config).json()
  }

  /**
   * Sends a POST request to the specified endpoint.
   * @template T - The expected response type.
   * @param {string} endpoint - The API endpoint.
   * @param {any} [data] - The data to be sent in the request body.
   * @returns {Promise<T>} - The response data.
   */
  async post<T>(endpoint: string, data?: any): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`
    const config = this.getRequestConfig()

    return await ky.post(url, { json: data, ...config }).json()
  }

  /**
   * Sends a PATCH request to the specified endpoint.
   * @template T - The expected response type.
   * @param {string} endpoint - The API endpoint.
   * @param {any} [data] - The data to be sent in the request body.
   * @returns {Promise<T>} - The response data.
   */
  async patch<T>(endpoint: string, data?: any): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`
    const config = this.getRequestConfig()

    return await ky.patch(url, { json: data, ...config }).json()
  }

  /**
   * Sends a PUT request to the specified endpoint.
   * @template T - The expected response type.
   * @param {string} endpoint - The API endpoint.
   * @param {any} [data] - The data to be sent in the request body.
   * @returns {Promise<T>} - The response data.
   */
  async put<T>(endpoint: string, data?: any): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`
    const config = this.getRequestConfig()

    return await ky.put(url, { json: data, ...config }).json()
  }

  /**
   * Sends a DELETE request to the specified endpoint.
   * @template T - The expected response type.
   * @param {string} endpoint - The API endpoint.
   * @returns {Promise<T>} - The response data.
   */
  async delete<T>(endpoint: string): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`
    const config = this.getRequestConfig()

    return await ky.delete(url, config).json()
  }
}

/**
 * Custom hook for making API requests.
 * @template T - The expected response type.
 * @param {string} endpoint - The API endpoint.
 * @param {ApiClient} apiClient - The API client instance.
 * @returns {[T | null, boolean, string | null]} - A tuple containing response data, loading state, and error message.
 */
export function useApi<T>(
  endpoint: string,
  apiClient: ApiClient,
): [T | null, boolean, string | null] {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = (): void => {
      setLoading(true)
      apiClient
        .get<T>(endpoint)
        .then((response) => {
          setData(response)
        })
        .catch((error) => {
          const errorMessage =
            (error as { message?: string | null })?.message ??
            'An error occurred' ??
            'An error occurred'
          setError(errorMessage)
        })
        .finally(() => {
          setLoading(false)
        })
    }

    fetchData()
  }, [endpoint, apiClient])

  return [data, loading, error]
}
