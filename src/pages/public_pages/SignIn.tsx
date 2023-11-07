import React from "react";
import { ErrorInterface } from "../../interfaces";
import { Alert } from "../../components";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { useAppSelector } from "../../store/store";

interface SignIn {
  email: string;
  password: string;
}

const SignIn = () => {
  const { startLogin } = useAuth();
  const [values, setValues] = React.useState<SignIn>({
    email: "",
    password: "",
  });

  const [alert, setAlert] = React.useState<ErrorInterface>({
    msg: "",
    error: undefined,
  });

  const { errorMessage } = useAppSelector((state) => state.auth);
  React.useEffect(() => {
    if (errorMessage) {
      setAlert(errorMessage);
    }
  }, [errorMessage]);

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
    await startLogin(values);
  };

  const { msg, error } = alert;
  return (
    <div className="w-full">
      <h1 className="text-sm text-gray-400 text-center">
        Please enter your details
      </h1>

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

          {msg && <Alert msg={msg} error={error} />}

          <input
            type="submit"
            value="Log in"
            className="bg-primary text-white w-full p-2 rounded-md shadow-sm hover:cursor-pointer hover:opacity-80"
          />
        </form>
      </div>

      <div className="mt-6">
        <div className="flex flex-col text-sm mt-4 justify-center text-center">
          <Link to="/auth/signup" className="text-gray-500">
            Don't have an account?{" "}
            <label className="font-bold hover:cursor-pointer">Sign up</label>
          </Link>
          <Link
            className="block text-slate-500 text-sm mt-2"
            to="/auth/forget-password"
          >
            Forget password
          </Link>
        </div>
      </div>
    </div>
  );
};

export { SignIn };
