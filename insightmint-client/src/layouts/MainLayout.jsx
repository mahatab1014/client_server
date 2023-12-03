import { Outlet } from "react-router-dom";
import Footer from "../components/shared/Footer/Footer";
import HeaderMenu from "../components/shared/Header/HeaderMenu";

const MainLayout = () => {
  return (
    <>
      <header>
        <HeaderMenu />
      </header>
      <main>
        <Outlet />
      </main>
      <footer className="pt-20 pb-5">
        <Footer />
      </footer>
    </>
  );
};

export default MainLayout;
