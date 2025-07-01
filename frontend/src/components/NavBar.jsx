import { NavLink } from "react-router-dom";
import "../assets/sass/NavBar.scss";

const NavBar = () => {
  return (
    <nav className="nav-bar">
      <NavLink
        to="/Book/"
        className={({ isActive }) =>
          isActive ? "nav-link active" : "nav-link"
        }
      >
        Home
      </NavLink>
      <NavLink
        to="/Book/dashboard/addbook"
        className={({ isActive }) =>
          isActive ? "nav-link active" : "nav-link"
        }
      >
        Add Book
      </NavLink>
      <NavLink
        to="/Book/dashboard/listBookDelete"
        className={({ isActive }) =>
          isActive ? "nav-link active" : "nav-link"
        }
      >
        Delete
      </NavLink>
    </nav>
  );
};

export default NavBar;
