import { jwtVerify } from "jose";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { PayloadType } from "./app/helpers/jwt";

export async function middleware(request: NextRequest) {
    // global middelware :  middelware disi akan selalu ke trigger saat kita melalkukan req.
    //  console.log("global middleware");

    if (request.nextUrl.pathname.startsWith("/api/wishlist")) {
        const authorization = cookies().get("Authorization");

        if (!authorization) {
            return NextResponse.json(
                { message: "Unauthorized no auth" },
                { status: 401 }
            );
        }

        // split Bearer <token>
        const token = authorization.value.split(" ");
        if (!token[1]) {
            return NextResponse.json(
                { message: "Unauthorized" },
                { status: 401 }
            );
        }
        // verify jwt pake jose dan get paylod
        const secret = new TextEncoder().encode(process.env.JWT_SECRET);
        const jwt = token[1];

        const { payload } = await jwtVerify<{
            _id: string;
            email: string;
            username: string;
        }>(jwt, secret);

        // sisipkan payload ke headers
        const requestHeaders = new Headers(request.headers);
        requestHeaders.set("userId", payload._id);
        requestHeaders.set("email", payload.email);
        requestHeaders.set("username", payload.username);

        // You can also set request headers in NextResponse.rewrite
        const response = NextResponse.next({
            request: {
                // New request headers
                headers: requestHeaders,
            },
        });

        return response;
    }
    if (request.nextUrl.pathname.startsWith("/login")) {
        const authorization = cookies().get("Authorization");

        if (authorization) {
            return NextResponse.redirect(new URL("/products", request.url));
        }
    }

    if (request.nextUrl.pathname.startsWith("/wishlist")) {
        const authorization = cookies().get("Authorization");

        if (!authorization) {
            return NextResponse.redirect(new URL("/login", request.url));
        }
    }
}
