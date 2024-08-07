const mode : string = (import.meta as any).env.MODE

export const API_URL = mode === "development" ? "http://localhost:3000/api" : "/api"
export const HOST_URL = mode === "development" ? "http://localhost:3000" : ""
export const CENTER_OF_MAP  = [-7.519794, 110.082142] as [number, number]
export const SUBS_LIMIT  = 5