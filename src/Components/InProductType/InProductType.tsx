import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { MobileComponent } from "./MobileComponent";
import { DesktopComponent } from "./DesktopComponent";
import { FetchDataComponent } from "../FetchDataComponent/FetchDataComponent";

const InProductType: React.FC = () => {
  const [tableData, setTableData] = useState<any>({});
  const [dataFetched, setDataFetched] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 760);

  const args = useLocation()
    .pathname.split("/")
    .filter((arg) => arg !== "");
  const brand = args[0].toLowerCase();
  const prodType = args[1].toLowerCase();

  function changeReceivedData(data: Array<any>): Array<{
    key: number;
    name: string;
    productType: string;
    price: string;
    rate: number;
    imageLink: string;
    description: string;
  }> {
    const newDataObj: Array<{
      key: number;
      name: string;
      productType: string;
      price: string;
      rate: number;
      imageLink: string;
      description: string;
    }> = [];

    data.forEach((productItem: any, i: number) => {
      for (const property in productItem) {
        if (productItem[property] === null) {
          productItem[property] = "-";
        } else if (productItem[property] === "") {
          productItem[property] = "No description";
        }
      }

      const newProductObj = {
        key: i,
        name: productItem.name,
        productType: productItem.product_type,
        price: productItem.price,
        rate: productItem.rating,
        imageLink: productItem.api_featured_image,
        description: productItem.description,
      };

      newDataObj.push(newProductObj);
    });

    return newDataObj;
  }

  const handleDataFetch = (data: any) => {
    setTableData(changeReceivedData(data));
    setDataFetched(true);
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 760);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div>
      {!dataFetched && (
        <FetchDataComponent
          brand={brand}
          prodType={prodType}
          onDataFetch={handleDataFetch}
        />
      )}
      {isMobile ? (
        <MobileComponent
          dataFetched={dataFetched}
          tableData={tableData}
          prodType={prodType}
        />
      ) : (
        <DesktopComponent
          dataFetched={dataFetched}
          tableData={tableData}
          prodType={prodType}
        />
      )}
    </div>
  );
};

export default InProductType;
