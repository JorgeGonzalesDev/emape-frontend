import { Grid, TextField, MenuItem, Button, Tooltip, IconButton } from "@mui/material";
import { useState, useEffect, useRef } from "react";
import MUIModal from "../../components/Modal";
import { deleteOneFamWorker, getFamWorker, getOneFamWorker } from "../../service/worker";
import { AlertError, AlertSuccess, AlertWarning } from "../Alerts";
import DataGridDemo from "../Table";
import EditIcon from "@mui/icons-material/Edit";
import PersonOffIcon from "@mui/icons-material/PersonOff";
import { AlertDelete } from "../Alerts";

import {
    GridActionsCellItem,
    GridToolbarContainer,
    GridToolbarColumnsButton,
    GridToolbarFilterButton,
    GridToolbarExport,
    GridToolbarDensitySelector,
} from "@mui/x-data-grid";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import SchoolIcon from "@mui/icons-material/School";
import { listPerson } from "../../service/person";
import { getTipoPariente } from "../../service/common";
import { AddOrUpdateFamWorker } from "../../service/worker";

const RegisterSteps = ({
    back,
    id,
}) => {

    function CustomToolbar() {
        return (
            <GridToolbarContainer>
                <Button size="small" variant="text" onClick={OpenRegister}>
                    <SchoolIcon />
                    <span>&nbsp;&nbsp;&nbsp;Agregar</span>
                </Button>
                <GridToolbarColumnsButton />
                <GridToolbarFilterButton />
                <GridToolbarDensitySelector />
                <GridToolbarExport />
            </GridToolbarContainer>
        );
    }

    const [fields, setFields] = useState({
        "coD_TRAFAM": 0,
        "coD_TRABAJADOR": id,
        "coD_PERS": 0,
        "coD_TIPPARIENTE": null,
        "inD_DEPENDE": null,
        "inD_JUDICIAL": null,
        "inD_CALCULO": null,
        "moN_FIJO": null,
        "prC_JUDICIAL": null,
        "coD_CTABCO": null,
        "coD_BANCO": null,
        "nuM_CCI": null
    });

    const levelEducateChild = useRef();
    const [data, setData] = useState([]);
    const [data2, setData2] = useState([]);
    const [tipoPariente, setTipoPariente] = useState([]);
    const loadData = async () => {
        const response = await getFamWorker(id);
        if (response.listado === null) {
            setData([])
        } else {
            setData(response.listado);
        }
    }

    const edit = async (event, id) => {
        const response = await getOneFamWorker(id);
        setNamePerson(`${response.listado[0].dPersona.deS_APELLP} ${response.listado[0].dPersona.deS_APELLM} ${response.listado[0].dPersona.noM_PERS}`)
        fields.coD_TRAFAM = response.listado[0].coD_TRAFAM
        fields.coD_PERS = response.listado[0].coD_PERS
        fields.coD_TIPPARIENTE = response.listado[0].coD_TIPPARIENTE
        fields.inD_DEPENDE = response.listado[0].inD_DEPENDE
        fields.inD_JUDICIAL = response.listado[0].inD_JUDICIAL
        levelEducateChild.current.handleOpen();
        const response2 = await listPerson();
        const responseTipo = await getTipoPariente();
        setTipoPariente(responseTipo.listado)
        setData2(response2.listado);
    }

    const destroy = async (event, id) => {

        const resultado = await AlertDelete("¿Estas seguro de esta acción?");
        if (resultado) {
            const request = {
                "coD_TRAFAM": id
            }
            await deleteOneFamWorker(request);
            await loadData()
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

    const OpenRegister = async () => {
        setNamePerson("")
        fields.coD_TRAFAM = 0
        fields.coD_PERS = 0
        fields.coD_TIPPARIENTE = null
        fields.inD_DEPENDE = null
        fields.inD_JUDICIAL = null
        fields.inD_CALCULO = null
        fields.moN_FIJO = null
        fields.prC_JUDICIAL = null
        fields.coD_CTABCO = null
        fields.coD_BANCO = null
        fields.nuM_CCI = null
        levelEducateChild.current.handleOpen();
        const response = await listPerson();
        const responseTipo = await getTipoPariente();
        setTipoPariente(responseTipo.listado)
        setData2(response.listado);
    };

    const [namePerson, setNamePerson] = useState("");

    const handleFields = async () => {

        const response = await AddOrUpdateFamWorker(fields)

        if (response.code === 0) {
            await loadData();
            levelEducateChild.current.handleClose();
            await AlertSuccess(`${response.message}`)
            namePerson = ""
            fields.coD_TRAFAM = 0
            fields.coD_PERS = 0
            fields.coD_TIPPARIENTE = null
            fields.inD_DEPENDE = null
            fields.inD_JUDICIAL = null
            fields.inD_CALCULO = null
            fields.moN_FIJO = null
            fields.prC_JUDICIAL = null
            fields.coD_CTABCO = null
            fields.coD_BANCO = null
            fields.nuM_CCI = null

        } else {
            levelEducateChild.current.handleClose();
            return await AlertError(`${response.message}`)
        }

    }

    const columns2 = [
        {
            field: "acciones",
            type: "actions",
            disableExport: true,
            getActions: (cellValues) => [
                <GridActionsCellItem
                    onClick={async () => {
                        setNamePerson(`${cellValues.row.deS_APELLP} ${cellValues.row.deS_APELLM} ${cellValues.row.noM_PERS}`)
                        fields.coD_PERS = cellValues.row.coD_PERS
                    }}
                    icon={<AddCircleOutlineIcon />} label="Edit" />
            ],
        },
        {
            field: "coD_PERS",
            headerName: "Código",
            width: 120,
        },
        {
            field: "full_name",
            headerName: "Apellidos y Nombres",
            width: 400,
            valueGetter: (params) =>
                `${params.row.deS_APELLP || ""} ${params.row.deS_APELLM || ""} ${params.row.noM_PERS || ""
                }`,
        },
        {
            field: "nuM_DOC",
            headerName: "Documento",
            width: 160,
        }
    ];

    const columns = [
        {
            field: "acciones",
            type: "actions",
            disableExport: false,
            getActions: (cellValues) => [

                <Tooltip title="Editar">
                    <IconButton
                        onClick={(event) => {
                            edit(event, cellValues.row.coD_TRAFAM);
                        }}>
                        <EditIcon />
                    </IconButton>
                </Tooltip>
                ,
                <Tooltip title="Desactivar">
                    <IconButton onClick={(event) => {
                        destroy(event, cellValues.row.coD_TRAFAM);
                    }}>
                        <PersonOffIcon />
                    </IconButton>
                </Tooltip>,
            ],
        },
        {
            field: "coD_TRAFAM",
            headerName: "Código",
            width: 120,
        },
        {
            field: "full_name",
            headerName: "Apellidos y Nombres",
            width: 400,
            valueGetter: (params) =>
                `${params.row?.dPersona?.deS_APELLP || ""} ${params.row.dPersona?.deS_APELLM || ""} ${params.row?.dPersona?.noM_PERS || ""}`,
        },
        {
            field: "Parentesco",
            headerName: "Documento",
            width: 160,
            valueGetter: (params) =>
                `${params.row?.dTipoPariente?.noM_TIPPARIENTE}`
        },
    ];

    return (
        <>
            <Grid container spacing={1}>
                <Grid item md={12} xs={12} sm={12}>
                    <Grid item md={12}>
                        <DataGridDemo
                            id={(row) => row?.coD_TRAFAM}
                            rows={data}
                            columns={columns}
                            toolbar={CustomToolbar}
                        />
                    </Grid>
                </Grid>
            </Grid>
            <MUIModal ref={levelEducateChild}>
                <Grid container spacing={1} >

                    <Grid item md={6} sm={12} xs={12}>
                        <TextField
                            name="namePersona"
                            fullWidth
                            InputLabelProps={{
                                readOnly: true
                            }}
                            label="Nombres y apellidos"
                            type="text"
                            size="small"
                            value={namePerson}
                        />
                    </Grid>
                    <Grid item md={4} sm={12} xs={12}>
                        <TextField
                            name="coD_TIPPARIENTE"
                            fullWidth
                            InputLabelProps={{
                                shrink: true
                            }}
                            size="small"
                            select
                            label="Parentesco"
                            type="text"
                            onChange={handleInputChange}
                            value={fields.coD_TIPPARIENTE}
                        >
                            <MenuItem value="0" disabled>
                                Sin especificar
                            </MenuItem>
                            {tipoPariente &&
                                tipoPariente.map(tipoPariente => (
                                    <MenuItem value={tipoPariente.coD_TIPPARIENTE}>
                                        {tipoPariente.noM_TIPPARIENTE}
                                    </MenuItem>
                                ))}
                        </TextField>
                    </Grid>
                    <Grid item md={12} />
                    <Grid
                        item md={2} sm={12} xs={12}>
                        <TextField
                            name="inD_DEPENDE"
                            fullWidth
                            InputLabelProps={{
                                shrink: true
                            }}
                            size="small"
                            select
                            label="Dependiente"
                            type="text"
                            onChange={handleInputChange}
                            value={fields.inD_DEPENDE}
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
                            name="inD_JUDICIAL"
                            fullWidth
                            InputLabelProps={{
                                shrink: true
                            }}
                            size="small"
                            select
                            label="Carga Judicial"
                            type="text"
                            onChange={handleInputChange}
                            value={fields.inD_JUDICIAL}
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
                    <Grid item md={12}>
                        <Button onClick={handleFields} variant="contained" >
                            Guardar
                        </Button>
                    </Grid>
                    <Grid item md={12} />
                    <Grid item md={12}>
                        <DataGridDemo
                            height='60vh'
                            id={(row) => row.coD_PERS}
                            rows={data2}
                            columns={columns2}
                            numberSize={10}
                        />
                    </Grid>
                </Grid>
            </MUIModal>
        </>
    )


}
export default RegisterSteps;