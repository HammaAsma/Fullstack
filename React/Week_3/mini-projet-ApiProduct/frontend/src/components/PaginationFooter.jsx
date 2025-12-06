export default function PaginationFooter({
  currentPage,
  totalPages,
  loading,
  setCurrentPage,
  productsCount,
}) {
  return (
    <div className="card-footer d-flex justify-content-between align-items-center">
      <span className="text-muted">
        Page {currentPage} sur {totalPages} ({productsCount} produits)
      </span>
      <div className="btn-group">
        <button
          className="btn btn-outline-secondary"
          disabled={currentPage === 1 || loading}
          onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
        >
          Précédent
        </button>
        <button className="btn btn-secondary disabled">
          {currentPage} / {totalPages}
        </button>
        <button
          className="btn btn-outline-secondary"
          disabled={currentPage === totalPages || loading}
          onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
        >
          Suivant
        </button>
      </div>
    </div>
  );
}
