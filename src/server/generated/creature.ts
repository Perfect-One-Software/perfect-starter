import * as z from "zod"
import { CompleteLocation, RelatedLocationSchema, CompleteMedicalRecord, RelatedMedicalRecordSchema } from "./index"

export const CreatureSchema = z.object({
  id: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
  species: z.string(),
  image: z.string().nullish(),
  colorName: z.string(),
  locationId: z.string().nullish(),
})

export interface CompleteCreature extends z.infer<typeof CreatureSchema> {
  Location?: CompleteLocation | null
  MedicalRecord: CompleteMedicalRecord[]
}

/**
 * RelatedCreatureSchema contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedCreatureSchema: z.ZodSchema<CompleteCreature> = z.lazy(() => CreatureSchema.extend({
  Location: RelatedLocationSchema.nullish(),
  MedicalRecord: RelatedMedicalRecordSchema.array(),
}))
