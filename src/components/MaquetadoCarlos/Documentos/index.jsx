// import { Grid, TextField, MenuItem, Button, Alert, AlertTitle } from "@mui/material";
import { getStateCivil, getDepartments, getProvincesByDepartment, getDistrictsByProvince } from "../../../service/common";
// import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import moment from 'moment';
import Swal from "sweetalert2";
// import { AddOrUpdatePerson, getPerson } from "../../service/person";
import { useParams } from "react-router-dom";
import { getTrabajadorDocumento } from "../../../service/employee/labordocument";
import { Grid, Button, MenuItem, TextField } from "@mui/material";
import { useState, useEffect } from "react";
import { AddOrUpdateTrabajadorDocumento } from "../../../service/employee/labordocument";
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';

const Documentos = () => {
    const { id } = useParams();

    const [fields, setFields] = useState({
        coD_TRADOC: 0,
        coD_TRABAJADOR: 0,
        inD_DOCTRAB: "",
        coD_DOC: 0,
        coD_PERS: 0,
        coD_TIPPARIENTE: 0,
        obS_DOCUMENTO: "",
        coD_USUREG: 0,
        coD_USUMOD: 0,
        /* dDocumento: {
            deS_DOC: "",
            abR_DOC: ""
        } */
    });
    const defaultErrors = {
        coD_TRADOC: false,
        coD_TRABAJADOR: false,
        inD_DOCTRAB: false,
        coD_DOC: false,
        coD_PERS: false,
        coD_TIPPARIENTE: false,
        obS_DOCUMENTO: false,
        coD_USUREG: false,
        coD_USUMOD: false,
        /* dDocumento: {
        deS_DOC: false,
        abR_DOC: false
      } */
      };
      const [inputError, setInputError] = useState(defaultErrors);
      

    const handleInputChange = event => {
        const { name, value } = event.target;
        setFields({ ...fields, [name]: value });
    }

    const loadData = async () => {

        if (id) {
            console.log(id);
            const response = await getTrabajadorDocumento(id)
            if (response.listado) {
                setFields(
                    {
                        coD_TRADOC: response.listado[0]['coD_TRADOC'],
                        coD_TRABAJADOR: response.listado[0]['coD_TRABAJADOR'],
                        inD_DOCTRAB: response.listado[0]['inD_DOCTRAB'],
                        coD_DOC: response.listado[0]['coD_DOC'],
                        coD_PERS: response.listado[0]['coD_PERS'],
                        coD_TIPPARIENTE: response.listado[0]['coD_TIPPARIENTE'],
                        obS_DOCUMENTO: response.listado[0]['obS_DOCUMENTO'],
                        coD_USUREG: response.listado[0]['coD_USUREG'],
                        coD_USUMOD: response.listado[0]['coD_USUMOD'],
                        //dDocumento: response.listado[0]['dDocumento'],
                        //dTipoAcciones: response.listado[0]['dTipoAcciones'],


                    }
                );
            } else {
                return window.location = "/MaquetadoCarlos/Documentos"
            }
        }


    };

    const validateFields = () => {

        const copyFields = { ...fields };
    
        delete copyFields.coD_TRADOC;
        /* delete copyFields.coD_TIPPARIENTE;
         delete copyFields.coD_USUREG;
        delete copyFields.coD_USUMOD;*/
        
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

    const saveDocumento = async () => {
        const validate = validateFields()
        if (!validate) return
    
        const response = await AddOrUpdateTrabajadorDocumento(fields);
    
        if (response.code === 0) {
          await Swal.fire({
            icon: "success",
            title: "Datos ingresados con exito",
            showConfirmButton: false,
            timer: 1500,
          });
    
          return (window.location = "/MaquetadoCarlos/Documentos");
    
        } else {
          return Swal.fire({
            icon: "error",
            title: "Ha ocurrido un error al ingresar los datos",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      };
    
    /* const sendData = () => {

        const validate = validateFields();
        if (!validate) {
            alert('Por favor, complete todos los campos');
            return;
        }else{
            alert('Datos enviados correctamente');
        }

        console.log(fields);

    }; */
    useEffect(() => {
        loadData();
      }, []);

    return(
        <>
            <Grid container spacing={2}>
                <Grid item md={12} sm={12}>
                    <h2>Documentos</h2>
                </Grid>
                <Grid item md={3} sm={12} xs={12}>
                    <TextField
                        fullWidth
                        label="Cod. Trabajador Doc."
                        name="coD_TRADOC"
                        type='number'
                        onChange={handleInputChange}
                        value={fields.coD_TRADOC}
                        disabled
                    />
                </Grid>
                <Grid item md={3} sm={12} xs={12}>
                    <TextField
                        fullWidth  
                        label="Cod. Trabajador"
                        name="coD_TRABAJADOR"
                        type="number"
                        onChange={handleInputChange}
                        value={fields.coD_TRABAJADOR}
                    />
                </Grid>
                <Grid item md={3} sm={12} xs={12}>
                    <TextField
                        fullWidth
                        label="Ind. Documento Trabajador"
                        name="inD_DOCTRAB"
                        onChange={handleInputChange}
                        value={fields.inD_DOCTRAB}
                    >
                        <MenuItem value="demerito">
                            PERSONAL
                        </MenuItem>
                    </TextField>
                </Grid>
                <Grid item md={6} sm={12} xs={12}>
                    <TextField
                        fullWidth
                        label="Cod. Documento"
                        name="coD_DOC"
                        type='number'
                        onChange={handleInputChange}
                        value={fields.coD_DOC}
                    >
                        <MenuItem value="demerito">
                            DOCUMENTO
                        </MenuItem>
                    </TextField>
                </Grid>
                <Grid item md={12} />
                <Grid item md={6} sm={12} xs={12}>
                    <TextField
                        fullWidth
                        label="Cod. Persona"
                        name="coD_PERS"
                        type='number'
                        onChange={handleInputChange}
                        value={fields.coD_PERS}
                    >
                        <MenuItem value="demerito">
                            FAMILIA
                        </MenuItem>
                    </TextField>
                </Grid>
                <Grid item md={6} sm={12} xs={12}>
                    <TextField
                        fullWidth
                        label="Cod. Tip. Pariente"
                        name="coD_TIPPARIENTE"
                        type='number'
                        onChange={handleInputChange}
                        value={fields.coD_TIPPARIENTE}
                    >
                    </TextField>
                </Grid>
                <Grid item md={6} sm={12} xs={12}>
                    <TextField
                        fullWidth
                        label="Obs. Documento"
                        name="obS_DOCUMENTO"
                        type="text"
                        onChange={handleInputChange}
                        value={fields.obS_DOCUMENTO}
                    >
                    </TextField>
                </Grid>
                <Grid item md={6} sm={12} xs={12}>
                    <TextField
                        fullWidth
                        label="Cod. Usu. Registrador"
                        name="coD_USUREG"
                        type='number'
                        onChange={handleInputChange}
                        value={fields.coD_USUREG}
                    >
                    </TextField>
                </Grid>
                <Grid item md={6} sm={12} xs={12}>
                    <TextField
                        fullWidth
                        label="Cod. Usu. Modificado"
                        name="coD_USUMOD"
                        type='number'
                        onChange={handleInputChange}
                        value={fields.coD_USUMOD}
                    >
                    </TextField>
                </Grid>
            
                <Grid item md={12} />
                <Grid item md={4} sm={12} xs={12}>
                <Button onClick={saveDocumento} variant="contained" >
                    Guardar
                </Button>
                </Grid>
            </Grid>
        </>
    )
}


export default Documentos;