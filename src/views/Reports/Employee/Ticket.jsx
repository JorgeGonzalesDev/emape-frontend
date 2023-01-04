import DataGridDemo from "../../../components/Table";
import { useState, useEffect } from "react";
import FileIcon from '@mui/icons-material/InsertDriveFile';
import { Button, Grid, TextField, Stack, MenuItem } from "@mui/material";
import {
  ListPlanillaHistorica, getPlanillaHistoricaExportTXT, GetByPeriodoPlanilla2
} from "../../../service/historicalspreadsheet";
import { getPeriodoPlanillaByYearPerplan } from "../../../service/spreadsheet/periodspreadsheet";
import SlowMotionVideoIcon from '@mui/icons-material/SlowMotionVideo';
import IconToolTip from "../../../components/Icons/IconToolTip";

const Ticket = () => {
  const defaultfields = {
    coD_PERPLAN: 0,
    nuM_PERIODO: `${new Date().getFullYear()}`,
    nuM_PERPLAN: `${new Date().getMonth()}`,
    coD_TIPOPLAN: null,
    coD_TRABAJADOR: null,
  };

  const [fields, setFields] = useState(defaultfields);
  const [data1, setData1] = useState([]);
  const [data2, setData2] = useState([]);
  const [data3, setData3] = useState([]);

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
  const filterEmployee = async (listado) => {
    setData3(listado)
    if (data3.length === 0) return;
    const idEmployee = [];
    data3.forEach(element => {
        idEmployee.push(element['coD_PLAHIS'])
    })
    let newArray = data2.filter(
        (data) => !idEmployee.some((data2) => data2 === data['coD_PLAHIS']));
    setData2(newArray);
    console.log(setData2);
}

  const filterSpreadsheet = async (event, row) => {
    console.log(row)
    const response2 = await GetByPeriodoPlanilla2(row.coD_PERPLAN);
    console.log(response2);
    fields.coD_PERPLAN = row.coD_PERPLAN;
    filterEmployee(response2.listado)
  }

  const generateTicket = (event, row) => {

    var path = `/RRHHDEV/reportes/HistoricalBallot/${row.coD_TRABAJADOR}/${row.coD_PERPLAN}`;
    window.location = path;
  }

  useEffect(() => {
    loadData();
  }, []);

  const filterYear = async () => {
    const response = await getPeriodoPlanillaByYearPerplan(fields.nuM_PERIODO, fields.nuM_PERPLAN);
    setData1(response.listado);
  }

  const columns = [
    {
      field: "Acciones",
      type: "actions",
      getActions: (cellValues) => [
        
          <IconToolTip
              text="Seleccionar"
              icon={<SlowMotionVideoIcon />}
              action={(event) => {
                filterSpreadsheet(event, cellValues.row);
              }}
          />,
      ],
    },
    {
      field: "coD_TIPOPLAN_P",
      headerName: "Planilla",
      width: 300,
      valueGetter: (params) => `${params.row?.dTipoPlanilla?.parent?.noM_TIPOPLAN}`,
    },
    {
      field: "coD_TIPOPLAN",
      headerName: "Subtipo de planilla",
      width: 200,
      valueGetter: (params) => `${params.row?.dTipoPlanilla?.noM_TIPOPLAN}`,
    },
  ];

  const columns2 = [
    {
      field: "Acciones",
      type: "actions",
      getActions: (cellValues) => [
        <IconToolTip
            text="Boleta"
            icon={<FileIcon />}
            action={(event) => {
              generateTicket(event, cellValues.row);
            }}
        />,
    ],
    },
    {
      field: "coD_TRABAJADOR",
      headerName: "Código Trabajador",
      width: 100,
      headerAlign: "center",
    },
    {
      field: "apellidoS_NOMBRES",
      headerName: "Nombre completo",
      width: 400,
      headerAlign: "center",
    },
    {
      field: "nuM_DOC",
      headerName: "Documento de Identidad",
      width: 150,
      headerAlign: "center",
    },
    {
      field: "sueldo",
      headerName: "Sueldo",
      width: 150,
      headerAlign: "center",
    },
  ];

  return (
    <>
      <Grid item md={12} xs={12} sm={12}>
        <div style={{ flexGrow: 1 }}>
          <Stack direction="row" spacing={1} xs={{ mb: 1, display: "flex" }}>
            <div>
              <h1>Boleta Trabajadores</h1>
            </div>
          </Stack>
        </div>
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
                inputProps={{ maxlength: "4" }}
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
            <Grid item md={3} sm={12} xs={12}>
              <Button
                size="large"
                variant="outlined"
                onClick={filterYear}
              >
                <span>Buscar</span>
              </Button>
            </Grid>
            <Grid item md={2} sm={12} xs={12} />

          </Grid>
        </Stack>
      </Grid>
      <br />
      <Grid container spacing={1}>
        <Grid item md={12} sm={12} xs={12}>
          <DataGridDemo
            height={"50VH"}
            id={(row) => row?.coD_PERPLAN}
            rows={data1}
            columns={columns}
          />
        </Grid>
        <Grid item md={12} sm={12} xs={12}>
          <h1 style={{ color: "black" }}>Trabajadores</h1>
         </Grid>
        <Grid item md={12} sm={12} xs={12}>
          <DataGridDemo
            height={"50vh"}
            id={(row) => row.coD_TRABAJADOR}
            rows={data3}
            columns={columns2}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default Ticket;
