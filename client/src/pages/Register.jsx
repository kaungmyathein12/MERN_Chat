import { useState } from "react";
import api from "../api";

const formStyles = {
  inputElement: "border outline-none px-3 py-2 mb-4",
  btnElement: "bg-indigo-500 text-white px-3 py-2 mb-4",
};

const Register = () => {
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleSubmit = async () => {
    if (
      values.username !== "" &&
      values.password !== "" &&
      values.email !== ""
    ) {
      const result = api.post("/auth/register", values);
      console.log(result);
    }
  };
  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };
  return (
    <div className="h-screen grid place-items-center">
      <div className="flex flex-col w-3/12 text-center">
        <h1 className="text-start mb-4 text-lg">Sign Up</h1>
        <input
          type="text"
          className={formStyles.inputElement}
          placeholder="Enter your name"
          name="username"
          value={values.username}
          onChange={(e) => handleChange(e)}
        />
        <input
          type="email"
          className={formStyles.inputElement}
          placeholder="Enter your email"
          name="email"
          value={values.email}
          onChange={(e) => handleChange(e)}
        />
        <input
          type="password"
          className={formStyles.inputElement}
          placeholder="Enter your password"
          name="password"
          value={values.password}
          onChange={(e) => handleChange(e)}
        />
        <button className={formStyles.btnElement} onClick={handleSubmit}>
          Create an account
        </button>
        <span className="text-sm">Already have an account?</span>
      </div>
    </div>
  );
};

export default Register;
