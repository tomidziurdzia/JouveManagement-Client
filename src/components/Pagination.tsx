const Pagination = ({
  handlePrev,
  handleNext,
  page,
  lastPage,
}: {
  handlePrev: () => void;
  handleNext: () => void;
  page: number;
  lastPage: number;
}) => {
  return (
    <div className="flex justify-center py-2 gap-4 items-center">
      <button
        onClick={handlePrev}
        disabled={page === 1}
        className="disabled:opacity-10"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 30 30"
          strokeWidth={3}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
          />
        </svg>
      </button>
      <p className="text-2xl mb-1">{page}</p>
      <button
        onClick={handleNext}
        disabled={page === lastPage ? true : false}
        className="disabled:opacity-10"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 30 30"
          strokeWidth={3}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
          />
        </svg>
      </button>
    </div>
  );
};

export { Pagination };
