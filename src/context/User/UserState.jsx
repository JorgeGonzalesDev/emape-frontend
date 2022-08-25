import React, { useReducer, useState } from "react";
import UserContext from "../../context/User/UserContext";
import { baseURLLog } from "../../service/config";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const UserState = ({ children }) => {
  const navigate = useNavigate();
  const [logged, setLogged] = useState(window.localStorage.getItem("token"));
  const URL = `${baseURLLog}/token`;
  const login = async (correo, password) => {
    try {
      const res = await axios.post(`${URL}`, {
        usuario: correo,
        coD_PASCONT: password,
      });
      setLogged(
        localStorage.setItem("token", JSON.stringify(res.data.accessToken))
      );
      navigate("/maestro");
    } catch {
      localStorage.removeItem("token");
      alert("Usuario o contraseña incorrectos");
      navigate("/");
    }
  };
  const logout = async () => {
    localStorage.removeItem("token");
    navigate("/");
  };
  return (
    <UserContext.Provider
      value={{
        login,
        logged,
        setLogged,
        logout,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserState;
