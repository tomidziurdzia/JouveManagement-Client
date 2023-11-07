import React from "react";
import { Link, useParams } from "react-router-dom";
import { ErrorInterface } from "../../interfaces";
import clientAxios from "../../config/clientAxios";
import { Alert } from "../../components";

const ConfirmAccount = () => {
  const { token } = useParams();
  const [alert, setAlert] = React.useState<ErrorInterface>({
    msg: "",
    error: undefined,
  });
  const [confirm, setConfirm] = React.useState(false);

  React.useEffect(() => {
    const confirmAccount = async () => {
      try {
        const url = `/auth/confirm/${token}`;
        const { data } = await clientAxios(url);
        console.log(data);
        setConfirm(true);

        setAlert({
          msg: data.msg,
          error: false,
        });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        setAlert({ msg: error.response.data.msg, error: true });
        console.log(error);
      }
    };
    confirmAccount();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  const { msg, error } = alert;

  return (
    <>
      <div className="w-full">
        <h1 className="text-lg text-gray-400 text-center">
          Confirm your account and manage your projects
        </h1>

        <div className="mt-5">{<Alert msg={msg} error={error} />}</div>

        {confirm && (
          <div className="flex text-sm mt-4 justify-center text-center">
            <Link to="/auth/signin" className=" text-gray-500">
              Do you already have an account?{" "}
              <label className="font-bold hover:cursor-pointer">Sign in</label>
            </Link>
          </div>
        )}
      </div>
    </>
  );
};

export { ConfirmAccount };
