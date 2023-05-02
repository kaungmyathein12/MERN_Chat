import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Avatar from "boring-avatars";
import useSWRMutation from "swr/mutation";

import api from "../api";

const formStyles = {
  inputElement:
    "bg-transparent border-2 border-night outline-none px-3 py-4 text-sm mb-4",
  btnElement:
    "bg-white text-black text-sm font-bold px-3 py-4 mb-4 hover:bg-green-500 active:bg-green-600 transition-all",
};

const Login = () => {
  // const [error, setError] = useState("");
  const { trigger, error, isMutating } = useSWRMutation(
    "/auth/login",
    async (url) => {
      const { data } = await api.post(url, values);
      if (data.status) {
        localStorage.setItem("user", JSON.stringify(data.user));
        navigate("/");
      } else {
        throw new Error(data.message);
      }
    }
  );

  const navigate = useNavigate();
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async () => {
    if (values.password !== "" && values.email !== "") {
      trigger();
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
        <div className="flex flex-row justify-start items-center mb-6 gap-x-4">
          <div>
            <Avatar
              size={60}
              name={"Get Connect"}
              variant="beam"
              colors={["#D94052", "#EE7E4C", "#EAD56C", "#94C5A5", "#898B75"]}
            />
          </div>
          <div>
            <h1 className="text-start text-xl font-semibold mb-1">
              GetConnect
            </h1>
            <h1 className="text-start font-medium opacity-50">Login account</h1>
          </div>
        </div>
        {error && (
          <div className="py-4 mb-4 bg-red-600 font-semibold text-sm">
            {error?.message}
          </div>
        )}
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
          {isMutating ? "Loading" : "Login"}
        </button>
        <span className="text-sm">Create an account</span>
      </div>
    </div>
  );
};

export default Login;
