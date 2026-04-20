import { Router } from "express";

const router = Router();

const CATEGORIES = ["Indoor", "Outdoor", "Sukulen", "Pot & Aksesoris"];

router.get("/", (req, res) => {
  res.json(CATEGORIES);
});

export default router;
