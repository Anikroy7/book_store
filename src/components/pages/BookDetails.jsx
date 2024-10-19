import React from 'react';
import MainLayout from '../layouts/MainLayout';
import { useGetSingleBook } from '../../hooks/useGetSingleBook';
import { useParams } from 'react-router-dom';
import Loading from '../UI/Loading';


export default function BookDetails() {
    const { bookId } = useParams()
    const { book, isLoading } = useGetSingleBook(bookId);
    if (isLoading) return <Loading />

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
