import { baseURL } from '../../config';
import * as METHOD from '../../methods'
const URL = `${baseURL}`;

/* Condición Laboral */
export const getCondicionLaboral = async () => {
    try {
        const response = await fetch(`${URL}/CondicionLaboral/Get`, METHOD.GET() );
        const data = await response.json();
        return data;
    } catch (err) {
        console.log(err);
    }
};