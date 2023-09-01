import * as z from "zod"
import { CompleteCreature, RelatedCreatureSchema } from "./index"

export const LocationSchema = z.object({
  id: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
  name: z.string(),
  certificateLevel: z.string(),
})

export interface CompleteLocation extends z.infer<typeof LocationSchema> {
  residents: CompleteCreature[]
}

/**
 * RelatedLocationSchema contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedLocationSchema: z.ZodSchema<CompleteLocation> = z.lazy(() => LocationSchema.extend({
  residents: RelatedCreatureSchema.array(),
}))
