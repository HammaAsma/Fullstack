import {
  FindAllProduct,
  FindProduct,
  createProduct,
  removeProduct,
  replaceProduct,
  updateProduct,
} from "../models/products.models.js";

//fct de validate
const validateProduct = (product) => {
  if (!product.name || typeof product.name !== "string")
    throw new Error("le nom est obligatoire!");
  if (isNaN(product.price) || product.price <= 0)
    throw new Error("le prix doit être positif >0");
  if (!Number.isInteger(product.stock) || product.stock < 0)
    throw new Error("stock doit être positif >=0");
};

export async function getProducts(req, res) {
  const filters = {
    name: req.query.name,
    minPrice: req.query.minPrice,
    maxPrice: req.query.maxPrice,
    category: req.query.category,
    page: req.query.page,
    limit: req.query.limit,
  };
  if (
    filters.minPrice !== undefined &&
    filters.maxPrice !== undefined &&
    filters.minPrice !== "" &&
    filters.maxPrice !== "" &&
    Number(filters.minPrice) > Number(filters.maxPrice)
  ) {
    return res
      .status(400)
      .json({ error: "minPrice doit être inférieur ou égal à maxPrice" });
  }
  try {
    const listProducts = await FindAllProduct(filters);
    res.status(200).json(listProducts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function getProductsByID(req, res) {
  try {
    const product = await FindProduct(Number(req.params.id));
    if (!product) return res.status(404).json({ error: "Product Not Found" });
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function create(req, res) {
  try {
    validateProduct(req.body);
    const product = await createProduct(req.body);
    res.status(201).json({ product });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

export async function replace(req, res) {
  try {
    const product = await FindProduct(req.params.id);
    if (!product) return res.status(404).json({ error: "Product non Trouve!" });
    validateProduct(req.body);
    await replaceProduct(req.params.id, req.body);
    res.status(200).json({ message: "Product est bien modifie" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

export async function update(req, res) {
  try {
    const product = await FindProduct(req.params.id);
    if (!product) return res.status(404).json({ error: "Product non Trouve!" });
    validateProduct(req.body);
    await updateProduct(req.params.id, req.body);
    res.status(200).json({ message: "Product partiellement modifie" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

export async function remove(req, res) {
  try {
    const product = await FindProduct(req.params.id);
    if (!product) return res.status(404).json({ error: "Product non Trouve!" });

    await removeProduct(req.params.id);
    res.status(204).json({ message: "Le Produit est bien supprimer" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
