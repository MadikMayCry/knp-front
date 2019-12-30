import React from "react";
import { Row, Collapse, List, Button, Icon } from "antd";
import Resources from "Resources";
import { BrowserRouter as Router, Link, withRouter } from "react-router-dom";
const links = [
  {
    title:
      "Сервис «Сведения о приостановлении (продлении, возобновлении) представления, отзыва налоговой отчетности» на Портале КГД",
    url: "http://kgd.gov.kz/ru/app/sono-taxdeclaration-search-web",
    inside: false
  },
  {
    title: "Сервис  «Отзыв налоговой отчетности» на ПЭП",
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
      "Налоговый кодекс Республики Казахстан Статья 210   «Порядок отзыва налоговой отчетности»",
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
