import DataGridDemo from "../Table";
import { Grid, Button, TextField, MenuItem } from "@mui/material";
import { useState, useEffect, useRef } from "react";
import moment from 'moment';
import { AlertDelete } from "../Alerts";
import MUIModal from "../../components/Modal";
import {
    listTrabajadorAcciones,
    getTrabajadorAcciones, deleteTrabajadorAcciones,
    AddOrUpdateTrabajadorAcciones
} from "../../service/employee/laboraction";
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
import { AlertSuccess, AlertError } from "../Alerts";
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { getTipoAcciones } from "../../service/common";

const RegisterAction = (
    { id }
) => {
    const [fields, setFields] = useState({
        coD_TRAACC: 0,
        coD_TRABAJADOR: id,
        coD_ACCION: null,
        feC_ACCION: null,
        nuM_REFDOC: null,
        noM_INSTITUCION: null,
        deS_REFERENCIA: null,
        feC_INICIO: null,
        feC_TERMINO: null,
    });

    const [data, setData] = useState([]);
    const levelEducateChild = useRef();
    const [tipoAccion, setTipoAccion] = useState([]);

    const loadData = async () => {
        const response = await listTrabajadorAcciones(id);
        const responseAcciones = await getTipoAcciones();
        setTipoAccion(responseAcciones.listado);
        if (response.listado === null) {
            setData([])
        } else {
            setData(response.listado);
        }
    };

    const destroy = async (event, id) => {
        const resultado = await AlertDelete();

        if (resultado) {
            const dataDelete = {
                'coD_TRAACC': id
            };
            await deleteTrabajadorAcciones(dataDelete);
            await loadData();
        }
    };

    const OpenRegister = async () => {
        setFields({
            coD_TRAACC: 0,
            coD_TRABAJADOR: id,
            coD_ACCION: null,
            feC_ACCION: null,
            nuM_REFDOC: null,
            noM_INSTITUCION: null,
            deS_REFERENCIA: null,
            feC_INICIO: null,
            feC_TERMINO: null,
        })
        levelEducateChild.current.handleOpen();

    };

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

    useEffect(() => {

        loadData();
    }, []);

    const columns = [
        {
            field: 'Acciones',
            type: 'actions',
            getActions: (cellValues) => [
                <GridActionsCellItem
                    icon={<EditIcon />}
                    label="Edit"
                    onClick={(event) => {
                        edit(event, cellValues.row.coD_TRAACC);
                    }}
                />,
                <GridActionsCellItem
                    icon={<DeleteIcon />}
                    label="Delete"
                    onClick={(event) => {
                        destroy(event, cellValues.row.coD_TRAACC);
                    }}
                />,

            ],
        },
        {
            field: 'coD_TRAACC',
            headerName: 'Código',
            width: 200
        },
        {
            field: "feC_ACCION",
            headerName: "Fecha",
            width: 160,
            valueGetter: (params) =>
                `${moment(params.row.feC_ACCION).format("DD/MM/YYYY")}`,
        },
        {
            field: "Action",
            headerName: "Acción",
            width: 160,
            valueGetter: (params) =>
                `${params.row.dTipoAcciones.noM_ACCION}`,
        },
        {
            field: 'nuM_REFDOC',
            headerName: 'N° Documento',
            width: 400
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

        const response = await AddOrUpdateTrabajadorAcciones(fields)

        if (response.code === 0) {
            await loadData();
            levelEducateChild.current.handleClose();
            await AlertSuccess(`${response.message}`)
            setFields({
                coD_TRAACC: 0,
                coD_TRABAJADOR: id,
                coD_ACCION: null,
                feC_ACCION: null,
                nuM_REFDOC: null,
                noM_INSTITUCION: null,
                deS_REFERENCIA: null,
                feC_INICIO: null,
                feC_TERMINO: null,
            })
        } else {
            levelEducateChild.current.handleClose();
            return await AlertError(`${response.message}`)
        }
    }

    const edit = async (event, idT) => {
        const response = await getTrabajadorAcciones(idT);
        setFields({
            coD_TRAACC: idT,
            coD_TRABAJADOR: id,
            noM_INSTITUCION: response.listado[0].noM_INSTITUCION,
            nuM_REFDOC: response.listado[0].nuM_REFDOC,
            deS_REFERENCIA: response.listado[0].deS_REFERENCIA,
            feC_ACCION: response.listado[0].feC_ACCION,
            coD_ACCION: response.listado[0].coD_ACCION,
            feC_INICIO: response.listado[0].feC_INICIO,
            feC_TERMINO: response.listado[0].feC_TERMINO,
        })
        levelEducateChild.current.handleOpen();
    }

    return (
        <>
            <Grid container spacing={1}>
                <Grid item md={12} xs={12} sm={12}>
                    <Grid item md={12}>
                        <DataGridDemo id={(row) => row.coD_TRAACC}
                            rows={data} columns={columns} toolbar={CustomToolbar} />
                    </Grid>
                </Grid>
            </Grid>
            <MUIModal ref={levelEducateChild}>
                <Grid container spacing={1.5} >
                    <Grid item md={4} sm={12} xs={12}>
                        <TextField
                            name="coD_ACCION"
                            fullWidth
                            InputLabelProps={{
                                shrink: true
                            }}
                            select
                            size="small"
                            label="Tipo"
                            onChange={handleInputChange}
                            value={fields.coD_ACCION}
                        >
                            {tipoAccion &&
                                tipoAccion.map(tipoAccion => (
                                    <MenuItem value={tipoAccion.coD_ACCION}>
                                        {tipoAccion.noM_ACCION}
                                    </MenuItem>
                                ))}
                        </TextField>
                    </Grid>
                    <Grid item md={12} />
                    <Grid item md={3} sm={12} xs={12}>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DesktopDatePicker
                                label="Fecha"
                                inputFormat="dd-MM-yyyy"
                                value={fields.feC_ACCION}
                                onChange={e =>
                                    handleInputChangeDate(e, 'feC_ACCION')}
                                renderInput={(params) => <TextField fullWidth
                                    InputLabelProps={{
                                        shrink: true
                                    }}
                                    size="small"
                                    {...params} />}
                            />
                        </LocalizationProvider>
                    </Grid>
                    <Grid item md={6} sm={12} xs={12}>
                        <TextField
                            fullWidth
                            label="N° Referencia Doc."
                            name="nuM_REFDOC"
                            size="small"
                            InputLabelProps={{
                                shrink: true
                            }}
                            onChange={handleInputChange}
                            value={fields.nuM_REFDOC}
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
                            InputLabelProps={{
                                shrink: true
                            }}
                            onChange={handleInputChange}
                            value={fields.noM_INSTITUCION}
                        />
                    </Grid>
                    <Grid item md={12} sm={12} xs={12}>
                        <TextField
                            fullWidth
                            multiline
                            rows={3}
                            label="Referencia"
                            name="deS_REFERENCIA"
                            InputLabelProps={{
                                shrink: true
                            }}
                            size="small"
                            onChange={handleInputChange}
                            value={fields.deS_REFERENCIA}
                        />
                    </Grid>
                    <Grid item md={12} />
                    <Grid item md={12} sm={12} >
                        <span>Cargos Internos / Externos</span>
                    </Grid>
                    <Grid item md={12} />
                    <Grid item md={3} sm={12} xs={12}>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DesktopDatePicker
                                label="Fecha"
                                inputFormat="dd-MM-yyyy"
                                value={fields.feC_INICIO}
                                onChange={e =>
                                    handleInputChangeDate(e, 'feC_INICIO')}
                                renderInput={(params) => <TextField fullWidth
                                    InputLabelProps={{
                                        shrink: true
                                    }}
                                    size="small"
                                    {...params} />}
                            />
                        </LocalizationProvider>
                    </Grid>
                    <Grid item md={3} sm={12} xs={12}>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DesktopDatePicker
                                label="Fecha"
                                inputFormat="dd-MM-yyyy"
                                value={fields.feC_TERMINO}
                                onChange={e =>
                                    handleInputChangeDate(e, 'feC_TERMINO')}
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
                    <Grid item md={12} />
                    <Grid item md={12}>
                        <Button onClick={handleFields} variant="contained" >
                            Guardar
                        </Button>
                    </Grid>
                </Grid>
            </MUIModal>
        </>
    )

}

export default RegisterAction;