import DataGridDemo from "../Table";
import { Grid, Button, TextField, MenuItem } from "@mui/material";
import { useState, useEffect, useRef } from "react";
import moment from 'moment';
import { AlertDelete } from "../Alerts";
import MUIModal from "../../components/Modal";
import { getCargo } from "../../service/position";
import { getCondicion, getEntidadExt, getUnidad } from "../../service/common";
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
import { AddOrUpdateTrabajadorExperiencia, getTrabajadorExperiencia, listTrabajadorExperiencia, deleteTrabajadorExperiencia } from "../../service/employee/laborexperience";

const RegisterExp = (
    { id }
) => {

    const [fields, setFields] = useState({
        coD_TRAEXP: 0,
        coD_TRABAJADOR: id,
        feC_INICIO: null,
        feC_TERMINO: null,
        noM_INSTITUCION: null,
        coD_ENTIDAD: null,
        inD_INSTITUCION: null,
        reF_DOCCAR: "",
        coD_CONDICION: null,
        coD_UORG: null,
        coD_CAR: null,
        deS_FUNCION: null,
    });

    const [data, setData] = useState([]);
    const levelEducateChild = useRef();
    const loadData = async () => {
        const response = await listTrabajadorExperiencia(id);
        if (response.listado === null) {
            setData([])
        } else {
            setData(response.listado);
        }
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

    const destroy = async (event, id) => {
        const resultado = await AlertDelete();

        if (resultado) {
            const dataDelete = {
                'coD_TRAEXP': id
            };
            await deleteTrabajadorExperiencia(dataDelete);
            await loadData();
        }
    };

    const handleFields = async () => {

        fields.reF_DOCCAR = `${fields.reF_DOCCAR}`
        const response = await AddOrUpdateTrabajadorExperiencia(fields)

        if (response.code === 0) {
            setFields({
                coD_TRAEXP: 0,
                coD_TRABAJADOR: id,
                feC_INICIO: null,
                feC_TERMINO: null,
                noM_INSTITUCION: null,
                coD_ENTIDAD: null,
                inD_INSTITUCION: null,
                reF_DOCCAR: "",
                coD_CONDICION: null,
                coD_UORG: null,
                coD_CAR: null,
                deS_FUNCION: null,
            })
            await loadData();
            levelEducateChild.current.handleClose();
            await AlertSuccess(`${response.message}`)

        } else {
            levelEducateChild.current.handleClose();
            return await AlertError(`${response.message}`)
        }
    }

    const [positions, setPositions] = useState([]);
    const [condicion, setCondicion] = useState([]);
    const [unidad, setUnidad] = useState([]);
    const [entidadExt, setEntidadExt] = useState([]);


    const OpenRegister = async () => {
        setFields({
            coD_TRAEXP: 0,
            coD_TRABAJADOR: id,
            feC_INICIO: null,
            feC_TERMINO: null,
            noM_INSTITUCION: null,
            coD_ENTIDAD: null,
            inD_INSTITUCION: null,
            reF_DOCCAR: "",
            coD_CONDICION: null,
            coD_UORG: null,
            coD_CAR: null,
            deS_FUNCION: null,
        })
        levelEducateChild.current.handleOpen();
        const responsePositions = await getCargo();
        setPositions(responsePositions.listado);
        const responseCondicion = await getCondicion();
        setCondicion(responseCondicion.listado);
        const responseUnidad = await getUnidad();
        setUnidad(responseUnidad.listado);
        const responseEntidadExt = await getEntidadExt();
        setEntidadExt(responseEntidadExt.listado);
    };

    useEffect(() => {

        loadData();
    }, []);

    const edit = async (event, idT) => {
        const response = await getTrabajadorExperiencia(idT);
        setFields({
            coD_TRAEXP: idT,
            coD_TRABAJADOR: id,
            feC_INICIO:  response.listado[0].feC_INICIO,
            feC_TERMINO: response.listado[0].feC_TERMINO,
            noM_INSTITUCION: response.listado[0].noM_INSTITUCION,
            coD_ENTIDAD: response.listado[0].coD_ENTIDAD,
            inD_INSTITUCION: response.listado[0].inD_INSTITUCION,
            reF_DOCCAR: response.listado[0].reF_DOCCAR,
            coD_CONDICION: response.listado[0].coD_CONDICION,
            coD_UORG: response.listado[0].coD_UORG,
            coD_CAR: response.listado[0].coD_CAR,
            deS_FUNCION: response.listado[0].deS_FUNCION,
        })

        levelEducateChild.current.handleOpen();
        const responsePositions = await getCargo();
        setPositions(responsePositions.listado);
        const responseCondicion = await getCondicion();
        setCondicion(responseCondicion.listado);
        const responseUnidad = await getUnidad();
        setUnidad(responseUnidad.listado);
        const responseEntidadExt = await getEntidadExt();
        setEntidadExt(responseEntidadExt.listado);
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
                        edit(event, cellValues.row.coD_TRAEXP);
                    }}
                />,
                <GridActionsCellItem
                    icon={<DeleteIcon />}
                    label="Delete"
                    onClick={(event) => {
                        destroy(event, cellValues.row.coD_TRAEXP);
                    }}
                />,

            ],
        },
        {
            field: 'coD_TRAEXP',
            headerName: 'Código',
            width: 100
        },
        {
            field: 'noM_INSTITUCION',
            headerName: 'Nombre Institución',
            width: 200
        },
        {
            field: 'deS_FUNCION',
            headerName: 'Descripción de función',
            width: 450,
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
                        <DataGridDemo id={(row) => row.coD_TRAEXP}
                            rows={data} columns={columns} toolbar={CustomToolbar} />
                    </Grid>
                </Grid>
            </Grid>
            <MUIModal ref={levelEducateChild}>
                <Grid container spacing={1} >
                    <Grid item md={3} sm={12} xs={12}>
                        <TextField
                            fullWidth
                            InputLabelProps={{
                                shrink: true
                            }}
                            size="small"
                            label="Tipo"
                            name="inD_INSTITUCION"
                            select
                            onChange={handleInputChange}
                            value={fields.inD_INSTITUCION}
                        >
                            <MenuItem value="I">
                                Interna
                            </MenuItem>
                            <MenuItem value="E">
                                Externa
                            </MenuItem>
                        </TextField>
                    </Grid>
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
                    <Grid item md={4} sm={12} xs={12}>
                        <TextField
                            name="coD_CAR"
                            fullWidth
                            InputLabelProps={{
                                shrink: true
                            }}
                            size="small"
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
                    <Grid item md={12} />
                    <Grid
                        item md={12} sm={12} xs={12}>
                        <TextField
                            label="Descripción Función"
                            multiline
                            fullWidth
                            InputLabelProps={{
                                shrink: true
                            }}
                            size="small"
                            rows={4}
                            name="deS_FUNCION"
                            onChange={handleInputChange}
                            value={fields.deS_FUNCION}
                        />
                    </Grid>
                    <Grid item md={12} />
                    <Grid item md={12}>
                        <span>Referencia Organización interna</span>
                    </Grid>
                    <Grid item md={12} />
                    <Grid item md={4} sm={12} xs={12}>
                        <TextField
                            name="coD_CONDICION"
                            fullWidth
                            InputLabelProps={{
                                shrink: true
                            }}
                            size="small"
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
                    <Grid item md={4} sm={12} xs={12}>
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
                    <Grid item md={4} sm={12} xs={12}>
                        <TextField
                            name="reF_DOCCAR"
                            fullWidth
                            InputLabelProps={{
                                shrink: true
                            }}
                            size="small"
                            select
                            label="Cargo Laboral"
                            type="text"
                            onChange={handleInputChange}
                            value={fields.reF_DOCCAR}
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

export default RegisterExp;