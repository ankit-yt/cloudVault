import React, { useEffect, useState } from "react";
import { CiLogout } from "react-icons/ci";
import { FiUploadCloud } from "react-icons/fi";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaCookie } from "react-icons/fa";



function Navbar({ uploadButtonHandler }) {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [imgBase64, setImgBase64] = useState(null);
  
  useEffect(() => { 
    
    
    setTimeout(() => {
      const name = localStorage.getItem("username");
      const img = localStorage.getItem("img");
      setUsername(name);
      setImgBase64(img);
    }, 2000);
  
   
  }, []) 

  const logout = async () => {
    try {
      await axios.get("https://cloudvault-jk10.onrender.com/user/logout", {}, { withCredentials: true });
  
      localStorage.removeItem("token");
      localStorage.removeItem("username");
      localStorage.removeItem("img");
      localStorage.removeItem("dropBoxToken");
      
  
      console.log("User logged out successfully");
      navigate("/login"); 
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };
  
  return (
    <div className="w-full h-14 border-b border-gray-200 flex items-center justify-between px-4  text-white shadow-md">
      <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white">
        <img
          src={imgBase64}
          alt="Profile"
          className="w-full h-full object-cover object-top"
        />
       
      </div>
		  
		  <div className="flex gap-3">
		  <button onClick={uploadButtonHandler} className="text-black hover:bg-gray-200 e border-[1px] rounded-full  border-gray-300 px-3 py-1  flex justify-center items-center gap-2 "> <FiUploadCloud />

 		  Upload</button>
		  <button onClick={logout} className="text-black hover:bg-gray-200 e border-[1px] rounded-full  border-gray-300 px-3 py-1  flex justify-center items-center gap-2 "> <CiLogout />
 		  logout</button>
		 </div>
    </div>
  );
}

export default Navbar;
