import { Request, Response } from "express";
import { catchedController } from "../utils/catchedController";
import { getProductsService } from "../services/products.service";
import { ProductRepository } from "../repositories/product.repository";

export const getProducts = catchedController(
  async (req: Request, res: Response) => {
    const products = await getProductsService();
    res.json(products);
  }
);

export const reduceProductStock = async (req: Request, res: Response) => {
  const productId = parseInt(req.params.id);
  const { quantity } = req.body;

  try {
    const product = await ProductRepository.findOneBy({ id: productId });
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    product.stock -= quantity;
    await ProductRepository.save(product);

    res.status(200).json({ message: "Stock updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};
