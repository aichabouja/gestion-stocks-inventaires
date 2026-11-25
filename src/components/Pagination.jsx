import "./Pagination.css";

function Pagination({ currentPage, totalPages, totalItems, onPageChange }) {
  if (totalItems === 0) {
    return null;
  }

  return (
    <div className="pagination">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Précédent
      </button>

      <span>
        Page {currentPage} sur {totalPages} ({totalItems} éléments)
      </span>

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Suivant
      </button>
    </div>
  );
}

export default Pagination;