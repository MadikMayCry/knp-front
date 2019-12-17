import pdfMake from "pdfmake/build/pdfmake";
import vfsFonts from "pdfmake/build/vfs_fonts";
import fakeData from "Utils/FakeData";
import axios from "axios";
import React, { Component } from "react";
import Bg from "Utils/123.png";

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

let ogdName = "(наименование государственного органа)";

let reason = "по причине";

let informs = "сообщает";

const getData = async id => {
  let resp = await axios.get(
    `http://10.202.41.203:9020/tax-report/form-apps/${id}/notification`
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

const pdfMakeTable = async id => {
  let temp = await getData(id);

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
      { text: result, fontSize: 14 },
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

// export default id => {};
export default pdfMakeTable;
