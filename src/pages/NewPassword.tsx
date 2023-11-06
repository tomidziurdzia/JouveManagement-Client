import { Link, useParams } from "react-router-dom";
import { Alert } from "../components";
import clientAxios from "../config/clientAxios";
import React from "react";
import { ErrorInterface } from "../interfaces";

const NewPassword = () => {
  const { token } = useParams();
  const [password, setPassword] = React.useState("");
  const [viewForm, setViewForm] = React.useState(false);

  const [alert, setAlert] = React.useState<ErrorInterface>({
    msg: "",
    error: undefined,
  });

  React.useEffect(() => {
    const checkToken = async () => {
      try {
        await clientAxios(`/business/forget-password/${token}`);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        setAlert({ msg: error.response.data.msg, error: true });
      }
    };
    checkToken();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const { data } = await clientAxios.post(
        `/business/forget-password/${token}`,
        { password }
      );

      setAlert({ msg: data.msg, error: false });
      setViewForm(!viewForm);

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setAlert({ msg: error.response.data.msg, error: true });
    }
  };

  const { msg, error } = alert;

  return (
    <div className="w-full">
      <h1 className="text-sm text-gray-400 text-center">
        Recover access and manage your projects
      </h1>
      <div className="mt-6">{msg && <Alert msg={msg} error={error} />}</div>
      <div>
        {!error && !viewForm && (
          <form action="" onSubmit={handleSubmit}>
            <div className="mb-2">
              <label className="block" htmlFor="password">
                Email
              </label>
              <input
                type="password"
                placeholder="administracion@transportejouve.com.ar"
                className="w-full mt-1 p-3 border rounded-md text-sm bg-gray-50"
                name="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <input
              type="submit"
              value="Change Password"
              className="bg-primary text-white w-full p-2 rounded-md shadow-sm hover:cursor-pointer hover:opacity-80"
            />
          </form>
        )}
      </div>

      {viewForm && (
        <div className="mt-6">
          <div className="flex flex-col text-sm mt-4 justify-center text-center">
            <Link
              to="/auth/signin"
              className="bg-primary text-white w-full p-2 rounded-md shadow-sm hover:cursor-pointer hover:opacity-80"
            >
              Sign in
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export { NewPassword };
