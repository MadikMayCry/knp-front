import React from "react";
import { Row, Collapse, List, Button, Icon } from "antd";
import Resources from "Resources";
import { BrowserRouter as Router, Link, withRouter } from "react-router-dom";
const links = [
  {
    title:
      "SSO (выход) на портал к сервису «Сведения о приостановлении (продлении, возобновлении) представления, отзыва налоговой отчетности»",
    url: "http://kgd.gov.kz/ru/app/sono-taxdeclaration-search-web",
    inside: false
  },
  {
    title:
      "SSO на ПЭП к сервису «Отзыв налоговой отчетности», где НП может заполнить и отправить НЗ на отзыв налоговой отчетности",
    url: "https://egov.kz/cms/ru/services/taxation/2fpass_328_minfin",
    inside: false
  },

  {
    title:
      "Пошаговая инструкция по заполнению НЗ на отзыв налоговой отчетности",
    url: "instructions-007",
    inside: true
  },
  {
    title:
      "«Порядок отзыва налоговой отчетности» Статья 210 Кодекс Республики Казахстан О налогах и других обязательных платежах в бюджет (Налоговый кодекс)",
    url: "legistation-007",
    inside: true
  }
];

export const usefulllinks = () => (
  <Row style={{ marginBottom: 10 }}>
    <Collapse
      bordered={false}
      defaultActiveKey={["999"]}
      style={{ backgroundColor: "transparent" }}
    >
      <Collapse.Panel header={Resources.sectionUsefullLinks} key="999">
        <List
          itemLayout="horizontal"
          dataSource={links}
          renderItem={item => (
            <List.Item>
              <List.Item.Meta description={item.title} />
              {item.inside ? (
                <Link to={item.url}>
                  <Button className="card-link" type="primary" size="small">
                    <Icon type="arrow-right" />
                  </Button>
                </Link>
              ) : (
                <a href={item.url}>
                  <Button className="card-link" type="primary" size="small">
                    <Icon type="arrow-right" />
                  </Button>
                </a>
              )}
            </List.Item>
          )}
        />
      </Collapse.Panel>
    </Collapse>
  </Row>
);

export default usefulllinks;
