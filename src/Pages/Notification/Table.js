import React from "react";
import { Table, Button } from "antd";
import { jsx, css } from "@emotion/core";
import { FOPdfMake, TaxPdfMake } from "Utils/NotificationPdfMake";

const { Column } = Table;

const body = css({
  backgroundColor: "green",
  "& thead > tr > th": {
    backgroundColor: "blue"
  }
});

const appTypes = {
  1: "Уведомление о принятии/не принятии формы налоговой отчетности",
  2: "Уведомление о принятии/не принятии налогового заявления на приостановление",
  3: "Уведомление о принятии/не принятии налогового заявления на отзыв"
};

const _exportPdfTable = e => {
  let id = e.target.name;
  let value = e.target.value;

  if (value == appTypes[1]) {
    FOPdfMake(id);
    console.log(id, value, "FoPdfMake");
  } else {
    TaxPdfMake(id);
    console.log(id, value, "TaxPdfMake");
  }
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
              <Button
                onClick={_exportPdfTable}
                name={record.notificationId}
                value={record.appType}
              >
                Уведомление
              </Button>
            </>
          )}
        />
        {/* <Column title="Регистрационный номер" dataIndex="registrationNumber" key="registrationNumber" /> */}
        <Column
          title="Номер уведомления"
          dataIndex="notificationNumber"
          key="notificationNumber"
        />
        <Column
          title="Дата уведомления"
          dataIndex="notificationDate"
          key="notificationDate"
        />
        <Column
          title="Дата принятия"
          dataIndex="acceptanceDate"
          key="acceptanceDate"
        />
        {/* <Column title="codeDueDate" dataIndex="codeDueDate" key="codeDueDate" /> */}
        <Column title="Тип уведомления" dataIndex="appType" key="appType" />
        <Column
          title="Статус"
          dataIndex="notificationStatus"
          key="notificationStatus"
        />
        <Column title="Описание" dataIndex="description" key="description" />
      </Table>
      <p>{props.isFetching ? "Fetching posts..." : ""}</p>
    </>
  );
};
export default ListTable;
