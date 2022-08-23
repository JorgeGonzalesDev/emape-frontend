import ResponsiveAppBar from "../../layouts/Header";
import DataGridDemo from "../../components/Table";
import { deletePerson, listPerson } from "../../service/person";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Button, MenuItem, Stack } from "@mui/material";
import {
  GridActionsCellItem,
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
var XLSX = require("xlsx");

const Person = () => {
  const [data, setData] = useState([]);

  const loadData = async () => {
    const response = await listPerson();
    setData(response.listado);
  };

  useEffect(() => {
    loadData();
  }, []);

  const destroy = async (event, id) => {
    const resultado = await AlertDelete();
    if (resultado) {
      const dataDelete = {
        coD_PERS: id,
      };
      await deletePerson(dataDelete);
      await loadData();
    }
  };

  const columns = [
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
        `${params.row.deS_APELLP || ""} ${params.row.deS_APELLM || ""} ${
          params.row.noM_PERS || ""
        }`,
    },
    {
      field: "nuM_DOC",
      headerName: "Documento",
      width: 160,
    },
    {
      field: "feC_NACIM",
      headerName: "Nacimiento",
      width: 160,
      valueGetter: (params) =>
        `${moment(params.row.feC_NACIM).format("DD-MM-YYYY")}`,
    },
    {
      field: "inD_SEXO",
      headerName: "Sexo",
      width: 130,
      valueGetter: (params) =>
        `${params.row.inD_SEXO === "M" ? "Masculino" : "Femenino"}`,
    },
    {
      field: "inD_ESTADO",
      headerName: "Estado",
      width: 130,
      valueGetter: (params) =>
        `${params.row.inD_ESTADO === "A" ? "Activo" : "Inactivo"}`,
    },
    {
      field: "acciones",
      type: "actions",
      disableExport: true,
      getActions: (cellValues) => [
        <Link
          to={`/maestro/persona/registrar/${cellValues.row.coD_PERS}`}
          style={{ textDecoration: "none" }}
        >
          <GridActionsCellItem icon={<EditIcon />} label="Edit" />
        </Link>,
        <GridActionsCellItem
          icon={<DeleteIcon />}
          label="Delete"
          onClick={(event) => {
            destroy(event, cellValues.row.coD_PERS);
          }}
        />,
      ],
    },
  ];

  const downloadExcel = (dataExport) => {
    var Headers = [["INFORMACIÓN DE PERSONAS"]];
    let nData = [];
    dataExport.forEach((item) => {
      nData.push({
        Código: item?.coD_PERS,
        "Apellidos y nombres": item?.full_name,
        Documento: item?.nuM_DOC,
        Nacimiento: item?.feC_NACIM,
        Sexo: item?.inD_SEXO,
        Estado: item?.inD_ESTADO,
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

  const GridToolbarExport = ({ csvOptions, printOptions, ...other }) => (
    <GridToolbarExportContainer {...other}>
      <GridPrintExportMenuItem options={printOptions} />
      <ExcelExportMenuItem />
    </GridToolbarExportContainer>
  );

  function CustomToolbar() {
    return (
      <GridToolbarContainer>
        <Link
          to="/maestro/persona/registrar"
          style={{ textDecoration: "none" }}
        >
          <Button size="small" variant="text">
            <PersonAddIcon />
            <span>&nbsp;&nbsp;&nbsp;Agregar</span>
          </Button>
        </Link>
        <GridToolbarColumnsButton />
        <GridToolbarFilterButton />
        <GridToolbarDensitySelector />
        <GridToolbarExport
          printOptions={{
            hideFooter: true,
            hideToolbar: true,
            fields: [
              "full_name",
              "nuM_DOC",
              "feC_NACIM",
              "inD_SEXO",
              "inD_ESTADO",
              "acciones",
            ],
          }}
        />
      </GridToolbarContainer>
    );
  }

  return (
    <>
      <ResponsiveAppBar>
        <div
          style={{
            padding: "0px 30px 0px 30px",
            display: "flex",
            height: "100%",
          }}
        >
          <div style={{ flexGrow: 1 }}>
            <Stack
              direction="row"
              spacing={1}
              sx={{ mb: 1, justifyContent: "right" }}
            >
              <Button size="medium" variant="contained">
                ? Ayuda
              </Button>
            </Stack>
            <DataGridDemo
              id={(row) => row.coD_PERS}
              rows={data}
              columns={columns}
              toolbar={CustomToolbar}
            />
          </div>
        </div>
      </ResponsiveAppBar>
    </>
  );
};

export default Person;
