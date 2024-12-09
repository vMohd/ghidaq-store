import React from 'react';

const Pagination = ({ currentPage, totalPages, handlePageChange }) => {
  return (
    <nav>
      <ul className="pagination justify-content-center">
        {currentPage > 1 && (
          <li className="page-item">
            <button
              className="page-link"
              onClick={() => handlePageChange(currentPage - 1)}
            >
              {"Previous"}
            </button>
          </li>
        )}

        {[...Array(totalPages)].map((_, index) => (
          <li
            key={index}
            className={`page-item ${currentPage === index + 1 ? "active" : ""}`}
          >
            <button
              className="page-link"
              onClick={() => handlePageChange(index + 1)}
            >
              {index + 1}
            </button>
          </li>
        ))}

        {currentPage < totalPages && (
          <li className="page-item">
            <button
              className="page-link"
              onClick={() => handlePageChange(currentPage + 1)}
            >
              {"Next"}
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Pagination;
