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

export const getTipoAcciones = async () => {
  try {
    const response = await fetch(`${URL}/TipoAcciones/Get`);
    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err);
  }
};

export const getTipoEstudio = async () => {
  try {
    const response = await fetch(`${URL}/TipoEstudio/Get`);
    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err);
  }
};

export const getDocumento = async () => {
  try {
    const response = await fetch(`${URL}/Documento/Get`);
    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err);
  }
};

export const getDocumentoByID = async (id) => {
  try {
    const response = await fetch(`${URL}/Documento/Get/${id}`);
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

export const getBanks = async () => {
  try{
    const response = await fetch(`${URL}/Banco/Get`)
    const data = await response.json();
    return data;
  } catch (err){
    console.log(err);
  }
};

export const getTypeWorker = async () => {
  try{
    const response = await fetch(`${URL}/TipoTrabajador/Get`)
    const data = await response.json();
    return data;
  } catch (err){
    console.log(err);
  }
};

export const getRSalud = async () => {
  try{
    const response = await fetch(`${URL}/RegimenSegsalud/Get`)
    const data = await response.json();
    return data;
  } catch (err){
    console.log(err);
  }
};

export const getRPension = async () => {
  try{
    const response = await fetch(`${URL}/RegimenPension/Get`)
    const data = await response.json();
    return data;
  } catch (err){
    console.log(err);
  }
};

export const getTipoPariente = async () => {
  try{
    const response = await fetch(`${URL}/TipoPariente/Get`)
    const data = await response.json();
    return data;
  } catch (err){
    console.log(err);
  }
};

export const getEntidadExt = async () => {
  try{
    const response = await fetch(`${URL}/EntidadExterna/Get`)
    const data = await response.json();
    return data;
  } catch (err){
    console.log(err);
  }
};

export const getPuestoLaboral = async () => {
  try{
    const response = await fetch(`${URL}/PuestoLaboral/Get`)
    const data = await response.json();
    return data;
  } catch (err){
    console.log(err);
  }
};

export const getUnidad = async () => {
  try{
    const response = await fetch(`${URL}/UnidadOrganizacional/Get`)
    const data = await response.json();
    return data;
  } catch (err){
    console.log(err);
  }
};

export const getCondicion = async () => {
  try{
    const response = await fetch(`${URL}/CondicionLaboral/Get`)
    const data = await response.json();
    return data;
  } catch (err){
    console.log(err);
  }
};

export const getRLaboral = async () => {
  try{
    const response = await fetch(`${URL}/RegimenLaboral/Get`)
    const data = await response.json();
    return data;
  } catch (err){
    console.log(err);
  }
};


export const getOcupacionL = async () => {
  try{
    const response = await fetch(`${URL}/OcupacionLaboral/Get`)
    const data = await response.json();
    return data;
  } catch (err){
    console.log(err);
  }
};

export const getCategoriaO = async () => {
  try{
    const response = await fetch(`${URL}/CategoriaOcupacional/Get`)
    const data = await response.json();
    return data;
  } catch (err){
    console.log(err);
  }
};

export const getTurno = async () => {
  try{
    const response = await fetch(`${URL}/TurnoLaboral/Get`)
    const data = await response.json();
    return data;
  } catch (err){
    console.log(err);
  }
};

export const getTipoPago = async () => {
  try{
    const response = await fetch(`${URL}/TipoPago/Get`)
    const data = await response.json();
    return data;
  } catch (err){
    console.log(err);
  }
};








