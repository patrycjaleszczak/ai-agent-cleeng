import { test, expect } from '@playwright/test';

test('PATCH /offers/{offerID}/localizations/{countryCode} - Update an offer localization', async ({ request, baseURL }) => {
  if (!baseURL) throw new Error('baseURL is not set');

  const authHeader = process.env.AUTH_HEADER;
  const urlPath = `/offers/${process.env["PATH_OFFERID"] || "REPLACE_OFFERID"}/localizations/${process.env["PATH_COUNTRYCODE"] || "REPLACE_COUNTRYCODE"}`;
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
