import { useState } from "react";
import MenuContext from "./Menu.Context";
import { baseURL } from "../../service/config";
import axios from "axios";
import { PATH } from "../../service/config";

const MenuState = ({ children }) => {
  const [menu, setMenu] = useState([]);
  const URL = `${baseURL}/MenuUsuario/GetByCodUsuario?id=`;
  const pathPROD = PATH

  const loadMenu = async (id) => {
    if (localStorage.getItem("token")) {
      const token = localStorage.getItem("token").replace(/['"]+/g, '');
      try {
        const res = await axios.get(`${URL}${id}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        setMenu(res.data.listado);
      } catch (error) {
        localStorage.removeItem("token");
        localStorage.removeItem("auth");
        console.log(error);
        return window.location = `${pathPROD}`
      }
    }
  };
  return (
    <MenuContext.Provider value={{ loadMenu, menu }}>
      {children}
    </MenuContext.Provider>
  );
};
export default MenuState;
