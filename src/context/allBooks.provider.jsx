import {
    createContext,
    useContext,
    useEffect,
    useState,
} from "react";

const AllBooksContext = createContext(undefined);

const AllBooksProvider = ({ children }) => {
    const [books, setBooks] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [prevUrl, setPrevUrl] = useState(null);
    const [nextUrl, setNextUrl] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const fetchBooks = async () => {
            setIsLoading(true);
            try {
                const response = await fetch(`https://gutendex.com/books?page=${currentPage}&search=${searchQuery}`);
                const data = await response.json();
                setBooks(data.results);
                setNextUrl(data.next);
                setPrevUrl(data.previous);
            } catch (error) {
                console.error("Error fetching books:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchBooks();
    }, [currentPage, searchQuery]);

    return (
        <AllBooksContext.Provider
            value={{
                books,
                isLoading,
                prevUrl,
                nextUrl,
                currentPage,
                setCurrentPage,
                setSearchQuery
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
