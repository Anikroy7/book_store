import React, { useState } from 'react'
import Loading from './Loading';
import BookCard from './BookCard';
import { useAllBooks } from '../../context/allBooks.provider';

function AllBooks() {
  const { books, isLoading, nextUrl, prevUrl, setCurrentPage, currentPage, uniqueGenres, selectedGenre, setSelectedGenre } = useAllBooks();
  if (isLoading) return <Loading />

  const [wishlists, setWishLists] = useState([]);
  const handleWishlist = (id) => {
    if (wishlists.includes(id)) {
      setWishLists([...wishlists.filter((wid) => wid !== id)])
    } else {
      setWishLists([...wishlists, id])
    }
  }
  console.log(wishlists)
  return (
    <>
      <div className='w-[100%] py-5 flex justify-end'>

        <select
          value={selectedGenre}
          onChange={(e) => setSelectedGenre(e.target.value)}
          className="p-2 border rounded-md w-full max-w-md"
        >
          <option value="">All Genres</option>
          {uniqueGenres.map((genre, index) => (
            <option key={index} value={genre}>{genre}</option>
          ))}
        </select>
      </div>



      <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {
          books?.map((book) => <BookCard key={book.id} book={book} handleWishlist={handleWishlist} />)
        }
      </div>
      <div className="flex justify-center mt-4">
        <button
          onClick={() => {
            if (prevUrl) {
              setCurrentPage(Number(currentPage - 1));
            }
          }}
          disabled={!prevUrl}
          className="px-4 py-2 bg-gray-300 rounded-md mr-2 disabled:opacity-50"
        >
          Previous
        </button>
        <button
          onClick={() => {
            if (nextUrl) {
              setCurrentPage(Number(currentPage + 1));
            }
          }}
          disabled={!nextUrl}
          className="px-4 py-2 bg-gray-300 rounded-md ml-2 disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </>
  )
}

export default AllBooks