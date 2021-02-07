import { Router } from 'express';

import { assertProcessEnv } from '../module';

const router = Router();

const baseAuthUrl = 'https://id.twitch.tv/oauth2/authorize';

router.get('/auth', (_, res) => {
  assertProcessEnv(process.env);
  const urlParams = new URLSearchParams({
    client_id: process.env.TWITCH_CLIENT_ID,
    redirect_uri: process.env.TWITCH_REDIRECT_URI,
    response_type: 'code',
    scope: ['channel:moderate', 'chat:read', 'chat:edit', 'whispers:read'].join(' '),
  });
  res.redirect(`${baseAuthUrl}?${urlParams}`);
});

export default router;
