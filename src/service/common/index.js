import { baseURL } from '../config';
import * as METHOD from '../methods';
const URL = `${baseURL}`;

export const getStateCivil = async () => {
  try {
    const response = await fetch(`${URL}/EstadoCivil/Get`, METHOD.GET());
    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err);
  }
};

export const getReportTable = async (id) => {
  try {
    const response = await fetch(`${URL}/ReportePlanillaRemuneracion/Get?COD_PERPLAN=${id}`, METHOD.GET());
    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err);
  }
};


export const getEstVac = async () => {
  try{
    const response = await fetch(`${URL}/EstadoVacacion/Get`, METHOD.GET());
    const data = await response.json();
    return data;
  }catch(err){
    console.log(err)
  }
}

export const getTipoAcciones = async () => {
  try {
    const response = await fetch(`${URL}/TipoAcciones/Get`, METHOD.GET());
    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err);
  }
};

export const getTipoEstudio = async () => {
  try {
    const response = await fetch(`${URL}/TipoEstudio/Get`, METHOD.GET());
    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err);
  }
};

export const getDocumento = async () => {
  try {
    const response = await fetch(`${URL}/Documento/Get`, METHOD.GET());
    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err);
  }
};

export const getDocumentoByID = async (id) => {
  try {
    const response = await fetch(`${URL}/Documento/Get/${id}`, METHOD.GET());
    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err);
  }
};

export const getDepartments = async () => {
  try{
    const response = await fetch(`${URL}/Departamento/Get`, METHOD.GET())
    const data = await response.json();
    return data;
  } catch (err){
    console.log(err);
  }
};

export const getProvincesByDepartment = async (id) => {
  try{
    const response = await fetch(`${URL}/Provincia/GetPronvinciasByDepartamento?COD_DPTO=${id}`, METHOD.GET())
    const data = await response.json();
    return data;
  } catch (err){
    console.log(err);
  }
};

export const getDistrictsByProvince = async (idD, idP) => {
  try{
    const response = await fetch(`${URL}/Distrito/GetDistritosByProvincia?COD_PROVI=${idP}&COD_DPTO=${idD}`, METHOD.GET())
    const data = await response.json();
    return data;
  } catch (err){
    console.log(err);
  }
};

export const getBanks = async () => {
  try{
    const response = await fetch(`${URL}/Banco/Get`, METHOD.GET())
    const data = await response.json();
    return data;
  } catch (err){
    console.log(err);
  }
};

export const getTypeWorker = async () => {
  try{
    const response = await fetch(`${URL}/TipoTrabajador/Get`, METHOD.GET())
    const data = await response.json();
    return data;
  } catch (err){
    console.log(err);
  }
};

export const getRSalud = async () => {
  try{
    const response = await fetch(`${URL}/RegimenSegsalud/Get`, METHOD.GET())
    const data = await response.json();
    return data;
  } catch (err){
    console.log(err);
  }
};

export const getRPension = async () => {
  try{
    const response = await fetch(`${URL}/RegimenPension/Get`, METHOD.GET())
    const data = await response.json();
    return data;
  } catch (err){
    console.log(err);
  }
};

export const getTipoPariente = async () => {
  try{
    const response = await fetch(`${URL}/TipoPariente/Get`, METHOD.GET())
    const data = await response.json();
    return data;
  } catch (err){
    console.log(err);
  }
};

export const getEntidadExt = async () => {
  try{
    const response = await fetch(`${URL}/EntidadExterna/Get`, METHOD.GET())
    const data = await response.json();
    return data;
  } catch (err){
    console.log(err);
  }
};

export const getPuestoLaboral = async () => {
  try{
    const response = await fetch(`${URL}/PuestoLaboral/Get`, METHOD.GET())
    const data = await response.json();
    return data;
  } catch (err){
    console.log(err);
  }
};

export const getUnidad = async () => {
  try{
    const response = await fetch(`${URL}/UnidadOrganizacional/Get`, METHOD.GET())
    const data = await response.json();
    return data;
  } catch (err){
    console.log(err);
  }
};

export const getCondicion = async () => {
  try{
    const response = await fetch(`${URL}/CondicionLaboral/Get`, METHOD.GET())
    const data = await response.json();
    return data;
  } catch (err){
    console.log(err);
  }
};

