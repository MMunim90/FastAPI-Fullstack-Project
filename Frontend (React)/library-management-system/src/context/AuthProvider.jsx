import { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import { baseURL } from "../services/BaseURL";

const AuthProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState(null);

  const accessToken = localStorage.getItem("user_token");

  useEffect(() => {
    async function fetchData() {
      if (!accessToken) {
        setAuthUser(null);
        return;
      }

      const userRes = await fetch(`${baseURL}/user_profile`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const userData = await userRes.json();

      setAuthUser(userData);
    }
    fetchData();
  }, [accessToken]);

  console.log(authUser)

  return (
    <AuthContext.Provider value={{ authUser, setAuthUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
