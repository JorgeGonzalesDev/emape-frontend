import { baseURL } from '../../config';
import * as METHOD from '../../methods';
const URL = `${baseURL}`;


export const saveTypePlan = async (body) => {
    try {
        const response = await fetch(`${URL}/TipoPlanilla/InsertOrUpdate`, METHOD.POST(body))
        const data = await response.json()
        return data;
    } catch (err) {
        console.log(err);
    }
}

export const getTypePlanBy = async (id) => {
    try {
        const response = await fetch(`${URL}/TipoPlanilla/GetTipoPlanillaById?COD_TIPOPLAN=${id}`, METHOD.GET());
        const data = await response.json();
        return data;
    } catch (err) {
        console.log(err);
    }
};

export const getTypePlanByParent = async (id) => {
    try {
        const response = await fetch(`${URL}/TipoPlanilla/GetTipoPlanillaByTipoPlanilla?COD_PADRE=${id}`, METHOD.GET());
        const data = await response.json();
        return data;
    } catch (err) {
        console.log(err);
    }
};

export const deleteTypePlan = async (body) => {
    try {
        const response = await fetch(`${URL}/TipoPlanilla/Delete`, METHOD.DELETE(body))
        const data = await response.json()
        return data;
    } catch (err) {
        console.log(err);
    }
}

