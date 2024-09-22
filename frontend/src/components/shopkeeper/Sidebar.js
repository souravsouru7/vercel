import React from 'react';
import { Home, User, ShoppingBag, LogOut, List, Clock } from 'lucide-react'; // Ensure all icons are imported
import { NavLink } from 'react-router-dom';

const Sidebar = ({ shop }) => {
  const menuItems = [
    { label: "Dashboard Overview", icon: <Home />, href: "/dashboard" },
    { label: "Profile Section", icon: <User />, href: "/dashboard/profile" },
  ];

  if (shop) {
    menuItems.push(
      { label: "Manage Shop", icon: <ShoppingBag />, href: "/dashboard/shopdetails" },
      { label: "Manage Services", icon: <List />, href: "/dashboard/manageservices" },
      { label: "Manage Time Slots", icon: <Clock />, href: "/dashboard/managetime" } // Added Clock icon
    );
  } else {
    menuItems.push({ label: "Add Shop", icon: <ShoppingBag />, href: "/dashboard/addshop" });
  }

  return (
    <div className="bg-gray-800 text-white w-64 space-y-6 py-7 px-2 absolute inset-y-0 left-0 transform -translate-x-full md:relative md:translate-x-0 transition duration-200 ease-in-out">
      <h1 className="text-2xl font-semibold text-center">ShopKeeper</h1>
      <nav>
        {menuItems.map((item, index) => (
          <NavLink
            key={index}
            to={item.href}
            className={({ isActive }) =>
              `flex items-center space-x-2 py-2 px-4 rounded transition duration-200 ${
                isActive 
                  ? "bg-indigo-600 text-white" 
                  : "text-gray-400 hover:bg-gray-700 hover:text-white"
              }`
            }
          >
            {item.icon} {/* Use the icon directly */}
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>
      <div className="px-4 mt-auto">
        <button className="flex items-center space-x-2 text-red-400 hover:text-red-300">
          <LogOut className="h-5 w-5" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
