import { useEffect, useState, useMemo } from "react";
import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../api/products";
import ProductList from "../components/ProductList";
import AddProductForm from "../components/AddProductForm";
import ConfirmModal from "../components/confirmModal";
import ProductFilters from "../components/ProductFilters";
import PaginationFooter from "../components/PaginationFooter";
export default function ProductManager() {
  const [productsData, setProductsData] = useState({
    products: [],
  });
  const [editing, setEditing] = useState(null);
  const [filters, setFilters] = useState({});
  const [deleteModal, setDeleteModal] = useState({ open: false, id: null });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState();
  const [visible, setVisible] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // **************** category
  const categories = useMemo(() => {
    const list = (productsData.products || [])
      .map((p) => p.category)
      .filter((c) => c !== undefined && c !== null && c !== "");
    return Array.from(new Set(list.map((c) => String(c)))).sort();
  }, [productsData.products]);
  /***********************/
  useEffect(() => {
    if (status === "success" || status === "error") {
      setVisible(true);
      const timer = setTimeout(() => {
        setVisible(false);
        setMessage("");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [status, message]);

  useEffect(() => {
    loadProducts();
  }, []);

  useEffect(() => {
    loadProducts({}, false);
  }, [currentPage]);

  async function loadProducts(newFilters = {}, isReset = false) {
    setLoading(true);
    try {
      if (isReset) {
        setFilters({});
        setCurrentPage(1);
        const data = await getProducts({ page: 1, limit: 5 });
        const resp = data.data || data;
        setProductsData(resp);
        setTotalPages(
          resp.pagination?.totalPages ||
            Math.max(1, Math.ceil((resp.total || 0) / (resp.limit || 5)))
        );
        return;
      }

      if (
        newFilters.maxPrice &&
        newFilters.minPrice &&
        Number(newFilters.minPrice) > Number(newFilters.maxPrice)
      ) {
        alert("le prix max doit être supérieur au prix min !");
        return;
      }

      const merged = {
        ...filters,
        ...newFilters,
        page: currentPage,
        limit: 5,
      };
      setFilters(merged);

      const data = await getProducts(merged);
      const resp = data.data || data;
      setProductsData(resp);
      setTotalPages(
        resp.pagination?.totalPages ||
          Math.max(
            1,
            Math.ceil((resp.total || 0) / (resp.limit || merged.limit || 5))
          )
      );
    } catch (error) {
      setStatus("error");
      setMessage("Erreur chargement produits");
    } finally {
      setLoading(false);
    }
  }

  async function handleCreate(data) {
    try {
      await createProduct({
        ...data,
        name: data.name,
        price: data.price,
        stock: data.stock,
        category: data.category,
      });
      setStatus("success");
      setMessage("Produit est bien créer!");
      loadProducts(filters);
    } catch {
      setStatus("error");
      setMessage("Error lors de la création de produit");
      alert("Erreur création");
    }
  }

  async function handleUpdate(id, data) {
    try {
      console.log("Début de la mise à jour:", { id, data });
      await updateProduct(id, data);
      await loadProducts(filters);
      setStatus("success");
      setMessage("Mise à jour réussie !");
      setEditing(null);
      console.log("Mise à jour réussie");
    } catch (error) {
      setStatus("error");
      setMessage("Echéc lors de la mise à jour de produit");
      console.error("Échec de la mise à jour:", error);
    }
  }

  function handleDeleteClick(id) {
    setDeleteModal({ open: true, id });
  }

  async function confirmDelete() {
    try {
      await deleteProduct(deleteModal.id);
      loadProducts(filters);
      setStatus("success");
      setMessage("Produit bien supprimer !");
    } catch {
      setStatus("error");
      setMessage("Echéc lors de la suppression");
      alert("Erreur suppression");
    }
    setDeleteModal({ open: false, id: null });
  }

  return (
    <div className="min-vh-100 bg-light py-4">
      <div className="container">
        <header className="mb-4 text-center">
          <h1 className="fw-bold">Gestion des produits</h1>
          <p className="text-muted">
            CRUD complet connecté à votre backend Node.js Express / Mysql
          </p>
          {status && message && (
            <div
              className={`alert alert-${
                status === "success" ? "success" : "danger"
              } 
       shadow-sm p-2 text-sm max-w-xs mx-auto inline-block mb-3`}
            >
              <i
                className={`bi bi-${
                  status === "success" ? "check-circle" : "x-circle"
                } 
        me-2 text-lg`}
              ></i>
              <span>{message}</span>
            </div>
          )}
        </header>

        {/* Filtres */}
        <ProductFilters
          filters={filters}
          setFilters={setFilters}
          loadProducts={loadProducts}
          loading={loading}
          categories={categories}
        />
        {/* Add Product */}
        <AddProductForm onCreate={handleCreate} />

        <div className="card">
          <div className="card-header d-flex justify-content-between align-items-center">
            <h2 className="h5 mb-0">Liste des produits</h2>
            <span className="text-muted">
              Total : <strong>{productsData.total}</strong>
            </span>
          </div>

          <div className="card-body">
            <ProductList
              products={productsData.products}
              onEdit={setEditing}
              onDelete={handleDeleteClick}
              editing={editing}
              onUpdate={handleUpdate}
            />
          </div>
        </div>

        <ConfirmModal
          show={deleteModal.open}
          title="Confirmer la suppression"
          message="Voulez-vous vraiment supprimer ce produit ?"
          onCancel={() => setDeleteModal({ open: false, id: null })}
          onConfirm={confirmDelete}
        />
        <PaginationFooter
          currentPage={currentPage}
          totalPages={totalPages}
          loading={loading}
          setCurrentPage={setCurrentPage}
          productsCount={productsData.products?.length || 0}
        />
      </div>
    </div>
  );
}
