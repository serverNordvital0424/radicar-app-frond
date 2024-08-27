import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { NavLink } from "react-router-dom";
import { useUserProfile } from "../context/userProfileContext";
import { useTheme } from "../context/blackWhiteContext"; // Asegúrate de que el hook useTheme esté importado
import userLogo from "/assets/user-logo.svg";

interface NavbarProps {
  onLogout: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onLogout }) => {
  const { userProfile } = useUserProfile();
  const { theme, toggleTheme } = useTheme(); // Desestructura theme y toggleTheme

  const userNavigation = [
    { name: "Perfil", href: "/perfil" },
    { name: "Cerrar Sección", action: onLogout },
  ];

  return (
    <header className={`text-gray-900 body-font ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
      <div className="mx-auto flex flex-wrap p-5 border-b-2 border-black dark:border-gray-700">
        <nav className="flex flex-wrap items-center text-base">
          <NavLink to="/">
            <img
              src="./src/imgs/logo-navbar.png"
              className="w-10 h-10"
              alt="Logo"
            />
          </NavLink>
        </nav>

        {/* Botón de Modo Oscuro */}
        <button
          onClick={toggleTheme}
          className="ml-auto mr-4 p-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-full focus:outline-none"
        >
          {theme === "light" ? "🌙" : "☀️"}
        </button>

        <Menu as="div" className="relative">
          <MenuButton className="flex items-center bg-gray-900 border-0 py-1 px-3 focus:outline-none hover:bg-gray-700 rounded text-base text-white hover:text-white group">
            <img
              alt="User"
              src={userProfile.imageUrl}
              className="h-8 w-8 rounded-full mr-2"
            />
            <img
              src={userLogo}
              alt="User Logo"
              className="w-8 h-8 group-hover:invert"
            />
          </MenuButton>
          <MenuItems
            transition
            className={`absolute right-0 z-50 w-56 p-2 border rounded-lg top-16 lg:top-12 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}
          >
            {userNavigation.map((item) => (
              <MenuItem key={item.name}>
                {item.action ? (
                  <button
                    onClick={() => {
                      item.action();
                    }}
                    className={`block px-4 py-2 text-sm ${theme === 'dark' ? 'text-gray-200 hover:bg-gray-700' : 'text-gray-800 hover:bg-gray-200'} rounded-lg transition-colors duration-300`}
                  >
                    {item.name}
                  </button>
                ) : (
                  <NavLink
                    to={item.href}
                    className={`block px-4 py-2 text-sm ${theme === 'dark' ? 'text-gray-200 hover:bg-gray-700' : 'text-gray-800 hover:bg-gray-200'} rounded-lg transition-colors duration-300`}
                  >
                    {item.name}
                  </NavLink>
                )}
              </MenuItem>
            ))}
          </MenuItems>
        </Menu>
      </div>
    </header>
  );
};

export default Navbar;
