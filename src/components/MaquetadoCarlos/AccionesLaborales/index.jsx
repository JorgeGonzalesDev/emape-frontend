// import { Grid, TextField, MenuItem, Button, Alert, AlertTitle } from "@mui/material";
import { getStateCivil, getDepartments, getProvincesByDepartment, getDistrictsByProvince } from "../../../service/common";
// import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import moment from 'moment';
import Swal from "sweetalert2";
// import { AddOrUpdatePerson, getPerson } from "../../service/person";
import { useParams } from "react-router-dom";
import { getTrabajadorAcciones } from "../../../service/employee/laboraction";
import { Grid, Button, MenuItem, TextField } from "@mui/material";
import { useState, useEffect } from "react";
import { AddOrUpdateTrabajadorAcciones } from "../../../service/employee/laboraction";
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';


const AccionesLaborales = () => {
    const { id } = useParams();

    const [fields, setFields] = useState({
        coD_TRAACC: 0,
        coD_TRABAJADOR: 0,
        coD_ACCION: 0,
        feC_ACCION: "",
        nuM_REFDOC: "",
        noM_INSTITUCION: "",
        deS_REFERENCIA: "",
        feC_INICIO: "",
        feC_TERMINO: "",
        feC_USUMOD: "",
        coD_USUMOD: 0,
        feC_USUREG: "",
        coD_USUREG: 0,
        feC_ACCION_TMP: "",
        /* dTipoAcciones: {
        noM_ACCION: ""
      } */
    });
    const defaultErrors = {
        coD_TRAACC: false,
        coD_TRABAJADOR: false,
        coD_ACCION: false,
        feC_ACCION: false,
        nuM_REFDOC: false,
        noM_INSTITUCION: false,
        deS_REFERENCIA: false,
        feC_INICIO: false,
        feC_TERMINO: false,
        feC_USUMOD: false,
        coD_USUMOD: false,
        feC_USUREG: false,
        coD_USUREG: false,
        feC_ACCION_TMP: false,
        //dTipoAcciones: {
        //noM_ACCION: false
        //}
      };
      const [inputError, setInputError] = useState(defaultErrors);

    const handleInputChange = event => {
        const { name, value } = event.target;
        setFields({ ...fields, [name]: value });
    }

    const loadData = async () => {

        if (id) {
            const response = await getTrabajadorAcciones(id)
            if (response.listado) {
                setFields(
                    {
                        coD_TRAACC: response.listado[0]['coD_TRAACC'],
                        coD_TRABAJADOR: response.listado[0]['coD_TRABAJADOR'],
                        coD_ACCION: response.listado[0]['coD_ACCION'],
                        feC_ACCION: response.listado[0]['feC_ACCION'],
                        nuM_REFDOC: response.listado[0]['nuM_REFDOC'],
                        noM_INSTITUCION: response.listado[0]['noM_INSTITUCION'],
                        deS_REFERENCIA: response.listado[0]['deS_REFERENCIA'],
                        feC_INICIO: response.listado[0]['feC_INICIO'],
                        feC_TERMINO: response.listado[0]['feC_TERMINO'],
                        feC_USUMOD: response.listado[0]['feC_USUMOD'],
                        coD_USUMOD: response.listado[0]['coD_USUMOD'],
                        feC_USUREG: response.listado[0]['feC_USUREG'],
                        coD_USUREG: response.listado[0]['coD_USUREG'],
                        feC_ACCION_TMP: response.listado[0]['feC_ACCION_TMP'],
                        //dTipoAcciones: response.listado[0]['dTipoAcciones'],


                    }
                );
            } else {
                return window.location = "/maestro/generales/entidadExterna"
            }
        }


    };
    const handleInputChangeDate = (value, name) => {
        setFields({
          ...fields,
          [name]: moment(new Date(value)).format(),
        });
      };

    const validateFields = () => {

        const copyFields = { ...fields };
    
        delete copyFields.coD_TRAACC;
        delete copyFields.coD_USUMOD;
        delete copyFields.coD_USUREG;
    
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

    /* const saveTrabajadorAcciones = async () => {

        const validate = validateFields();
    
        if (!validate) return;
    
    
        const response = await AddOrUpdateTrabajadorAcciones(fields);
    
        if (response.code === 0) {
          await Swal.fire({
            icon: "success",
            title: "Datos ingresados con exito",
            showConfirmButton: false,
            timer: 1500,
          });
    
          return (window.location = "/MaquetadoCarlos/LaborAction");
    
        } else {
          return Swal.fire({
            icon: "error",
            title: "Ha ocurrido un error al ingresar los datos",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      }; */
    /*  */
    const handleFields = async () => {

        const validate = validateFields();
        console.log(fields)

        if (!validate) return;

        const response = await AddOrUpdateTrabajadorAcciones(fields)

        if (response.code === 0) {

            await Swal.fire({
                icon: 'success',
                title: `${response.message}`,
                showConfirmButton: false,
                timer: 1500
            })

            return window.location = "/MaquetadoCarlos/LaborActions"

        } else {
            return Swal.fire({
                icon: 'error',
                title: `${response.message}`,
                showConfirmButton: false,
                timer: 1500
            })
        }

    }
    /*  */
    useEffect(() => {
        loadData();
      }, []);

    return(
        <>
            <Grid container spacing={2}>
                <Grid item md={12} sm={12}>
                    <h2>Acciones Laborales</h2>
                </Grid>
                <Grid item md={3} sm={12} xs={12}>
                    <TextField
                        fullWidth
                        label="Cod. Trabajador Act."
                        name="coD_TRAACC"
                        type="number"
                        size="small"
                        onChange={handleInputChange}
                        value={fields.coD_TRAACC}
                        error={inputError.coD_TRAACC}
                    />
                </Grid>
                <Grid item md={5} sm={12} xs={12}>
                    <TextField
                        fullWidth
                        label="Cod. Trabajador"
                        name="coD_TRABAJADOR"
                        type="number"
                        size="small"
                        onChange={handleInputChange}
                        value={fields.coD_TRABAJADOR}
                        error={inputError.coD_TRABAJADOR}
                    />
                </Grid>
                <Grid item md={4} sm={12} xs={12}>
                    <TextField
                        fullWidth
                        label="Cod. Acción"
                        name="coD_ACCION"
                        size="small"
                        type="number"
                        onChange={handleInputChange}
                        value={fields.coD_ACCION}
                        error={inputError.coD_ACCION}
                    />
                </Grid>
                <Grid item md={12} />
                {/* <Grid item md={6} sm={12} xs={12}>
                    <TextField
                        fullWidth
                        label="Fecha Acción"
                        name="feC_ACCION"
                        type="date"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        onChange={handleInputChange}
                        value={fields.feC_ACCION}
                        error={inputError.feC_ACCION}
                    />
                </Grid> */}
                {/*  */}
                <Grid item md={3} sm={12} xs={12}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DesktopDatePicker
                    label="Fecha Acción"
                    inputFormat="dd-MM-yyyy"
                    value={moment(fields.feC_ACCION).format()}
                    onChange={(e) => handleInputChangeDate(e, "feC_ACCION")}
                    renderInput={(params) => <TextField size="small" fullWidth {...params} />}
                    />
                </LocalizationProvider>
                </Grid>
                {/*  */}
                <Grid item md={6} sm={12} xs={12}>
                    <TextField
                        fullWidth
                        label="N° Referencia Doc."
                        name="nuM_REFDOC"
                        size="small"
                        onChange={handleInputChange}
                        value={fields.nuM_REFDOC}
                        error={inputError.nuM_REFDOC}
                        
                    />
                </Grid>
                <Grid item md={12} />
                <Grid item md={6} sm={12} xs={12}>
                    <TextField
                        fullWidth
                        multiline
                        label="Institución"
                        name="noM_INSTITUCION"
                        size="small"
                        onChange={handleInputChange}
                        value={fields.noM_INSTITUCION}
                        error={inputError.noM_INSTITUCION}
                    />
                </Grid>
                <Grid item md={12} />
                <Grid item md={12} />
                <Grid item md={6} sm={12} xs={12}>
                    <TextField
                        fullWidth
                        multiline
                        rows={3}
                        label="Referencia"
                        name="deS_REFERENCIA"
                        size="small"
                        onChange={handleInputChange}
                        value={fields.deS_REFERENCIA}
                        error={inputError.deS_REFERENCIA}
                    />
                </Grid>
                <Grid item md={12} />
                <Grid item md={12} sm={12} color="red">
                    <h2>Cargos Internos / Externos</h2>
                </Grid>
                <Grid item md={12} />
                <Grid item md={6} sm={12} xs={12}>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DesktopDatePicker
                    label="Fecha Inicio"
                    inputFormat="dd-MM-yyyy"
                    value={moment(fields.feC_INICIO).format()}
                    onChange={(e) => handleInputChangeDate(e, "feC_INICIO")}
                    renderInput={(params) => <TextField size="small" fullWidth {...params} />}
                    />
                </LocalizationProvider>
                </Grid>
                
                <Grid item md={6} sm={12} xs={12}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DesktopDatePicker
                    label="Fecha Termino"
                    inputFormat="dd-MM-yyyy"
                    value={moment(fields.feC_TERMINO).format()}
                    onChange={(e) => handleInputChangeDate(e, "feC_TERMINO")}
                    renderInput={(params) => <TextField size="small" fullWidth {...params} />}
                    />
                </LocalizationProvider>
                </Grid>
                <Grid item md={12} />
                <Grid item md={6} sm={12} xs={12}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DesktopDatePicker
                    label="Fecha Modificado"
                    inputFormat="dd-MM-yyyy"
                    value={moment(fields.feC_USUMOD).format()}
                    onChange={(e) => handleInputChangeDate(e, "feC_USUMOD")}
                    renderInput={(params) => <TextField size="small" fullWidth {...params} />}
                    />
                </LocalizationProvider>
                </Grid>
                {/*  */}
                
                {/*  */}
                <Grid item md={6} sm={12} xs={12}>
                    <TextField
                        fullWidth
                        label="Cod. Modificado"
                        name="coD_USUMOD"
                        size="small"
                        onChange={handleInputChange}
                        value={fields.coD_USUMOD}
                        error={inputError.coD_USUMOD}
                    />
                </Grid>
                <Grid item md={12} />
                <Grid item md={6} sm={12} xs={12}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DesktopDatePicker
                    label="Fecha Registro"
                    inputFormat="dd-MM-yyyy"
                    error={inputError.feC_USUREG}
                    value={moment(fields.feC_USUREG).format()}
                    onChange={(e) => handleInputChangeDate(e, "feC_USUREG")}
                    renderInput={(params) => <TextField size="small" fullWidth {...params} />}
                    />
                </LocalizationProvider>
                </Grid>
                
                <Grid item md={6} sm={12} xs={12}>
                    <TextField
                        fullWidth
                        label="Cod. Registro"
                        name="coD_USUREG"
                        size="small"
                        onChange={handleInputChange}
                        value={fields.coD_USUREG}
                        error={inputError.coD_USUREG}
                    />
                </Grid>
                <Grid item md={6} sm={12} xs={12}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DesktopDatePicker
                    label="Fecha Acción"
                    inputFormat="dd-MM-yyyy"
                    error={inputError.feC_ACCION_TMP}
                    value={moment(fields.feC_ACCION_TMP).format()}
                    onChange={(e) => handleInputChangeDate(e, "feC_ACCION_TMP")}
                    renderInput={(params) => <TextField size="small" fullWidth {...params} />}
                    />
                </LocalizationProvider>
                    
                </Grid>{/* feC_ACCION_TMP */}
                <Grid item md={12} />
                {/* <Grid item md={6} sm={12} xs={12}>
                    <TextField
                        fullWidth
                        label="Tipo Acciones"
                        name="dTipoAcciones"
                        size="small"
                        onChange={handleInputChange}
                        value={fields.dTipoAcciones}
                        error={inputError.dTipoAcciones}
                    />
                </Grid> */}{/* feC_ACCION_TMP */}
                <Grid item md={12} />
                <Grid item md={4} sm={12} xs={12}>
                    {/* <Button onClick={saveTrabajadorAcciones} variant="contained"></Button> */}
                    <Button variant="contained" onClick={() => {
                        handleFields(); 
                    }}>
                        {id ? "Guardar": "Registrar"}
                    </Button>
                </Grid>
            </Grid>
        </>
    )
}


export default AccionesLaborales;