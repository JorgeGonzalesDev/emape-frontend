import { baseURL } from "../config";
import * as METHOD from "../methods";
const URL = `${baseURL}/TrabajadorAsistencia`;
const URL2 = `${baseURL}/TrabajadorAsistenciaProcesado`;
const URL3 = `${baseURL}/FaltaTardanza`;
const URL4 = `${baseURL}/SincronizarAsistencia`


export const listTrabajadorAsistencia = async () => {
    try {
      const response = await fetch(`${URL}/Get`, METHOD.GET());
      const data = await response.json();
      return data;
    } catch (err) {
      console.log(err);
    }
  };

export const getTrabajadorAsistencia = async (id) => {
  try {
    const response = await fetch(`${URL}/Get/${id}`, METHOD.GET());
    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err);
  }
};

export const AddOrUpdateTrabajadorAsistencia = async (body) => {
  try {
    const response = await fetch(`${URL}/InsertOrUpdate`, METHOD.POST(body));
    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err);
  }
};
export const deleteTrabajadorAsistencia = async (body) => {
  try {
    const response = await fetch(`${URL}/Delete`, METHOD.DELETE(body));
    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err);
  }
};

export const getTrabajadorAsistenciaProcesado = async () => {
  try {
    const response = await fetch(`${URL2}/Get`, METHOD.GET());
    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err);
  }
};

export const getTrabajadorAsistenciaProcesadoByDates = async (fec_ini, fec_ter) => {
  try {
    const response = await fetch(`${URL2}/GetByFechas/${fec_ini}/${fec_ter}`, METHOD.GET());
    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err);
  }
};

export const getFaltaTardanza= async (fechaInicio, fechaFin) => {
  try {
    const response = await fetch(`${URL3}/Get/${fechaInicio}/${fechaFin}`, METHOD.GET());
    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err);
  }
};

export const asyncAssitance = async (body) => {
  try {
    const response = await fetch(`${URL4}/SincronizacionAsistencia`, METHOD.POST(body));
    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err);
  }
};