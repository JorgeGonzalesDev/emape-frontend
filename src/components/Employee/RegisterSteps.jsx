import { Grid, TextField, MenuItem, Button } from "@mui/material";
import { useState, useEffect } from "react";
import { getCargo } from "../../service/position";
import { listAFPS } from "../../service/afp";
import {
    getBanks, getTypeWorker,
    getRSalud, getRPension,
    getPuestoLaboral, getUnidad, getCondicion,
    getRLaboral, getOcupacionL, getCategoriaO, getTipoPago, getTurno
} from "../../service/common";
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { AddOrUpdateWorker, getWorker } from "../../service/worker";
import moment from "moment";
import Swal from "sweetalert2";


const RegisterSteps = ({
    codePerson = 0,
    fullName = "",
    codeW = null,
}) => {

    const [fields, setFields] = useState({
        coD_TRABAJADOR: 0,
        coD_PERS: codePerson,
        coD_UORG: 0,
        feC_CUSPP: moment(new Date()).format(),
        feC_INGRESO: moment(new Date()).format(),
        coD_CAR: 0,
        feC_CESE: moment(new Date()).format(),
        coD_PUESTO: 0,
        coD_CONDICION: 0,
        coD_TIPOTRABAJ: 0,
        inD_ESTADO: "A",
        coD_AFP: 0,
        nuM_PLAZA: "",
        coD_BCOSUELDO: 0,
        nuM_CTASUELDO: "",
        nuM_CCI: "",
        coD_BCOCTS: 0,
        nuM_CTACTS: "",
        coD_CUSPP: "",
        //coD_TURNO: 0,
        inD_REGLABORAL: "",
        inD_REGPENSION: "",
        coD_ESSALUD: "",
        coD_SEGSALUD: 0,
        coD_REGLABORAL: 0,
        coD_REGPENSION: 0,
        coD_OCUPLABORAL: 0,
        coD_CATOCUPACION: 0,
        inD_DISCAPACIDAD: "0",
        inD_SINDICALIZADO: "0",
        inD_SITESPECIAL: "0",
        inD_DOBLETRIBUTO: "0",
        inD_TIPOPAGO: 0,
        inD_PLAME: "S",
        obS_TRABAJADOR: "",
        inD_NOSEGUROAFP: "S",
        nrO_CONTRATO: "",
        feC_INI_CONTRATO: moment(new Date()).format(),
        feC_FIN_CONTRATO: moment(new Date()).format(),
    });

    const defaultErrors = {
        coD_UORG: false,
        coD_CAR: false,
        coD_PUESTO: false,
        coD_CONDICION: false,
        coD_TIPOTRABAJ: false,
        inD_ESTADO: false,
        coD_AFP: false,
        nuM_PLAZA: false,
        coD_BCOSUELDO: false,
        nuM_CTASUELDO: false,
        nuM_CCI: false,
        coD_BCOCTS: false,
        nuM_CTACTS: false,
        coD_CUSPP: false,
        coD_TURNO: false,
        inD_REGLABORAL: false,
        inD_REGPENSION: false,
        coD_ESSALUD: false,
        coD_SEGSALUD: false,
        coD_REGLABORAL: false,
        coD_REGPENSION: false,
        coD_OCUPLABORAL: false,
        coD_CATOCUPACION: false,
        inD_DISCAPACIDAD: false,
        inD_SINDICALIZADO: false,
        inD_SITESPECIAL: false,
        inD_DOBLETRIBUTO: false,
        inD_TIPOPAGO: false,
        inD_PLAME: false,
        obS_TRABAJADOR: false,
        inD_NOSEGUROAFP: false,
        nrO_CONTRATO: false,
    };

    const [inputError, setInputError] = useState(defaultErrors);

    const [step, setStep] = useState(1);
    const [positions, setPositions] = useState([]);
    const [afps, setAfps] = useState([]);
    const [banks, setBanks] = useState([]);
    const [typeWorker, setTypeWorker] = useState([]);
    const [rSalud, setRSalud] = useState([]);
    const [rPension, setRPension] = useState([]);
    const [puestoL, setPuestoL] = useState([]);
    const [unidad, setUnidad] = useState([]);
    const [condicion, setCondicion] = useState([]);
    const [rLaboral, setRLaboral] = useState([]);
    const [ocupacionLaboral, setOcupacionLaboral] = useState([]);
    const [categoriaOcupacional, setCategoriaOcupacional] = useState([]);
    // const [turno, setTurno] = useState([]);
    // const [tipoPago, setTipoPago] = useState([]);

    const loadData = async () => {

        if (codeW) {
            const response = await getWorker(codeW);
            setFields({
                coD_TRABAJADOR: response.listado[0]['coD_TRABAJADOR'],
                coD_PERS: response.listado[0]['coD_PERS'],
                coD_UORG: response.listado[0]['coD_UORG'],
                feC_INGRESO: response.listado[0]['feC_INGRESO'],
                inD_ESTADO: response.listado[0]['inD_ESTADO'],
                coD_CAR: response.listado[0]['coD_CAR'],
                feC_CESE: response.listado[0]['feC_CESE'],
                coD_PUESTO: response.listado[0]['coD_PUESTO'],
                coD_CONDICION: response.listado[0]['coD_CONDICION'],
                coD_TIPOTRABAJ: response.listado[0]['coD_TIPOTRABAJ'],
                coD_AFP: response.listado[0]['coD_AFP'],
                nuM_PLAZA: response.listado[0]['nuM_PLAZA'],
                coD_BCOSUELDO: response.listado[0]['coD_BCOSUELDO'],
                nuM_CTASUELDO: response.listado[0]['nuM_CTASUELDO'],
                nuM_CCI: response.listado[0]['nuM_CCI'],
                coD_BCOCTS: response.listado[0]['coD_BCOCTS'],
                nuM_CTACTS: response.listado[0]['nuM_CTACTS'],
                coD_CUSPP: response.listado[0]['coD_CUSPP'],
                inD_REGLABORAL: response.listado[0]['inD_REGLABORAL'],
                inD_REGPENSION: response.listado[0]['inD_REGPENSION'],
                //COD_TURNO: response.listado[0]['COD_TURNO'],
                coD_ESSALUD: response.listado[0]['coD_ESSALUD'],
                feC_CUSPP: response.listado[0]['feC_CUSPP'],
                coD_SEGSALUD: response.listado[0]['coD_SEGSALUD'],
                coD_REGLABORAL: response.listado[0]['coD_REGLABORAL'],
                coD_REGPENSION: response.listado[0]['coD_REGPENSION'],
                coD_OCUPLABORAL: response.listado[0]['coD_OCUPLABORAL'],
                coD_CATOCUPACION: response.listado[0]['coD_CATOCUPACION'],
                inD_DISCAPACIDAD: response.listado[0]['inD_DISCAPACIDAD'],
                inD_SINDICALIZADO: response.listado[0]['inD_SINDICALIZADO'],
                inD_SITESPECIAL: response.listado[0]['inD_SITESPECIAL'],
                inD_DOBLETRIBUTO: response.listado[0]['inD_DOBLETRIBUTO'],
                inD_TIPOPAGO: response.listado[0]['inD_TIPOPAGO'],
                inD_PLAME: response.listado[0]['inD_PLAME'],
                obS_TRABAJADOR: response.listado[0]['obS_TRABAJADOR'],
                inD_NOSEGUROAFP: response.listado[0]['inD_NOSEGUROAFP'],
                nrO_CONTRATO: response.listado[0]['nrO_CONTRATO'],
                feC_INI_CONTRATO: response.listado[0]['feC_INI_CONTRATO'],
                feC_FIN_CONTRATO: response.listado[0]['feC_FIN_CONTRATO'],
            })
        }

        const responsePositions = await getCargo();
        setPositions(responsePositions.listado)
        const responseAfps = await listAFPS();
        setAfps(responseAfps.listado);
        const responseBanks = await getBanks();
        setBanks(responseBanks.listado);
        const responseTypeWorker = await getTypeWorker();
        setTypeWorker(responseTypeWorker.listado);
        const responserSalud = await getRSalud();
        setRSalud(responserSalud.listado);
        const responsePension = await getRPension();
        setRPension(responsePension.listado);
        const responsePuestoLaboral = await getPuestoLaboral();
        setPuestoL(responsePuestoLaboral.listado);
        const responseUnidad = await getUnidad();
        setUnidad(responseUnidad.listado);
        const responseCondicion = await getCondicion();
        setCondicion(responseCondicion.listado);
        const responseRLaboral = await getRLaboral();
        setRLaboral(responseRLaboral.listado);
        const responseOcupacionL = await getOcupacionL();
        setOcupacionLaboral(responseOcupacionL.listado);
        const responseCategoriaO = await getCategoriaO();
        setCategoriaOcupacional(responseCategoriaO.listado);
        // const responseTurno = await getTurno();
        // setTurno(responseTurno.listado);
        // const responseTipoPago = await getTipoPago();
        // setTipoPago(responseTipoPago.listado);

    }

    useEffect(() => {
        loadData();
    }, []);

    const handleInputChange = event => {

        const { name, type, checked, value } = event.target;

        const val = type === 'checkbox' ? checked : value;

        setFields({
            ...fields,
            [name]: val,
        });

    }

    const handleInputChangeDate = (value, name) => {
        setFields({
            ...fields,
            [name]: moment(new Date(value)).format(),
        });
    };

    const validateFields = () => {

        const copyFields = { ...fields };

        delete copyFields.coD_TRABAJADOR;
        delete copyFields.coD_PERS;
        delete copyFields.feC_INGRESO;
        delete copyFields.feC_CESE;
        delete copyFields.feC_INI_CONTRATO;
        delete copyFields.feC_FIN_CONTRATO;
        delete copyFields.feC_CUSPP;
        delete copyFields.inD_SINDICALIZADO;
        delete copyFields.inD_DISCAPACIDAD;
        delete copyFields.inD_DOBLETRIBUTO;
        delete copyFields.inD_NOSEGUROAFP;
        delete copyFields.inD_PLAME;
        delete copyFields.inD_SITESPECIAL;


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

        const response = await AddOrUpdateWorker(fields)

        if (response.code === 0) {

            await Swal.fire({
                icon: 'success',
                title: `${response.message}`,
                showConfirmButton: false,
                timer: 1500
            })

            return window.location = "/trabajador"

        } else {
            return Swal.fire({
                icon: 'error',
                title: `${response.message}`,
                showConfirmButton: false,
                timer: 1500
            })
        }

    }


    return (
        <>
            <Grid container spacing={2}>
                <Grid item md={12} sm={12}>
                    <h1>{fields.coD_TRABAJADOR ? "Actualizar Trabajador" : "Registrar Trabajador"}</h1>
                </Grid>
                <Grid item md={12} sm={12}>
                    <h2>Datos Generales</h2>
                </Grid>
                <Grid
                    item md={4} xs={12}>
                    <TextField
                        fullWidth
                        size="small"
                        label="Nombre"
                        type='text'
                        inputProps={
                            { readOnly: true, }
                        }
                        value={`${fullName}`}
                    />
                </Grid>
                <Grid item md={2} sm={12} xs={12}>
                    <TextField
                        name="inD_ESTADO"
                        fullWidth
                        select
                        label="Estado"
                        onChange={handleInputChange}
                        size="small"
                        error={inputError.inD_ESTADO}
                        value={fields.inD_ESTADO}
                    >
                        <MenuItem value="0" disabled>
                            Sin seleccionar
                        </MenuItem>
                        <MenuItem value="A" >
                            Activo
                        </MenuItem>
                        <MenuItem value="I">
                            Inactivo
                        </MenuItem>
                    </TextField>
                </Grid>
                <Grid item md={12} />
                <Grid
                    item md={4} sm={12} xs={12}>
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
                <Grid item md={3} sm={12} xs={12}>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DesktopDatePicker
                            label="Fecha de ingreso"
                            inputFormat="dd-MM-yyyy"
                            value={moment(fields.feC_INGRESO).format()}
                            onChange={e =>
                                handleInputChangeDate(e, 'feC_INGRESO')}
                            renderInput={(params) => <TextField fullWidth
                                size="small"
                                error={inputError.feC_INGRESO} {...params} />}
                        />
                    </LocalizationProvider>
                </Grid>
                <Grid item md={3} sm={12} xs={12}>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DesktopDatePicker
                            label="Fecha de cese"
                            inputFormat="dd-MM-yyyy"
                            value={moment(fields.feC_CESE).format()}
                            onChange={e =>
                                handleInputChangeDate(e, 'feC_CESE')}
                            renderInput={(params) => <TextField fullWidth
                                size="small"
                                {...params} />}
                        />
                    </LocalizationProvider>
                </Grid>
                <Grid item md={12} />
                <Grid item md={4} sm={12} xs={12}>
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
                <Grid
                    item md={4} sm={12} xs={12}>
                    <TextField
                        name="coD_PUESTO"
                        fullWidth
                        size="small"
                        error={inputError.coD_PUESTO}
                        select
                        label="Puesto Laboral"
                        type="text"
                        onChange={handleInputChange}
                        value={fields.coD_PUESTO}
                    >
                        <MenuItem value="0" disabled>
                            Sin especificar
                        </MenuItem>
                        {puestoL &&
                            puestoL.map(puestoL => (
                                <MenuItem value={puestoL.coD_PUESTO}>
                                    {puestoL.noM_PUESTO}
                                </MenuItem>
                            ))}
                    </TextField>
                </Grid>
                <Grid item md={12} />
                <Grid
                    item md={4} sm={12} xs={12}>
                    <TextField
                        name="coD_CONDICION"
                        fullWidth
                        size="small"
                        error={inputError.coD_CONDICION}
                        select
                        label="Condición Laboral"
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
                <Grid
                    item md={4} sm={12} xs={12}>
                    <TextField
                        name="coD_TIPOTRABAJ"
                        fullWidth
                        size="small"
                        error={inputError.coD_TIPOTRABAJ}
                        select
                        label="Tipo Trabajador"
                        type="text"
                        onChange={handleInputChange}
                        value={fields.coD_TIPOTRABAJ}
                    >
                        <MenuItem value="0" disabled >
                            Sin especificar
                        </MenuItem>
                        {typeWorker &&
                            typeWorker.map(typeWorker => (
                                <MenuItem value={typeWorker.coD_TIPOTRABAJ}>
                                    {typeWorker.noM_TIPOTRABAJ}
                                </MenuItem>
                            ))}
                    </TextField>
                </Grid>
                {/* <Grid
                        item md={4} sm={12} xs={12}>
                        <TextField
                            name="coD_TURNO"
                            fullWidth
                            size="small"
                            error={inputError.coD_TURNO}
                            select
                            label="Turno Laboral"
                            type="text"
                            onChange={handleInputChange}
                            value={fields.coD_TURNO}
                        >
                            <MenuItem value="0" disabled>
                                Sin especificar
                            </MenuItem>
                            {turno &&
                                turno.map(turno => (
                                    <MenuItem value={turno.coD_TURNO}>
                                        {turno.noM_TURNO}
                                    </MenuItem>
                                ))}
                        </TextField>
                    </Grid> */}
                <Grid item md={12} />
                <Grid
                    item md={4} sm={12} xs={12}>
                    <TextField
                        name="coD_AFP"
                        fullWidth
                        size="small"
                        error={inputError.coD_AFP}
                        select
                        label="Fondo A.F.P"
                        type="text"
                        onChange={handleInputChange}
                        value={fields.coD_AFP}
                    >
                        <MenuItem value="0" disabled >
                            Sin especificar
                        </MenuItem>
                        {afps &&
                            afps.map(afp => (
                                <MenuItem value={afp.coD_AFP}>
                                    {afp.noM_AFP}
                                </MenuItem>
                            ))}
                    </TextField>
                </Grid>
                <Grid item md={3} sm={12} xs={12}>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DesktopDatePicker
                            label="Afiliado AFP"
                            inputFormat="dd-MM-yyyy"
                            value={moment(fields.feC_CUSPP).format()}
                            onChange={e =>
                                handleInputChangeDate(e, 'feC_CUSPP')}
                            renderInput={(params) => <TextField fullWidth
                                size="small"
                                error={inputError.feC_CUSPP} {...params} />}
                        />
                    </LocalizationProvider>
                </Grid>
                <Grid item md={3} sm={12} xs={12}>
                    <TextField
                        name="nuM_PLAZA"
                        fullWidth
                        size="small"
                        error={inputError.nuM_PLAZA}
                        label="Plaza"
                        type='text'
                        //error={inputError.nuM_DOC}
                        onChange={handleInputChange}
                        value={fields.nuM_PLAZA}
                    />
                </Grid>
                <Grid item md={12} />
                <Grid
                    item md={4} sm={12} xs={12}>
                    <TextField
                        name="coD_BCOSUELDO"
                        fullWidth
                        size="small"
                        error={inputError.coD_BCOSUELDO}
                        select
                        label="Banco Sueldo"
                        type="text"
                        onChange={handleInputChange}
                        value={fields.coD_BCOSUELDO}
                    >
                        <MenuItem value="0" disabled>
                            Sin especificar
                        </MenuItem>
                        {banks &&
                            banks.map(bank => (
                                <MenuItem value={bank.coD_BANCO}>
                                    {bank.noM_BANCO}
                                </MenuItem>
                            ))}
                    </TextField>
                </Grid>
                <Grid
                    item md={4} sm={12} xs={12}>
                    <TextField
                        name="nuM_CTASUELDO"
                        fullWidth
                        size="small"
                        error={inputError.nuM_CTASUELDO}
                        label="Cuenta Sueldo"
                        type='text'
                        onChange={handleInputChange}
                        value={fields.nuM_CTASUELDO}
                    >
                    </TextField>
                </Grid>
                <Grid
                    item md={4} sm={12} xs={12}>
                    <TextField
                        name="nuM_CCI"
                        fullWidth
                        size="small"
                        error={inputError.nuM_CCI}
                        label="Numero C.C.I"
                        type="text"
                        onChange={handleInputChange}
                        value={fields.nuM_CCI}
                    >
                    </TextField>
                </Grid>
                <Grid item md={12} />
                <Grid
                    item md={4} sm={12} xs={12}>
                    <TextField
                        name="coD_BCOCTS"
                        fullWidth
                        size="small"
                        error={inputError.coD_BCOCTS}
                        select
                        label="Banco CTS"
                        type="text"
                        onChange={handleInputChange}
                        value={fields.coD_BCOCTS}
                    >
                        <MenuItem value="0" disabled>
                            Sin especificar
                        </MenuItem>
                        {banks &&
                            banks.map(bank => (
                                <MenuItem value={bank.coD_BANCO}>
                                    {bank.noM_BANCO}
                                </MenuItem>
                            ))}
                    </TextField>
                </Grid>
                <Grid
                    item md={4} sm={12} xs={12}>
                    <TextField
                        name="nuM_CTACTS"
                        fullWidth
                        size="small"
                        error={inputError.nuM_CTACTS}
                        label="Cuenta CTS"
                        type="text"
                        onChange={handleInputChange}
                        value={fields.nuM_CTACTS}
                    >
                    </TextField>
                </Grid>
                <Grid
                    item md={4} sm={12} xs={12}>
                    <TextField
                        name="coD_CUSPP"
                        fullWidth
                        size="small"
                        error={inputError.coD_CUSPP}
                        label="Codigo CUSPP"
                        type="text"
                        onChange={handleInputChange}
                        value={fields.coD_CUSPP}
                    >
                    </TextField>
                </Grid>
                <Grid item md={12} />
                <Grid
                    item md={4} sm={12} xs={12}>
                    <TextField
                        name="inD_REGLABORAL"
                        fullWidth
                        size="small"
                        error={inputError.inD_REGLABORAL}
                        select
                        label="Tipo Reg. Laboral"
                        type="text"
                        onChange={handleInputChange}
                        value={fields.inD_REGLABORAL}
                    >
                        <MenuItem value="0" disabled>
                            Sin especificar
                        </MenuItem>
                        <MenuItem value="1">
                            276 (Publico)
                        </MenuItem>
                        <MenuItem value="2">
                            728 (Privado)
                        </MenuItem>
                        <MenuItem value="3">
                            Sin especificar
                        </MenuItem>
                    </TextField>
                </Grid>
                <Grid
                    item md={4} sm={12} xs={12}>
                    <TextField
                        name="inD_REGPENSION"
                        fullWidth
                        size="small"
                        error={inputError.inD_REGPENSION}
                        select
                        label="Tipo Reg. Pension"
                        type="text"
                        onChange={handleInputChange}
                        value={fields.inD_REGPENSION}
                    >
                        <MenuItem value="0" disabled>
                            Sin especificar
                        </MenuItem>
                        <MenuItem value="1">
                            ONP
                        </MenuItem>
                        <MenuItem value="2">
                            AFP
                        </MenuItem>
                        <MenuItem value="3">
                            NINGUNO
                        </MenuItem>
                    </TextField>
                </Grid>
                <Grid
                    item md={4} sm={12} xs={12}>
                    <TextField
                        name="coD_ESSALUD"
                        fullWidth
                        size="small"
                        error={inputError.coD_ESSALUD}
                        label="Codigo ESSALUD"
                        type="text"
                        onChange={handleInputChange}
                        value={fields.coD_ESSALUD}
                    >
                    </TextField>
                </Grid>
                <Grid item md={12} />
                <Grid
                    item md={4} sm={12} xs={12}>
                    <TextField
                        name="coD_REGLABORAL"
                        fullWidth
                        size="small"
                        error={inputError.coD_REGLABORAL}
                        select
                        label="Regimen Laboral"
                        type="text"
                        onChange={handleInputChange}
                        value={fields.coD_REGLABORAL}
                    >
                        <MenuItem value="0" disabled >
                            Sin especificar
                        </MenuItem>
                        {rLaboral &&
                            rLaboral.map(rLaboral => (
                                <MenuItem value={rLaboral.coD_REGLABORAL}>
                                    {rLaboral.noM_REGLABORAL}
                                </MenuItem>
                            ))}
                    </TextField>
                </Grid>
                <Grid
                    item md={4} sm={12} xs={12}>
                    <TextField
                        name="coD_REGPENSION"
                        fullWidth
                        size="small"
                        error={inputError.coD_REGPENSION}
                        select
                        label="Regimen Pension"
                        type="text"
                        onChange={handleInputChange}
                        value={fields.coD_REGPENSION}
                    >
                        <MenuItem value="0" disabled >
                            Sin especificar
                        </MenuItem>
                        {rPension &&
                            rPension.map(rPension => (
                                <MenuItem value={rPension.coD_REGPENSION}>
                                    {rPension.noM_REGPENSION}
                                </MenuItem>
                            ))}
                    </TextField>
                </Grid>
                <Grid
                    item md={4} sm={12} xs={12}>
                    <TextField
                        name="coD_SEGSALUD"
                        fullWidth
                        size="small"
                        error={inputError.coD_SEGSALUD}
                        select
                        label="Regimen Seg. Salud"
                        type="text"
                        onChange={handleInputChange}
                        value={fields.coD_SEGSALUD}
                    >
                        <MenuItem value="0" disabled>
                            Sin especificar
                        </MenuItem>
                        {rSalud &&
                            rSalud.map(rSalud => (
                                <MenuItem value={rSalud.coD_SEGSALUD}>
                                    {rSalud.noM_SEGSALUD}
                                </MenuItem>
                            ))}
                    </TextField>
                </Grid>
                <Grid item md={12} />
                <Grid
                    item md={4} sm={12} xs={12}>
                    <TextField
                        name="coD_OCUPLABORAL"
                        fullWidth
                        size="small"
                        error={inputError.coD_OCUPLABORAL}
                        select
                        label="Ocupación Laboral"
                        type="text"
                        onChange={handleInputChange}
                        value={fields.coD_OCUPLABORAL}
                    >
                        <MenuItem value="0" disabled>
                            Sin especificar
                        </MenuItem>
                        {ocupacionLaboral &&
                            ocupacionLaboral.map(ocupacionLaboral => (
                                <MenuItem value={ocupacionLaboral.coD_OCUPLABORAL}>
                                    {ocupacionLaboral.noM_OCUPLABORAL}
                                </MenuItem>
                            ))}
                    </TextField>

                </Grid>
                <Grid
                    item md={4} sm={12} xs={12}>
                    <TextField
                        name="inD_SITESPECIAL"
                        fullWidth
                        size="small"
                        error={inputError.inD_SITESPECIAL}
                        select
                        label="Situacion Especial"
                        type="text"
                        onChange={handleInputChange}
                        value={fields.inD_SITESPECIAL}
                    >
                        <MenuItem value="0">
                            Ninguna
                        </MenuItem>
                        <MenuItem value="1">
                            Directivo
                        </MenuItem>
                        <MenuItem value="2">
                            Confianza
                        </MenuItem>
                    </TextField>
                </Grid>
                <Grid
                    item md={4} sm={12} xs={12}>
                    <TextField
                        name="coD_CATOCUPACION"
                        fullWidth
                        size="small"
                        error={inputError.coD_CATOCUPACION}
                        select
                        label="Categoria Ocupación"
                        type="text"
                        onChange={handleInputChange}
                        value={fields.coD_CATOCUPACION}
                    >
                        <MenuItem value="0" disabled>
                            Sin especificar
                        </MenuItem>
                        {categoriaOcupacional &&
                            categoriaOcupacional.map(categoriaOcupacional => (
                                <MenuItem value={categoriaOcupacional.coD_CATOCUPACION}>
                                    {categoriaOcupacional.noM_CATOCUPACION}
                                </MenuItem>
                            ))}
                    </TextField>
                </Grid>
                <Grid item md={12} />
                <Grid
                    item md={2} sm={12} xs={12}>
                    <TextField
                        name="inD_DISCAPACIDAD"
                        fullWidth
                        size="small"
                        error={inputError.inD_DISCAPACIDAD}
                        select
                        label="Dispacitación"
                        type="text"
                        onChange={handleInputChange}
                        value={fields.inD_DISCAPACIDAD}
                    >
                        <MenuItem value="0">
                            No
                        </MenuItem>
                        <MenuItem value="1">
                            Sí
                        </MenuItem>
                    </TextField>
                </Grid>
                <Grid
                    item md={2} sm={12} xs={12}>
                    <TextField
                        name="inD_SINDICALIZADO"
                        fullWidth
                        size="small"
                        error={inputError.inD_SINDICALIZADO}
                        select
                        label="Sindicalizado"
                        type="text"
                        onChange={handleInputChange}
                        value={fields.inD_SINDICALIZADO}
                    >
                        <MenuItem value="0">
                            No
                        </MenuItem>
                        <MenuItem value="1">
                            Sí
                        </MenuItem>
                    </TextField>
                </Grid>
                <Grid
                    item md={4} sm={12} xs={12}>
                    <TextField
                        name="inD_DOBLETRIBUTO"
                        fullWidth
                        size="small"
                        error={inputError.inD_DOBLETRIBUTO}
                        select
                        label="Convenio Evitar Doble Tributación"
                        type="text"
                        onChange={handleInputChange}
                        value={fields.inD_DOBLETRIBUTO}
                    >
                        <MenuItem value="0">
                            Ninguna
                        </MenuItem>
                        <MenuItem value="1">
                            Canada
                        </MenuItem>
                    </TextField>
                </Grid>
                <Grid
                    item md={4} sm={12} xs={12}>
                    <TextField
                        name="inD_TIPOPAGO"
                        fullWidth
                        size="small"
                        error={inputError.inD_TIPOPAGO}
                        select
                        label="Tipo de Pago"
                        type="text"
                        onChange={handleInputChange}
                        value={fields.inD_TIPOPAGO}
                    >
                        <MenuItem value="0" disabled>
                            Sin especificar
                        </MenuItem>
                        <MenuItem value="1">
                            Efectivo
                        </MenuItem>
                        <MenuItem value="2">
                            Deposito Cta
                        </MenuItem>
                        <MenuItem value="3">
                            Otros
                        </MenuItem>
                    </TextField>
                </Grid>
                <Grid item md={12} />
                <Grid
                    item md={2} sm={12} xs={12}>
                    <TextField
                        name="inD_PLAME"
                        fullWidth
                        size="small"
                        error={inputError.inD_PLAME}
                        select
                        label="T_Registro"
                        type="text"
                        onChange={handleInputChange}
                        value={fields.inD_PLAME}
                    >
                        <MenuItem value="S">
                            Sí
                        </MenuItem>
                        <MenuItem value="N">
                            No
                        </MenuItem>
                    </TextField>
                </Grid>
                <Grid
                    item md={2} sm={12} xs={12}>
                    <TextField
                        name="inD_NOSEGUROAFP"
                        fullWidth
                        size="small"
                        error={inputError.inD_NOSEGUROAFP}
                        select
                        label="No paga Prima seguro AFP"
                        type="text"
                        onChange={handleInputChange}
                        value={fields.inD_NOSEGUROAFP}
                    >
                        <MenuItem value="S">
                            Sí
                        </MenuItem>
                        <MenuItem value="N">
                            No
                        </MenuItem>
                    </TextField>
                </Grid>
                <Grid item md={12} />
                <Grid
                    item md={12} sm={12} xs={12}>
                    <TextField
                        label="Observaciones"
                        multiline
                        fullWidth
                        size="small"
                        error={inputError.obS_TRABAJADOR}
                        rows={4}
                        name="obS_TRABAJADOR"
                        onChange={handleInputChange}
                        value={fields.obS_TRABAJADOR}
                    />
                </Grid>
                <Grid item md={12} />
                <Grid item md={12}>
                    <h3>Contrato</h3>
                </Grid>
                <Grid
                    item md={4} sm={12} xs={12}>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DesktopDatePicker
                            label="Inicio de contrato"
                            inputFormat="dd-MM-yyyy"
                            value={moment(fields.feC_INI_CONTRATO).format()}
                            onChange={e =>
                                handleInputChangeDate(e, 'feC_INI_CONTRATO')}
                            renderInput={(params) => <TextField fullWidth
                                size="small"
                                {...params} />}
                        />
                    </LocalizationProvider>
                </Grid>
                <Grid
                    item md={4} sm={12} xs={12}>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DesktopDatePicker
                            label="Fin de contrato"
                            inputFormat="dd-MM-yyyy"
                            value={moment(fields.feC_FIN_CONTRATO).format()}
                            onChange={e =>
                                handleInputChangeDate(e, 'feC_FIN_CONTRATO')}
                            renderInput={(params) => <TextField fullWidth
                                size="small"
                                {...params} />}
                        />
                    </LocalizationProvider>
                </Grid>
                <Grid
                    item md={4} sm={12} xs={12}>
                    <TextField
                        name="nrO_CONTRATO"
                        fullWidth
                        size="small"
                        error={inputError.nrO_CONTRATO}
                        label="Numero de Contrato"
                        onChange={handleInputChange}
                        value={fields.nrO_CONTRATO}
                        type="text"
                    >
                    </TextField>
                </Grid>
                <Grid item md={12} xs={12} />
                <Grid item md={12}>
                    <Button variant="contained" onClick={() => {
                        handleFields();
                    }}>
                        Guardar
                    </Button>
                </Grid>
            </Grid>
        </>
    )


}
export default RegisterSteps;