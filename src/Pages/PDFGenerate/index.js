import React, { PureComponent } from "react";
import { Button } from "antd";

import pdfMakeTable from "./PdfMakeTable";

export default class pdfGenerate extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  _exportPdfTable = () => {
    // change this number to generate more or less rows of data
    pdfMakeTable(20);
  };

  // JSpdf Generator For generating the PDF

  render() {
    return <Button onClick={this._exportPdfTable}>Export PDF</Button>;
  }
}