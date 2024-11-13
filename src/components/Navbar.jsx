import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

function Navbar() {
  const [scrollPosition, setScrollPosition] = useState(0);

  const pathname = useLocation();

  const handleScroll = () => {
    const position = window.scrollY;
    setScrollPosition(position);
  };

  useEffect(() => {
    // Add scroll event listener
    window.addEventListener("scroll", handleScroll);

    // Cleanup the event listener on unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      className={`fixed inset-x-0 top-0 z-30 mx-auto w-full bg-transparent py-4 ${
        pathname.pathname === "/" && scrollPosition <= 0
          ? "backdrop-blur-none shadow-none"
          : "backdrop-blur-lg shadow"
      }`}
    >
      <div className="px-4 md:px-10">
        <div className="flex items-center justify-between">
          <div className="flex shrink-0">
            <Link to="/" className="text-xl font-bold text-primary">
              <div className="flex justify-center items-center gap-1">
                <img src=".././assets/dish.png" alt="dish image" className="size-8" />
                <span>DishDiscover</span>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
