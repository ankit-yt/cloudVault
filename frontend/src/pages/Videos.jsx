import React, { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { FiFilm, FiClock, FiDownload, FiFilter, FiChevronDown } from "react-icons/fi";

function Videos() {
  const { getFiles, files } = useOutletContext();
  const [videoFiles, setVideoFiles] = useState([]);
  const [sortOption, setSortOption] = useState("newest");
  const [filterOption, setFilterOption] = useState("all");
  const [showSortDropdown, setShowSortDropdown] = useState(false);
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);

  // Supported video formats
  const videoFormats = ['mp4', 'webm', 'mov', 'avi', 'mkv', 'flv', 'wmv'];

 
  useEffect(() => {
    // Combine and filter video files
    const filteredFiles = Object.entries(files)
      .filter(([fileType]) => {
        if (filterOption === "all") return videoFormats.includes(fileType);
        return fileType === filterOption;
      })
      .flatMap(([_, fileList]) => fileList);

    // Sort files
    const sortedFiles = [...filteredFiles].sort((a, b) => {
      switch (sortOption) {
        case "name-asc": return a.name.localeCompare(b.name);
        case "name-desc": return b.name.localeCompare(a.name);
        case "newest": return new Date(b.created_at) - new Date(a.created_at);
        case "oldest": return new Date(a.created_at) - new Date(b.created_at);
        case "size-asc": return a.size - b.size;
        case "size-desc": return b.size - a.size;
        default: return 0;
      }
    });

    setVideoFiles(sortedFiles);
  }, [files, sortOption, filterOption]);

  return (
    <div className="p-4 md:p-8 h-screen  overflow-auto scrollbar-hide  bg-gray-50">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800"></h1>
        
        <div className="flex gap-3">
          {/* Filter Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowFilterDropdown(!showFilterDropdown)}
              className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow-sm border border-gray-200 hover:bg-gray-50 transition"
            >
              <FiFilter className="text-gray-600" />
              <span className="text-sm font-medium text-gray-700">
                {filterOption === "all" ? "All Videos" : filterOption.toUpperCase()}
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
                      All Videos
                    </button>
                  </li>
                  {videoFormats.map(format => (
                    <li key={format}>
                      <button
                        onClick={() => {
                          setFilterOption(format);
                          setShowFilterDropdown(false);
                        }}
                        className={`block px-4 py-2 text-sm w-full text-left ${filterOption === format ? "bg-blue-50 text-blue-600" : "text-gray-700 hover:bg-gray-100"}`}
                      >
                        {format.toUpperCase()}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          
          {/* Sort Dropdown */}
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
                  {[
                    ["name-asc", "Name (A-Z)"],
                    ["name-desc", "Name (Z-A)"],
                    ["newest", "Newest First"],
                    ["oldest", "Oldest First"],
                    ["size-asc", "Size (Small to Large)"],
                    ["size-desc", "Size (Large to Small)"]
                  ].map(([value, label]) => (
                    <li key={value}>
                      <button
                        onClick={() => {
                          setSortOption(value);
                          setShowSortDropdown(false);
                        }}
                        className={`block px-4 py-2 text-sm w-full text-left ${sortOption === value ? "bg-blue-50 text-blue-600" : "text-gray-700 hover:bg-gray-100"}`}
                      >
                        {label}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>

      {videoFiles.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-64">
          <FiFilm className="text-gray-300 text-5xl mb-4" />
          <p className="text-gray-500">No videos found matching your criteria</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {videoFiles.map((file) => (
            <div
              key={file.id}
              className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all"
            >
              <div className="relative pt-[56.25%] bg-black">
                <video
                  src={file.imglink.replace("dl=0", "raw=1")}
                  className="absolute inset-0 w-full h-full object-contain"
                  controls
                  preload="metadata"
                />
              </div>
              <div className="p-4">
                <p className="font-medium text-gray-800 truncate">{file.name}</p>
                <div className="flex items-center text-sm text-gray-500 mt-2">
                  <FiClock className="mr-1" />
                  <span>{new Date(file.created_at).toLocaleDateString()}</span>
                  <span className="mx-2">•</span>
                  <span>{Math.round(file.size / (1024 * 1024))} MB</span>
                </div>
                <a
                  href={file.link}
                  download
                  className="mt-3 inline-flex items-center gap-2 text-sm text-blue-600 hover:text-blue-800"
                >
                  <FiDownload size={14} />
                  <span>Download</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
      <div className="w-full h-20 "></div>
    </div>
  );
}

export default Videos;