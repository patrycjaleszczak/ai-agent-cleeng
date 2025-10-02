import { expect } from '@playwright/test';
import { ApiResponse } from './types';

export async function expectStatusOk(res: ApiResponse, context?: string): Promise<void> {
  const body = await res.textSnippet();
  const msgBase = `${res.method} ${res.url} => ${res.status}` + (context ? ` | ${context}` : '');
  expect(res.status, `${msgBase} | body: ${body}`).toBeGreaterThanOrEqual(200);
  expect(res.status, `${msgBase} | body: ${body}`).toBeLessThan(400);
}

export async function expectJson<T = unknown>(res: ApiResponse<T>, predicate?: (data: T) => void, context?: string): Promise<T> {
  const data = await res.json();
  if (predicate) {
    try {
      predicate(data);
    } catch (e: any) {
      const msg = `${res.method} ${res.url} => ${res.status} | JSON predicate failed${context ? ` | ${context}` : ''}`;
      throw new Error(`${msg}\n${e?.message || e}\nData: ${JSON.stringify(data).slice(0, 1000)}`);
    }
  }
  return data;
}

