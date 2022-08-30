import { baseURL } from '../config';
import * as METHOD from '../methods';
const URL = `${baseURL}/Trabajador`;
const URL2 = `${baseURL}/TrabajadorFamilia`;


export const listWorkers = async () => {
  try {
    const response = await fetch(`${URL}/Get`);
    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err);
  }
};

export const getWorker = async (id) => {
  try {
    const response = await fetch(`${URL}/Get/${id}`);
    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err);
  }
};

export const getOneFamWorker = async (id) => {
  try {
    const response = await fetch(`${URL2}/Get/${id}`);
    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err);
  }
};

export const deleteOneFamWorker = async (body) => {
  try {
    const response = await fetch(`${URL2}/Delete`, METHOD.DELETE(body));
    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err);
  }
};

export const getFamWorker = async (id) => {
  try {
    const response = await fetch(`${URL2}/Get/Trabajador/${id}`);
    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err);
  }
};

export const AddOrUpdateFamWorker = async (body) => {
  try {
    const response = await fetch(`${URL2}/InsertOrUpdate`, METHOD.POST(body));
    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err);
  }
};



export const AddOrUpdateWorker = async (body) => {
  try {
    const response = await fetch(`${URL}/InsertOrUpdate`, METHOD.POST(body));
    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err);
  }
};

export const deleteWorker = async (body) => {
  try {
    const response = await fetch(`${URL}/Delete`, METHOD.DELETE(body));
    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err);
  }
};