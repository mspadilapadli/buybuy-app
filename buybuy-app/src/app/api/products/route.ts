import { getAllProducts } from "@/app/db/models/products";
import { NextRequest } from "next/server";

export const GET = async (request: NextRequest) => {
    let search = request.nextUrl.searchParams.get("search");
    //  console.log(request.nextUrl, "search params");
    const data = await getAllProducts(search);
    return Response.json(data);
};
