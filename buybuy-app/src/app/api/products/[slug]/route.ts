import { getProductBySlug } from "@/app/db/models/products";
import { NextRequest, NextResponse } from "next/server";

export type getParamsSlugProduct = {
    params: {
        slug: string;
    };
};

export const GET = async (
    request: NextRequest,
    { params }: getParamsSlugProduct
) => {
    // console.log(params, "paramSlug");
    const data = await getProductBySlug(params.slug);
    return NextResponse.json(data);
};
