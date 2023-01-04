import { useParams } from "react-router-dom";
import { getReportTable } from "../../service/common";
import DataGridDemo from "../../components/Table";
import { useState, useEffect, useRef} from "react";
import { MenuItem, Stack, Grid } from "@mui/material";
import {
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarExportContainer,
  GridToolbarDensitySelector,
  gridFilteredSortedRowIdsSelector,
  gridVisibleColumnFieldsSelector,
  useGridApiContext,
} from "@mui/x-data-grid";
import jsPDF from "jspdf";
import MUIPreload from "../../components/Modal/preload";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import "jspdf-autotable";

var XLSX = require("xlsx");

const ReportTable = () => {
  const { id } = useParams();

  const [data, setData] = useState([]);
  const levelEducateChild = useRef();
  const loadData = async () => {
    levelEducateChild.current.handleOpen();
    const response = await getReportTable(id);
    if(response.code === 0){
      setData(response.listado);
    }
    levelEducateChild.current.handleClose();

  };

  useEffect(() => {
    loadData();
  }, []);

  const downloadExcel = (dataExport) => {
    var Headers = [["Reporte"]];
    let nData = [];
    dataExport.forEach((item) => {
      nData.push({
        "UNIDAD": item?.unidad,
        "APELLIDOS Y NOMBRES": item?.apellidosNombres,
        "Dias Lab.": item?.diasLaborables,
        "SUELDO BASICO": item?.sueldoBasico,
        "INC AFP 10.23%": item?.afP_020,
        "INC AFP 3%": item?.afP_030,
        "RACIONAMIENTO": item?.racionamiento,
        "ASIG-FAMILIAR": item?.asignacionFamiliar,
        "VACACIONES.": item?.bonif_Vacacional,
        "ESCOLARIDAD": item?.escolaridad,
        "MOVILIDAD": item?.movilidad,
        "Bonif. Vacacional": item?.bonificacionFamiliar,
        "Reint Con CeRift": item?.reintConCertif,
        "Reint sin CeRlif": item?.reintSinCertif,
        "INGRESOS INAFECTOS": item?.ingresosInafectos,
        "Resumen. Bruta": item?.remuneracionBruta,
        "Renum Calculable": item?.reumneracionCalculable,
        "Min Tard": item?.minutosTardanza,
        "Dias Falta": item?.diasFalta,
        "Licencias": item?.licencias,
        "SIST. PENSIONES": item?.sistemaPensiones,
        "Aporte Obligatorio": item?.aporteObligatorio,
        "Prima de Seguro": item?.primaSeguro,
        "TOTAL APORTACION": item?.totalAportacion,
        "Comis. Variable": item?.comisionVariable,
        "FALTAS S/": item?.faltas,
        "TARDANZAS S/": item?.tardanzas,
        "5° CAT": item?.quintaCategoria,
        "CUOTA SINDICAL": item?.cuotaSindical,
        "ESS VIDA": item?.essVida,
        "DESC JUDICIAL 1": item?.desJud1,
        "DESC JUDICIAL 2.": item?.desJud2,
        "cajMet": item?.cajMet,
        "TOTAL DESCUENTOS": item?.totalDescuentos,
        "NETO A PAGAR": item?.netoPagar,
        "EPS": item?.eps,
        "ESSALUD": item?.essalud,
        "TOTAL APORTES": item?.totalAportes,
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
    XLSX.utils.book_append_sheet(workBook, workSheet, "Personas");
    XLSX.write(workBook, { bookType: "xlsx", type: "buffer" });
    XLSX.write(workBook, { bookType: "xlsx", type: "binary" });
    XLSX.writeFile(workBook, "ReportePersonas.xlsx");
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

  const PdfExportMenuItem = (props) => {
    const apiRef = useGridApiContext();

    const { hideMenu } = props;

    return (
      <MenuItem
        onClick={downloadPdf}
      >
        PDF
      </MenuItem>
    );
  };

  const GridToolbarExport = ({ csvOptions, printOptions, ...other }) => (
    <GridToolbarExportContainer {...other}>
      <ExcelExportMenuItem />
      <PdfExportMenuItem/>
    </GridToolbarExportContainer>
  );

  function CustomToolbar() {
    return (
      <GridToolbarContainer>
        <GridToolbarFilterButton />
        <GridToolbarColumnsButton />
        <GridToolbarDensitySelector />
        <GridToolbarExport />
      </GridToolbarContainer>
    );
  }

  const columns = [
    {
      field: "unidad",
      headerName: "Unidad",
      width: 400,
    },
    {
      field: "apellidosNombres",
      headerName: "Apellidos y Nombres",
      width: 400,
    },
    {
      field: "diasLaborables",
      headerName: "Dias Lab.",
      width: 200,
    },
    {
      field: "sueldoBasico",
      headerName: "SUELDO BASICO",
      width: 200,
    },
    {
      field: "afP_020",
      headerName: "INC AFP 10.23%",
      width: 200,
    },
    {
      field: "afP_030",
      headerName: "INC AFP 3%",
      width: 200,
    },
    {
      field: "racionamiento",
      headerName: "RACIONAMIENTO",
      width: 200,
    },
    {
      field: "asignacionFamiliar",
      headerName: "ASIG-FAMILIAR",
      width: 200,
    },
    {
      field: "bonif_Vacacional",
      headerName: "VACACIONES",
      width: 200,
    },
    {
      field: "escolaridad",
      headerName: "ESCOLARIDAD",
      width: 200,
    },
    {
      field: "movilidad",
      headerName: "MOVILIDAD",
      width: 200,
    },
    {
      field: "bonificacionFamiliar",
      headerName: "Bonif. Vacacional",
      width: 200,
    },
    {
      field: "reintConCertif",
      headerName: "Reint Con CeRift",
      width: 200,
    },
    {
      field: "reintSinCertif",
      headerName: "Reint Sin CeRift",
      width: 200,
    },
    {
      field: "ingresosInafectos",
      headerName: "INGRESOS INAFECTOS",
      width: 200,
    },
    {
      field: "remuneracionBruta",
      headerName: "Remun. Bruta",
      width: 200,
    },
    {
      field: "reumneracionCalculable",
      headerName: "Remun. Calculable",
      width: 200,
    },
    {
      field: "minutosTardanza",
      headerName: "Min Tard",
      width: 200,
    },
    {
      field: "diasFalta",
      headerName: "Dias Faltas",
      width: 200,
    },
    {
      field: "licencias",
      headerName: "Licencias",
      width: 200,
    },
    {
      field: "sistemaPensiones",
      headerName: "SIST. PENSIONES",
      width: 200,
    },
    {
      field: "aporteObligatorio",
      headerName: "Aporte Obligatorio",
      width: 200,
    },
    {
      field: "primaSeguro",
      headerName: "Prima de Seguro",
      width: 200,
    },
    {
      field: "comisionVariable",
      headerName: "Comis. Variable",
      width: 200,
    },
    {
      field: "totalAportacion",
      headerName: "TOTAL APORTACION",
      width: 200,
    },
    {
      field: "faltas",
      headerName: "FALTAS S/",
      width: 200,
    },
    {
      field: "tardanzas",
      headerName: "TARDANZAS S/",
      width: 200,
    },
    {
      field: "quintaCategoria",
      headerName: "5° CAT",
      width: 200,
    },
    {
      field: "cuotaSindical",
      headerName: "CUOTA SINDICAL",
      width: 200,
    },
    {
      field: "essVida",
      headerName: "ESS VIDA",
      width: 200,
    },
    {
      field: "desJud1",
      headerName: "DESC JUDICIAL 1",
      width: 200,
    },
    {
      field: "desJud2",
      headerName: "DESC JUDICIAL 2",
      width: 200,
    },
    {
      field: "otrosDescuentos",
      headerName: "OTROS DESCUENTOS",
      width: 200,
    },
    {
      field: "cajMet",
      headerName: "cajMet",
      width: 200,
    },
    {
      field: "totalDescuentos",
      headerName: "TOTAL DESCUENTOS",
      width: 200,
    },
    {
      field: "netoPagar",
      headerName: "NETO A PAGAR",
      width: 200,
    },
    {
      field: "eps",
      headerName: "EPS",
      width: 200,
    },
    {
      field: "essalud",
      headerName: "ESSALUD",
      width: 200,
    },
    {
      field: "totalAportes",
      headerName: "TOTAL APORTES",
      width: 200,
    }

  ];

  const columnsPDF = [
    {
      field: "unidad",
      headerName: "Unidad",
      width: 400,
    },
    {
      field: "apellidosNombres",
      headerName: "Apellidos y Nombres",
      width: 400,
    },
    {
      field: "diasLaborables",
      headerName: "Dias Lab.",
      width: 200,
    },
    {
      field: "sueldoBasico",
      headerName: "SUELDO BASICO",
      width: 200,
    },
    {
      field: "afP_020",
      headerName: "INC AFP 10.23%",
      width: 200,
    },
    {
      field: "afP_030",
      headerName: "INC AFP 3%",
      width: 200,
    },
    {
      field: "racionamiento",
      headerName: "RACIONAMIENTO",
      width: 200,
    },
    {
      field: "asignacionFamiliar",
      headerName: "ASIG-FAMILIAR",
      width: 200,
    },
    {
      field: "bonif_Vacacional",
      headerName: "VACACIONES",
      width: 200,
    },
    {
      field: "escolaridad",
      headerName: "ESCOLARIDAD",
      width: 200,
    },
    {
      field: "movilidad",
      headerName: "MOVILIDAD",
      width: 200,
    },
    {
      field: "bonificacionFamiliar",
      headerName: "Bonif. Vacacional",
      width: 200,
    },
    {
      field: "reintConCertif",
      headerName: "Reint Con CeRift",
      width: 200,
    },
    {
      field: "reintSinCertif",
      headerName: "Reint Sin CeRift",
      width: 200,
    },
    {
      field: "ingresosInafectos",
      headerName: "INGRESOS INAFECTOS",
      width: 200,
    },
    {
      field: "remuneracionBruta",
      headerName: "Remun. Bruta",
      width: 200,
    },
    {
      field: "reumneracionCalculable",
      headerName: "Remun. Calculable",
      width: 200,
    },
    {
      field: "minutosTardanza",
      headerName: "Min Tard",
      width: 200,
    },
    {
      field: "diasFalta",
      headerName: "Dias Faltas",
      width: 200,
    },
    {
      field: "licencias",
      headerName: "Licencias",
      width: 200,
    },
    {
      field: "sistemaPensiones",
      headerName: "SIST. PENSIONES",
      width: 200,
    },
    {
      field: "aporteObligatorio",
      headerName: "Aporte Obligatorio",
      width: 200,
    },
    {
      field: "primaSeguro",
      headerName: "Prima de Seguro",
      width: 200,
    },
    {
      field: "comisionVariable",
      headerName: "Comis. Variable",
      width: 200,
    },
    {
      field: "totalAportacion",
      headerName: "TOTAL APORTACION",
      width: 200,
    },
    {
      field: "faltas",
      headerName: "FALTAS S/",
      width: 200,
    },
    {
      field: "tardanzas",
      headerName: "TARDANZAS S/",
      width: 200,
    },
    {
      field: "quintaCategoria",
      headerName: "5° CAT",
      width: 200,
    },
    {
      field: "cuotaSindical",
      headerName: "CUOTA SINDICAL",
      width: 200,
    },
    {
      field: "essVida",
      headerName: "ESS VIDA",
      width: 200,
    },
    {
      field: "desJud1",
      headerName: "DESC JUDICIAL 1",
      width: 200,
    },
    {
      field: "desJud2",
      headerName: "DESC JUDICIAL 2",
      width: 200,
    },
    {
      field: "otrosDescuentos",
      headerName: "OTROS DESCUENTOS",
      width: 200,
    },
    {
      field: "cajMet",
      headerName: "cajMet",
      width: 200,
    },
    {
      field: "totalDescuentos",
      headerName: "TOTAL DESCUENTOS",
      width: 200,
    },
    {
      field: "netoPagar",
      headerName: "NETO A PAGAR",
      width: 200,
    },
    {
      field: "eps",
      headerName: "EPS",
      width: 200,
    },
    {
      field: "essalud",
      headerName: "ESSALUD",
      width: 200,
    },
    {
      field: "totalAportes",
      headerName: "TOTAL APORTES",
      width: 200,
    }
  ];
  const downloadPdf = () => {
    const doc = new jsPDF('l', 'em', 'a4', true);
    doc.autoTable({
      theme: "plain",
      styles: { fontSize: 5 },
      columns: columnsPDF.map((col) => ({ ...col, dataKey: col.field })),
      body: data,
    });
    doc.save("Reporte.pdf");
  };
  return (
    <>
      <div style={{ flexGrow: 1 }}>
        <Stack direction="row" spacing={1} xs={{ mb: 1, display: "flex" }}>
          <div>
            <h1>Reporte</h1>
          </div>
        </Stack>
        <DataGridDemo
          id={(row) => row?.apellidosNombres}
          rows={data}
          columns={columns}
          toolbar={CustomToolbar}
        />
      </div>
      <MUIPreload ref={levelEducateChild}>
          <Grid container spacing={2} justifyContent="center">
            <Box sx={{ display: 'flex' }}>
              <CircularProgress color="primary" size={70} />
            </Box>
          </Grid>
        </MUIPreload>
    </>
  );
};

export default ReportTable;
