import { baseURL } from '../../config';
import * as METHOD from '../../methods'


const URL = `${baseURL}/TrabajadorExperiencia`;
/* Acciones Laborales */

export const listTrabajadorExperiencia = async (id) => {
  try {
    const response = await fetch(`${URL}/Get/Trabajador/${id}`, METHOD.GET());
    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err);
  }
};

export const getTrabajadorExperiencia = async (id) => {
  try {
    const response = await fetch(`${URL}/Get/${id}`, METHOD.GET());
    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err);
  }
};

export const AddOrUpdateTrabajadorExperiencia = async (body) => {
  try {
    const response = await fetch(`${URL}/InsertOrUpdate`, METHOD.POST(body));
    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err);
  }
};
export const deleteTrabajadorExperiencia = async (body) => {
  try {
    const response = await fetch(`${URL}/Delete`, METHOD.DELETE(body));
    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err);
  }
};