export const getRLaboral = async () => {
  try{
    const response = await fetch(`${URL}/RegimenLaboral/Get`, METHOD.GET())
    const data = await response.json();
    return data;
  } catch (err){
    console.log(err);
  }
};


export const getOcupacionL = async () => {
  try{
    const response = await fetch(`${URL}/OcupacionLaboral/Get`, METHOD.GET())
    const data = await response.json();
    return data;
  } catch (err){
    console.log(err);
  }
};

export const getCategoriaO = async () => {
  try{
    const response = await fetch(`${URL}/CategoriaOcupacional/Get`, METHOD.GET())
    const data = await response.json();
    return data;
  } catch (err){
    console.log(err);
  }
};

export const getTurno = async () => {
  try{
    const response = await fetch(`${URL}/TurnoLaboral/Get`, METHOD.GET())
    const data = await response.json();
    return data;
  } catch (err){
    console.log(err);
  }
};

export const getTipoPago = async () => {
  try{
    const response = await fetch(`${URL}/TipoPago/Get`, METHOD.GET())
    const data = await response.json();
    return data;
  } catch (err){
    console.log(err);
  }
};
export const getMotivo = async () => {
  try{
    const response = await fetch(`${URL}/MotivoPapeleta/Get`, METHOD.GET())
    const data = await response.json();
    return data;
  } catch (err){
    console.log(err);
  }
};

export const getPapeleta = async () => {
  try{
    const response = await fetch(`${URL}/TipoPapeleta/Get`, METHOD.GET())
    const data = await response.json();
    return data;
  } catch (err){
    console.log(err);
  }
};
export const getTrabajador = async () => {
  try{
    const response = await fetch(`${URL}/Trabajador/Get`, METHOD.GET())
    const data = await response.json();
    return data;
  } catch (err){
    console.log(err);
  }
};

export const getTrabajadorQuintaCategoria = async () => {
  try{
    const response = await fetch(`${URL}/Trabajador/GetQuintacategoria`, METHOD.GET())
    const data = await response.json();
    return data;
  } catch (err){
    console.log(err);
  }
};

export const getSubTypePlan = async (ind) => {
  try{
    const response = await fetch(`${URL}/TipoPlanilla/GetTipoPlanillaByTipoPlanilla?COD_PADRE=${ind}`, METHOD.GET())
    const data = await response.json()
    return data;
  } catch(err){
    console.log(err);
  }
}

export const getConcept = async () => {
  try{
    const response = await fetch(`${URL}/ConceptoPlanilla/Get`, METHOD.GET())
    const data = await response.json()
    return data;
  } catch(err){
    console.log(err);
  }
}

export const getHistoricalBallot = async (cod_plan, cod_trab) => {
  try{
    const response = await fetch(`${URL}/PlanillaHistoricaBoleta/Get?COD_PERPLAN=${cod_plan}&COD_TRABAJADOR=${cod_trab}`, METHOD.GET());
    const data = await response.json();
    return data;
  }catch(err){
    console.log(err);
  }
}

export const getReportsPreviewPRC = async (cod_plan) => {
  try{
    const response = await fetch(`${URL}/PlanillaResumenConcepto/Get?COD_PERPLAN=${cod_plan}`, METHOD.GET());
    const data = await response.json();
    return data;
  }catch(err){
    console.log(err);
  }
}

export const getTypePlan = async (ind) => {
  try{
    const response = await fetch(`${URL}/TipoPlanilla/GetTipoPlanillaByIndiceNivel?IND_NIVE=${ind}`, METHOD.GET())
    const data = await response.json()
    return data;
  } catch(err){
    console.log(err);
  }
}

export const getTypePlanById = async (ind) => {
  try{
    const response = await fetch(`${URL}/TipoPlanilla/GetTipoPlanillaById?COD_TIPOPLAN=${ind}`, METHOD.GET())
    const data = await response.json()
    return data;
  } catch(err){
    console.log(err);
  }
}

export const getCargo = async () => {
  try{
    const response = await fetch(`${URL}/Cargo/Get`, METHOD.GET())
    const data = await response.json();
    return data;
  } catch (err){
    console.log(err);
  }
};
export const GetReportePlanillaPago = async (COD_PERPLAN) => {
  try{
    const response = await fetch(`${URL}/ReportePlanillaPago/Get?COD_PERPLAN=${COD_PERPLAN}`, METHOD.GET());
    const data = await response.json();
    return data;
  }catch(err){
    console.log(err);
  }
}

