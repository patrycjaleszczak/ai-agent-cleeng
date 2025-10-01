import { test } from '@playwright/test';
import { ApiClient } from '../../api/lib/client';
import { expectStatusOk } from '../../api/lib/expect';

test('POST /subscription_switches - Request subscription switch', async () => {
  const baseURL = process.env.BASE_URL || process.env.PW_BASE_URL || 'http://localhost:3000';
  const client = new ApiClient({ baseURL, authHeader: process.env.AUTH_HEADER });
  await client.init();
  try {
    const templatePath = '/subscription_switches';
    const resolvedPath = client.resolvePathParams(templatePath);
    // TODO: Provide query/body if required by schema
    const res = await client.send('POST', resolvedPath);
    await expectStatusOk(res, 'POST /subscription_switches');
  } finally {
    await client.dispose();
  }
});
