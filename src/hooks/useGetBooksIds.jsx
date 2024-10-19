import { useState, useEffect } from 'react';
import { useAllBooks } from '../context/allBooks.provider';

export const useGetBooksIds = () => {
    const { wishlists, setWishLists } = useAllBooks();
    const [books, setBooks] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (wishlists.length === 0) {
            setBooks([]);
            return;
        }

        const bookIds = wishlists.join(",");
        setIsLoading(true);

        fetch(`https://gutendex.com/books?ids=${bookIds}`)
            .then((res) => res.json())
            .then((data) => {
                setBooks(data.results);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, [wishlists]);

    return { books, isLoading, setWishLists };
};
