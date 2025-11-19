import express from 'express'
import { deletedPassword, getAllPass, savePassword, updatePassword } from '../controllers/passwordController.js';

const router = express.Router()

router.get("/", getAllPass );
router.post("/", savePassword);
router.put("/:id",updatePassword);
router.delete("/:id", deletedPassword);

export default router;