import React, { useState } from "react"; 
import { Link, NavLink } from "react-router-dom";
import { IoMenu, IoClose } from "react-icons/io5"; 
import { useDispatch,useSelector } from "react-redux";
import avatarImg from "../assets/commentor.png"
const navLists = [
  { name: "Home", path: "/" },
  { name: "About us", path: "/about-us" },
  { name: "Privacy Policy", path: "/privacy-policy" },
  { name: "Contact", path: "/contact-us" },
];

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false); 
  const {user} =useSelector((state) => state.auth)
  console.log(user)
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen); 
  return (
    <header className="bg-white py-6 border">
      <nav className="container mx-auto flex justify-between px-5">
        <a href="/">
          <img src="/" alt="" className="h-12" />
        </a>
        <ul className={`sm:flex hidden items-center gap-8`}>
          {navLists.map((item) => (
            <li key={item.name}>
              <NavLink
                to={item.path}
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                {item.name}
              </NavLink>
            </li>
          ))}
          {/* render btn based on user login activity */ }
          {
            user && user.role === "admin" ? (<li>
              <img src={avatarImg} alt="" className=" size-8"></img>
              <Link to="/dashboard"><button className="bg-[#1E73bE] px-4 py-1.5 text-white
              rounded-sm ">Dashbord</button></Link>
            </li>):(<li>
              <NavLink to="/login">Login</NavLink>
            </li>)
          }
        
        </ul>
        <div className="flex items-center sm:hidden">
          <button onClick={toggleMenu} 
          className="flex items-center px-3 py-4 bg-[#fafafa] rounded text-sm text-gray-500 hover:text-gray-900">
            {isMenuOpen ? <IoClose className="size-6" /> : <IoMenu className="size-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile menu items */}
      {isMenuOpen && (
        <ul className="flexed top-[108px] left-0 w-full h-auto pb-8 border-b bg-white shadow-sm z-50">
          {navLists.map((list, index) => (
            <li className="mt-5 px-4" key={index}>
              <NavLink 
              onClick={() => setIsMenuOpen(false)} 
              to={list.path} className={({ isActive }) => (isActive ? "active" : "")}>
                {list.name} {/* ใช้ list.name แทน item.name */}
              </NavLink>
            </li>
          ))}
          <li className="px-4 mt-5">
            <NavLink to="/login">Login</NavLink>
          </li>
        </ul>
      )}
    </header>
  );
};

export default Navbar;
