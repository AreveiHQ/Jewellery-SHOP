'use client';
import Footer from '@/components/HomePage/Footer';
import NavBar from '@/components/HomePage/Navbar';
import axios from 'axios';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function Page() {
    const { id } = useParams(); // Extracts `id` from the path, e.g., /myorderitems/[id]
    const [orderItems, setOrderItems] = useState([]);
    const [loading, setLoading] = useState(true); // Track loading state

    useEffect(() => {
        if (id) {
            async function fetchOrderItems() {
                try {
                    
                    const response = await axios.get(`/api/orders/${id}`);
                    console.log(response.data);

                    setOrderItems(response.data.items); // Update state with the response data
                    setLoading(false);
                } catch (error) {
                    console.error('Error fetching order items:', error);
                    setLoading(false);
                }
            }

            fetchOrderItems();
        }
    }, [id]);

    return (
        <>
        <NavBar/>
        <div className="order-items-container p-4">
            {loading ? (
                <p>Loading...</p>
            ) : orderItems.length > 0 ? (
                orderItems.map((item) => (
                    item.productDetails ? (
                        <div key={item._id} className="order-item-card border p-4 rounded-lg shadow-lg mb-4">
                            <img
                                src={item.productDetails.images?.[0] || null} // Fallback to a placeholder if no image
                                alt={item.productDetails.name || 'Product Image'}
                                className="w-40 h-40 object-cover mb-2"
                            />
                            <h2 className="text-lg font-bold">{item.productDetails.name || 'Unnamed Product'}</h2>
                            <p className="text-sm text-gray-500">Price: ${item.productDetails.discountPrice ?? 'N/A'}</p>
                            <p className="text-sm text-gray-500">Original Price: ${item.productDetails.price ?? 'N/A'}</p>
                            <p className="text-sm text-gray-500">Quantity: {item.quantity ?? 'N/A'}</p>
                            <p className="text-red-500 text-sm cursor-pointer hover:underline">
                            <Link href={"/myitem"}>Track Order Status</Link>
                            </p>
                            
                        </div>
                    ) : (
                        <div key={item._id} className="order-item-card border p-4 rounded-lg shadow-lg mb-4">
                            <p className="text-red-500">Product details not available</p>
                        </div>
                    )
                ))
            ) : (
                <p>No items found.</p>
            )}
        </div>
        <Footer/>
        </>
    );
}
