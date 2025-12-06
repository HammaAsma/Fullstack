import { useState } from "react";
import { Plus } from "lucide-react";
export default function AddProductForm({ onCreate }) {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    category: "",
    stock: 0,
  });

  function handleSubmit(e) {
    e.preventDefault();
    if (!formData.name.trim()) return alert("Nom obligatoire");
    if (!formData.price) return alert("prix obligatoire");
    onCreate({ name: formData.name, ...formData });
    setFormData({
      name: "",
      price: "",
      category: "",
      stock: 0,
    });
  }

  return (
    <form onSubmit={handleSubmit} className="mb-4 card p-3">
      <h3 className="mb-3">Ajouter un produit</h3>

      <div className="row g-2">
        <div className="col-md-3">
          <input
            className="form-control"
            placeholder="Nom"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        </div>
        <div className="col-md-2">
          <input
            className="form-control"
            placeholder="Prix"
            type="number"
            value={formData.price}
            onChange={(e) =>
              setFormData({ ...formData, price: e.target.value })
            }
          />
        </div>
        <div className="col-md-1">
          <input
            className="form-control"
            type="number"
            min={0}
            placeholder="stock"
            value={formData.stock}
            onChange={(e) =>
              setFormData({ ...formData, stock: e.target.value })
            }
          />
        </div>
        <div className="col-md-4">
          <input
            className="form-control"
            type="texte"
            placeholder="category"
            value={formData.category}
            onChange={(e) =>
              setFormData({ ...formData, category: e.target.value })
            }
          />
        </div>
        <div className="col-md-2">
          <button type="submit" className="btn btn-primary">
            <Plus size={24} />
          </button>
        </div>
      </div>
    </form>
  );
}
