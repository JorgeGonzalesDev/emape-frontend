import {
  getHorarioLaboral, deleteHorarioLaboral, AddOrUpdateHorarioLaboral,
} from "../../service/ballots/workhours/";
import MUIModal from "../../components/Modal";
import DataGridDemo from "../../components/Table";
import { useState, useEffect, useRef } from "react";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Button, Grid, TextField, Stack, MenuItem } from "@mui/material";
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
import { AlertDelete } from "../../components/Alerts";
import { AlertSuccess, AlertError } from "../../components/Alerts";
import IconToolTip from "../../components/Icons/IconToolTip";
import dayjs, { Dayjs } from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';

import { AlertWarning } from "../../components/Alerts";
var XLSX = require("xlsx");

const WorkHours = ({ id }) => {
  const defaultfields = {
    coD_HORARIO: 0,
    noM_HORARIO: null,
    horA_ENTRADA: null,
    horA_SALIDA: null,
    miN_TOLERANCIAENT: null
  }

  const defaultErrors = {
    noM_HORARIO: true,
    horA_ENTRADA: true,
    horA_SALIDA: true,
  };

  const [fields, setFields] = useState({
    coD_HORARIO: 0,
    noM_HORARIO: null,
    horA_ENTRADA: null,
    horA_SALIDA: null,
    miN_TOLERANCIAENT: null
  });

  const [data, setData] = useState([]);
  const levelEducateChild = useRef();
  const [inputError, setInputError] = useState({
    noM_HORARIO: false,
    horA_ENTRADA: false,
    horA_SALIDA: false,
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFields({ ...fields, [name]: value });
  };

  const loadData = async () => {


    const response = await getHorarioLaboral();
    setData(response.listado);
  };

  const validateFields = () => {

    const copyFields = { ...fields };
    delete copyFields.coD_HORARIO;
    delete copyFields.miN_TOLERANCIAENT;

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
        coD_HORARIO: id
      };
      await deleteHorarioLaboral(dataDelete);
      await loadData();
    }
  };
  /*  */
  const edit = async (event, row) => {
    const copyFields = {
      coD_HORARIO: row['coD_HORARIO'],
      noM_HORARIO: row['noM_HORARIO'],
      horA_ENTRADA: dayjs().hour(`${row['horA_ENTRADA'].substr(0,2)}`).second(`${row['horA_ENTRADA'].substr(6,2)}`).minute(`${row['horA_ENTRADA'].substr(3,2)}`),
      horA_SALIDA: dayjs().hour(`${row['horA_SALIDA'].substr(0,2)}`).second(`${row['horA_SALIDA'].substr(6,2)}`).minute(`${row['horA_SALIDA'].substr(3,2)}`),
      miN_TOLERANCIAENT: row['miN_TOLERANCIAENT']
    }
    setFields(copyFields);
    setInputError({
      noM_HORARIO: false,
      horA_ENTRADA: false,
      horA_SALIDA: false,
    });
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
          destroy(event, cellValues.row.coD_HORARIO);
        }} />,
        /*  */
      ],
    },
    {
      field: "coD_HORARIO",
      headerName: "Código",
      width: 150,
    },
    {
      field: "noM_HORARIO",
      headerName: "Nom. Horario",
      width: 250,
    },
    {
      field: "horA_ENTRADA",
      headerName: "Entrada",
      width: 100,
    },
    {
      field: "horA_SALIDA",
      headerName: "Salida",
      width: 100,
    },
    {
      field: "miN_TOLERANCIAENT",
      headerName: "Min. Tolerancia",
      width: 150,
    },
  ];

  const OpenRegister = () => {
    setFields(defaultfields);
    setInputError(defaultErrors)
    levelEducateChild.current.handleOpen();
  };

  const saveHorarioLaboral = async () => {
    const validate = validateFields();
    if (!validate) return;

    fields.horA_ENTRADA = `${fields.horA_ENTRADA['$H'].length === 2 ? fields.horA_ENTRADA['$H'] : `0${fields.horA_ENTRADA['$H']}`}:${fields.horA_ENTRADA['$m'].length === 2 ? fields.horA_ENTRADA['$m'] : `0${fields.horA_ENTRADA['$m']}`}:${fields.horA_ENTRADA['$s'].length === 2 ? fields.horA_ENTRADA['$s'] : `0${fields.horA_ENTRADA['$s']}`}`
    fields.horA_SALIDA = `${fields.horA_SALIDA['$H'].length === 2 ? fields.horA_SALIDA['$H'] : `0${fields.horA_SALIDA['$H']}`}:${fields.horA_SALIDA['$m'].length === 2 ? fields.horA_SALIDA['$m'] : `0${fields.horA_SALIDA['$m']}`}:${fields.horA_SALIDA['$s'].length === 2 ? fields.horA_SALIDA['$s'] : `0${fields.horA_SALIDA['$s']}`}`
    const response = await AddOrUpdateHorarioLaboral(fields)
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
              "coD_HORARIO",
              "noM_HORARIO",
              "horA_ENTRADA",
              "horA_SALIDA",
              "miN_TOLERANCIAENT",
            ],
          }}
        />
      </GridToolbarContainer>
    );
  }
  const downloadExcel = (dataExport) => {
    var Headers = [["INFORMACIÓN DE HORARIO LABORAL"]];
    let nData = [];
    dataExport.forEach((item) => {
      nData.push({
        "Código Turno": item?.coD_HORARIO,
        "Nombre Horario": item?.noM_HORARIO,
        Entrada: item?.horA_ENTRADA,
        Salida: item?.horA_SALIDA,
        "Minutos Tolerancia": item?.miN_TOLERANCIAENT,
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
    XLSX.utils.book_append_sheet(workBook, workSheet, "Horario Laboral");
    XLSX.write(workBook, { bookType: "xlsx", type: "buffer" });
    XLSX.write(workBook, { bookType: "xlsx", type: "binary" });
    XLSX.writeFile(workBook, "ReporteHorarioLaboral.xlsx");
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
  return (
    <>
      <div style={{ flexGrow: 1 }}>
        <Stack
          direction="row"
          spacing={1} xs={{ mb: 1, display: 'flex' }}
        >
          <div>
            <h1>Horario Laboral</h1>
          </div>
        </Stack>
        <DataGridDemo
          id={(row) => row.coD_HORARIO}
          rows={data}
          columns={columns}
          toolbar={CustomToolbar}
        />
      </div>
      <MUIModal ref={levelEducateChild}>
        <Grid container spacing={1.5} >
          <Grid item md={12}>
          <span style={{color:'red'}}>Los campos (*) son obligatorios</span>
          </Grid>
          <Grid item md={12} />

          <Grid item md={5} sm={12} xs={12}>
            <TextField
              name="noM_HORARIO"
              fullWidth
              InputLabelProps={{
                shrink: true
              }}
              inputProps={{maxLength: 50}}
              size="small"
              label="Nombre Horario *"
              onChange={handleInputChange}
              value={fields.noM_HORARIO}
              error={inputError.noM_HORARIO}
            />
          </Grid>
          <Grid item md={3} sm={12} xs={12}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <TimePicker
                ampm={false}
                openTo="hours"
                views={['hours', 'minutes', 'seconds']}
                inputFormat="HH:mm:ss"
                mask="__:__:__"
                label="Hora Entrada *"
                value={fields.horA_ENTRADA}
                onChange={(value) => {
                  setFields({ ...fields, ['horA_ENTRADA']: value });
                }}
                renderInput={(params) => <TextField {...params} size="small" />}
              />
            </LocalizationProvider>
          </Grid>
          <Grid item md={3} sm={12} xs={12}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <TimePicker
                ampm={false}
                openTo="hours"
                views={['hours', 'minutes', 'seconds']}
                inputFormat="HH:mm:ss"
                mask="__:__:__"
                label="Hora Salida *"
                value={fields.horA_SALIDA}
                onChange={(value) => {
                  setFields({ ...fields, ['horA_SALIDA']: value });
                }}
                renderInput={(params) => <TextField {...params} size="small" />}
              />
            </LocalizationProvider>
          </Grid>
          <Grid item md={12} />
          <Grid item md={4} sm={12} xs={12}>
            <TextField
              name="miN_TOLERANCIAENT"
              fullWidth
              InputLabelProps={{
                shrink: true
              }}
              size="small"
              type="number"
              label="Min. Tolerancia"
              onChange={handleInputChange}
              value={fields.miN_TOLERANCIAENT}
            />
          </Grid>
          <Grid item md={12}>
            <Button onClick={saveHorarioLaboral} variant="contained" >
              Guardar
            </Button>
          </Grid>
        </Grid>
      </MUIModal>
    </>
  );
};

export default WorkHours;