import React, { useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import { NavLink } from "react-router-dom";
import Lottie from "lottie-react";
import loading from "../../public/loading.json"
import { 
  FaFolderOpen, 
  FaFileAlt, 
  FaHdd, 
  FaClock,
  FaArrowRight
} from "react-icons/fa";
import { motion } from "framer-motion";

function Dashboard() {
  const { getFiles, viewFiles, files, isLoading } = useOutletContext();

 
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  console.log(Object.entries(files))
  console.log(isLoading)


  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {isLoading && (
        <div className="absolute top-0 left-0 flex justify-center items-center   w-full h-full"> <Lottie animationData={loading} className="w-40 h-40" loop={true} /></div>
      )}
     {!isLoading && (
       <h1 className="text-3xl font-bold text-gray-800 mb-8">Storage Overview</h1>
     )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {Object.entries(files).map(([fileType, fileList], index) => {
          const totalSize = fileList.reduce((acc, file) => acc + file.size, 0);
          const latestUpdate = fileList.reduce(
            (latest, file) =>
              new Date(file.created_at) > new Date(latest) ? file.created_at : latest,
            fileList[0]?.created_at
          );

          return (
            <motion.div
              key={fileType}
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-200 overflow-hidden"
            >
              <div className="p-5 border-b border-gray-100 flex items-center gap-3">
                <div className="p-3 rounded-lg bg-blue-50 text-blue-600">
                  <FaFolderOpen className="text-xl" />
                </div>
                <div>
                  <h2 className="font-semibold text-gray-800">
                    {fileType.toUpperCase()}
                  </h2>
                  <p className="text-sm text-gray-500">
                    {fileList.length} {fileList.length === 1 ? 'file' : 'files'}
                  </p>
                </div>
              </div>
              <div className="p-5 grid grid-cols-3 gap-4">
                <div className="flex flex-col items-center">
                  <div className="p-2 rounded-full bg-purple-50 text-purple-600 mb-2">
                    <FaFileAlt className="text-sm" />
                  </div>
                  <span className="text-xs font-medium text-gray-500">Files</span>
                  <span className="text-sm font-semibold text-gray-800">
                    {fileList.length}
                  </span>
                </div>

                <div className="flex flex-col items-center">
                  <div className="p-2 rounded-full bg-green-50 text-green-600 mb-2">
                    <FaHdd className="text-sm" />
                  </div>
                  <span className="text-xs font-medium text-gray-500">Size</span>
                  <span className="text-sm font-semibold text-gray-800">
                    {(totalSize / (1024 * 1024)).toFixed(2)} MB
                  </span>
                </div>

                <div className="flex flex-col items-center">
                  <div className="p-2 rounded-full bg-amber-50 text-amber-600 mb-2">
                    <FaClock className="text-sm" />
                  </div>
                  <span className="text-xs font-medium text-gray-500">Updated</span>
                  <span className="text-sm font-semibold text-gray-800">
                    {new Date(latestUpdate).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric'
                    })}
                  </span>
                </div>
              </div>

              <div className="px-5 py-3 bg-gray-50 border-t border-gray-100">
                <button
                  onClick={() => viewFiles(fileType)}
                  className="w-full flex items-center justify-between text-blue-600 hover:text-blue-800 transition-colors"
                >
                  <NavLink to={`${fileType === "png" ? "/photos" : fileType === "pdf" ? "/documents" : fileType === "mp4" ? "/videos" : fileType === 'mov' ? "/videos" : "/photos"}`}>View All</NavLink>
                  <FaArrowRight className="text-sm" />
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

export default Dashboard;