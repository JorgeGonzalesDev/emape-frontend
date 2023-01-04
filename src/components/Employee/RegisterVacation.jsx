import { useEffect, useState, useRef } from "react";
import { AddOrUpdateVacationWorker, deleteVacationWorker, getOneVacationWorker, getVacationWorker, listWorkers } from "../../service/worker";
import { Grid, Button, TextField, MenuItem, Stack } from "@mui/material";
import DataGridDemo from "../Table";
import moment from "moment/moment";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import {
    GridActionsCellItem,
    GridToolbarContainer,
    GridToolbarColumnsButton,
    GridToolbarFilterButton,
    GridToolbarExport,
    gridFilteredSortedRowIdsSelector,
    gridVisibleColumnFieldsSelector,
    useGridApiContext,
    GridToolbarExportContainer,
    GridPrintExportMenuItem,
    GridToolbarDensitySelector,
} from '@mui/x-data-grid';
import { AlertDelete } from "../Alerts";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import MUIModal from "../../components/Modal";
import { getEstVac } from "../../service/common";
import { AlertSuccess, AlertError } from "../Alerts";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { AlertWarning } from "../../components/Alerts";
var XLSX = require("xlsx");

const RegisterVacacion = () => {

    const defaultFields = {
        "coD_TRAVAC": 0,
        "coD_TRABAJADOR": 0,
        "feC_INICIO": null,
        "feC_TERMINO": null,
        "coD_ESTVAC": 0,
        "nuM_DOC": null,
        "feC_DOC": null,
        "noM_AUTORIZA": null,
        "deS_OBSERVACION": null
    }

    const defaultErrors = {
        coD_TRABAJADOR: true,
        coD_ESTVAC: true,
        feC_INICIO: true,
        feC_TERMINO: true,
    };

    const [data, setData] = useState([]);
    const [fields, setFields] = useState(defaultFields);
    const [estVac, setEstVac] = useState([]);
    const [data2, setData2] = useState([]);
    const [namePerson, setNamePerson] = useState([]);
    const [test, setTest] = useState({
        fech_inic : null,
        fech_term : null
    });
    const [inputError, setInputError] = useState(defaultErrors);

    const handleInputChangeDateTest = (value, name) => {
        setTest({
            ...test,
            [name]: moment(new Date(value)).format(),
        });
    };


    const loadData = async () => {

        setInputError({
            coD_TRABAJADOR:false,
            coD_ESTVAC: false,
            feC_INICIO: false,
            feC_TERMINO: false,
          });

        const response = await getVacationWorker();
        if (response.listado === null) {
            setData([])
        } else {
            setData(response.listado);
        }
        const responseEstVac = await getEstVac();
        setEstVac(responseEstVac.listado);

    }

    const validateFields = () => {

        const copyFields = { ...fields };
        delete copyFields.coD_TRAVAC;
        delete copyFields.nuM_DOC;
        delete copyFields.feC_DOC;
        delete copyFields.noM_AUTORIZA;
        delete copyFields.deS_OBSERVACION;
    
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

    useEffect(() => {
        loadData()
    }, [])

    const levelEducateChild = useRef();

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

    const OpenRegister = async () => {
        const response = await listWorkers();
        setData2(response.listado);
        setNamePerson("")
        setFields(defaultFields);
        levelEducateChild.current.handleOpen();
    };

    const destroy = async (event, id) => {

        const resultado = await AlertDelete();

        if (resultado) {
            const dataDelete = {
                'coD_TRAVAC': id
            };
            await deleteVacationWorker(dataDelete);
            await loadData();
        }

    }

    const edit = async (event, idT) => {
        const response = await getOneVacationWorker(idT);
        setNamePerson(`${response.listado[0].dTrabajador.dPersona.deS_APELLP} ${response.listado[0].dTrabajador.dPersona.deS_APELLM} ${response.listado[0].dTrabajador.dPersona.noM_PERS}`)
        setFields({
            coD_TRAVAC: idT,
            coD_TRABAJADOR: response.listado[0].dTrabajador.coD_TRABAJADOR,
            feC_INICIO: response.listado[0].feC_INICIO,
            feC_TERMINO: response.listado[0].feC_TERMINO,
            coD_ESTVAC: response.listado[0].dEstadoVacacion.coD_ESTVAC,
            nuM_DOC: response.listado[0].nuM_DOC,
            feC_DOC: response.listado[0].feC_DOC,
            noM_AUTORIZA: response.listado[0].noM_AUTORIZA,
            deS_OBSERVACION: response.listado[0].deS_OBSERVACION,
        })
        levelEducateChild.current.handleOpen();
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
                        edit(event, cellValues.row?.coD_TRAVAC);
                    }}
                />,
                <GridActionsCellItem
                    icon={<DeleteIcon />}
                    label="Delete"
                    onClick={(event) => {
                        destroy(event, cellValues.row?.coD_TRAVAC);
                    }}
                />,
            ],
        },
        {
            field: 'coD_TRAVAC',
            headerName: 'Código',
            width: 100
        },
        {
            field: "full_name",
            headerName: "Apellidos y Nombres",
            width: 400,
            valueGetter: (params) =>
                `${params.row?.dTrabajador?.dPersona?.deS_APELLP || ""} ${params.row?.dTrabajador?.dPersona?.deS_APELLM || ""} ${params.row?.dTrabajador?.dPersona?.noM_PERS || ""
                }`,
        },
        {
            field: "feC_INICIO",
            headerName: "Desde",
            width: 160,
            valueGetter: (params) =>
                `${moment(params.row?.feC_INICIO).format("DD/MM/YYYY")}`,
        },
        {
            field: "feC_TERMINO",
            headerName: "Hasta",
            width: 160,
            valueGetter: (params) =>
                `${moment(params.row?.feC_TERMINO).format("DD/MM/YYYY")}`,
        },
        {
            field: "inD_ESTADO",
            headerName: "Estado",
            width: 200,
            valueGetter: (params) =>
                `${params.row?.dEstadoVacacion.deS_ESTVAC}`
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
                <GridToolbarExport
                printOptions={{
                    hideFooter: true,
                    hideToolbar: true,
                    fields: [
                    "coD_TRAVAC",
                    "full_name",
                    "feC_INICIO",
                    "feC_TERMINO",
                    "inD_ESTADO",
                    ],
                }}
                />
            </GridToolbarContainer>
        );
    }

    const downloadExcel = (dataExport) => {
        var Headers = [["INFORMACIÓN DE VACACIONES"]];
        let nData = [];
        dataExport.forEach((item) => {
          nData.push({
            "Código": item?.coD_TRAVAC,
            "Apellidos y Nombres": item?.full_name,
            "Desde": item?.feC_INICIO,
            "Hasta": item?.feC_TERMINO,
            "Estado": item?.inD_ESTADO,
    
    
    
    
          });
        });
    
        const workSheet = XLSX.utils.json_to_sheet(nData, { origin: "A2" });
        const workBook = XLSX.utils.book_new();
    
        const merge = [
          { s: { r: 0, c: 0 }, e: { r: 0, c: 33 } },
          { s: { r: 0, c: 34 }, e: { r: 0, c: 37 } },
        ];
    
        workSheet["!merges"] = merge;
    
        XLSX.utils.sheet_add_aoa(workSheet, Headers);
        XLSX.utils.book_append_sheet(workBook, workSheet, "Vacaciones");
        XLSX.write(workBook, { bookType: "xlsx", type: "buffer" });
        XLSX.write(workBook, { bookType: "xlsx", type: "binary" });
        XLSX.writeFile(workBook, "ReporteVacaciones.xlsx");
      };
    
      const getData = (apiRef) => {
        const filteredSortedRowIds = gridFilteredSortedRowIdsSelector(apiRef);
        const visibleColumnsField = gridVisibleColumnFieldsSelector(apiRef);
        const data = filteredSortedRowIds.map((id) => {
          const row = {};
          visibleColumnsField.forEach((field) => {
            row[field] = apiRef.current.getCellParams(id, field).value;
          });
          return row;
        });
    
        return data;
      };
    
      const ExcelExportMenuItem = (props) => {
        const apiRef = useGridApiContext();
    
        const { hideMenu } = props;
    
        return (
          <MenuItem
            onClick={() => {
              const data = getData(apiRef);
              downloadExcel(data);
              hideMenu?.();
            }}
          >
            Excel
          </MenuItem>
        );
      };
    
      const GridToolbarExport = ({ csvOptions, printOptions, ...other }) => (
        <GridToolbarExportContainer {...other}>
          <ExcelExportMenuItem />
        </GridToolbarExportContainer>
      );

    const handleFields = async () => {
        const validate = validateFields();
        if (!validate) return;

        const response = await AddOrUpdateVacationWorker(fields);
        if (response.code === 0) {
            await loadData();
            levelEducateChild.current.handleClose();
            await AlertSuccess(`${response.message}`)
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
                        setNamePerson(`${cellValues.row?.dPersona?.deS_APELLP} ${cellValues.row?.dPersona?.deS_APELLM} ${cellValues.row?.dPersona?.noM_PERS}`)
                        fields.coD_TRABAJADOR = cellValues.row?.coD_TRABAJADOR
                    }}
                    icon={<AddCircleOutlineIcon />} label="Edit" />
            ],
        },
        {
            field: "coD_TRABAJADOR",
            headerName: "Código",
            width: 100,
        },
        {
            field: "full_name",
            headerName: "Apellidos y Nombres",
            width: 400,

            valueGetter: (params) =>
                `${params.row?.dPersona?.deS_APELLP || ""} ${params.row?.dPersona?.deS_APELLM || ""} ${params.row?.dPersona?.noM_PERS || ""
                }`,
        },
        {
            field: "nuM_DOC",
            headerName: "Documento",
            width: 100,
            valueGetter: (params) => `${params.row?.dPersona?.nuM_DOC}`
        }
    ];
    return (<>
        <Grid container spacing={1}>
            <Grid item md={12} xs={12} sm={12}>
                <Stack
                    direction="row"
                    spacing={1} xs={{ mb: 1, display: 'flex' }}
                >
                    <div>
                        <h1>Vacaciones</h1>
                    </div>
                </Stack>
                <Grid item md={12}>
                    <DataGridDemo id={(row) => row?.coD_TRAVAC}
                        rows={data} columns={columns} toolbar={CustomToolbar} />
                </Grid>
            </Grid>
        </Grid>
        <MUIModal ref={levelEducateChild}>
        <Grid item md={12} xs={12}>
          <h1>{fields.coD_TRAVAC ? "Actualizar" : "Registrar"} </h1>
          <p style={{ color: 'red', fontSize: 15 }}>(Los campos con * son obligatorios)</p>
        </Grid>
            <Grid container spacing={1} >
                <Grid item md={6} sm={12} xs={12}>
                    <TextField
                        name="namePersona"
                        fullWidth
                        InputLabelProps={{
                            readOnly: true
                        }}
                        label="Nombres y apellidos*"
                        type="text"
                        size="small"
                        error={inputError.coD_TRABAJADOR}
                        value={namePerson}
                    />
                </Grid>
                <Grid item md={3} sm={12} xs={12}>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DesktopDatePicker
                            label="Desde*"
                            inputFormat="dd-MM-yyyy"
                            error={inputError.feC_INICIO}
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
                            label="Hasta*"
                            inputFormat="dd-MM-yyyy"
                            error={inputError.feC_TERMINO}
                            value={moment(fields.feC_TERMINO).format()}
                            minDate={moment(fields.feC_INICIO).toDate()}
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
                <Grid item md={3} sm={12} xs={12}>
                    <TextField
                        fullWidth
                        InputLabelProps={{
                            shrink: true
                        }}
                        label="Estado Vacación*"
                        name="coD_ESTVAC"
                        size="small"
                        select
                        onChange={handleInputChange}
                        error={inputError.coD_ESTVAC}
                        value={fields.coD_ESTVAC}
                    >
                        <MenuItem value="0" disabled>
                            Sin especificar
                        </MenuItem>
                        {estVac &&
                            estVac.map(estVac => (
                                <MenuItem value={estVac.coD_ESTVAC}>
                                    {estVac.deS_ESTVAC}
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
                        inputProps={{maxLength: 25 }}
                        size="small"
                        label="N° Documento"
                        name="nuM_DOC"
                        onChange={handleInputChange}
                        value={fields.nuM_DOC}
                    />
                </Grid>
                <Grid item md={3} sm={12} xs={12}>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DesktopDatePicker
                            label="Fecha Documento"
                            inputFormat="dd-MM-yyyy"
                            value={fields.feC_DOC}
                            onChange={e =>
                                handleInputChangeDate(e, 'feC_DOC')}
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
                    <TextField
                        fullWidth
                        InputLabelProps={{
                            shrink: true
                        }}
                        inputProps={{maxLength: 50 }}
                        size="small"
                        label="Autorizado por"
                        name="noM_AUTORIZA"
                        onChange={handleInputChange}
                        value={fields.noM_AUTORIZA}
                    />
                </Grid>
                <Grid item md={12} />
                <Grid
                    item md={12} sm={12} xs={12}>
                    <TextField
                        label="Descripción Observación"
                        multiline
                        fullWidth
                        InputLabelProps={{
                            shrink: true
                        }}
                        inputProps={{maxLength: 200 }}
                        size="small"
                        rows={2}
                        name="deS_OBSERVACION"
                        onChange={handleInputChange}
                        value={fields.deS_OBSERVACION}
                    />
                </Grid>
                <Grid item md={12} />
                <Grid item md={12}>
                    <DataGridDemo
                        height='40vh'
                        id={(row) => row?.coD_TRABAJADOR}
                        rows={data2}
                        columns={columns2}
                        numberSize={10}
                    />
                </Grid>
                <Grid item md={12}>
                    <Button onClick={handleFields} variant="contained" >
                        Guardar
                    </Button>
                </Grid>
            </Grid>
        </MUIModal>
    </>)
}

export default RegisterVacacion;