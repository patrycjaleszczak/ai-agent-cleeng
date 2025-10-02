import { test } from '@playwright/test';
import { ApiClient } from '../../api/lib/client';
import { expectStatusOk } from '../../api/lib/expect';

test('GET /offers/season-groups - List season groups', async () => {
  const baseURL = process.env.BASE_URL || process.env.PW_BASE_URL || 'https://api.staging.stardustlab.com';
  const client = new ApiClient({ baseURL, authHeader: process.env.AUTH_HEADER });
  await client.init();
  try {
    const templatePath = '/offers/season-groups';
    const resolvedPath = client.resolvePathParams(templatePath);
    // TODO: Provide query/body if required by schema
    const res = await client.send('GET', resolvedPath);
    await expectStatusOk(res, 'GET /offers/season-groups');
  } finally {
    await client.dispose();
  }
});
