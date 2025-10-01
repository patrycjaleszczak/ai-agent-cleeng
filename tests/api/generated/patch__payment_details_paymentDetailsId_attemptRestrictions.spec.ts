import { test } from '@playwright/test';
import { ApiClient } from '../../api/lib/client';
import { expectStatusOk } from '../../api/lib/expect';

test('PATCH /payment_details/{paymentDetailsId}/attemptRestrictions - Sets attempt restrictions on user payment details', async () => {
  const baseURL = process.env.BASE_URL || process.env.PW_BASE_URL || 'http://localhost:3000';
  const client = new ApiClient({ baseURL, authHeader: process.env.AUTH_HEADER });
  await client.init();
  try {
    const templatePath = '/payment_details/{paymentDetailsId}/attemptRestrictions';
    const resolvedPath = client.resolvePathParams(templatePath);
    // TODO: Provide query/body if required by schema
    const res = await client.send('PATCH', resolvedPath);
    await expectStatusOk(res, 'PATCH /payment_details/{paymentDetailsId}/attemptRestrictions');
  } finally {
    await client.dispose();
  }
});
