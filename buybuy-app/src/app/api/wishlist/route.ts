import {
    addWishlist,
    getDataWishlist,
    getWishlistById,
    // getWishlistByProductId,
} from "@/app/db/models/wishlist";
import { addWhisListValidate } from "@/validators/user.validator";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { string, z } from "zod";

export const GET = async () => {
    const data = await getDataWishlist();

    return Response.json(data);
};

export const POST = async (request: NextRequest) => {
    try {
        const productId = await request.json();

        const getHeaders = headers();
        const userId = getHeaders.get("userId");

        // console.log(userId, "user id in roote wislist");

        if (!userId) {
            return NextResponse.json(
                { message: "You're not authorized" },
                { status: 401 }
            );
        }

        const data = await addWishlist(userId, productId);

        return NextResponse.json(
            { message: "Data has been added", data },
            { status: 201 }
        );
    } catch (error) {
        if (error instanceof z.ZodError) {
            return NextResponse.json(
                { message: error.errors },
                { status: 400 }
            );
        }
        return NextResponse.json(
            { message: "Internal Server Error" },
            { status: 500 }
        );
    }
};

// export const DELETE = async (request: Request) => {};
