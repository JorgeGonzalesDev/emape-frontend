import {
  getLevelEducate,
  deleteLevelEducate,
  AddOrUpdateLevelEducate,
} from "../../service/nivelEducate";
import MUIModal from "../../components/Modal";
import DataGridDemo from "../../components/Table";
import { useState, useEffect, useRef } from "react";
import SchoolIcon from "@mui/icons-material/School";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Button, Grid, TextField, Stack, MenuItem} from "@mui/material";
import {
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  gridFilteredSortedRowIdsSelector,
  gridVisibleColumnFieldsSelector,
  useGridApiContext,
  GridToolbarExportContainer,
  GridToolbarDensitySelector,
} from "@mui/x-data-grid";
import { AlertDelete, AlertWarning } from "../../components/Alerts";
import { AlertSuccess, AlertError } from "../../components/Alerts";
import IconToolTip from "../../components/Icons/IconToolTip";
var XLSX = require("xlsx");

const LevelEducate = () => {
  const defaultfields = {
    coD_GRDINSTRUC: 0,
    deS_GRDINSTRUC: null,
    abreviadO_GRADO: null,
  }
  const [fields, setFields] = useState({
    coD_GRDINSTRUC: 0,
    deS_GRDINSTRUC: null,
    abreviadO_GRADO: null,
  });

  const [data, setData] = useState([]);
  const levelEducateChild = useRef();

  const [inputErrors, setInputErrors] = useState({
    deS_GRDINSTRUC: true,
    abreviadO_GRADO: true,
  })

  const defaultErrors = {
    deS_GRDINSTRUC: false,
    abreviadO_GRADO: false,
  }

  const validateFields = () => {

    const copyFields = { ...fields };

    delete copyFields.coD_GRDINSTRUC;

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
    const response = await getLevelEducate();
    setData(response.listado);
  };
  /*  */
  const destroy = async (event, id) => {
    const resultado = await AlertDelete();
    if (resultado) {
      const dataDelete = {
        'coD_GRDINSTRUC': id
      };
      await deleteLevelEducate(dataDelete);
      await loadData();
    }
  };
  /*  */
  const edit = async (event, row) => {
    setFields(row);
    setInputErrors(defaultErrors);
    levelEducateChild.current.handleOpen();
  };

  useEffect(() => {
    loadData();
  }, []);

  const columns = [
    {
      field: "Acciones",
      type: "actions",
      getActions: (cellValues) => [
        /*  */
        <IconToolTip text="Edit" icon={<EditIcon />} action={(event) => {
          edit(event, cellValues.row);
        }} />,
        /*  */
        /*  */
        <IconToolTip text="Delete" icon={<DeleteIcon />} action={(event) => {
          destroy(event, cellValues.row?.coD_GRDINSTRUC);
        }} />,
        /*  */
      ],
    },
    {
      field: "coD_GRDINSTRUC",
      headerName: "Código",
      width: 200,
    },
    {
      field: "deS_GRDINSTRUC",
      headerName: "Descripción",
      width: 500,
    },
    {
      field: "abreviadO_GRADO",
      headerName: "Abreviado",
      width: 400,
    },
  ];

  const OpenRegister = () => {
    setFields(defaultfields);
    levelEducateChild.current.handleOpen();
  };

  const saveLevelEducate = async () => {
    if (validateFields()) {
      const response = await AddOrUpdateLevelEducate(fields)
      if (response.code === 0) {
        levelEducateChild.current.handleOpen();
        await loadData();
        levelEducateChild.current.handleClose();
        await AlertSuccess(`${response.message}`)
        setFields(defaultfields)
      } else {
        levelEducateChild.current.handleClose();
        return await AlertError(`${response.message}`)
      }
    } else {
      return
    }
  };

  const downloadExcel = (dataExport) => {
    var Headers = [["INFORMACIÓN DE NIVEL EDUCATIVO"]];
    let nData = [];
    dataExport.forEach((item) => {
      nData.push({
        Código: item?.coD_GRDINSTRUC,
        "Descripción": item?.deS_GRDINSTRUC,
        Abreviado: item?.abreviadO_GRADO,
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
    XLSX.utils.book_append_sheet(workBook, workSheet, "Nivel Educativo");
    XLSX.write(workBook, { bookType: "xlsx", type: "buffer" });
    XLSX.write(workBook, { bookType: "xlsx", type: "binary" });
    XLSX.writeFile(workBook, "ReporteNivelEducativo.xlsx");
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
          <SchoolIcon />
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
              "coD_GRDINSTRUC",
              "deS_GRDINSTRUC",
              "abreviadO_GRADO",
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
            <h1>Nivel Educativo</h1>
          </div>
        </Stack>
        <DataGridDemo
          id={(row) => row?.coD_GRDINSTRUC}
          rows={data}
          columns={columns}
          toolbar={CustomToolbar}
        />
      </div>
      <MUIModal ref={levelEducateChild}>
        <Grid container spacing={2} justifyContent="center">
          <Grid item md={12} xs={12}>
            <h1>{fields.coD_GRDINSTRUC ? "Actualizar" : "Registrar"}</h1>
          </Grid>
          <Grid item md={12} xs={6}>
            <TextField
              name="deS_GRDINSTRUC"
              inputProps={{maxLength: 100}}
              onChange={handleInputChange}
              value={fields.deS_GRDINSTRUC}
              fullWidth
              error={inputErrors.deS_GRDINSTRUC}
              label="Nombre"
            />
          </Grid>
          <Grid item md={12} xs={12} />
          <Grid item md={12} xs={6}>
            <TextField
              name="abreviadO_GRADO"
              inputProps={{maxLength: 40}}
              onChange={handleInputChange}
              error={inputErrors.abreviadO_GRADO}
              value={fields.abreviadO_GRADO}
              fullWidth
              label="Abreviación"
            />
          </Grid>
          <Grid item md={12} xs={12} />
          <Grid item md={12} xs={6}>
            <Button variant="contained" onClick={saveLevelEducate}>
              Enviar
            </Button>
          </Grid>
        </Grid>
      </MUIModal>
    </>
  );
};

export default LevelEducate;
