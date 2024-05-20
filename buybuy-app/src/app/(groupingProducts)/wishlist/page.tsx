"use client";
import React from "react";

import { string } from "zod";
import { Product } from "../products/page";
import { useEffect, useState } from "react";
import CardWishlist from "../../../components/CardWishlist";

export interface dataWishlist {
    _id: string;
    userId: string;
    productId: string;
    createdAt: Date;
    updatedAt: Date;
    product: Product;
}

export default function Wishlist() {
    const [wishlist, setWishlist] = useState<dataWishlist[]>([]);
    const [isLoading, setLoading] = useState(true);

    const fetchData = async () => {
        try {
            const response = await fetch(
                process.env.NEXT_PUBLIC_URL_API + `/wishlist`,
                {
                    method: "GET",
                    cache: "no-store",
                }
            );

            if (!response.ok) {
                throw new Error("Network response was not ok");
            }

            const data = await response.json(); // Mengonversi respons ke JSON
            // console.log("data wishlist", data); // Output data JSON dari API

            setLoading(false); // Simpan data JSON ke dalam state
            setWishlist(data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    if (isLoading) return <p>Loading...</p>;
    if (!wishlist) return <p>No products data</p>;

    return (
        <>
            {/* <Navbar /> */}
            <div
                id="Projects"
                className="w-fit mx-auto grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 justify-items-center justify-center gap-y-20 gap-x-14 mt-10 mb-5"
            >
                {/* <CardProduct /> */}
                {wishlist &&
                    wishlist.map((e: dataWishlist, i: number) => {
                        return <CardWishlist product={e.product} key={e._id} />;
                    })}
            </div>
        </>
    );
}
