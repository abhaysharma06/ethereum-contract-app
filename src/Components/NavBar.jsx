import React from "react";

const NavBar = () => {
  return (
    <nav className="bg-white-400">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between">
          <div className="flex space-x-4">
            {/* logo */}
            <div>
              <a
                href="#"
                className="flex items-center py-5 px-2 text-gray-700 hover:text-gray-900"
              >
                <span className="font-bold">Demeter</span>
              </a>
            </div>

            {/* primary nav */}
            <div className="hidden md:flex items-center space-x-1">
              <a
                href="#"
                className="py-5 px-3 text-gray-700 hover:text-gray-900"
              >
                Home
              </a>
              <a
                href="#"
                className="py-5 px-3 text-gray-700 hover:text-gray-900"
              >
                Gauge
              </a>
              <a
                href="#"
                className="py-5 px-3 text-gray-700 hover:text-gray-900"
              >
                Stake
              </a>
              <a
                href="#"
                className="py-5 px-3 text-gray-700 hover:text-gray-900"
              >
                Buyback
              </a>
              <a
                href="#"
                className="py-5 px-3 text-gray-700 hover:text-gray-900"
              >
                Swap
              </a>
              {/* Dropdown menu */}
              <div className="relative">
                <button className="py-5 px-3 text-gray-700 hover:text-gray-900">
                  More
                </button>
                <div className="absolute hidden hover:block bg-yellow-300 py-2">
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-yellow-400"
                  >
                    Option 1
                  </a>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-yellow-400"
                  >
                    Option 2
                  </a>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-yellow-400"
                  >
                    Option 3
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* secondary nav */}
          <div className="hidden md:flex items-center space-x-1 gap-4">
            <button className="px-3 py-2 bg-teal-500 hover:bg-teal-700 text-xs  text-white font-bold rounded-full focus:outline-none focus:shadow-outline">
              Buy SPA & USDs
            </button>
            <button className="px-3 py-2 bg-teal-500 hover:bg-teal-700 text-xs text-white font-bold rounded-full focus:outline-none focus:shadow-outline">
              Connect wallet
            </button>
          </div>
        </div>
      </div>

      {/* mobile button goes here */}
    </nav>
  );
};

export default NavBar;
