import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../redux/slices/authSlice';
import { LogOut, User, Menu, X } from 'lucide-react';

const Navbar = () => {
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem('lastSearchResults');
    localStorage.removeItem('lastSearchLocation');
    
  };

  return (
    <nav className="bg-gray-800 p-4 text-gray-100 sticky top-0 z-40">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-pink-500 text-3xl font-bold italic">
          Barbezzz
        </Link>
        <div className="hidden md:flex space-x-6">
          {['Dashboard', 'Profile', 'Bookings', 'Settings'].map((item) => (
            <Link
              key={item}
              to={`/${item.toLowerCase()}`}
              className="hover:text-pink-500 transition-colors duration-300 relative group"
            >
              {item}
              <span className="absolute left-0 bottom-0 w-full h-0.5 bg-pink-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
            </Link>
          ))}
        </div>
        <div className="flex items-center space-x-4">
          {isAuthenticated ? (
            <>
              <span className="text-gray-300">Welcome, {user.name}</span>
              <button
                onClick={handleLogout}
                className="bg-pink-500 text-white py-2 px-4 rounded-full hover:bg-pink-400 transition-colors duration-300 flex items-center focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-opacity-50"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="bg-gray-700 text-gray-100 py-2 px-4 rounded-full hover:bg-gray-600 transition-colors duration-300 flex items-center focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50">
                <User className="w-4 h-4 mr-2" />
                Login
              </Link>
              <Link to="/signup" className="bg-pink-500 text-white py-2 px-4 rounded-full hover:bg-pink-400 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-opacity-50">
                Sign Up
              </Link>
            </>
          )}
        </div>
        <button
          className="md:hidden text-gray-300 hover:text-white focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>
      {isMenuOpen && (
        <div className="md:hidden bg-gray-800 py-4">
          <div className="container mx-auto">
            {['Dashboard', 'Profile', 'Bookings', 'Settings'].map((item) => (
              <Link
                key={item}
                to={`/${item.toLowerCase()}`}
                className="block py-2 px-4 text-gray-300 hover:bg-gray-700 hover:text-white"
                onClick={() => setIsMenuOpen(false)}
              >
                {item}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;