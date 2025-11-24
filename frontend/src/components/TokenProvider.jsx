import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const TokenContext = createContext(false);

const TokenProvider = ({ children }) => {
  const [isTokenValid, setIsTokenValid] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const tokenCheck = async () => {
      const accesstoken = localStorage.getItem("accessToken");
      if (!accesstoken) {
        setIsTokenValid(false);
        setLoading(false);
        return;
      }
      try {
        const { data } = await axios.get("/api/user/token_valid_check", {
          headers: { Authorization: `Bearer ${accesstoken}` },
        });

        setIsTokenValid(data.success);
        setLoading(false);
      } catch (error) {
        console.log("error", error?.response?.data?.message);
        setIsTokenValid(false);
        setLoading(false);
      }
    };

    tokenCheck();
  }, [isTokenValid]);
  if (loading) {
    return <h1>Loading......</h1>;
  }
  return (
    <TokenContext.Provider value={{ isTokenValid, setIsTokenValid }}>
      {children}
    </TokenContext.Provider>
  );
};

export default TokenProvider;
