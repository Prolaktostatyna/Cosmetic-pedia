import React, { useEffect, useState } from "react";
import { Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useLocation } from "react-router-dom";

interface DataType {
  key: React.Key;
  name: string;
  imageLink: string;
  price: number;
  rate: number;
  description: string;
}

const columns: ColumnsType<DataType> = [
  { title: "Name", dataIndex: "name", key: "name" },
  { title: "Price [$]", dataIndex: "price", key: "price" },
  { title: "Rate", dataIndex: "rate", key: "rate" },
];

const InProductType: React.FC = () => {
  const [tableData, setTableData] = useState<any>({});
  const [dataFetched, setDataFetched] = useState<boolean>(false);
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
        }
      }

      const newProductObj: {
        key: number;
        name: string;
        price: number;
        rate: number;
        imageLink: string;
        description: string;
      } = {
        key: i,
        name: productItem.name,
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
      const data = await fetch(
        `http://makeup-api.herokuapp.com/api/v1/products.json?brand=${brand}&product_type=${prodType}`
      ).then((response) => {
        return response.json();
      });
      setTableData(changeReceivedData(data));
      setDataFetched(true);
    };
    if (!dataFetched) {
      fetchData(brand, prodType);
    }
  }, [dataFetched, brand, prodType]);

  return (
    <div>
      {dataFetched && (
        <Table
          columns={columns}
          expandable={{
            expandedRowRender: (record) => {
              console.log(record);
              return (
                <div>
                  <img src={record.imageLink} alt="productphoto"></img>
                  <p style={{ margin: 0 }}>{record.description}</p>
                </div>
              );
            },
            rowExpandable: (record) => record.name !== "Not Expandable",
          }}
          dataSource={tableData}
        />
      )}
    </div>
  );
};

export default InProductType;
