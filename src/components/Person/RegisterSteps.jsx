import { Grid, TextField, MenuItem, Button, Alert, AlertTitle } from "@mui/material";
import { useState, useEffect } from "react";
import { getStateCivil, getDepartments } from "../../service/common";
import { getLevelEducate } from "../../service/nivelEducate";
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import moment from 'moment';
import { AddOrUpdatePerson, getPerson } from "../../service/person";
import { useParams } from "react-router-dom";

const RegisterSteps = () => {

    const [fields, setFields] = useState({
        'coD_PERS': '',
        //'date_register': moment.utc(new Date()).format('YYYY/MM/DD'),
        //'state': '',
        //'type_document': '',
        'nuM_DOC': '',
        'nuM_RUC': '',
        'deS_APELLP': '',
        'deS_APELLM': '',
        'noM_PERS': '',
        //'full_noM_PERS': '',
        'inD_SEXO': '',
        'feC_NACIM': moment.utc(new Date()).format('YYYY-MM-DD'),
        'coD_NACDPT': '',
        'coD_NACPRV': '',
        'coD_NACDIS': '',
        //'age': '',
        'deS_DIRACT': '',
        //'locate': '',
        'deS_DIRALTERNA': '',
        'coD_DIRDPT': '',
        'coD_DIRPRV': '',
        'coD_DIRDIS': '',
        'coD_ESTCIVIL': '',
        'coD_GRDINSTRUC': '',
        'coD_PROFES': '',
        'nuM_TLF': '',
        'nuM_CELULAR': '',
        'txT_EMAIL': '',
        'txT_OBSERV': '',
    });


    const [stateCivil, setStateCivil] = useState([]);
    const [levelEducate, setLevelEducate] = useState([]);
    const [departments, setDepartments] = useState([]);
    const { id } = useParams();

    const loadData = async () => {

        if (id) {
            const response = await getPerson(id)
            if (response.listado) {
                setFields(response.listado[0]);
            } else {
                window.location = "/maestro/persona"
            }
        }

        const responseStateCivil = await getStateCivil();
        const responseLevelEducate = await getLevelEducate();
        const responseDepartments = await getDepartments();
        setStateCivil(responseStateCivil.listado);
        setLevelEducate(responseLevelEducate.listado);
        setDepartments(responseDepartments.listado);

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
        //'date_register': false,
        // 'state': false,
        // 'type_document': false,
        'nuM_DOC': false,
        'nuM_RUC': false,
        'deS_APELLP': false,
        'deS_APELLM': false,
        'noM_PERS': false,
        'inD_SEXO': false,
        'feC_NACIM': false,
        'coD_NACDPT': false,
        'coD_NACPRV': false,
        'coD_NACDIS': false,
        // 'age': false,
        'deS_DIRACT': false,
        'deS_DIRALTERNA': false,
        // 'locate': false,
        'coD_DIRDPT': false,
        'coD_DIRPRV': false,
        'coD_DIRDIS': false,
        'coD_ESTCIVIL': false,
        'coD_GRDINSTRUC': false,
        'coD_PROFES': false,
        'nuM_TLF': false,
        'nuM_CELULAR': false,
        'txT_EMAIL': false,
        'txT_OBSERV': false,
    };

    const [inputError, setInputError] = useState(defaultErrors);

    const [errors, setErrors] = useState(false);

    const [step, setStep] = useState(0);

    const validateFields = () => {

        const copyFields = { ...fields };

        delete copyFields.coD_PERS;
        delete copyFields.coD_USUREG;
        delete copyFields.coD_USUMOD;

        if (step === 0) {
            delete copyFields.full_noM_PERS;
            delete copyFields.coD_NACPRV;
            delete copyFields.coD_NACDIS;
            delete copyFields.coD_NACDPT;
            delete copyFields.feC_NACIM;
            delete copyFields.age;
            delete copyFields.deS_DIRACT;
            delete copyFields.deS_DIRALTERNA;
            delete copyFields.coD_DIRDPT;
            delete copyFields.coD_DIRPRV;
            delete copyFields.coD_DIRDIS;
            delete copyFields.locate;
            delete copyFields.coD_ESTCIVIL;
            delete copyFields.coD_GRDINSTRUC;
            delete copyFields.coD_PROFES;
            delete copyFields.nuM_TLF;
            delete copyFields.nuM_CELULAR;
            delete copyFields.txT_EMAIL;
            delete copyFields.txT_OBSERV;
        }

        if (step === 1) {
            delete copyFields.deS_DIRACT;
            delete copyFields.deS_DIRALTERNA;
            delete copyFields.coD_DIRDPT;
            delete copyFields.coD_DIRPRV;
            delete copyFields.coD_DIRDIS;
            delete copyFields.locate;
            delete copyFields.coD_ESTCIVIL;
            delete copyFields.coD_GRDINSTRUC;
            delete copyFields.coD_PROFES;
            delete copyFields.nuM_TLF;
            delete copyFields.nuM_CELULAR;
            delete copyFields.txT_EMAIL;
            delete copyFields.txT_OBSERV;
        }

        if (step === 2) {
            delete copyFields.coD_ESTCIVIL;
            delete copyFields.coD_GRDINSTRUC;
            delete copyFields.coD_PROFES;
            delete copyFields.nuM_TLF;
            delete copyFields.nuM_CELULAR;
            delete copyFields.txT_EMAIL;
            delete copyFields.txT_OBSERV;
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

    const signUpPerson = async () => {

        await AddOrUpdatePerson(fields);

        window.location = "/maestro/persona"

        return alert('Enviado satisfactoriamente');

    }

    const nextStep = async () => {

        // if (step === 0) {
        //     fields.full_noM_PERS = `${fields.deS_APELLP} ${fields.deS_APELLM} ${fields.noM_PERS}`
        // };

        const validate = validateFields();

        if (!validate) return;

        console.log(fields);

        if (step === 3) {

            if (!id) {
                fields.coD_PERS = 0;
            }

            signUpPerson();

        }

        setStep(step + 1)

    }

    const backStep = () => setStep(step - 1);

    const generalRender = () => {
        if (step === 0) {
            return (
                <>
                    <Grid item md={12} sm={12}>
                        <h2>Datos Generales</h2>
                    </Grid>
                    {id && <Grid item md={4} sm={12} xs={12}>
                        <TextField
                            fullWidth
                            label="Código"
                            name="coD_PERS"
                            value={fields.coD_PERS}
                            inputProps={
                                { readOnly: true, }
                            }
                        />
                    </Grid>}
                    {/* <Grid item md={2} sm={12} xs={12}>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DesktopDatePicker
                                label="Fecha de registro"
                                inputFormat="dd/MM/yyyy"
                                value={fields.date_register}
                                onChange={e =>
                                    handleInputChangeDate(e, 'date_register')}
                                renderInput={(params) => <TextField fullWidth {...params} />}
                            />
                        </LocalizationProvider>
                    </Grid> */}
                    {/* <Grid item md={2} sm={12} xs={12}>
                        <TextField
                            name="state"
                            fullWidth
                            select
                            label="Estado"
                            onChange={handleInputChange}
                            error={inputError.state}
                            value={fields.state}
                        >
                            <MenuItem value="A" >
                                Activo
                            </MenuItem>
                            <MenuItem value="I">
                                Inactivo
                            </MenuItem>
                        </TextField>
                    </Grid> */}
                    <Grid item md={12} />
                    {/* <Grid item md={2} sm={12} xs={12}>
                        <TextField
                            name="type_document"
                            fullWidth
                            select
                            label="Tipo Documento"
                            onChange={handleInputChange}
                            error={inputError.type_document}
                            value={fields.type_document}
                        >
                            <MenuItem value="dni"  >
                                DNI
                            </MenuItem>
                            <MenuItem value="ext" >
                                Extranjero
                            </MenuItem>
                        </TextField>
                    </Grid> */}
                    <Grid item md={3} sm={12} xs={12}>
                        <TextField
                            name="nuM_DOC"
                            fullWidth
                            label="Número de doc."
                            type='number'
                            error={inputError.nuM_DOC}
                            onChange={handleInputChange}
                            value={fields.nuM_DOC}
                        />
                    </Grid>
                    <Grid item md={3} sm={12} xs={12}>
                        <TextField
                            name="nuM_RUC"
                            fullWidth
                            label="N° RUC"
                            type='number'
                            error={inputError.nuM_RUC}
                            onChange={handleInputChange}
                            value={fields.nuM_RUC}
                        />
                    </Grid>
                    <Grid item md={12} />
                    <Grid
                        item md={3} sm={12} xs={12}>
                        <TextField
                            name="deS_APELLP"
                            fullWidth
                            label="Apellido Paterno"
                            type='text'
                            error={inputError.deS_APELLP}
                            onChange={handleInputChange}
                            value={fields.deS_APELLP}
                        />
                    </Grid>
                    <Grid item md={3} sm={12} xs={12}>
                        <TextField
                            name="deS_APELLM"
                            fullWidth
                            label="Apellido Materno"
                            type='text'
                            error={inputError.deS_APELLM}
                            onChange={handleInputChange}
                            value={fields.deS_APELLM}
                        />
                    </Grid>
                    <Grid item md={2} sm={12} xs={12}>
                        <TextField
                            name="noM_PERS"
                            fullWidth
                            label="Nombres"
                            type='text'
                            error={inputError.noM_PERS}
                            onChange={handleInputChange}
                            value={fields.noM_PERS}
                        />
                    </Grid>
                    <Grid item md={12} />
                    {/* <Grid
                        item md={4} xs={12}>
                        <TextField
                            name="full_noM_PERS"
                            fullWidth
                            label="Apellido y Nombre"
                            type='text'
                            inputProps={
                                { readOnly: true, }
                            }
                            value={`${fields.deS_APELLP} ${fields.deS_APELLM} ${fields.noM_PERS}`}
                        />
                    </Grid> */}
                    <Grid
                        item md={2} xs={12}>
                        <TextField
                            name="inD_SEXO"
                            fullWidth
                            select
                            label="Sexo"
                            error={inputError.inD_SEXO}
                            onChange={handleInputChange}
                            value={fields.inD_SEXO}
                        >
                            <MenuItem value="" disabled>
                                Sin especificar
                            </MenuItem>
                            <MenuItem value="m" >
                                Masculino
                            </MenuItem>
                            <MenuItem value="f">
                                Femenino
                            </MenuItem>
                        </TextField>
                    </Grid>
                    <Grid item md={12} xs={12} />
                    <Grid item md={12} xs={12}>
                        <Button onClick={nextStep} variant="contained">Siguiente</Button>
                    </Grid>
                </>
            );
        }
        if (step === 1) {
            return (
                <>
                    <Grid item md={12} sm={12}>
                        <h2>Datos de Nacimiento</h2>
                    </Grid>
                    <Grid item md={3} sm={12} xs={12}>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DesktopDatePicker
                                label="Fecha de nacimiento"
                                inputFormat="dd/MM/yyyy"
                                value={fields.feC_NACIM}
                                onChange={e =>
                                    handleInputChangeDate(e, 'feC_NACIM')}
                                renderInput={(params) => <TextField fullWidth {...params} />}
                            />
                        </LocalizationProvider>
                    </Grid>
                    {/* <Grid item md={2} sm={12} xs={12}>
                        <TextField
                            name="age"
                            fullWidth
                            label="Edad"
                            type='number'
                            onChange={handleInputChange}
                            value={fields.age}
                            error={inputError.age}
                        />
                    </Grid> */}
                    <Grid item md={12} />
                    <Grid item md={2} xs={12}>
                        <TextField
                            name="coD_NACDPT"
                            fullWidth
                            select
                            label="Departamento"
                            onChange={handleInputChange}
                            value={fields.coD_NACDPT}
                            error={inputError.coD_NACDPT}
                        >
                            <MenuItem value="0" disabled>
                                Sin especificar
                            </MenuItem>
                            {departments &&
                                departments.map(department => (
                                    <MenuItem value={department.coD_DPTO}>
                                        {department.deS_DPTO}
                                    </MenuItem>
                                ))}
                        </TextField>
                    </Grid>
                    <Grid
                        item md={2} xs={12}>
                        <TextField
                            fullWidth
                            name="coD_NACPRV"
                            select
                            label="Provincia"
                            onChange={handleInputChange}
                            value={fields.coD_NACPRV}
                            error={inputError.coD_NACPRV}
                        >
                            <MenuItem value="0" disabled>
                                Sin especificar
                            </MenuItem>
                            <MenuItem value="1">
                                Lima
                            </MenuItem>
                        </TextField>
                    </Grid>
                    <Grid
                        item md={2} xs={12}>
                        <TextField
                            fullWidth
                            name="coD_NACDIS"
                            select
                            label="Distrito"
                            onChange={handleInputChange}
                            value={fields.coD_NACDIS}
                            error={inputError.coD_NACDIS}
                        >
                            <MenuItem value="0" disabled>
                                Sin especificar
                            </MenuItem>
                            <MenuItem value="1">
                                El Agustino
                            </MenuItem>
                        </TextField>
                    </Grid>
                    <Grid item md={12} xs={12} />
                    <Grid item md={12} xs={12}>
                        <Button onClick={backStep} variant="contained">Retroceder</Button>
                        <Button style={{ marginLeft: '30px' }} onClick={nextStep} variant="contained">Siguiente</Button>
                    </Grid>
                </>
            );
        }
        if (step === 2) {
            return (
                <>
                    <Grid item md={12} sm={12}>
                        <h2>Datos de Dirección</h2>
                    </Grid>
                    <Grid item md={4} sm={12} xs={12}>
                        <TextField
                            fullWidth
                            label="Dirección Principal"
                            type="text"
                            name="deS_DIRACT"
                            onChange={handleInputChange}
                            value={fields.deS_DIRACT}
                            error={inputError.deS_DIRACT}
                        />
                    </Grid>
                    {/* <Grid item md={2} sm={12} xs={12}>
                        <TextField
                            fullWidth
                            name="locate"
                            select
                            label="Localidad"
                            onChange={handleInputChange}
                            value={fields.locate}
                            error={inputError.locate}
                        >
                            <MenuItem value="1">
                                Lima
                            </MenuItem>
                        </TextField>
                    </Grid> */}
                    <Grid item md={12} />
                    <Grid item md={4} sm={12} xs={12}>
                        <TextField
                            fullWidth
                            label="Dirección Alterna"
                            type="text"
                            name="deS_DIRALTERNA"
                            onChange={handleInputChange}
                            value={fields.deS_DIRALTERNA}
                            error={inputError.deS_DIRALTERNA}
                        />
                    </Grid>
                    <Grid item md={12} xs={12} />
                    <Grid item md={2} xs={12}>
                        <TextField
                            name="coD_DIRDPT"
                            fullWidth
                            select
                            label="Departamento"
                            onChange={handleInputChange}
                            value={fields.coD_DIRDPT}
                            error={inputError.coD_DIRDPT}
                        >
                            <MenuItem value="0" disabled>
                                Sin especificar
                            </MenuItem>
                            {departments &&
                                departments.map(department => (
                                    <MenuItem value={department.coD_DPTO}>
                                        {department.deS_DPTO}
                                    </MenuItem>
                                ))}
                        </TextField>
                    </Grid>
                    <Grid
                        item md={2} xs={12}>
                        <TextField
                            fullWidth
                            name="coD_DIRPRV"
                            select
                            label="Provincia"
                            onChange={handleInputChange}
                            value={fields.coD_DIRPRV}
                            error={inputError.coD_DIRPRV}
                        >
                            <MenuItem value="0" disabled>
                                Sin especificar
                            </MenuItem>
                            <MenuItem value="1">
                                Lima
                            </MenuItem>
                        </TextField>
                    </Grid>
                    <Grid
                        item md={2} xs={12}>
                        <TextField
                            fullWidth
                            name="coD_DIRDIS"
                            select
                            label="Distrito"
                            onChange={handleInputChange}
                            value={fields.coD_DIRDIS}
                            error={inputError.coD_DIRDIS}
                        >
                            <MenuItem value="0" disabled>
                                Sin especificar
                            </MenuItem>
                            <MenuItem value="1">
                                El Agustino
                            </MenuItem>
                        </TextField>
                    </Grid>
                    <Grid item md={12} xs={12} />
                    <Grid item md={12} xs={12}>
                        <Button onClick={backStep} variant="contained">Retroceder</Button>
                        <Button style={{ marginLeft: '30px' }} onClick={nextStep} variant="contained">Siguiente</Button>
                    </Grid>
                </>
            )
        }
        if (step === 3) {
            return (
                <>
                    <Grid item md={12} sm={12} xs={12}>
                        <h2>Datos Extras</h2>
                    </Grid>
                    <Grid item md={2} xs={12}>
                        <TextField
                            name="coD_ESTCIVIL"
                            fullWidth
                            select
                            label="Estado Civil"
                            onChange={handleInputChange}
                            value={fields.coD_ESTCIVIL}
                            error={inputError.coD_ESTCIVIL}
                        >
                            <MenuItem value="0" disabled>
                                Sin especificar
                            </MenuItem>
                            {stateCivil &&
                                stateCivil.map(stateCivil => (
                                    <MenuItem value={stateCivil.coD_ESTCIVIL}>
                                        {stateCivil.deS_ESTCIVIL}
                                    </MenuItem>
                                ))}
                        </TextField>
                    </Grid>
                    <Grid
                        item md={4} xs={12}>
                        <TextField
                            fullWidth
                            name="coD_GRDINSTRUC"
                            select
                            label="Nivel educativo"
                            onChange={handleInputChange}
                            value={fields.coD_GRDINSTRUC}
                            error={inputError.coD_GRDINSTRUC}
                        >
                            <MenuItem value="0" disabled>
                                Sin especificar
                            </MenuItem>
                            {levelEducate &&
                                levelEducate.map(levelEducate => (
                                    <MenuItem value={levelEducate.coD_GRDINSTRUC}>
                                        {levelEducate.abreviadO_GRADO}
                                    </MenuItem>
                                ))}
                        </TextField>
                    </Grid>
                    <Grid
                        item md={4} xs={12}>
                        <TextField
                            fullWidth
                            name="coD_PROFES"
                            select
                            label="Profesión"
                            onChange={handleInputChange}
                            value={fields.coD_PROFES}
                            error={inputError.coD_PROFES}
                        >
                            <MenuItem value="0" disabled>
                                Sin especificar
                            </MenuItem>
                            <MenuItem value="1">
                                Ingeniero
                            </MenuItem>
                        </TextField>
                    </Grid>
                    <Grid item md={12} xs={12} />
                    <Grid item md={2} sm={12} xs={12}>
                        <TextField
                            fullWidth
                            label="Teléfono Fijo"
                            type="number"
                            name="nuM_TLF"
                            onChange={handleInputChange}
                            value={fields.nuM_TLF}
                            error={inputError.nuM_TLF}
                        />
                    </Grid>
                    <Grid item md={2} sm={12} xs={12}>
                        <TextField
                            fullWidth
                            label="Celular"
                            type="number"
                            name="nuM_CELULAR"
                            onChange={handleInputChange}
                            value={fields.nuM_CELULAR}
                            error={inputError.nuM_CELULAR}
                        />
                    </Grid>
                    <Grid item md={3} sm={12} xs={12}>
                        <TextField
                            fullWidth
                            label="Email"
                            type="txT_EMAIL"
                            name="txT_EMAIL"
                            onChange={handleInputChange}
                            value={fields.txT_EMAIL}
                            error={inputError.txT_EMAIL}
                        />
                    </Grid>
                    <Grid item md={7} xs={12}>
                        <TextField
                            label="Observaciones"
                            multiline
                            fullWidth
                            rows={4}
                            name="txT_OBSERV"
                            onChange={handleInputChange}
                            value={fields.txT_OBSERV}
                            error={inputError.txT_OBSERV}
                        />

                    </Grid>
                    <Grid item md={12} xs={12} />
                    <Grid item md={12} xs={12}>
                        <Button onClick={backStep} variant="contained">Retroceder</Button>
                        <Button style={{ marginLeft: '30px' }} onClick={nextStep} variant="contained">Registrar</Button>
                    </Grid>
                </>
            )
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