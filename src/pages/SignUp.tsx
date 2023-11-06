import React from "react";
import { BusinessInterface, ErrorInterface } from "../interfaces";
import clientAxios from "../config/clientAxios";
import { Alert } from "../components";
import { Link } from "react-router-dom";

const SignUp = () => {
  const [values, setValues] = React.useState<BusinessInterface>({
    businessName: "",
    cuit: "",
    email: "",
    password: "",
    confirmPassword: "",
    picture: "",
  });

  const [alert, setAlert] = React.useState<ErrorInterface>({
    msg: "",
    error: undefined,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (values.password !== values.confirmPassword) {
      setAlert({ msg: "Passwords do not match", error: true });
    }

    try {
      const { data } = await clientAxios.post("/business", values);

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
      {error === false ? (
        <div className="bg-primary text-white p-2 mb-4 text-center rounded-md text-sm">
          {msg}
        </div>
      ) : (
        <div>
          <h1 className="text-sm text-gray-400 text-center">
            Please enter your details
          </h1>
          <div>
            <form action="" onSubmit={handleSubmit}>
              <div className="mb-2">
                <label className="block" htmlFor="businessName">
                  Business Name
                </label>
                <input
                  type="text"
                  placeholder="Transporte Jouve"
                  className="w-full mt-1 p-3 border rounded-md text-sm bg-gray-50"
                  name="businessName"
                  id="businessName"
                  value={values.businessName}
                  onChange={handleChange}
                />
              </div>

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

              <div className="mb-2">
                <label className="block" htmlFor="password">
                  Password
                </label>
                <input
                  type="password"
                  placeholder="**********"
                  className="w-full mt-1 p-3 border rounded-md text-sm bg-gray-50"
                  name="password"
                  id="password"
                  value={values.password}
                  onChange={handleChange}
                />
              </div>

              <div className="mb-2">
                <label className="block" htmlFor="confirmPassword">
                  Confirm Password
                </label>
                <input
                  type="password"
                  placeholder="**********"
                  className="w-full mt-1 p-3 border rounded-md text-sm bg-gray-50"
                  name="confirmPassword"
                  id="confirmPassword"
                  value={values.confirmPassword}
                  onChange={handleChange}
                />
              </div>

              {msg && <Alert msg={msg} error={error} />}

              <input
                type="submit"
                value="Create account"
                className="bg-primary text-white w-full p-2 rounded-md shadow-sm hover:cursor-pointer hover:opacity-80"
              />
            </form>
          </div>

          <div className="mt-6">
            <div className="flex text-sm mt-4 justify-center text-center">
              <Link to="/auth/signin" className=" text-gray-500">
                Do you already have an account?{" "}
                <label className="font-bold hover:cursor-pointer">
                  Sign in
                </label>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export { SignUp };
