import { baseURL } from '../config';
import * as METHOD from '../methods'


const URL = `${baseURL}/PlanillaHistorica`;
/* const URL0 = `` */
/* PlanillaHistorica */
  
export const ListPlanillaHistorica = async () => {
    try {
        const response = await fetch(`${URL}/Get`, METHOD.GET());
        const data = await response.json();
        return data;
    } catch (err) {
        console.log(err);
    }
};
export const getPlanillaHistorica= async (id) => {
    try {
      const response = await fetch(`${URL}/Get/${id}`, METHOD.GET());
      const data = await response.json();
      return data;
    } catch (err) {
      console.log(err);
    }
  };
  export const getPlanillaHistoricaExportTXT= async (COD_PERPLAN, dateTime) => {
    try {
      const response = await fetch(`${URL}/ExportTXT/${COD_PERPLAN}?dateTime=${dateTime}`, METHOD.GET());
      const data = await response.json();
      return data;
    } catch (err) {
      console.log(err);
    }
  };
  export const GetTxt= async (NOM_FILE) => {
    try {
      const response = await fetch(`${URL}/GetFileBase64?NOM_FILE=${NOM_FILE}`, METHOD.GET());
      const data = await response.json();
      return data;
    } catch (err) {
      console.log(err);
    }
  };
  export const GetByPeriodoPlanilla= async (COD_PERPLAN) => {
    try {
      const response = await fetch(`${URL}/GetByPeriodoPlanilla/${COD_PERPLAN}`, METHOD.GET());
      const data = await response.json();
      return data;
    } catch (err) {
      console.log(err);
    }
  };

  export const GetByPeriodoPlanilla2= async (COD_PERPLAN) => {
    try {
      const response = await fetch(`${URL}/GetByPeriodoPlanilla2/${COD_PERPLAN}`, METHOD.GET());
      const data = await response.json();
      return data;
    } catch (err) {
      console.log(err);
    }
  };
  export const ExportTXTREM= async (COD_CONDICION,COD_PERPLAN,COD_CARGO,COD_UORG) => {
    try {
      const response = await fetch(`${URL}/ExportTXTREM/${COD_CONDICION}/${COD_PERPLAN}/${COD_CARGO}/${COD_UORG}`, METHOD.GET());
      const data = await response.json();
      return data;
    } catch (err) {
      console.log(err);
    }
  };
  export const ExportTXTJOR= async (COD_CONDICION,COD_PERPLAN,COD_CARGO,COD_UORG) => {
    try {
      const response = await fetch(`${URL}/ExportTXTJOR/${COD_CONDICION}/${COD_PERPLAN}/${COD_CARGO}/${COD_UORG}`, METHOD.GET());
      const data = await response.json();
      return data;
    } catch (err) {
      console.log(err);
    }
  };
  export const ExportTXTNOT= async (COD_CONDICION,COD_PERPLAN,COD_CARGO,COD_UORG) => {
    try {
      const response = await fetch(`${URL}/ExportTXTNOT/${COD_UORG}/${COD_CARGO}/${COD_CONDICION}/${COD_PERPLAN}`, METHOD.GET());
      const data = await response.json();
      return data;
    } catch (err) {
      console.log(err);
    }
  };
/* export const AddOrUpdatePlanillaHistorica = async (body) => {
    try {
      const response = await fetch(`${URL}/InsertOrUpdate`, METHOD.POST(body));
      const data = await response.json();
      return data;
    } catch (err) {
      console.log(err);
    }
  };
  export const deletePlanillaHistorica = async (body) => {
    try {
      const response = await fetch(`${URL}/Delete`, METHOD.DELETE(body));
      const data = await response.json();
      return data;
    } catch (err) {
      console.log(err);
    }
  }; */