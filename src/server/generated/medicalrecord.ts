import * as z from "zod"
import { CompleteCreature, RelatedCreatureSchema } from "./index"

export const MedicalRecordSchema = z.object({
  id: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
  creatureId: z.string(),
})

export interface CompleteMedicalRecord extends z.infer<typeof MedicalRecordSchema> {
  creature: CompleteCreature
}

/**
 * RelatedMedicalRecordSchema contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedMedicalRecordSchema: z.ZodSchema<CompleteMedicalRecord> = z.lazy(() => MedicalRecordSchema.extend({
  creature: RelatedCreatureSchema,
}))
