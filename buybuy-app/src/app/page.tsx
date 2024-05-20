import Banner from "@/components/Banner";
import CardHome from "@/components/CardHome";
import Footer from "@/components/Foooter";
import Navbar from "@/components/Navbar";

export default function Home() {
    return (
        <>
            <Navbar />
            <Banner />
            {/* banner */}
            <CardHome />
            {/* banner */}

            <Footer />
        </>
    );
}
