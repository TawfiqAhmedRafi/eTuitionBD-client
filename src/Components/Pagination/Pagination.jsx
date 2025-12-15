const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;

  const pages = [];
  const delta = 1;

  const rangeStart = Math.max(2, currentPage - delta);
  const rangeEnd = Math.min(totalPages - 1, currentPage + delta);

  pages.push(1);

  if (rangeStart > 2) pages.push("...");

  for (let i = rangeStart; i <= rangeEnd; i++) {
    pages.push(i);
  }

  if (rangeEnd < totalPages - 1) pages.push("...");

  if (totalPages > 1) pages.push(totalPages);

  return (
    <div className="flex items-center justify-center gap-2 mt-10 flex-wrap">
      {/* Prev */}
      <button
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        className="btn btn-sm btn-secondary disabled:btn-ghost"
      >
        ← Prev
      </button>

      {/* Page Numbers */}
      {pages.map((page, idx) =>
        page === "..." ? (
          <span
            key={idx}
            className="px-2 text-base-content/60 select-none"
          >
            …
          </span>
        ) : (
          <button
            key={idx}
            onClick={() => onPageChange(page)}
            className={`btn btn-sm min-w-10 ${
              page === currentPage
                ? "btn-primary"
                : "btn-ghost hover:btn-secondary"
            }`}
          >
            {page}
          </button>
        )
      )}

      {/* Next */}
      <button
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        className="btn btn-sm btn-secondary disabled:btn-ghost"
      >
        Next →
      </button>
    </div>
  );
};

export default Pagination;
