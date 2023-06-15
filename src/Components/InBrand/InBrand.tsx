import React from "react";
import { Card } from "antd";
import { Link, useLocation } from "react-router-dom";

const gridStyle: React.CSSProperties = {
  width: "20%",
  minHeight: "100px",
  textAlign: "center",
  lineHeight: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
};

const InBrand: React.FC = () => {
  const productTypes: Array<string> = [
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
          <div key={index}>
            <Link to={`${location.pathname}/${productType}`}>
              <Card.Grid style={gridStyle}>{productType}</Card.Grid>
            </Link>
          </div>
        );
      })}
    </Card>
  );
};

export default InBrand;
