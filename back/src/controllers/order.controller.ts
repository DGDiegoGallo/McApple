import { Request, Response } from "express";
import { createOrderService } from "../services/order.service";
import { catchedController } from "../utils/catchedController";

export const createOrder = catchedController(
  async (req: Request, res: Response) => {
    const { products } = req.body;
    const userId = req.body.userId;
    console.log("Creating order for user:", userId, "with products:", products);
    const newOrder = await createOrderService({ userId, products });
    res.send(newOrder);
  }
);
