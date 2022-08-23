// import { Grid, TextField, MenuItem, Button, Alert, AlertTitle } from "@mui/material";
import { getStateCivil, getDepartments, getProvincesByDepartment, getDistrictsByProvince } from "../../service/common";
import { getLevelEducate } from "../../service/nivelEducate";
// import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import moment from 'moment';
import Swal from "sweetalert2";
// import { AddOrUpdatePerson, getPerson } from "../../service/person";
import { useParams } from "react-router-dom";
import { getExternalEntity } from "../../service/externalentity";
import { Grid, Button, MenuItem, TextField } from "@mui/material";
import { useState, useEffect } from "react";
import { AddOrUpdateExternalEntity } from "../../service/externalentity";
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';

const RegisterSteps = () => {

    const { id } = useParams();


    const [fields, setFields] = useState({
        coD_PERS: 0,
        coD_ENTIDAD: '',
        inD_TIPOENTIDAD: '',
        noM_ENTIDAD: '',
        deS_DIRECCION: '',
        nuM_RUC: '',
        nuM_TLF: '',
    });

    const loadData = async () => {

        if (id) {
            const response = await getExternalEntity(id)
            if (response.listado) {
                setFields(
                    {
                        coD_ENTIDAD: response.listado[0]['coD_ENTIDAD'],
                        inD_TIPOENTIDAD: response.listado[0]['inD_TIPOENTIDAD'],
                        noM_ENTIDAD: response.listado[0]['noM_ENTIDAD'],
                        deS_DIRECCION: response.listado[0]['deS_DIRECCION'],
                        nuM_RUC: response.listado[0]['nuM_RUC'],
                        nuM_TLF: response.listado[0]['nuM_TLF'],
                    }
                );
            } else {
                return window.location = "/maestro/generales/entidadExterna"
            }
        }


    };

    useEffect(() => {
        loadData();
    }, []);

    const [step, setStep] = useState(0);

    const handleInputChange = event => {

        const { name, type, checked, value } = event.target;

        const val = type === 'checkbox' ? checked : value;

        setFields({
            ...fields,
            [name]: val,
        });


    }

    /* const handleInputChangeDate = (value, name) => {
        setFields({
            ...fields,
            [name]: moment(new Date(value)).format(),
        });
    }; */

    const nextStep = async () => {


        if (step === 0) {

            const response = await AddOrUpdateExternalEntity(fields);
            //console.log(response['code']);

            if (response.code === 0) {

                await Swal.fire({
                    icon: 'success',
                    title: 'Datos ingresados con exito',
                    showConfirmButton: false,
                    timer: 1500
                })

                return window.location = "/maestro/generales/"


            } else {
                return Swal.fire({
                    icon: 'error',
                    title: 'Ha ocurrido un error al ingresar los datos',
                    showConfirmButton: false,
                    timer: 1500
                })
            }

        }
/* 
        setStep(step + 0); */

    }

    /* const backStep = async () => {

        setStep(step - 0);

    } */

    const Steps = () => {

        if (step === 0) {
            return (
                <>
                    <Grid item md={12} sm={12}>
                        <h2>Registrar Entidad Externa</h2>
                    </Grid>
                    <Grid item md={3} sm={12} xs={12}>
                        <TextField
                            name="coD_ENTIDAD"
                            fullWidth
                            label="Código Entidad"
                            type='number'
                            //error={inputError.nuM_DOC}
                            onChange={handleInputChange}
                            value={fields.coD_ENTIDAD}
                        />
                    </Grid>
                    <Grid item md={3} sm={12} xs={12}>
                        <TextField
                            name="inD_TIPOENTIDAD"
                            fullWidth
                            label="N° RUC"
                            type='Tipo Entidad'
                            //error={inputError.nuM_RUC}
                            onChange={handleInputChange}
                            value={fields.inD_TIPOENTIDAD}
                        />
                    </Grid>
                    <Grid item md={12} />
                    <Grid
                        item md={3} sm={12} xs={12}>
                        <TextField
                            name="noM_ENTIDAD"
                            fullWidth
                            label="Nombre Entidad"
                            type='text'
                            //error={inputError.deS_APELLP}
                            onChange={handleInputChange}
                            value={fields.noM_ENTIDAD}
                        />
                    </Grid>
                    <Grid item md={3} sm={12} xs={12}>
                        <TextField
                            name="deS_DIRECCION"
                            fullWidth
                            label="Dirección"
                            type='text'
                            //error={inputError.deS_APELLM}
                            onChange={handleInputChange}
                            value={fields.deS_DIRECCION}
                        />
                    </Grid>
                    <Grid item md={2} sm={12} xs={12}>
                        <TextField
                            name="nuM_RUC"
                            fullWidth
                            label="Número Ruc"
                            type='numeric'
                            //error={inputError.noM_PERS}
                            onChange={handleInputChange}
                            value={fields.nuM_RUC}
                        />
                    </Grid>
                    <Grid item md={12} />
                    <Grid
                        item md={4} xs={12}>
                        <TextField
                            name="nuM_TLF"
                            fullWidth
                            label="Número Telefono"
                            type='numeric'
                            //error={inputError.noM_PERS}
                            onChange={handleInputChange}
                            value={fields.nuM_TLF}
                        />
                    </Grid>
                </>
            )
        }
    }
    return (
        <>
            <Grid container spacing={2}>
                {Steps()}
                <Grid item md={12} xs={12} />
                <Grid item md={12} xs={12}>
                    {step > 0 ? (
                        <>
                            {/* <Button onClick={backStep} variant="contained">Retroceder</Button> */}
                            <Button style={{ marginLeft: '30px' }} onClick={nextStep} variant="contained">Siguiente</Button>
                        </>
                    )
                        : (
                            <Button onClick={nextStep} variant="contained">Siguiente</Button>
                        )}
                </Grid>
            </Grid>
        </>
    )
}

export default RegisterSteps;