import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export async function getProducts(filters = {}) {
  try {
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== "") {
        params.append(key, value);
      }
    });

    const { data } = await api.get(`/products?${params}`);
    return data;
  } catch (error) {
    console.error("Erreur lors de la récupération des produits:", error);
    throw error;
  }
}

export async function createProduct(productData) {
  try {
    const dataToSend = {
      ...productData,
      name: productData.name,
      price: Number(productData.price),
      stock: Number(productData.stock) || 0,
      category: productData.category || null,
    };

    const { data } = await api.post("/products", dataToSend);
    return data;
  } catch (error) {
    console.error("Erreur lors de la création du produit:", error);
    throw error;
  }
}

export async function updateProduct(id, productData) {
  try {
    const dataToSend = {
      ...productData,
      name: productData.name,
      price: Number(productData.price),
      stock: Number(productData.stock) || 0,
    };

    const { data } = await api.put(`/products/${id}`, dataToSend);
    return data;
  } catch (error) {
    console.error("Erreur lors de la mise à jour du produit:", error);
    throw error;
  }
}

export async function deleteProduct(id) {
  try {
    const { data } = await api.delete(`/products/${id}`);
    return data;
  } catch (error) {
    console.error("Erreur lors de la suppression du produit:", error);
    throw error;
  }
}
