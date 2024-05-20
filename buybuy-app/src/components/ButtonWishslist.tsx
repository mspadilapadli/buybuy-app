"use client";

import { useRouter } from "next/navigation";

export default function ButtonWishList({ productId }: { productId: string }) {
    // console.log(productId, "product id button comp");
    const router = useRouter();
    const addWishlist = async (productId: string) => {
        const response = await fetch(
            process.env.NEXT_PUBLIC_URL_API + `/wishlist`,
            {
                method: "POST",
                cache: "no-store",
                body: JSON.stringify(productId),
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
        if (!response.ok) {
            const data = await response.json();
            console.log(data.message);
            router.push("/products");
        }
        // const data = await response.json();
        // console.log(data, "add wishlist");
        router.push("/wishlist");
    };

    return (
        <>
            <button
                onClick={() => {
                    addWishlist(productId);
                }}
                className="relative"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-6 h-6 transition-colors duration-300 ease-in-out hover:stroke-rose-500"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                    />
                </svg>
            </button>
        </>
    );
}
