import { baseURL } from '../config';

const URL = `${baseURL}/CatalogoAFP`;

export const listAFPS = async () => {
  try {
    const response = await fetch(`${URL}/Get`);
    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err);
  }
};