export const GetPlanillaResumenTC = async (cod_plan) => {
  try{
    const response = await fetch(`${URL}/PlanillaResumenConcepto/Get?COD_PERPLAN=${cod_plan}`, METHOD.GET());
    const data = await response.json();
    return data;
  }catch(err){
    console.log(err);
  }
}

export const GetReportePrestamosAdministrativos = async (mes, annio) => {
  try{
    const response = await fetch(`${URL}/PrestamosAdministrativos/Get?mes=${mes}&annio=${annio}`, METHOD.GET());
    const data = await response.json();
    return data;
  }catch(err){
    console.log(err);
  }
}
export const GetReporteRetencionesJudiciales = async (mes, annio) => {
  try{
    const response = await fetch(`${URL}/RetencionesJudiciales/Get?mes=${mes}&annio=${annio}`, METHOD.GET());
    const data = await response.json();
    return data;
  }catch(err){
    console.log(err);
  }
}
export const GetReporteRetencionesDeRentasDeQuintacategoria = async (mes, annio, COD_TRABAJADOR) => {
  try{
    const response = await fetch(`${URL}/RetencionesDeRentasDeQuintacategoria/Get?mes=${mes}&annio=${annio}&COD_TRABAJADOR=${COD_TRABAJADOR}`, METHOD.GET());
    const data = await response.json();
    return data;
  }catch(err){
    console.log(err);
  }
}
export const GetReporteResumenMensualDeFaltasYTardanzas = async (mes, annio) => {
  try{
    const response = await fetch(`${URL}/ResumenMensualDeFaltasYTardanzas/Get?mes=${mes}&annio=${annio}`, METHOD.GET());
    const data = await response.json();
    return data;
  }catch(err){
    console.log(err);
  }
}
export const GetReporteResumenControlDeVacaciones = async () => {
  try{
    const response = await fetch(`${URL}/ResumenControlDeVacaciones/Get`, METHOD.GET());
    const data = await response.json();
    return data;
  }catch(err){
    console.log(err);
  }
}
export const GetReporteDetalleDeVacaciones = async (annio) => {
  try{
    const response = await fetch(`${URL}/DetalleDeVacaciones/Get?annio=${annio}`, METHOD.GET());
    const data = await response.json();
    return data;
  }catch(err){
    console.log(err);
  }
}

export const GetDetalleDeHijosTrabajadores = async (COD_TRABAJADOR) => {
  try{
    const response = await fetch(`${URL}/DetalleDeHijosTrabajadores/Get?COD_TRABAJADOR=${COD_TRABAJADOR}`, METHOD.GET());
    const data = await response.json();
    return data;
  }catch(err){
    console.log(err); 
  }
}

export const GetReporteDeTrabajadoresFechaNacimientoySexo = async () => {
  try {
    const response = await fetch(`${URL}/ReporteDeTrabajadoresFechaNacimientoySexo/Get`, METHOD.GET());
    const data =  await response.json();
    return data;
  } catch (err) {
    console.log(err);
  }
}

export const GetDetalleDeDescansoMedico = async (annio) => {
  try {
    const response = await fetch(`${URL}/DetalleDeDescansoMedico/Get?annio=${annio}`, METHOD.GET());
    const data =  await response.json();
    return data;
  } catch (err) {
    console.log(err);
  }
}

export const GetReporteResumenPlanilla = async (cod_plan) => {
  try {
    const response = await fetch(`${URL}/ReporteResumenPlanilla/Get?COD_PERPLAN=${cod_plan}`, METHOD.GET());
    const data =  await response.json();
    return data;
  } catch (err) {
    console.log(err);
  }
}

export const GetReportePermisos = async (inicio,  termino) => {
  try {
    const response = await fetch(`${URL}/ReportePermisos/Get?INICIO=${inicio}&TERMINO=${termino}`, METHOD.GET());
    const data =  await response.json();
    return data;
  } catch (err) {
    console.log(err);
  }
}

export const GetReportePadronTrabajadores = async () => {
  try {
    const response = await fetch(`${URL}/ReportePadronTrabajadores/Get`, METHOD.GET());
    const data =  await response.json();
    return data;
  } catch (err) {
    console.log(err);
  }
}

