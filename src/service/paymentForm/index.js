import { baseURL } from '../config';
import * as METHOD from '../methods'


const URL = `${baseURL}/ReportePlanillaPago`;
/* const URL0 = `` */
/* PlanillaHistorica */

  export const GetReportePlanillaPago= async (COD_PERPLAN) => {
    try {
      const response = await fetch(`${URL}/Get?COD_PERPLAN=${COD_PERPLAN}`, METHOD.GET());
      const data = await response.json();
      return data;
    } catch (err) {
      console.log(err);
    }
  };