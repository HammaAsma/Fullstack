import { Edit3, Trash2 } from "lucide-react";

export default function ProductItem({
  product,
  isEditing,
  onEdit,
  onCancel,
  onDelete,
  onUpdate,
}) {
  if (isEditing) {
    return (
      <div>
        <EditProductForm
          product={product}
          onCancel={onCancel}
          onSubmit={(data) => onUpdate(product.id, data)}
        />
      </div>
    );
  }

  return (
    <div className="mb-3">
      <div className="card h-100 shadow-sm">
        <div className="card-body d-flex justify-content-between align-items-start">
          <div>
            <h5 className="card-title mb-1">{product.name}</h5>
            <p className="text-muted small mb-2">
              {product.category || "Aucune category"}
            </p>
            <div className="small text-muted mb-2">
              <span className="me-3">
                Category : {product.category || "Non définie"}
              </span>
              <span>Stock : {product.stock || 0}</span>
            </div>
            <div className="fw-bold text-success fs-5">{product.price} €</div>
          </div>
        </div>
        <div className="mt-auto d-flex justify-content-end gap-2">
          <button
            onClick={onEdit}
            className="btn btn-outline-primary btn-sm"
            title="Modifier"
          >
            <Edit3 size={20} strokeWidth={2} />
          </button>
          <button
            onClick={onDelete}
            className="btn btn-outline-danger btn-sm"
            title="Supprimer"
          >
            <Trash2 size={20} strokeWidth={2} />
          </button>
        </div>
      </div>
    </div>
  );
}
