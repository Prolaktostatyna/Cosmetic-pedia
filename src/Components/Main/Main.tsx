import React from "react";
import { Card } from "antd";
import { Link } from "react-router-dom";
import "../style/card.css";

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
          <Link key={brand} className="link" to={`/${brand}`}>
            <Card.Grid>{brand}</Card.Grid>
          </Link>
        );
      })}
    </Card>
  );
};

export default Main;
