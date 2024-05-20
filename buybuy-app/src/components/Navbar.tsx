"use server";
import Link from "next/link";
import Search from "./Seacrh";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function Navbar() {
    const authorization = cookies().get("Authorization");
    // console.log(authorization, "isLogin");
    const handleLogout = () => {
        "use server";
        cookies().delete("Authorization");
        redirect("/");
    };
    return (
        <>
            {/* navbar */}
            <div className="navbar bg-rose-700">
                <div className="flex-1 text-white">
                    <Link href={"/"} className="btn btn-ghost text-xl">
                        BuyBuy
                    </Link>
                    <Link href={"/products"} className="btn btn-ghost text-sm">
                        Products
                    </Link>
                    <Link href={"/wishlist"} className="btn btn-ghost text-sm">
                        Wishlist
                    </Link>
                </div>
                <div className="flex-none gap-2">
                    <div className="flex items-center text-white">
                        {authorization ? (
                            <>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="1.5"
                                    stroke="currentColor"
                                    className="w-6 h-6"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9"
                                    />
                                </svg>

                                <form
                                    action={handleLogout}
                                    className="btn btn-ghost text-sm"
                                >
                                    <button type="submit">Logout</button>
                                </form>
                            </>
                        ) : (
                            <>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="1.5"
                                    stroke="currentColor"
                                    className="w-6 h-6"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15M12 9l3 3m0 0-3 3m3-3H2.25"
                                    />
                                </svg>
                                <Link
                                    href={"/login"}
                                    className="btn btn-ghost text-sm"
                                >
                                    Sign in
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </div>

            {/* end navbar */}
        </>
    );
}
