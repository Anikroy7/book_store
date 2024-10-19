import React, { useState } from 'react';

export default function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);

    const handleMenuToggle = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <nav className="bg-gray-50 sticky top-0">
            <div className="max-w-8xl mx-auto px-4">
                <div className="flex justify-between">

                    {/* Logo and Links */}
                    <div className="flex space-x-4">
                        {/* Logo */}
                        <div>
                            <a href="#" className="flex items-center py-5 px-2 text-gray-700 hover:text-gray-900">
                                <img 
                                    width={100} 
                                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ3mrqcZyym23qWYQUHnmXf30Bj10B917RcQLck-epMLEUrUfK9M1dK-ZdN8roDBRNZ6NQ&usqp=CAU" 
                                    alt="Logo" 
                                />
                                <span className="font-bold">Book Store</span>
                            </a>
                        </div>

                        {/* Desktop Menu */}
                        <div className="hidden md:flex items-center space-x-1">
                            <a href="#" className="py-5 px-3 text-gray-700 hover:text-gray-900">Home</a>
                            <a href="#" className="py-5 px-3 text-gray-700 hover:text-gray-900">Wishlists</a>
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
                <a href="#" className="block py-2 px-4 text-sm hover:bg-gray-200">Home</a>
                <a href="#" className="block py-2 px-4 text-sm hover:bg-gray-200">Wishlists</a>
            </div>
        </nav>
    );
}
