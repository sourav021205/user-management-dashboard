interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  return (
    <div className="pagination">
      <button
        disabled={currentPage === 1}
        onClick={function () {
          onPageChange(currentPage - 1);
        }}
      >
        Previous
      </button>

      <span>
        Page {currentPage} of {totalPages}
      </span>

      <button
        disabled={currentPage >= totalPages}
        onClick={function () {
          onPageChange(currentPage + 1);
        }}
      >
        Next
      </button>
    </div>
  );
}

export default Pagination;
