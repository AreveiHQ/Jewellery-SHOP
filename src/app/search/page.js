"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { ExclamationCircleIcon } from '@heroicons/react/24/outline';


export default function SearchPage() {
    const [products, setProducts] = useState([]);
    const searchParams = useSearchParams();
    const query = searchParams.get("q");

    useEffect(() => {
        if (query) {
            const fetchProducts = async () => {
                const response = await fetch(`/api/search?search=${query}`);
                const data = await response.json();
                setProducts(data);
            };
            fetchProducts();
        }
    }, [query]);

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Search Results for "{query}"</h1>
            {products.length > 0 ? (
                <ul>
                    {products.map((product) => (
                        <li key={product._id} className="mb-4 p-4 border rounded shadow-md">
                            <h2 className="text-xl font-semibold">{product.name}</h2>
                            <p>{product.description}</p>
                            <p className="text-green-600 font-bold">Price: ${product.price}</p>
                        </li>
                    ))}
                </ul>
            ) : (
                    <div className="flex items-center p-4 mt-4 border border-red-500 bg-red-100 text-red-600 rounded">
                        <ExclamationCircleIcon className="h-6 w-6 mr-2" /> {/* Icon here */}
                        <span className="text-lg">No products found</span>
                    </div>
            )}
        </div>
    );
}
