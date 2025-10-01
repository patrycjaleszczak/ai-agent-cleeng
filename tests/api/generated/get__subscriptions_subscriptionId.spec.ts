import { test } from '@playwright/test';
import { ApiClient } from '../../api/lib/client';
import { expectStatusOk } from '../../api/lib/expect';

test('GET /subscriptions/{subscriptionId} - Get subscription', async () => {
  const baseURL = process.env.BASE_URL || process.env.PW_BASE_URL || 'http://localhost:3000';
  const client = new ApiClient({ baseURL, authHeader: process.env.AUTH_HEADER });
  await client.init();
  try {
    const templatePath = '/subscriptions/{subscriptionId}';
    const resolvedPath = client.resolvePathParams(templatePath);
    // TODO: Provide query/body if required by schema
    const res = await client.send('GET', resolvedPath);
    await expectStatusOk(res, 'GET /subscriptions/{subscriptionId}');
  } finally {
    await client.dispose();
  }
});
