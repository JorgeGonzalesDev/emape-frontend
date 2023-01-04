import { baseURL } from '../../config';
import * as METHOD from '../../methods'
const URL = `${baseURL}/PlanillaTrabajador`;
const URL2 = `${baseURL}/PlanillaConcepto`;

const URL3 = `${baseURL}/ConceptoPlanilla`;

const URL4 = `${baseURL}/AcumuladorPlanilla`;


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
export const deletePlanillaTrabajador = async (body) => {
  try {
    const response = await fetch(`${URL}/Delete`, METHOD.DELETE(body));
    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err);
  }
};

/* 2 */
export const getPlanillaConceptoCalculo = async (IND_CALCULO) => {
  try {
    const response = await fetch(`${URL2}/Get/ByIndCalculo/${IND_CALCULO}`, METHOD.GET());
    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err);
  }
};

// UPDATE IND FORMULA

export const UpdateFormulaInd = async (body) => {
  try {
    const response = await fetch(`${URL3}/UpdateFormula`, METHOD.POST(body));
    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err);
  }
};

export const getAcumuladorPlanilla = async () => {
  try {
    const response = await fetch(`${URL4}/Get`, METHOD.GET());
    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err);
  }
};
