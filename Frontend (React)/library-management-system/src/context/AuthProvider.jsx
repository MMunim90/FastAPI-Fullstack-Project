import { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import { baseURL } from "../services/BaseURL";
import Swal from "sweetalert2";

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

      if (userData.detail == "User Not Found!!!"){
        return
      }
      setAuthUser(userData);
    }
    fetchData();
  }, [accessToken]);

  // console.log(authUser)

  const logout = () => {
    localStorage.removeItem("user_token");
    setAuthUser(null);
    Swal.fire({
      icon: "success",
      title: "See You!",
      text: "Logout successful!!!",
      background: "#0f172a",
      color: "#e2e8f0",
      confirmButtonColor: "#60a5fa",
      iconColor: "#60a5fa",
      customClass: {
        popup: "libraryhub-swal",
        title: "libraryhub-swal-title",
        confirmButton: "libraryhub-swal-button",
      },
    });
  };

  return (
    <AuthContext.Provider value={{ authUser, setAuthUser, logout, accessToken}}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
