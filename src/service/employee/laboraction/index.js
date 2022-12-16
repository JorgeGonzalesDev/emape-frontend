import { baseURL } from '../../config';
import * as METHOD from '../../methods'


const URL = `${baseURL}/TrabajadorAcciones`;
/* Acciones Laborales */

export const listTrabajadorAcciones = async (id) => {
    try {
      const response = await fetch(`${URL}/Get/Trabajador/${id}`, METHOD.GET());
      const data = await response.json();
      return data;
    } catch (err) {
      console.log(err);
    }
  };
  
export const getTrabajadorAcciones = async (id) => {
    try {
        const response = await fetch(`${URL}/Get/${id}`, METHOD.GET());
        const data = await response.json();
        return data;
    } catch (err) {
        console.log(err);
    }
};

export const AddOrUpdateTrabajadorAcciones = async (body) => {
    try {
      const response = await fetch(`${URL}/InsertOrUpdate`, METHOD.POST(body));
      const data = await response.json();
      return data;
    } catch (err) {
      console.log(err);
    }
  };
  export const deleteTrabajadorAcciones = async (body) => {
    try {
      const response = await fetch(`${URL}/Delete`, METHOD.DELETE(body));
      const data = await response.json();
      return data;
    } catch (err) {
      console.log(err);
    }
  };