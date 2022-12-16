import { useEffect, useState, useRef } from "react";
import { getTrabajador } from "../../service/common";
import {
  listTrabajadorAsistencia,
  getTrabajadorAsistencia,
  deleteTrabajadorAsistencia,
  AddOrUpdateTrabajadorAsistencia,
  asyncAssitance,
} from "../../service/assistance";
import { Grid, Button, TextField, Stack, MenuItem } from "@mui/material";
import DataGridDemo from "../../components/Table";
import moment from "moment/moment";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
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
} from '@mui/x-data-grid';
import { getFaltaTardanza } from "../../service/assistance";
import { AlertDelete } from "../../components/Alerts";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';

import { DesktopDateTimePicker } from '@mui/x-date-pickers/DesktopDateTimePicker';
import MUIModal from "../../components/Modal";
import { AlertSuccess, AlertError } from "../../components/Alerts";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { AlertWarning } from "../../components/Alerts";
var XLSX = require("xlsx");

const Assistance = ({ id }) => {

  const defaultFields = {
    coD_TRAASI: 0,
    coD_TRABAJADOR: id,
    feC_HOR_ENTRADA: null,
    feC_HOR_SALIDA: null,
    inD_ORIGEN: "1",
    feC_INICIO: moment(new Date(new Date().getFullYear(), new Date().getMonth(), 1)).format('yyyy-MM-DD'),
    feC_TERMINO: moment(new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0)).format('yyyy-MM-DD')
  }
  const defaultErrors = {
    coD_TRABAJADOR: true,
    feC_HOR_ENTRADA: true,
    feC_HOR_SALIDA: true,
  };

  const [data, setData] = useState([]);
  const [fields, setFields] = useState(defaultFields);
  const [trabajador, setTrabajador] = useState([]);
  const [data2, setData2] = useState([]);
  const [namePerson, setNamePerson] = useState([]);
  const [value, setValue] = useState(dayjs());
  const [inputError, setInputError] = useState(defaultErrors);

  const loadData = async () => {

    setInputError({
      coD_TRABAJADOR: false,
      feC_HOR_ENTRADA: false,
      feC_HOR_SALIDA: false,
    });

    const response = await listTrabajadorAsistencia(id);
    if (response.listado === null) {
      setData([])
    } else {
      setData(response.listado);
    }
    const responseTrabajador = await getTrabajador();
    setTrabajador(responseTrabajador.listado);

  }

  const validateFields = () => {

    const copyFields = { ...fields };
    delete copyFields.coD_TRAASI;

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

  useEffect(() => {
    loadData()
  }, [])

  const levelEducateChild = useRef();

  /* const handleInputChange = event => {

      const { name, type, checked, value } = event.target;

      const val = type === 'checkbox' ? checked : value;

      setFields({
          ...fields,
          [name]: val,
      });

  } */
  /*  */
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFields({ ...fields, [name]: value });
  };
  /*  */

  const handleInputChangeDate = (value, name) => {
    setFields({
      ...fields,
      [name]: moment(new Date(value)).format(),
    });
  };

  const OpenRegister = async () => {
    const response = await getTrabajador();
    setData2(response.listado);
    setNamePerson("")
    setFields(defaultFields);
    levelEducateChild.current.handleOpen();

    /* setFields(defaultfields);
    levelEducateChild.current.handleOpen(); */
  };

  const destroy = async (event, id) => {

    const resultado = await AlertDelete();

    if (resultado) {
      const dataDelete = {
        coD_TRAASI: id
      };
      await deleteTrabajadorAsistencia(dataDelete);
      await loadData();
    }

  }

  const captureEventFilter = async () => {
    const response = await asyncAssitance();
    if (response.code === 0) {
      await AlertSuccess(response.listado[0]["mensaje"], 3000);
      window.location.reload();

    } else {
      AlertError(response.listado[0]["mensaje"]);
    }

  }

  const edit = async (event, idT) => {
    const response = await getTrabajadorAsistencia(idT);
    setNamePerson(`${response.listado[0].dTrabajador.dPersona.deS_APELLP} ${response.listado[0].dTrabajador.dPersona.deS_APELLM} ${response.listado[0].dTrabajador.dPersona.noM_PERS}`)
    setFields({
      coD_TRAASI: idT,
      coD_TRABAJADOR: response.listado[0].dTrabajador.coD_TRABAJADOR,
      feC_HOR_ENTRADA: response.listado[0].feC_HOR_ENTRADA,
      feC_HOR_SALIDA: response.listado[0].feC_HOR_SALIDA,
      inD_ORIGEN: response.listado[0].inD_ORIGEN,
    })
    levelEducateChild.current.handleOpen();
  }
  /*  */
  const columns = [
    {
      field: 'Acciones',
      type: 'actions',
      getActions: (cellValues) => [
        <GridActionsCellItem
          icon={<EditIcon />}
          label="Edit"
          onClick={(event) => {
            edit(event, cellValues.row?.coD_TRAASI);
          }}
        />,
        <GridActionsCellItem
          icon={<DeleteIcon />}
          label="Delete"
          onClick={(event) => {
            destroy(event, cellValues.row?.coD_TRAASI);
          }}
        />,
      ],
    },

    {
      field: "coD_TRAASI",
      headerName: "Código",
      width: 100,
    },
    {
      field: "full_name",
      headerName: "Apellidos y Nombres",
      width: 400,
      valueGetter: (params) =>
        `${params.row?.dTrabajador?.dPersona?.deS_APELLP} ${params.row.dTrabajador.dPersona?.deS_APELLM || ""} ${params.row.dTrabajador.dPersona?.noM_PERS || ""}`
    },
    {
      field: "nuM_Doc",
      headerName: "N° Documento",
      width: 100,
      valueGetter: (params) =>
        `${params.row?.dTrabajador?.dPersona.nuM_DOC}`
    },
    {
      field: "feC_HOR_ENTRADA",
      headerName: "Hora Entrada",
      width: 250,
      valueGetter: (params) =>
        `${params.row?.feC_HOR_ENTRADA != null ? moment(params.row?.feC_HOR_ENTRADA).format("DD/MM/YYYY HH:mm:ss") : ''}`,
    },
    {
      field: "feC_HOR_SALIDA",
      headerName: "Hora Salida",
      width: 250,
      valueGetter: (params) =>
        `${params.row?.feC_HOR_SALIDA != null ? moment(params.row?.feC_HOR_SALIDA).format("DD/MM/YYYY HH:mm:ss") : ''}`,
    },
    {
      field: "inD_ORIGEN",
      headerName: "Origen",
      width: 100,
      valueGetter: (params) =>
        `${(params.row?.inD_ORIGEN === "1" ? "Manual" : "Marcador")}`,
    },
  ];

  /*  */
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
              "coD_TRAASI",
              "coD_TRABAJADOR",
              "full_name",
              "nuM_Doc",
              "feC_HOR_ENTRADA",
              "feC_HOR_SALIDA",
              "inD_ORIGEN"
            ],
          }}
        />
      </GridToolbarContainer>
    );
  }

  const captureEventFilter2 = async () => {
    const response = await getFaltaTardanza(moment(fields.feC_INICIO).format(), moment(fields.feC_TERMINO).format());
    if (response.listado[0]["mensaje"] == "OK") {
      await AlertSuccess(response.listado[0]["mensaje"], 3000);
      window.location.reload();
    } else {
      AlertError(response.listado[0]["mensaje"]);
    }

  }

  const handleFields = async () => {
    const validate = validateFields();
    if (!validate) return;
    const response = await AddOrUpdateTrabajadorAsistencia(fields);
    if (response.code === 0) {
      await loadData();
      levelEducateChild.current.handleClose();
      await AlertSuccess(`${response.message}`)
    } else {
      levelEducateChild.current.handleClose();
      return await AlertError(`${response.message}`)
    }

  }

  const columns2 = [
    {
      field: "acciones",
      type: "actions",
      disableExport: true,
      getActions: (cellValues) => [
        <GridActionsCellItem
          onClick={async () => {
            setNamePerson(`${cellValues.row.dPersona.deS_APELLP} ${cellValues.row.dPersona.deS_APELLM} ${cellValues.row.dPersona.noM_PERS}`)
            fields.coD_TRABAJADOR = cellValues.row.coD_TRABAJADOR
          }}
          icon={<AddCircleOutlineIcon />} label="Edit" />
      ],
    },
    {
      field: "coD_TRABAJADOR",
      headerName: "Cod. Trabajador",
      width: 100,
    },
    {
      field: "full_name",
      headerName: "Apellidos y Nombres",
      width: 400,

      valueGetter: (params) =>
        `${params.row.dPersona?.deS_APELLP || ""} ${params.row.dPersona?.deS_APELLM || ""} ${params.row.dPersona?.noM_PERS || ""
        }`,
    },
    {
      field: "nuM_Doc",
      headerName: "N° Documento",
      width: 100,
      valueGetter: (params) =>
        `${params.row?.dPersona?.nuM_DOC}`
    },
  ];
  const downloadExcel = (dataExport) => {
    var Headers = [["INFORMACIÓN DE ASISTENCIA"]];
    let nData = [];
    dataExport.forEach((item) => {
      nData.push({
        "Código": item?.coD_TRAASI,
        "Código Trabajador": item?.Cod_TRABAJADOR,
        "Apellidos y Nombres": item?.full_name,
        "N° Documento": item?.nuM_Doc,
        "Hora Entrada": item?.feC_HOR_ENTRADA,
        "Hora Salida": item?.feC_HOR_SALIDA,
        "Origen": item?.inD_ORIGEN,




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
    XLSX.utils.book_append_sheet(workBook, workSheet, "Asistencia");
    XLSX.write(workBook, { bookType: "xlsx", type: "buffer" });
    XLSX.write(workBook, { bookType: "xlsx", type: "binary" });
    XLSX.writeFile(workBook, "ReporteAsistencia.xlsx");
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

  return (<>
    <Grid container spacing={1}>
      <Grid item md={12} xs={12} sm={12}>
        <Stack
          direction="row"
          spacing={1} xs={{ mb: 1, display: 'flex' }}
        >
          <div>
            <h1>Asistencia</h1>
          </div>
        </Stack>
        <Stack direction="row" spacing={1} xs={{ mb: 1, display: "flex" }} marginBottom={3}>
          <Grid item md={3} sm={12} xs={12}>
            <Button
              size="large"
              variant="outlined"
              onClick={captureEventFilter}
            >
              <span>Sincronizar</span>
            </Button>
          </Grid>
          <Grid item md={3} sm={12} xs={12}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DesktopDatePicker
                label="Desde*"
                inputFormat="dd-MM-yyyy"
                value={moment(fields.feC_INICIO).format()}
                onChange={e =>
                  handleInputChangeDate(e, 'feC_INICIO')}
                renderInput={(params) => <TextField fullWidth
                  InputLabelProps={{
                    shrink: true
                  }}
                  size="small"
                  {...params} />}
              />
            </LocalizationProvider>
          </Grid>
          <Grid item md={3} sm={12} xs={12}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DesktopDatePicker
                label="Hasta*"
                inputFormat="dd-MM-yyyy"
                value={moment(fields.feC_TERMINO).format()}
                minDate={moment(fields.feC_INICIO).toDate()}
                onChange={e =>
                  handleInputChangeDate(e, 'feC_TERMINO')}
                renderInput={(params) => <TextField fullWidth
                  InputLabelProps={{
                    shrink: true
                  }}
                  size="small"
                  {...params} />}
              />
            </LocalizationProvider>
          </Grid>
          <Grid item md={3} sm={12} xs={12}>
            <Button
              size="large"
              variant="outlined"
              onClick={captureEventFilter2}
            >
              <span>Procesar</span>
            </Button>
          </Grid>
        </Stack>
        <Grid item md={12}>
          <DataGridDemo id={(row) => row.coD_TRAASI}
            rows={data} columns={columns} toolbar={CustomToolbar} />
        </Grid>
      </Grid>
    </Grid>
    <MUIModal ref={levelEducateChild}>
      <Grid container spacing={1.5}>
        <Grid item md={12} xs={12}>
          <h1>{fields.coD_TRAASI ? "Actualizar" : "Registrar"} </h1>
          <p style={{ color: 'red', fontSize: 15 }}>(Los campos con * son obligatorios)</p>
        </Grid>
        <Grid item md={12} />
        <Grid item md={8} sm={12} xs={12}>
          <TextField
            name="coD_TRABAJADOR"
            fullWidth
            InputLabelProps={{
              shrink: true
            }}
            error={inputError.coD_TRABAJADOR}
            size="small"
            label="Nombres y Apellidos*"
            onChange={handleInputChange}
            value={namePerson}
          />
          {/*               <MenuItem value="0" disabled>
                Sin especificar
              </MenuItem>
              {trabajador &&
                trabajador.map((trabajador) => (
                  <MenuItem value={trabajador.dTrabajador}>
                    {trabajador.coD_TRABAJADOR}
                  </MenuItem>
                ))}
            </TextField> */}
        </Grid>
        <Grid item md={12} />
        <Grid item md={4} sm={12} xs={12}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DesktopDateTimePicker
              ampm={false}
              label="Fecha y Hora de Entrada*"
              error={inputError.feC_HOR_ENTRADA}
              value={moment(fields.feC_HOR_ENTRADA).format()}
              onChange={e =>
                handleInputChangeDate(e, 'feC_HOR_ENTRADA')}
              renderInput={(params) => <TextField {...params} size="small" />}
            />
          </LocalizationProvider>
        </Grid>
        <Grid item md={4} sm={12} xs={12}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DesktopDateTimePicker
              ampm={false}
              label="Fecha y Hora de Salida*"
              value={moment(fields.feC_HOR_SALIDA).format()}
              onChange={e =>
                handleInputChangeDate(e, 'feC_HOR_SALIDA')}
              renderInput={(params) => <TextField {...params} size="small" />}
            />
          </LocalizationProvider>
        </Grid>
        <Grid item md={12} />
        <Grid item md={12} />
        <Grid item md={12}>
          <DataGridDemo
            height='40vh'
            id={(row) => row.coD_TRABAJADOR}
            rows={data2}
            columns={columns2}
            numberSize={10}
          />
        </Grid>
        <Grid item md={12}>
          <Button onClick={handleFields} variant="contained" >
            Guardar
          </Button>
        </Grid>
      </Grid>
    </MUIModal>
  </>)
}

export default Assistance;