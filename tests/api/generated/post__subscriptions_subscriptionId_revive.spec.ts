import { test } from '@playwright/test';
import { ApiClient } from '../../api/lib/client';
import { expectStatusOk } from '../../api/lib/expect';

test('POST /subscriptions/{subscriptionId}/revive - Revives subscription', async () => {
  const baseURL = process.env.BASE_URL || process.env.PW_BASE_URL || 'http://localhost:3000';
  const client = new ApiClient({ baseURL, authHeader: process.env.AUTH_HEADER });
  await client.init();
  try {
    const templatePath = '/subscriptions/{subscriptionId}/revive';
    const resolvedPath = client.resolvePathParams(templatePath);
    // TODO: Provide query/body if required by schema
    const res = await client.send('POST', resolvedPath);
    await expectStatusOk(res, 'POST /subscriptions/{subscriptionId}/revive');
  } finally {
    await client.dispose();
  }
});
