export default function ConfirmModal({
  show,
  title,
  message,
  onCancel,
  onConfirm,
}) {
  if (!show) return null;

  return (
    <div className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center bg-dark bg-opacity-50">
      <div className="bg-white p-4 rounded shadow" style={{ minWidth: 320 }}>
        <h5 className="mb-3">{title}</h5>
        {message && <p className="mb-4">{message}</p>}
        <div className="d-flex justify-content-end gap-2">
          <button className="btn btn-secondary me-2" onClick={onCancel}>
            Annuler
          </button>
          <button className="btn btn-danger" onClick={onConfirm}>
            Supprimer
          </button>
        </div>
      </div>
    </div>
  );
}
