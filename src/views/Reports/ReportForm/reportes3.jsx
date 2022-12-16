import DataGridDemo from "../../../components/Table";
import { useState, useEffect } from "react";
import FileIcon from '@mui/icons-material/InsertDriveFile';
import { Button, Grid, TextField, Stack, MenuItem } from "@mui/material";
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDateTimePicker } from '@mui/x-date-pickers/DesktopDateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import moment from "moment/moment";
import {
  ListPlanillaHistorica, getPlanillaHistoricaExportTXT
} from "../../../service/historicalspreadsheet";
import { AlertSuccess } from "../../../components/Alerts";

var XLSX = require("xlsx");

const Report = () => {
  const defaultfields = {
    coD_PERPLAN: 0,
    nuM_PERIODO: `${new Date().getFullYear()}`,
    nuM_PERPLAN: `${new Date().getMonth()}`,
    coD_TIPOPLAN: null,
    inicio: `2022-10-17`,
    termino: `${new Date().getFullYear()}-${new Date().getMonth()}-${new Date().getDay()}`,
  };

  const [fields, setFields] = useState(defaultfields);
  const [data1, setData1] = useState([]);
  const [data2, setData2] = useState([]);
  const [data3, setData3] = useState([]);
  const [estado, setEstado] = useState(false);


  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFields({ ...fields, [name]: value });
  };

  const loadData = async (
    year = new Date().getFullYear(), month = new Date().getMonth()
  ) => {
    const response1 = await ListPlanillaHistorica();
    setData2(response1.listado);
    const response2 = await getPlanillaHistoricaExportTXT();
    setData2(response2.listado);
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
  /*variables de ruta*/

  const MonthlySummaryOfAbsencesAndTardies = async () => {
    if (estado == false){
      var path = `/RRHHDEV/reportes/MonthlySummaryOfAbsencesAndTardies/${fields.nuM_PERPLAN}/${fields.nuM_PERIODO}`;
      window.location = path;
      await AlertSuccess("Enviado con Exito");
    }
  }
  
  const VacationControlSummary = async () => {
    if (estado == false){
      var path = `/RRHHDEV/reportes/VacationControlSummary/`;
      window.location = path;
      await AlertSuccess("Enviado con Exito");
    }
  }
  const VacationDetail = async () => {
    if (estado == false){
      var path = `/RRHHDEV/reportes/VacationDetail/${fields.nuM_PERIODO}`;
      window.location = path;
      await AlertSuccess("Enviado con Exito");
    }
  }
  const MedicalRestForm = async () => {
    if (estado == false){
      var path = `/RRHHDEV/reportes/MedicalRestForm/${fields.nuM_PERIODO}`;
      window.location = path;
      await AlertSuccess("Enviado con Exito");
    }
  }
  const Asistencia = async () => {
    if (estado == false){
      var path = `/RRHHDEV/papeletas/listar/Asistencia`;
      window.location = path;
      await AlertSuccess("Enviado con Exito");
    }
  }
  const PermissionsReport = async () => {
    if (estado == false){
      var path = `/RRHHDEV/reportes/PermissionsReport/${fields.inicio}/${fields.termino}`;
      window.location = path;
      await AlertSuccess("Enviado con Exito");
    }
  }

  return (
    <>
      <Grid item md={12} xs={12} sm={12}>
        <div style={{ flexGrow: 1 }}>
          <Stack direction="row" spacing={1} xs={{ mb: 1, display: "flex" }}>
            <div>
              <h1>Reportes de control de asistencias</h1>
            </div>
          </Stack>
        </div>
        <br />
        <Stack
          direction="row"
          xs={{ mb: 1, display: "flex" }}
          marginBottom={3}
        >
          <Grid container spacing={2}>
            <Grid item md={2} sm={12} xs={12}>
              <TextField
                name="nuM_PERIODO"
                fullWidth
                InputLabelProps={{
                  shrink: true,
                }}
                type="number"
                inputProps={{ maxLength: "4" }}
                size="small"
                label="N° Periodo"
                onChange={handleInputChange}
                value={fields.nuM_PERIODO}
              />
            </Grid>
            <Grid item md={3} sm={12} xs={12}>
              <TextField
                name="nuM_PERPLAN"
                size="small"
                onChange={handleInputChange}
                InputLabelProps={{
                  shrink: true,
                }}
                fullWidth
                select
                label="Mes"
                value={fields.nuM_PERPLAN}
              >
                <MenuItem value="01">ENERO</MenuItem>
                <MenuItem value="02">FEBRERO</MenuItem>
                <MenuItem value="03">MARZO</MenuItem>
                <MenuItem value="04">ABRIL</MenuItem>
                <MenuItem value="05">MAYO</MenuItem>
                <MenuItem value="06">JUNIO</MenuItem>
                <MenuItem value="07">JULIO</MenuItem>
                <MenuItem value="08">AGOSTO</MenuItem>
                <MenuItem value="09">SEPTIEMBRE</MenuItem>
                <MenuItem value="10">OCTUBRE</MenuItem>
                <MenuItem value="11">NOVIEMBRE</MenuItem>
                <MenuItem value="12">DICIEMBRE</MenuItem>
              </TextField>
            </Grid>
            <Grid item md={2} sm={12} xs={12} />
          </Grid>
        </Stack>
      </Grid>
      <Grid item md={4} sm={12} xs={12}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DesktopDateTimePicker
            ampm={false}
            label="Inicio*"
            inputFormat="YYYY-MM-DD"
            value={""}
            onChange={e =>
              handleInputChangeDate(e, 'feC_INICIO')}
            renderInput={(params) => <TextField {...params} 
            InputLabelProps={{
              shrink: true
            }}
            size="small" />}
          />
        </LocalizationProvider>
      </Grid>
      <Grid item md={4} sm={12} xs={12}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DesktopDateTimePicker
            ampm={false}
            label="Termino*"
            inputFormat="YYYY-MM-DD"
            value={""}
            onChange={e =>
              handleInputChangeDate(e, 'feC_TERMINO')}
            renderInput={(params) => <TextField {...params} 
            InputLabelProps={{
              shrink: true
            }}
            size="small" />}
          />
        </LocalizationProvider>
      </Grid>
      <br />
      <Stack direction="row" spacing={1} xs={{ display: "flex" }}>
        <Button
          size="large"
          variant="outlined"
          onClick={Asistencia}/*  preview pdf */
        >
          <span>Asistencia Trabajador</span>
        </Button>
        <Grid item md={3} xs={12} sm={12}>
          <Button
            size="large"
            variant="outlined"
            onClick={MonthlySummaryOfAbsencesAndTardies}/*  preview pdf */
          >
            <span>Resumen Mensual de Faltas y Tardanzas</span>
          </Button>
        </Grid>
        <Grid item md={3} xs={12} sm={12}>
          <Button
            size="large"
            variant="outlined"
            onClick={VacationControlSummary}/*  preview pdf */
          >
            <span>Resumen Control de Vacaciones</span>
          </Button>
        </Grid>
      </Stack>
      <br />
      <Stack direction="row" spacing={1} xs={{ display: "flex" }}>
        <Button
          size="large"
          variant="outlined"
          onClick={VacationDetail}/*  preview pdf */
        >
          <span>Detalle de Vacaciones</span>
        </Button>
        <Grid item md={3} xs={12} sm={12}>
          <Button
            size="large"
            variant="outlined"
            onClick={MedicalRestForm}/*  preview pdf */
          >
            <span>Detalle de Descanso Medico</span>
          </Button>
        </Grid>
        <Grid item md={3} xs={12} sm={12}>
          <Button
            size="large"
            variant="outlined"
            onClick={PermissionsReport}/*  preview pdf */
          >
            <span>Reporte de Permisos</span>
          </Button>
        </Grid>
      </Stack>
    </>
  );
};

export default Report;
