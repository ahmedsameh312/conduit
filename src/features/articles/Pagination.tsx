type PaginationProps = {
  currentPage: number;
  totalArticles: number;
  onPageChange: (page: number) => void;
};

export default function Pagination({
  currentPage,
  totalArticles,
  onPageChange,
}: PaginationProps) {
  const totalPages = Math.ceil(totalArticles / 10);

  return (
    <div className="mt-8 flex flex-wrap">
      {Array.from({ length: totalPages }, (_, index) => {
        const page = index + 1;
        const active = currentPage === page;
        return (
          <button
            key={index + 1}
            disabled={active}
            onClick={() => onPageChange(index + 1)}
            className={`border px-4 py-2 rounded-full trasition ${
              active
                ? "border-green-500 bg-green-500 text-white"
                : "border-gray-300 bg-gray-50 text-green-500 hover:bg-gray-100"
            }`}
          >
            {page}
          </button>
        );
      })}
    </div>
  );
}
