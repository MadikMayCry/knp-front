import React, { useState, useEffect, Component } from "react";
import { FO810PdfMake } from "Utils/NotificationPdfMake";
function Example() {
  const [count, setCount] = useState(0);

  const qwe = () => {
    FO810PdfMake();
  };

  return (
    <div>
      <button onClick={qwe}>Нажми на меня</button>
    </div>
  );
}
export default Example;
