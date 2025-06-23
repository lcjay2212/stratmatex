import { z } from "zod";

export const bidSchema = z.object({
  active_bids: z.number(),
  base_price: z.string(),
  bidding_id: z.number(),
  current_price: z.string(),
  image: z.string().nullable(),
  material_id: z.string(),
  material_name: z.string(),
  minimum_increment: z.number().nullable(),
  resources: z.any().nullable(),
  start_date: z.string(),
  status: z.string(),
  trader: z.string(),
});

export type Bid = z.infer<typeof bidSchema>;
