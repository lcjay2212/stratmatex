import { z } from "zod";

export const shippingStatus = z.enum(["Shipped", "In transit"]);

export const shippingSchema = z.object({
  id: z.string(),
  material_name: z.string(),
  volume: z.string(),
  date: z.string(),
  origin: z.string(),
  drop: z.string(),
  amount: z.string(),
  reference_number: z.string(),
  status: shippingStatus,
});

export type Shipping = z.infer<typeof shippingSchema>;
