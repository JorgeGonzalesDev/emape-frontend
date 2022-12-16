import { baseURL } from '../config';
import * as METHOD from '../methods'

const URL = `${baseURL}/GradoInstruccion`;

export const getLevelEducate = async () => {
    try {
        const response = await fetch(`${URL}/Get`, METHOD.GET() );
        const data = await response.json();
        return data;
    } catch (err) {
        console.log(err);
    }
};

export const AddOrUpdateLevelEducate = async (body) => {
  try {
    const response = await fetch(`${URL}/InsertOrUpdate`, METHOD.POST(body));
    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err);
  }
};

export const deleteLevelEducate = async (body) => {
    try {
      const response = await fetch(`${URL}/Delete`, METHOD.DELETE(body));
      const data = await response.json();
      return data;
    } catch (err) {
      console.log(err);
    }
  };
