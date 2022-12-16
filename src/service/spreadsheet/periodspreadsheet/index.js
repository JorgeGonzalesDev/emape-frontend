import { baseURL } from '../../config';
import * as METHOD from '../../methods'
const URL = `${baseURL}/PeriodoPlanilla`;
const URL2 = `${baseURL}/CalcularPeriodoPlanilla`;

export const getPeriodoPlanilla = async () => {
  try {
    const response = await fetch(`${URL}/Get`, METHOD.GET());
    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err);
  }
};

export const getPeriodoPlanillaByID = async (COD_PERPLAN) => {
  try {
    const response = await fetch(`${URL}/Get/${COD_PERPLAN}`, METHOD.GET());
    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err);
  }
};

export const getPeriodoPlanillaByYear = async (year) => {
  try {
    const response = await fetch(`${URL}/Getbyaño?NUM_PERIODO=${year}`, METHOD.GET());
    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err);
  }
};
export const getPeriodoPlanillaByYearPerplan = async (year, month) => {
  try {
    const response = await fetch(`${URL}/Get/${year}/${month}`, METHOD.GET());
    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err);
  }
};


export const AddOrUpdatePeriodoPlanilla = async (body) => {
  try {
    const response = await fetch(`${URL}/InsertOrUpdate`, METHOD.POST(body));
    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err);
  }
};

export const validatePeriodo = async (year, month, id) => {
  try {
    const response = await fetch(`${URL}/Get/${year}/${month}/${id}`, METHOD.GET());
    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err);
  }
}

export const deletePeriodoPlanilla = async (body) => {
  try {
    const response = await fetch(`${URL}/Delete`, METHOD.DELETE(body));
    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err);
  }
};


export const calculatePlanilla = async (codigo) => {
  try {
    const response = await fetch(`${URL2}/CalcularPlanilla/${codigo}`, METHOD.GET());
    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err);
  }
};
