import type { TransframeSourceApi } from "./types";

/**
 * Generates a random string of 32 characters
 */
export function generateId () {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
}

export function createProviderApi<Api extends TransframeSourceApi<unknown>>(api: Api) {
  return api
}
