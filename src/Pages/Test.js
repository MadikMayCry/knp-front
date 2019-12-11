import React, { useState, useEffect, Component } from "react";
function Example() {
  const [count, setCount] = useState(0);
  useEffect(() => {document.title = `Вы нажали ${count} раз`});
  return (
    <div>
      <p>Вы нажали {count} раз</p>
      <button onClick={() => setCount(count + 1)}>Нажми на меня</button>
    </div>
  );
}
export default Example;

