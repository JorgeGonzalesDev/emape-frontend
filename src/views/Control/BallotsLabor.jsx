import {
  listPapeletaLaboral, getPapeletaLaboral, deletePapeletaLaboral, AddOrUpdatePapeletaLaboral,
} from "../../service/ballotslabor";
import MUIModal from "../../components/Modal";
import DataGridDemo from "../../components/Table";
import { useState, useEffect, useRef } from "react";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Button, Grid, TextField, Stack, MenuItem } from "@mui/material";
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
import { getCargo } from "../../service/position";
import { getMotivo, getPapeleta } from "../../service/common";
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDateTimePicker } from '@mui/x-date-pickers/DesktopDateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import moment from "moment/moment";
import { listWorkers } from "../../service/worker";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { AlertWarning } from "../../components/Alerts";
var XLSX = require("xlsx");

const BallotsLabor = ({ id }) => {
  const defaultfields = {
    coD_PAPLAB: 0,
    coD_PAPELETA: null,
    feC_PAPELETA: null,
    coD_MOTIVO: null,
    coD_TRABAJADOR: null,
    coD_UORG: null,
    feC_INICIO: null,
    feC_TERMINO: null,
    deS_REFERENCIA: null,
    coD_CARG: null
  }
  const [fields, setFields] = useState({
    coD_PAPLAB: 0,
    coD_PAPELETA: null,
    feC_PAPELETA: null,
    coD_MOTIVO: null,
    coD_TRABAJADOR: 0,
    coD_UORG: null,
    feC_INICIO: null,
    feC_TERMINO: null,
    deS_REFERENCIA: null,
    coD_CARG: null,
    inD_ASISTENCIA: null
  });

  const defaultErrors = {
    coD_PAPELETA: true,
    feC_PAPELETA: true,
    coD_TRABAJADOR: true,
    inD_ASISTENCIA: true,
    feC_INICIO: true,
    feC_TERMINO: true,
    coD_CARG: true,
  };

  const [data, setData] = useState([]);
  const levelEducateChild = useRef();
  const [data2, setData2] = useState([]);

  const [namePerson, setNamePerson] = useState([]);
  const [areaPerson, setAreaPerson] = useState([]);

  const [inputError, setInputError] = useState(defaultErrors);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFields({ ...fields, [name]: value });
  };

  const loadData = async () => {

    setInputError({
      coD_PAPELETA: false,
      feC_PAPELETA: false,
      coD_TRABAJADOR: false,
      inD_ASISTENCIA: false,
      feC_INICIO: false,
      feC_TERMINO: false,
      coD_CARG: false,

    });

    const response = await listPapeletaLaboral(id);
    setData(response.listado);
    /* if (response.listado === null) {
      setData([])
    } else {
        setData(response.listado);
    } */
    const responsePositions = await getCargo();
    setPositions(responsePositions.listado);
    const responseMotivo = await getMotivo();
    setMotivo(responseMotivo.listado);
    const responsePapeleta = await getPapeleta();
    setPapeleta(responsePapeleta.listado);

  };

  const validateFields = () => {

    const copyFields = { ...fields };
    delete copyFields.coD_PAPLAB;
    delete copyFields.coD_MOTIVO;
    delete copyFields.coD_UORG;
    delete copyFields.deS_REFERENCIA;

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
        'coD_PAPLAB': id
      };
      await deletePapeletaLaboral(dataDelete);
      await loadData();
    }
  };
  const [positions, setPositions] = useState([]);
  const [motivo, setMotivo] = useState([]);
  const [papeleta, setPapeleta] = useState([]);

  const edit = async (event, row) => {
    setNamePerson(`${row?.dTrabajador?.dPersona?.deS_APELLP} ${row?.dTrabajador?.dPersona?.deS_APELLM} ${row?.dTrabajador?.dPersona?.noM_PERS}`)
    setAreaPerson(`${row?.dTrabajador?.dUnidadOrganizacional.deS_UORG}`)
    const response = await listWorkers();
    setData2(response.listado);
    const defaultRow = {
      coD_PAPLAB: row['coD_PAPLAB'],
      coD_PAPELETA: row['coD_PAPELETA'],
      feC_PAPELETA: row['feC_PAPELETA'],
      coD_MOTIVO: row['coD_MOTIVO'],
      coD_TRABAJADOR: row['dTrabajador']['coD_TRABAJADOR'],
      coD_UORG: row['coD_UORG'],
      feC_INICIO: row['feC_INICIO'],
      feC_TERMINO: row['feC_TERMINO'],
      deS_REFERENCIA: row['deS_REFERENCIA'],
      coD_CARG: row['coD_CARG'],
      inD_ASISTENCIA: row['inD_ASISTENCIA']
    }
    setFields(defaultRow);
    levelEducateChild.current.handleOpen();
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleInputChangeDate = (value, name) => {
    setFields({
      ...fields,
      [name]: moment(new Date(value)).format(),
    });
  };

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
          destroy(event, cellValues.row?.coD_PAPLAB);
        }} />,
        /*  */
      ],
    },
    {
      field: "coD_PAPLAB",
      headerName: "N° Papeleta",
      width: 150,
    },
    {
      field: "feC_PAPELETA",
      headerName: "Fecha Papeleta",
      width: 150,
      valueGetter: (params) =>
        `${moment(params.row?.feC_PAPELETA).format("DD/MM/YYYY")}`,
    },
    {
      field: "nuM_DOC",
      headerName: "DNI",
      width: 150,
      valueGetter: (params) =>
        `${params.row?.dTrabajador?.dPersona?.nuM_DOC}`,
    },
    {
      field: "feC_INICIO",
      headerName: "Fecha Inicio",
      width: 150,
      valueGetter: (params) =>
        `${moment(params.row?.feC_INICIO).format("DD/MM/YYYY")}`,
    },
    {
      field: "feC_TERMINO",
      headerName: "Fecha Termino",
      width: 150,
      valueGetter: (params) =>
        `${moment(params.row?.feC_TERMINO).format("DD/MM/YYYY")}`,
    },
    {
      field: "full_name",
      headerName: "Nombre completo",
      width: 250,
      valueGetter: (params) =>
        `${params.row?.dTrabajador?.dPersona?.deS_APELLP} ${params.row?.dTrabajador?.dPersona?.deS_APELLM} ${params.row?.dTrabajador?.dPersona?.noM_PERS}`,
    },
    {
      field: "inD_PAPELETA",
      headerName: "Tipo de papeleta",
      width: 150,
      valueGetter: (params) =>
        `${params.row?.dTipoPapeleta?.noM_PAPELETA}`,
    },
    {
      field: "inD_MOTIVO",
      headerName: "Motivo de papeleta",
      width: 150,
      valueGetter: (params) =>
        `${params.row?.dMotivoPapeleta?.noM_MOTIVO}`,
    },
    {
      field: "inD_ASISTENCIA",
      headerName: "Ind. Asistencia",
      width: 150,
      valueGetter: (params) =>
        `${params.row?.inD_ASISTENCIA}`,
    },
  ];

  const OpenRegister = async () => {
    setNamePerson("")
    setAreaPerson("")
    const response = await listWorkers();
    setData2(response.listado);
    setFields(defaultfields);
    levelEducateChild.current.handleOpen();
  };

  const savePapeletaLaboral = async () => {
    const validate = validateFields();
    if (!validate) return;
    const response = await AddOrUpdatePapeletaLaboral(fields)
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
              "coD_PAPLAB",
              "feC_PAPELETA",
              "feC_INICIO",
              "feC_TERMINO",
              "nuM_DOC",
              "full_name",
              "inD_PAPELETA",
              "inD_MOTIVO",
              'inD_ASISTENCIA'
            ],
          }}
        />
      </GridToolbarContainer>
    );
  }

  const columns2 = [
    {
      field: "acciones",
      type: "actions",
      disableExport: true,
      getActions: (cellValues) => [
        <GridActionsCellItem
          onClick={async () => {
            setNamePerson(`${cellValues.row?.dPersona?.deS_APELLP} ${cellValues.row?.dPersona?.deS_APELLM} ${cellValues.row?.dPersona?.noM_PERS}`)
            setAreaPerson(`${cellValues.row?.dUnidadOrganizacional.deS_UORG}`)
            fields.coD_TRABAJADOR = cellValues.row?.coD_TRABAJADOR
            fields.coD_UORG = cellValues.row?.dUnidadOrganizacional.coD_UORG
          }}
          icon={<AddCircleOutlineIcon />} label="Edit" />
      ],
    },
    {
      field: "coD_TRABAJADOR",
      headerName: "Código",
      width: 100,
    },
    {
      field: "full_name",
      headerName: "Apellidos y Nombres",
      width: 400,

      valueGetter: (params) =>
        `${params.row?.dPersona?.deS_APELLP || ""} ${params.row?.dPersona?.deS_APELLM || ""} ${params.row?.dPersona?.noM_PERS || ""
        }`,
    },
    {
      field: "nuM_DOC",
      headerName: "Documento",
      width: 100,
      valueGetter: (params) => `${params.row?.dPersona?.nuM_DOC}`
    }
  ];
  const downloadExcel = (dataExport) => {
    var Headers = [["INFORMACIÓN DE PAPELETA LABORAL"]];
    let nData = [];
    dataExport.forEach((item) => {
      nData.push({
        "N° Papeleta": item?.coD_PAPLAB,
        "Fecha Papeleta": item?.feC_PAPELETA,
        DNI: item?.nuM_DOC,
        "feC_INICIO": item?.feC_INICIO,
        "feC_TERMINO": item?.feC_TERMINO,
        "Nombre completo": item?.full_name,
        "Tipo de papeleta": item?.inD_PAPELETA,
        "Motivo de papeleta": item?.inD_MOTIVO,
        "Ind. Asistencia" : item?.inD_ASISTENCIA
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
    XLSX.utils.book_append_sheet(workBook, workSheet, "Papeleta Laboral");
    XLSX.write(workBook, { bookType: "xlsx", type: "buffer" });
    XLSX.write(workBook, { bookType: "xlsx", type: "binary" });
    XLSX.writeFile(workBook, "ReportePapeletaLaboral.xlsx");
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
            <h1>Papeleta Laboral</h1>
          </div>
        </Stack>
        <DataGridDemo
          id={(row) => row?.coD_PAPLAB}
          rows={data}
          columns={columns}
          toolbar={CustomToolbar}
        />
      </div>
      <MUIModal ref={levelEducateChild}>
        <Grid item md={12} xs={12}>
          <h1>{fields.coD_PAPLAB ? "Actualizar" : "Registrar"} </h1>
          <p style={{ color: 'red', fontSize: 15 }}>(Los campos con * son obligatorios)</p>
        </Grid>
        <Grid container spacing={1.5} >
          <Grid item md={4.5} sm={12} xs={12}>
            <TextField
              name="coD_PAPELETA"
              fullWidth
              InputLabelProps={{
                shrink: true
              }}
              size="small"
              select
              label="Tipo de Papeleta*"
              onChange={handleInputChange}
              error={inputError.coD_PAPELETA}
              value={fields.coD_PAPELETA}
            >
              <MenuItem value="0" disabled>
                Sin especificar
              </MenuItem>
              {papeleta &&
                papeleta.map(papeleta => (
                  <MenuItem value={papeleta.coD_PAPELETA}>
                    {papeleta.noM_PAPELETA}
                  </MenuItem>
                ))}
            </TextField>
          </Grid>
          <Grid item md={3} sm={12} xs={12}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DesktopDatePicker
                label="Fecha Papeleta*"
                inputFormat="dd-MM-yyyy"
                error={inputError.feC_PAPELETA}
                value={moment(fields.feC_PAPELETA).format()}
                onChange={e =>
                  handleInputChangeDate(e, 'feC_PAPELETA')}
                renderInput={(params) => <TextField fullWidth
                  InputLabelProps={{
                    shrink: true
                  }}
                  size="small"
                  {...params} />}
              />
            </LocalizationProvider>
          </Grid>
          <Grid item md={4.5} sm={12} xs={12}>
            <TextField
              name="coD_MOTIVO"
              fullWidth
              InputLabelProps={{
                shrink: true
              }}
              inputProps={{ maxlength: '4' }}
              size="small"
              select
              label="Motivo"
              onChange={handleInputChange}
              value={fields.coD_MOTIVO}
            >
              <MenuItem value="0" disabled>
                Sin especificar
              </MenuItem>
              {motivo &&
                motivo.map(motivo => (
                  <MenuItem value={motivo.coD_MOTIVO}>
                    {motivo.noM_MOTIVO}
                  </MenuItem>
                ))}
            </TextField>
          </Grid>
          <Grid item md={12} />
          <Grid item md={6} sm={12} xs={12}>
            <TextField
              fullWidth
              InputLabelProps={{
                shrink: true
              }}
              size="small"
              label="Nombre trabajador*"
              error={inputError.coD_TRABAJADOR}
              value={namePerson}
            />
          </Grid>
          <Grid item md={6} sm={12} xs={12}>
            <TextField
              fullWidth
              InputLabelProps={{
                shrink: true
              }}
              inputProps={{ maxlength: '4' }}
              size="small"
              label="Unidad Organica"
              value={areaPerson}
            />
          </Grid>
          <Grid item md={12} />
          <Grid item md={4} sm={12} xs={12}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DesktopDateTimePicker
                ampm={false}
                label="Inicio*"
                error={inputError.feC_INICIO}
                value={moment(fields.feC_INICIO).format()}
                onChange={e =>
                  handleInputChangeDate(e, 'feC_INICIO')}
                renderInput={(params) => <TextField {...params} size="small" />}
              />
            </LocalizationProvider>
            {/*  */}
          </Grid>
          <Grid item md={4} sm={12} xs={12}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DesktopDateTimePicker
                ampm={false}
                label="Termino*"
                value={moment(fields.feC_TERMINO).format()}
                onChange={e =>
                  handleInputChangeDate(e, 'feC_TERMINO')}
                renderInput={(params) => <TextField {...params} size="small" />}
              />
            </LocalizationProvider>
            {/*  */}
          </Grid>
          <Grid item md={4} sm={12} xs={12}>
            <TextField
              name="inD_ASISTENCIA"
              fullWidth
              InputLabelProps={{
                shrink: true
              }}
              size="small"
              select
              error={inputError.inD_ASISTENCIA}
              label="Ind. Asistencia"
              onChange={handleInputChange}
              value={fields.inD_ASISTENCIA}
            >
              <MenuItem value="D">
                Días
              </MenuItem>
              <MenuItem value="H">
                Horas
              </MenuItem>
              <MenuItem value="N">
                Ninguno
              </MenuItem>
            </TextField>
          </Grid>
          <Grid item md={6} sm={12} xs={12}>
            <TextField
              name="coD_CARG"
              fullWidth
              InputLabelProps={{
                shrink: true
              }}
              inputProps={{ maxlength: '4' }}
              size="small"
              select
              label="Autorizado por:*"
              error={inputError.coD_CARG}
              onChange={handleInputChange}
              value={fields.coD_CARG}
            >
              <MenuItem value="0" disabled>
                Sin especificar
              </MenuItem>
              {positions &&
                positions.map(position => (
                  <MenuItem value={position.coD_CAR}>
                    {position.deS_CAR}
                  </MenuItem>
                ))}
            </TextField>
          </Grid>
          <Grid item md={12} />
          <Grid item md={12} sm={12} xs={12}>
            <TextField
              label="Referencia"
              multiline
              fullWidth
              InputLabelProps={{
                shrink: true
              }}
              size="small"
              rows={1}
              name="deS_REFERENCIA"
              onChange={handleInputChange}
              value={fields.deS_REFERENCIA}
            />
          </Grid>
          <Grid item md={12}>
            <DataGridDemo
              height='40vh'
              id={(row) => row?.coD_TRABAJADOR}
              rows={data2}
              columns={columns2}
              numberSize={10}
            />
          </Grid>
          <Grid item md={12}>
            <Button onClick={savePapeletaLaboral} variant="contained" >
              Guardar
            </Button>
          </Grid>
        </Grid>
      </MUIModal>
    </>
  );
};

export default BallotsLabor;