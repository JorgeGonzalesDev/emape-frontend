import { baseURL } from '../config';

const URL = `${baseURL}`;

export const getStateCivil = async () => {
  try {
    const response = await fetch(`${URL}/EstadoCivil/Get`);
    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err);
  }
};

export const getDepartments = async () => {
  try{
    const response = await fetch(`${URL}/Departamento/Get`)
    const data = await response.json();
    return data;
  } catch (err){
    console.log(err);
  }
};
 