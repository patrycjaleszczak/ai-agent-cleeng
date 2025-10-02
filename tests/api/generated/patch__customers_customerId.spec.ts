import { test } from '@playwright/test';
import { ApiClient } from '../../api/lib/client';
import { expectStatusOk } from '../../api/lib/expect';

test('PATCH /customers/{customerId} - Use this endpoint to update a customer\'s data, for example first name, last name.', async () => {
  const baseURL = process.env.BASE_URL || process.env.PW_BASE_URL || 'https://api.staging.stardustlab.com';
  const client = new ApiClient({ baseURL, authHeader: process.env.AUTH_HEADER });
  await client.init();
  try {
    const templatePath = '/customers/{customerId}';
    const resolvedPath = client.resolvePathParams(templatePath);
    // TODO: Provide query/body if required by schema
    const res = await client.send('PATCH', resolvedPath);
    await expectStatusOk(res, 'PATCH /customers/{customerId}');
  } finally {
    await client.dispose();
  }
});
