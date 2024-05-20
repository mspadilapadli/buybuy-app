"use client";
import { Product } from "@/app/(groupingProducts)/products/page";
import Link from "next/link";
import ButtonWishList from "./ButtonWishslist";
import ButtonDeleteWishlist from "./ButtonDeleteWishlist";

// { product }: { product: Product }
export default function CardWishlist({ product }: { product: Product }) {
    return (
        <>
            {/*   ✅ Product card 2 - Starts Here 👇 */}
            <div className="w-72 bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl">
                <Link href={`/products/${product.slug}`}>
                    <img
                        src={product.thumbnail}
                        alt="Product"
                        className="h-80 w-72 object-cover rounded-t-xl"
                    />
                </Link>
                <div className="px-4 py-3 w-72">
                    <span className="text-gray-400 mr-3 uppercase text-xs">
                        Brand
                    </span>
                    <p className="text-lg font-bold text-black truncate block capitalize">
                        {product.name}
                    </p>
                    <div className="flex items-center">
                        <p className="text-base font-semibold text-black cursor-auto my-3">
                            RP {product.price.toLocaleString("id-ID")}
                        </p>
                        <del>
                            <p className="text-sm text-gray-600 cursor-auto ml-2">
                                {(product.price * 1.3).toLocaleString("id-ID")}
                            </p>
                        </del>
                        <div className="ml-auto flex flex-row gap-2">
                            {/* {<ButtonWishList productId={product._id} />} */}
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="w-6 h-6  transition-colors duration-300 ease-in-out hover:stroke-sky-500"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                                />
                            </svg>

                            {<ButtonDeleteWishlist productId={product._id} />}
                        </div>
                    </div>
                </div>
            </div>
            {/*   🛑 Product card 2- Ends Here  */}
        </>
    );
}
