import React from "react";
import { ErrorInterface } from "../../interfaces";
import clientAxios from "../../config/clientAxios";
import { Alert } from "../../components";
import { Link } from "react-router-dom";

const ForgetPassword = () => {
  const [values, setValues] = React.useState({
    email: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  const [alert, setAlert] = React.useState<ErrorInterface>({
    msg: "",
    error: undefined,
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const { data } = await clientAxios.post("/auth/forget-password", values);

      console.log(data);

      setAlert({ msg: data.msg, error: false });

      console.log(data);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log(error);
      setAlert({ msg: error.response.data.msg, error: true });
    }
  };

  const { msg, error } = alert;

  return (
    <div className="w-full">
      <h1 className="text-sm text-gray-400 text-center">
        Recover access and manage your projects
      </h1>
      {msg.length !== 0 ? (
        <div className="mt-6">{msg && <Alert msg={msg} error={error} />}</div>
      ) : (
        <div>
          <form action="" onSubmit={handleSubmit}>
            <div className="mb-2">
              <label className="block" htmlFor="email">
                Email
              </label>
              <input
                type="email"
                placeholder="administracion@transportejouve.com.ar"
                className="w-full mt-1 p-3 border rounded-md text-sm bg-gray-50"
                name="email"
                id="email"
                value={values.email}
                onChange={handleChange}
              />
            </div>

            <input
              type="submit"
              value="Send Instructions"
              className="bg-primary text-white w-full p-2 rounded-md shadow-sm hover:cursor-pointer hover:opacity-80"
            />
          </form>
        </div>
      )}

      <div className="mt-6">
        <div className="flex flex-col text-sm mt-4 justify-center text-center">
          <Link to="/auth/signup" className=" text-gray-500 ">
            Don't have an account?{" "}
            <label className="font-bold hover:cursor-pointer">Sign up</label>
          </Link>

          <Link to="/auth/signin" className="mt-2 text-gray-500 ">
            Do you already have an account?{" "}
            <label className="font-bold hover:cursor-pointer">Sign in</label>
          </Link>
        </div>
      </div>
    </div>
  );
};

export { ForgetPassword };
