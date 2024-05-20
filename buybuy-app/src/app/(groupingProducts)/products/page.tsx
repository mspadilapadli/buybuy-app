"use client";

import CardProduct from "@/components/CardProduct";
import Search from "@/components/Seacrh";

// import SearchBar from "@/components/SearchBar";

import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

export interface Product {
    _id: string;
    name: string;
    slug: string;
    description: string;
    excerpt: string;
    price: number;
    tags: string[];
    thumbnail: string;
    images: string[];
    createdAt: Date;
    updatedAt: Date;
}

export default function Page() {
    const [items, setItems] = useState([]);
    const [hasMore, setHasMore] = useState(true);
    const [currentPage, setCurrentPage] = useState(2);
    const [search, setSearch] = useState("");

    async function getData() {
        const res = await fetch(
            process.env.NEXT_PUBLIC_URL_API +
                `/pagination?searchQuery=${search}&pageNumber=1`,
            {
                cache: "no-store",
            }
        );
        if (!res.ok) {
            throw new Error("Failed to fetch data");
        }
        const { data } = await res.json();
        setItems(data);
    }

    useEffect(() => {
        getData();
    }, []);

    async function fetchProduct() {
        const res = await fetch(
            process.env.NEXT_PUBLIC_URL_API +
                `/pagination?searchQuery=${search}&pageNumber=${currentPage}`,
            {
                cache: "no-store",
            }
        );
        const { data } = await res.json();
        return data;
    }

    const fetchData = async () => {
        const moreProduct: never[] = await fetchProduct();

        setItems([...items, ...moreProduct]);

        if (moreProduct.length === 0 || moreProduct.length < 8) {
            setHasMore(false);
        }

        setCurrentPage(currentPage + 1);
    };

    return (
        <>
            <div className="flex justify-between items-center">
                <div className="text-xl font-bold">BuyBuy</div>
                <div className="ml-auto">
                    <Search fetchData={fetchData} />
                </div>
            </div>
            <InfiniteScroll
                dataLength={items.length} //This is important field to render the next data
                next={fetchData}
                hasMore={hasMore}
                loader={<div>Loading..</div>}
                endMessage={
                    <p className="text-center">
                        <b>That is all we got for now!</b>
                    </p>
                }
            >
                <div
                    id="Projects"
                    className="w-fit mx-auto grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 justify-items-center justify-center gap-y-20 gap-x-14 mt-10 mb-5"
                >
                    {/* <CardProduct /> */}
                    {items &&
                        items.map((e: Product, i: number) => {
                            return <CardProduct product={e} key={i} />;
                        })}
                </div>
            </InfiniteScroll>
        </>
    );
}
