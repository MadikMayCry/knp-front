import React, { Component } from "react";
import { Modal, Table } from "antd";
import axios from "axios";
import DescList from "Components/Tax/DescList";

const { Column } = Table;

class TaxTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      url: "http://10.202.41.203:9020/tax-report/v1/form-postpone-apps",
      modalActive: false
    };
  }

  showTaxCard = () => {
    return <DescList results={this.state.results} />;
  };

  getCardData = e => {
    axios
      .get(`${this.state.url}/${e}`)
      .then(response => {
        this.setState({
          results: response.data
        });

        this.showModal();
      })
      .catch(error => {
        this.setState({ success: false });
      });
  };

  showModal = () => {
    this.setState({
      visible: true
    });
  };

  handleOk = e => {
    console.log(e);
    this.setState({
      visible: false
    });
  };

  handleCancel = e => {
    console.log(e);
    this.setState({
      visible: false
    });
  };

  render() {
    return (
      <>
        <Table
          className="custom-tax-journal"
          dataSource={this.props.rows}
          onRow={r => ({
            onClick: () => this.getCardData(r.id)
          })}
        >
          <Column
            title="Номер документа"
            dataIndex="incomingDocumentNumber"
            key="incomingDocumentNumber"
          />
          <Column
            title="Регистрационный номер"
            dataIndex="registrationNumber"
            key="registrationNumber"
          />
          <Column
            title="Дата подачи"
            dataIndex="submissionDate"
            key="submissionDate"
          />
          <Column
            title="Система"
            dataIndex="submissionType"
            key="submissionType"
          />
          <Column
            title="Статус"
            dataIndex="applicationStatus"
            key="applicationStatus"
          />
          <Column title="Код ОГД" dataIndex="taxOrgCode" key="taxOrgCode" />
        </Table>

        <Modal
          title="Карточка налогового заявления"
          visible={this.state.visible}
          width="90vw"
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          {this.showTaxCard()}
        </Modal>
      </>
    );
  }
}

export default TaxTable;
