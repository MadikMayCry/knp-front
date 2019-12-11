import React from "react";
import useForm from "react-hook-form";
import { Select, Input } from "antd";

const { Option } = Select;

export default function App() {
  const { register, handleSubmit, errors } = useForm();
  const onSubmit = data => console.log(data);

  const handleChange = value => {
    console.log(`selected ${value}`);
    document.getElementById("ogd").value = value;
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Input
        placeholder="First name"
        name="First name"
        ref={register({ required: true, maxLength: 80 })}
      />
      <input
        type="text"
        placeholder="Last name"
        name="Last name"
        ref={register({ required: true, maxLength: 100 })}
      />
      <input
        type="text"
        placeholder="Email"
        name="Email"
        ref={register({ required: true, pattern: /^\S+@\S+$/i })}
      />
      <input
        type="tel"
        placeholder="Mobile number"
        name="Mobile number"
        ref={register({ required: true, minLength: 6, maxLength: 12 })}
      />
      <select name="Title" ref={register({ required: true })}>
        <option value="Mr">Mr</option>
        <option value="Mrs">Mrs</option>
        <option value="Miss">Miss</option>
        <option value="Dr">Dr</option>
      </select>

      <input
        name="Developer"
        type="radio"
        value="Yes"
        ref={register({ required: true })}
      />
      <input
        name="Developer"
        type="radio"
        value="No"
        ref={register({ required: true })}
      />

      <input
        type="hidden"
        name="ogd"
        id="ogd"
        ref={register({ required: true })}
      />
      <select name="QWe" ref={register}>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
      </select>

      <Select
        type="input"
        name="ant-select"
        ref={register({ required: true })}
        onChange={handleChange}
      >
        <Option value="jack">Jack</Option>
        <Option value="lucy">Lucy</Option>
        <Option value="Yiminghe">yiminghe</Option>
      </Select>
      <input type="submit" />
    </form>
  );
}
