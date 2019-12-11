import React, { useState } from "react";
import { Table, Button } from "antd";
import { jsx, css } from "@emotion/core";

const { Column } = Table;

const body = css({
  backgroundColor: "green",
  "& thead > tr > th": {
    backgroundColor: "blue"
  }
});

// function getCardData(taxFormId) {
//   console.log("pushed");
// }

// const getCardData = () => {
//   debugger
//   console.log("item")};

const TableMpo = props => {
  // const handleClick = useCallback(() => {
  //   props(getCardData());
  // });
  const [postId, setPostId] = useState(0);

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
            <Button onClick={handleClick} name={record.taxFormId}>
              Просмотр
            </Button>
          )}
        />
        <Column title="ИИН" dataIndex="taxPayerXin" key="taxPayerXin" />
        <Column title="ФИО" dataIndex="taxPayerName" key="taxPayerName" />
        <Column
          title="Код ОГД"
          dataIndex="taxOrgFullName"
          key="taxOrgFullName"
        />
        <Column title="Код ФНО" dataIndex="formCode" key="formCode" />
        <Column title="Вид ФНО" dataIndex="formType" key="formType" />

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
export default TableMpo;
