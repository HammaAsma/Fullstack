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
app.get("/", getProducts);
app.get("/:id", getProductsByID);

app.post("/", create);

app.put("/:id", replace);
app.patch("/:id", update);

app.delete("/:id", remove);
export default app;
