import DataGridDemo from "../../../components/Table";
import { useState, useEffect } from "react";
import FileIcon from '@mui/icons-material/InsertDriveFile';
import { Button, Grid, TextField, Stack, MenuItem } from "@mui/material";
import {
  ListPlanillaHistorica, getPlanillaHistoricaExportTXT
} from "../../../service/historicalspreadsheet";
import { 
  GetReportePlanillaPago,
  getReportsPreviewPRC, 
  GetPlanillaResumenTC 
} from "../../../service/common";
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
} from "@mui/x-data-grid";
import { getPeriodoPlanillaByYearPerplan } from "../../../service/spreadsheet/periodspreadsheet";
import HistoricalBallot from "../HistoricalBallot";

import SlowMotionVideoIcon from '@mui/icons-material/SlowMotionVideo';
import IconToolTip from "../../../components/Icons/IconToolTip";
import { Link } from "react-router-dom";
import { AlertSuccess, AlertError } from "../../../components/Alerts";

var XLSX = require("xlsx");

const Report = () => {
  const defaultfields = {
    coD_PERPLAN: 0,
    nuM_PERIODO: `${new Date().getFullYear()}`,
    nuM_PERPLAN: `${new Date().getMonth()}`,
    coD_TIPOPLAN: null,
  };

  const [fields, setFields] = useState(defaultfields);
  const [data1, setData1] = useState([]);
  const [data2, setData2] = useState([]);
  const [data3, setData3] = useState([]);
  const [estado, setEstado] = useState(false);


  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFields({ ...fields, [name]: value });
  };

  const loadData = async (
    year = new Date().getFullYear(), month = new Date().getMonth()
  ) => {
    const response1 = await ListPlanillaHistorica();
    setData2(response1.listado);
    const response2 = await getPlanillaHistoricaExportTXT();
    setData2(response2.listado);
  };
  const filterEmployee = async (listado) => {
    setData3(listado)
    if (data3.length === 0) return;
    const idEmployee = [];
    data2.forEach(element => {
        idEmployee.push(element['codigo'])
    })
    let newArray = data2.filter(
        (data) => !idEmployee.some((data) => data === data['codigo']));
    setData2(newArray);
    console.log(setData2);
}

  const filterSpreadsheet = async (event, row) => {
    const response2 = await GetReportePlanillaPago(fields.coD_PERPLAN);
    fields.coD_PERPLAN = row.coD_PERPLAN;
    const response3 = await getReportsPreviewPRC(fields.coD_PERPLAN);
    fields.coD_PERPLAN = row.coD_PERPLAN;
    filterEmployee(response2.listado)
    console.log(response2.isResultList);
    if (response2.isResultList || response3.isResultList){
      await AlertSuccess("Enviado con Exito");
        /* await AlertError("No Data"); */
        /* fields.coD_PERPLAN = 0; */
        setEstado(false);
     }else{
        await AlertError("No Data");
        setEstado(true);
     }
  }



  useEffect(() => {
    loadData();
  }, []);

  const filterYear = async () => {
    const response = await getPeriodoPlanillaByYearPerplan(fields.nuM_PERIODO, fields.nuM_PERPLAN);
    setData1(response.listado);
    /* var path = `/RRHHDEV/reportes/PaymentForm/${fields.coD_PERPLAN}`;
    window.location = path; */
  }
  const generatePaymentForm = async () => {

    /* var data = {codp:row.coD_PERPLAN};
    data = JSON.stringify(data); */
    /* var path = `/RRHHDEV/reportes/HistoricalBallot/${data}`;
    window.location = path; */
    /* var path = `/RRHHDEV/reportes/PaymentForm/${fields.coD_PERPLAN}`;
    window.location = path; */
    if (estado == false){
      var path = `/RRHHDEV/reportes/PaymentForm/${fields.coD_PERPLAN}`;
      window.location = path;
      await AlertSuccess("Enviado con Exito");
    }
  }
  
  const generateConceptSummaryForm = async () => {

    /* var data = {codp:row.coD_PERPLAN};
    data = JSON.stringify(data); */
    /* var path = `/RRHHDEV/reportes/HistoricalBallot/${data}`;
    window.location = path; */
    /* var path = `/RRHHDEV/reportes/PaymentForm/${fields.coD_PERPLAN}`;
    window.location = path; */
    if (estado == false){
      var path = `/RRHHDEV/reportes/PlanillaResumenConcepto/${fields.coD_PERPLAN}`;
      window.location = path;
      await AlertSuccess("Enviado con Exito");
    }
  }
  const generateSummaryFormTC = async () => {

    /* var data = {codp:row.coD_PERPLAN};
    data = JSON.stringify(data); */
    /* var path = `/RRHHDEV/reportes/HistoricalBallot/${data}`;
    window.location = path; */
    /* var path = `/RRHHDEV/reportes/PaymentForm/${fields.coD_PERPLAN}`;
    window.location = path; */
    if (estado == false){
      var path = `/RRHHDEV/reportes/SummaryFormTC/${fields.coD_PERPLAN}`;
      window.location = path;
      await AlertSuccess("Enviado con Exito");
    }
  }

  const SummaryPayrollV1 = async () => {
    if (estado == false){
      var path = `/RRHHDEV/reportes/SummaryPayrollV1/${fields.coD_PERPLAN}`;
      window.location = path;
      await AlertSuccess("Enviado con Exito");
    }
  }

  const SummaryPayrollV2 = async () => {
    if (estado == false){
      var path = `/RRHHDEV/reportes/SummaryPayrollV2/${fields.coD_PERPLAN}`;
      window.location = path;
      await AlertSuccess("Enviado con Exito");
    }
  }

  const HistoricalBallot = async () => {
    if (estado == false){
      var path = `/RRHHDEV/reportes/HistoricalBallot/${fields.coD_PERPLAN}/1`;
      window.location = path;
      await AlertSuccess("Enviado con Exito");
    }
  }

  const RemunerationReturn = async () => {
    if (estado == false){
      var path = `/RRHHDEV/reportes/RemunerationReturn/${fields.coD_PERPLAN}`;
      window.location = path;
      await AlertSuccess("Enviado con Exito");
    }
  }

  const columns = [
    {
      field: "Acciones",
      type: "actions",
      getActions: (cellValues) => [
        
          <IconToolTip
              text="Seleccionar"
              icon={<SlowMotionVideoIcon />}
              action={(event) => {
                filterSpreadsheet(event, cellValues.row);
              }}
          />,
      ],
    },
    {
      field: "coD_TIPOPLAN_P",
      headerName: "Planilla",
      width: 300,
      valueGetter: (params) =>
        `${params.row?.dTipoPlanilla?.noM_TIPOPLAN}`,
    },
    {
      field: "coD_TIPOPLAN",
      headerName: "Subtipo de planilla",
      width: 200,
      valueGetter: (params) => `${params.row?.dTipoPlanilla?.parent?.noM_TIPOPLAN}`,
    },
  ];

  // const columns2 = [
  //   {
  //     field: "codigo",
  //     headerName: "Codigo",
  //     width: 100,
  //     headerAlign: "center",
  //   },
  //   {
  //     field: "apellidosNombres",
  //     headerName: "Apellidos y Nombres",
  //     width: 300,
  //     headerAlign: "center",
  //   },
  //   {
  //     field: "ingresos",
  //     headerName: "Ingresos",
  //     width: 100,
  //     headerAlign: "center",
  //   },
  //   {
  //     field: "egresos",
  //     headerName: "Descuentos",
  //     width: 100,
  //     headerAlign: "center",
  //   },
  //   {
  //     field: "aportes",
  //     headerName: "Aportes",
  //     width: 100,
  //     headerAlign: "center",
  //   },
  //   {
  //     field: "totalNeto",
  //     headerName: "Total Neto",
  //     width: 100,
  //     headerAlign: "center",
  //   },
  // ];

  // const downloadExcel = (dataExport) => {
  //   var Headers = [["REPORTE PLANILLA DE PAGOS"]];
  //   let nData = [];
  //   dataExport.forEach((item) => {
  //     nData.push({
  //       Código: item?.codigo,
  //       "Apellidos y Nombres": item?.apellidosNombres,
  //       Ingresos: item?.ingresos,
  //       Descuentos: item?.egresos,
  //       Aportes: item?.aportes,
  //       "Total Neto": item?.totalNeto,
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
  //   XLSX.utils.book_append_sheet(workBook, workSheet, "Planilla de Pagos"); //TITULO dE hoja
  //   XLSX.write(workBook, { bookType: "xlsx", type: "buffer" });
  //   XLSX.write(workBook, { bookType: "xlsx", type: "binary" });
  //   XLSX.writeFile(workBook, "ReportePlanillaPago.xlsx"); //NOmbre de archivo
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

  // function customToolbar() {
  //   return (
  //     <GridToolbarContainer>
  //       <GridToolbarColumnsButton />
  //       <GridToolbarFilterButton />
  //       <GridToolbarDensitySelector />
  //       <GridToolbarExport
  //         printOptions={{
  //           hideFooter: true,
  //           hideToolbar: true,
  //           fields: [ //mis columnas
  //             "codigo",
  //             "apellidosNombres",
  //             "ingresos",
  //             "egresos",
  //             "aportes",
  //             "totalNeto",
  //           ],
  //         }}
  //       />
  //     </GridToolbarContainer>
  //   );
  // }

  return (
    <>
      <Grid item md={12} xs={12} sm={12}>
        <div style={{ flexGrow: 1 }}>
          <Stack direction="row" spacing={1} xs={{ mb: 1, display: "flex" }}>
            <div>
              <h1>Reportes</h1>
            </div>
          </Stack>
        </div>
        <Stack
          direction="row"
          xs={{ mb: 1, display: "flex" }}
          marginBottom={3}
        >
          <Grid container spacing={2}>
            <Grid item md={2} sm={12} xs={12}>
              <TextField
                name="nuM_PERIODO"
                fullWidth
                InputLabelProps={{
                  shrink: true,
                }}
                type="number"
                inputProps={{ maxLength: "4" }}
                size="small"
                label="N° Periodo"
                onChange={handleInputChange}
                value={fields.nuM_PERIODO}
              />
            </Grid>
            <Grid item md={3} sm={12} xs={12}>
              <TextField
                name="nuM_PERPLAN"
                size="small"
                onChange={handleInputChange}
                InputLabelProps={{
                  shrink: true,
                }}
                fullWidth
                select
                label="Mes"
                value={fields.nuM_PERPLAN}
              >
                <MenuItem value="01">ENERO</MenuItem>
                <MenuItem value="02">FEBRERO</MenuItem>
                <MenuItem value="03">MARZO</MenuItem>
                <MenuItem value="04">ABRIL</MenuItem>
                <MenuItem value="05">MAYO</MenuItem>
                <MenuItem value="06">JUNIO</MenuItem>
                <MenuItem value="07">JULIO</MenuItem>
                <MenuItem value="08">AGOSTO</MenuItem>
                <MenuItem value="09">SEPTIEMBRE</MenuItem>
                <MenuItem value="10">OCTUBRE</MenuItem>
                <MenuItem value="11">NOVIEMBRE</MenuItem>
                <MenuItem value="12">DICIEMBRE</MenuItem>
              </TextField>
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
            <Grid item md={2} sm={12} xs={12} />

          </Grid>
        </Stack>
      </Grid>
      <br />
      <Grid container spacing={1}>
        <Grid item md={12} sm={12} xs={12}>
          <DataGridDemo
            height={"50VH"}
            id={(row) => row?.coD_PERPLAN}
            rows={data1}
            columns={columns}
          />
        {/* </Grid>
        <Grid item md={12} sm={12} xs={12}>
          <h1 style={{ color: "red" }}>Planilla de Pagos</h1>
         </Grid>
        <Grid item md={12} sm={12} xs={12}>
          <DataGridDemo
            height={"50vh"}
            id={(row) => row.codigo}
            rows={data3}
            columns={columns2}
            toolbar={customToolbar}
          /> */}
        </Grid>
      </Grid>
      <br />
      <Stack direction="row" spacing={1} xs={{ display: "flex" }}>
      <Button
        size="large"
        variant="outlined"
        onClick={generatePaymentForm}/*  preview pdf */
      >
        <span>Reporte Planilla Pago</span>
      </Button>
      <Grid item md={3} xs={12} sm={12}>
        <Button
          size="large"
          variant="outlined"
          onClick={generateConceptSummaryForm}/*  preview pdf */
        >
          <span>Reporte Planilla Resumen Según Concepto</span>
        </Button>
      </Grid>
      <Grid item md={3} xs={12} sm={12}>
        <Button
          size="large"
          variant="outlined"
          onClick={generateSummaryFormTC}/*  preview pdf */
        >
          <span>Reporte Planilla Resumen Según Tipo y Concepto</span>
        </Button>
      </Grid>
      </Stack>
      <br />
      <Stack direction="row" spacing={1} xs={{ display: "flex" }}>
      <Button
        size="large"
        variant="outlined"
        onClick={HistoricalBallot}/*  preview pdf */
      >
        <span>Reporte Boleta de Pago</span>
      </Button>
      <Grid item md={3} xs={12} sm={12}>
        <Button
          size="large"
          variant="outlined"
          onClick={SummaryPayrollV1}/*  preview pdf */
        >
          <span>Reporte Resumen Planilla V1</span>
        </Button>
      </Grid>
      <Grid item md={3} xs={12} sm={12}>
        <Button
          size="large"
          variant="outlined"
          onClick={SummaryPayrollV2}/*  preview pdf */
        >
          <span>Reporte Resumen Planilla V2</span>
        </Button>
      </Grid>
      <Grid item md={3} xs={12} sm={12}>
        <Button
          size="large"
          variant="outlined"
          onClick={RemunerationReturn}/*  preview pdf */
        >
          <span>Reporte Planilla Remuneraciones</span>
        </Button>
      </Grid>
      </Stack>
    </>
  );
};

export default Report;