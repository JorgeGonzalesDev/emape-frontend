import { baseURL } from '../config';
import * as METHOD from '../methods'
const URL = `${baseURL}/EntidadExterna`;


export const listExternalEntity = async () => {
  try {
    const response = await fetch(`${URL}/Get`);
    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err);
  }
};

export const getExternalEntity = async (id) => {
  try {
    const response = await fetch(`${URL}/Get/${id}`);
    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err);
  }
};

export const AddOrUpdateExternalEntity = async (body) => {
  try {
    const response = await fetch(`${URL}/InsertOrUpdate`, METHOD.POST(body));
    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err);
  }
};

export const deleteExternalEntity= async (body) => {
  try {
    const response = await fetch(`${URL}/Delete`, METHOD.DELETE(body));
    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err);
  }
};

