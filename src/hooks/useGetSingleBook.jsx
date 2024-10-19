import { useEffect, useState } from "react";

export const useGetSingleBook = (id) => {
    const [book, setBook] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true)
        fetch(`https://gutendex.com/books/${id}`)
            .then(res => res.json())
            .then(data => {
                setBook(data)
                console.log('rwq details', data)
            })
            .catch((e) => {
                setBook(null);

            })
            .finally(() => {
                setIsLoading(false)
            })
    }, [])

    return { book, isLoading };
}