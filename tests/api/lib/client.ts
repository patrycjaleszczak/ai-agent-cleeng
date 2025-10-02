import { request as pwRequest, APIRequestContext, expect } from '@playwright/test';
import { ApiClientConfig, ApiRequestOptions, ApiResponse, HttpMethod, PathParams } from './types';

export class ApiClient {
  private readonly baseURL: string;
  private readonly authHeader?: string;
  private requestContext?: APIRequestContext;

  constructor(config: ApiClientConfig) {
    const base = config.baseURL || process.env.BASE_URL || process.env.PW_BASE_URL || 'https://api.staging.stardustlab.com';
    this.baseURL = base.replace(/\/$/, '');
    this.authHeader = config.authHeader ?? process.env.AUTH_HEADER;
  }

  async init(): Promise<void> {
    if (!this.requestContext) {
      this.requestContext = await pwRequest.newContext({ baseURL: this.baseURL });
    }
  }

  async dispose(): Promise<void> {
    await this.requestContext?.dispose();
  }

  buildUrl(pathname: string, query?: Record<string, string | number | boolean | undefined>): string {
    const url = new URL(pathname, this.baseURL);
    if (query) {
      for (const [key, value] of Object.entries(query)) {
        if (value === undefined) continue;
        url.searchParams.set(key, String(value));
      }
    }
    return url.toString();
  }

  resolvePathParams(templatePath: string, params: PathParams = {}): string {
    return templatePath.replace(/\{([^}]+)\}/g, (_m, p1) => {
      const paramName = String(p1);
      const envName = `PATH_${paramName.toUpperCase()}`;
      const value = params[paramName] ?? process.env[envName];
      expect(value, `Missing path param '${paramName}'. Provide via params or env ${envName}`).toBeTruthy();
      return encodeURIComponent(String(value));
    });
  }

  async send<T = unknown>(method: HttpMethod, pathname: string, options: ApiRequestOptions = {}): Promise<ApiResponse<T>> {
    if (!this.requestContext) throw new Error('ApiClient not initialized. Call init() first.');
    const headers: Record<string, string> = { ...(options.headers || {}) };
    if (this.authHeader) headers['Authorization'] = this.authHeader;

    const url = this.buildUrl(pathname, options.query);
    const response = await this.requestContext.fetch(url, {
      method,
      headers,
      data: options.body as any,
    });

    return {
      ok: response.ok(),
      status: response.status(),
      url,
      method,
      json: async () => response.json(),
      text: async () => response.text(),
      textSnippet: async () => (await response.text()).slice(0, 500),
    };
  }
}

