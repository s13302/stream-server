import * as z from 'zod';

const ProcessEnvSchema = z.object({
  PORT: z.number().or(z.string()).optional().nullable(),
  NODE_ENV: z.literal('production').or(z.literal('dev')).optional().nullable(),
  TWITCH_CHANNEL_NAME: z.string(),
  TWITCH_CHANNEL_ID: z.string(),
  TWITCH_CLIENT_SECRET: z.string(),
  TWITCH_CLIENT_ID: z.string(),
  TWITCH_REDIRECT_URI: z.string().url(),
}).nonstrict();

export type MyProcessEnv = z.TypeOf<typeof ProcessEnvSchema>;

export type ReadOnlyProcessEnv = Readonly<MyProcessEnv>;

export function assertProcessEnv(val: unknown): asserts val is ReadOnlyProcessEnv {
  if (!ProcessEnvSchema.check(val)) {
    throw new Error('Env variables are unsufficient.');
  }
}
