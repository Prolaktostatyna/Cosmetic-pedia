import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { MobileComponent } from "./MobileComponent";
import { DesktopComponent } from "./DesktopComponent";

const InProductType: React.FC = () => {
  const [tableData, setTableData] = useState<any>({});
  const [dataFetched, setDataFetched] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 760);

  const mainApiUrl =
    "http://makeup-api.herokuapp.com/api/v1/products.json?brand=";

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

  useEffect(() => {
    const fetchData = async (brand: String, prodType: String) => {
      let url;

      if (prodType === "all") {
        url = `${mainApiUrl}${brand}`;
      } else {
        url = `${mainApiUrl}${brand}&product_type=${prodType}`;
      }

      try {
        setIsLoading(true);
        const response = await axios.get(url);
        const data = response.data;
        setTableData(changeReceivedData(data));
        setDataFetched(true);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        throw error;
      }
    };

    if (!dataFetched) {
      fetchData(brand, prodType);
    }

    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [brand, prodType, dataFetched]);

  return (
    <div>
      {isMobile ? (
        <MobileComponent
          dataFetched={dataFetched}
          isLoading={isLoading}
          tableData={tableData}
          prodType={prodType}
        />
      ) : (
        <DesktopComponent
          dataFetched={dataFetched}
          isLoading={isLoading}
          tableData={tableData}
          prodType={prodType}
        />
      )}
    </div>
  );
};

export default InProductType;
