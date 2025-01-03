import { PrismaClient } from "@prisma/client";
import {
  ColorRepository,
  CurtainRepository,
  VisitorRepository,
} from "../../repository";
import {
  GetAllCurtainsUseCase,
  GetCurtainByIdUseCase,
} from "../../usecase/Curtain";
import { CurtainCategory } from "../../domain/value-objects";
import { CurtainDto } from "../../domain/DTOs/CurtainDTO";
import { CreateVisitorUseCase } from "../../usecase/Visitor";
import { SessionData } from "./types";
import { GetAllColorUseCase } from "../../usecase/Color";

// DEPENDENCIS
const prisma = new PrismaClient();
const curtainRepository = new CurtainRepository(prisma);
const visitorRepository = new VisitorRepository(prisma);
const colorRepository = new ColorRepository(prisma);
const getCurtainByIdUseCase = new GetCurtainByIdUseCase(curtainRepository);
const getAllCurtains = new GetAllCurtainsUseCase(curtainRepository);
const registerVistiorUseCase = new CreateVisitorUseCase(visitorRepository);
const getAllCOlorsUseCase = new GetAllColorUseCase(colorRepository);

async function resgisterVisit(telegramId: string) {
  await registerVistiorUseCase.execute(telegramId);
}
function generateInitialSession(): SessionData {
  return {
    page: 1,
    color: "",
    style: "",
  };
}
async function getAllColors() {
  return await getAllCOlorsUseCase.execute();
}
async function getCurtainById(curtainId: string) {
  try {
    const curtain = await getCurtainByIdUseCase.execute(curtainId);
    return curtain;
  } catch (error) {
    return (error as Error).message;
  }
}
function getAll(page = 1, category: unknown, color: string) {
  try {
    const curtains = getAllCurtains.execute(
      category as CurtainCategory,
      page,
      color
    );
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

🖼️ **Color**: ${curtain.curtain_color.color_name}

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

export {
  getCurtainById,
  getAll,
  generateCurtainMessage,
  generateErrorMessage,
  resgisterVisit,
  generateInitialSession,
  getAllColors,
};
