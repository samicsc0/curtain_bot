import { z } from "zod";
import { CurtainCategory } from "../../../domain/value-objects";

const CreateCurtainValidator = z.object({
  curtain_name: z.string().min(3),
  curtain_category: z.enum([CurtainCategory.Flat, CurtainCategory.Patterned]),
  curtain_image_url: z.string().url(),
  curtain_base_price: z.number(),
  curtain_color: z.string().min(3),
  curtain_description: z.string().min(10),
});

const UpdateCurtainValidator = z.object({
  curtain_name: z.string().min(3),
  curtain_category: z.enum([CurtainCategory.Flat, CurtainCategory.Patterned]),
  curtain_base_price: z.number(),
  curtain_color: z.string().min(3),
  curtain_description: z.string().min(10),
});

const UpdateCurtainStatusValidator = z.object({
  is_active: z.boolean(),
});
const UpdateCurtainImageValidator = z.object({
  curtain_image_url: z.string().url(),
});

export {
  CreateCurtainValidator,
  UpdateCurtainValidator,
  UpdateCurtainStatusValidator,
  UpdateCurtainImageValidator,
};
