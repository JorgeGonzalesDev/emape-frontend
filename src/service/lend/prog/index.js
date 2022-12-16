import { baseURL } from '../../config';
import * as METHOD from '../../methods'
const URL = `${baseURL}/TrabajadorDescuentoProg`;

export const getPlanillaConcepto = async () => {
  try {
    const response = await fetch(`${URL}/Get`, METHOD.GET());
    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err);
  }
};

export const getPlanillaConceptoById = async (idC, idP) => {
  try {
    const response = await fetch(`${URL}/Get/${idC}/${idP}`, METHOD.GET());
    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err);
  }
};

export const getEmployeeDesByConcept = async (id) => {
  try {
    const response = await fetch(`${URL}/Get/ByConcept/${id}`, METHOD.GET());
    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err);
  }
};

export const getEmployeeDesByConceptFec = async (anio, mes, concept) => {
  try {
    const response = await fetch(`${URL}/Get/ByFecAndConcept?anio=${anio}&mes=${mes}&concept=${concept}`, METHOD.GET());
    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err);
  }
};

export const getEmployeeDesEdit = async (id) => {
    try {
      const response = await fetch(`${URL}/Get/${id}`, METHOD.GET());
      const data = await response.json();
      return data;
    } catch (err) {
      console.log(err);
    }
  };

export const employeeDesInsertorUpdate = async (body) => {
  try {
    const response = await fetch(`${URL}/InsertOrUpdate`, METHOD.POST(body));
    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err);
  }
};
export const deleteEmployeeDes = async (body) => {
  try {
    const response = await fetch(`${URL}/Delete`, METHOD.DELETE(body));
    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err);
  }
};