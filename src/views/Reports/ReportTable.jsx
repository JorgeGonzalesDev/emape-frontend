import { useParams } from "react-router-dom";
import { getReportTable } from "../../service/common";
import DataGridDemo from "../../components/Table";
import { deletePerson, listPerson } from "../../service/person";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import PersonOffIcon from "@mui/icons-material/PersonOff";
import { PATH } from "../../service/config";
import { Button, MenuItem, Stack } from "@mui/material";
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
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import moment from "moment";
import { AlertDelete } from "../../components/Alerts";
import IconToolTip from "../../components/Icons/IconToolTip";
import jsPDF from "jspdf";
import "jspdf-autotable";

var XLSX = require("xlsx");

const ReportTable = () => {
  const { id } = useParams();

  const [data, setData] = useState([]);

  const loadData = async () => {
    const response = await getReportTable(id);
    setData(response.listado);
  };

  useEffect(() => {
    loadData();
  }, []);

  const downloadExcel = (dataExport) => {
    var Headers = [["Reporte"]];
    let nData = [];
    dataExport.forEach((item) => {
      nData.push({
        UNIDAD: item?.unidad,
        "APELLIDOS Y NOMBRES": item?.apellidosNombres,
        "Dias Lab.": item?.diasLaborables,
        "000010 SUELDO BASICO 2.1.1.1.1.4": item?.sueldoBasico,
        "000020 INC AFP 10.23% 2.1.1.1.2.99": item?.afP_020,
        "000030 INC AFP 3% 2.1.1.1.2.99": item?.afP_030,
        "000082 RACIONAMIENTO 2.1.1.1.2.99": item?.racionamiento,
        "000399 ASIG-FAMILIAR 2.1.1.1.2.99": item?.asignacionFamiliar,
        VACACIONES: item?.vacaciones,
        "LICENCIA CON GOCE HABER": item?.licenciaConGoceHaber,
        "100038 MOVILIDAD 2.1.1.1.2.99": item?.movilidad,
        "Bonif. Vacacional": item?.bonificacionFamiliar,
        "Reint Con CeRift": item?.reintConCertif,
        "Reint sin CeRlif.": item?.reintSinCertif,
        "INGRESOS INAFECTOS": item?.ingresosInafectos,
        "Remun Bruta": item?.remuneracionBruta,
        "Remun Calculable": item?.reumneracionCalculable,
        "Min Tard": item?.minutosTardanza,
        "Dias Falta": item?.diasFalta,
        Licencias: item?.licencias,
        "SIST. PENSIONES": item?.sistemaPensiones,
        "Aporte Obligatorio": item?.aporteObligatorio,
        "Prima de Seguro": item?.primaSeguro,
        "Comis. Variable": item?.comisionVariable,
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
      headerName: "000010 SUELDO BASICO 2.1.1.1.1.4",
      width: 200,
    },
    {
      field: "afP_020",
      headerName: "000020 INC AFP 10.23% 2.1.1.1.2.99",
      width: 200,
    },
    {
      field: "afP_030",
      headerName: "000030 INC AFP 3% 2.1.1.1.2.99",
      width: 200,
    },
    {
      field: "racionamiento",
      headerName: "000082 RACIONAMIENTO 2.1.1.1.2.99",
      width: 200,
    },
    {
      field: "asignacionFamiliar",
      headerName: "000399 ASIG-FAMILIAR 2.1.1.1.2.99",
      width: 200,
    },
    {
      field: "vacaciones",
      headerName: "VACACIONES",
      width: 200,
    },
    {
      field: "licenciaConGoceHaber",
      headerName: "LICENCIA CON GOCE HABER",
      width: 200,
    },
    {
      field: "movilidad",
      headerName: "100038 MOVILIDAD 2.1.1.1.2.99",
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
    }
  ];
  // const columns = [
  //   {
  //     field: "unidad",
  //     headerName: "Unidad",
  //     width: 400,
  //   },
  //   {
  //     field: "apellidosNombres",
  //     headerName: "Apellidos y Nombres",
  //     width: 400,
  //   },
  //   {
  //     field: "diasLaborables",
  //     headerName: "Dias Lab.",
  //     width: 200,
  //   },
  //   {
  //     field: "sueldoBasico",
  //     headerName: "000010 SUELDO BASICO 2.1.1.1.1.4",
  //     width: 200,
  //   },
  //   {
  //     field: "afP_020",
  //     headerName: "000020 INC AFP 10.23% 2.1.1.1.2.99",
  //     width: 200,
  //   },
  //   {
  //     field: "afP_030",
  //     headerName: "000030 INC AFP 3% 2.1.1.1.2.99",
  //     width: 200,
  //   },
  //   {
  //     field: "racionamiento",
  //     headerName: "000082 RACIONAMIENTO 2.1.1.1.2.99",
  //     width: 200,
  //   },
  //   {
  //     field: "asignacionFamiliar",
  //     headerName: "000399 ASIG-FAMILIAR 2.1.1.1.2.99",
  //     width: 200,
  //   },
  //   {
  //     field: "vacaciones",
  //     headerName: "VACACIONES",
  //     width: 200,
  //   },
  //   {
  //     field: "licenciaConGoceHaber",
  //     headerName: "LICENCIA CON GOCE HABER",
  //     width: 200,
  //   },
  //   {
  //     field: "movilidad",
  //     headerName: "100038 MOVILIDAD 2.1.1.1.2.99",
  //     width: 200,
  //   },
  //   {
  //     field: "bonificacionFamiliar",
  //     headerName: "Bonif. Vacacional",
  //     width: 200,
  //   },
  //   {
  //     field: "reintConCertif",
  //     headerName: "Reint Con CeRift",
  //     width: 200,
  //   },
  //   {
  //     field: "reintSinCertif",
  //     headerName: "Reint Sin CeRift",
  //     width: 200,
  //   },
  //   {
  //     field: "ingresosInafectos",
  //     headerName: "INGRESOS INAFECTOS",
  //     width: 200,
  //   },
  //   {
  //     field: "minutosTardanza",
  //     headerName: "Min Tard",
  //     width: 200,
  //   },
  //   {
  //     field: "diasFalta",
  //     headerName: "Dias Faltas",
  //     width: 200,
  //   },
  //   {
  //     field: "licencias",
  //     headerName: "Licencias",
  //     width: 200,
  //   },
  //   {
  //     field: "sistemaPensiones",
  //     headerName: "SIST. PENSIONES",
  //     width: 200,
  //   },
  //   {
  //     field: "aporteObligatorio",
  //     headerName: "Aporte Obligatorio",
  //     width: 200,
  //   },
  //   {
  //     field: "primaSeguro",
  //     headerName: "Prima de Seguro",
  //     width: 200,
  //   },
  //   {
  //     field: "comisionVariable",
  //     headerName: "Comis. Variable",
  //     width: 200,
  //   },
  //   {
  //     field: "faltas",
  //     headerName: "Faltas",
  //     width: 200,
  //   },
  //   {
  //     field: "tardanzas",
  //     headerName: "Tardanzas",
  //     width: 200,
  //   },
  //   {
  //     field: "quintaaCategoria",
  //     headerName: "5ta Categoría",
  //     width: 200,
  //   },
  //   {
  //     field: "cuotaSindical",
  //     headerName: "Cuota Sindical",
  //     width: 200,
  //   },
  //   {
  //     field: "essVida",
  //     headerName: "ESSVIDA",
  //     width: 200,
  //   },
  //   {
  //     field: "otrosDescuentos",
  //     headerName: "Otros Descuentos",
  //     width: 200,
  //   },
  //   {
  //     field: "eps",
  //     headerName: "EPS",
  //     width: 200,
  //   },
  //   {
  //     field: "essalud",
  //     headerName: "ESSALUD",
  //     width: 200,
  //   },
  //   {
  //     field: "remuneracionBruta",
  //     headerName: "Remun. Bruta",
  //     width: 200,
  //   },
  //   {
  //     field: "reumneracionCalculable",
  //     headerName: "Remun. Calculable",
  //     width: 200,
  //   },
  //   {
  //     field: "totalAportacion",
  //     headerName: "Aport. Total",
  //     width: 200,
  //   },
  //   {
  //     field: "totalDescuentos",
  //     headerName: "Desc. Total",
  //     width: 200,
  //   },
  //   {
  //     field: "totalAportes",
  //     headerName: "Total Aportes",
  //     width: 200,
  //   },
  //   {
  //     field: "netoPagar",
  //     headerName: "Pago Neto",
  //     width: 200,
  //   }
  // ];
  const columnsPDF = [
    {
      field: "unidad",
      header: "Unidad",
      width: 400,
    },
    {
      field: "apellidosNombres",
      header: "Apellidos y Nombres",
      width: 400,
    },
    {
      field: "diasLaborables",
      header: "Dias Lab.",
      width: 200,
    },
    {
      field: "sueldoBasico",
      header: "000010 SUELDO BASICO 2.1.1.1.1.4",
      width: 200,
    },
    {
      field: "afP_020",
      header: "000020 INC AFP 10.23% 2.1.1.1.2.99",
      width: 200,
    },
    {
      field: "afP_030",
      header: "000030 INC AFP 3% 2.1.1.1.2.99",
      width: 200,
    },
    {
      field: "racionamiento",
      header: "000082 RACIONAMIENTO 2.1.1.1.2.99",
      width: 200,
    },
    {
      field: "asignacionFamiliar",
      header: "000399 ASIG-FAMILIAR 2.1.1.1.2.99",
      width: 200,
    },
    {
      field: "vacaciones",
      header: "VACACIONES",
      width: 200,
    },
    {
      field: "licenciaConGoceHaber",
      header: "LICENCIA CON GOCE HABER",
      width: 200,
    },
    {
      field: "movilidad",
      header: "100038 MOVILIDAD 2.1.1.1.2.99",
      width: 200,
    },
    {
      field: "bonificacionFamiliar",
      header: "Bonif. Vacacional",
      width: 200,
    },
    {
      field: "reintConCertif",
      header: "Reint Con CeRift",
      width: 200,
    },
    {
      field: "reintSinCertif",
      header: "Reint Sin CeRift",
      width: 200,
    },
    {
      field: "ingresosInafectos",
      header: "INGRESOS INAFECTOS",
      width: 200,
    },
    {
      field: "remuneracionBruta",
      header: "Remun. Bruta",
      width: 200,
    },
    {
      field: "reumneracionCalculable",
      header: "Remun. Calculable",
      width: 200,
    },
    {
      field: "minutosTardanza",
      header: "Min Tard",
      width: 200,
    },
    {
      field: "diasFalta",
      header: "Dias Faltas",
      width: 200,
    },
    {
      field: "licencias",
      header: "Licencias",
      width: 200,
    },
    {
      field: "sistemaPensiones",
      header: "SIST. PENSIONES",
      width: 200,
    },
    {
      field: "aporteObligatorio",
      header: "Aporte Obligatorio",
      width: 200,
    },
    {
      field: "primaSeguro",
      header: "Prima de Seguro",
      width: 200,
    },
    {
      field: "comisionVariable",
      header: "Comis. Variable",
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
    </>
  );
};

export default ReportTable;
