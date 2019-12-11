import React from "react";

import { Descriptions } from "antd";

const DescList = props => {
  const { results } = props;
  console.log(props);

  return (
    <Descriptions bordered size="middle">
      <Descriptions.Item label="ФИО">{results.taxPayerName}</Descriptions.Item>
      <Descriptions.Item label="ИИН">{results.xin}</Descriptions.Item>
      <Descriptions.Item label="Статья">
        {results.taxArticleId}
      </Descriptions.Item>
      <Descriptions.Item label="Дата подачи заявления">
        {results.submissionDate}
      </Descriptions.Item>
      <Descriptions.Item label="Код ОГД">
        {results.taxOrgCode}
      </Descriptions.Item>
      <Descriptions.Item label="Имя инспектора">
        {results.inspectorName}
      </Descriptions.Item>
      <Descriptions.Item label="Номер документа">
        {results.incomingDocumentNumber}
      </Descriptions.Item>
    </Descriptions>
  );
};

export default DescList;
