import { baseURL } from '../config';
import * as METHOD from '../methods';
const URL = `${baseURL}/Trabajador`;
const URL2 = `${baseURL}/TrabajadorFamilia`;
const URL3 = `${baseURL}/TrabajadorVacacion`;


export const listWorkers = async () => {
  try {
    const response = await fetch(`${URL}/Get`, METHOD.GET());
    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err);
  }
};

export const getWorker = async (id) => {
  try {
    const response = await fetch(`${URL}/Get/${id}`, METHOD.GET());
    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err);
  }
};

export const getOneFamWorker = async (id) => {
  try {
    const response = await fetch(`${URL2}/Get/${id}`, METHOD.GET());
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
    const response = await fetch(`${URL2}/Get/Trabajador/${id}`, METHOD.GET());
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

export const getVacationWorker = async () => {
  try {
    const response = await fetch(`${URL3}/Get`, METHOD.GET());
    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err);
  }
};

export const deleteVacationWorker = async (body) => {

  try {
    const response = await fetch(`${URL3}/Delete`, METHOD.DELETE(body));
    const data = await response.json()
    return data;
  } catch (err) {
    console.log(err)
  }

}

export const getOneVacationWorker = async (id) => {
  try{
    const response = await fetch(`${URL3}/Get/${id}`, METHOD.GET())
    const data = await response.json();
    return data;
  }catch(err){
    console.log(err);
  }
}

export const AddOrUpdateVacationWorker = async (body) => {
  try {
    const response = await fetch(`${URL3}/InsertOrUpdate`, METHOD.POST(body));
    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err);
  }
};
