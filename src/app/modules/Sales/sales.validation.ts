import { z } from "zod";

export const createSalesValidation = z.object({
  body: z.object({
    productId: z.string(),
    quantity: z.number(),
    buyerName: z.string(),
  }),
});
