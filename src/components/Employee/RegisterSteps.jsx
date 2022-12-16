import { Grid, TextField, MenuItem, Button } from "@mui/material";
import { useState, useEffect } from "react";
import { getCargo } from "../../service/position";
import { listAFPS } from "../../service/afp";
import { listTurnoLaboral } from "../../service/ballots/workshift/";
import {
    getBanks, getTypeWorker, getRSalud, getRPension,
    getPuestoLaboral, getUnidad, getCondicion,
    getRLaboral, getOcupacionL, getCategoriaO
} from "../../service/common";
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { AddOrUpdateWorker } from "../../service/worker";
import moment from "moment";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { useNavigate } from "react-router-dom";
import { AlertError, AlertSuccess, AlertWarning } from "../Alerts";
import { PATH } from "../../service/config";

const RegisterSteps = ({
    codePerson = 0,
    fullName = "",
    back,
    dataWorker = null,
}) => {

    const [fields, setFields] = useState({
        coD_TRABAJADOR: 0,
        coD_PERS: codePerson,
        coD_UORG: null,
        feC_CUSPP: null,
        feC_INGRESO: null,
        coD_CAR: null,
        feC_CESE: null,
        coD_PUESTO: null,
        coD_CONDICION: null,
        coD_TIPOTRABAJ: null,
        inD_ESTADO: "A",
        coD_AFP: null,
        nuM_PLAZA: null,
        coD_BCOSUELDO: null,
        nuM_CTASUELDO: null,
        nuM_CCI: null,
        coD_BCOCTS: null,
        nuM_CTACTS: null,
        coD_CUSPP: null,
        coD_TURNO: null,
        inD_REGLABORAL: null,
        inD_REGPENSION: null,
        coD_ESSALUD: null,
        coD_SEGSALUD: null,
        coD_REGLABORAL: null,
        coD_REGPENSION: null,
        coD_OCUPLABORAL: null,
        coD_CATOCUPACION: null,
        inD_DISCAPACIDAD: "0",
        inD_SINDICALIZADO: "0",
        inD_SITESPECIAL: "0",
        inD_DOBLETRIBUTO: "0",
        inD_TIPOPAGO: null,
        inD_PLAME: "S",
        obS_TRABAJADOR: null,
        inD_NOSEGUROAFP: "S",
        nrO_CONTRATO: null,
        feC_INI_CONTRATO: null,
        feC_FIN_CONTRATO: null,
    });

    const defaultErrors = {
        feC_INGRESO: true,
        coD_AFP: true,
        inD_REGLABORAL: true,
        inD_REGPENSION: true,
        coD_CONDICION: true,
        coD_REGLABORAL: true,
        coD_OCUPLABORAL: true,
        coD_CATOCUPACION: true,
        coD_TIPOTRABAJ: true,
        coD_REGPENSION: true,
        coD_SEGSALUD: true,
    };

    const [inputError, setInputError] = useState(defaultErrors);
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
    const [turno, setTurno] = useState([]);
    const navigate = useNavigate();

    const loadData = async () => {

        if (dataWorker) {
            setInputError({
                feC_INGRESO: false,
                coD_AFP: false,
                inD_ESTADO: false,
                inD_REGLABORAL: false,
                inD_REGPENSION: false,
                coD_CONDICION: false,
                coD_REGLABORAL: false,
                coD_TURNO: false,
                coD_OCUPLABORAL: false,
                coD_CATOCUPACION: false,
                coD_TIPOTRABAJ: false,
                coD_REGPENSION: false,
                coD_SEGSALUD: false,
            });
            console.log(dataWorker);
            setFields(dataWorker);
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
        const responseTurno = await listTurnoLaboral();
        setTurno(responseTurno.listado);
        // const responseTipoPago = await getTipoPago();
        // setTipoPago(responseTipoPago.listado);

    }

    useEffect(() => {
        loadData();
    }, [dataWorker]);

    const isValidNumber = (value) => {
        return /^[0-9]+$/.test(value);
    }

    const pathPROD = PATH

    const handleInputChange = event => {

        const { name, type, checked, value } = event.target;
        const val = type === 'checkbox' ? checked : value;

        if (name === "nuM_CCI" || name === "nuM_PLAZA" || name === "nrO_CONTRATO" || name === "coD_CUSPP" || name === "nuM_CTACTS" || name === "nuM_CTASUELDO") {
            if (value.length === 0) {
                setFields({
                    ...fields,
                    [name]: value,
                });
            } else if (isValidNumber(value)) {
                setFields({
                    ...fields,
                    [name]: value,
                });
            }
            return
        }

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
        delete copyFields.coD_UORG;
        delete copyFields.feC_CUSPP;
        delete copyFields.coD_CAR;
        delete copyFields.feC_CESE;
        delete copyFields.coD_PUESTO;
        delete copyFields.nuM_PLAZA;
        delete copyFields.coD_BCOSUELDO;
        delete copyFields.nuM_CTASUELDO;
        delete copyFields.nuM_CCI;
        delete copyFields.coD_BCOCTS;
        delete copyFields.nuM_CTACTS;
        delete copyFields.coD_CUSPP;
        delete copyFields.coD_ESSALUD;
        delete copyFields.inD_DISCAPACIDAD;
        delete copyFields.inD_SINDICALIZADO;
        delete copyFields.inD_SITESPECIAL;
        delete copyFields.inD_DOBLETRIBUTO;
        delete copyFields.inD_TIPOPAGO;
        delete copyFields.inD_PLAME;
        delete copyFields.obS_TRABAJADOR;
        delete copyFields.inD_NOSEGUROAFP;
        delete copyFields.nrO_CONTRATO;
        delete copyFields.feC_INI_CONTRATO;
        delete copyFields.feC_FIN_CONTRATO;

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
            AlertWarning("Hay campos obligatorios vacios");
            return false;
        }

        setInputError(errors);
        return true;

    }

    const handleFields = async () => {

        const validate = validateFields();

        if (!validate) return;

        const response = await AddOrUpdateWorker(fields)

        if (response.code === 0) {

            await AlertSuccess(`${response.message}`)

            return navigate(pathPROD + "/trabajador")

        } else {
            return await AlertError(`${response.message}`)
        }

    }

    return (
        <>
            <Grid container spacing={1} justifyContent='center' alignItems='center'>
                <Grid item md={12} sm={12} style={{ textAlign: 'center' }}>
                    <span style={{ fontSize: 25, fontWeight: 'bolder' }} >{fields.coD_TRABAJADOR ? "Actualizar Trabajador" : "Registrar Trabajador"}</span>
                    <p>{fullName}</p>
                    <p style={{ color: 'red', fontSize: 15 }}>(Los campos con * son obligatorios)</p>
                </Grid>
                <Grid item md={9} sm={12}>
                    <h3>Datos Generales</h3>
                </Grid>
                <Grid item md={12} />
                <Grid item md={2} sm={12} xs={12}>
                    <TextField
                        name="inD_ESTADO"
                        fullWidth
                        InputLabelProps={{
                            shrink: true
                        }}
                        select
                        label="Estado *"
                        onChange={handleInputChange}
                        size="small"
                        error={inputError.inD_ESTADO}
                        value={fields.inD_ESTADO}
                    >
                        <MenuItem value="A" >
                            Activo
                        </MenuItem>
                        <MenuItem value="I">
                            Inactivo
                        </MenuItem>
                    </TextField>
                </Grid>
                <Grid item md={3} sm={12} xs={12}>
                    <TextField
                        name="coD_UORG"
                        fullWidth
                        InputLabelProps={{
                            shrink: true
                        }}
                        size="small"
                        select
                        label="Area Laboral"
                        type="text"
                        onChange={handleInputChange}
                        value={fields.coD_UORG}
                    >
                        <MenuItem value={null}>
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
                <Grid item md={2} sm={12} xs={12}>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DesktopDatePicker
                            label="Fecha de ingreso *"
                            inputFormat="dd-MM-yyyy"
                            value={moment(fields.feC_INGRESO).format()}
                            onChange={e =>
                                handleInputChangeDate(e, 'feC_INGRESO')}
                            renderInput={(params) => <TextField fullWidth
                                InputLabelProps={{
                                    shrink: true
                                }}
                                size="small"
                                error={inputError.feC_INGRESO} {...params} />}
                        />
                    </LocalizationProvider>
                </Grid>
                <Grid item md={2} sm={12} xs={12}>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DesktopDatePicker
                            label="Fecha de cese"
                            inputFormat="dd-MM-yyyy"
                            value={fields.feC_CESE}
                            onChange={e =>
                                handleInputChangeDate(e, 'feC_CESE')}
                            renderInput={(params) => <TextField fullWidth
                                InputLabelProps={{
                                    shrink: true
                                }}
                                size="small"
                                {...params} />}
                        />
                    </LocalizationProvider>
                </Grid>
                <Grid item md={12} />
                <Grid item md={3} sm={12} xs={12}>
                    <TextField
                        name="coD_CAR"
                        fullWidth
                        InputLabelProps={{
                            shrink: true
                        }}
                        size="small"
                        error={inputError.coD_CAR}
                        select
                        label="Cargo Laboral"
                        type="text"
                        onChange={handleInputChange}
                        value={fields.coD_CAR}
                    >
                        <MenuItem value={null}>
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
                    item md={3} sm={12} xs={12}>
                    <TextField
                        name="coD_PUESTO"
                        fullWidth
                        InputLabelProps={{
                            shrink: true
                        }}
                        size="small"
                        error={inputError.coD_PUESTO}
                        select
                        label="Puesto Laboral"
                        type="text"
                        onChange={handleInputChange}
                        value={fields.coD_PUESTO}
                    >
                        <MenuItem value={null}>
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
                <Grid
                    item md={3} sm={12} xs={12}>
                    <TextField
                        name="coD_CONDICION"
                        fullWidth
                        InputLabelProps={{
                            shrink: true
                        }}
                        size="small"
                        error={inputError.coD_CONDICION}
                        select
                        label="Condición Laboral *"
                        type="text"
                        onChange={handleInputChange}
                        value={fields.coD_CONDICION}
                    >
                        {condicion &&
                            condicion.map(condicion => (
                                <MenuItem value={condicion.coD_CONDICION}>
                                    {condicion.noM_CONDICION}
                                </MenuItem>
                            ))}
                    </TextField>
                </Grid>
                <Grid item md={12} />
                <Grid
                    item md={2.5} sm={12} xs={12}>
                    <TextField
                        name="coD_TIPOTRABAJ"
                        fullWidth
                        InputLabelProps={{
                            shrink: true
                        }}
                        size="small"
                        error={inputError.coD_TIPOTRABAJ}
                        select
                        label="Tipo Trabajador *"
                        type="text"
                        onChange={handleInputChange}
                        value={fields.coD_TIPOTRABAJ}
                    >
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
                                        InputLabelProps={{
              shrink: true
            }}
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
                <Grid
                    item md={2.5} sm={12} xs={12}>
                    <TextField
                        name="coD_AFP"
                        fullWidth
                        InputLabelProps={{
                            shrink: true
                        }}
                        size="small"
                        error={inputError.coD_AFP}
                        select
                        label="Fondo A.F.P *"
                        type="text"
                        onChange={handleInputChange}
                        value={fields.coD_AFP}
                    >
                        {afps &&
                            afps.map(afp => (
                                <MenuItem value={afp.coD_AFP}>
                                    {afp.noM_AFP}
                                </MenuItem>
                            ))}
                    </TextField>
                </Grid>
                <Grid item md={2} sm={12} xs={12}>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DesktopDatePicker
                            label="Afiliado AFP"
                            inputFormat="dd-MM-yyyy"
                            value={fields.feC_CUSPP}
                            onChange={e =>
                                handleInputChangeDate(e, 'feC_CUSPP')}
                            renderInput={(params) => <TextField fullWidth
                                InputLabelProps={{
                                    shrink: true
                                }}
                                size="small"
                                error={inputError.feC_CUSPP} {...params} />}
                        />
                    </LocalizationProvider>
                </Grid>
                <Grid item md={2} sm={12} xs={12}>
                    <TextField
                        name="nuM_PLAZA"
                        fullWidth
                        InputLabelProps={{
                            shrink: true
                        }}
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
                    item md={3} sm={12} xs={12}>
                    <TextField
                        name="coD_BCOSUELDO"
                        fullWidth
                        InputLabelProps={{
                            shrink: true
                        }}
                        size="small"
                        error={inputError.coD_BCOSUELDO}
                        select
                        label="Banco Sueldo"
                        type="text"
                        onChange={handleInputChange}
                        value={fields.coD_BCOSUELDO}
                    >
                        <MenuItem value={null}>
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
                    item md={3} sm={12} xs={12}>
                    <TextField
                        name="nuM_CTASUELDO"
                        fullWidth
                        InputLabelProps={{
                            shrink: true
                        }}
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
                    item md={3} sm={12} xs={12}>
                    <TextField
                        name="nuM_CCI"
                        fullWidth
                        InputLabelProps={{
                            shrink: true
                        }}
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
                    item md={3} sm={12} xs={12}>
                    <TextField
                        name="coD_BCOCTS"
                        fullWidth
                        InputLabelProps={{
                            shrink: true
                        }}
                        size="small"
                        error={inputError.coD_BCOCTS}
                        select
                        label="Banco CTS"
                        type="text"
                        onChange={handleInputChange}
                        value={fields.coD_BCOCTS}
                    >
                        <MenuItem value={null}>
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
                    item md={3} sm={12} xs={12}>
                    <TextField
                        name="nuM_CTACTS"
                        fullWidth
                        InputLabelProps={{
                            shrink: true
                        }}
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
                    item md={3} sm={12} xs={12}>
                    <TextField
                        name="coD_CUSPP"
                        fullWidth
                        InputLabelProps={{
                            shrink: true
                        }}
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
                    item md={3} sm={12} xs={12}>
                    <TextField
                        name="inD_REGLABORAL"
                        fullWidth
                        InputLabelProps={{
                            shrink: true
                        }}
                        size="small"
                        error={inputError.inD_REGLABORAL}
                        select
                        label="Tipo Reg. Laboral *"
                        type="text"
                        onChange={handleInputChange}
                        value={fields.inD_REGLABORAL}
                    >
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
                    item md={3} sm={12} xs={12}>
                    <TextField
                        name="inD_REGPENSION"
                        fullWidth
                        InputLabelProps={{
                            shrink: true
                        }}
                        size="small"
                        error={inputError.inD_REGPENSION}
                        select
                        label="Tipo Reg. Pension *"
                        type="text"
                        onChange={handleInputChange}
                        value={fields.inD_REGPENSION}
                    >
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
                    item md={3} sm={12} xs={12}>
                    <TextField
                        name="coD_ESSALUD"
                        fullWidth
                        InputLabelProps={{
                            shrink: true
                        }}
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
                    item md={3} sm={12} xs={12}>
                    <TextField
                        name="coD_REGLABORAL"
                        fullWidth
                        InputLabelProps={{
                            shrink: true
                        }}
                        size="small"
                        error={inputError.coD_REGLABORAL}
                        select
                        label="Regimen Laboral *"
                        type="text"
                        onChange={handleInputChange}
                        value={fields.coD_REGLABORAL}
                    >
                        {rLaboral &&
                            rLaboral.map(rLaboral => (
                                <MenuItem value={rLaboral.coD_REGLABORAL}>
                                    {rLaboral.noM_REGLABORAL}
                                </MenuItem>
                            ))}
                    </TextField>
                </Grid>
                <Grid
                    item md={3} sm={12} xs={12}>
                    <TextField
                        name="coD_REGPENSION"
                        fullWidth
                        InputLabelProps={{
                            shrink: true
                        }}
                        size="small"
                        error={inputError.coD_REGPENSION}
                        select
                        label="Regimen Pension *"
                        type="text"
                        onChange={handleInputChange}
                        value={fields.coD_REGPENSION}
                    >
                        {rPension &&
                            rPension.map(rPension => (
                                <MenuItem value={rPension.coD_REGPENSION}>
                                    {rPension.noM_REGPENSION}
                                </MenuItem>
                            ))}
                    </TextField>
                </Grid>
                <Grid
                    item md={3} sm={12} xs={12}>
                    <TextField
                        name="coD_SEGSALUD"
                        fullWidth
                        InputLabelProps={{
                            shrink: true
                        }}
                        size="small"
                        error={inputError.coD_SEGSALUD}
                        select
                        label="Regimen Seg. Salud *"
                        type="text"
                        onChange={handleInputChange}
                        value={fields.coD_SEGSALUD}
                    >
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
                    item md={3} sm={12} xs={12}>
                    <TextField
                        name="coD_OCUPLABORAL"
                        fullWidth
                        InputLabelProps={{
                            shrink: true
                        }}
                        size="small"
                        error={inputError.coD_OCUPLABORAL}
                        select
                        label="Ocupación Laboral *"
                        type="text"
                        onChange={handleInputChange}
                        value={fields.coD_OCUPLABORAL}
                    >
                        {ocupacionLaboral &&
                            ocupacionLaboral.map(ocupacionLaboral => (
                                <MenuItem value={ocupacionLaboral.coD_OCUPLABORAL}>
                                    {ocupacionLaboral.noM_OCUPLABORAL}
                                </MenuItem>
                            ))}
                    </TextField>

                </Grid>
                <Grid
                    item md={3} sm={12} xs={12}>
                    <TextField
                        name="inD_SITESPECIAL"
                        fullWidth
                        InputLabelProps={{
                            shrink: true
                        }}
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
                    item md={3} sm={12} xs={12}>
                    <TextField
                        name="coD_CATOCUPACION"
                        fullWidth
                        InputLabelProps={{
                            shrink: true
                        }}
                        size="small"
                        error={inputError.coD_CATOCUPACION}
                        select
                        label="Categoria Ocupación *"
                        type="text"
                        onChange={handleInputChange}
                        value={fields.coD_CATOCUPACION}
                    >
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
                    item md={3} sm={12} xs={12}>
                    <TextField
                        name="inD_DISCAPACIDAD"
                        fullWidth
                        InputLabelProps={{
                            shrink: true
                        }}
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
                    item md={3} sm={12} xs={12}>
                    <TextField
                        name="inD_SINDICALIZADO"
                        fullWidth
                        InputLabelProps={{
                            shrink: true
                        }}
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
                    item md={3} sm={12} xs={12}>
                    <TextField
                        name="inD_DOBLETRIBUTO"
                        fullWidth
                        InputLabelProps={{
                            shrink: true
                        }}
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
                <Grid item md={12} />
                <Grid
                    item md={3} sm={12} xs={12}>
                    <TextField
                        name="inD_TIPOPAGO"
                        fullWidth
                        InputLabelProps={{
                            shrink: true
                        }}
                        size="small"
                        error={inputError.inD_TIPOPAGO}
                        select
                        label="Tipo de Pago"
                        type="text"
                        onChange={handleInputChange}
                        value={fields.inD_TIPOPAGO}
                    >
                        <MenuItem value={null}>
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
                <Grid
                    item md={3} sm={12} xs={12}>
                    <TextField
                        name="inD_PLAME"
                        fullWidth
                        InputLabelProps={{
                            shrink: true
                        }}
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
                    item md={3} sm={12} xs={12}>
                    <TextField
                        name="inD_NOSEGUROAFP"
                        fullWidth
                        InputLabelProps={{
                            shrink: true
                        }}
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
                    item md={3} sm={12} xs={12}>
                    <TextField
                        name="coD_TURNO"
                        fullWidth
                        InputLabelProps={{
                            shrink: true
                        }}
                        size="small"
                        error={inputError.coD_TURNO}
                        select
                        label="Turno"
                        onChange={handleInputChange}
                        value={fields.coD_TURNO}
                    >
                            {turno &&
                                turno.map(turno => (
                                    <MenuItem value={turno.coD_TURNO}>
                                        {turno.noM_TURNO}
                                    </MenuItem>
                                ))}
                    </TextField>
                </Grid>
                <Grid item md={3} sm={12} xs={12} />
                <Grid item md={3} sm={12} xs={12} />
                <Grid item md={9} />
                <Grid
                    item md={9} sm={12} xs={12}>
                    <TextField
                        label="Observaciones"
                        multiline
                        fullWidth
                        InputLabelProps={{
                            shrink: true
                        }}
                        size="small"
                        error={inputError.obS_TRABAJADOR}
                        rows={2}
                        name="obS_TRABAJADOR"
                        onChange={handleInputChange}
                        value={fields.obS_TRABAJADOR}
                    />
                </Grid>
                <Grid item md={12} />
                <Grid item md={9}>
                    <h3>Contrato</h3>
                </Grid>
                <Grid item md={12} />
                <Grid
                    item md={3} sm={12} xs={12}>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DesktopDatePicker
                            label="Inicio de contrato"
                            inputFormat="dd-MM-yyyy"
                            value={fields.feC_INI_CONTRATO}
                            onChange={e =>
                                handleInputChangeDate(e, 'feC_INI_CONTRATO')}
                            renderInput={(params) => <TextField fullWidth
                                InputLabelProps={{
                                    shrink: true
                                }}
                                size="small"
                                {...params} />}
                        />
                    </LocalizationProvider>
                </Grid>
                <Grid
                    item md={3} sm={12} xs={12}>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DesktopDatePicker
                            label="Fin de contrato"
                            inputFormat="dd-MM-yyyy"
                            value={fields.feC_FIN_CONTRATO}
                            onChange={e =>
                                handleInputChangeDate(e, 'feC_FIN_CONTRATO')}
                            renderInput={(params) => <TextField fullWidth
                                InputLabelProps={{
                                    shrink: true
                                }}
                                size="small"
                                {...params} />}
                        />
                    </LocalizationProvider>
                </Grid>
                <Grid
                    item md={3} sm={12} xs={12}>
                    <TextField
                        name="nrO_CONTRATO"
                        fullWidth
                        InputLabelProps={{
                            shrink: true
                        }}
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
                <Grid item md={9} xs={12} sx={{ marginTop: 2 }}>
                    <Button onClick={() => {
                        back()
                    }} variant="contained">
                        < ArrowBackIosNewIcon />
                        Regresar
                    </Button>
                    <Button style={{ marginLeft: 10 }} onClick={handleFields} variant="contained" >
                        Guardar
                    </Button>
                </Grid>
            </Grid>
        </>
    )
}
export default RegisterSteps;