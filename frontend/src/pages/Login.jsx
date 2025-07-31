import React from "react";

function Login() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 px-4">
      <div className="relative w-full max-w-md p-8 bg-white/10 backdrop-blur-md rounded-2xl shadow-lg border border-white/20">
        {/* Blurred background bubbles */}
        <div className="absolute -top-8 -left-8 w-24 h-24 bg-blue-500 rounded-full blur-2xl opacity-30"></div>
        <div className="absolute -bottom-8 -right-8 w-24 h-24 bg-purple-500 rounded-full blur-2xl opacity-30"></div>

        {/* Heading */}
        <h1 className="text-4xl font-bold text-white text-center mb-6 tracking-tight">
          Welcome to <span className="text-blue-400">CloudVault</span>
        </h1>

        {/* Dropbox Auth Link */}
        <a
          href="https://www.dropbox.com/oauth2/authorize?client_id=bsdwapln8fyz71n&response_type=code&redirect_uri=http://localhost:3000/auth/dropbox/callback"
          className="block w-full text-center px-6 py-3 text-lg font-semibold text-white bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg shadow-md transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/50 active:scale-95"
        >
          Continue with Dropbox
        </a>

        {/* Optional footer note */}
        <p className="mt-6 text-sm text-gray-300 text-center">
          Secure cloud storage with <span className="text-blue-400 font-medium">Dropbox</span>
        </p>
      </div>
    </div>
  );
}

export default Login;
