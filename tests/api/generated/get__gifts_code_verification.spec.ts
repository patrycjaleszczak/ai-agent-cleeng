import { test, expect } from '@playwright/test';

test('GET /gifts/{code}/verification - Verify gift code', async ({ request, baseURL }) => {
  if (!baseURL) throw new Error('baseURL is not set');

  const authHeader = process.env.AUTH_HEADER;
  const urlPath = `/gifts/${process.env["PATH_CODE"] || "REPLACE_CODE"}/verification`;
  const url = new URL(urlPath, baseURL).toString();

  const headers: Record<string, string> = {};
  if (authHeader) {
    headers['Authorization'] = authHeader;
  }

  // TODO: Provide query/body if required by schema
  const response = await request.get(url, {
    headers,
  });

  // Basic assertions. Adjust per endpoint contract.
  expect(response.status(), 'HTTP status should be 2xx/3xx').toBeGreaterThanOrEqual(200);
  expect(response.status(), 'HTTP status should be < 400').toBeLessThan(400);
});
