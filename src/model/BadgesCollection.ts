import * as z from 'zod';

const ImageDescriptionSchema = z.object({
  alpha: z.string().nonempty(),
  image: z.string().nonempty(),
  svg: z.string().nonempty(),
});

const BadgesCollectionSchema = z.object({
  global_mod: ImageDescriptionSchema.optional().nullable(),
  admin: ImageDescriptionSchema.optional().nullable(),
  broadcaster: ImageDescriptionSchema.optional().nullable(),
  mod: ImageDescriptionSchema.optional().nullable(),
  staff: ImageDescriptionSchema.optional().nullable(),
  turbo: ImageDescriptionSchema.optional().nullable(),
  subscriber: ImageDescriptionSchema.optional().nullable(),
});

export type BadgesCollection = z.TypeOf<typeof BadgesCollectionSchema>;

export type BadgeType = 'global_mod' | 'admin' | 'broadcaster' | 'mod' | 'staff' | 'turbo' | 'subscriber' | never;

export function checkBadgesCollection(val: unknown): val is BadgesCollection {
  const result = BadgesCollectionSchema.check(val);
  return result;
}
