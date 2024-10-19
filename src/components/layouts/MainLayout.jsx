import React from 'react'
import Navbar from '../shared/Navbar'
import Footer from '../shared/Footer'

export default function MainLayout({ children }) {
    return (
        <>
            <Navbar />
            <main className='h-screen'>
                {children}
            </main>
            <Footer />
        </>
    )
}
