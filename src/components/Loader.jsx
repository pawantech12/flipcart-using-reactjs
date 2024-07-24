import React from "react";

const Loader = () => {
  return (
    <div className="relative">
      <div className="flex justify-center items-center h-screen">
        <div className="loader ease-linear rounded-full border-4 border-t-4 border-yellow-300 h-24 w-24"></div>
      </div>
      <p className="absolute top-[49%] left-[42%]">Loading...</p>
    </div>
  );
};

export default Loader;
