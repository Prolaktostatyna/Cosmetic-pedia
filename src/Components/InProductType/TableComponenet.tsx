import type { ColumnsType } from "antd/es/table";

interface DataType {
  key: React.Key;
  name: string;
  price: number;
  rate: number;
  imageLink: string;
  description: string;
}

export const columnsForDesktop: ColumnsType<DataType> = [
  { title: "Name", dataIndex: "name", key: "name" },
  { title: "Price [$]", dataIndex: "price", key: "price" },
  { title: "Rate", dataIndex: "rate", key: "rate" },
];

export const columnsAllProductsForDesktop: ColumnsType<DataType> = [
  { title: "Name", dataIndex: "name", key: "name" },
  { title: "Product type", dataIndex: "productType", key: "productType" },
  { title: "Price [$]", dataIndex: "price", key: "price" },
  { title: "Rate", dataIndex: "rate", key: "rate" },
];

export const columnsForMobile: ColumnsType<DataType> = [
  { title: "Name", dataIndex: "name", key: "name" },
  { title: "Price [$]", dataIndex: "price", key: "price" },
  { title: "Rate", dataIndex: "rate", key: "rate" },
];

export const columnsAllProductsForMobile: ColumnsType<DataType> = [
  { title: "Name", dataIndex: "name", key: "name" },
  { title: "Product type", dataIndex: "productType", key: "productType" },
];
