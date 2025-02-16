import { Router } from "express";
import verifyToken from '../middleware/verify.token';
import { getUserPreferences, updateUserPreferences } from "../controllers/preferences.controller";

const router = Router();

router.get('/', verifyToken, getUserPreferences);
router.put('/', verifyToken, updateUserPreferences);

export default router;
