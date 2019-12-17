import pdfMake from "pdfmake/build/pdfmake";
import vfsFonts from "pdfmake/build/vfs_fonts";
import axios from "axios";
import React, { Component } from "react";
import Bg from "Utils/123.png";

let FormNames = {
  1: "Уведомление о приеме/отказе налоговой отчетности органом государственных доходов в электронном виде"
};

let taxPayerXinTitle =
  "Индивидуальный идентификационный номер/бизнес идентификационный номер (ИИН/БИН)";

let taxPayerNameTitle =
  "Наименование налогоплательщика/фамилия, имя, отчество (при его наличии)";

const getData = async id => {
  let resp = await axios.get(
    `http://10.202.41.203:9020/tax-report/tax-forms/${id}/notification`
  );
  return resp.data;
};

const getBase64ImageFromURL = url => {
  return new Promise((resolve, reject) => {
    var img = new Image();
    img.setAttribute("crossOrigin", "anonymous");

    img.onload = () => {
      var canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;

      var ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0);

      var dataURL = canvas.toDataURL("image/png");

      resolve(dataURL);
    };

    img.onerror = error => {
      reject(error);
    };
    img.src = url;
  });
};

const FOPdfMake = async id => {
  let temp = await getData(id);

  let {
    taxPayerXin,
    taxPayerName,
    formCode,
    formVersion,
    formType,
    formName,
    taxPeriod,
    submissionType,
    taxOrgCode,
    registrationNumber,
    formStatusDesc,
    formStatusModule,
    formStatus,
    formStatusDateTime,
    taxFormAccruals
    // halfYear,
    // year,
    // customTaxPayerCategory,
    // formType,
    // notificationNumber,
    // notificationDate,
    // currencyCode,
    // isResident,
    // signingTaxPayerName,
    // sendDate,
    // taxOrgCode,
    // residenceTaxOrgCode,
    // signingOfficerName,
    // incomingDocumentNumber,
    // receiveDate,
    // postalStampDate,
    // sourceSystem,
    // submissionType,
    // taxFormCells
  } = temp;

  let appName = FormNames[1];

  let bg = await getBase64ImageFromURL(Bg);

  const { vfs } = vfsFonts.pdfMake;
  pdfMake.vfs = vfs;

  pdfMake.fonts = {
    Roboto: {
      normal: "Roboto-Regular.ttf",
      bold: "Roboto-Medium.ttf",
      italics: "Roboto-Italic.ttf",
      bolditalics: "Roboto-MediumItalic.ttf"
    },
    yourFontName: {
      normal: "/src/Utils/examples/fonts/times.ttf"
    }
  };

  let dataTable = [
    [
      { text: "Domenico Pagac" },
      { text: "Domenico Pagac" },
      { text: "Domenico Pagac" }
    ],
    [
      { text: "Domenico Pagac" },
      { text: "Domenico Pagac" },
      { text: "Domenico Pagac" }
    ]
  ];

  const documentDefinition = {
    pageSize: "A4",
    background: [
      {
        image: bg,
        width: 600
      }
    ],
    content: [
      { text: appName, style: "header" },
      "\n",
      [
        { text: taxPayerXinTitle },
        { text: taxPayerXin, style: "underlined", margin: [0, 2, 0, 2] }
      ],
      [
        { text: taxPayerNameTitle },
        { text: taxPayerName, style: "underlined", margin: [0, 2, 0, 2] }
      ],
      {
        alignment: "justify",
        columns: [
          { width: "auto", text: "Код формы налоговой отчетности" },
          {
            text: formCode,
            style: "underlined"
          },
          {
            text: "версия"
          },
          {
            text: formVersion,
            style: "underlined",
            alignment: "left"
          }
        ],
        margin: [0, 10, 0, 3]
      },
      {
        alignment: "justify",
        columns: [
          { width: "auto", text: "Вид формы налоговой отчетности" },
          {
            text: formType,
            style: "underlined",
            alignment: "right"
          }
        ],
        margin: [0, 5, 0, 5]
      },
      {
        alignment: "justify",
        columns: [
          { width: "auto", text: "Наименование формы налоговой отчётности" },
          {
            text: formName,
            style: "underlined",
            alignment: "right"
          }
        ],
        margin: [0, 5, 0, 5]
      },
      {
        alignment: "justify",
        columns: [
          { width: "auto", text: "Налоговый период" },
          {
            text: taxPeriod,
            style: "underlined",
            alignment: "right"
          }
        ],
        margin: [0, 5, 0, 5]
      },
      {
        alignment: "justify",
        columns: [
          { width: "auto", text: "Способ приема" },
          {
            text: submissionType,
            style: "underlined",
            alignment: "right"
          }
        ],
        margin: [0, 5, 0, 5]
      },
      {
        alignment: "justify",
        columns: [
          {
            width: "auto",
            text: "Код органа государственных доходов-получателя"
          },
          {
            text: taxOrgCode,
            style: "underlined",
            alignment: "right"
          }
        ],
        margin: [0, 5, 0, 5]
      },
      {
        alignment: "justify",
        columns: [
          {
            width: "auto",
            text:
              "Входящий (регистрационный) номер документа налоговой отчетности"
          },
          {
            text: registrationNumber,
            style: "underlined",
            alignment: "right"
          }
        ],
        margin: [0, 5, 0, 5]
      },
      {
        style: "tableExample",
        table: {
          body: [
            [
              {
                text: "Обработка налоговой отчетности",
                style: "tableHeader",
                alignment: "center"
              },
              { text: "Система", style: "tableHeader", alignment: "center" },
              { text: "Статус", style: "tableHeader", alignment: "center" },
              { text: "Дата/Время", style: "tableHeader", alignment: "center" }
            ],
            [formStatusDesc, formStatusModule, formStatus, formStatusDateTime]
          ]
        }
      }
    ],
    footer: {
      columns: [
        {
          text: "Подпись прикладного сервера:",
          bold: true,
          margin: [60, 0, 0, 0]
        },
        { text: "O=_ORGANIZATION, OU=BIN ORGANIZATION_UNIT", alignment: "left" }
      ]
    },
    styles: {
      header: {
        bold: true,
        fontSize: 14,
        alignment: "center",
        margin: [0, 10, 0, 10]
      },
      tableExample: {
        margin: [0, 25, 0, 15]
      },
      tableHeader: {
        bold: true,
        fontSize: 13,
        color: "black"
      },
      underlined: {
        decoration: "underline"
      },
      marginTopBot: {
        margin: [0, 10, 0, 10]
      }
    },
    defaultStyle: {
      columnGap: 20,
      fontSize: 10
    }
  };

  pdfMake.createPdf(documentDefinition).open();
};

export default FOPdfMake;
