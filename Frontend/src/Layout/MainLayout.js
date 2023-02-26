
import Header from "../Components/Header";
import Footer from "../Components/Footer";

function MainLayout({children}){
    return (
        <>
            <Header />
            {children}
            <Footer />
        </>
    )
}
export default MainLayout;