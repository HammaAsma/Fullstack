import { useState } from "react";

export default function EditProductForm({ product, onCancel, onSubmit }) {
  const [formData, setFormData] = useState({
    name: product.name || "",
    price: product.price || "",
    category: product.category || "",
    stock: product.stock || 0,
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "price" || name === "stock" ? Number(value) : value,
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit(formData);
  }

  return (
    <form onSubmit={handleSubmit} className="card p-3 mb-3">
      <h5>Modifier le produit</h5>
      <div className="row g-3">
        <div className="col-md-3">
          <input
            className="form-control"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Nom"
            required
          />
        </div>
        <div className="col-md-2">
          <input
            className="form-control"
            name="price"
            type="number"
            step="0.01"
            value={formData.price}
            onChange={handleChange}
            placeholder="Prix"
            required
          />
        </div>
        <div className="col-md-2">
          <input
            className="form-control"
            name="stock"
            type="number"
            min={0}
            value={formData.stock}
            onChange={handleChange}
            placeholder="Stock"
            required
          />
        </div>
        <div className="col-md-2">
          <input
            className="form-control"
            name="category"
            value={formData.category}
            onChange={handleChange}
            placeholder="category"
          />
        </div>
        <div className="col-md-2">
          <button type="submit" className="btn btn-success btn-sm w-100">
            Enregistrer
          </button>
        </div>
        <div className="col-md-1">
          <button
            type="button"
            className="btn btn-outline-secondary btn-sm w-100"
            onClick={onCancel}
          >
            Annuler
          </button>
        </div>
      </div>
    </form>
  );
}
