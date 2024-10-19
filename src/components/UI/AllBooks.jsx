import React, { useEffect, useState } from 'react'
import Loading from './Loading';
import BookCard from './BookCard';
import { useAllBooks } from '../../context/allBooks.provider';

function AllBooks() {
  const { books, isLoading, nextUrl, prevUrl, setCurrentPage, currentPage, uniqueGenres, selectedGenre, setSelectedGenre, wishlists, setWishLists } = useAllBooks();
  if (isLoading) return <Loading />



  useEffect(() => {
    const wishlistsInLocalStorage = localStorage.getItem("wishlists");
    if (wishlistsInLocalStorage) {
      setWishLists(JSON.parse(wishlistsInLocalStorage));
    }
  }, []);

  const handleWishlist = (id) => {
    const updatedWishlists = [...wishlists];
    if (updatedWishlists.includes(id)) {
      const newWishlists = updatedWishlists.filter((wid) => wid !== id);
      setWishLists(newWishlists);
      localStorage.setItem("wishlists", JSON.stringify(newWishlists));
    } else {
      updatedWishlists.push(id);
      setWishLists(updatedWishlists);
      localStorage.setItem("wishlists", JSON.stringify(updatedWishlists));
    }
  };
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
        {books && books.length > 0 ? books?.map((book) => <BookCard key={book.id} book={book} handleWishlist={handleWishlist} wishlists={wishlists} />)
          : <div className="flex justify-center items-center h-full">
            <p className="text-xl text-gray-500">No books available...</p>
          </div>
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