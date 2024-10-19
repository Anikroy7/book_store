import React, { useEffect } from 'react'
import MainLayout from '../layouts/MainLayout'
import BookCard from '../UI/BookCard';
import { useGetBooksIds } from '../../hooks/useGetBooksIds';
import Loading from '../UI/Loading';
import { useAllBooks } from '../../context/allBooks.provider';

export default function WishlistPage() {
    const { books, isLoading } = useGetBooksIds();
    const { wishlists, setWishLists } = useAllBooks()

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
    if (isLoading) return <Loading />
    return (
            <MainLayout>
                <div className="container mx-auto min-h-screen py-6">
                    {books && books.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                            {books.map((book) => (
                                <div key={book.id} className="min-w-[250px] h-[400px]">
                                    <BookCard
                                        book={book}
                                        handleWishlist={handleWishlist}
                                        wishlists={wishlists}
                                    />
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="flex justify-center items-center h-full">
                            <p className="text-xl text-gray-500">No wishlists available...</p>
                        </div>
                    )}
                </div>

        </MainLayout>



    )
}
