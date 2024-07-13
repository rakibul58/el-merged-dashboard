import { useContext, useEffect, useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";

import CustomNavLinks from "../ui/MainLayout/CustomNavLinks";

import { AuthContext } from "../../contexts/AuthProvider";
import axios from "axios";

const MainLayout = ({ role }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [organizationDetails, setOrganizationDetails] = useState();
  const { logOut, loading } = useContext(AuthContext);
  const navigate = useNavigate();
  const {userInfo} = useContext(AuthContext)

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/v1/organizations/668e122e1af8b0decb4bd6f4`)
      .then((org) => {
        setOrganizationDetails(org?.data.data);
      })
      .catch((error) => console.error(error));
  }, []);
  


  const handleLogout = async () => {
    await logOut()
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        throw Error(error);
      });
  };

  if (loading) {
    return <div>Loading ....</div>
  }

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 w-64 bg-gray-800 text-white flex flex-col transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:relative md:translate-x-0 transition-transform duration-200 ease-in-out`}
      >
        <div className="p-4 flex justify-between items-center">
          <NavLink to="/" className="text-xl font-semibold">
            Experiment Labs
          </NavLink>
          <button
            className="md:hidden text-white focus:outline-none"
            onClick={() => setSidebarOpen(false)}
          >
            ✖
          </button>
        </div>
        <nav className="">
          <ul>
            {role === "student" &&
              organizationDetails?.studentRoutes?.map((item, index) => (
                <CustomNavLinks item={item} key={index} role={role} />
              ))}
            {role === "parent" &&
             organizationDetails?.parentRoutes?.map((item, index) => (
                <CustomNavLinks item={item} key={index} role={role} />
              ))}
            {role === "admin" &&
              organizationDetails?.adminRoutes?.map((item, index) => (
                <CustomNavLinks item={item} key={index} role={role} />
              ))}
            {role === "school" &&
              organizationDetails?.schoolRoutes?.map((item, index) => (
                <CustomNavLinks item={item} key={index} role={role} />
              ))}

            <li className="px-2 py-1">
              <button
                onClick={handleLogout}
                className="hover:bg-red-700 bg-red-500 font-semibold block w-full py-2 pl-2 rounded-md text-lg border border-stone-500"
              >
                Logout
              </button>
            </li>
          </ul>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex flex-col flex-grow w-full">
        <header className="w-full p-4 bg-gray-800 text-white flex justify-between items-center md:hidden">
          <button
            className="text-white focus:outline-none"
            onClick={() => setSidebarOpen(true)}
          >
            ☰
          </button>
          {!sidebarOpen && (
            <h2 className="text-xl font-semibold">Experiment Labs</h2>
          )}
        </header>
        <main className="flex-grow bg-slate-100">
          {/* Your content goes here */}
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
