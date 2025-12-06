export default function ProductFilters({
  filters,
  setFilters,
  loadProducts,
  loading,
  categories = [],
}) {
  const handleCategoryChange = (e) => {
    const newCategory = e.target.value || undefined;
    const newFilters = { ...filters, category: newCategory };
    setFilters(newFilters);
    loadProducts(newFilters,false);
  };

  return (
    <div className="card mb-4">
      <div className="card-body">
        <div className="row g-2 align-items-end">
          <div className="col-md-2">
            <label className="form-label">Name</label>
            <input
              className="form-control"
              placeholder="Name"
              value={filters.name || ""}
              onChange={(e) => setFilters({ ...filters, name: e.target.value })}
            />
          </div>
          <div className="col-md-2">
            <label className="form-label">Prix min</label>
            <input
              type="number"
              min={0}
              className="form-control"
              value={filters.minPrice || ""}
              onChange={(e) =>
                setFilters({ ...filters, minPrice: e.target.value })
              }
            />
          </div>
          <div className="col-md-2">
            <label className="form-label">Prix max</label>
            <input
              type="number"
              min={0}
              className="form-control"
              value={filters.maxPrice || ""}
              onChange={(e) =>
                setFilters({ ...filters, maxPrice: e.target.value })
              }
            />
          </div>
          <div className="col-md-2">
            <label className="form-label">Category</label>
            <select
              className="form-select"
              value={filters.category || ""}
              onChange={handleCategoryChange}
            >
              <option value="">Toutes</option>
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
          <div className="col-md-4 d-flex gap-3">
            <button
              className="btn btn-primary flex-grow-1"
              onClick={() => loadProducts(filters)}
            >
              Recherche
            </button>
            <button
              className="btn btn-outline-secondary flex-grow-1"
              onClick={() => loadProducts({}, true)}
            >
              Reset
            </button>
          </div>
          <div className="col-md-2 text-end">
            {loading && (
              <div className="spinner-border text-primary mt-3" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
