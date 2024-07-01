import React from "react";
import Card from "../Card";
import { useState, useEffect } from "react";
import { useFieldContext } from "../../contexts/FieldContext";
import { useAuthContext } from "../../contexts/AuthContext";
import { toast } from "react-hot-toast";

const Completed = () => {
  const [files, setFiles] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalFiles, setTotalFiles] = useState(0);
  const { value } = useFieldContext();
  const { authUser } = useAuthContext();
  const limit = 9;

  const fetchPendingFiles = async (page) => {
    const offset = (page - 1) * limit;
    try {
      const res = await fetch("/api/file/completed", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          limit,
          offset,
        }),
      });
      const data = await res.json();
      setFiles(data.files);
      setTotalFiles(data.totalFiles);
      // console.log(data)
    } catch (error) {
      toast.error("Error fetching files");
      console.log(error)
    }
  }

  useEffect(() => {
    fetchPendingFiles(currentPage);
  }, [value, authUser, currentPage]);

  const totalPages = Math.ceil(totalFiles / limit);

  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const getPageNumbers = () => {
    let pages = [];
    if (currentPage > 1) {
      pages.push(currentPage - 1);
    }
    pages.push(currentPage);
    if (currentPage < totalPages) {
      pages.push(currentPage + 1);
    }
    return pages;
  };

  return (
    <div className="h-1/3 py-3">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {files.map((file) => (
            <Card key={file._id} file={file} />
          ))}
        </div>
      </div>
      <ol className="flex justify-center gap-1 text-xs font-medium mt-4">
        {currentPage > 1 && (
          <li>
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              className="inline-flex size-8 cursor-pointer items-center justify-center rounded border border-gray-100 bg-white text-gray-900"
            >
              <span className="sr-only">Prev Page</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-3 w-3"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </li>
        )}

        {getPageNumbers().map((page, index) => (
          <li key={index}>
            <button
              onClick={() => handlePageChange(page)}
              className={`block size-8 rounded border border-gray-100 text-center leading-8 ${currentPage === page ? 'bg-blue-600 text-white' : 'bg-white text-gray-900'}`}
            >
              {page}
            </button>
          </li>
        ))}

        {currentPage < totalPages && (
          <li>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              className="inline-flex size-8 items-center justify-center rounded border border-gray-100 bg-white text-gray-900"
            >
              <span className="sr-only">Next Page</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-3 w-3"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </li>
        )}
      </ol>
    </div>
  );
};

export default Completed;
