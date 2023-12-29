import React, { useState } from 'react'
import './style.css'
const Pagination = ({ totalItems, onPageChange, itemsPerPage }) => {
    let ipp = itemsPerPage
    if (!ipp) {
        ipp = 5
    }
    const totalPages = Math.ceil(totalItems / ipp);
    const [currentPage, setCurrentPage] = useState(1);

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
        onPageChange(newPage);
    };

    return (
        <div className="pagination">
            <button
                disabled={currentPage === 1}
                onClick={() => handlePageChange(currentPage - 1)}
            >
                Previous
            </button>
            <span>{`Page ${currentPage} of ${totalPages}`}</span>
            <button
                disabled={currentPage === totalPages}
                onClick={() => handlePageChange(currentPage + 1)}
            >
                Next
            </button>
        </div>
    );
};

export default Pagination