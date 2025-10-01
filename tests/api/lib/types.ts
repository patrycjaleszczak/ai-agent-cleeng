export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE' | 'HEAD' | 'OPTIONS';

export interface ApiClientConfig {
  baseURL: string;
  authHeader?: string | undefined;
}

export interface ApiRequestOptions {
  headers?: Record<string, string>;
  query?: Record<string, string | number | boolean | undefined>;
  body?: unknown;
}

export interface ApiResponse<T = unknown> {
  ok: boolean;
  status: number;
  url: string;
  method: HttpMethod;
  json: () => Promise<T>;
  text: () => Promise<string>;
  textSnippet: () => Promise<string>;
}

export type PathParams = Record<string, string | number>;

