import ProductItem from "./ProductItem";
import EditProductForm from "./EditProductForm";

export default function ProductList({
  products,
  onEdit,
  onDelete,
  editing,
  onUpdate,
}) {
  if (!products.length) {
    return <p className="text-muted">Aucun produit pour le moment.</p>;
  }

  return (
    <div>
      {products.map((p) =>
        editing?.id === p.id ? (
          <div key={p.id} className="mb-3">
            <EditProductForm
              product={p}
              onCancel={() => onEdit(null)}
              onSubmit={(data) => onUpdate(p.id, data)}
            />
          </div>
        ) : (
          <ProductItem
            key={p.id}
            product={p}
            isEditing={editing?.id === p.id}
            onEdit={() => onEdit(p)}
            onCancel={() => onEdit(null)}
            onDelete={() => onDelete(p.id)}
            onUpdate={onUpdate}
          />
        )
      )}
    </div>
  );
}
