import { baseURL } from '../../config';
import * as METHOD from '../../methods'
const URL = `${baseURL}/PlanillaConcepto`;

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
export const getPlanillaTrabajadorByTipoPlan = async (idP) => {
  try {
    const response = await fetch(`${URL}/Get/ByTipoPlan/${idP}`, METHOD.GET());
    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err);
  }
};
export const getPlanillaTrabajadorByFormulaTipoPlan = async (idP, inDCalculo) => {
  try {
    const response = await fetch(`${URL}/Get/ByCalculoTipoPlan/${inDCalculo}/${idP}`, METHOD.GET());
    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err);
  }
};
export const getPlanillaTrabajadorByIndCalculo = async (IND_CALCULO) => {
  try {
    const response = await fetch(`${URL}/Get/ByIndCalculo/${IND_CALCULO}`, METHOD.GET());
    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err);
  }
};
export const getPlanillaConceptoByTypePlan = async (idP) => {
  try {
    const response = await fetch(`${URL}/Get/ByTipoPlan/${idP}`, METHOD.GET());
    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err);
  }
};

export const AddOrUpdatePlanillaConcepto = async (body) => {
  try {
    const response = await fetch(`${URL}/InsertOrUpdate`, METHOD.POST(body));
    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err);
  }
};
export const deletePlanillaConcepto = async (body) => {
  try {
    const response = await fetch(`${URL}/Delete`, METHOD.DELETE(body));
    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err);
  }
};