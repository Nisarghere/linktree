import Navbar from "@/components/Navbar";
import Footer from "../Footer/footer";



export default function MainLayout({ children }) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
}