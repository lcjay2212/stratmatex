import { z } from "zod";

export const materialSchema = z.object({
  id: z.string(),
  name: z.string(),
  image: z.string(),
  seller: z.string(),
  bidId: z.string(),
  activeBid: z.number(),
  currentPrice: z.number(),
  volume: z.string(),
  origin: z.string(),
  basePrice: z.number(),
});

export type Material = z.infer<typeof materialSchema>;
