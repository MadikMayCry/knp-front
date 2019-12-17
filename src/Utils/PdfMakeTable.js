import pdfMake from "pdfmake/build/pdfmake";
import vfsFonts from "pdfmake/build/vfs_fonts";
import fakeData from "Utils/FakeData";
import axios from "axios";
import React, { Component } from "react";
import Bg from "Utils/123.png";

let ApplicationNames = {
  1: "Налоговое заявление о приостановлении (продлении, возобновлении) представления налоговой отчетности",
  2: "Уведомление о приеме/отказе налогового заявления налогоплательщиков (налогового агента) об отзыве налоговой отчетности."
};

let reovocationSolutionResults = {
  1: "о приёме налогового заявления налогоплательщика (налогового агента) об отзыве налоговой отчетности с регистрационным номером",
  2: "об отказе налогового заявления налогоплательщика (налогового агента) об отзыве налоговой отчетности с регистрационным номером"
};

let suspensionSolutionResults = {
  1: "принято",
  2: "Отказ"
};

let infroms = "сообщает";

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

  console.log(formAppType);

  if (formAppType == 2) {
    result = reovocationSolutionResults[solutionResult];
  }

  if (formAppType == 1) {
    result = suspensionSolutionResults[solutionResult];
  }

  let appName = ApplicationNames[formAppType];

  let bg = await getBase64ImageFromURL(Bg);

  const { vfs } = vfsFonts.pdfMake;
  pdfMake.vfs = vfs;

  // let img = getBase64Image("123.png");
  // pdfMake.fonts = {
  //   Roboto: {
  //     normal: "Roboto-Regular.ttf",
  //     bold: "Roboto-Medium.ttf",
  //     italics: "Roboto-Italic.ttf",
  //     bolditalics: "Roboto-MediumItalic.ttf"
  //   },
  //   yourFontName: {
  //     normal: "src/Utils/examples/fonts/times.ttf"
  //   }
  // };

  const documentDefinition = {
    pageSize: "A4",
    background: [
      {
        image: bg,
        width: 600
      }
    ],
    content: [
      { text: appName, fontSize: 14, alignment: "center" },
      "\n",
      { text: taxOrgName, fontSize: 12 },
      { text: infroms, fontSize: 12 },
      "\n",
      { text: result, fontSize: 14 },
      "\n",
      { text: formAppRegistrationNumber, fontSize: 16 },
      "\n"
    ]
    // defaultStyle: {
    //   font: "yourFontName"
    // }
  };

  pdfMake.createPdf(documentDefinition).open();
};

// export default id => {};
export default pdfMakeTable;
