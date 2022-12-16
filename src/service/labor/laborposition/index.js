import { baseURL } from '../../config';
import * as METHOD from '../../methods'


const URL = `${baseURL}/OcupacionLaboral`;
/* cargo laboral */
/* export const ListPosition = async () => {
    try {
      const response = await fetch(`${URL}/Get`);
      const data = await response.json();
      return data;
    } catch (err) {
      console.log(err);
    }
  }; */

  
export const getOcupacionLaboral = async () => {
    try {
        const response = await fetch(`${URL}/Get`, METHOD.GET());
        const data = await response.json();
        return data;
    } catch (err) {
        console.log(err);
    }
};

export const AddOrUpdateOcupacion = async (body) => {
    try {
      const response = await fetch(`${URL}/InsertOrUpdate`, METHOD.POST(body));
      const data = await response.json();
      return data;
    } catch (err) {
      console.log(err);
    }
  };
  export const deleteOcupacion = async (body) => {
    try {
      const response = await fetch(`${URL}/Delete`, METHOD.DELETE(body));
      const data = await response.json();
      return data;
    } catch (err) {
      console.log(err);
    }
  };