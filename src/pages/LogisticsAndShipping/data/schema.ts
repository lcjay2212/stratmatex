import { z } from "zod";

export const shippingStatus = z.enum(["Shipped", "In transit"]);

export const shippingSchema = z.object({
  shippingId: z.string(),
  materials: z.string(),
  volume: z.string(),
  date: z.string(),
  origin: z.string(),
  dropLocation: z.string(),
  amount: z.number(),
  status: shippingStatus,
});

export type Shipping = z.infer<typeof shippingSchema>;
