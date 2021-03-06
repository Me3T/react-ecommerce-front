import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Route } from "react-router-dom";
import { currentAdmin } from "../../functions/auth";
import LoadingToRedirect from "./LoadingToRedirect";

const AdminRoute = ({ children, ...rest }) => {
  const { user } = useSelector((state) => ({ ...state }));
  const [ok, setOK] = useState(false);

  useEffect(() => {
    if (user && user.token) {
      currentAdmin(user.token)
        .then((res) => {
          console.log("Current admin Res", res);
          setOK(true);
        })
        .catch((err) => {
          console.log("Admin Route Err", err);
          setOK(false);
        });
    }
  }, [user]);

  return ok ? <Route {...rest} /> : <LoadingToRedirect />;
};

export default AdminRoute;
