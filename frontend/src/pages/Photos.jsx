import React, { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { FiImage, FiClock, FiDownload, FiFilter, FiChevronDown } from "react-icons/fi";

function Photos() {
  const { getFiles, files } = useOutletContext();
  const [imageFiles, setImageFiles] = useState([]);
  const [sortOption, setSortOption] = useState("newest");
  const [filterOption, setFilterOption] = useState("all");
  const [showSortDropdown, setShowSortDropdown] = useState(false);
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);

  

  useEffect(() => {
    const filteredFiles = Object.entries(files)
      .filter(([fileType]) => {
        if (filterOption === "all") return fileType === "jpg" || fileType === "png" || fileType === "jpeg";
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

    setImageFiles(sortedFiles);
  }, [files, sortOption, filterOption]);

  return (
    <div className="p-4 md:p-8 h-screen overflow-auto bg-gray-50">
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
                {filterOption === "all" ? "All Images" : filterOption.toUpperCase()}
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
                      All Images
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => {
                        setFilterOption("jpg");
                        setShowFilterDropdown(false);
                      }}
                      className={`block px-4 py-2 text-sm w-full text-left ${filterOption === "jpg" ? "bg-blue-50 text-blue-600" : "text-gray-700 hover:bg-gray-100"}`}
                    >
                      JPG
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => {
                        setFilterOption("png");
                        setShowFilterDropdown(false);
                      }}
                      className={`block px-4 py-2 text-sm w-full text-left ${filterOption === "png" ? "bg-blue-50 text-blue-600" : "text-gray-700 hover:bg-gray-100"}`}
                    >
                      PNG
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => {
                        setFilterOption("jpeg");
                        setShowFilterDropdown(false);
                      }}
                      className={`block px-4 py-2 text-sm w-full text-left ${filterOption === "jpeg" ? "bg-blue-50 text-blue-600" : "text-gray-700 hover:bg-gray-100"}`}
                    >
                      JPEG
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

      {imageFiles.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-64">
          <FiImage className="text-gray-300 text-5xl mb-4" />
          <p className="text-gray-500">No photos found matching your criteria</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {imageFiles.map((file) => (
            <div
              key={file.name}
              className="group relative bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300"
            >
              <div className="aspect-w-4 aspect-h-3 overflow-hidden">
                <img
                  className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105"
                  src={file.imglink.replace("dl=0", "raw=1")}
                  alt={file.name}
                  loading="lazy"
                />
              </div>
              
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  <p className="text-white font-medium truncate">{file.name}</p>
                  <div className="flex items-center text-xs text-white/80 mt-1">
                    <FiClock className="mr-1" />
                    <span>{new Date(file.created_at).toLocaleDateString()}</span>
                    <span className="mx-2">•</span>
                    <span>{Math.round(file.size / 1024)} KB</span>
                  </div>
                </div>
              </div>
              
              <div className="absolute top-3 right-3 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <a
                  href={file.link}
                  download
                  className="p-2 bg-white/90 rounded-full text-gray-700 hover:text-blue-600 transition-colors shadow-sm"
                  title="Download"
                >
                  <FiDownload size={16} />
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Photos;