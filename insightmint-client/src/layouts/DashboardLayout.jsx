import { Outlet } from "react-router-dom";
import DashboardNav from "../components/DashboardNav/DashboardNav";

const DashboardLayout = () => {
  return (
    <>
      <main className="flex">
        <aside className="w-2/12 h-screen flex items-center absolute md:static">
          <div className="drawer z-50 lg:hidden">
            <input id="my-drawer" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content">
              <label
                htmlFor="my-drawer"
                className="primary-button drawer-button"
              >
                Dashboard Menu
              </label>
            </div>
            <div className="drawer-side">
              <label
                htmlFor="my-drawer"
                aria-label="close sidebar"
                className="drawer-overlay"
              ></label>
              <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
                <DashboardNav />
              </ul>
            </div>
          </div>
          <div className="hidden lg:block">
            <DashboardNav />
          </div>
        </aside>
        <div className="w-full px-5 md:px-0 md:w-10/12 h-screen overflow-y-scroll">
          <Outlet />
        </div>
      </main>
    </>
  );
};

export default DashboardLayout;
