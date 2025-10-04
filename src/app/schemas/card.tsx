import { z } from "zod";

export const schema = z.object({
  id: z.string(),
  description: z.string(),
  title: z.string(),
  percentage: z.string(),
  footer_main: z.string(),
  footer_sub: z.string(),
});
