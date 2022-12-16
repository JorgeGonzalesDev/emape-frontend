import { useEffect, useState, useRef } from "react";
import { getTrabajadorAsistenciaProcesado, getFaltaTardanza, getTrabajadorAsistenciaProcesadoByDates} from "../../service/assistance";
import { AlertSuccess, AlertError} from "../../components/Alerts";

import { Grid, MenuItem, Stack, TextField, Button} from "@mui/material";
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import {
    GridToolbarContainer,
    GridToolbarColumnsButton,
    GridToolbarFilterButton,
    GridToolbarExportContainer,
    GridPrintExportMenuItem,
    GridToolbarDensitySelector,
    gridFilteredSortedRowIdsSelector,
    gridVisibleColumnFieldsSelector,
    useGridApiContext,
} from "@mui/x-data-grid"; import DataGridDemo from "../../components/Table";
import moment from "moment/moment";
import MUIModal from "../../components/Modal";
var XLSX = require("xlsx");

const AssistancePro = () => {

    const [data, setData] = useState([]);
    const [fields, setFields] = useState({
        feC_INICIO: moment(new Date(new Date().getFullYear(), new Date().getMonth(), 1)).format('yyyy-MM-DD'),
        feC_TERMINO: moment(new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0)).format('yyyy-MM-DD')
    });


    const loadData = async () => {

        const date = new Date();
        const firstDay = moment(new Date(date.getFullYear(), date.getMonth(), 1)).format('yyyy-MM-DD');
        const lastDay = moment(new Date(date.getFullYear(), date.getMonth() + 1, 0)).format('yyyy-MM-DD');

        const response = await getTrabajadorAsistenciaProcesadoByDates(firstDay,lastDay);
        if (response.listado === null) {
            setData([]);
        } else {
            setData(response.listado);
        }
    };

    useEffect(() => {
        loadData();
    }, []);

    const levelEducateChild = useRef();

    /* const handleInputChange = event => {
  
          const { name, type, checked, value } = event.target;
  
          const val = type === 'checkbox' ? checked : value;
  
          setFields({
              ...fields,
              [name]: val,
          });
  
      } */

    /*  */
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFields({ ...fields, [name]: value });
    };
    /*  */

    const handleInputChangeDate = (value, name) => {
        setFields({
            ...fields,
            [name]: moment(new Date(value)).format(),
        });
    };

    const columns = [
        {
            field: "coD_ASISPRO",
            headerName: "Código",
            width: 100,
        },
        {
            field: "coD_TRABAJADOR",
            headerName: "Nombres y Apellidos",
            width: 300,
            valueGetter: (params) =>
                `${params.row?.dTrabajador?.dPersona?.noM_PERS} ${params.row?.dTrabajador?.dPersona?.deS_APELLP} ${params.row?.dTrabajador?.dPersona?.deS_APELLM}`,
        },
        {
            field: "feC_PRO",
            headerName: "Fecha",
            width: 150,
            valueGetter: (params) =>
            `${moment(params.row?.feC_PRO).format("DD/MM/YYYY")}`,
        },
        {
            field: "hoR_PROGRAM",
            headerName: "Hora programado",
            width: 150,
            valueGetter: (params) => `${params.row?.hoR_ENT_PRO} - ${params.row?.hoR_SAL_PRO}`,
        },
        {
            field: "hoR_ENT_ASI",
            headerName: "Hora Entrada Asistencia",
            width: 130,
        },
        {
            field: "hoR_SAL_ASI",
            headerName: "Hora Salida Asistencia",
            width: 130,
        },
        {
            field: "miN_TAR",
            headerName: "Minutos Tardanza",
            width: 150,
        },
        {
            field: "falta",
            headerName: "Faltas",
            width: 100,
            valueGetter: (params) => `${params.row?.falta === 0 ? '' : 'F'}`,
        },
    ];

    const downloadExcel = (dataExport) => {
        var Headers = [["INFORMACIÓN DE ASISTENCIA PROCESADO"]];
        let nData = [];
        dataExport.forEach((item) => {
            nData.push({
                Código: item?.coD_ASISPRO,
                "Apellidos y nombres": item?.coD_TRABAJADOR,
                Fecha: item?.feC_PRO,
                'Hora programado': item?.hoR_PROGRAM,
                'Hora entrada': item?.hoR_ENT_ASI,
                'Hora salida': item?.hoR_SAL_ASI,
                'Minutos de tardanza' : item?.miN_TAR,
                'Falta' : item?.falta, 
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
        XLSX.utils.book_append_sheet(workBook, workSheet, "Asistencia Procesado");
        XLSX.write(workBook, { bookType: "xlsx", type: "buffer" });
        XLSX.write(workBook, { bookType: "xlsx", type: "binary" });
        XLSX.writeFile(workBook, "ReporteAsistenciaProcesado.xlsx");
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


    function CustomToolbar() {
        return (
            <GridToolbarContainer>
                <GridToolbarFilterButton />
                <GridToolbarColumnsButton />
                <GridToolbarDensitySelector />
                <GridToolbarExport
                printOptions={{
                    hideFooter: true,
                    hideToolbar: true,
                    fields: [
                    "coD_ASISPRO",
                    "coD_TRABAJADOR",
                    "feC_PRO",
                    "hoR_PROGRAM",
                    "hoR_ENT_ASI",
                    "hoR_SAL_ASI",
                    "miN_TAR",
                    "falta",
                    ],
                }}
                />
            </GridToolbarContainer>
        );
    }

    const captureEventFilter = async () => {
        
        const response = await getTrabajadorAsistenciaProcesadoByDates(fields.feC_INICIO,fields.feC_TERMINO);
        setData(response.listado);
        AlertSuccess('OK')
    }

    return (
        <>
            <Grid container spacing={1}>
                <Grid item md={12} xs={12} sm={12}>
                    <Stack direction="row" spacing={1} xs={{ mb: 1, display: "flex" }}>
                        <div>
                            <h1>Asistencia Procesado</h1>
                        </div>
                    </Stack>
                    <br />
                    <Stack direction="row" spacing={1} xs={{ mb: 1, display: "flex" }} marginBottom={3}>
                        <Grid item md={3} sm={12} xs={12}>
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <DesktopDatePicker
                                    label="Desde*"
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
                                    label="Hasta*"
                                    inputFormat="dd-MM-yyyy"
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
                        <Grid item md={3} sm={12} xs={12}>
                            <Button
                                size="large"
                                variant="outlined"
                                onClick={captureEventFilter}
                            >
                                <span>Buscar</span>
                            </Button>

                        </Grid>
                    </Stack>
                    <Grid item md={12}>
                        <DataGridDemo
                            id={(row) => row.coD_ASISPRO}
                            rows={data}
                            toolbar={CustomToolbar}
                            columns={columns}
                        />
                    </Grid>
                </Grid>
            </Grid>
            <MUIModal ref={levelEducateChild}>
                <Grid container spacing={1.5}>
                    <Grid item md={12} />
                    <Grid item md={8} sm={12} xs={12}></Grid>
                    <Grid item md={12} />
                    <Grid item md={8} sm={12} xs={12}></Grid>
                    <Grid item md={12} />
                    <Grid item md={8} sm={12} xs={12}></Grid>
                    <Grid item md={12} />
                    <Grid item md={4} sm={12} xs={12}></Grid>
                    <Grid item md={4} sm={12} xs={12}></Grid>
                    <Grid item md={12} />
                    <Grid item md={4} sm={12} xs={12}></Grid>
                    <Grid item md={12} />
                    <Grid item md={12}></Grid>
                </Grid>
            </MUIModal>
        </>
    )

}

export default AssistancePro;