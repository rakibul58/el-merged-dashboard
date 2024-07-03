import { NavLink } from "react-router-dom";

const CustomNavLinks = ({ item, role }) => {
  const activeClasses =
    "block w-full py-2 pl-2 rounded-md text-lg border border-stone-500 bg-gray-900 font-semibold";
  const inActiveClasses =
    "hover:bg-gray-700 block w-full py-2 pl-2 rounded-md text-lg border border-stone-500";
  return (
    <li className="px-2 py-1">
      <NavLink
        to={`/${role}/${item.path}`}
        className={({ isActive }) =>
          isActive ? activeClasses : inActiveClasses
        }
      >
        {item.label}
      </NavLink>
    </li>
  );
};

export default CustomNavLinks;
