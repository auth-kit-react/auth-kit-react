interface CookieOptions {
  path?: string
  expires?: Date | string | number
  [key: string]: string | Date | number | undefined
}
/**
 * Options for setting a cookie.
 * @typedef {Object} CookieOptions
 * @property {string} [path] - The path for the cookie. Default is '/'.
 * @property {Date | string | number} [expires] - The expiration date for the cookie.
 *                                                Can be a Date object, a string, or a timestamp number.
 * @property {string | Date | number} [keyValuePairs] - Additional key-value pairs for the cookie.
 */

/**
 * Sets a cookie with the specified name, value, and options.
 * @param {string} name - The name of the cookie.
 * @param {string} value - The value to be stored in the cookie.
 * @param {CookieOptions} [options] - Options for setting the cookie.
 */
export function setCookie(
  name: string,
  value: string,
  options: CookieOptions = {},
): void {
  options = {
    path: '/',
    ...options,
  }

  if (options.expires instanceof Date) {
    options.expires = options.expires.toUTCString()
  } else if (typeof options.expires === 'number') {
    // Convert number to UTC string assuming it's a timestamp
    options.expires = new Date(options.expires).toUTCString()
  }

  let updatedCookie = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`

  for (const optionKey in options) {
    if (optionKey !== 'expires') {
      updatedCookie += `; ${optionKey}`
      const optionValue = options[optionKey]

      if (typeof optionValue === 'string' || typeof optionValue === 'number') {
        updatedCookie += `=${optionValue}`
      }
    }
  }

  document.cookie = updatedCookie
}

/**
 * Retrieves the value of a cookie by its name.
 * @param {string} name - The name of the cookie to retrieve.
 * @returns {string | null} - The value of the cookie, or null if the cookie is not found.
 */
export function getCookie(name: string): string | null {
  const matches = document.cookie.match(
    new RegExp(
      '(?:^|; )' + name.replace(/([.$?*|{}()[]\\\/+^])/g, '\\$1') + '=([^;]*)',
    ),
  )
  if (matches?.[1] !== undefined && matches[1] !== null && matches[1] !== '') {
    return decodeURIComponent(matches[1])
  } else {
    return null
  }
}

/**
 * Erases a cookie by setting its expiration to a past date.
 * @param {string} name - The name of the cookie to erase.
 */
export function eraseCookie(name: string): void {
  document.cookie = `${encodeURIComponent(
    name,
  )}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`
}
