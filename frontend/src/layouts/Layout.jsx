import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Layout = ({ children }) => {
  const { pathname } = useLocation();
  const linkClass = (path) =>
    pathname === path
      ? "text-white font-semibold"
      : "text-blue-200 hover:text-white";

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-blue-700 text-white px-6 py-4 shadow-md flex gap-6">
        <Link to="/" className={linkClass("/")}>
          Student List
        </Link>
        <Link to="/codeforces" className={linkClass("/codeforces")}>
          CF Checker
        </Link>
      </nav>
      <main className="p-6">{children}</main>
    </div>
  );
};

export default Layout;
