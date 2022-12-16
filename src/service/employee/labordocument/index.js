import { baseURL } from '../../config';
import * as METHOD from '../../methods'


const URL = `${baseURL}/TrabajadorDocumento`;
/* Acciones Laborales */

export const listTrabajadorDocumento = async (id) => {
  try {
    const response = await fetch(`${URL}/Get/Trabajador/${id}`, METHOD.GET());
    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err);
  }
};

export const getTrabajadorDocumento = async (id) => {
  try {
    const response = await fetch(`${URL}/Get/${id}`, METHOD.GET());
    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err);
  }
};

export const getFile = async (name) => {
  try{
    const response = await fetch(`${URL}/GetFileBase64?NOM_FILE=${name}`, METHOD.GET())
    const data = await response.json()
    return data;
  }catch(err){
    console.log(err)
  }
}

export const AddOrUpdateTrabajadorDocumento = async (body) => {

  const formData = new FormData()

  if(body?.coD_PERS && body?.coD_TIPPARIENTE){
    formData.append("coD_TRADOC", body?.coD_TRADOC);
    formData.append("coD_TRABAJADOR", body?.coD_TRABAJADOR);
    formData.append("inD_DOCTRAB", body?.inD_DOCTRAB);
    formData.append("coD_DOC", body?.coD_DOC);
    formData.append("coD_PERS", body?.coD_PERS);
    formData.append("coD_TIPPARIENTE", body?.coD_TIPPARIENTE);
    formData.append("obS_DOCUMENTO", body?.obS_DOCUMENTO);
    formData.append("inD_FILE", body?.inD_FILE);
  }else{
    formData.append("coD_TRADOC", body?.coD_TRADOC);
    formData.append("coD_TRABAJADOR", body?.coD_TRABAJADOR);
    formData.append("inD_DOCTRAB", body?.inD_DOCTRAB);
    formData.append("coD_DOC", body?.coD_DOC);
    formData.append("obS_DOCUMENTO", body?.obS_DOCUMENTO);
    formData.append("inD_FILE", body?.inD_FILE);
  }



  try {
    const response = await fetch(`${URL}/InsertOrUpdate`, METHOD.POST_FORM_DATA(formData));
    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err);
  }
};
export const deleteTrabajadorDocumento = async (body) => {
  try {
    const response = await fetch(`${URL}/Delete`, METHOD.DELETE(body));
    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err);
  }
};