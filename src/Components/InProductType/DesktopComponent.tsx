import { FunctionComponent } from "react";
import { Space, Spin, Table } from "antd";
import {
  columnsAllProductsForDesktop,
  columnsForDesktop,
} from "./TableComponenet";
import "../style/table.css";

type DesktopComponentProps = {
  dataFetched: boolean;
  tableData: any;
  prodType: string;
};

export const DesktopComponent: FunctionComponent<DesktopComponentProps> = ({
  dataFetched,
  tableData,
  prodType,
}) => {
  return (
    <div>
      {dataFetched ? (
        <div className="wrapper">
          <Table
            className="table"
            columns={
              prodType === "all"
                ? columnsAllProductsForDesktop
                : columnsForDesktop
            }
            expandable={{
              expandedRowRender: (record) => {
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
