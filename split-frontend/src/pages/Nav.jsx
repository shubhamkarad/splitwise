import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/authContext";
const links = [
  { path: "/", name: "home" },
  { path: "/projects", name: "my projects" },
  { path: "/contact", name: "contact" },
];

const Nav = ({ containerStyles, linkStyles, underlineStyles }) => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const path = useLocation().pathname;

  const handleLogout = () => {
    logout();
    navigate("/auth");
  };

  return (
    <nav className={`${containerStyles}`}>
      {links.map((link, index) => {
        return (
          <Link
            to={link.path}
            key={index}
            className={`captalize ${linkStyles}`}
          >
            {link.path === path && (
              <motion.span
                initial={{ y: "-100%" }}
                animate={{ y: 0 }}
                className={`${underlineStyles}`}
                transition={{ type: "tween" }}
                layoutId="underline"
              />
            )}
            {link.name}
          </Link>
        );
      })}
      {user ? (
        <>
          <Link to="/dashboard" className="mr-4">
            Dashboard
          </Link>
          <button onClick={handleLogout} className="mr-4">
            Logout
          </button>
        </>
      ) : (
        <Link to="/auth" className="mr-4">
          Login
        </Link>
      )}
    </nav>
  );
};
export default Nav;
