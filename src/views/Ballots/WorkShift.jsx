import {
  listTurnoLaboral, deleteTurnoLaboral, AddOrUpdateTurnoLaboral,
} from "../../service/ballots/workshift/";
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
import { getHorarioLaboral } from "../../service/ballots/workhours";
import { AlertWarning } from "../../components/Alerts";
var XLSX = require("xlsx");

const Ballots = ({ id }) => {
  const defaultfields = {
    coD_TURNO: 0,
    noM_TURNO: null,
    coD_HORARIOLUN: null,
    coD_HORARIOMAR: null,
    coD_HORARIOMIE: null,
    coD_HORARIOJUE: null,
    coD_HORARIOVIE: null,
    coD_HORARIOSAB: null,
    coD_HORARIODOM: null
  }

  const defaultErrors = {
    noM_TURNO: true,
  };

  const [fields, setFields] = useState({
    coD_TURNO: 0,
    noM_TURNO: null,
    coD_HORARIOLUN: null,
    coD_HORARIOMAR: null,
    coD_HORARIOMIE: null,
    coD_HORARIOJUE: null,
    coD_HORARIOVIE: null,
    coD_HORARIOSAB: null,
    coD_HORARIODOM: null
  });

  const [data, setData] = useState([]);
  const levelEducateChild = useRef();
  const [hourWork, setHourWork] = useState([]);
  const [inputError, setInputError] = useState({
      noM_TURNO: false,
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFields({ ...fields, [name]: value });
  };

  const loadData = async () => {
    setInputError({
      noM_TURNO: false,
    });

    const response = await listTurnoLaboral();
    setData(response.listado);

    const responseHourWork = await getHorarioLaboral();
    setHourWork(responseHourWork.listado);

  };
  /*  */
  const validateFields = () => {

    const copyFields = { ...fields };
    delete copyFields.coD_TURNO;
    delete copyFields.coD_HORARIOLUN;
    delete copyFields.coD_HORARIOMAR;
    delete copyFields.coD_HORARIOMIE;
    delete copyFields.coD_HORARIOJUE;
    delete copyFields.coD_HORARIOVIE;
    delete copyFields.coD_HORARIOSAB;
    delete copyFields.coD_HORARIODOM;

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
        'coD_TURNO': id
      };
      await deleteTurnoLaboral(dataDelete);
      await loadData();
    }
  };
  /*  */
  const edit = async (event, row) => {
    /* como estaba el setFields */
    //setFields(row);
    /* Edita pero si todos los campos se llenan */
    setFields({
      coD_TURNO: row.coD_TURNO,
      noM_TURNO: row.noM_TURNO,
      coD_HORARIOLUN: row.coD_HORARIOLUN,
      coD_HORARIOMAR: row.coD_HORARIOMAR,
      coD_HORARIOMIE: row.coD_HORARIOMIE,
      coD_HORARIOJUE: row.coD_HORARIOJUE,
      coD_HORARIOVIE: row.coD_HORARIOVIE,
      coD_HORARIOSAB: row.coD_HORARIOSAB,
      coD_HORARIODOM: row.coD_HORARIODOM,
    });
    setInputError({
      noM_TURNO: false,
  })
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
          destroy(event, cellValues.row?.coD_TURNO);
        }} />,
        /*  */
      ],
    },
    {
      field: "coD_TURNO",
      headerName: "Cod. Turno",
      width: 150,
    },
    {
      field: "noM_TURNO",
      headerName: "Nombre",
      width: 200,
    },
    {
      field: "coD_HORARIOLUN",
      headerName: "Lunes",
      width: 150,
      valueGetter: (params) =>
        `${params.row?.dHorarioLaboralLun ? ` ${params.row?.dHorarioLaboralLun?.horA_ENTRADA} - ${params.row?.dHorarioLaboralLun?.horA_SALIDA}` : 'No Asignado'}`,
    },
    {
      field: "coD_HORARIOMAR",
      headerName: "Martes",
      width: 150,
      valueGetter: (params) =>
        ` ${params.row?.dHorarioLaboralMar ? `${params.row?.dHorarioLaboralMar?.horA_ENTRADA} - ${params.row?.dHorarioLaboralMar?.horA_SALIDA}` : 'No Asignado'}`,
    },
    {
      field: "coD_HORARIOMIE",
      headerName: "Miercoles",
      width: 150,
      valueGetter: (params) =>
        `${params.row?.dHorarioLaboralMie ? `${params.row?.dHorarioLaboralMie?.horA_ENTRADA} - ${params.row?.dHorarioLaboralMie?.horA_SALIDA}` : 'No Asignado'}`,
    },
    {
      field: "coD_HORARIOJUE",
      headerName: "Jueves",
      width: 150,
      valueGetter: (params) =>
        `${params.row?.dHorarioLaboralJue ? ` ${params.row?.dHorarioLaboralJue?.horA_ENTRADA} - ${params.row?.dHorarioLaboralJue?.horA_SALIDA}` : 'No Asignado'}`,
    },
    {
      field: "coD_HORARIOVIE",
      headerName: "Viernes",
      width: 150,
      valueGetter: (params) =>
        `${params.row?.dHorarioLaboralVie ? `${params.row?.dHorarioLaboralVie?.horA_ENTRADA} - ${params.row?.dHorarioLaboralVie?.horA_SALIDA}` : 'No Asignado'}`,
    },
    {
      field: "coD_HORARIOSAB",
      headerName: "Sábado",
      width: 150,
      valueGetter: (params) =>
        `${params.row?.dHorarioLaboralSab ? `${params.row?.dHorarioLaboralSab?.horA_ENTRADA} - ${params.row?.dHorarioLaboralSab?.horA_SALIDA}` : 'No Asignado'}`,
    },
    {
      field: "coD_HORARIODOM",
      headerName: "Domingo",
      width: 150,
      valueGetter: (params) =>
        `${params.row?.dHorarioLaboralDom ? `${params.row?.dHorarioLaboralDom?.horA_ENTRADA} - ${params.row?.dHorarioLaboralDom?.horA_SALIDA}` : 'No Asignado'}`,
    },
  ];

  const OpenRegister = () => {
    setFields(defaultfields);
    setInputError(defaultErrors);
    levelEducateChild.current.handleOpen();
  };

  const saveTurnoLaboral = async () => {
    const validate = validateFields();
    if (!validate) return;
    const response = await AddOrUpdateTurnoLaboral(fields)
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
              "coD_TURNO",
              "noM_TURNO",
              "coD_HORARIOLUN",
              "coD_HORARIOMAR",
              "coD_HORARIOMIE",
              "coD_HORARIOJUE",
              "coD_HORARIOVIE",
              "coD_HORARIOSAB",
              "coD_HORARIODOM",
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
        "Código Turno": item?.coD_TURNO,
        "Nombre": item?.noM_TURNO,
        Lunes: item?.coD_HORARIOLUN,
        Martes: item?.coD_HORARIOMAR,
        Miercoles: item?.coD_HORARIOMIE,
        Jueves: item?.coD_HORARIOJUE,
        Viernes: item?.coD_HORARIOVIE,
        "Sábado": item?.coD_HORARIOSAB,
        Domingo: item?.coD_HORARIODOM,




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
    XLSX.utils.book_append_sheet(workBook, workSheet, "Turno Laboral");
    XLSX.write(workBook, { bookType: "xlsx", type: "buffer" });
    XLSX.write(workBook, { bookType: "xlsx", type: "binary" });
    XLSX.writeFile(workBook, "ReporteTurnoLaboral.xlsx");
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
            <h1>Turno Laboral</h1>
          </div>
        </Stack>
        <DataGridDemo
          id={(row) => row?.coD_TURNO}
          rows={data}
          columns={columns}
          toolbar={CustomToolbar}
        />
      </div>
      <MUIModal ref={levelEducateChild}>
        <Grid container spacing={1.5} >
          <Grid item md={4} sm={12} xs={12}>
            <TextField
              name="noM_TURNO"
              error={inputError.noM_TURNO}
              fullWidth
              InputLabelProps={{
                shrink: true
              }}
              inputProps={{ maxlength: '100' }}
              size="small"
              label="Nombre de turno"
              onChange={handleInputChange}
              value={fields.noM_TURNO}
            />
          </Grid>
          <Grid item md={12} />
          <Grid item md={3} sm={12} xs={12}>
            <TextField
              name="coD_HORARIOLUN"
              fullWidth
              InputLabelProps={{
                shrink: true
              }}

              size="small"
              label="Lunes"
              select
              onChange={handleInputChange}
              value={fields.coD_HORARIOLUN}
            >
              <MenuItem value={null}>
                Sin asignar
              </MenuItem>
              {hourWork &&
                hourWork.map((hourWork) => (
                  <MenuItem value={hourWork.coD_HORARIO}>
                    de {hourWork?.horA_ENTRADA.substr(0, 5)} a {hourWork?.horA_SALIDA.substr(0, 5)}
                  </MenuItem>
                ))}
            </TextField>
          </Grid>
          {/* d */}
          <Grid item md={3} sm={12} xs={12}>
            <TextField
              name="coD_HORARIOMAR"
              fullWidth
              InputLabelProps={{
                shrink: true
              }}

              size="small"
              select
              label="Martes"
              onChange={handleInputChange}
              value={fields.coD_HORARIOMAR}
            >
              <MenuItem value={null}>
                Sin asignar
              </MenuItem>
              {hourWork &&
                hourWork.map((hourWork) => (
                  <MenuItem value={hourWork.coD_HORARIO}>
                    de {hourWork?.horA_ENTRADA.substr(0, 5)} a {hourWork?.horA_SALIDA.substr(0, 5)}
                  </MenuItem>
                ))}
            </TextField>
          </Grid>
          {/*  a */}
          <Grid item md={3} sm={12} xs={12}>
            <TextField
              name="coD_HORARIOMIE"
              fullWidth
              InputLabelProps={{
                shrink: true
              }}

              size="small"
              select
              label="Miercoles"
              onChange={handleInputChange}
              value={fields.coD_HORARIOMIE}
            >
              <MenuItem value={null}>
                Sin asignar
              </MenuItem>
              {hourWork &&
                hourWork.map((hourWork) => (
                  <MenuItem value={hourWork.coD_HORARIO}>
                    de {hourWork?.horA_ENTRADA.substr(0, 5)} a {hourWork?.horA_SALIDA.substr(0, 5)}
                  </MenuItem>
                ))}
            </TextField>
          </Grid>
          <Grid item md={12} />
          {/*  a */}
          <Grid item md={3} sm={12} xs={12}>
            <TextField
              name="coD_HORARIOJUE"
              fullWidth
              InputLabelProps={{
                shrink: true
              }}

              size="small"
              select
              label="Jueves"
              onChange={handleInputChange}
              value={fields.coD_HORARIOJUE}
            >
              <MenuItem value={null}>
                Sin asignar
              </MenuItem>
              {hourWork &&
                hourWork.map((hourWork) => (
                  <MenuItem value={hourWork.coD_HORARIO}>
                    de {hourWork?.horA_ENTRADA.substr(0, 5)} a {hourWork?.horA_SALIDA.substr(0, 5)}
                  </MenuItem>
                ))}
            </TextField>
          </Grid>
          {/*  a */}
          <Grid item md={3} sm={12} xs={12}>
            <TextField
              name="coD_HORARIOVIE"
              fullWidth
              InputLabelProps={{
                shrink: true
              }}

              size="small"
              select
              label="Viernes"
              onChange={handleInputChange}
              value={fields.coD_HORARIOVIE}
            >
              <MenuItem value={null}>
                Sin asignar
              </MenuItem>
              {hourWork &&
                hourWork.map((hourWork) => (
                  <MenuItem value={hourWork.coD_HORARIO}>
                    de {hourWork?.horA_ENTRADA.substr(0, 5)} a {hourWork?.horA_SALIDA.substr(0, 5)}
                  </MenuItem>
                ))}
            </TextField>
          </Grid>
          {/*  a */}
          <Grid item md={3} sm={12} xs={12}>
            <TextField
              name="coD_HORARIOSAB"
              fullWidth
              InputLabelProps={{
                shrink: true
              }}

              size="small"
              select
              label="Sábado"
              onChange={handleInputChange}
              value={fields.coD_HORARIOSAB}
            >
              <MenuItem value={null}>
                Sin asignar
              </MenuItem>
              {hourWork &&
                hourWork.map((hourWork) => (
                  <MenuItem value={hourWork.coD_HORARIO}>
                    de {hourWork?.horA_ENTRADA.substr(0, 5)} a {hourWork?.horA_SALIDA.substr(0, 5)}
                  </MenuItem>
                ))}
            </TextField>
          </Grid>
          {/*  a */}
          <Grid item md={12} />
          <Grid item md={3} sm={12} xs={12}>
            <TextField
              name="coD_HORARIODOM"
              fullWidth
              InputLabelProps={{
                shrink: true
              }}

              size="small"
              select
              label="Domingo"
              onChange={handleInputChange}
              value={fields.coD_HORARIODOM}
            >
              <MenuItem value={null}>
                Sin asignar
              </MenuItem>
              {hourWork &&
                hourWork.map((hourWork) => (
                  <MenuItem value={hourWork.coD_HORARIO}>
                    de {hourWork?.horA_ENTRADA.substr(0, 5)} a {hourWork?.horA_SALIDA.substr(0, 5)}
                  </MenuItem>
                ))}
            </TextField>
          </Grid>
          <Grid item md={12} />
          <Grid item md={12}>
            <Button onClick={saveTurnoLaboral} variant="contained" >
              Guardar
            </Button>
          </Grid>
        </Grid>
      </MUIModal>
    </>
  );
};

export default Ballots;