import { baseURL } from '../config';
import * as METHOD from '../methods'


const URL = `${baseURL}/PlanillaResumenConcepto`;
/* const URL0 = `` */
/* PlanillaHistorica */

  export const GetPlanillaResumenConcepto= async (COD_PERPLAN) => {
    try {
      const response = await fetch(`${URL}/Get?COD_PERPLAN=${COD_PERPLAN}`, METHOD.GET());
      const data = await response.json();
      return data;
    } catch (err) {
      console.log(err);
    }
  };