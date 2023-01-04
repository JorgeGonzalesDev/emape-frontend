import { baseURL } from '../../config';
import * as METHOD from '../../methods'
const URL = `${baseURL}/PlanillaTrabajador`;

export const getPlanillaTrabajador = async () => {
  try {
    const response = await fetch(`${URL}/Get`, METHOD.GET());
    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err);
  }
};

export const getPlanillaTrabajadorByTipoPlan = async (id) => {
  try {
    const response = await fetch(`${URL}/GetByCodTipoPlan/${id}`, METHOD.GET());
    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err);
  }
};


export const getPlanillaTrabajadorById = async (idT, idP) => {
  try {
    const response = await fetch(`${URL}/Get/${idT}/${idP}`, METHOD.GET());
    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err);
  }
};

export const AddOrUpdatePlanillaTrabajador = async (body) => {
  try {
    const response = await fetch(`${URL}/InsertOrUpdate`, METHOD.POST(body));
    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err);
  }
};
export const AddOrUpdatePlanillaTrabajadorRango = async (body) => {
  try {
    const response = await fetch(`${URL}/InsertRange`, METHOD.POST(body));
    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err);
  }
};

export const AddOrUpdatePlanillaTrabajadorRango2 = async (body) => {
  try {
    const response = await fetch(`${URL}/InsertRange2`, METHOD.POST(body));
    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err);
  }
};

export const deletePlanillaTrabajador = async (body) => {
  try {
    const response = await fetch(`${URL}/Delete`, METHOD.DELETE(body));
    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err);
  }
};