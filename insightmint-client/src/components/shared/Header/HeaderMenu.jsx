import { Link, NavLink } from "react-router-dom";
import Container from "../../Container/Container";

import LogoDark from "../../../assets/images/logo/logo_dark.png";
import useAuth from "../../../hooks/useAuth";
import { LuLayoutDashboard } from "react-icons/lu";

const HeaderMenu = () => {
  const { user, authLoading } = useAuth();

  const activeButton = `!bg-transparent !border-b-2 hover:!border-b-2 !border-white active:scale-95 font-bold !rounded`;
  const inActiveButton = `!bg-transparent !border-b-2 !border-transparent hover:!border-b-2 hover:!border-white hover:!text-white active:scale-95 font-medium !rounded`;
  const menuLinks = (
    <>
      <li>
        <NavLink
          to="/"
          className={({ isActive, isPending }) =>
            isPending ? "pending" : isActive ? activeButton : inActiveButton
          }
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/surveys"
          className={({ isActive, isPending }) =>
            isPending ? "pending" : isActive ? activeButton : inActiveButton
          }
        >
          Surveys
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/become-a-pro-user"
          className={({ isActive, isPending }) =>
            isPending ? "pending" : isActive ? activeButton : inActiveButton
          }
        >
          Become A Pro User
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/blog"
          className={({ isActive, isPending }) =>
            isPending ? "pending" : isActive ? activeButton : inActiveButton
          }
        >
          Blog
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/about-us"
          className={({ isActive, isPending }) =>
            isPending ? "pending" : isActive ? activeButton : inActiveButton
          }
        >
          About Us
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/contact-us"
          className={({ isActive, isPending }) =>
            isPending ? "pending" : isActive ? activeButton : inActiveButton
          }
        >
          Contact Us
        </NavLink>
      </li>
    </>
  );
  const menuLinksForMobile = (
    <>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      <li>
        <NavLink to="/surveys">Surveys</NavLink>
      </li>
      <li>
        <NavLink to="/become-a-pro-user">Become A Pro USER</NavLink>
      </li>
      <li>
        <NavLink to="/blog">Blog</NavLink>
      </li>
      <li>
        <NavLink to="/about-us">About Us</NavLink>
      </li>
      <li>
        <NavLink to="/contact-us">Contact Us</NavLink>
      </li>
    </>
  );

  return (
    <>
      <div className="bg-[#041729] z-50">
        <Container>
          <nav>
            <div className="navbar">
              <div className="navbar-start">
                <div className="dropdown">
                  <label
                    tabIndex={0}
                    className="btn btn-ghost lg:hidden text-white"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4 6h16M4 12h8m-8 6h16"
                      />
                    </svg>
                  </label>
                  <ul
                    tabIndex={0}
                    className="menu menu-sm dropdown-content mt-3 z-[9991] p-2 shadow bg-base-100 rounded-box w-52"
                  >
                    {menuLinksForMobile}
                  </ul>
                </div>
                <Link>
                  <picture>
                    <img className="w-2/4" src={LogoDark} alt="" />
                  </picture>
                </Link>
              </div>
              <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1 text-white">
                  {menuLinks}
                </ul>
              </div>
              <div className="navbar-end text-white">
                <div className="space-x-2">
                  {!user && (
                    <Link to="/auth">
                      <span className="btn btn-sm ">Login</span>
                    </Link>
                  )}
                </div>

                {user && (
                  <div className="">
                    <Link
                      to="/dashboard"
                      className="flex items-center space-x-2 text-sm"
                    >
                      <span className="inline-block bg-orange-color p-1.5 rounded-full text-white">
                        <LuLayoutDashboard />
                      </span>
                      <div>
                        <span className="hover:underline ">Dashboard</span>
                      </div>{" "}
                    </Link>
                  </div>
                )}
                {/* {!authLoading && (
                  <div className="space-x-2 lg:hidden">
                    {user?.email ? (
                      <>
                        <Link to="/dashboard">
                          <button className="btn btn-sm border-none bg-gray-950 hover:bg-stone-950 text-white">
                            Dashboard
                          </button>
                        </Link>
                      </>
                    ) : (
                      <>
                        <Link to="/auth">
                          <button className="btn btn-sm border-none bg-gray-950 hover:bg-stone-950 text-white">
                            Login
                          </button>
                        </Link>
                      </>
                    )}
                  </div>
                )} */}
              </div>
            </div>
          </nav>
        </Container>
      </div>
    </>
  );
};

export default HeaderMenu;
