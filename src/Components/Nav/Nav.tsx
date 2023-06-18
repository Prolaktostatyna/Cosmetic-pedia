import { Link } from "react-router-dom";
import "../style/nav.css";

const Nav = () => {
  return (
    <div>
      <Link to={"/"}>
        <div className="nav_logo"></div>
      </Link>
    </div>
  );
};

export default Nav;
