import { Product } from "@/app/(groupingProducts)/products/page";
import Link from "next/link";
import CardProduct from "./CardProduct";

async function getProductHome(): Promise<Product[]> {
    const response = await fetch(
        process.env.NEXT_PUBLIC_URL_API + "/products/home-products",
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

export default async function CardHome() {
    const dataProductHome = await getProductHome();
    // console.log(dataProductHome, "data home");

    return (
        <>
            <div className="h-full">
                <div className="flex">
                    <div className="max-w-6xl mx-auto mt-8 text-center">
                        <Link
                            href="/products"
                            className="bg-rose-500 hover:bg-rose-800 text-white font-semibold py-3 px-6 rounded-full inline-block transition duration-300"
                        >
                            View More
                        </Link>
                    </div>
                </div>
                <div
                    id="Projects"
                    className="w-fit mx-auto grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 justify-items-center justify-center gap-y-20 gap-x-14 mt-10 mb-8 "
                >
                    {dataProductHome &&
                        dataProductHome.map((e: Product, i: number) => {
                            return <CardProduct product={e} key={e._id} />;
                        })}
                </div>
            </div>
        </>
    );
}
