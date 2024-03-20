import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-100">
      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="flex justify-between">
          {/* Left side */}
          <div className="flex space-x-4">
            <div className="flex items-center space-x-2">
              <span className="text-gray-600">🌐</span>
              <a href="#" className="text-gray-600 hover:text-gray-900">
                Forum
              </a>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-gray-600">📸</span>
              <a href="#" className="text-gray-600 hover:text-gray-900">
                Snapshot
              </a>
            </div>
          </div>
          {/* Middle section with icons and links */}
          <div className="flex space-x-8">
            <div className="flex flex-col items-center">
              <span className="text-gray-600">USDS Arbitrum</span>
              <div className="flex space-x-2">
                <a href="#" className="text-gray-600 hover:text-gray-900">
                  🔗
                </a>
                <a href="#" className="text-gray-600 hover:text-gray-900">
                  🔍
                </a>
              </div>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-gray-600">SPA Arbitrum</span>
              <div className="flex space-x-2">
                <a href="#" className="text-gray-600 hover:text-gray-900">
                  🔗
                </a>
                <a href="#" className="text-gray-600 hover:text-gray-900">
                  🔍
                </a>
              </div>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-gray-600">veSPA Arbitrum</span>
              <div className="flex space-x-2">
                <a href="#" className="text-gray-600 hover:text-gray-900">
                  🔗
                </a>
                <a href="#" className="text-gray-600 hover:text-gray-900">
                  🔍
                </a>
              </div>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-gray-600">wSPA Ethereum</span>
              <div className="flex space-x-2">
                <a href="#" className="text-gray-600 hover:text-gray-900">
                  🔗
                </a>
                <a href="#" className="text-gray-600 hover:text-gray-900">
                  🔍
                </a>
              </div>
            </div>
          </div>

          {/* Right side */}
          <div className="flex items-center space-x-4">
            <a href="#" className="text-gray-600 hover:text-gray-900">
              Terms of Service
            </a>
            <a href="#" className="text-gray-600 hover:text-gray-900">
              Privacy Policy
            </a>
          </div>
        </div>
        <div className="text-center text-gray-600 mt-4">
          © 2023 Sperax Inc. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
