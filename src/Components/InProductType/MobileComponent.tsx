import { FunctionComponent } from "react";
import { Space, Spin, Table } from "antd";
import {
  columnsAllProductsForMobile,
  columnsForMobile,
} from "./TableComponenet";
import "../style/table.css";

type DesktopComponentProps = {
  dataFetched: boolean;
  isLoading: boolean;
  tableData: any;
  prodType: string;
};

export const MobileComponent: FunctionComponent<DesktopComponentProps> = ({
  dataFetched,
  isLoading,
  tableData,
  prodType,
}) => {
  return (
    <div>
      {dataFetched && !isLoading ? (
        <div className="wrapper">
          <Table
            className="table"
            columns={
              prodType === "all"
                ? columnsAllProductsForMobile
                : columnsForMobile
            }
            expandable={{
              expandedRowRender: (record) => {
                console.log(record);
                return (
                  <div className="expandableRow">
                    <img
                      className="productImg"
                      src={record.imageLink}
                      alt="productphoto"
                    ></img>
                    <p className="productDescription">{record.description}</p>
                    <div className="wrapperMobileDetails">
                      <p>
                        <span>Price [$]:</span> {record.price}
                      </p>
                      <p>
                        <span>Rate: </span>
                        {record.rate}
                      </p>
                    </div>
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
