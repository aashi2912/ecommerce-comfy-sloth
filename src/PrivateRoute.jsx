import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

function PrivateRoute({ children }) {
  const { isLoggedIn } = useSelector((state) => state.user);
  const sessionUser = sessionStorage.getItem("user");
  if (isLoggedIn || sessionUser) return children;
  return <Navigate to={"/sign-in"} />;
}

export default PrivateRoute;
