import React from "react";

const Navbar = () => {
  return (
    <div className="z-40 w-full fixed">
      <nav className="text-white text-center text-2xl fixed top-5 left-[50%] -translate-x-1/2 bg-blue-950 px-10 py-3 rounded-full">
        <ul className="flex justify-center items-center gap-10">
          <li className="tracking-wider cursor-pointer">Home</li>
          <li className="tracking-wider cursor-pointer">About</li>
          <li className="tracking-wider cursor-pointer">Contact</li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
