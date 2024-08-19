import TextInput from "./components/TextInput";
import "./App.css";
import { Button } from "antd";
import { useState } from "react";

import { validateData } from "./utils/validationFunctions.ts";
import { set } from "lodash";
import Dropdown from "./components/Dropdown.tsx";
interface FormState {
  user: { email: string; username: string; password: string };
  id: number;
  age: number;
  address: { city: string; state: string };
}
const App = () => {
  const [data, setData] = useState<FormState>({
    user: {
      email: "",
      username: "user",
      password: "",
    },
    id: 1,
    age: 10,
    address: {
      city: "",
      state: "",
    },
  });
  const [errors, setErrors] = useState({});

  const validationSchema: any = {
    "user.email": {
      required: true,
      regex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    },
    "user.username": {
      required: true,
      minLength: 3,
      maxLength: 50,
    },
    "user.password": {
      required: true,
      minLength: 6,
    },
    age: {
      required: true,
      custom: (value: number) => (value < 18 ? "Must be 18 or older." : ""),
    },
    "address.city": {
      required: true,
    },
    "address.state": {
      required: true,
    },
  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setData((prev) => set({ ...prev }, name, value));

    // Re-validate the field on change
    const error = validateData(
      { [name]: value },
      { [name]: validationSchema[name] }
    );
    console.log("error", error);
    setErrors((prev) => set({ ...prev }, name, error[name]));
  };
  const handleDropdownChange = (value: string, field: any) => {
    setData((prev) => set({ ...prev }, field, value));

    // Re-validate the field on change
    const error = validateData(
      { [field]: value },
      { [field]: validationSchema[field] }
    );
    console.log("error", error);
    setErrors((prev) => set({ ...prev }, field, error[field]));
  };

  const handleSubmit = () => {
    // Validate all fields before submitting
    const validationErrors = validateData(data, validationSchema);
    console.log("validationErrors", validationErrors);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // Submit the form (e.g., make a PUT call)
    alert("Form submitted successfully!");
  };

  return (
    <div className="appContainer">
      <h1>Form Tester</h1>
      <TextInput
        name={"user.email"}
        label={"Email"}
        placeholder={"Enter Email here"}
        value={data.user.email}
        onChange={handleChange}
        status={errors["user.email"] ? "error" : undefined}
        validationError={errors["user.email"]}
      />
      <TextInput
        name={"user.username"}
        label={"username"}
        placeholder={"Enter username here"}
        value={data.user.username}
        onChange={handleChange}
        status={errors["user.username"] ? "error" : undefined}
        validationError={errors["user.username"]}
      />
      <TextInput
        name={"user.password"}
        label={"Password"}
        placeholder={"Enter password here"}
        value={data.user.password}
        onChange={handleChange}
        type="password"
        status={errors["user.password"] ? "error" : undefined}
        validationError={errors["user.password"]}
      />
      <Dropdown
        name={"age"}
        label={"Age"}
        placeholder={"Enter Age here"}
        value={data.age}
        onChange={(val) => handleDropdownChange(val, "age")}
        status={errors["age"] ? "error" : undefined}
        validationError={errors["age"]}
      />
      <Button onClick={handleSubmit}>Submit</Button>
    </div>
  );
};

export default App;
