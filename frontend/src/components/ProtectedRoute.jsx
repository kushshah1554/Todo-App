import React, { useContext } from "react";
import { TokenContext } from "./TokenProvider";
import { Navigate ,useLocation} from "react-router-dom";

const ProtectedRoute = ({ children, isLoginOrSignup }) => {
  const { isTokenValid } = useContext(TokenContext);
  const location=useLocation();

  //  Login or Signup page
  if (isLoginOrSignup) {
    return isTokenValid ? <Navigate to="/todo" /> : children;  
  }

  //  Protected page
  return isTokenValid ? children : location.pathname==="/todo" ? <Navigate to="/" /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
