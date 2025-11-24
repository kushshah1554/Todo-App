import React, { useContext } from "react";
import { TokenContext } from "./TokenProvider";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, isLoginOrSignup }) => {
  const { isTokenValid } = useContext(TokenContext);

  //  Login or Signup page
  if (isLoginOrSignup) {
    return isTokenValid ? <Navigate to="/" /> : children;
  }

  //  Protected page

  return isTokenValid ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
