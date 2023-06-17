import React from "react";
import { Card } from "antd";
import { Link, useLocation } from "react-router-dom";

const InBrand: React.FC = () => {
  const productTypes: Array<string> = [
    "All",
    "Blush",
    "Bronzer",
    "Eyebrow",
    "Eyeliner",
    "Eyeshadow",
    "Foundation",
    "Lip liner",
    "Lipstick",
    "Mascara",
    "Nail polish",
  ];
  const location = useLocation();

  return (
    <Card title="Select product type">
      {productTypes.map((productType, index) => {
        return (
          <Link
            key={productType}
            className="link"
            to={`${location.pathname}/${productType}`}
          >
            <Card.Grid>{productType}</Card.Grid>
          </Link>
        );
      })}
    </Card>
  );
};

export default InBrand;
