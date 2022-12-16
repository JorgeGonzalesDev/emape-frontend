import { baseURL } from '../../config';
import * as METHOD from '../../methods'


const URL = `${baseURL}/TrabajadorEducacion`;
/* Educacion Laborales */

export const listTrabajadorEducacion = async (id) => {
    try {
      const response = await fetch(`${URL}/Get/Trabajador/${id}`, METHOD.GET());
      const data = await response.json();
      return data;
    } catch (err) {
      console.log(err);
    }
  };
  
export const getTrabajadorEducacion = async (id) => {
    try {
        const response = await fetch(`${URL}/Get/${id}`, METHOD.GET() );
        const data = await response.json();
        return data;
    } catch (err) {
        console.log(err);
    }
};

export const AddOrUpdateTrabajadorEducacion = async (body) => {
    try {
      const response = await fetch(`${URL}/InsertOrUpdate`, METHOD.POST(body));
      const data = await response.json();
      return data;
    } catch (err) {
      console.log(err);
    }
  };
  export const deleteTrabajadorEducacion = async (body) => {
    try {
      const response = await fetch(`${URL}/Delete`, METHOD.DELETE(body));
      const data = await response.json();
      return data;
    } catch (err) {
      console.log(err);
    }
  };