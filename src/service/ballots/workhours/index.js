import { baseURL } from '../../config';
import * as METHOD from '../../methods';
const URL = `${baseURL}/HorarioLaboral`;


/* export const listHorarioLaboral = async () => {
  try {
    const response = await fetch(`${URL}/Get`);
    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err);
  }
}; */

export const getHorarioLaboral = async () => {
  try {
    const response = await fetch(`${URL}/Get`, METHOD.GET());
    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err);
  }
};

export const AddOrUpdateHorarioLaboral = async (body) => {
  try {
    const response = await fetch(`${URL}/InsertOrUpdate`, METHOD.POST(body));
    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err);
  }
};

export const deleteHorarioLaboral = async (body) => {
  try {
    const response = await fetch(`${URL}/Delete`, METHOD.DELETE(body));
    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err);
  }
};

