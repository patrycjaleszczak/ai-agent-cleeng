import { test, expect } from '@playwright/test';

test('PATCH /offers/season-groups/{id}/seasons/{seasonId} - Update a season within a season group', async ({ request, baseURL }) => {
  if (!baseURL) throw new Error('baseURL is not set');

  const authHeader = process.env.AUTH_HEADER;
  const urlPath = `/offers/season-groups/${process.env["PATH_ID"] || "REPLACE_ID"}/seasons/${process.env["PATH_SEASONID"] || "REPLACE_SEASONID"}`;
  const url = new URL(urlPath, baseURL).toString();

  const headers: Record<string, string> = {};
  if (authHeader) {
    headers['Authorization'] = authHeader;
  }

  // TODO: Provide query/body if required by schema
  const response = await request.patch(url, {
    headers,
  });

  // Basic assertions. Adjust per endpoint contract.
  expect(response.status(), 'HTTP status should be 2xx/3xx').toBeGreaterThanOrEqual(200);
  expect(response.status(), 'HTTP status should be < 400').toBeLessThan(400);
});
