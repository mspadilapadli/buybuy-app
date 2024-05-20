"use server";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export const Logout = async () => {
    cookies().delete("Authorization");
    redirect("/login");
};
// note : invoke logout saat onclik di navbar(csr)
