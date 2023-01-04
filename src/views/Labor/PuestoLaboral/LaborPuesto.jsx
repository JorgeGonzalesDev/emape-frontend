import {
  getPuestoLaboral,
  deletePuesto,
  AddOrUpdatePuesto,
} from "../../../service/labor/laborPuesto";
import MUIModal from "../../../components/Modal";
import DataGridDemo from "../../../components/Table";
import { useState, useEffect, useRef } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Button, Grid, TextField, Stack, MenuItem } from "@mui/material";
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
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { AlertDelete, AlertWarning } from "../../../components/Alerts";
import { AlertSuccess, AlertError } from "../../../components/Alerts";
import IconToolTip from "../../../components/Icons/IconToolTip";

var XLSX = require("xlsx");

const LaborPuesto = () => {
  const defaultfields = {
    coD_PUESTO: 0,
    noM_PUESTO: null
  }
  const [fields, setFields] = useState({
    coD_PUESTO: 0,
    noM_PUESTO: null
  });

  const [data, setData] = useState([]);
  const levelLaborPuesto = useRef();

  const [inputErrors, setInputErrors] = useState({
    noM_PUESTO: true,
  })

  const defaultErrors = {
    noM_PUESTO: false,
  }

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFields({ ...fields, [name]: value });
  };

  const loadData = async () => {
    const response = await getPuestoLaboral();
    setData(response.listado);
  };

  const destroy = async (event, id) => {
    const resultado = await AlertDelete();
    if (resultado) {
      const dataDelete = {
        'coD_PUESTO': id
      };
      await deletePuesto(dataDelete);
      await loadData();
    }
  };

  const edit = async (event, row) => {
    setFields(row);
    setInputErrors(defaultErrors);
    levelLaborPuesto.current.handleOpen();
  };

  useEffect(() => {
    loadData();
  }, []);

  const OpenRegister = () => {
    setFields(defaultfields);
    levelLaborPuesto.current.handleOpen();
  };


  const validateFields = () => {

    const copyFields = { ...fields };

    delete copyFields.coD_PUESTO;

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

  const columns = [
    {
      field: "Acciones",
      type: "actions",
      getActions: (cellValues) => [
        <IconToolTip text="Edit" icon={<EditIcon />} action={(event) => {
          edit(event, cellValues.row);
        }} />,
        <IconToolTip text="Delete" icon={<DeleteIcon />} action={(event) => {
          destroy(event, cellValues.row?.coD_PUESTO);
        }} />,
      ],
    },
    {
      field: "coD_PUESTO",
      headerName: "Código",
      width: 200,
    },
    {
      field: "noM_PUESTO",
      headerName: "Nombre",
      width: 500,
    },
  ];

  const saveLevelLaborPuesto = async () => {
    if (validateFields()) {
      const response = await AddOrUpdatePuesto(fields)
      if (response.code === 0) {
        levelLaborPuesto.current.handleOpen();
        await loadData();
        levelLaborPuesto.current.handleClose();
        await AlertSuccess(`${response.message}`)
        setFields(defaultfields)
      } else {
        levelLaborPuesto.current.handleClose();
        return await AlertError(`${response.message}`)
      }
    } else {
      return
    }

  };

  const downloadExcel = (dataExport) => {
    var Headers = [["INFORMACIÓN DE PUESTO LABORAL"]];
    let nData = [];
    dataExport.forEach((item) => {
      nData.push({
        Código: item?.coD_PUESTO,
        Nombre: item?.noM_PUESTO,
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
    XLSX.utils.book_append_sheet(workBook, workSheet, "Puesto Laboral");
    XLSX.write(workBook, { bookType: "xlsx", type: "buffer" });
    XLSX.write(workBook, { bookType: "xlsx", type: "binary" });
    XLSX.writeFile(workBook, "ReportePuestoLaboral.xlsx");
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
        <Button size="small" variant="text" onClick={OpenRegister}>
          <PersonAddIcon />
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
              "coD_PUESTO",
              "noM_PUESTO",
            ],
          }}
        />
      </GridToolbarContainer>
    );
  }
  return (
    <>
      <div style={{ flexGrow: 1 }}>
        <Stack
          direction="row"
          spacing={1} xs={{ mb: 1, display: 'flex' }}
        >
          <div>
            <h1>Puesto Laboral</h1>
          </div>
        </Stack>
        <DataGridDemo
          id={(row) => row?.coD_PUESTO}
          rows={data}
          columns={columns}
          toolbar={CustomToolbar}
        />
      </div>
      <MUIModal ref={levelLaborPuesto}>
        <Grid container spacing={2} justifyContent="center">
          <Grid item md={12} xs={12}>
            <h1>{fields.coD_PUESTO ? "Actualizar" : "Registrar"}</h1>
          </Grid>
          <Grid item md={12} xs={6}>
            <TextField
              name="noM_PUESTO"
              inputProps={{maxLength: 100}}
              onChange={handleInputChange}
              value={fields.noM_PUESTO}
              fullWidth
              error={inputErrors.noM_PUESTO}
              label="Nombre"
            />
          </Grid>
          <Grid item md={12} xs={12} />
          <Grid item md={12} xs={6}>
            <Button variant="contained" onClick={saveLevelLaborPuesto}>
              Enviar
            </Button>
          </Grid>
        </Grid>
      </MUIModal>
    </>
  );
};

export default LaborPuesto;
