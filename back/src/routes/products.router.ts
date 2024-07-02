import { Router } from "express";
import { getProducts } from "../controllers/product.controller";
import { reduceProductStock } from "../controllers/product.controller";

const router = Router();

router.get("/", getProducts);
router.post("/:id/reduce-stock", reduceProductStock);

export default router;
