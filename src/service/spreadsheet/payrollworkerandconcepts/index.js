import { baseURL } from '../../config';
import * as METHOD from '../../methods'
const URL = `${baseURL}/FormulaPlanilla`;

export const getFormulaPlanilla = async () => {
  try {
    const response = await fetch(`${URL}/Get`, METHOD.GET());
    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err);
  }
};

export const getByPlanAndConc = async (idplan, idconc) => {
  try {
    const response = await fetch(`${URL}/Get/ByPlanAndConc/${idplan}/${idconc}`, METHOD.GET());
    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err);
  }
};

export const AddOrUpdateFormulaPlanilla = async (body) => {
  try {
    const response = await fetch(`${URL}/InsertOrUpdate`, METHOD.POST(body));
    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err);
  }
};
export const deleteFormulaPlanilla = async (body) => {
  try {
    const response = await fetch(`${URL}/Delete`, METHOD.DELETE(body));
    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err);
  }
};