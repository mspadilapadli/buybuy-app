"use client";

import { useRouter } from "next/navigation";

export default function ButtonDeleteWishlist({
    productId,
}: {
    productId: string;
}) {
    const deleteWishlist = async (productId: string) => {
        const response = await fetch(
            process.env.NEXT_PUBLIC_URL_API + `/wishlist/${productId}`,
            {
                method: "DELETE",
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
        }
        const data = await response.json();
        // fetchData();

        // console.log(data, "add wishlist");
    };

    return (
        <button
            onClick={() => {
                deleteWishlist(productId);
                window.location.reload();
            }}
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
                    d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
            </svg>
        </button>
    );
}
