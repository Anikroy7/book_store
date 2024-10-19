import {
    createContext,
    useContext,
    useEffect,
    useState,
} from "react";

const AllBooksContext = createContext(undefined);

const AllBooksProvider = ({ children }) => {
    const [books, setBooks] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [prevUrl, setPrevUrl] = useState(null);
    const [nextUrl, setNextUrl] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');
    const [uniqueGenres, setUniqueGenres] = useState([])
    const [selectedGenre, setSelectedGenre] = useState(JSON.parse(localStorage.getItem('genreQuery'))||'');
    const [wishlists, setWishLists] = useState([]);
    useEffect(() => {
        setIsLoading(true);
        const fetchBooks = async () => {
            try {

                const response = await fetch(`https://gutendex.com/books?page=${currentPage}&search=${searchQuery || ''}&topic=${selectedGenre || ''}`);
                const data = await response.json();

                const genres = new Set();
                data?.results?.forEach((book) => {
                    book?.subjects?.forEach((subject) => genres.add(subject));
                });

                setBooks(data?.results);
                setNextUrl(data?.next);
                setPrevUrl(data?.previous);
                setUniqueGenres(Array.from(genres))
            } catch (error) {
                console.error("Error fetching books:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchBooks();
    }, [currentPage, searchQuery, selectedGenre]);

    return (
        <AllBooksContext.Provider
            value={{
                books,
                isLoading,
                prevUrl,
                nextUrl,
                currentPage,
                setCurrentPage,
                setSearchQuery,
                uniqueGenres,
                setUniqueGenres,
                selectedGenre,
                setSelectedGenre,
                wishlists, setWishLists
            }}
        >
            {children}
        </AllBooksContext.Provider>
    );
};

export const useAllBooks = () => {
    const context = useContext(AllBooksContext);

    if (context === undefined) {
        throw new Error("useAllBooks must be used within the AllBooksProvider context");
    }

    return context;
};

export default AllBooksProvider;
