// import { Grid, TextField, MenuItem, Button, Alert, AlertTitle } from "@mui/material";
import { getStateCivil, getDepartments, getProvincesByDepartment, getDistrictsByProvince } from "../../../service/common";
// import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import moment from 'moment';
import Swal from "sweetalert2";
// import { AddOrUpdatePerson, getPerson } from "../../service/person";
import { useParams } from "react-router-dom";
import { getTrabajadorEducacion } from "../../../service/employee/education";
import { Grid, Button, MenuItem, TextField } from "@mui/material";
import { useState, useEffect } from "react";
import { AddOrUpdateTrabajadorEducacion } from "../../../service/employee/education";
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';


const Educacion = () => {
    const { id } = useParams();
    const [fields, setFields] = useState({
        coD_TRAEDU: null,
        coD_TRABAJADOR: null,
        feC_INICIO: null,
        feC_TERMINO: null,
        noM_INSTITUCION: null,
        noM_ESPECIALIDAD: null,
        coD_GRDINSTRUC: null,
        coD_ESTUDIO: null,
        coD_ENTIDAD: null,
        nuM_COLEGIATURA: null,
        feC_TITULO: null,
        deS_CONTENIDO: null,
        feC_USUMOD: null,
        coD_USUMOD: null,
        feC_USUREG: null,
        coD_USUREG: null

    });
    const defaultErrors = {
        coD_TRAEDU: false,
        coD_TRABAJADOR: false,
        feC_INICIO: false,
        feC_TERMINO: false,
        noM_INSTITUCION: false,
        noM_ESPECIALIDAD: false,
        coD_GRDINSTRUC: false,
        coD_ESTUDIO: false,
        coD_ENTIDAD: false,
        nuM_COLEGIATURA: false,
        feC_TITULO: false,
        deS_CONTENIDO: false,
        feC_USUMOD: false,
        coD_USUMOD: false,
        feC_USUREG: false,
        coD_USUREG: false
      };
      const [inputError, setInputError] = useState(defaultErrors);
    const handleInputChange = event => {
        const { name, value } = event.target;
        setFields({ ...fields, [name]: value });
    }

    /*  */
    const loadData = async () => {

        if (id) {
            const response = await getTrabajadorEducacion(id)
            if (response.listado) {
                setFields(
                    {
                        coD_TRAEDU: response.listado[0]['coD_TRAEDU'],
                        coD_TRABAJADOR: response.listado[0]['coD_TRABAJADOR'],
                        feC_INICIO: response.listado[0]['feC_INICIO'],
                        feC_TERMINO: response.listado[0]['feC_TERMINO'],
                        noM_INSTITUCION: response.listado[0]['noM_INSTITUCION'],
                        noM_ESPECIALIDAD: response.listado[0]['noM_ESPECIALIDAD'],
                        coD_GRDINSTRUC: response.listado[0]['coD_GRDINSTRUC'],
                        coD_ESTUDIO: response.listado[0]['coD_ESTUDIO'],
                        coD_ENTIDAD: response.listado[0]['coD_ENTIDAD'],
                        nuM_COLEGIATURA: response.listado[0]['nuM_COLEGIATURA'],
                        feC_TITULO: response.listado[0]['feC_TITULO'],
                        deS_CONTENIDO: response.listado[0]['deS_CONTENIDO'],
                        feC_USUMOD: response.listado[0]['feC_USUMOD'],
                        coD_USUMOD: response.listado[0]['coD_USUMOD'],
                        feC_USUREG: response.listado[0]['feC_USUREG'],
                        coD_USUREG: response.listado[0]['coD_USUREG'],
                        //dTipoAcciones: response.listado[0]['dTipoAcciones'],


                    }
                );
            } else {
                return window.location = "/MaquetadoMiguel/Education/"
            }
        }


    };

    const validateFields = () => {

        const copyFields = { ...fields };

        delete copyFields.coD_TRAEDU;

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

        const validate = validateFields();

        if (!validate) return;

        const response = await AddOrUpdateTrabajadorEducacion(fields)

        if (response.code === 0) {

            await Swal.fire({
                icon: 'success',
                title: `${response.message}`,
                showConfirmButton: false,
                timer: 1500
            })

            return window.location = "/MaquetadoMiguel/Education"

        } else {
            return Swal.fire({
                icon: 'error',
                title: `${response.message}`,
                showConfirmButton: false,
                timer: 1500
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
                        <h2>Educacion</h2>
                    </Grid>
                    <Grid item md={2} sm={12} xs={12}>
                        <TextField
                            fullWidth
                            label="Cod. Trabajador Educación"
                            name="coD_TRAEDU"
                            onChange={handleInputChange}
                            value={fields.coD_TRAEDU}
                            error={inputError.coD_TRAEDU}
                        />
                    </Grid>
                    <Grid item md={12} />
                    <Grid item md={2} sm={12} xs={12}>
                        <TextField
                            fullWidth
                            label="Cod. Trabajador"
                            name="coD_TRABAJADOR"
                            onChange={handleInputChange}
                            value={fields.coD_TRABAJADOR}
                            error={inputError.coD_TRABAJADOR}
                        />
                    </Grid>
                    <Grid item md={12} />
                    <Grid item md={2} sm={12} xs={12}>
                        <TextField
                            fullWidth
                            label="Fecha Inicio"
                            name="feC_INICIO"
                            type="date"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            onChange={handleInputChange}
                            value={fields.feC_INICIO}
                            error={inputError.feC_INICIO}
                        />
                    </Grid>
                    <Grid item md={12} />
                    <Grid item md={2} sm={12} xs={12}>
                        <TextField
                            fullWidth
                            label="Fecha Termino"
                            name="feC_TERMINO"
                            type="date"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            onChange={handleInputChange}
                            value={fields.feC_TERMINO}
                            error={inputError.feC_TERMINO}
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
                            error={inputError.noM_INSTITUCION}
                        />
                    </Grid>
                    <Grid item md={12} />
                    <Grid item md={2} sm={12} xs={12}>
                        <TextField
                            fullWidth
                            label="Especialidad"
                            name="noM_ESPECIALIDAD"
                            onChange={handleInputChange}
                            value={fields.noM_ESPECIALIDAD}
                            error={inputError.noM_ESPECIALIDAD}
                        />
                    </Grid>
                    <Grid item md={12} />
                    {/*  */}
                    <Grid item md={2} sm={12} xs={12}>
                        <TextField
                            fullWidth
                            label="Cod. Grado Instruccion"
                            name="coD_GRDINSTRUC"
                            onChange={handleInputChange}
                            value={fields.coD_GRDINSTRUC}
                            error={inputError.coD_GRDINSTRUC}
                        />
                    </Grid>
                    <Grid item md={12} />
                    <Grid item md={2} sm={12} xs={12}>
                        <TextField
                            fullWidth
                            label="Cod. Estudio"
                            name="coD_ESTUDIO"
                            onChange={handleInputChange}
                            value={fields.coD_ESTUDIO}
                            error={inputError.coD_ESTUDIO}
                        />
                    </Grid>

                    <Grid item md={12} />

                    {/* Referencia Organización Interna */}
                    <Grid item md={2} sm={12} xs={12}>
                        <TextField
                            fullWidth
                            label="Cod. Entidad"
                            name="coD_ENTIDAD"
                            onChange={handleInputChange}
                            value={fields.coD_ENTIDAD}
                            error={inputError.coD_ENTIDAD}
                        />
                    </Grid>

                    <Grid item md={12} />

                    <Grid item md={2} sm={12} xs={12}>
                        <TextField
                            fullWidth
                            label="Nombre Colegiatura"
                            name="nuM_COLEGIATURA"
                            onChange={handleInputChange}
                            value={fields.nuM_COLEGIATURA}
                            error={inputError.nuM_COLEGIATURA}
                        />
                    </Grid>

                    <Grid item md={12} />

                    <Grid item md={2} sm={12} xs={12}>
                        <TextField
                            fullWidth
                            label="Fecha Titulo"
                            name="feC_TITULO"
                            type="date"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            onChange={handleInputChange}
                            value={fields.feC_TITULO}
                            error={inputError.feC_TITULO}
                        />
                    </Grid>

                    <Grid item md={12} />

                    <Grid item md={2} sm={12} xs={12}>
                        <TextField
                            fullWidth
                            label="Descripción Contenido"
                            name="deS_CONTENIDO"
                            onChange={handleInputChange}
                            value={fields.deS_CONTENIDO}
                            error={inputError.deS_CONTENIDO}
                        />
                    </Grid>

                    <Grid item md={12} />
                    <Grid item md={2} sm={12} xs={12}>
                        <TextField
                            fullWidth
                            label="Fecha Usuario Modificado"
                            name="feC_USUMOD"
                            type="date"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            onChange={handleInputChange}
                            value={fields.feC_USUMOD}
                            error={inputError.feC_USUMOD}
                        />
                    </Grid>
                    <Grid item md={2} sm={12} xs={12}>
                        <TextField
                            fullWidth
                            label="Cod. Usuario Modificado"
                            name="coD_USUMOD"
                            onChange={handleInputChange}
                            value={fields.coD_USUMOD}
                            error={inputError.coD_USUMOD}
                        />
                    </Grid>
                    <Grid item md={12} />
                    <Grid item md={2} sm={12} xs={12}>
                        <TextField
                            fullWidth
                            label="Fecha Usuario Registrado"
                            name="feC_USUREG"
                            type="date"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            onChange={handleInputChange}
                            value={fields.feC_USUREG}
                            error={inputError.feC_USUREG}
                        />
                    </Grid>
                    <Grid item md={2} sm={12} xs={12}>
                        <TextField
                            fullWidth
                            label="Cod. Usuario Registrado"
                            name="coD_USUREG"
                            onChange={handleInputChange}
                            value={fields.coD_USUREG}
                            error={inputError.coD_USUREG}
                        />
                    </Grid>
                    <Grid item md={4} sm={12} xs={12}>
                    <Button variant="contained" onClick={() => {
                        handleFields();}}>
                        {id ? 'Actualizar': 'Registrar'}
                    </Button>
                    </Grid>
                </Grid>
            </>
        ) 
    }

export default Educacion;