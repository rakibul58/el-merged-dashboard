import { useContext, useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { parentRoutes } from "../../routes/parent.routes";
import CustomNavLinks from "../ui/MainLayout/CustomNavLinks";
import { studentRoutes } from "../../routes/student.routes";
import { adminRoutes } from "../../routes/admin.routes";
import { schoolRoutes } from "../../routes/school.routes";
import { AuthContext } from "../../contexts/AuthProvider";

const MainLayout = ({ role }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { logOut } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logOut()
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        throw Error(error);
      });
  };

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
              studentRoutes?.map((item, index) => (
                <CustomNavLinks item={item} key={index} role={role} />
              ))}
            {role === "parent" &&
              parentRoutes?.map((item, index) => (
                <CustomNavLinks item={item} key={index} role={role} />
              ))}
            {role === "admin" &&
              adminRoutes?.map((item, index) => (
                <CustomNavLinks item={item} key={index} role={role} />
              ))}
            {role === "school" &&
              schoolRoutes?.map((item, index) => (
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
