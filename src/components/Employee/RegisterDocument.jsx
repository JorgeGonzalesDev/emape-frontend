import DataGridDemo from "../Table";
import { Grid, Button, MenuItem, TextField } from "@mui/material";
import { useState, useEffect, useRef } from "react";
import { AlertDelete } from "../Alerts";
import MUIModal from "../../components/Modal";
import { getPerson, listPerson } from "../../service/person";
import { getTipoPariente, getDocumento, getDocumentoByID } from "../../service/common";
import { listTrabajadorDocumento, deleteTrabajadorDocumento, getTrabajadorDocumento, AddOrUpdateTrabajadorDocumento } from "../../service/employee/labordocument";
import {
    GridActionsCellItem,
    GridToolbarContainer,
    GridToolbarColumnsButton,
    GridToolbarFilterButton,
    GridToolbarExport,
    GridToolbarDensitySelector,
} from '@mui/x-data-grid';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { AlertSuccess, AlertError } from "../Alerts";


const RegisterDocument = (
    { id }
) => {

    const [fields, setFields] = useState({
        coD_TRAEDU: 0,
        coD_TRABAJADOR: id,
        inD_DOCTRAB: null,
        coD_DOC: null,
        coD_PERS: null,
        coD_TIPPARIENTE: null,
        obS_DOCUMENTO: null,
        coD_USUREG: 269,
        coD_USUMOD: 269
    });

    const [data, setData] = useState([]);
    const [data2, setData2] = useState([]);
    const [tipoPariente, setTipoPariente] = useState([]);
    const [documento, setDocumento] = useState([]);
    const loadData = async () => {
        const response = await listTrabajadorDocumento(id);
        if (response.listado === null) {
            setData([])
        } else {
            setData(response.listado);
        }
        const response2 = await listPerson();
        const responseTipo = await getTipoPariente();
        const responseDocumento = await getDocumento();
        setTipoPariente(responseTipo.listado)
        setData2(response2.listado);
        setDocumento(responseDocumento.listado)
    };

    const [namePerson, setNamePerson] = useState("");

    const destroy = async (event, id) => {
        const resultado = await AlertDelete();

        if (resultado) {
            const dataDelete = {
                'coD_TRADOC': id
            };
            await deleteTrabajadorDocumento(dataDelete);
            await loadData();
        }
    };

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

    const levelEducateChild = useRef();

    useEffect(() => {

        loadData();
    }, []);

    const OpenRegister = async () => {
        setNamePerson("")
        setFields({
            coD_TRAEDU: 0,
            coD_TRABAJADOR: id,
            inD_DOCTRAB: null,
            coD_DOC: null,
            coD_PERS: null,
            coD_TIPPARIENTE: null,
            obS_DOCUMENTO: null,
            coD_USUREG: 269,
            coD_USUMOD: 269
        })
        levelEducateChild.current.handleOpen();
    };

    const handleInputChange = async (event) => {

        const { name, type, checked, value } = event.target;
        const val = type === 'checkbox' ? checked : value;

        if (name === 'coD_DOC') {
            const response = await getDocumentoByID(val)
            fields.obS_DOCUMENTO = response.listado[0].deS_DOC
            setFields({
                ...fields,
                [name]: val,
            });
            return
        }

        setFields({
            ...fields,
            [name]: val,
        });

    }

    const columns = [
        {
            field: 'Acciones',
            type: 'actions',
            getActions: (cellValues) => [
                <GridActionsCellItem
                    icon={<EditIcon />}
                    label="Edit"
                    onClick={(event) => {
                        edit(event, cellValues.row.coD_TRADOC);
                    }}
                />,
                <GridActionsCellItem
                    icon={<DeleteIcon />}
                    label="Delete"
                    onClick={(event) => {
                        destroy(event, cellValues.row.coD_TRADOC);
                    }}
                />,

            ],
        },
        {
            field: 'coD_TRADOC',
            headerName: 'Código',
            width: 200
        },
        {
            field: 'obS_DOCUMENTO',
            headerName: 'Documento',
            width: 100
        }
    ];

    function CustomToolbar() {
        return (
            <GridToolbarContainer>
                <Button size="small" variant="text" onClick={OpenRegister}>
                    <AddCircleIcon />
                    <span>&nbsp;&nbsp;&nbsp;Agregar</span>
                </Button>
                <GridToolbarColumnsButton />
                <GridToolbarFilterButton />
                <GridToolbarDensitySelector />
                <GridToolbarExport />
            </GridToolbarContainer>
        );
    }

    const handleFields = async () => {

        const response = await AddOrUpdateTrabajadorDocumento(fields)

        if (response.code === 0) {
            await loadData();
            levelEducateChild.current.handleClose();
            await AlertSuccess(`${response.message}`)
            setNamePerson("")
            setFields({
                coD_TRADOC: 0,
                coD_TRABAJADOR: id,
                inD_DOCTRAB: null,
                coD_DOC: null,
                coD_PERS: null,
                coD_TIPPARIENTE: null,
                obS_DOCUMENTO: null,
                coD_USUREG: 269,
                coD_USUMOD: 269
            })

        } else {
            levelEducateChild.current.handleClose();
            return await AlertError(`${response.message}`)
        }

    }

    const edit = async (event, idT) => {
        const response = await getTrabajadorDocumento(idT);
        const responseP = await getPerson(response.listado[0].coD_PERS)
        setNamePerson(`${responseP.listado[0].deS_APELLP} ${responseP.listado[0].deS_APELLM} ${responseP.listado[0].noM_PERS}`)
        setFields({
            coD_TRADOC: idT,
            coD_TRABAJADOR: id,
            inD_DOCTRAB: response.listado[0].inD_DOCTRAB,
            coD_DOC: response.listado[0].coD_DOC,
            coD_PERS: response.listado[0].coD_PERS,
            coD_TIPPARIENTE: response.listado[0].coD_TIPPARIENTE,
            obS_DOCUMENTO: response.listado[0].obS_DOCUMENTO,
        })
        levelEducateChild.current.handleOpen();
    }

    return (
        <>
            <Grid container spacing={1}>
                <Grid item md={12} xs={12} sm={12}>
                    <Grid item md={12}>
                        <DataGridDemo id={(row) => row.coD_TRADOC}
                            rows={data} columns={columns} toolbar={CustomToolbar} />
                    </Grid>
                </Grid>
            </Grid>
            <MUIModal ref={levelEducateChild}>
                <Grid container spacing={1.5} >
                    <Grid item md={3} sm={12} xs={12}>
                        <TextField
                            fullWidth
                            InputLabelProps={{
                                shrink: true
                            }}
                            name="inD_DOCTRAB"
                            select
                            label="Tipo"
                            size="small"
                            onChange={handleInputChange}
                            value={fields.inD_DOCTRAB}
                        >
                            <MenuItem value="P">
                                PERSONAL
                            </MenuItem>
                            <MenuItem value="F">
                                FAMILIAR
                            </MenuItem>
                        </TextField>
                    </Grid>
                    <Grid item md={3} sm={12} xs={12}>
                        <TextField
                            name="coD_DOC"
                            fullWidth
                            InputLabelProps={{
                                shrink: true
                            }}
                            size="small"
                            select
                            label="Documento"
                            type="text"
                            onChange={handleInputChange}
                            value={fields.coD_DOC}
                        >
                            {documento &&
                                documento.map(documento => (
                                    <MenuItem value={documento.coD_DOC}>
                                        {documento.deS_DOC}
                                    </MenuItem>
                                ))}
                        </TextField>
                    </Grid>
                    <Grid item md={12} />
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
                            {tipoPariente &&
                                tipoPariente.map(tipoPariente => (
                                    <MenuItem value={tipoPariente.coD_TIPPARIENTE}>
                                        {tipoPariente.noM_TIPPARIENTE}
                                    </MenuItem>
                                ))}
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
                            height='50vh'
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

export default RegisterDocument;