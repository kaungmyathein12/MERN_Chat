import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Avatar from "boring-avatars";
import useSWRMutation from "swr/mutation";
import api from "../api";
import AuthPage from "../components/Layouts/AuthPage";

// eslint-disable-next-line react-refresh/only-export-components
export const formStyles = {
  inputElement:
    "bg-transparent border-2 border-night outline-none px-3 py-4 text-sm mb-4",
  btnElement:
    "bg-white text-black text-sm font-bold px-3 py-4 mb-4 hover:bg-green-500 active:bg-green-600 transition-all",
};

const Login = () => {
  // eslint-disable-next-line no-unused-vars
  const { trigger, error, isMutating } = useSWRMutation(
    "/auth/login",
    async (url) => {
      const { data } = await api.post(url, values);
      if (data.status) {
        localStorage.setItem("token", data.token);

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
    if (localStorage.getItem("token")) {
      navigate("/");
    }
  }, []);
  return (
    <AuthPage>
      <div className="flex flex-col w-3/12 text-center">
        <div className="flex flex-row justify-start items-center mb-6 gap-x-4">
          <div>
            <Avatar
              size={60}
              name={"Get Connect"}
              variant="mabble"
              colors={["#5E412F", "#FCEBB6", "#78C0A8", "#F07818", "#F0A830"]}
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
        <Link to={"/register"}>
          <span className="text-sm underline">Create an account</span>
        </Link>
      </div>
    </AuthPage>
  );
};

export default Login;
