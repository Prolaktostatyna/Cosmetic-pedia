import React, { useEffect } from "react";
import { Card } from "antd";
import { Link, useNavigate } from "react-router-dom";

const gridStyle: React.CSSProperties = {
  width: "25%",
  minHeight: "100px",
  textAlign: "center",
  lineHeight: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
};

const Main: React.FC = () => {
  const brands: Array<any> = [
    "Annabelle",
    "Benefit",
    "Clinique",
    "Dior",
    "L'oreal",
    "Maybelline",
    "Nyx",
    "Revlon",
  ];

  return (
    <Card title="Select brand">
      {brands.map((brand, index) => {
        return (
          <div key={index}>
            <Link to={`/${brand}`}>
              <Card.Grid>{brand}</Card.Grid>
            </Link>
          </div>
        );
      })}
    </Card>
  );
};

export default Main;
