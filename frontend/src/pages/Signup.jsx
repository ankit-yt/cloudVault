import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';


function Signup() {
  const navigate = useNavigate();
  const [hasTextInFirstInput, setHasTextInFirstInput] = useState(false);
  const [hasTextInSecondInput, setHasTextInSecondInput] = useState(false);
  const [hasTextInThirdInput, setHasTextInThirdInput] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [pic, setpic] = useState([])


  

  const submitHandler = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("username", username);
    formData.append("email", email);
    formData.append("password", password);
    if (pic) {
      formData.append("img", pic);
    }


    axios
    .post("https://cloudvault-jk10.onrender.com/user/signup", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then((r) => {
        const data = r.data;
        localStorage.setItem("token", data.token);
        localStorage.setItem("username", data.user.username);
        localStorage.setItem("img", data.user.img);
        Cookies.set("token", data.token, { expires: 1 / (24 * 60) });// store token for 7 days

        navigate("/");
        alert("Signup successful");
      })
      .catch((e) => {
        const msg = e.response?.data?.message || e.message
        alert(msg);
      })
      .finally(() => {
       
        setHasTextInFirstInput(false);
        setHasTextInSecondInput(false);
        setHasTextInThirdInput(false);
      });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
      <div className="relative w-full max-w-md p-8 bg-white/10 backdrop-blur-md rounded-2xl shadow-lg border border-white/20">
        <div className="absolute -top-8 -left-8 w-20 h-20 bg-blue-500 rounded-full blur-2xl opacity-30"></div>
        <div className="absolute -bottom-8 -right-8 w-20 h-20 bg-purple-500 rounded-full blur-2xl opacity-30"></div>

        <h2 className="text-3xl font-extrabold text-center text-white tracking-wide">
          Sign Up to <span className="text-blue-400">CloudVault</span>
        </h2>

        <form onSubmit={(e) => submitHandler(e)} className="mt-8 space-y-6">
          <div className="relative">
            <input
              type="text"
              name="username"
              value={username}
              className="peer w-full px-4 pt-5 pb-2 bg-transparent border border-gray-600 rounded-md focus:outline-none  text-white placeholder-transparent transition"
              placeholder="Username"
              required
              onChange={(e) => {
                setUsername(e.target.value);
                setHasTextInFirstInput(e.target.value.length > 0);
              }}
            />
            <label
              className={`absolute left-4 transition-all ${
                hasTextInFirstInput
                  ? "-top-3 text-sm text-blue-400"
                  : "top-4 text-base text-gray-500 peer-focus:-top-3 peer-focus:text-sm peer-focus:text-blue-400"
              }`}
            >
              Username
            </label>
          </div>

          <div className="relative">
            <input
              type="email"
              name="email"
              className="peer w-full px-4 pt-5 pb-2 bg-transparent border border-gray-600 rounded-md focus:outline-none  text-white placeholder-transparent transition"
              placeholder="Email"
              value={email}
              required
              onChange={(e) => {
                setEmail(e.target.value);
                setHasTextInSecondInput(e.target.value.length > 0);
              }}
            />
            <label
              className={`absolute left-4 transition-all ${
                hasTextInSecondInput
                  ? "-top-3 text-sm text-blue-400"
                  : "top-4 text-base text-gray-500 peer-focus:-top-3 peer-focus:text-sm peer-focus:text-blue-400"
              }`}
            >
              Email
            </label>
          </div>

          <div className="relative">
            <input
              type="password"
              name="password"
              className="peer w-full px-4 pt-5 pb-2 bg-transparent border border-gray-600 rounded-md focus:outline-none  text-white placeholder-transparent transition"
              placeholder="Password"
              required
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setHasTextInThirdInput(e.target.value.length > 0);
              }}
            />
            <label
              className={`absolute left-4 transition-all ${
                hasTextInThirdInput
                  ? "-top-3 text-sm text-blue-400"
                  : "top-4 text-base text-gray-500 peer-focus:-top-3 peer-focus:text-sm peer-focus:text-blue-400"
              }`}
            >
              Password
            </label>
          </div>


          <div className="relative">
            <input
               type="file"
               name="img"
               accept="image/*"
               className="peer w-full px-4 pt-5 pb-2 bg-transparent border border-gray-600 rounded-md focus:outline-none text-white placeholder-transparent transition"
               required
               onChange={(e) => setpic(e.target.files[0])} 
            />
           
          </div>

          <button
            type="submit"
            className="w-full px-6 py-3 text-lg font-semibold text-white bg-gradient-to-r from-blue-500 to-purple-500 rounded-md shadow-md transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/50 active:scale-95"
          >
            Sign Up
          </button>
        </form>

        <p className="mt-4 text-sm text-gray-300 text-center">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-400 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;
