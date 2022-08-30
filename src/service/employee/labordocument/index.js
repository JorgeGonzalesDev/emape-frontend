import { baseURL } from '../../config';
import * as METHOD from '../../methods'


const URL = `${baseURL}/TrabajadorDocumento`;
/* Acciones Laborales */

export const listTrabajadorDocumento = async (id) => {
    try {
      const response = await fetch(`${URL}/Get/Trabajador/${id}`);
      const data = await response.json();
      return data;
    } catch (err) {
      console.log(err);
    }
  };
  
export const getTrabajadorDocumento = async (id) => {
    try {
        const response = await fetch(`${URL}/Get/${id}`);
        const data = await response.json();
        return data;
    } catch (err) {
        console.log(err);
    }
};

export const AddOrUpdateTrabajadorDocumento = async (body) => {
    try {
      const response = await fetch(`${URL}/InsertOrUpdate`, METHOD.POST(body));
      const data = await response.json();
      return data;
    } catch (err) {
      console.log(err);
    }
  };
  export const deleteTrabajadorDocumento = async (body) => {
    try {
      const response = await fetch(`${URL}/Delete`, METHOD.DELETE(body));
      const data = await response.json();
      return data;
    } catch (err) {
      console.log(err);
    }
  };