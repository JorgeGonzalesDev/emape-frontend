import { useState } from "react";
import { Button, Grid, TextField, Stack, MenuItem } from "@mui/material";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import { AlertSuccess } from "../../../components/Alerts";

var XLSX = require("xlsx");

const Report = () => {
  const defaultfields = {
    coD_PERPLAN: 0,
    nuM_PERIODO: `${new Date().getFullYear()}`,
    nuM_PERPLAN: `${new Date().getMonth()}`,
    coD_TIPOPLAN: null,
    inicio: null,
    termino: null,
  };

  const [fields, setFields] = useState(defaultfields);
  const [estado, setEstado] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFields({ ...fields, [name]: value });
  };
  const handleInputChangeDate = (value, name) => {
    setFields({ ...fields, [name]: value });
  };

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

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
      </Grid>
      <br />
      <Grid item md={12} xs={12} sm={12}>
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
          </Grid>
        </Stack>
        <Stack direction="row" spacing={1} xs={{ display: "flex" }}>
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
              onClick={VacationDetail}/*  preview pdf */
            >
              <span>Detalle de Vacaciones</span>
            </Button>
          </Grid>
          <Grid item md={3} xs={12} sm={12}>
            <Button
              size="large"
              variant="outlined"
              onClick={MedicalRestForm}/*  preview pdf */
            >
              <span>Detalle de Descanso Medico</span>
            </Button>
          </Grid>
        </Stack>
      </Grid>
      <br />
      <Grid item md={12} xs={12} sm={12}>
        <Grid item md={4} sm={12} xs={12}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DesktopDatePicker
              label="Inicio"
              inputFormat="YYYY-MM-DD"
              value={fields.inicio}
              onChange={e =>
                handleInputChangeDate(e, 'inicio')}
              renderInput={(params) => <TextField {...params} 
              size="small" />}
            />
          </LocalizationProvider>
        </Grid>
        <br/>
        <Grid item md={4} sm={12} xs={12}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DesktopDatePicker
              label="Termino"
              inputFormat="YYYY-MM-DD"
              value={fields.termino}
              onChange={e =>
                handleInputChangeDate(e, 'termino')}
              renderInput={(params) => <TextField {...params} 
              size="small" />}
            />
          </LocalizationProvider>
        </Grid>
        <br />
        <Stack direction="row" spacing={1} xs={{ display: "flex" }}>
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
            onClick={VacationControlSummary}/*  preview pdf */
          >
            <span>Resumen Control de Vacaciones</span>
          </Button>
        </Grid>
      </Stack>
    </>
  );
};

export default Report;
