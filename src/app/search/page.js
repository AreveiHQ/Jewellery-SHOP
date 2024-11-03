"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { ExclamationCircleIcon } from '@heroicons/react/24/outline';
import NavBar from "@/components/HomePage/Navbar";
import Header from "@/components/HomePage/Header";
import Footer from "@/components/HomePage/Footer";

export default function SearchPage() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const searchParams = useSearchParams();
    const query = searchParams.get("q");

    useEffect(() => {
        if (query) {
            const fetchProducts = async () => {
                setLoading(true);
                setError(null);
                try {
                    const response = await fetch(`/api/search?search=${query}`);
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    const data = await response.json();
                    setProducts(data);
                } catch (err) {
                    setError(err.message);
                } finally {
                    setLoading(false);
                }
            };
            fetchProducts();
        }
    }, [query]);

    return (
        <div className="min-h-screen bg-gray-50">
            <Header />
            <NavBar />
            <div className="container mx-auto p-6">
                <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">Search Results for "{query}"</h1>
                {loading ? (
                    <div className="flex justify-center items-center h-48">
                        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-blue-600"></div>
                        <span className="ml-4 text-xl text-gray-600">Loading...</span>
                    </div>
                ) : error ? (
                    <div className="flex items-center p-4 mt-4 border border-red-500 bg-red-100 text-red-600 rounded shadow-md">
                        <ExclamationCircleIcon className="h-8 w-8 mr-3" />
                        <span className="text-lg font-medium">Error: {error}</span>
                    </div>
                ) : products.length > 0 ? (
                    <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {products.map((product) => (
                            <li key={product._id} className="bg-white p-4 border rounded shadow-md hover:shadow-lg transition-shadow duration-200">
                                <h2 className="text-xl font-semibold text-gray-800">{product.name}</h2>
                                <p className="text-gray-600">{product.description}</p>
                                <p className="text-green-600 font-bold mt-2">Price: ${product.price}</p>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <div className="flex items-center p-4 mt-4 border border-red-500 bg-red-100 text-red-600 rounded shadow-md">
                        <ExclamationCircleIcon className="h-8 w-8 mr-3" />
                        <span className="text-lg font-medium">No products found</span>
                    </div>
                )}
            </div>
            <Footer />
        </div>
    );
}
