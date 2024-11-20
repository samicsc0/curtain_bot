import { Router } from 'express';
import {
  createAdmin,
  getAdminById,
  getAllAdmins,
  updateAdminEmail,
  updateAdminPassword,
  AdminStatus,
} from '../controllers/AdminController';

const adminRouter = Router();

adminRouter.post('/', createAdmin);
adminRouter.get('/', getAllAdmins);
adminRouter.get('/:id', getAdminById);
adminRouter.patch('/:id/email', updateAdminEmail);
adminRouter.patch('/:id/password', updateAdminPassword);
adminRouter.patch('/:id/status', AdminStatus);
export default adminRouter;
