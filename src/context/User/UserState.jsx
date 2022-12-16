import { React, useState } from "react";
import { ThemeProvider } from "@emotion/react";
import UserContext from "../../context/User/UserContext";
import { baseURLLog } from "../../service/config";
import ResponsiveAppBar from "../../layouts/Header";
import theme from "../../theme"
import Swal from "sweetalert2";
import { PATH } from "../../service/config";

import axios from "axios";
const UserState = ({ children }) => {
  const [logged, setLogged] = useState(window.localStorage.getItem("token"));
  const [success, setSuccess] = useState(window.localStorage.getItem("auth"));
  const URL = `${baseURLLog}/token`;

  const pathPROD = PATH

  const login = async (correo, password) => {
    try {
      const res = await axios.post(`${URL}`, {
        usuario: correo,
        coD_PASCONT: password,
      });
      setLogged(
        localStorage.setItem("token", JSON.stringify(res.data.accessToken))
      );
      setSuccess(localStorage.setItem("auth", true));
    } catch {
      localStorage.removeItem("token");
      localStorage.removeItem("auth")

      return await Swal.fire({
        icon: 'error',
        title: `Usuario y Contraseña<br>incorrectas`,
        showConfirmButton: false,
        timer: 1500
      })

    }
  };
  const logout = async () => {
    localStorage.removeItem("token");
    localStorage.removeItem("auth");
    return window.location = `${pathPROD}`
  };

  const Navbar = () => {

    if (success) {
      return (
        <>
          <ResponsiveAppBar>
            <div style={{ padding: "0px 30px 0px 30px" }}>
              {children}
            </div>
          </ResponsiveAppBar>
        </>
      )
    } else {
      return (
        <>
          {children}
        </>
      )
    }

  }

  return (
    <UserContext.Provider
      value={{
        login,
        logged,
        setLogged,
        logout,
      }}
    >
      <ThemeProvider theme={theme}>
        {Navbar()}
      </ThemeProvider>
    </UserContext.Provider>
  );


};

export default UserState;
