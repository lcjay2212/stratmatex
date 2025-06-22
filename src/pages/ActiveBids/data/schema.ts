import { z } from "zod";

export const bidSchema = z.object({
  bidId: z.string(),
  materials: z.string(),
  minimumIncrement: z.number(),
  trader: z.string(),
  basePrice: z.number(),
  timer: z.object({
    startTime: z.string(),
    endTime: z.string(),
  }),
  currentPrice: z.number(),
  action: z.string(),
});

export type Bid = z.infer<typeof bidSchema>;
