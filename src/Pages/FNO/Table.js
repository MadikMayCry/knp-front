import React from "react";
import { Table, Button } from "antd";
import { jsx, css } from "@emotion/core";
import pdfGenerator from "Utils/FOPdfMake";

const { Column } = Table;

const body = css({
  backgroundColor: "green",
  "& thead > tr > th": {
    backgroundColor: "blue"
  }
});

const _exportPdfTable = e => {
  // change this number to generate more or less rows of data
  let id = e.target.name;

  pdfGenerator(id);
};

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
        <Column
          title="Действие"
          key="action"
          render={(text, record) => (
            <>
              <Button onClick={_exportPdfTable} name={record.taxFormId}>
                Уведомление
              </Button>
            </>
          )}
        />
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
