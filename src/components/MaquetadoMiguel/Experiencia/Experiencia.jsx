// import { Grid, TextField, MenuItem, Button, Alert, AlertTitle } from "@mui/material";
import { getStateCivil, getDepartments, getProvincesByDepartment, getDistrictsByProvince } from "../../../service/common";
// import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import moment from 'moment';
import Swal from "sweetalert2";
// import { AddOrUpdatePerson, getPerson } from "../../service/person";
import { useParams } from "react-router-dom";
import { getTrabajadorExperiencia } from "../../../service/employee/laborexperience";
import { Grid, Button, MenuItem, TextField } from "@mui/material";
import { useState, useEffect } from "react";
import { AddOrUpdateTrabajadorExperiencia } from "../../../service/employee/laborexperience";
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { getCargo } from "../../../service/position";
import { getCondicion, getUnidad } from "../../../service/common";


const Experiencia = () => {
    const { id } = useParams();
    const [fields, setFields] = useState({
        coD_TRAEXP: 0,
        coD_TRABAJADOR: null,
        feC_INICIO: null,
        feC_TERMINO: null,
        noM_INSTITUCION: null,
        coD_ENTIDAD: null,
        inD_INSTITUCION: null,
        reF_DOCCAR: null,
        coD_CONDICION: null,
        coD_UORG: null,
        coD_CAR: null,
        deS_FUNCION: null,
        coD_USUMOD: null,
        coD_USUREG: null
    });
    const defaultErrors = {
        coD_TRAEXP: false,
        coD_TRABAJADOR: false,
        feC_INICIO: false,
        feC_TERMINO: false,
        noM_INSTITUCION: false,
        coD_ENTIDAD: false,
        inD_INSTITUCION: false,
        reF_DOCCAR: false,
        coD_CONDICION: false,
        coD_UORG: false,
        coD_CAR: false,
        deS_FUNCION: false,
        coD_USUMOD: false,
        coD_USUREG: false
    };
    const [inputError, setInputError] = useState(defaultErrors);


    const [positions, setPositions] = useState([]);
    const [condicion, setCondicion] = useState([]);
    const [unidad, setUnidad] = useState([]);

    const loadData = async () => {

        const responsePositions = await getCargo();
        setPositions(responsePositions.listado);
        const responseCondicion = await getCondicion();
        setCondicion(responseCondicion.listado);
        const responseUnidad = await getUnidad();
        setUnidad(responseUnidad.listado);

        if (id) {
            const response = await getTrabajadorExperiencia(id)
            if (response.listado) {
                setFields(
                    {
                        coD_TRAEXP: response.listado[0]['coD_TRAEXP'],
                        coD_TRABAJADOR: response.listado[0]['coD_TRABAJADOR'],
                        feC_INICIO: response.listado[0]['feC_INICIO'],
                        feC_TERMINO: response.listado[0]['feC_TERMINO'],
                        noM_INSTITUCION: response.listado[0]['noM_INSTITUCION'],
                        coD_ENTIDAD: response.listado[0]['coD_ENTIDAD'],
                        inD_INSTITUCION: response.listado[0]['inD_INSTITUCION'],
                        reF_DOCCAR: response.listado[0]['reF_DOCCAR'],
                        coD_CONDICION: response.listado[0]['coD_CONDICION'],
                        coD_UORG: response.listado[0]['coD_UORG'],
                        coD_CAR: response.listado[0]['coD_CAR'],
                        deS_FUNCION: response.listado[0]['deS_FUNCION'],
                        coD_USUMOD: response.listado[0]['coD_USUMOD'],
                        coD_USUREG: response.listado[0]['coD_USUREG'],

                    }
                );
            } else {
                return window.location = "/MaquetadoMiguel/LaborExperience/"
            }
        }
    };

    const handleInputChange = event => {
        const { name, value } = event.target;
        setFields({ ...fields, [name]: value });
    }

    const validateFields = () => {

        const copyFields = { ...fields };

        delete copyFields.coD_TRAEXP;

        let errors = {};

        Object.keys(copyFields).forEach(key => {
            if (copyFields[key] === '' || copyFields[key] === 0 || !copyFields[key]) {

                console.log(
                    `El campo ${key} => ${copyFields[key]} no puede estar vacío`
                );

                errors[`${key}`] = true;
            }
        });

        if (Object.keys(errors).length > 0) {

            setInputError(errors);
            return false;
        }

        setInputError(defaultErrors);
        return true;

    }


    const handleFields = async () => {

        console.log(fields);
        debugger;
        const validate = validateFields();

        if (!validate) return;

        //debbuger;        

        const response = await AddOrUpdateTrabajadorExperiencia(fields);

        debugger;

        if (response.code === 0) {
            await Swal.fire({
                icon: "success",
                title: "Datos ingresados con exito",
                showConfirmButton: false,
                timer: 1500,
            });

            return window.location = "/MaquetadoMiguel/LaborExperience";

        } else {
            return Swal.fire({
                icon: "error",
                title: "Ha ocurrido un error al ingresar los datos",
                showConfirmButton: false,
                timer: 1500,
            })
        }
    }

    useEffect(() => {
        loadData();
    }, []);


    return (
        <>

            <Grid container spacing={2}>
                <Grid item md={12} sm={12}>
                    <h2>Experiencia Laboral</h2>
                </Grid>
                {/* <Grid item md={2} sm={12} xs={12}>
                        <TextField
                            fullWidth
                            label="Cod. Tra. Experiencia"
                            name="coD_TRAEXP"
                            type='number'
                            size="small"
                            onChange={handleInputChange}
                            value={fields.coD_TRAEXP}
                        />
                    </Grid> */}
                <Grid item md={2} sm={12} xs={12}>
                    <TextField
                        fullWidth
                        label="Cod. Trabajador"
                        name="coD_TRABAJADOR"
                        type='number'
                        size="small"
                        select
                        onChange={handleInputChange}
                        value={fields.coD_TRABAJADOR}
                    />

                </Grid>
                <Grid item md={12} />
                <Grid item md={2} sm={12} xs={12}>
                    <TextField
                        fullWidth
                        label="Fecha Inicio"
                        name="feC_INICIO"
                        type='date'
                        /* InputLabelProps={{
                            shrink: true,
                        }} */
                        size="small"
                        onChange={handleInputChange}
                        value={fields.feC_INICIO}
                    />
                </Grid>
                <Grid item md={12} />
                <Grid item md={2} sm={12} xs={12}>
                    <TextField
                        fullWidth
                        label="Fecha Termino"
                        name="feC_TERMINO"
                        type='date'
                        InputLabelProps={{
                            shrink: true,
                        }}
                        onChange={handleInputChange}
                        value={fields.feC_TERMINO}
                    />
                </Grid>
                <Grid item md={12} />
                <Grid item md={2} sm={12} xs={12}>
                    <TextField
                        fullWidth
                        label="Institución"
                        name="noM_INSTITUCION"
                        onChange={handleInputChange}
                        value={fields.noM_INSTITUCION}
                    />
                </Grid>
                <Grid item md={2} sm={12} xs={12}>
                    <TextField
                        fullWidth
                        label="Cod. Entidad"
                        name="coD_ENTIDAD"
                        onChange={handleInputChange}
                        value={fields.coD_ENTIDAD}
                    />
                </Grid>
                <Grid item md={12} />
                {/*  */}
                <Grid item md={2} sm={12} xs={12}>
                    <TextField
                        fullWidth
                        label="Ind. Institución"
                        name="inD_INSTITUCION"
                        onChange={handleInputChange}
                        value={fields.inD_INSTITUCION}
                    />
                </Grid>
                <Grid item md={12} />
                <Grid item md={2} sm={12} xs={12}>
                    <TextField
                        fullWidth
                        label="Ref. Doc. Cargo"
                        name="reF_DOCCAR"
                        onChange={handleInputChange}
                        value={fields.reF_DOCCAR}
                    />
                </Grid>

                <Grid item md={12} />

                {/* Referencia Organización Interna */}
                <Grid item md={2} sm={12} xs={12}>
                    <TextField
                        name="coD_CONDICION"
                        fullWidth
                        size="small"
                        error={inputError.coD_CONDICION}
                        select
                        label="Condición Laboral *"
                        type="text"
                        onChange={handleInputChange}
                        value={fields.coD_CONDICION}
                    >
                        <MenuItem value="0" disabled>
                            Sin especificar
                        </MenuItem>
                        {condicion &&
                            condicion.map(condicion => (
                                <MenuItem value={condicion.coD_CONDICION}>
                                    {condicion.noM_CONDICION}
                                </MenuItem>
                            ))}
                    </TextField>
                </Grid>

                <Grid item md={12} />

                <Grid item md={2} sm={12} xs={12}>
                    <TextField
                        name="coD_UORG"
                        fullWidth
                        size="small"
                        error={inputError.coD_UORG}
                        select
                        label="Area Laboral"
                        type="text"
                        onChange={handleInputChange}
                        value={fields.coD_UORG}
                    >
                        <MenuItem value="0" disabled>
                            Sin especificar
                        </MenuItem>
                        {unidad &&
                            unidad.map(unidad => (
                                <MenuItem value={unidad.coD_UORG}>
                                    {unidad.deS_UORG}
                                </MenuItem>
                            ))}
                    </TextField>
                </Grid>

                <Grid item md={12} />

                <Grid item md={2} sm={12} xs={12}>
                    <TextField
                        name="coD_CAR"
                        fullWidth
                        size="small"
                        error={inputError.coD_CAR}
                        select
                        label="Cargo Laboral"
                        type="text"
                        onChange={handleInputChange}
                        value={fields.coD_CAR}
                    >
                        <MenuItem value="0" disabled>
                            Sin especificar
                        </MenuItem>
                        {positions &&
                            positions.map(position => (
                                <MenuItem value={position.coD_CAR}>
                                    {position.deS_CAR}
                                </MenuItem>
                            ))}
                    </TextField>
                </Grid>

                <Grid item md={12} />

                <Grid item md={2} sm={12} xs={12}>
                    <TextField
                        fullWidth
                        label="Descripción Función"
                        name="deS_FUNCION"
                        onChange={handleInputChange}
                        value={fields.deS_FUNCION}
                    />
                </Grid>
                <Grid item md={12} />
                <Grid item md={12} />

                <Grid item md={12} />
            </Grid>
            <Grid item md={12} />
            <Grid item md={4} sm={12} xs={12}>
                <Button variant="contained" onClick={() => {
                    handleFields();
                }}>
                    {id ? 'Actualizar' : 'Registrar'}
                </Button>
            </Grid>
        </>
    )
}

export default Experiencia;