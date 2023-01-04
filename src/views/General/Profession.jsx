import {
  getProfessions,
  deleteProfessions,
  AddOrUpdateProfessions,
} from "../../service/profession";
import MUIModal from "../../components/Modal";
import DataGridDemo from "../../components/Table";
import { useState, useEffect, useRef } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Button, Grid, TextField, Stack, MenuItem} from "@mui/material";

import {
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
} from "@mui/x-data-grid";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { AlertDelete, AlertWarning } from "../../components/Alerts";
import { AlertSuccess, AlertError } from "../../components/Alerts";
import IconToolTip from "../../components/Icons/IconToolTip";
var XLSX = require("xlsx");

const Profession = () => {
  const defaultfields = {
    coD_PROFES: 0,
    deS_PROFES: null,
    abR_PROFES: null,
  }

  const [fields, setFields] = useState({
    coD_PROFES: 0,
    deS_PROFES: null,
    abR_PROFES: null,
  });

  const [data, setData] = useState([]);
  const levelProfessions = useRef();

  const [inputErrors, setInputErrors] = useState({
    deS_PROFES: true,
    abR_PROFES: true,
  })

  const defaultErrors = {
    deS_PROFES: false,
    abR_PROFES: false,
  }

  const validateFields = () => {

    const copyFields = { ...fields };

    delete copyFields.coD_PROFES;

    let errors = {};

    Object.keys(copyFields).forEach(key => {
      if (copyFields[key] === null || copyFields[key] === '' || copyFields[key] === 0 || !copyFields[key]) {

        console.log(
          `El campo ${key} => ${copyFields[key]} no puede estar vacío`
        );

        errors[`${key}`] = true;
      }
    });

    if (Object.keys(errors).length > 0) {

      setInputErrors(errors);
      AlertWarning("Hay campos obligatorios vacios");
      return false;
    }

    setInputErrors(errors);
    return true;

  }

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFields({ ...fields, [name]: value });
  };

  const loadData = async () => {
    const response = await getProfessions();
    setData(response.listado);
  };

  const destroy = async (event, id) => {
    const resultado = await AlertDelete();

    if (resultado) {
      const dataDelete = {
        'coD_PROFES': id,
      };
      await deleteProfessions(dataDelete);
      await loadData();
    }
  };

  const edit = async (event, row) => {
    setFields(row);
    setInputErrors(defaultErrors);
    levelProfessions.current.handleOpen();
  };

  useEffect(() => {
    loadData();
  }, []);

  const columns = [
    {
      field: "Acciones",
      type: "actions",
      getActions: (cellValues) => [
        <IconToolTip text="Editar" icon={<EditIcon />} action={(event) => {
          edit(event, cellValues.row);
        }} />,
        <IconToolTip text="Delete" icon={<DeleteIcon />} action={(event) => {
          destroy(event, cellValues.row?.coD_PROFES);
        }} />,
      ],
    },
    {
      field: "coD_PROFES",
      headerName: "Código",
      width: 200,
    },
    {
      field: "deS_PROFES",
      headerName: "Descripcion",
      width: 500,
    },
    {
      field: "abR_PROFES",
      headerName: "Abreviado",
      width: 400,
    },

  ];

  const OpenRegister = () => {
    setFields(defaultfields);
    levelProfessions.current.handleOpen();
  };

  const saveProfessions = async () => {
    if (validateFields()) {
      const response = await AddOrUpdateProfessions(fields)
      if (response.code === 0) {
        levelProfessions.current.handleOpen();
        await loadData();
        levelProfessions.current.handleClose();
        await AlertSuccess(`${response.message}`)
        setFields(defaultfields)

      } else {
        levelProfessions.current.handleClose();
        return await AlertError(`${response.message}`)

      }
    } else {
      return
    }

  };

  const downloadExcel = (dataExport) => {
    var Headers = [["INFORMACIÓN DE PROFESIÓN"]];
    let nData = [];
    dataExport.forEach((item) => {
      nData.push({
        Código: item?.coD_PROFES,
        "Descripción": item?.deS_PROFES,
        Abreviado: item?.abR_PROFES,
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
    XLSX.utils.book_append_sheet(workBook, workSheet, "Profesión");
    XLSX.write(workBook, { bookType: "xlsx", type: "buffer" });
    XLSX.write(workBook, { bookType: "xlsx", type: "binary" });
    XLSX.writeFile(workBook, "ReporteProfesión.xlsx");
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
              "coD_PROFES",
              "deS_PROFES",
              "abR_PROFES",
            ],
          }}
        />
      </GridToolbarContainer>
    );
  }
  
  const GridToolbarExport = ({ csvOptions, printOptions, ...other }) => (
    <GridToolbarExportContainer {...other}>
      <ExcelExportMenuItem />
    </GridToolbarExportContainer>
  );


  return (
    <>
      <div style={{ flexGrow: 1 }}>
        <Stack
          direction="row"
          spacing={1} xs={{ mb: 1, display: 'flex' }}
        >
          <div>
            <h1>Profesión</h1>
          </div>
        </Stack>
        <DataGridDemo
          id={(row) => row?.coD_PROFES}
          rows={data}
          columns={columns}
          toolbar={CustomToolbar}
        />
      </div>
      <MUIModal ref={levelProfessions}>
        <Grid container spacing={2} justifyContent="center">
          <Grid item md={12} xs={12}>
            <h1>{fields.coD_PROFES ? "Actualizar" : "Registrar"}</h1>
          </Grid>
          <Grid item md={12} xs={6}>
            <TextField
              name="deS_PROFES"
              inputProps={{maxLength: 100}}
              onChange={handleInputChange}
              value={fields.deS_PROFES}
              fullWidth
              error={inputErrors.deS_PROFES}
              label="Descripción"
            />
          </Grid>
          <Grid item md={12} xs={12} />
          <Grid item md={12} xs={6}>
            <TextField
              name="abR_PROFES"
              inputProps={{maxLength: 30}}
              onChange={handleInputChange}
              value={fields.abR_PROFES}
              fullWidth
              error={inputErrors.abR_PROFES}
              label="Abreviado"
            />
          </Grid>
          <Grid item md={12} xs={12} />
          <Grid item md={12} xs={6}>
            <Button variant="contained" onClick={saveProfessions}>
              Enviar
            </Button>
          </Grid>
        </Grid>
      </MUIModal>
    </>
  );
};

export default Profession;
