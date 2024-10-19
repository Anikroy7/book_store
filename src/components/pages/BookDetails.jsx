import React from 'react';
import MainLayout from '../layouts/MainLayout';
import { useGetSingleBook } from '../../hooks/useGetSingleBook';
import { useParams } from 'react-router-dom';
import Loading from '../UI/Loading';

const bookDatas = {
    id: 84,
    title: "Frankenstein; Or, The Modern Prometheus",
    authors: [
        {
            name: "Shelley, Mary Wollstonecraft",
            birth_year: 1797,
            death_year: 1851,
        },
    ],
    translators: [],
    subjects: [
        "Frankenstein's monster (Fictitious character) -- Fiction",
        "Frankenstein, Victor (Fictitious character) -- Fiction",
        "Gothic fiction",
        "Horror tales",
        "Monsters -- Fiction",
        "Science fiction",
        "Scientists -- Fiction",
    ],
    bookshelves: [
        "Browsing: Culture/Civilization/Society",
        "Browsing: Fiction",
        "Browsing: Gender & Sexuality Studies",
        "Browsing: Literature",
        "Browsing: Science-Fiction & Fantasy",
        "Gothic Fiction",
        "Movie Books",
        "Precursors of Science Fiction",
        "Science Fiction by Women",
    ],
    languages: ["en"],
    copyright: false,
    media_type: "Text",
    formats: {
        "text/html": "https://www.gutenberg.org/ebooks/84.html.images",
        "application/epub+zip": "https://www.gutenberg.org/ebooks/84.epub3.images",
        "application/x-mobipocket-ebook": "https://www.gutenberg.org/ebooks/84.kf8.images",
        "application/rdf+xml": "https://www.gutenberg.org/ebooks/84.rdf",
        "image/jpeg": "https://www.gutenberg.org/cache/epub/84/pg84.cover.medium.jpg",
        "text/plain; charset=us-ascii": "https://www.gutenberg.org/ebooks/84.txt.utf-8",
        "application/octet-stream": "https://www.gutenberg.org/cache/epub/84/pg84-h.zip",
    },
    download_count: 78467,
};

export default function BookDetails() {
    const { bookId } = useParams()
    const { book, isLoading } = useGetSingleBook(bookId);
    if (isLoading) return <Loading />
    console.log(book)
    return (
        <MainLayout>
            {
                book?.id ? <div className="max-w-4xl mx-auto p-6 bg-gray-50 rounded-lg shadow-lg mt-10">
                    <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                        <img
                            className="w-48 h-auto rounded-lg shadow-md"
                            src={book.formats["image/jpeg"]}
                            alt={`${book.title} cover`}
                        />
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">{book.title}</h1>
                            <p className="mt-2 text-lg text-gray-600">
                                by {book.authors[0].name} ({book.authors[0].birth_year} - {book.authors[0].death_year})
                            </p>
                            <p className="mt-1 text-sm text-gray-500">
                                Downloaded {book.download_count} times
                            </p>
                        </div>
                    </div>

                    {/* Subjects */}
                    <div className="mt-6">
                        <h2 className="text-xl font-semibold text-gray-800">Subjects</h2>
                        <ul className="list-disc pl-5 mt-2 space-y-1">
                            {book.subjects.map((subject, index) => (
                                <li key={index} className="text-gray-700">
                                    {subject}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Bookshelves */}
                    <div className="mt-6">
                        <h2 className="text-xl font-semibold text-gray-800">Bookshelves</h2>
                        <ul className="list-disc pl-5 mt-2 space-y-1">
                            {book.bookshelves.map((shelf, index) => (
                                <li key={index} className="text-gray-700">
                                    {shelf}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Download Links */}
                    <div className="mt-6">
                        <h2 className="text-xl font-semibold text-gray-800">Available Formats</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                             {Object.entries(book.formats).map(([format, link], index) => (
                            <a
                                key={index}
                                href={link}
                                className="block bg-black hover:bg-gray-600 text-white py-2 px-4 rounded-lg text-center transition duration-300"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                {format.toUpperCase()}
                            </a>
                        ))}
                        </div>
                    </div>
                </div> : <div className='flex items-center justify-center h-screen'>"No book data found.."</div>
            }
        </MainLayout>
    );
}
