import {
  listMotivoPapeleta, getMotivoPapeleta, deleteMotivoPapeleta, AddOrUpdateMotivoPapeleta,
} from "../../service/ballots/workreason/";
import MUIModal from "../../components/Modal";
import DataGridDemo from "../../components/Table";
import { useState, useEffect, useRef } from "react";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Button, Grid, TextField, Stack, MenuItem} from "@mui/material";
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
} from "@mui/x-data-grid";
import { AlertDelete } from "../../components/Alerts";
import { AlertSuccess, AlertError } from "../../components/Alerts";
import IconToolTip from "../../components/Icons/IconToolTip";
import { AlertWarning } from "../../components/Alerts";
var XLSX = require("xlsx");

const WorkReason = ({ id }) => {
  const defaultfields = {
    coD_MOTIVO: 0,
    noM_MOTIVO: null,
  }

  const defaultErrors = {
    noM_MOTIVO: true,
  };

  const [fields, setFields] = useState({
    coD_MOTIVO: 0,
    noM_MOTIVO: null,
  });

  const [data, setData] = useState([]);
  const levelEducateChild = useRef();
  const [detail, setDetail] = useState({});
  const [inputError, setInputError] = useState(defaultErrors);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFields({ ...fields, [name]: value });
  };

  const loadData = async () => {
    setInputError({
      noM_MOTIVO: false,
    });

    const response = await listMotivoPapeleta();
    setData(response.listado);
  };
  /*  */
  const validateFields = () => {

    const copyFields = { ...fields };
    delete copyFields.coD_MOTIVO;

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
  /*  */
  const destroy = async (event, id) => {
    const resultado = await AlertDelete();
    if (resultado) {
      const dataDelete = {
        'coD_MOTIVO': id
      };
      await deleteMotivoPapeleta(dataDelete);
      await loadData();
    }
  };
  /*  */
  const edit = async (event, row) => {
    setFields(row);
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
          destroy(event, cellValues.row.coD_MOTIVO);
        }} />,
        /*  */
      ],
    },
    {
      field: "coD_MOTIVO",
      headerName: "Código",
      width: 200,
    },
    {
      field: "noM_MOTIVO",
      headerName: "Nombre",
      width: 500,
    },
  ];

  const OpenRegister = () => {
    setFields(defaultfields);
    levelEducateChild.current.handleOpen();
  };

  const saveMotivoPapeleta = async () => {
    const validate = validateFields();
    if (!validate) return;
    const response = await AddOrUpdateMotivoPapeleta(fields)
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
    /* loadData();
    levelEducateChild.current.handleClose();
    setFields(fieldsDefault); */
  };
  const downloadExcel = (dataExport) => {
    var Headers = [["INFORMACIÓN DE MOTIVO LABORAL"]];
    let nData = [];
    dataExport.forEach((item) => {
      nData.push({
        "Código": item?.coD_MOTIVO,
        Nombre: item?.noM_MOTIVO,


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
    XLSX.utils.book_append_sheet(workBook, workSheet, "Motivo Laboral");
    XLSX.write(workBook, { bookType: "xlsx", type: "buffer" });
    XLSX.write(workBook, { bookType: "xlsx", type: "binary" });
    XLSX.writeFile(workBook, "ReporteMotivoLaboral.xlsx");
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
              "coD_MOTIVO",
              "noM_MOTIVO",
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
            <h1>Motivo Laboral</h1>
          </div>
        </Stack>
        <DataGridDemo
          id={(row) => row.coD_MOTIVO}
          rows={data}
          columns={columns}
          toolbar={CustomToolbar}
        />
      </div>
      <MUIModal ref={levelEducateChild}>
        <Grid container spacing={1.5} >
          <Grid item md={12} xs={12}>
            <h1>{fields.coD_MOTIVO ? "Actualizar" : "Registrar"} </h1>
          </Grid>
          <Grid item md={4} sm={12} xs={12}>
            <TextField
              name="noM_MOTIVO"
              error={inputError.noM_MOTIVO}
              fullWidth
              InputLabelProps={{
                shrink: true
              }}
              inputProps={{ maxlength: '100' }}
              size="small"
              label="Nombre"
              onChange={handleInputChange}
              value={fields.noM_MOTIVO}
            />
          </Grid>
          {/* <Grid item md={4} sm={12} xs={12}>
                        <TextField
                            name="inD_ASISTENCIA"
                            fullWidth
                            InputLabelProps={{
                                shrink: true
                            }}
                            inputProps={{maxlength:'1'}}
                            size="small"
                            label="Estado"
                            onChange={handleInputChange}
                            value={fields.inD_ASISTENCIA}
                        />
                    </Grid> */}
          <Grid item md={12} />
          <Grid item md={12}>
            <Button onClick={saveMotivoPapeleta} variant="contained" >
              Guardar
            </Button>
          </Grid>
        </Grid>
      </MUIModal>
    </>
  );
};

export default WorkReason;