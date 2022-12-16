import { baseURL } from '../config';
import * as METHOD from '../methods'
const URL = `${baseURL}/AcumuladorConcepto`;
const URL2 = `${baseURL}/AcumuladorPlanilla`; /* principal pra filtro */
const URL3 = `${baseURL}/ConceptoPlanilla`;/* pasaremos a principal */

/* 1 */
export const getAcumuladorConcepto = async () => {
  try {
    const response = await fetch(`${URL}/Get`, METHOD.GET());
    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err);
  }
};

/* 1 */
export const getAcumuladorConceptoByConceptoId = async (id) => {
  try {
    const response = await fetch(`${URL}/Get/ByConcepto/${id}`, METHOD.GET());
    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err);
  }
};

export const getAcumuladorConceptoByAcuPlanillaId = async (id) => {
  try {
    const response = await fetch(`${URL}/Get/ByAcuPlanilla/${id}`, METHOD.GET());
    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err);
  }
};

/* 2 */
export const AddOrUpdateAcumuladorPlanilla = async (body) => {
  try {
    const response = await fetch(`${URL2}/InsertOrUpdate`, METHOD.POST(body));
    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err);
  }
};
/* 1 */
export const AddOrUpdateAcumuladorConcepto= async (body) => {
  try {
    const response = await fetch(`${URL}/InsertOrUpdate`, METHOD.POST(body));
    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err);
  }
};
/* 1 */
export const deleteAcumuladorConcepto = async (body) => {
  try {
    const response = await fetch(`${URL}/Delete`, METHOD.DELETE(body));
    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err);
  }
};
/* 2  principal */
export const getAcumuladorPlanilla = async () => {
  try {
    const response = await fetch(`${URL2}/Get`, METHOD.GET());
    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err);
  }
};

/* 3 */
export const getConceptoPlanilla = async () => {
  try {
    const response = await fetch(`${URL3}/Get`, METHOD.GET());
    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err);
  }
};
/* export const AddOrUpdateConceptoPlanilla = async (body) => {
  try {
    const response = await fetch(`${URL3}/InsertOrUpdate`, METHOD.POST(body));
    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err);
  }
}; */