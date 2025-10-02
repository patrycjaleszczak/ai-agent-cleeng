import { test } from '@playwright/test';
import { ApiClient } from '../../api/lib/client';
import { expectStatusOk } from '../../api/lib/expect';

test('PATCH /subscriptions/{subscriptionId} - Updates subscription', async () => {
  const baseURL = process.env.BASE_URL || process.env.PW_BASE_URL || 'https://api.staging.stardustlab.com';
  const client = new ApiClient({ baseURL, authHeader: process.env.AUTH_HEADER });
  await client.init();
  try {
    const templatePath = '/subscriptions/{subscriptionId}';
    const resolvedPath = client.resolvePathParams(templatePath);
    // TODO: Provide query/body if required by schema
    const res = await client.send('PATCH', resolvedPath);
    await expectStatusOk(res, 'PATCH /subscriptions/{subscriptionId}');
  } finally {
    await client.dispose();
  }
});
