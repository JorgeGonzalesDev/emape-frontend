import { baseURL } from '../config';
import * as METHOD from '../methods'
const URL = `${baseURL}/TipoEstudio`;

export const getTipoEstudio = async () => {
  try {
    const response = await fetch(`${URL}/Get`, METHOD.GET());
    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err);
  }
};
