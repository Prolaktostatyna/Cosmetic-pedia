import React, { useEffect, useState } from "react";
import { Space, Spin, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useLocation } from "react-router-dom";
import axios from "axios";
import "../style/table.css";

interface DataType {
  key: React.Key;
  name: string;
  price: number;
  rate: number;
  imageLink: string;
  description: string;
}

const columns: ColumnsType<DataType> = [
  { title: "Name", dataIndex: "name", key: "name" },
  { title: "Price [$]", dataIndex: "price", key: "price" },
  { title: "Rate", dataIndex: "rate", key: "rate" },
];

const columnsAll: ColumnsType<DataType> = [
  { title: "Name", dataIndex: "name", key: "name" },
  { title: "Product type", dataIndex: "productType", key: "productType" },
  { title: "Price [$]", dataIndex: "price", key: "price" },
  { title: "Rate", dataIndex: "rate", key: "rate" },
];

const InProductType: React.FC = () => {
  const [tableData, setTableData] = useState<any>({});
  const [dataFetched, setDataFetched] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const args = useLocation()
    .pathname.split("/")
    .filter((arg) => arg !== "");
  const brand = args[0].toLowerCase();
  const prodType = args[1].toLowerCase();

  function changeReceivedData(data: any) {
    const newDataObj: any = [];
    data.forEach((productItem: any, i: number) => {
      for (const property in productItem) {
        if (productItem[property] === null) {
          productItem[property] = "-";
        } else if (productItem[property] === "") {
          productItem[property] = "No description";
        }
      }

      const newProductObj: {
        key: number;
        name: string;
        productType: string;
        price: number;
        rate: number;
        imageLink: string;
        description: string;
      } = {
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
        url = `http://makeup-api.herokuapp.com/api/v1/products.json?brand=${brand}`;
      } else {
        url = `http://makeup-api.herokuapp.com/api/v1/products.json?brand=${brand}&product_type=${prodType}`;
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
  }, [dataFetched, brand, prodType]);

  return (
    <div>
      {dataFetched && !isLoading ? (
        <div className="wrapper">
          <Table
            className="table"
            columns={prodType === "all" ? columnsAll : columns}
            expandable={{
              expandedRowRender: (record) => {
                // console.log(record);
                return (
                  <div className="expandableRow">
                    <img
                      className="productImg"
                      src={record.imageLink}
                      alt="productphoto"
                    ></img>
                    <p className="productDescription">{record.description}</p>
                  </div>
                );
              },
              // rowExpandable: (record) => record.name !== "Not Expandable",
            }}
            dataSource={tableData}
          />
        </div>
      ) : (
        <Space size="middle">
          <Spin tip="Loading..." size="large">
            <div className="spinner" />
          </Spin>
        </Space>
      )}
    </div>
  );
};

export default InProductType;
