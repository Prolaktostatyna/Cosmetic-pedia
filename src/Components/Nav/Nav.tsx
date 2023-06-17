import { Link } from "react-router-dom";
import "../style/nav.css";

const Nav = () => {
  // const handleToggleMode = () => {
  //   console.log("test");
  // };
  return (
    <div>
      <Link to={"/"}>
        <div className="nav_logo"></div>
      </Link>
      {/* <div onClick={handleToggleMode}>Toggle</div> */}
    </div>
  );
};

export default Nav;
