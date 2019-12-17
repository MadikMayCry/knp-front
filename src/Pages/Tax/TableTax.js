import React, { useState } from "react";
import { Table, Button } from "antd";
import { jsx, css } from "@emotion/core";
import pdfMakeTable from "Utils/PdfMakeTable";

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

  pdfMakeTable(id);
};

const TableMpo = props => {
  return (
    <>
      <Table
        dataSource={props.data}
        rowKey="registrationNumber"
        bordered="true"
        className={body}
        className="table-custom"
        scroll={{ x: true }}
      >
        <Column
          title="Действие"
          key="action"
          render={(text, record) => (
            <>
              <Button onClick={_exportPdfTable} name={record.appId}>
                Уведомление
              </Button>
            </>
          )}
        />
        <Column title="Наименование НЗ" dataIndex="appType" key="appType" />
        <Column title="Дата отправки" dataIndex="sendDate" key="sendDate" />
        <Column title="Дата приема" dataIndex="receiveDate" key="receiveDate" />

        <Column
          title="Регистрационный номер"
          dataIndex="registrationNumber"
          key="registrationNumber"
        />
        <Column title="Статус" dataIndex="appStatus" key="appStatus" />
      </Table>
      <p>{props.isFetching ? "Идёт загрузка..." : ""}</p>
    </>
  );
};
export default TableMpo;
