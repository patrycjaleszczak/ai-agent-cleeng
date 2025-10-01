import { test } from '@playwright/test';
import { ApiClient } from '../../api/lib/client';
import { expectStatusOk } from '../../api/lib/expect';

test('POST /passes/{passId}/terminate - Terminate a pass', async () => {
  const baseURL = process.env.BASE_URL || process.env.PW_BASE_URL || 'http://localhost:3000';
  const client = new ApiClient({ baseURL, authHeader: process.env.AUTH_HEADER });
  await client.init();
  try {
    const templatePath = '/passes/{passId}/terminate';
    const resolvedPath = client.resolvePathParams(templatePath);
    // TODO: Provide query/body if required by schema
    const res = await client.send('POST', resolvedPath);
    await expectStatusOk(res, 'POST /passes/{passId}/terminate');
  } finally {
    await client.dispose();
  }
});
