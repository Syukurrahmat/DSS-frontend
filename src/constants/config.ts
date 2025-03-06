import { Coordinate } from '@/types/data-table';

//@ts-ignore
export const SERVER_URL = import.meta.env.DEV ? import.meta.env.VITE_SERVER_URL : '';
export const API_URL = SERVER_URL;
export const DEFAULT_CENTER_MAP = { lat: -7.519794, lng: 110.082142 };
export const SUBS_LIMIT = 5;
