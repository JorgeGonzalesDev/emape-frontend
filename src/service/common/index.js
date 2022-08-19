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

export const getProvincesByDepartment = async (id) => {
  try{
    const response = await fetch(`${URL}/Provincia/GetPronvinciasByDepartamento?COD_DPTO=${id}`)
    const data = await response.json();
    return data;
  } catch (err){
    console.log(err);
  }
};

export const getDistrictsByProvince = async (idD, idP) => {
  try{
    const response = await fetch(`${URL}/Distrito/GetDistritosByProvincia?COD_PROVI=${idP}&COD_DPTO=${idD}`)
    const data = await response.json();
    return data;
  } catch (err){
    console.log(err);
  }
};
 
