import express from "express";

import {
  registerController,
  loginController,
  getMeController,
} from "../controller/userController.js";
import { authenticate } from "../middlewares/auth.js";

const router = express.Router();

// POST /api/auth/register - Inscription
router.post("/register", registerController);

// POST /api/auth/login - Connexion
router.post("/login", loginController);

// GET /api/auth/me - Profil de l'utilisateur connecté (protégé)
router.get("/me", authenticate, getMeController);

/*Gestion utilisateur
router.get("/users", getAllUsers);
router.get("/user/:id", getUserById);
router.put("/update/user/:id", update);
router.delete("/user/:id", deleteUser);
*/

export default router;
