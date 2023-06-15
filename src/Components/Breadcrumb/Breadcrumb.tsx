import React from "react";
import { Link, useLocation, useMatches } from "react-router-dom";
import "./breadcrumb.css";

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
          <Link to={currentLink}>{crumb}</Link>
        </div>
      );
    });

  return (
    <div className="breadcrumbs">
      <div className="crumb">
        <Link to={"/"}>Home</Link>
      </div>
      {crumbs}
    </div>
  );
};
//   const items: { title: string; path: string }[] = [
//     {
//       title: "Home",
//       path: "/",
//     },
//     {
//       title: "Brand",
//       path: "/brand",
//     },
//     {
//       title: "ProductType",
//       path: "/productType",
//     },
//   ];

//   console.log(location.pathname);
//   console.log(items[1].path);
//   function itemRender(route: any, params: any, items: any, paths: any) {
//     const last = items.indexOf(items) === items.length - 1;
//     console.log(last);
//     return last ? (
//       <span>{items.title}</span>
//     ) : (
//       <Link to={paths.join("/")}>{items[0].title}</Link>
//     );

//   return <BreadcrumbWrapper itemRender={itemRender} items={items} />
export default Breadcrumb;
