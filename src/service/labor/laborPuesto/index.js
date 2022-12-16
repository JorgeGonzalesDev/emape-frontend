import { baseURL } from '../../config';
import * as METHOD from '../../methods'
const URL = `${baseURL}/PuestoLaboral`;
/* Puesto Laboral */

/* export const ListPuesto = async () => {
    try {
      const response = await fetch(`${URL}/Get`, METHOD.GET());
      const data = await response.json();
      return data;
    } catch (err) {
      console.log(err);
    }
  }; */

export const getPuestoLaboral = async () => {
    try {
        const response = await fetch(`${URL}/Get`, METHOD.GET());
        const data = await response.json();
        return data;
    } catch (err) {
        console.log(err);
    }
};


export const AddOrUpdatePuesto = async (body) => {
    try {
      const response = await fetch(`${URL}/InsertOrUpdate`, METHOD.POST(body));
      const data = await response.json();
      return data;
    } catch (err) {
      console.log(err);
    }
  };
  export const deletePuesto = async (body) => {
    try {
      const response = await fetch(`${URL}/Delete`, METHOD.DELETE(body));
      const data = await response.json();
      return data;
    } catch (err) {
      console.log(err);
    }
  };