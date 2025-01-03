import { z } from "zod";

const CreateVisitorValidation = z.object({
  telegramId: z.string().min(3),
});
export { CreateVisitorValidation };
