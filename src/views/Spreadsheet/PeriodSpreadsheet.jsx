import {
  getPeriodoPlanilla,
  AddOrUpdatePeriodoPlanilla,
  deletePeriodoPlanilla,
  validatePeriodo,
} from "../../service/spreadsheet/periodspreadsheet";
import MUIModal from "../../components/Modal";
import DataGridDemo from "../../components/Table";
import { useState, useEffect, useRef } from "react";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import moment from "moment/moment";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DesktopDatePicker } from "@mui/x-date-pickers";
import { Button, Grid, TextField, Stack, MenuItem } from "@mui/material";
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
import { AlertDelete } from "../../components/Alerts";
import { AlertSuccess, AlertError } from "../../components/Alerts";
import IconToolTip from "../../components/Icons/IconToolTip";
import { getTypePlan, getSubTypePlan, getTypePlanById } from "../../service/common";
import { AlertWarning } from "../../components/Alerts";

var XLSX = require("xlsx");

const PeriodSpreadsheet = ({ id }) => {
  const defaultfields = {
    coD_PERPLAN: 0,
    nuM_PERIODO: `${new Date().getFullYear()}`,
    //nuM_PERPLAN: `${(new Date().getMonth()).toString().length == 2 ? (new Date().getMonth() + 1) : "0" + (new Date().getMonth() + 1)}`,
    nuM_PERPLAN: null,
    noM_PERIODO: null,
    feC_INICIO: new Date(),
    feC_TERMINO: new Date(),
    coD_TIPOPLAN: null,
    coD_ESTPER: 'R',
    nuM_MESPLAME: null,
  };

  const defaultErrors = {
    nuM_PERIODO: true,
    nuM_PERPLAN: true,
    noM_PERIODO: true,
    feC_INICIO: true,
    feC_TERMINO: true,
    coD_TIPOPLAN: true,
    coD_ESTPER: true,
    nuM_MESPLAME: true,
  };

  const [fields, setFields] = useState({ defaultfields });

  const [data, setData] = useState([]);
  const levelEducateChild = useRef();
  const [responseTypePlan, setResponseTypePlan] = useState([]);
  const [responseSubTypePlan, setResponseSubTypePlan] = useState([]);
  const [primary, setPrimary] = useState(null);
  const [inputError, setInputError] = useState(defaultErrors);

  const getSub = async (ind) => {
    const response = await getSubTypePlan(ind);
    setResponseSubTypePlan(response.listado);
  }

  const handleInputChange = (event) => {

    const { name, value } = event.target;


    if (name === "coD_PRIMARY") {
      setPrimary(value)
      return getSub(value);
    } else {
      setFields({ ...fields, [name]: value });

    }

  };

  const loadData = async () => {

    setInputError({
      nuM_PERIODO: false,
      nuM_PERPLAN: false,
      noM_PERIODO: false,
      feC_INICIO: false,
      feC_TERMINO: false,
      coD_TIPOPLAN: false,
      coD_ESTPER: false,
      nuM_MESPLAME: false,
    });

    const response = await getPeriodoPlanilla();
    setData(response.listado);
    const response2 = await getTypePlan(1);
    setResponseTypePlan(response2.listado);
  };
  const handleInputChangeDate = (value, name) => {
    setFields({
      ...fields,
      [name]: moment(new Date(value)).format(),
    });
  };
  /*  */
  const destroy = async (event, row) => {
    if (row.coD_ESTPER != "R") {

      AlertError("No puede eliminar este registro")

    } else {

      const resultado = await AlertDelete();
      if (resultado) {
        const dataDelete = {
          coD_PERPLAN: row.coD_PERPLAN,
        };
        await deletePeriodoPlanilla(dataDelete);
        await loadData();
      }
    }
  };
  /*  */
  const edit = async (event, row) => {

    const response = await getTypePlanById(row.coD_TIPOPLAN);
    setPrimary(response.listado[0]['coD_PADRE'])
    getSub(response.listado[0]['coD_PADRE'])
    setFields(row);
    levelEducateChild.current.handleOpen();
  };

  useEffect(() => {
    loadData();
  }, []);

  const OpenRegister = () => {
    setPrimary(null)
    setFields(defaultfields);
    levelEducateChild.current.handleOpen();
  };

  const savePeriodoPlanilla = async () => {
      const validate = validateFields();
      if (!validate) return;
      const response = await AddOrUpdatePeriodoPlanilla(fields);
      if (response.code === 0) {
        levelEducateChild.current.handleOpen();
        await loadData();
        levelEducateChild.current.handleClose();
        await AlertSuccess(`${response.message}`);
        setFields(defaultfields);
      } else {
        levelEducateChild.current.handleClose();
        return await AlertError(`${response.message}`);
      }
    // }
  };

  const validateFields = () => {

    const copyFields = { ...fields };

    delete copyFields.coD_PERPLAN;

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

      setInputError(errors);
      AlertWarning("Hay campos obligatorios vacios");
      return false;
    }

    setInputError(errors);
    return true;

  }


  const columns = [
    {
      field: "Acciones",
      type: "actions",
      getActions: (cellValues) => [
        /*  */
        <IconToolTip
          text="Edit"
          icon={<EditIcon />}
          action={(event) => {
            edit(event, cellValues.row);
          }}
        />,
        /*  */
        /*  */
        <IconToolTip
          text="Delete"
          icon={<DeleteIcon />}
          action={(event) => {
            destroy(event, cellValues.row);
          }}
        />,
        /*  */
      ],
    },
    {
      field: "coD_PERPLAN",
      headerName: "Código",
      width: 100,
    },
    {
      field: "nuM_PERIODO",
      headerName: "Periodo",
      width: 100,
    },
    {
      field: "nuM_PERPLAN",
      headerName: "Mes",
      width: 130,
      valueGetter: (params) => {
        if (params.row?.nuM_PERPLAN === "01") return "ENERO"
        if (params.row?.nuM_PERPLAN === "02") return "FEBRERO"
        if (params.row?.nuM_PERPLAN === "03") return "MARZO"
        if (params.row?.nuM_PERPLAN === "04") return "ABRIL"
        if (params.row?.nuM_PERPLAN === "05") return "MAYO"
        if (params.row?.nuM_PERPLAN === "06") return "JUNIO"
        if (params.row?.nuM_PERPLAN === "07") return "JULIO"
        if (params.row?.nuM_PERPLAN === "08") return "AGOSTO"
        if (params.row?.nuM_PERPLAN === "09") return "SEPTIEMBRE"
        if (params.row?.nuM_PERPLAN === "10") return "OCTUBRE"
        if (params.row?.nuM_PERPLAN === "11") return "NOVIEMBRE"
        if (params.row?.nuM_PERPLAN === "12") return "DICIEMBRE"
      },
    },
    {
      field: "coD_TIPOPLAN_P",
      headerName: "Planilla",
      width: 300,
      valueGetter: (params) =>
        `${params.row?.dTipoPlanilla?.parent?.noM_TIPOPLAN}`,
    },
    {
      field: "coD_TIPOPLAN",
      headerName: "Subtipo de planilla",
      width: 300,
      valueGetter: (params) =>
        `${params.row?.dTipoPlanilla?.noM_TIPOPLAN}`,
    },
    {
      field: "coD_ESTPER",
      headerName: "Estado",
      width: 180,
      valueGetter: (params) => {
        if (params.row?.coD_ESTPER === "A") return "APERTURADO"
        if (params.row?.coD_ESTPER === "C") return "CERRADO"
        if (params.row?.coD_ESTPER === "R") return "REGISTRADO"
      },
    },
  ];

  const downloadExcel = (dataExport) => {
    var Headers = [["INFORMACIÓN DE PLANILLA PERIODO"]];
    let nData = [];
    dataExport.forEach((item) => {
      nData.push({
        Código: item?.coD_PERPLAN,
        Periodo: item?.nuM_PERIODO,
        Mes: item?.nuM_PERPLAN,
        Planilla: item?.coD_TIPOPLAN_P,
        "Subtipo de planilla": item?.coD_TIPOPLAN,
        Estado: item?.coD_ESTPER,
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
    XLSX.utils.book_append_sheet(workBook, workSheet, "Planilla Periodo");
    XLSX.write(workBook, { bookType: "xlsx", type: "buffer" });
    XLSX.write(workBook, { bookType: "xlsx", type: "binary" });
    XLSX.writeFile(workBook, "ReportePlanillaPeriodo.xlsx");
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
              "coD_PERPLAN",
              "nuM_PERIODO",
              "nuM_PERPLAN",
              "coD_TIPOPLAN_P",
              "coD_TIPOPLAN",
              "coD_ESTPER",
            ],
          }}
        />
      </GridToolbarContainer>
    );
  }

  return (
    <>
      <div style={{ flexGrow: 1 }}>
        <Stack direction="row" spacing={1} xs={{ mb: 1, display: "flex" }}>
          <div>
            <h1>Planilla Periodo</h1>
          </div>
        </Stack>
        <DataGridDemo
          id={(row) => row.coD_PERPLAN}
          rows={data}
          columns={columns}
          toolbar={CustomToolbar}
        />
      </div>
      <MUIModal ref={levelEducateChild}>
        <Grid container spacing={1.5}>
          <Grid item md={4} sm={12} xs={12}>
            <TextField
              name="nuM_PERIODO"
              fullWidth
              InputLabelProps={{
                shrink: true,
              }}
              error={inputError.nuM_PERIODO}
              type="number"
              inputProps={{ maxlength: "4" }}
              size="small"
              label="N° Periodo"
              onChange={handleInputChange}
              value={fields.nuM_PERIODO}
            />
          </Grid>
          <Grid item md={4} sm={12} xs={12}>
            <TextField
              name="nuM_PERPLAN"
              fullWidth
              InputLabelProps={{
                shrink: true,
              }}
              error={inputError.nuM_PERPLAN}
              size="small"
              label="Mes"
              onChange={handleInputChange}
              value={fields.nuM_PERPLAN}
              select
            >
              <MenuItem value="01">
                ENERO
              </MenuItem>
              <MenuItem value="02">
                FEBRERO
              </MenuItem>
              <MenuItem value="03">
                MARZO
              </MenuItem>
              <MenuItem value="04">
                ABRIL
              </MenuItem>
              <MenuItem value="05">
                MAYO
              </MenuItem>
              <MenuItem value="06">
                JUNIO
              </MenuItem>
              <MenuItem value="07">
                JULIO
              </MenuItem>
              <MenuItem value="08">
                AGOSTO
              </MenuItem>
              <MenuItem value="09">
                SEPTIEMBRE
              </MenuItem>
              <MenuItem value="10">
                OCTUBRE
              </MenuItem>
              <MenuItem value="11">
                NOVIEMBRE
              </MenuItem>
              <MenuItem value="12">
                DICIEMBRE
              </MenuItem>
            </TextField>
          </Grid>
          <Grid item md={4} sm={12} xs={12}>
            <TextField
              name="noM_PERIODO"
              fullWidth
              InputLabelProps={{
                shrink: true,
              }}
              error={inputError.noM_PERIODO}
              inputProps={{ maxlength: "100" }}
              size="small"
              label="Nombre Periodo"
              onChange={handleInputChange}
              value={fields.noM_PERIODO}
            />
          </Grid>
          <Grid item md={12} />
          <Grid item md={4} sm={12} xs={12}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DesktopDatePicker
                label="Fecha de Inicio"
                inputFormat="dd-MM-yyyy"
                value={moment(fields.feC_INICIO).format()}
                error={inputError.feC_INICIO}
                onChange={(e) => handleInputChangeDate(e, "feC_INICIO")}
                renderInput={(params) => <TextField size="small" fullWidth
                  InputLabelProps={{
                    shrink: true
                  }} {...params} />}
              />
            </LocalizationProvider>
          </Grid>
          <Grid item md={4} sm={12} xs={12}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DesktopDatePicker
                label="Fecha de termino"
                inputFormat="dd-MM-yyyy"
                value={moment(fields.feC_TERMINO).format()}
                error={inputError.feC_TERMINO}
                onChange={(e) => handleInputChangeDate(e, "feC_TERMINO")}
                renderInput={(params) => <TextField size="small" fullWidth
                  InputLabelProps={{
                    shrink: true
                  }} {...params} />}
              />
            </LocalizationProvider>
          </Grid>
          {/* traer select Tipo Planilla */}
          <Grid item md={4} sm={12} xs={12}>
            <TextField
              name="coD_ESTPER"
              fullWidth
              InputLabelProps={{
                shrink: true,
              }}
              error={inputError.coD_ESTPER}
              select
              size="small"
              label="ESTPER"
              onChange={handleInputChange}
              value={fields.coD_ESTPER}
            >
              <MenuItem value="R">REGISTRADO</MenuItem>
              <MenuItem value="A">APERURADO</MenuItem>
              <MenuItem value="C">CERRADO</MenuItem>
            </TextField>
          </Grid>
          <Grid item md={12} />
          <Grid item md={4} sm={12} xs={12}>
            <TextField
              name="coD_PRIMARY"
              fullWidth
              InputLabelProps={{
                shrink: true,
              }}
              error={inputError.coD_PRIMARY}
              size="small"
              label="Tipo Planilla"
              onChange={handleInputChange}
              value={primary}
              select
            >
              {responseTypePlan &&
                responseTypePlan.map(data => (
                  <MenuItem value={data.coD_TIPOPLAN}>
                    {data.noM_TIPOPLAN}
                  </MenuItem>
                ))}
            </TextField>
          </Grid>
          <Grid item md={4} sm={12} xs={12}>
            <TextField
              name="coD_TIPOPLAN"
              fullWidth
              InputLabelProps={{
                shrink: true,
              }}
              error={inputError.coD_TIPOPLAN}
              size="small"
              label="Subtipo Planilla"
              onChange={handleInputChange}
              value={fields.coD_TIPOPLAN}
              select
            >
              {responseSubTypePlan &&
                responseSubTypePlan.map(data => (
                  <MenuItem value={data.coD_TIPOPLAN}>
                    {data.noM_TIPOPLAN}
                  </MenuItem>
                ))}
            </TextField>
          </Grid>
          <Grid item md={4} sm={12} xs={12}>
            <TextField
              name="nuM_MESPLAME"
              fullWidth
              InputLabelProps={{
                shrink: true,
              }}
              error={inputError.nuM_MESPLAME}
              size="small"
              label="MESPLAME"
              onChange={handleInputChange}
              value={fields.nuM_MESPLAME}
              select
            >
              <MenuItem value="01">
                ENERO
              </MenuItem>
              <MenuItem value="02">
                FEBRERO
              </MenuItem>
              <MenuItem value="03">
                MARZO
              </MenuItem>
              <MenuItem value="04">
                ABRIL
              </MenuItem>
              <MenuItem value="05">
                MAYO
              </MenuItem>
              <MenuItem value="06">
                JUNIO
              </MenuItem>
              <MenuItem value="07">
                JULIO
              </MenuItem>
              <MenuItem value="08">
                AGOSTO
              </MenuItem>
              <MenuItem value="09">
                SEPTIEMBRE
              </MenuItem>
              <MenuItem value="10">
                OCTUBRE
              </MenuItem>
              <MenuItem value="11">
                NOVIEMBRE
              </MenuItem>
              <MenuItem value="12">
                DICIEMBRE
              </MenuItem>
            </TextField>
          </Grid>
          <Grid item md={12} />
          <Grid item md={12}>
            <Button onClick={savePeriodoPlanilla} variant="contained">
              Guardar
            </Button>
          </Grid>
        </Grid>
      </MUIModal>
    </>
  );
};

export default PeriodSpreadsheet;
