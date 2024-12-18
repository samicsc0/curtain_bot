import { PrismaClient } from "@prisma/client";
import { CurtainRepository } from "../../repository";
import {
  GetAllCurtainsUseCase,
  GetCurtainByIdUseCase,
} from "../../usecase/Curtain";
import { CurtainCategory } from "../../domain/value-objects";
import { CurtainDto } from "../../domain/DTOs/CurtainDTO";

// DEPENDENCIS
const prisma = new PrismaClient();
const curtainRepository = new CurtainRepository(prisma);
const getCurtainByIdUseCase = new GetCurtainByIdUseCase(curtainRepository);
const getAllCurtains = new GetAllCurtainsUseCase(curtainRepository);

async function getCurtainById(curtainId: string) {
  try {
    const curtain = await getCurtainByIdUseCase.execute(curtainId);
    return curtain;
  } catch (error) {
    return (error as Error).message;
  }
}
function getAll(page = 1, category: unknown) {
  try {
    const curtains = getAllCurtains.execute(category as CurtainCategory, page);
    return curtains;
  } catch (error) {
    throw new Error((error as Error).message);
  }
}
function generateCurtainMessage(curtain: CurtainDto) {
  const availability = curtain.is_active ? "✅ Available" : "❌ Out of Stock";
  const message = `
🎨 **Curtain ID**: ${curtain.curtain_id}

🪟 **Curtain Name**: ${curtain.curtain_name}

🛋️ **Category**: ${curtain.curtain_category}

🖼️ **Color**: ${curtain.curtain_color}

💵 **Price**: ${curtain.curtain_base_price.toFixed(2)} ETB

📄 **Description**: 

_${curtain.curtain_description}_

🛒 **Availability**: ${availability}

📞 **+25191112131415**

---

📷 ![Curtain Image](${curtain.curtain_image_url})
  `;

  return message;
}

function generateErrorMessage(error_message = "Sorry, An Error Occured.") {
  const message = `
❗ **Error**: 
_${error_message}_

If you need assistance, feel free to contact us at: 
📞 **+25191112131415**
  `;

  return message;
}

export { getCurtainById, getAll, generateCurtainMessage, generateErrorMessage };
