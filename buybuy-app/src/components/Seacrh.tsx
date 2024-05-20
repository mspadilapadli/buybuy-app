"use client";
import React, { useState } from "react";

export default function Search({
    fetchData,
}: {
    fetchData: (search: string | undefined) => Promise<void>;
}) {
    const [search, setSearch] = useState("");

    const submitSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        fetchData(search);
    };
    return (
        <>
            <form
                onSubmit={submitSearch}
                className="flex-none gap-2 items-center"
            >
                <div className="flex items-center px-3 py-2">
                    <button type="submit">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            className="w-6 h-6 mr-2 text-black"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={1.5}
                                d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                            />
                        </svg>
                    </button>
                    <input
                        type="text"
                        placeholder="Search"
                        className="input focus:outline-none w-24 md:w-auto border-b border-white text-black"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
            </form>
        </>
    );
}
