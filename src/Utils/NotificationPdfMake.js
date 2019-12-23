import pdfMake from "pdfmake/build/pdfmake";
import vfsFonts from "pdfmake/build/vfs_fonts";
import axios from "axios";
import moment from "moment";
import React, { Component } from "react";
import Bg from "Utils/123.png";
import logo from "Utils/blank_logo.png";

let ApplicationNames = {
  1: "Уведомление о приеме налогового заявления о приостановлении (продлении, возобновлении) представления налоговой отчетности",
  2: "Уведомление о приеме/отказе налогового заявления налогоплательщиков (налогового агента) об отзыве налоговой отчетности."
};

let reovocationSolutionResults = {
  1: "о приёме налогового заявления налогоплательщика (налогового агента) об отзыве налоговой отчетности с регистрационным номером",
  2: "об отказе налогового заявления налогоплательщика (налогового агента) об отзыве налоговой отчетности с регистрационным номером"
};

let suspensionSolutionResults = {
  1: "сообщает о приеме налогового заявления о приостоновлении (продлении, возобновлении) представления налоговой отчетности с регистрационным номером",
  2: "об отказе в приеме налогового заявления о присотановлении (продлении, возобновления) представления налоговой отчетности с регистрационным номером"
};

const headline =
  "Данная информация носит справочный характер и не может быть использована в качестве официального документа";

let ogdName = "(наименование государственного органа)";

let reason = "по причине";

let informs = "сообщает";

let FormNames = {
  1: "Уведомление о приеме/отказе налоговой отчетности органом государственных доходов в электронном виде",
  2: "Сведения о приостонавлении (продлении, возобновлении) предоставления налоговой отчетности и об отзыве налоговой отчетности"
};

const today = moment().format("DD.MM.YYYY");

let taxPayerXinTitle =
  "Индивидуальный идентификационный номер/бизнес идентификационный номер (ИИН/БИН)";

let taxPayerNameTitle =
  "Наименование налогоплательщика/фамилия, имя, отчество (при его наличии)";

const getData = async (id, from) => {
  console.log(from);

  if (from == "tax") {
    let resp = await axios.get(
      `http://10.202.41.203:9020/tax-report/form-apps/${id}/notification`
    );
    return resp.data;
  }
  if (from == "fno") {
    let resp = await axios.get(
      `http://10.202.41.203:9020/tax-report/tax-forms/${id}/notification`
    );
    return resp.data;
  } else {
    let resp = await axios.get(
      `http://10.202.41.203:9020/tax-report/notifications/${id}`
    );
    return resp.data;
  }
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

export const FOPdfMake = async (id, from) => {
  let temp = await getData(id, from);

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
        { text: "O= КГД МФ РК, OU=BIN141040004756", alignment: "left" }
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

export const TaxPdfMake = async (id, from) => {
  let temp = await getData(id, from);
  console.log(temp);

  let {
    formAppType,
    taxOrgName,
    formAppRegistrationNumber,
    solutionResult,
    refusalReason
  } = temp;

  let result = "";
  let body = "";

  if (formAppType == 2) {
    result = reovocationSolutionResults[solutionResult];
    body = [
      { text: result },
      { text: formAppRegistrationNumber, style: "underlined" }
    ];
  }

  if (formAppType == 1) {
    body = [
      { text: suspensionSolutionResults[1] },
      {
        text: solutionResult == 1 ? formAppRegistrationNumber : "",
        style: "formAppRegistrationNumber"
      },
      { text: suspensionSolutionResults[2] },
      { text: reason },
      {
        text: solutionResult == 2 ? formAppRegistrationNumber : "",
        style: "formAppRegistrationNumber"
      },
      { text: refusalReason }
    ];
  }

  let appName = ApplicationNames[formAppType];

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
      {
        alignment: "justify",
        columns: [
          [
            {
              text: taxOrgName,
              style: "taxOrgName"
            },
            {
              text: ogdName,
              fontSize: 8
            }
          ],
          {
            text: informs,
            alignment: "right"
          }
        ]
      },
      "\n",
      body,
      "\n"
    ],
    footer: {
      columns: [
        {
          text: "Подпись прикладного сервера:",
          bold: true,
          margin: [60, 0, 0, 0]
        },
        { text: "O= КГД МФ РК, OU=BIN141040004756", alignment: "left" }
      ]
    },
    styles: {
      header: {
        bold: true,
        fontSize: 14,
        alignment: "center",
        margin: [0, 10, 0, 10]
      },
      taxOrgName: {
        decoration: "underline",
        width: 400
      },

      underlined: {
        decoration: "underline"
      },
      formAppRegistrationNumber: {
        decoration: "underline",
        margin: [0, 5, 0, 5]
      }
    },
    defaultStyle: {
      columnGap: 20,
      fontSize: 10
    }
  };

  pdfMake.createPdf(documentDefinition).open();
};

export const FO810PdfMake = async id => {
  let bg = await getBase64ImageFromURL(Bg);

  let appName = FormNames[2];

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

  let logo_code = await getBase64ImageFromURL(logo);

  const documentDefinition = {
    pageSize: "A4",
    background: [
      {
        image: bg,
        width: 600
      }
    ],
    header: { text: headline, style: "headline" },
    content: [
      {
        alignment: "justify",
        columns: [
          { image: logo_code, width: 75 },
          [
            {
              text: "Комитет государственных доходов".toUpperCase(),
              bold: true,
              fontSize: 18,
              margin: [0, 20, 0, 0],
              alignment: "left"
            },
            {
              text: "Министерства финансов республики Казахстан".toUpperCase(),
              fontSize: 14,
              alignment: "left"
            }
          ]
        ],
        margin: [0, 10, 0, 3]
      },
      { text: appName, style: "header" },
      "\n",
      { text: "По состоянию на " + today },
      {
        text:
          "Сведения о приостановлении представления налоговой отчетности или об отказе в приостановлении представления налоговой отчетности",
        style: "header"
      },
      {
        style: "tableExample",
        table: {
          widths: ["*", "*"],
          body: [
            [
              {
                text: "Наименование",
                style: "tableHeader"
              },
              { text: "ИП ЧЕРЕПАНОВ АЛЕКСАНДР ВАСИЛЬЕВИЧ" }
            ],
            [
              { text: "Номер заявления", style: "tableHeader" },
              "181603122019N00867"
            ],
            [
              { text: "Дата и время обработки", style: "tableHeader" },
              "18.12.2019 15:45:30"
            ],
            [{ text: "Статус решения", style: "tableHeader" }, "Отказано"],
            [
              { text: "Причина отказа", style: "tableHeader" },
              "наличие налоговой задолженности на дату подачи заявления"
            ],
            [
              {
                text: "Дата начала периода приостановления",
                style: "tableHeader"
              },
              "04.12.2019"
            ],
            [
              {
                text: "Дата окончания периода приостановления",
                style: "tableHeader"
              },
              "31.12.2020"
            ]
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
        { text: "O= КГД МФ РК, OU=BIN141040004756", alignment: "left" }
      ]
    },
    styles: {
      header: {
        bold: true,
        fontSize: 14,
        alignment: "center",
        margin: [0, 10, 0, 10]
      },
      headline: {
        alignment: "center",
        margin: [20, 20, 20, 20]
      },
      tableExample: {
        margin: [0, 25, 0, 15]
      },
      tableHeader: {
        bold: true,
        fontSize: 12,
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
