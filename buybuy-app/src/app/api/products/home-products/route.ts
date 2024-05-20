import { getHomeProducts } from "@/app/db/models/products";
import { NextRequest } from "next/server";
export const dynamic = "force-dynamic";

export const GET = async (request: NextRequest) => {
    const data = await getHomeProducts();
    return Response.json(data);
};
