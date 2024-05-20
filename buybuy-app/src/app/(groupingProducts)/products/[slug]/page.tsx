"use server";
import ButtonWishList from "@/components/ButtonWishslist";
import type { Metadata, ResolvingMetadata } from "next";

type Props = {
    params: { slug: string };
    searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata(
    { params, searchParams }: Props,
    parent: ResolvingMetadata
): Promise<Metadata> {
    // read route params
    const slug = params.slug;

    // fetch data
    const product = (await fetch(
        process.env.NEXT_PUBLIC_URL_API + `/products/${slug}`
    ).then((res) => res.json())) as Product;

    // optionally access and extend (rather than replace) parent metadata
    const previousImages = (await parent).openGraph?.images || [];

    return {
        title: product.name,
        openGraph: {
            images: ["/some-specific-page-image.jpg", ...previousImages],
        },
    };
}

import { Product } from "../page";

export interface getParams {
    params: {
        slug: string;
    };
}

async function detailDataProduct(slug: string): Promise<Product> {
    // console.log(slug, "params in get data");
    const response = await fetch(
        process.env.NEXT_PUBLIC_URL_API + `/products/${slug}`,
        {
            // method: "GET",
            cache: "no-store",
        }
    );
    if (!response.ok) {
        throw new Error("Network response was not ok");
    }
    const data = await response.json();

    return data;
}

export default async function ProductDetail({ params }: getParams) {
    const dataProduct = await detailDataProduct(params.slug);

    return (
        <>
            <div className="flex items-center justify-center h-screen bg-slate-100">
                {/* Card Container */}
                <div className="flex flex-col p-6 m-3 space-y-10 bg-white rounded-2xl shadow-2xl md:flex-row md:space-y-0 md:space-x-10 md:m-0 md:p-16">
                    {/* Image Div */}
                    <div>
                        <img
                            src={dataProduct.images[0]}
                            alt=""
                            className="mx-auto duration-200 w-60 hover:scale-105"
                        />
                    </div>
                    {/* Content */}
                    <div className="flex flex-col space-y-6">
                        {/* Label & Title Container */}
                        <div className="flex flex-col mb-4 space-y-3 text-center md:text-left">
                            <div>
                                <div className="inline-block px-3 py-1 text-sm text-white bg-black rounded-full">
                                    Free Shipping
                                </div>
                            </div>
                            {/* Title */}
                            <div className="max-w-sm text-2xl font-medium">
                                {dataProduct.name}
                            </div>
                            {/* Price Container */}
                            <div className="flex flex-col mb-4 space-y-3 text-center md:text-left">
                                <p className="line-through">
                                    Rp
                                    {(dataProduct.price * 1.3).toLocaleString(
                                        "id-ID"
                                    )}
                                </p>
                                <p className="text-3xl font-bold">
                                    Rp
                                    {dataProduct.price.toLocaleString("id-ID")}
                                </p>
                                <p className="text-sm font-light text-gray-400">
                                    {dataProduct.excerpt}s
                                </p>
                            </div>
                            {/* Button Group */}
                            <div className="group">
                                <button className="w-full transition-all duration-150 bg-rose-700 text-white border-b-8 border-b-rose-700 rounded-lg group-hover:border-t-8 group-hover:border-b-0 group-hover:bg-blue-700 group-hover:border-t-rose-700 group-hover:shadow-lg">
                                    <div className="px-8 py-4 duration-150 bg-rose-500 rounded-lg group-hover:bg-rose-700">
                                        Add to cart
                                    </div>
                                </button>
                            </div>
                            {/* Stock */}
                            <div className="flex items-center space-x-3 group">
                                <div className="w-3 h-3 bg-green-400 rounded-full group-hover:animate-ping" />
                                <div className="text-sm">50+ pcs. in stock</div>
                            </div>
                            {/* Bottom Buttons Container */}
                            <div className="flex items-center justify-center space-x-12">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className="w-6 h-6 transition-colors duration-300 ease-in-out hover:stroke-sky-500"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                                    />
                                </svg>
                                {<ButtonWishList productId={dataProduct._id} />}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
