import DataGridDemo from "../../components/Table";
import { useState, useEffect, useRef } from "react";
import { Button, Grid, TextField, Stack, MenuItem } from "@mui/material";
import { PATH } from "../../service/config";
import {
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarDensitySelector,
  GridActionsCellItem,
} from "@mui/x-data-grid";
import { getPeriodoPlanillaByYear, calculatePlanilla } from "../../service/spreadsheet/periodspreadsheet";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { AlertSuccess, AlertError } from "../../components/Alerts";
import { useNavigate } from "react-router-dom";
import MUIPreload from "../../components/Modal/preload";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

var XLSX = require("xlsx");

const CalculateSpreadsheet = ({ id }) => {
  const defaultfields = {
    coD_PERPLAN: 0,
    nuM_PERIODO: `${new Date().getFullYear()}`,
    nuM_PERPLAN: null,
    coD_TIPOPLAN: null,
    coD_TRABAJADOR: null,
  };
  const [fields, setFields] = useState(defaultfields);

  const levelEducateChild = useRef();
  const [data, setData] = useState([]);

  const [codigo, setCodigo] = useState(0);
  const [mes, setMes] = useState([]);
  const [periodo, setPeriodo] = useState([]);
  const [tipoPlanilla, setTipoPlanilla] = useState([]);
  const [subTipoPlanilla, setSubTipoPlanilla] = useState([]);
  const navigate = useNavigate();

  const testData = [
    {
      id: '1',
      periodo: 2022,
      mes: 'ENERO',
      planilla: 'Planila Padre',
      subplanilla: 'Planilla subplanilla',
      estado: 'APERTURADO'
    },
    {
      id: '2',
      periodo: 2022,
      mes: 'FEBRERO',
      planilla: 'Planila Padre 2',
      subplanilla: 'Planilla subplanilla 2',
      estado: 'APERTURADO'
    }
  ]

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFields({ ...fields, [name]: value });

  };

  const loadData = async (year = new Date().getFullYear()) => {
    const response = await getPeriodoPlanillaByYear(year);
    setData(response.listado);

    //console.log(response.listado);
  };

  useEffect(() => {
    loadData();
  }, []);

  const filterYear = () => {
    loadData(fields.nuM_PERIODO);
  }

  const columns = [
    {
      field: "coD_PERPLAN",
      headerName: "código",
      width: 200,
    },
    {
      field: "nuM_PERIODO",
      headerName: "Periodo",
      width: 200,
    },
    {
      field: "noM_PERIODO",
      headerName: "Mes",
      width: 200,
    },
    {
      field: "coD_TIPOPLAN",
      headerName: "Planilla padre",
      width: 200,
      valueGetter: (params) =>
        `${params.row?.dTipoPlanilla?.noM_TIPOPLAN}`,
    },
    {
      field: "noM_TIPOPLAN",
      headerName: "Planilla subplanilla",
      width: 200,
      valueGetter: (params) =>
        `${params.row?.dTipoPlanilla?.parent?.noM_TIPOPLAN}`,
    },
    {
      field: "acciones",
      type: "actions",
      disableExport: true,
      getActions: (cellValues) => [
        <GridActionsCellItem
          onClick={async () => {
            if (cellValues.row?.inD_ESTADO == "A") {
              setCodigo(`${cellValues.row?.coD_PERPLAN}`)
              setMes(`${cellValues.row?.noM_PERIODO}`)
              setPeriodo(`${cellValues.row?.nuM_PERIODO}`)
              setTipoPlanilla(`${cellValues.row?.dTipoPlanilla?.noM_TIPOPLAN}`)
              setSubTipoPlanilla(`${cellValues.row?.dTipoPlanilla?.parent?.noM_TIPOPLAN}`)
            } else {
              AlertError("Solo se puede calcular PLANILLAS APERTURADAS")
            }

          }}
          icon={<AddCircleOutlineIcon />} label="Edit" />
      ],
    },
  ];

  // const downloadExcel = (dataExport) => {
  //   var Headers = [["INFORMACIÓN DE CALCULAR PLANILLA"]];
  //   let nData = [];
  //   dataExport.forEach((item) => {
  //     nData.push({
  //       Código: item?.coD_PLACAL,
  //       Periodo: item?.nuM_PERIODO,
  //       PerPlan: item?.nuM_PERPLAN,
  //       "SubTipo de Planilla": item?.coD_TIPOPLAN,
  //       "Apellidos y nombres": item?.full_name,
  //       Concepto: item?.coD_CONCEPTO,
  //       Monto: item?.coD_CONCEPTO,
  //       Concepto: item?.coD_UORG,
  //       Cargo: item?.coD_CARGO,

  //     });
  //   });

  //   const workSheet = XLSX.utils.json_to_sheet(nData, { origin: "A2" });
  //   const workBook = XLSX.utils.book_new();

  //   const merge = [
  //     { s: { r: 0, c: 0 }, e: { r: 0, c: 33 } },
  //     { s: { r: 0, c: 34 }, e: { r: 0, c: 37 } },
  //   ];

  //   workSheet["!merges"] = merge;

  //   XLSX.utils.sheet_add_aoa(workSheet, Headers);
  //   XLSX.utils.book_append_sheet(workBook, workSheet, "Calcular Planilla");
  //   XLSX.write(workBook, { bookType: "xlsx", type: "buffer" });
  //   XLSX.write(workBook, { bookType: "xlsx", type: "binary" });
  //   XLSX.writeFile(workBook, "ReporteCalcularPlanilla.xlsx");
  // };

  // const getData = (apiRef) => {
  //   const filteredSortedRowIds = gridFilteredSortedRowIdsSelector(apiRef);
  //   const visibleColumnsField = gridVisibleColumnFieldsSelector(apiRef);
  //   const data = filteredSortedRowIds.map((id) => {
  //     const row = {};
  //     visibleColumnsField.forEach((field) => {
  //       row[field] = apiRef.current.getCellParams(id, field).value;
  //     });
  //     return row;
  //   });

  //   return data;
  // };

  // const ExcelExportMenuItem = (props) => {
  //   const apiRef = useGridApiContext();

  //   const { hideMenu } = props;

  //   return (
  //     <MenuItem
  //       onClick={() => {
  //         const data = getData(apiRef);
  //         downloadExcel(data);
  //         hideMenu?.();
  //       }}
  //     >
  //       Excel
  //     </MenuItem>
  //   );
  // };

  // const GridToolbarExport = ({ csvOptions, printOptions, ...other }) => (
  //   <GridToolbarExportContainer {...other}>
  //     <ExcelExportMenuItem />
  //   </GridToolbarExportContainer>
  // );

  const pathPROD = PATH

  const redirectReport = () => {
    if (codigo === 0) return;
    navigate(pathPROD + '/reporte/periodo/' + codigo)
  }

  const calculate = async () => {

    levelEducateChild.current.handleOpen();
    if (codigo != "") {
      const response = await calculatePlanilla(codigo);
      if(response.code != -300){
        AlertSuccess(response.listado[0].mensaje);
        levelEducateChild.current.handleClose();
      }else{
        levelEducateChild.current.handleClose();
      }
    }else{
      AlertError('Faltan datos');
    }  
  }

  function CustomToolbar() {
    return (
      <GridToolbarContainer>
        <GridToolbarColumnsButton />
        <GridToolbarFilterButton />
        <GridToolbarDensitySelector />
        {/* <GridToolbarExport /> */}
      </GridToolbarContainer>
    );
  }


  return (
    <>
      <Grid container spacing={1}>
        <Grid item md={12} xs={12} sm={12}>
          <Stack
            direction="row"
            spacing={1} xs={{ mb: 1, display: 'flex' }}
          >
            <div>
              <h1>Calcular Planilla</h1>
            </div>
          </Stack>
          <Stack direction="row" spacing={1} xs={{ mb: 1, display: "flex" }} marginBottom={3}>
            <Grid item md={2} sm={12} xs={12}>
              <TextField
                name="nuM_PERIODO"
                fullWidth
                InputLabelProps={{
                  shrink: true,
                }}
                type="number"
                inputProps={{ maxlength: "4" }}
                size="small"
                label="N° Periodo"
                onChange={handleInputChange}
                value={fields.nuM_PERIODO}
              />
            </Grid>
            <Grid item md={3} sm={12} xs={12}>
              <Button
                size="large"
                variant="outlined"
                onClick={filterYear}
              >
                <span>Buscar</span>
              </Button>
            </Grid>
          </Stack>
          <Grid item md={12}>
            <DataGridDemo
              id={(row) => row.coD_PERPLAN}
              rows={data}
              columns={columns}
              toolbar={CustomToolbar}
            />
          </Grid>
          <br />
          <Stack direction="row" spacing={1} xs={{ mb: 1, display: "flex" }} marginBottom={3}>
            <Grid item md={3} sm={12} xs={12}>
              <TextField
                fullWidth
                InputLabelProps={{
                  shrink: true,
                }}
                type="number"
                inputProps={{ maxlength: "4" }}
                size="small"
                label="N° Periodo"
                value={periodo}
                disabled
              />
            </Grid>
            <Grid item md={4} sm={12} xs={12}>
              <TextField
                fullWidth
                InputLabelProps={{
                  shrink: true,
                }}
                size="small"
                label="Mes"
                value={mes}
                disabled
              >
              </TextField>
            </Grid>

            <Grid item md={4} sm={12} xs={12}>
              <TextField
                fullWidth
                InputLabelProps={{
                  shrink: true,
                }}
                size="small"
                label="Tipo Planilla"
                value={tipoPlanilla}
                disabled
              >
              </TextField>
            </Grid>
            <Grid item md={4} sm={12} xs={12}>
              <TextField
                name="coD_TIPOPLAN"
                fullWidth
                InputLabelProps={{
                  shrink: true,
                }}
                size="small"
                label="Subtipo Planilla"
                value={subTipoPlanilla}
                disabled
              >
              </TextField>
            </Grid>
            <Grid item md={3}>
              <Button onClick={calculate} variant="contained">
                CALCULAR
              </Button>
              <Button sx={{ marginLeft: '5px' }} onClick={redirectReport} variant="contained">
                REPORTE
              </Button>
            </Grid>
          </Stack>

        </Grid>

        <MUIPreload ref={levelEducateChild}>
          <Grid container spacing={2} justifyContent="center">
            <Box sx={{ display: 'flex' }}>
              <CircularProgress color="primary" size={70} />
            </Box>
          </Grid>
        </MUIPreload>
      </Grid>
    </>
  );
};

export default CalculateSpreadsheet;
