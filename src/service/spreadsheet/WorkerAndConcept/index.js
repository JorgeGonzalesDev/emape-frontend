import { baseURL } from '../../config';
import * as METHOD from '../../methods'
const URL = `${baseURL}/TrabajadorConcepto`;

export const getTrabajadorConcepto = async (id) => {
  try {
    const response = await fetch(`${URL}/GetByTipoPlan/${id}`, METHOD.GET());
    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err);
  }
};

export const getTrabajadorConceptoByWorker = async (id) => {
  try {
    const response = await fetch(`${URL}/GetByTrabajador/${id}`, METHOD.GET());
    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err);
  }
};
export const getTrabajadorSpreadsheet = async (COD_TRABAJADOR,coD_TIPOPLAN) => {
  try {
    const response = await fetch(`${URL}/GetByTrabajador&TipoPlanilla/${COD_TRABAJADOR}/${coD_TIPOPLAN}`, METHOD.GET());
    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err);
  }
};

export const AddOrUpdateWorkerConcept = async (body) => {
  try {
    const response = await fetch(`${URL}/InsertOrUpdate`, METHOD.POST(body));
    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err);
  }
};

export const destroyWC = async (body) => {
  try {
    const response = await fetch(`${URL}/Delete`, METHOD.DELETE(body));
    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err);
  }
};
