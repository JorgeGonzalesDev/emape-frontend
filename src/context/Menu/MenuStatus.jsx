import { useState, useEffect } from "react";
import MenuContext from "./Menu.Context";
import { baseURL } from "../../service/config";
import axios from "axios";
const MenuState = ({ children }) => {
  const [menu, setMenu] = useState([]);
  const URL = `${baseURL}/MenuUsuario/GetByCodUsuario?id=`;
  const loadMenu = async (id) => {
    try {
      const res = await axios.get(`${URL}${id}`);
      setMenu(res.data.listado);
      console.log(res.data.listado);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <MenuContext.Provider value={{ loadMenu, menu }}>
      {children}
    </MenuContext.Provider>
  );
};
export default MenuState;
