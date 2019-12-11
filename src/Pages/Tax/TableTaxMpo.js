import React, { useState } from "react";
import { Table, Button, Divider } from "antd";
import { jsx, css } from "@emotion/core";

const { Column } = Table;

const body = css({
  backgroundColor: "green",
  "& thead > tr > th": {
    backgroundColor: "blue"
  }
});

const TableTax = props => {
  const handleClick = item => props.getCardData(item.target.name);
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
              <Button onClick={handleClick} name={record.appId}>
                Просмотр НЗ
              </Button>
              <Divider type="vertical" />
              <Button>Уведомление</Button>
              <Divider type="vertical" />
              <Button>ФНО</Button>
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
        <Column
          title="ИИН/БИН налогоплательщика"
          dataIndex="taxPayerName"
          key="taxPayerName"
        />
        <Column title="ФИО" dataIndex="taxPayerXin" key="taxPayerXin" />
        <Column title="Статус" dataIndex="appStatus" key="appStatus" />
        <Column
          title="Код ОГД"
          dataIndex="taxOrgFullName"
          key="taxOrgFullName"
        />
        <Column title="Задолженность" dataIndex="debtStatus" key="debtStatus" />
      </Table>
      <p>{props.isFetching ? "Fetching posts..." : ""}</p>
    </>
  );
};
export default TableTax;
