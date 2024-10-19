import React from 'react'
import { Link } from 'react-router-dom'

function BookCard({ book }) {
    return (
        <div key={book.id} className="p-4 bg-white rounded-lg shadow-md flex flex-col justify-between">
            <img
                src={book.formats["image/jpeg"] || "https://via.placeholder.com/150"}
                alt={book.title}
                className="w-full h-48 object-cover rounded-md mb-4"
            />
            <h3 className="text-lg font-bold mb-2">{book.title.length > 15 ? `${book.title.substring(0, 30)}...` : book.title}</h3>
            <p className="text-gray-600 mb-2">
                {book.authors.map((author) => author.name).join(", ") || "Unknown Author"}
            </p>
            <p className="text-sm text-gray-500 italic mb-4">
                {book.subjects[0] || "Unknown Genre"}
            </p>
            <div className="flex justify-between">
                <Link to={`/book/${book.id}`} className="px-4 py-2 bg-blue-500 text-white rounded-md">View Details</Link>
                <button className="px-4 py-2 bg-green-500 text-white rounded-md">Wishlist</button>
            </div>
        </div>
    )
}

export default BookCard