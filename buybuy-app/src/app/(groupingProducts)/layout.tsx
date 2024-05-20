import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidedbar";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        // <div className="flex flex-col justify-center p-8 md:p-20">
        <>
            <Navbar />
            <div className="w-full flex h-full">
                {/* <Sidebar /> */}
                <div className="w-full p-8 bg-gray-200">{children}</div>
            </div>
        </>
        // </div>
    );
}
