import { baseURL } from '../../config';
import * as METHOD from '../../methods'
const URL = `${baseURL}/TrabajadorDescuentoCron`;

export const getEmployeeDesCron = async (id) => {
  try {
    const response = await fetch(`${URL}/Get/ByTrabDescProg/${id}`, METHOD.GET());
    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err);
  }
};

export const employeeDesCronInsertorUpdate = async (body) => {
  try {
    const response = await fetch(`${URL}/InsertOrUpdate`, METHOD.POST(body));
    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err);
  }
};

export const deleteDesCron = async (body) => {
  try {
    const response = await fetch(`${URL}/Delete`, METHOD.DELETE(body));
    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err);
  }
};