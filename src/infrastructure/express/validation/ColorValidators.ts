import { z } from "zod";

const createColorValidation = z.object({
  color_name: z.string().min(3),
});
export { createColorValidation };
