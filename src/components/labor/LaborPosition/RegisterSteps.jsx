import { Grid, TextField, MenuItem, Button, Alert, AlertTitle } from "@mui/material";
import { useState, useEffect } from "react";
/* import { getStateCivil, getDepartments } from "../../service/common";
import { getLevelEducate } from "../../service/nivelEducate"; */
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import moment from 'moment';
import { AddOrUpdateOcupacion, getOcupacionLaboral } from "../../../service/labor/laborposition";
import { useParams } from "react-router-dom";

const RegisterSteps = () => {

    const [fields, setFields] = useState({
        'coD_OCUPLABORAL':'',
        'noM_OCUPLABORAL':'',
    });


    /* const [stateCivil, setStateCivil] = useState([]);
    const [levelEducate, setLevelEducate] = useState([]);
    const [departments, setDepartments] = useState([]); */
    const { id } = useParams();

    const loadData = async () => {

        if (id) {
            const response = await getOcupacionLaboral(id)
            if (response.listado){
                setFields(response.listado[0]);
            }else{
                window.location = "/maestro/Labor/cargoLaboral"
            }
        }

        /* const responseStateCivil = await getStateCivil();
        const responseLevelEducate = await getLevelEducate();
        const responseDepartments = await getDepartments(); */
        /* setStateCivil(responseStateCivil.listado);
        setLevelEducate(responseLevelEducate.listado);
        setDepartments(responseDepartments.listado);
 */
    };

    useEffect(() => {
        loadData();

    }, []);

    const handleInputChange = event => {
        const { name, value } = event.target;
        setFields({ ...fields, [name]: value });
    };

    const handleInputChangeDate = (value, name) => {
        setFields({
            ...fields,
            [name]: moment.utc(new Date(value)).format('YYYY-MM-DD'),
        });
    };

    const defaultErrors = {
        'noM_OCUPLABORAL':false,

    };

    const [inputError, setInputError] = useState(defaultErrors);

    const [errors, setErrors] = useState(false);

    const [step, setStep] = useState(0);

    const validateFields = () => {

        const copyFields = { ...fields };

        delete copyFields.coD_OCUPLABORAL;

        if (step === 0) {
            delete copyFields.noM_OCUPLABORAL;
        }

    

        let errors = {};

        Object.keys(copyFields).forEach(key => {
            if (copyFields[key] === '' || copyFields[key] === 0) {

                console.log(
                    `El campo ${key} => ${copyFields[key]} no puede estar vacío`
                );

                errors[`${key}`] = true;
            }
        });

        if (Object.keys(errors).length > 0) {

            setInputError(errors);
            setErrors(true)
            return false;
        }

        setErrors(false)
        setInputError(defaultErrors);
        return true;

    }

    function validatetxT_EMAIL(txT_EMAIL) {
        var re = /\S+@\S+\.\S+/;
        return re.test(txT_EMAIL);
    }

    const signUpOcupacion = async () => {

        await AddOrUpdateOcupacion(fields);

        alert('Enviado satisfactoriamente');

        return window.location = "/maestro/Labor/cargoLaboral"

    }

    const nextStep = async () => {

        // if (step === 0) {
        //     fields.full_noM_PERS = `${fields.deS_APELLP} ${fields.deS_APELLM} ${fields.noM_PERS}`
        // };

        const validate = validateFields();

        if (!validate) return;

        console.log(fields);

        if (step === 0) {

            if (!id) {
                fields.coD_OCUPLABORAL = 0;
            }

            signUpOcupacion();

        }

        setStep(step + 1)

    }

    const backStep = () => setStep(step - 1);

    const generalRender = () => {
        if (step === 0) {
            return (
                <>
                    <Grid item md={12} sm={12}>
                        <h2>Registrar Cargo Laboral</h2>
                    </Grid>
                    {id && <Grid item md={4} sm={12} xs={12}>
                        <TextField
                            fullWidth
                            label="Código"
                            name="coD_OCUPLABORAL"
                            value={fields.coD_OCUPLABORAL}
                            inputProps={
                                { readOnly: true, }
                            }
                        />
                    </Grid>}
    
                    
                    <Grid item md={12} />
                    <Grid item md={3} sm={12} xs={12}>
                        <TextField
                            name="noM_OCUPLABORAL"
                            fullWidth
                            label="Descripción"
                            type='text'
                            error={inputError.noM_OCUPLABORAL}
                            onChange={handleInputChange}
                            value={fields.noM_OCUPLABORAL}
                        />
                    </Grid>
                    <Grid item md={12} xs={12} />
                    <Grid item md={12} xs={12}>
                        <Button onClick={nextStep} variant="contained">Siguiente</Button>
                        <Button style={{ marginLeft: '30px' }} onClick={nextStep} variant="contained">Registrar</Button>
                    </Grid>
                </>
            );
        }
    };

    return (

        <>
            {errors &&
                <Alert severity="error">
                    <AlertTitle>Error</AlertTitle>
                    Por favor, complete todos los campos
                </Alert>}
            <Grid container spacing={2}>
                {generalRender()}
            </Grid>
        </>

    )
}

export default RegisterSteps;