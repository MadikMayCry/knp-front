import React from "react";
import { Table } from "antd";
import { jsx, css } from "@emotion/core";

const { Column } = Table;

const body = css({
  backgroundColor: "green",
  "& thead > tr > th": {
    backgroundColor: "blue"
  }
});

const ListTable = props => {
  return (
    <>
      <Table
        dataSource={props.data}
        rowKey="registrationNumber"
        bordered="true"
        className={body}
        className="table-custom"
      >
        {/* <Column title="Регистрационный номер" dataIndex="registrationNumber" key="registrationNumber" /> */}
        <Column
          title="Код ОГД"
          dataIndex="taxOrgFullName"
          key="taxOrgFullName"
        />
        <Column title="Код ФНО" dataIndex="formCode" key="formCode" />
        <Column title="Вид ФНО" dataIndex="formType" key="formType" />
        {/* <Column title="ИИН" dataIndex="taxPayerXin" key="taxPayerXin" /> */}
        {/* <Column title="ФИО" dataIndex="taxPayerName" key="taxPayerName" /> */}
        <Column
          title="Налоговый период"
          dataIndex="taxPeriod"
          key="taxPeriod"
        />
        <Column title="Дата подачи ФНО" dataIndex="sendDate" key="sendDate" />
        <Column
          title="Дата приема ОГД"
          dataIndex="receiveDate"
          key="receiveDate"
        />
        <Column title="Статус ФНО" dataIndex="formStatus" key="formStatus" />
        <Column
          title="Источник отправки"
          dataIndex="sourceSystem"
          key="sourceSystem"
        />
      </Table>
      <p>{props.isFetching ? "Fetching posts..." : ""}</p>
    </>
  );
};
export default ListTable;
