"use client";
import { Product } from "@/app/(groupingProducts)/products/page";
import Link from "next/link";
import ButtonWishList from "./ButtonWishslist";

// { product }: { product: Product }
export default function CardProduct({ product }: { product: Product }) {
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
                            {<ButtonWishList productId={product._id} />}

                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="w-6 h-6"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                                />
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
            {/*   🛑 Product card 2- Ends Here  */}
        </>
    );
}
