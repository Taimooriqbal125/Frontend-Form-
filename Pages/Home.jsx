import React from "react";
import { useSelector } from "react-redux";

const Home = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md text-center">
        <h1 className="text-2xl font-bold text-gray-800">
          {user ? `Welcome, ${user.username}!` : "Welcome to Our App!"}
        </h1>
        <p className="text-gray-600 mt-4">We're glad to have you here.</p>
      </div>
    </div>
  );
};

export default Home;
