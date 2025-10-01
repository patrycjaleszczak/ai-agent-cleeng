import { test, expect } from '@playwright/test';

test('POST /subscriptions/{subscriptionId}/terminate - Terminate subscription', async ({ request, baseURL }) => {
  if (!baseURL) throw new Error('baseURL is not set');

  const authHeader = process.env.AUTH_HEADER;
  const urlPath = `/subscriptions/${process.env["PATH_SUBSCRIPTIONID"] || "REPLACE_SUBSCRIPTIONID"}/terminate`;
  const url = new URL(urlPath, baseURL).toString();

  const headers: Record<string, string> = {};
  if (authHeader) {
    headers['Authorization'] = authHeader;
  }

  // TODO: Provide query/body if required by schema
  const response = await request.post(url, {
    headers,
  });

  // Basic assertions. Adjust per endpoint contract.
  expect(response.status(), 'HTTP status should be 2xx/3xx').toBeGreaterThanOrEqual(200);
  expect(response.status(), 'HTTP status should be < 400').toBeLessThan(400);
});
