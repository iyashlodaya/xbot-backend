import { Router } from "express";

import { createUser } from "../controllers/auth/create.user";
import { login } from "../controllers/auth/login";

const router = Router();

router.post("/register", createUser);
router.post("/login", login);

export default router;
