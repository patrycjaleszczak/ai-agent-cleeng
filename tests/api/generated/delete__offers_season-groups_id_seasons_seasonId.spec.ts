import { test } from '@playwright/test';
import { ApiClient } from '../../api/lib/client';
import { expectStatusOk } from '../../api/lib/expect';

test('DELETE /offers/season-groups/{id}/seasons/{seasonId} - Delete a season from a season group', async () => {
  const baseURL = process.env.BASE_URL || process.env.PW_BASE_URL || 'http://localhost:3000';
  const client = new ApiClient({ baseURL, authHeader: process.env.AUTH_HEADER });
  await client.init();
  try {
    const templatePath = '/offers/season-groups/{id}/seasons/{seasonId}';
    const resolvedPath = client.resolvePathParams(templatePath);
    // TODO: Provide query/body if required by schema
    const res = await client.send('DELETE', resolvedPath);
    await expectStatusOk(res, 'DELETE /offers/season-groups/{id}/seasons/{seasonId}');
  } finally {
    await client.dispose();
  }
});
