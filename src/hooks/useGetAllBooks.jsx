import { useEffect, useState } from "react";

export const useGetAllBooks = () => {
    const [books, setBooks] = useState([]);
    const [isLoading, setIsLoading]= useState(false);
    const [prevUrl, setPrevUrl]= useState(null);
    const [nextUrl, setNextUrl]= useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    useEffect(() => {
        setIsLoading(true)
        fetch(`https://gutendex.com/books?page=${currentPage}`)
            .then(res => res.json())
            .then(data => {
                setBooks(data.results)
                setNextUrl(data.next)
                setPrevUrl(data.prev)
                console.log('rwq',data)
            })
            .finally(()=>{
                setIsLoading(false)
            })
    }, [currentPage])

    return {books, isLoading, prevUrl, nextUrl, setCurrentPage, currentPage};
}

