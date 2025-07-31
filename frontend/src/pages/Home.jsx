import React, { useEffect, useRef, useState } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import axios from "axios";
import Dashboard from "./Dashboard";
import Photos from "./Photos";
import Documents from "./Documents";
import Music from "./Music";
import Videos from "./Videos";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { IoMdClose } from "react-icons/io";


function Home() {
  const [file, setFile] = useState([]);
  const [files, setFiles] = useState([]);
  const fileInputRef = useRef(null);
	const [isUploading, setIsUploading] = useState(false);
  const [uploadActive, setUploadActive] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  
  const navigate = useNavigate()

	const uploadButtonHandler = () => {
		setUploadActive(!uploadActive);
		console.log("clicked")
	}

  const handleFileUpload = async () => {
    setIsUploading(true);
    if (!file.length) {
      alert("No file selected");
      setIsUploading(false);
      return;
    }
    const formData = new FormData();
    file.forEach((f) => {
      formData.append("files", f);
      
    });
    try {
      const token = localStorage.getItem("token"); 
      const dropBoxToken = localStorage.getItem("dropBoxToken")
      console.log("Dropbox token:", dropBoxToken);
      const response = await fetch("https://cloudvault-jk10.onrender.com/dropbox/upload", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          dropboxAuthorization: `Bearer ${dropBoxToken}`,
        },
        body: formData,
      });

      if (response.status !== 200) {
        console.log("File upload failed");
        setIsUploading(false);
      } else {
        alert("File uploaded successfully");
		  setIsUploading(false);
		  fileInputRef.current.value = null;
      }
    } catch (error) {
      console.error("Error:", error);
      setIsUploading(false);
    }
  };
  
  const check = () => {
    console.log("Checking...");
  };

  const viewFiles = async () => {
    console.log("Fetching files...");
    setIsLoading(true)
    
    try {
      const token = localStorage.getItem("token");
      const dropBoxToken = localStorage.getItem("dropBoxToken");
      
      const response = await axios.get("https://cloudvault-jk10.onrender.com/dropbox/files",{
        headers: {
          Authorization: `Bearer ${token}`,
          dropboxAuthorization: `Bearer ${dropBoxToken}`
          
        },
      });
      
      setFiles(response.data.data);
      setIsLoading(false)
    } catch (error) {
      console.error("Error fetching files:", error);
    }
  };

  const deleteFile = async (fileName) => {
    try {
      await axios.get(`https://cloudvault-jk10.onrender.com/dropbox/delete/${fileName}`, {
        headers: {
          
          dropBoxToken: token,
        },
      });
      alert("File deleted successfully");

      setFiles((prevFiles) => {
        const updatedFiles = { ...prevFiles };
        for (const type in updatedFiles) {
          updatedFiles[type] = updatedFiles[type].filter(
            (file) => file.name !== fileName
          );
          if (updatedFiles[type].length === 0) delete updatedFiles[type];
        }
        return updatedFiles;
      });
    } catch (error) {
      alert("Error deleting file:", error);
    }
  };

  const downloadFile = async (fileName) => {
    try {
      const response = await axios.get(
        `https://cloudvault-jk10.onrender.com/dropbox/download/${fileName}`
        , {
          headers: {
            dropBoxToken: token,
        }
      });
      console.log("Download link generated successfully:", response.data.link);

      // Optionally, trigger the download
      window.open(response.data.link, "_blank");
    } catch (error) {
      alert("Error downloading file:", error);
    }
  };


  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    const DropBoxAccessToken = query.get("dropboxToken");
    if (DropBoxAccessToken) {
      localStorage.setItem("dropBoxToken", DropBoxAccessToken);
    
    }
    const user = query.get("user")
    if (user) {
      try {
        const parsedUser = JSON.parse(decodeURIComponent(user));
        localStorage.setItem("username", parsedUser.username);
        localStorage.setItem("img", parsedUser.img);
      } catch (err) {
        console.error("Failed to parse user:", err);
      }
    }
    const access_token = localStorage.getItem("dropBoxToken")
    const token = localStorage.getItem("token") || query.get("token");
    localStorage.setItem("token", token);

  if (!token) {
    navigate("/login");
  }
    viewFiles();
  }, []);

  


  return (
    <div className="w-full overflow-hidden flex h-screen">
      <Sidebar />
      <main className="w-full h-full relative">
        <Navbar uploadButtonHandler={uploadButtonHandler} />
        <div className="p-6 w-full h-full relative">
				  {uploadActive && (
					  <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50">
					  {isUploading && (
						<div className="w-10 h-10 border-4 absolute border-blue-500 border-t-transparent rounded-full animate-spin z-10"></div>
					  )}
					  <div className="bg-white relative p-6 rounded-md shadow-lg max-w-sm w-full">
						{isUploading && (
						  <div className="w-full h-full absolute bg-black top-0 left-0 opacity-50 rounded-md"></div>
							  )}
							  <div onClick={uploadButtonHandler} className="absolute top-3 right-4"><IoMdClose size={20} />
							  </div>
						<h2 className="text-xl font-semibold mb-4">Upload</h2>
						<input
						  multiple
						  type="file"
						  ref={fileInputRef}
						  id="fileUpload"
						  onChange={(e) => setFile(Array.from(e.target.files))}
						/>
						<button
						  className="mt-4 bg-red-500 text-white px-4 py-2 rounded-md"
						  onClick={handleFileUpload}
						>
						  Upload
						</button>
					  </div>
					</div>
		  )}
          <Outlet context={{ getFiles: viewFiles , viewFiles:viewFiles , files , isLoading }} />
        </div>
      </main>
    </div>
  );
}
export default Home;
