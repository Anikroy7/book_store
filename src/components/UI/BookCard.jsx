import React from 'react'
import { FaEye, FaHeart } from 'react-icons/fa'
import { Link } from 'react-router-dom'

function BookCard({ book, handleWishlist }) {
   
    return (
        <div key={book.id} className="p-4 bg-white rounded-lg shadow-md flex flex-col justify-between hover:shadow-lg transition-shadow duration-300">
            {/* Book Cover */}
            <img
                src={book.formats["image/jpeg"] || "https://via.placeholder.com/150"}
                alt={book.title}
                className="w-full h-48 object-cover rounded-md mb-4"
            />

            {/* Book Title */}
            <h3 className="text-lg font-bold mb-2 text-black">
                {book.title.length > 30 ? `${book.title.substring(0, 30)}...` : book.title}
            </h3>

            {/* Author */}
            <p className="text-gray-600 mb-2">
                {book.authors.map((author) => author.name).join(", ") || "Unknown Author"}
            </p>

            {/* Genre */}
            <p className="text-sm text-gray-500 italic mb-4">
                {book.subjects[0] || "Unknown Genre"}
            </p>

            {/* Buttons Section */}
            <div className="flex justify-between items-center">
                {/* View Details Button */}
                <Link to={`/book/${book.id}`} className="flex   items-center px-4 py-2  transition-colors hover:text-red-950">
                    <FaEye className="mr-2" /> View Details
                </Link>

                {/* Wishlist Button */}
                <span onClick={() => handleWishlist(book.id)} className="flex items-center px-4  cursor-pointer underline  py-2 transition-colors hover:text-red-950">
                    <FaHeart className="mr-2" /> add to wishlist
                </span>
            </div>
        </div>
    )
}

export default BookCard