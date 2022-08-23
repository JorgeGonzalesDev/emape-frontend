import { Grid, TextField, MenuItem, Button, Checkbox, FormControlLabel } from "@mui/material";
import { useState, useEffect } from "react";
import Register from "../../views/Person/Register";
import { getCargo } from "../../service/position";
import { listAFPS } from "../../service/afp";
import {
    getBanks, getTypeWorker,
    getRSalud, getRPension,
    getPuestoLaboral, getUnidad, getCondicion,
    getRLaboral, getOcupacionL, getCategoriaO
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
        feC_INGRESO: moment(new Date()).format(),
        coD_CAR: 0,
        feC_CESE: moment(new Date()).format(),
        coD_PUESTO: 0,
        coD_CONDICION: 0,
        coD_TIPOTRABAJ: 0,
        coD_AFP: 0,
        nuM_PLAZA: "",
        coD_BCOSUELDO: 0,
        nuM_CTASUELDO: "",
        nuM_CCI: "",
        coD_BCOCTS: 0,
        nuM_CTACTS: "",
        coD_CUSPP: "",
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
        inD_PLAME: "",
        obS_TRABAJADOR: "",
        inD_NOSEGUROAFP: "",
        nrO_CONTRATO: "",
        feC_INI_CONTRATO: moment(new Date()).format(),
        feC_FIN_CONTRATO: moment(new Date()).format(),
    });

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

    const loadData = async () => {

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

        if (codeW) {
            const response = await getWorker(codeW);
            if (response.listado) {
                setFields({
                    coD_TRABAJADOR: response.listado[0]['coD_TRABAJADOR'],
                    coD_PERS: response.listado[0]['coD_PERS'],
                    coD_UORG: response.listado[0]['coD_UORG'],
                    feC_INGRESO: response.listado[0]['feC_INGRESO'],
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
                    coD_ESSALUD: response.listado[0]['coD_ESSALUD'],
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
        }

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

    const handleFields = async () => {

        const response = await AddOrUpdateWorker(fields)

        if (response.code === 0) {

            await Swal.fire({
                icon: 'success',
                title: 'Datos ingresados con exito',
                showConfirmButton: false,
                timer: 1500
            })

            return window.location = "/trabajador"

        } else {
            return Swal.fire({
                icon: 'error',
                title: 'Ha ocurrido un error al ingresar los datos',
                showConfirmButton: false,
                timer: 1500
            })
        }

    }

    const Steps = () => {

        if (step === 1) {

            return (
                <>
                    <Grid item md={12} sm={12}>
                        <h2>Datos Generales</h2>
                    </Grid>
                    <Grid
                        item md={4} xs={12}>
                        <TextField
                            fullWidth
                            label="Nombre"
                            type='text'
                            inputProps={
                                { readOnly: true, }
                            }
                            value={`${fullName}`}
                        />
                    </Grid>
                    <Grid item md={12} />
                    <Grid
                        item md={4} sm={12} xs={12}>
                        <TextField
                            name="coD_UORG"
                            fullWidth
                            select
                            label="Area Laboral"
                            type="text"
                            onChange={handleInputChange}
                            value={fields.coD_UORG}
                        >
                            <MenuItem value="0">
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
                                renderInput={(params) => <TextField fullWidth {...params} />}
                            />
                        </LocalizationProvider>
                    </Grid>
                    <Grid item md={12} />
                    <Grid item md={4} sm={12} xs={12}>
                        <TextField
                            name="coD_CAR"
                            fullWidth
                            select
                            label="Cargo Laboral"
                            type="text"
                            onChange={handleInputChange}
                            value={fields.coD_CAR}
                        >
                            <MenuItem value="0">
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
                    <Grid item md={3} sm={12} xs={12}>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DesktopDatePicker
                                label="Fecha de cese"
                                inputFormat="dd-MM-yyyy"
                                value={moment(fields.feC_CESE).format()}
                                onChange={e =>
                                    handleInputChangeDate(e, 'feC_CESE')}
                                renderInput={(params) => <TextField fullWidth {...params} />}
                            />
                        </LocalizationProvider>
                    </Grid>
                    <Grid item md={12} />
                    <Grid
                        item md={4} sm={12} xs={12}>
                        <TextField
                            name="coD_PUESTO"
                            fullWidth
                            select
                            label="Puesto Laboral"
                            type="text"
                            onChange={handleInputChange}
                            value={fields.coD_PUESTO}
                        >
                            <MenuItem value="0">
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
                            select
                            label="Condición Laboral"
                            type="text"
                            onChange={handleInputChange}
                            value={fields.coD_CONDICION}
                        >
                            <MenuItem value="0">
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
                            select
                            label="Tipo Trabajador"
                            type="text"
                            onChange={handleInputChange}
                            value={fields.coD_TIPOTRABAJ}
                        >
                            <MenuItem value="0" >
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
                    <Grid item md={12} />
                    <Grid
                        item md={4} sm={12} xs={12}>
                        <TextField
                            name="coD_AFP"
                            fullWidth
                            select
                            label="Fondo A.F.P"
                            type="text"
                            onChange={handleInputChange}
                            value={fields.coD_AFP}
                        >
                            <MenuItem value="0" >
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
                        <TextField
                            name="nuM_PLAZA"
                            fullWidth
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
                            select
                            label="Banco Sueldo"
                            type="text"
                            onChange={handleInputChange}
                            value={fields.coD_BCOSUELDO}
                        >
                            <MenuItem value="0">
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
                            select
                            label="Banco CTS"
                            type="text"
                            onChange={handleInputChange}
                            value={fields.coD_BCOCTS}
                        >
                            <MenuItem value="0">
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
                            select
                            label="Tipo Reg. Laboral"
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
                        item md={4} sm={12} xs={12}>
                        <TextField
                            name="inD_REGPENSION"
                            fullWidth
                            select
                            label="Tipo Reg. Pension"
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
                        item md={4} sm={12} xs={12}>
                        <TextField
                            name="coD_ESSALUD"
                            fullWidth
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
                            select
                            label="Regimen Laboral"
                            type="text"
                            onChange={handleInputChange}
                            value={fields.coD_REGLABORAL}
                        >
                            <MenuItem value="0" >
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
                            select
                            label="Regimen Pension"
                            type="text"
                            onChange={handleInputChange}
                            value={fields.coD_REGPENSION}
                        >
                            <MenuItem value="0" >
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
                            select
                            label="Regimen Seg. Salud"
                            type="text"
                            onChange={handleInputChange}
                            value={fields.coD_SEGSALUD}
                        >
                            <MenuItem value="0">
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
                            select
                            label="Ocupación Laboral"
                            type="text"
                            onChange={handleInputChange}
                            value={fields.coD_OCUPLABORAL}
                        >
                            <MenuItem value="0">
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
                            select
                            label="Categoria Ocupación"
                            type="text"
                            onChange={handleInputChange}
                            value={fields.coD_CATOCUPACION}
                        >
                            <MenuItem value="0">
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
                            select
                            label="Tipo de Pago"
                            type="text"
                            onChange={handleInputChange}
                            value={fields.inD_TIPOPAGO}
                        >
                            <MenuItem value="0">
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
                                renderInput={(params) => <TextField fullWidth {...params} />}
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
                                renderInput={(params) => <TextField fullWidth {...params} />}
                            />
                        </LocalizationProvider>
                    </Grid>
                    <Grid
                        item md={4} sm={12} xs={12}>
                        <TextField
                            name="nrO_CONTRATO"
                            fullWidth
                            label="Numero de Contrato"
                            onChange={handleInputChange}
                            value={fields.nrO_CONTRATO}
                            type="text"
                        >
                        </TextField>
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
                <Grid item md={12}>
                    <Button variant="contained" onClick={() => {
                        handleFields();
                    }}>
                        Registrar
                    </Button>
                </Grid>
            </Grid>
        </>
    )


}
export default RegisterSteps;