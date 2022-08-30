import DataGridDemo from "../Table";
import { Grid, Button, TextField, MenuItem } from "@mui/material";
import { useState, useEffect, useRef } from "react";
import moment from 'moment';
import { AlertDelete } from "../Alerts";
import MUIModal from "../../components/Modal";
import { getCargo } from "../../service/position";
import { getCondicion, getEntidadExt } from "../../service/common";
import { getLevelEducate } from "../../service/nivelEducate";
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
import { listTrabajadorEducacion, deleteTrabajadorEducacion, AddOrUpdateTrabajadorEducacion, getTrabajadorEducacion } from "../../service/employee/education";
import { AlertSuccess, AlertError } from "../Alerts";
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { AddOrUpdateTrabajadorExperiencia, getTrabajadorExperiencia, listTrabajadorExperiencia, deleteTrabajadorExperiencia } from "../../service/employee/laborexperience";

const RegisterEducate = (
    { id }
) => {

    const [fields, setFields] = useState({
        coD_TRAEDU: 0,
        coD_TRABAJADOR: id,
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
        feC_USUMOD: "2022-08-30T10:16:50.231Z",
        coD_USUMOD: 269,
        feC_USUREG: "2022-08-30T10:16:50.231Z",
        coD_USUREG: 269
    });

    const [data, setData] = useState([]);
    const [entidadExt, setEntidadExt] = useState([]);

    const loadData = async () => {
        const response = await listTrabajadorEducacion(id);
        if (response.listado === null) {
            setData([])
        } else {
            setData(response.listado);
        }

    };

    const levelEducateChild = useRef();
    const [levelEducate, setLevelEducate] = useState([]);

    const handleInputChangeDate = (value, name) => {
        setFields({
            ...fields,
            [name]: moment(new Date(value)).format(),
        });
    };

    const edit = async (event, idT) => {
        const response = await getTrabajadorEducacion(idT);
        setFields({
            coD_TRAACC: idT,
            coD_TRABAJADOR: id,
            feC_TITULO: response.listado[0].feC_TITULO,
            nuM_COLEGIATURA: response.listado[0].nuM_COLEGIATURA,
            noM_ESPECIALIDAD: response.listado[0].noM_ESPECIALIDAD,
            coD_ESTUDIO: response.listado[0].coD_ESTUDIO,
            coD_ENTIDAD: response.listado[0].coD_ENTIDAD,
            noM_INSTITUCION: response.listado[0].noM_INSTITUCION,
            nuM_REFDOC: response.listado[0].nuM_REFDOC,
            deS_REFERENCIA: response.listado[0].deS_REFERENCIA,
            deS_CONTENIDO: response.listado[0].deS_CONTENIDO,
            coD_GRDINSTRUC: response.listado[0].coD_GRDINSTRUC,
            feC_INICIO: response.listado[0].feC_INICIO,
            feC_TERMINO: response.listado[0].feC_TERMINO,
            feC_USUMOD: "2022-08-30T10:16:50.231Z",
            coD_USUMOD: 269,
            feC_USUREG: "2022-08-30T10:16:50.231Z",
            coD_USUREG: 269
        })
        levelEducateChild.current.handleOpen();
        const responseEntidadExt = await getEntidadExt();
        setEntidadExt(responseEntidadExt.listado);
        const responseLevelEducate = await getLevelEducate();
        setLevelEducate(responseLevelEducate.listado);
    }

    const handleFields = async () => {

        const response = await AddOrUpdateTrabajadorEducacion(fields)

        if (response.code === 0) {

            setFields({
                coD_TRAEDU: 0,
                coD_TRABAJADOR: id,
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
                feC_USUMOD: "2022-08-30T10:16:50.231Z",
                coD_USUMOD: 269,
                feC_USUREG: "2022-08-30T10:16:50.231Z",
                coD_USUREG: 269
            })
            await loadData();
            levelEducateChild.current.handleClose();
            await AlertSuccess(`${response.message}`)

        } else {
            levelEducateChild.current.handleClose();
            return await AlertError(`${response.message}`)
        }

    }

    const destroy = async (event, id) => {
        const resultado = await AlertDelete();

        if (resultado) {
            const dataDelete = {
                'coD_TRAEDU': id
            };
            await deleteTrabajadorEducacion(dataDelete);
            await loadData();
        }
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
                        edit(event, cellValues.row.coD_TRAEDU);
                    }}
                />,
                <GridActionsCellItem
                    icon={<DeleteIcon />}
                    label="Delete"
                    onClick={(event) => {
                        destroy(event, cellValues.row.coD_TRAEDU);
                    }}
                />,

            ],
        },
        {
            field: 'coD_TRAEDU',
            headerName: 'Código',
            width: 100
        },
        {
            field: 'noM_ESPECIALIDAD',
            headerName: 'Estudio',
            width: 400
        },
        {
            field: 'noM_INSTITUCION',
            headerName: 'Nom. Institución',
            width: 300
        },
        {
            field: "feC_INICIO",
            headerName: "Fecha Inicio",
            width: 160,
            valueGetter: (params) =>
                `${moment(params.row.feC_INICIO).format("DD/MM/YYYY")}`,
        },
        {
            field: "feC_TERMINO",
            headerName: "Fecha Termino",
            width: 160,
            valueGetter: (params) =>
                `${moment(params.row.feC_TERMINO).format("DD/MM/YYYY")}`,
        },
    ];

    const OpenRegister = async () => {
        setFields({
            coD_TRAEDU: 0,
            coD_TRABAJADOR: id,
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
            feC_USUMOD: "2022-08-30T10:16:50.231Z",
            coD_USUMOD: 269,
            feC_USUREG: "2022-08-30T10:16:50.231Z",
            coD_USUREG: 269
        })
        levelEducateChild.current.handleOpen();
        const responseEntidadExt = await getEntidadExt();
        setEntidadExt(responseEntidadExt.listado);
        const responseLevelEducate = await getLevelEducate();
        setLevelEducate(responseLevelEducate.listado);
    };

    const handleInputChange = event => {

        const { name, type, checked, value } = event.target;

        const val = type === 'checkbox' ? checked : value;

        setFields({
            ...fields,
            [name]: val,
        });

    }

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
    return (
        <>
            <Grid container spacing={1}>
                <Grid item md={12} xs={12} sm={12}>
                    <Grid item md={12}>
                        <DataGridDemo id={(row) => row.coD_TRAEDU}
                            rows={data} columns={columns} toolbar={CustomToolbar} />
                    </Grid>
                </Grid>
            </Grid>
            <MUIModal ref={levelEducateChild}>
                <Grid container spacing={1.5} >
                    <Grid item md={4} sm={12} xs={12}>
                        <TextField
                            name="coD_ESTUDIO"
                            fullWidth
                            InputLabelProps={{
                                shrink: true
                            }}
                            select
                            size="small"
                            label="Tipo"
                            onChange={handleInputChange}
                            value={fields.coD_ESTUDIO}
                        >
                            <MenuItem value="1">
                                Sin especificar
                            </MenuItem>
                        </TextField>
                    </Grid>
                    <Grid item md={12} />
                    <Grid item md={5} sm={12} xs={12}>
                        <TextField
                            fullWidth
                            label="Especialidad"
                            name="noM_ESPECIALIDAD"
                            size="small"
                            onChange={handleInputChange}
                            value={fields.noM_ESPECIALIDAD}
                        />
                    </Grid>
                    <Grid item md={5} sm={12} xs={12}>
                        <TextField
                            fullWidth
                            InputLabelProps={{
                                shrink: true
                            }}
                            size="small"
                            label="Institución"
                            name="noM_INSTITUCION"
                            onChange={handleInputChange}
                            value={fields.noM_INSTITUCION}
                        />
                    </Grid>
                    <Grid item md={12} />
                    <Grid item md={3} sm={12} xs={12}>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DesktopDatePicker
                                label="Fecha Inico"
                                inputFormat="dd-MM-yyyy"
                                value={moment(fields.feC_INICIO).format()}
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
                                label="Fecha Termino"
                                inputFormat="dd-MM-yyyy"
                                value={moment(fields.feC_TERMINO).format()}
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
                    <Grid item md={4} xs={12}>
                        <TextField
                            fullWidth
                            InputLabelProps={{
                                shrink: true
                            }}
                            name="coD_GRDINSTRUC"
                            select
                            label="Nivel educativo"
                            size="small"
                            onChange={handleInputChange}
                            value={fields.coD_GRDINSTRUC}
                        >
                            <MenuItem value={0} disabled></MenuItem>
                            {levelEducate &&
                                levelEducate.map((levelEducate) => (
                                    <MenuItem value={levelEducate.coD_GRDINSTRUC}>
                                        {levelEducate.abreviadO_GRADO}
                                    </MenuItem>
                                ))}
                        </TextField>
                    </Grid>
                    <Grid item md={3} sm={12} xs={12}>
                        <TextField
                            fullWidth
                            InputLabelProps={{
                                shrink: true
                            }}
                            label="Cod. Entidad"
                            name="coD_ENTIDAD"
                            size="small"
                            select
                            onChange={handleInputChange}
                            value={fields.coD_ENTIDAD}
                        >
                            <MenuItem value="0" disabled>
                                Sin especificar
                            </MenuItem>
                            {entidadExt &&
                                entidadExt.map(entidadExt => (
                                    <MenuItem value={entidadExt.coD_ENTIDAD}>
                                        {entidadExt.noM_ENTIDAD}
                                    </MenuItem>
                                ))}
                        </TextField>
                    </Grid>
                    <Grid item md={3} sm={12} xs={12}>
                        <TextField
                            fullWidth
                            label="N° Colegiatura"
                            name="nuM_COLEGIATURA"
                            size="small"
                            onChange={handleInputChange}
                            value={fields.nuM_COLEGIATURA}
                        />
                    </Grid>

                    <Grid item md={3} sm={12} xs={12}>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DesktopDatePicker
                                label="Fecha Termino"
                                inputFormat="dd-MM-yyyy"
                                value={moment(fields.feC_TITULO).format()}
                                onChange={e =>
                                    handleInputChangeDate(e, 'feC_TITULO')}
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
                    <Grid
                        item md={12} sm={12} xs={12}>
                        <TextField
                            label="Contenido"
                            multiline
                            fullWidth
                            InputLabelProps={{
                                shrink: true
                            }}
                            size="small"
                            rows={4}
                            name="deS_CONTENIDO"
                            onChange={handleInputChange}
                            value={fields.deS_CONTENIDO}
                        />
                    </Grid>
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

export default RegisterEducate;