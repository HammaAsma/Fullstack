import express from "express";
import {
  getProducts,
  getProductsByID,
  create,
  replace,
  update,
  remove,
} from "../controllers/products.controller.js";
const app = express.Router();
/**
 * @swagger
 * /api/products:
 *   get:  // ← Ajoutez 2 espaces ici
 *     summary: Get all products
 *     tags: [products]
 *     responses:
 *       200:
 *         description: List of products
 */
app.get("/", getProducts);
/**
 * @swagger
 * /api/products/{id}:
 *   get:
 *     summary: Get a product by ID
 *     tags: [products]
 *     parameters:
 *       - in: path     // ← Ajoutez 2 espaces avant le tiret
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: product found
 *       404:
 *         description: product not found
 */
app.get("/:id", getProductsByID);

app.post("/", create);

app.put("/:id", replace);
app.patch("/:id", update);

app.delete("/:id", remove);
export default app;
