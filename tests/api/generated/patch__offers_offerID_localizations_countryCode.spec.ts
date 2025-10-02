import { test } from '@playwright/test';
import { ApiClient } from '../../api/lib/client';
import { expectStatusOk } from '../../api/lib/expect';

test('PATCH /offers/{offerID}/localizations/{countryCode} - Update an offer localization', async () => {
  const baseURL = process.env.BASE_URL || process.env.PW_BASE_URL || 'https://api.staging.stardustlab.com';
  const client = new ApiClient({ baseURL, authHeader: process.env.AUTH_HEADER });
  await client.init();
  try {
    const templatePath = '/offers/{offerID}/localizations/{countryCode}';
    const resolvedPath = client.resolvePathParams(templatePath);
    // TODO: Provide query/body if required by schema
    const res = await client.send('PATCH', resolvedPath);
    await expectStatusOk(res, 'PATCH /offers/{offerID}/localizations/{countryCode}');
  } finally {
    await client.dispose();
  }
});
