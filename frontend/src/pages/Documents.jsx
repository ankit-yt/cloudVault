import React, { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { FiFile, FiClock, FiDownload, FiFilter, FiChevronDown } from "react-icons/fi";
import { FaFilePdf, FaFileWord, FaFilePowerpoint } from "react-icons/fa";

function Document() {
  const { getFiles, files } = useOutletContext();
  const [documentFiles, setDocumentFiles] = useState([]);
  const [sortOption, setSortOption] = useState("newest");
  const [filterOption, setFilterOption] = useState("all");
  const [showSortDropdown, setShowSortDropdown] = useState(false);
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);

  

  useEffect(() => {
    const filteredFiles = Object.entries(files)
      .filter(([fileType]) => {
        if (filterOption === "all") return fileType === "pptx" || fileType === "docx" || fileType === "pdf";
        return fileType === filterOption;
      })
      .flatMap(([_, fileList]) => fileList);

    const sortedFiles = [...filteredFiles].sort((a, b) => {
      switch (sortOption) {
        case "name-asc":
          return a.name.localeCompare(b.name);
        case "name-desc":
          return b.name.localeCompare(a.name);
        case "newest":
          return new Date(b.created_at) - new Date(a.created_at);
        case "oldest":
          return new Date(a.created_at) - new Date(b.created_at);
        case "size-asc":
          return a.size - b.size;
        case "size-desc":
          return b.size - a.size;
        default:
          return 0;
      }
    });

    setDocumentFiles(sortedFiles);
  }, [files, sortOption, filterOption]);

  const getDocumentIcon = (fileType) => {
    switch (fileType) {
      case "pdf":
        return <FaFilePdf className="text-red-500 text-4xl" />;
      case "docx":
        return <FaFileWord className="text-blue-500 text-4xl" />;
      case "pptx":
        return <FaFilePowerpoint className="text-orange-500 text-4xl" />;
      default:
        return <FiFile className="text-gray-500 text-4xl" />;
    }
  };

  return (
    <div className="p-4 md:p-8 min-h-screen bg-gray-50">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800"></h1>
        
        <div className="flex gap-3">
     
          <div className="relative">
            <button
              onClick={() => setShowFilterDropdown(!showFilterDropdown)}
              className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow-sm border border-gray-200 hover:bg-gray-50 transition"
            >
              <FiFilter className="text-gray-600" />
              <span className="text-sm font-medium text-gray-700">
                {filterOption === "all" ? "All Documents" : filterOption.toUpperCase()}
              </span>
              <FiChevronDown className="text-gray-500" />
            </button>
            
            {showFilterDropdown && (
              <div className="absolute right-0 mt-2 w-40 bg-white rounded-md shadow-lg z-10 border border-gray-200">
                <ul className="py-1">
                  <li>
                    <button
                      onClick={() => {
                        setFilterOption("all");
                        setShowFilterDropdown(false);
                      }}
                      className={`block px-4 py-2 text-sm w-full text-left ${filterOption === "all" ? "bg-blue-50 text-blue-600" : "text-gray-700 hover:bg-gray-100"}`}
                    >
                      All Documents
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => {
                        setFilterOption("pdf");
                        setShowFilterDropdown(false);
                      }}
                      className={`block px-4 py-2 text-sm w-full text-left ${filterOption === "pdf" ? "bg-blue-50 text-blue-600" : "text-gray-700 hover:bg-gray-100"}`}
                    >
                      PDF
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => {
                        setFilterOption("docx");
                        setShowFilterDropdown(false);
                      }}
                      className={`block px-4 py-2 text-sm w-full text-left ${filterOption === "docx" ? "bg-blue-50 text-blue-600" : "text-gray-700 hover:bg-gray-100"}`}
                    >
                      DOCX
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => {
                        setFilterOption("pptx");
                        setShowFilterDropdown(false);
                      }}
                      className={`block px-4 py-2 text-sm w-full text-left ${filterOption === "pptx" ? "bg-blue-50 text-blue-600" : "text-gray-700 hover:bg-gray-100"}`}
                    >
                      PPTX
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </div>
          
        
          <div className="relative">
            <button
              onClick={() => setShowSortDropdown(!showSortDropdown)}
              className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow-sm border border-gray-200 hover:bg-gray-50 transition"
            >
              <span className="text-sm font-medium text-gray-700">
                {sortOption === "name-asc" && "Name (A-Z)"}
                {sortOption === "name-desc" && "Name (Z-A)"}
                {sortOption === "newest" && "Newest"}
                {sortOption === "oldest" && "Oldest"}
                {sortOption === "size-asc" && "Size (Small)"}
                {sortOption === "size-desc" && "Size (Large)"}
              </span>
              <FiChevronDown className="text-gray-500" />
            </button>
            
            {showSortDropdown && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 border border-gray-200">
                <ul className="py-1">
                  <li>
                    <button
                      onClick={() => {
                        setSortOption("name-asc");
                        setShowSortDropdown(false);
                      }}
                      className={`block px-4 py-2 text-sm w-full text-left ${sortOption === "name-asc" ? "bg-blue-50 text-blue-600" : "text-gray-700 hover:bg-gray-100"}`}
                    >
                      Name (A-Z)
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => {
                        setSortOption("name-desc");
                        setShowSortDropdown(false);
                      }}
                      className={`block px-4 py-2 text-sm w-full text-left ${sortOption === "name-desc" ? "bg-blue-50 text-blue-600" : "text-gray-700 hover:bg-gray-100"}`}
                    >
                      Name (Z-A)
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => {
                        setSortOption("newest");
                        setShowSortDropdown(false);
                      }}
                      className={`block px-4 py-2 text-sm w-full text-left ${sortOption === "newest" ? "bg-blue-50 text-blue-600" : "text-gray-700 hover:bg-gray-100"}`}
                    >
                      Newest First
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => {
                        setSortOption("oldest");
                        setShowSortDropdown(false);
                      }}
                      className={`block px-4 py-2 text-sm w-full text-left ${sortOption === "oldest" ? "bg-blue-50 text-blue-600" : "text-gray-700 hover:bg-gray-100"}`}
                    >
                      Oldest First
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => {
                        setSortOption("size-asc");
                        setShowSortDropdown(false);
                      }}
                      className={`block px-4 py-2 text-sm w-full text-left ${sortOption === "size-asc" ? "bg-blue-50 text-blue-600" : "text-gray-700 hover:bg-gray-100"}`}
                    >
                      Size (Small to Large)
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => {
                        setSortOption("size-desc");
                        setShowSortDropdown(false);
                      }}
                      className={`block px-4 py-2 text-sm w-full text-left ${sortOption === "size-desc" ? "bg-blue-50 text-blue-600" : "text-gray-700 hover:bg-gray-100"}`}
                    >
                      Size (Large to Small)
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>

      {documentFiles.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-64">
          <FiFile className="text-gray-300 text-5xl mb-4" />
          <p className="text-gray-500">No documents found matching your criteria</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {documentFiles.map((file) => {
            const fileType = file.name.split('.').pop().toLowerCase();
            return (
              <div
                key={file.name}
                className="group relative bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 p-6 flex flex-col items-center"
              >
                <div className="w-full flex justify-center mb-4">
                  {getDocumentIcon(fileType)}
                </div>
                
                <div className="w-full text-center">
                  <p className="text-gray-800 font-medium truncate w-full">{file.name}</p>
                  <div className="flex items-center justify-center text-xs text-gray-500 mt-2">
                    <FiClock className="mr-1" />
                    <span>{new Date(file.created_at).toLocaleDateString()}</span>
                    <span className="mx-2">•</span>
                    <span>{Math.round(file.size / 1024)} KB</span>
                  </div>
                </div>
                
                <div className="mt-4 w-full flex justify-center">
                  <a
                    href={file.link}
                    download
                    className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors"
                    title="Download"
                  >
                    <FiDownload size={16} />
                    <span className="text-sm font-medium">Download</span>
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default Document;