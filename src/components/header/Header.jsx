import React, { useEffect, useState } from 'react';
import Logo from './logo.png'
import { FiShoppingCart } from "react-icons/fi";
import { FaRegHeart } from "react-icons/fa";
import { NavLink, Link, useNavigate, useLocation } from 'react-router-dom';
import { useFirebase } from '../../firebase/FirebaseContext';
import { IoSearch } from "react-icons/io5";
import { useAppwrite } from '../../appwrite/AppwriteContext';
const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState(null);
  const [searchOption, setSearchOption] = useState([])
  const navigate = useNavigate();
  const appwrite = useAppwrite()
  const firebase = useFirebase()
  const location = useLocation()
  const [toggleSearch, setToggleSearch] = useState("top-0");
   const closeMenu = () => {
    setIsOpen(false);
  };
  console.log(appwrite.loggedInUser);
  
  const toggleMenu = () => {
    setIsOpen(!isOpen);

  };
  let url = firebase?.user?.photoURL!=null?firebase?.user?.photoURL:"https://img.freepik.com/free-psd/3d-illustration-human-avatar-profile_23-2150671116.jpg?w=740&t=st=1703837364~exp=1703837964~hmac=33dcc8385818924229394fd67ba929edb782c5eb07ec9f261dfa935f2ae88d53";
  useEffect(() => {
    closeMenu()
    window.scrollTo(0, 0);
  }, [location])

  const toggleSearchMenu = () => {
    if (toggleSearch === "top-0") {
      setToggleSearch("top-full")
    }
    else {
      setToggleSearch("top-0")
      setSearchOption([])
    }
  }
  return (
    <>
      {
        loading ? (
          <section className="bg-white ">
            <div className="container flex flex-col items-center justify-between p-6 mx-auto space-y-4 animate-pulse sm:space-y-0 sm:flex-row">
              <p className="w-32 h-2 bg-gray-200 rounded-lg "></p>
              <div className="flex flex-wrap items-center justify-center gap-6 mt-10">
                <p className="w-20 h-2 bg-gray-200 rounded-lg "></p>
                <p className="w-20 h-2 bg-gray-200 rounded-lg "></p>
                <p className="w-20 h-2 bg-gray-200 rounded-lg "></p>
                <p className="w-20 h-2 bg-gray-200 rounded-lg "></p>
                <p className="w-20 h-2 bg-gray-200 rounded-lg "></p>
                <p className="w-8 h-8 bg-gray-200 rounded-full "></p>
              </div>
            </div>
          </section>
        ) : (
          <nav className=" bg-white shadow sticky left-0 top-0 z-50 ">
            <div className=" bg-white sm:w-full  container px-6 py-4 mx-auto">
              <div className="flex flex-col md:flex-row md:justify-between md:items-center">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Link to="/">
                      <img className="sm:min-w-[7rem] w-[6rem] h-8 sm:h-8" src={Logo} alt="caralogo" />
                    </Link>
                    <div className={`sm:mx-5 sm:mr-2 bg-white sm:relative absolute duration-500 ${toggleSearch} -z-10 w-full left-0 px-2 sm:z-50 block `}>

                    </div>

                  </div>

                  <div className="flex lg:hidden">
                    <div className="flex sm:ml-6 gap-3 sm:flex justify-center items-center">
                      {/* <IoSearch className='text-[27px] cursor-pointer' onClick={toggleSearchMenu} /> */}
                      <div className='relative'>
                        <Link to="/fiveinone/wishlist"  ><FaRegHeart className='text-2xl cursor-pointer' /></Link>
                        <div className=' p-[6px] h-2 w-2 rounded-full bg-red-500 border-white absolute top-0 -right-1 flex justify-center items-center text-[10px] text-white'>{firebase.lengthOfWishlist}</div>
                      </div>
                      <div className='relative'>
                        <Link to="/checkout/cart" ><FiShoppingCart className='text-2xl cursor-pointer mr-2' />
                        </Link>
                        <div className=' p-[6px] h-2 w-2 rounded-full bg-red-500 border-white absolute top-0 right-1 flex justify-center items-center text-[10px] text-white'>{firebase.lengthOfCart}</div>
                      </div>
                    </div>
                    <button
                      onClick={toggleMenu}
                      type="button"
                      className="text-gray-500 hover:text-gray-600 focus:outline-none focus:text-gray-600"
                      aria-label="toggle menu"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        {isOpen ? (
                          <path d="M6 18L18 6M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
                        ) : (
                          <path d="M4 8h16M4 16h16" strokeLinecap="round" strokeLinejoin="round" />
                        )}
                      </svg>
                    </button>

                  </div>
                </div>
                <div className={`absolute inset-x-0 z-20 w-full px-6 py-2 transition-all duration-300 ease-in-out bg-white top-24 md:mt-0 md:p-0 md:top-0 md:relative md:bg-transparent md:w-auto md:opacity-100 md:translate-x-0 md:flex md:items-center ${isOpen ? 'translate-x-0 opacity-100' : 'opacity-0 -translate-x-full'}`}>
                  <div className="flex flex-col md:flex-row md:mx-1">
                    <Link
                      to="/"
                      className="my-2 text-base leading-5 text-gray-700 transition-colors duration-300 transform hover:text-blue-600 hover:underline md:mx-4 md:my-1"

                    >
                      Home
                    </Link>
            
                    <Link
                      to="/about"
                      className="my-2 text-base leading-5 text-gray-700 transition-colors duration-300 transform hover:text-blue-600 hover:underline md:mx-4 md:my-1"
                    >
                      About Us
                    </Link>
                    <Link
                      to="/contact"
                      className="my-2 text-base leading-5 text-gray-700 transition-colors duration-300 transform hover:text-blue-600 hover:underline md:mx-4 md:my-1"
                    >
                      Contact Us
                    </Link>
                    <Link
                      to="/fiveinone/profile"
                      className="my-2 md:hidden text-base leading-5 text-gray-700 transition-colors duration-300 transform hover:text-blue-600 hover:underline md:mx-4 md:my-1"
                    >
                      Profile
                    </Link>
                    {!appwrite?.loggedInUser ? (
                      <>
                        <Link
                          to="/login"
                          className="my-2 text-base leading-5 text-gray-700 transition-colors duration-300 transform hover:text-blue-600 hover:underline md:mx-4 md:my-1"
                        >
                          Login
                        </Link>
                        <Link
                          to="/signup"
                          className="my-2 text-base leading-5 text-gray-700 transition-colors duration-300 transform hover:text-blue-600 hover:underline md:mx-4 md:my-1"
                        >
                          Sign Up
                        </Link>
                      </>
                    ) : (
                      ""
                    )}
                  </div>
                  <div className="sm:ml-6 gap-4 sm:flex justify-center items-center hidden">
                    <div className='relative'>
                      <Link to="/fiveinone/wishlist"  ><FaRegHeart className='text-2xl cursor-pointer' /></Link>
                      <div className=' p-[6px] h-2 w-2 rounded-full bg-red-500 border-white absolute top-0 -right-1 flex justify-center items-center text-[10px] text-white'>{firebase.lengthOfWishlist}</div>
                    </div>
                    <div className='relative'>
                      <Link to="/checkout/cart" ><FiShoppingCart className='text-2xl cursor-pointer' />
                      </Link>
                      <div className=' p-[6px] h-2 w-2 rounded-full bg-red-500 border-white absolute top-0 -right-1 flex justify-center items-center text-[10px] text-white'>{firebase.lengthOfCart}</div>
                    </div>
                    <Link to="/fiveinone/profile"><div className="profile hidden sm:block w-7 h-7 bg-slate-600 rounded-full overflow-hidden">
                      <img src={url} alt="user-image" className='' />
                    </div>
                    </Link>
                  </div>
                </div>

              </div>
              <div className="pt-4 my-2 border-t sm:gap-1 gap-2 overflow-x-auto flex justify-center items-center">
                <Link
                  className="sm:mx-2 ml-1 no-underline text-nowrap text-sm leading-5 text-gray-700 transition-colors duration-300 transform hover:text-blue-600 dark:hover:text-blue-400 hover:underline"
                  to="/shopping/floor"
                >
                  Floor
                </Link>
                <Link
                  className="sm:mx-2 ml-1 no-underline text-nowrap text-sm leading-5 text-gray-700 transition-colors duration-300 transform hover:text-blue-600 dark:hover:text-blue-400 hover:underline"
                  to="/shopping/wall"
                >
                  Wall
                </Link>
                <Link
                  className="sm:mx-2 ml-1 no-underline text-nowrap text-sm leading-5 text-gray-700 transition-colors duration-300 transform hover:text-blue-600 dark:hover:text-blue-400 hover:underline"
                  to="/shopping/stair"
                >
                  Stairs
                </Link>
                <Link
                  className="sm:mx-2 ml-1 no-underline text-nowrap text-sm leading-5 text-gray-700 transition-colors duration-300 transform hover:text-blue-600 dark:hover:text-blue-400 hover:underline"
                  to="/shopping/marble"
                >
                  Marbles
                </Link>
                <Link
                  className="sm:mx-2 ml-1 no-underline text-nowrap text-sm leading-5 text-gray-700 transition-colors duration-300 transform hover:text-blue-600 dark:hover:text-blue-400 hover:underline"
                  to="/shopping/temple"
                >
                  Temples
                </Link>
                <Link
                  className="sm:mx-2 ml-1 no-underline text-nowrap text-sm leading-5 text-gray-700 transition-colors duration-300 transform hover:text-blue-600 dark:hover:text-blue-400 hover:underline"
                  to="/shopping/table"
                >
                  Tables
                </Link>
              </div>
            </div>
          </nav>
        )
      }

    </>

  );
};

export default Header;

