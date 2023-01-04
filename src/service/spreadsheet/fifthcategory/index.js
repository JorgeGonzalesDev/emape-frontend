import { baseURL } from '../../config';
import * as METHOD from '../../methods'
const URL = `${baseURL}/TrabajadorQuintaCategoria`;
const URL2 = `${baseURL}/FormulaPlanilla`;

export const getFormulaPlanilla = async () => {
  try {
    const response = await fetch(`${URL2}/Get`, METHOD.GET());
    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err);
  }
};

export const getByPlanAndConc = async (idplan, idconc) => {
  try {
    const response = await fetch(`${URL}/Get/${idplan}/${idconc}`, METHOD.GET());
    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err);
  }
};

export const GetByPeriodoMesTra = async (body) => {
  try {
    const response = await fetch(`${URL}/Post`, METHOD.POST(body));
    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err);
  }
};
export const GetByPeriodoMesTra2 = async (body) => {
  try {
    const response = await fetch(`${URL}/Post2tabla`, METHOD.POST(body));
    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err);
  }
};

export const AddOrUpdateQuintaCategoria = async (body) => {
  try {
    const response = await fetch(`${URL}/InsertOrUpdate`, METHOD.POST(body));
    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err);
  }
};
export const deleteQuintaCategoria = async (body) => {
  try {
    const response = await fetch(`${URL}/Delete`, METHOD.DELETE(body));
    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err);
  }
};