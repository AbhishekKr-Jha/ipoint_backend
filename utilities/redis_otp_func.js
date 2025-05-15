import { createClient } from 'redis';

export const store_otp_func = async (userKey, otpValue) => {
  const client = createClient();

  client.on('error', (err) => console.error('Redis Client Error', err));

  await client.connect();

  await client.set(userKey, otpValue, {
    EX: 600, // 10 minutes = 600 seconds
    NX: true,
  });

  await client.disconnect();
};
 