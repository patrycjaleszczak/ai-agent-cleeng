import { test } from '@playwright/test';
import { ApiClient } from '../../api/lib/client';
import { expectStatusOk } from '../../api/lib/expect';

test('POST /offers/{offerId}/localizations/{countryCode}/deactivate', async () => {
  const baseURL = process.env.BASE_URL || process.env.PW_BASE_URL || 'http://localhost:3000';
  const client = new ApiClient({ baseURL, authHeader: process.env.AUTH_HEADER });
  await client.init();
  try {
    const templatePath = '/offers/{offerId}/localizations/{countryCode}/deactivate';
    const resolvedPath = client.resolvePathParams(templatePath);
    // TODO: Provide query/body if required by schema
    const res = await client.send('POST', resolvedPath);
    await expectStatusOk(res, 'POST /offers/{offerId}/localizations/{countryCode}/deactivate');
  } finally {
    await client.dispose();
  }
});
