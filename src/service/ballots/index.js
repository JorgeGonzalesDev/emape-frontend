import { baseURL } from '../config';
import * as METHOD from '../methods';
const URL = `${baseURL}/TipoPapeleta`;


export const listTipoPapeleta = async () => {
  try {
    const response = await fetch(`${URL}/Get`, METHOD.GET());
    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err);
  }
};

export const getTipoPapeleta = async (id) => {
  try {
    const response = await fetch(`${URL}/Get/${id}`, METHOD.GET());
    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err);
  }
};

export const AddOrUpdateTipoPapeleta = async (body) => {
  try {
    const response = await fetch(`${URL}/InsertOrUpdate`, METHOD.POST(body));
    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err);
  }
};

export const deleteTipoPapeleta = async (body) => {
  try {
    const response = await fetch(`${URL}/Delete`, METHOD.DELETE(body));
    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err);
  }
};

