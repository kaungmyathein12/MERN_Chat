import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";

const formStyles = {
  inputElement: "bg-night outline-none px-3 py-2 mb-4",
  btnElement: "bg-indigo-500 text-white px-3 py-2 mb-4",
};

const Register = () => {
  const navigate = useNavigate();
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
      const { data } = await api.post("/auth/register", values);
      if (data.status) {
        localStorage.setItem("user", JSON.stringify(data.user));
        navigate("/");
      } else {
        alert(data.message);
      }
    }
  };
  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  useEffect(() => {
    if (localStorage.getItem("user")) {
      navigate("/");
    }
  }, []);
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
