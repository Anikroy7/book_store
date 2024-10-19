import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa'; 
import useDebounce from '../../hooks/useDebounce';
import { useAllBooks } from '../../context/allBooks.provider';

export default function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [searchText, setSearchText]= useState()
    const { setSearchQuery } = useAllBooks()
    const value = useDebounce(searchText);
    const handleMenuToggle = () => {
        setMenuOpen(!menuOpen);
    };

    useEffect(() => {
        setSearchQuery(value)
    }, [value])

    return (
        <nav className="bg-gray-50 sticky top-0">
            <div className="max-w-8xl mx-auto px-4">
                <div className="flex justify-between items-center">

                    {/* Logo and Links */}
                    <div className="flex space-x-4">
                        {/* Logo */}
                        <div>
                            <Link to="/" className="flex items-center py-5 px-2 text-gray-700 hover:text-gray-900">
                                <img
                                    width={100}
                                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ3mrqcZyym23qWYQUHnmXf30Bj10B917RcQLck-epMLEUrUfK9M1dK-ZdN8roDBRNZ6NQ&usqp=CAU"
                                    alt="Logo"
                                />
                                <span className="font-bold">Book Store</span>
                            </Link>
                        </div>

                        {/* Desktop Menu */}
                        <div className="hidden md:flex items-center space-x-1">
                            <Link to="/" className="py-5 px-3 text-gray-700 hover:text-gray-900">Home</Link>
                            <Link to="/wishlists" className="py-5 px-3 text-gray-700 hover:text-gray-900">Wishlists</Link>
                        </div>
                    </div>

                    {/* Search Bar */}
                    <div className="md:flex items-center space-x-2 w-[50%]">
                        <div className="relative w-full">
                            <input
                                onChange={(e) => setSearchText(e.target.value)}
                                type="text"
                                className="bg-gray-100 border w-full border-gray-300 text-gray-700 rounded-full py-2 px-4 pl-10 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-gray-400"
                                placeholder="Search for books..."
                            />
                            <FaSearch className="absolute left-3 top-3 text-gray-500" />
                        </div>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden flex items-center">
                        <button onClick={handleMenuToggle} className="mobile-menu-button">
                            <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={menuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'} />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            <div className={`mobile-menu ${menuOpen ? 'block' : 'hidden'} md:hidden`}>
                <Link to="/" className="block py-2 px-4 text-sm hover:bg-gray-200">Home</Link>
                <Link to="/wishlists" className="block py-2 px-4 text-sm hover:bg-gray-200">Wishlists</Link>
            </div>
        </nav>
    );
}
