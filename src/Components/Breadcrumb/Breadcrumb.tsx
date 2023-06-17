import React from "react";
import { Link, useLocation } from "react-router-dom";
import "../style/breadcrumb.css";

const Breadcrumb = () => {
  const location = useLocation();
  let currentLink = "";
  const crumbs = location.pathname
    .split("/")
    .filter((crumb) => crumb !== "")
    .map((crumb) => {
      currentLink += `/${crumb}`;
      return (
        <div className="crumb" key={crumb}>
          <Link to={currentLink}>{decodeURIComponent(crumb)}</Link>
        </div>
      );
    });

  return (
    <div className="breadcrumbs">
      <div className="crumb">
        <Link className="linkCrumb" to={"/"}>
          Home
        </Link>
      </div>
      {crumbs}
    </div>
  );
};
export default Breadcrumb;
