import DataGridDemo from "../../components/Table";
import { useState, useEffect } from "react";
import { Button, Grid, TextField, Stack, MenuItem } from "@mui/material";
import {
  getPlanillaHistoricaExportTXT,
  GetTxt,
  GetByPeriodoPlanilla,
} from "../../service/historicalspreadsheet";
import { getPeriodoPlanillaByYearPerplan } from "../../service/spreadsheet/periodspreadsheet";
import SlowMotionVideoIcon from "@mui/icons-material/SlowMotionVideo";
import IconToolTip from "../../components/Icons/IconToolTip";
import { saveAs } from "file-saver";
import { AlertSuccess, AlertWarning } from "../../components/Alerts";
import { getCondicion, getCargo, getUnidad } from "../../service/common";
import {
  ExportTXTREM,
  ExportTXTJOR,
  ExportTXTNOT,
} from "../../service/historicalspreadsheet/";
var XLSX = require("xlsx");

const FileGeneration = () => {
  const defaultfields = {
    coD_PERPLAN: 0,
    nuM_PERIODO: `${new Date().getFullYear()}`,
    nuM_PERPLAN: `${new Date().getMonth()}`,
    coD_TIPOPLAN: null,
    coD_TRABAJADOR: null,
    coD_CONDICION: null,
    coD_CAR: null,
    coD_UORG: null,
  };
  const defaultfecha = {
    fecha_Actual: "",
  };

  const [fields, setFields] = useState(defaultfields);
  const [fecha, setFecha] = useState(defaultfecha);
  const [banks, setFileGenerations] = useState([]);
  const [condicion, setCondicion] = useState([]);
  const [positions, setPositions] = useState([]);
  const [unidad, setUnidad] = useState([]);
  const [data1, setData1] = useState([]);
  const [data2, setData2] = useState([]);
  const [data3, setData3] = useState([]);
  const [data4, setData4] = useState([]);
  const [data5, setData5] = useState([]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFields({ ...fields, [name]: value });
  };
  const handleInputChangeDate = (event) => {
    const { name, value } = event.target;
    setFecha({ ...fecha, [name]: value });
  };

  const loadData = async (
    year = new Date().getFullYear(),
    month = new Date().getMonth(),
    COD_CONDICION,
    COD_PERPLAN,
    COD_CARGO,
    COD_UORG
  ) => {
    const response1 = await GetByPeriodoPlanilla();
    setData1(response1.listado);
    const condicionresponse = await getCondicion();
    setCondicion(condicionresponse.listado);
    const cargoresponse = await getCargo();
    setPositions(cargoresponse.listado);
    const responseUnidad = await getUnidad();
    setUnidad(responseUnidad.listado);
    /* const response = await getPlanillaHistoricaExportTXT(fields.coD_PERPLAN);
    setData4(response.listado); */
    /* const response2 = await getPlanillaHistoricaExportTXT();
    setData2(response2.listado); */
  };

  /* const loadData = async (year, month) => {
    const response = await getPeriodoPlanillaByYearPerplan(year, month);
    setData1(response.listado);
    const response1 = await ListPlanillaHistorica();
    setData2(response1.listado);
    console.log(setData1);

  }; */

  useEffect(() => {
    loadData();
  }, []);

  const filterYear = async () => {
    const response = await getPeriodoPlanillaByYearPerplan(
      fields.nuM_PERIODO,
      fields.nuM_PERPLAN
    );
    setData1(response.listado);
  };

  /* const filterConcepts = async (listado) => {

    setData3(listado)

    if (data3.length === 0) return;

    const idConcepts = [];

    data3.forEach(element => {
        idConcepts.push(element['coD_PLAHIS'])
    })

    let newArray = data2.filter(
        (data) => !idConcepts.some((data2) => data2 === data['coD_PLAHIS']));

    setData2(newArray);

    console.log(setData2);


} */
  const edit = async (event, row) => {
    const response2 = await GetByPeriodoPlanilla(row.coD_PERPLAN);
    fields.coD_PERPLAN = row.coD_PERPLAN;
    fields.coD_CONDICION = row.coD_CONDICION;
    fields.coD_CAR = row.coD_CAR;
    fields.coD_UORG = row.coD_UORG;
    await AlertSuccess(`Planilla seleccionada`);
    setData3(response2.listado);
    fields.coD_CONDICION = 0;
    fields.coD_CAR = 0;
    fields.coD_UORG = 0;
    /* ExportTXTREM */
    /* filterConcepts(response2.listado) */

    /*  const response2 = await ExportTXTREM(row.coD_CONDICION, row.coD_PERPLAN, row.coD_CAR, row.coD_UORG, row.fecha_Actual);
    fields.coD_CONDICION = row.coD_CONDICION;
    fields.coD_PERPLAN = row.coD_PERPLAN;
    fields.coD_CAR = row.coD_CAR;
    fields.coD_UORG = row.coD_UORG;
    fecha.fecha_Actual= row.fecha_Actual; */
    /* ExportTXTREM
    coD_CONDICION: null,
    coD_CAR: null,
    coD_UORG: null, */
    /* filterConcepts(response2.listado) */
    console.log(response2);
    /* console.log(response2); */
  };

  const generarTXT = async () => {
    /*  */
    /* console.log(fields.coD_PERPLAN);
    const response = await getPlanillaHistoricaExportTXT(fields.coD_PERPLAN, fecha.fecha_Actual); */
    /* if(fecha.fecha_Actual != '' && fields.coD_PERPLAN != 0){ */
    const response = await ExportTXTREM(
      fields.coD_CONDICION,
      fields.coD_PERPLAN,
      fields.coD_CAR,
      fields.coD_UORG,
      fields.fecha_Actual
    );
    const response0 = await ExportTXTREM(response.objeto["nameFile"]);
    const file64 = await response0.objeto.basE64;
    const path = `data:text/plain;charset=utf-8;base64,${file64}`;
    saveAs(`${path}`, `${response.objeto["nameFile"]}`);
    await AlertSuccess(`${response.message}`);
    console.log(response);
    /* }else{ */
    /* AlertWarning("Hay campos obligatorios vacios"); */
    /* alert("Rellene el Campo Fecha"); */
    /*  } */
    /* const response0 = await GetTxt(response.objeto['nameFile']);
    const file64 = await response0.objeto.basE64;
    const path = `data:text/plain;charset=utf-8;base64,${file64}`
    saveAs(`${path}`, `${response.objeto['nameFile']}`); */
    /* const response0 = await getPlanillaHistoricaExportTXT(COD_PERPLAN);
    const file64 = await response0.objeto.basE64;
    const path = `data:application/pdf;base64,${file64}`
    saveAs(`${path}`, ``); */
  };
  const generarTXTREM = async () => {
    if (
      fecha.fecha_Actual != "" &&
      fields.coD_PERPLAN != 0 &&
      fields.coD_CONDICION != null &&
      fields.coD_CAR != null &&
      fields.coD_UORG != null
    ) {
      const response = await ExportTXTREM(
        fields.coD_CONDICION,
        fields.coD_PERPLAN,
        fields.coD_CAR,
        fields.coD_UORG,
        fecha.fecha_Actual
      );
      if (response.isResultList == false) {
        await AlertWarning(`${response.message}`);
      } else {
        const response0 = await GetTxt(response.objeto["nameFile"]);
        const file64 = await response0.objeto.basE64;
        const path = `data:text/plain;charset=utf-8;basE64,${file64}`;
        saveAs(`${path}`, `${response.objeto["nameFile"]}`);
        await AlertSuccess(`${response.message}`);
      }
      console.log(
        fields.coD_CONDICION,
        fields.coD_PERPLAN,
        fields.coD_CAR,
        fields.coD_UORG,
        fecha.fecha_Actual
      );
      console.log(response);
    } else if(fecha.fecha_Actual == "" && fields.coD_PERPLAN != 0 && fields.coD_CONDICION == 0 && fields.coD_CAR == 0 && fields.coD_UORG == 0){
      const response = await ExportTXTREM(
        fields.coD_CONDICION,
        fields.coD_PERPLAN,
        fields.coD_CAR,
        fields.coD_UORG,
        fecha.fecha_Actual
      );
        const response0 = await GetTxt(response.objeto["nameFile"]);
        const file64 = await response0.objeto.basE64;
        const path = `data:text/plain;charset=utf-8;basE64,${file64}`;
        saveAs(`${path}`, `${response.objeto["nameFile"]}`);
        await AlertSuccess(`${response.message}`);
    }
  };
  /* const generatest = async () => {
    if(fecha.fecha_Actual == "" && fields.coD_PERPLAN != 0 && fields.coD_CONDICION == 0 && fields.coD_CAR == 0 && fields.coD_UORG == 0){
      const response = await ExportTXTJOR(
        fields.coD_CONDICION,
        fields.coD_PERPLAN,
        fields.coD_CAR,
        fields.coD_UORG,
        fecha.fecha_Actual
      );
        const response0 = await GetTxt(response.objeto["nameFile"]);
        const file64 = await response0.objeto.basE64;
        const path = `data:text/plain;charset=utf-8;basE64,${file64}`;
        saveAs(`${path}`, `${response.objeto["nameFile"]}`);
        await AlertSuccess(`${response.message}`);
    }
    console.log(
      fields.coD_CONDICION,
      fields.coD_PERPLAN,
      fields.coD_CAR,
      fields.coD_UORG,
      fecha.fecha_Actual
    );
  } */
  const generarTXTJOR = async () => {
    if (
      fecha.fecha_Actual != "" &&
      fields.coD_PERPLAN != 0 &&
      fields.coD_CONDICION != null &&
      fields.coD_CAR != null &&
      fields.coD_UORG != null
    ) {
      const response = await ExportTXTJOR(
        fields.coD_CONDICION,
        fields.coD_PERPLAN,
        fields.coD_CAR,
        fields.coD_UORG,
        fecha.fecha_Actual
      );
      if (response.isResultList == false) {
        await AlertWarning(`${response.message}`);
      } else {
        const response0 = await GetTxt(response.objeto["nameFile"]);
        const file64 = await response0.objeto.basE64;
        const path = `data:text/plain;charset=utf-8;basE64,${file64}`;
        saveAs(`${path}`, `${response.objeto["nameFile"]}`);
        await AlertSuccess(`${response.message}`);
      }
      console.log(
        fields.coD_CONDICION,
        fields.coD_PERPLAN,
        fields.coD_CAR,
        fields.coD_UORG,
        fecha.fecha_Actual
      );
      console.log(response);
    } else if(fecha.fecha_Actual == "" && fields.coD_PERPLAN != 0 && fields.coD_CONDICION == 0 && fields.coD_CAR == 0 && fields.coD_UORG == 0){
      const response = await ExportTXTJOR(
        fields.coD_CONDICION,
        fields.coD_PERPLAN,
        fields.coD_CAR,
        fields.coD_UORG,
        fecha.fecha_Actual
      );
        const response0 = await GetTxt(response.objeto["nameFile"]);
        const file64 = await response0.objeto.basE64;
        const path = `data:text/plain;charset=utf-8;basE64,${file64}`;
        saveAs(`${path}`, `${response.objeto["nameFile"]}`);
        await AlertSuccess(`${response.message}`);
    }
  };
  const generarTXTNOT = async () => {
    if (
      fecha.fecha_Actual != "" &&
      fields.coD_PERPLAN != 0 &&
      fields.coD_CONDICION != null &&
      fields.coD_CAR != null &&
      fields.coD_UORG != null
    ) {
      const response = await ExportTXTNOT(
        fields.coD_CONDICION,
        fields.coD_PERPLAN,
        fields.coD_CAR,
        fields.coD_UORG,
        fecha.fecha_Actual
      );
      if (response.isResultList == false) {
        await AlertWarning(`${response.message}`);
      } else {
        const response0 = await GetTxt(response.objeto["nameFile"]);
        const file64 = await response0.objeto.basE64;
        const path = `data:text/plain;charset=utf-8;basE64,${file64}`;
        saveAs(`${path}`, `${response.objeto["nameFile"]}`);
        await AlertSuccess(`${response.message}`);
      }
      console.log(
        fields.coD_CONDICION,
        fields.coD_PERPLAN,
        fields.coD_CAR,
        fields.coD_UORG,
        fecha.fecha_Actual
      );
      console.log(response);
    } else if(fecha.fecha_Actual == "" && fields.coD_PERPLAN != 0 && fields.coD_CONDICION == 0 && fields.coD_CAR == 0 && fields.coD_UORG == 0){
      const response = await ExportTXTNOT(
        fields.coD_CONDICION,
        fields.coD_PERPLAN,
        fields.coD_CAR,
        fields.coD_UORG,
        fecha.fecha_Actual
      );
        const response0 = await GetTxt(response.objeto["nameFile"]);
        const file64 = await response0.objeto.basE64;
        const path = `data:text/plain;charset=utf-8;basE64,${file64}`;
        saveAs(`${path}`, `${response.objeto["nameFile"]}`);
        await AlertSuccess(`${response.message}`);
    }
  };

  const columns = [
    {
      field: "Acciones",
      type: "actions",
      getActions: (cellValues) => [
        <IconToolTip
          text="Seleccionar"
          icon={<SlowMotionVideoIcon />}
          action={(event) => {
            edit(event, cellValues.row);
          }}
        />,
      ],
    },
    {
      field: "coD_TIPOPLAN_P",
      headerName: "Planilla",
      width: 300,
      valueGetter: (params) => `${params.row?.dTipoPlanilla?.noM_TIPOPLAN}`,
    },
    {
      field: "coD_TIPOPLAN",
      headerName: "Subtipo de planilla",
      width: 200,
      valueGetter: (params) =>
        `${params.row?.dTipoPlanilla?.parent?.noM_TIPOPLAN}`,
    },
  ];
  const columns2 = [
    {
      field: "coD_PLAHIS",
      headerName: "N° Estr.",
      width: 100,
      hide: false,
      headerAlign: "center",
    },
    {
      field: "Cta_sueldo",
      headerName: "Descripción Estructura",
      width: 200,
      headerAlign: "center",
      valueGetter: (params) =>
        `${
          params.row?.dTrabajador?.nuM_CCI != null
            ? params.row?.dTrabajador?.nuM_CCI
            : ""
        }`,
    },
    {
      field: "Nombre",
      headerName: "N° Arch.",
      width: 400,
      headerAlign: "center",
      valueGetter: (params) =>
        `${params.row?.dTrabajador?.dPersona?.deS_APELLP} ${
          params.row.dTrabajador.dPersona?.deS_APELLM || ""
        } ${params.row.dTrabajador.dPersona?.noM_PERS || ""}`,
    },
    {
      field: "Num_Doc",
      headerName: "Generar Archivo",
      width: 130,
      headerAlign: "center",
      valueGetter: (params) => `${params.row?.dTrabajador?.dPersona?.nuM_DOC}`,
    },
    {
      field: "moN_CONCEPTO",
      headerName: "Detalles de los datos a incluir",
      width: 240,
      headerAlign: "center",
    },
  ];
  const columns3 = [
    {
      field: "coD_PLAHIS",
      headerName: "N°",
      width: 100,
      headerAlign: "center",
    },
    {
      field: "Nombre",
      headerName: "Nombre",
      width: 400,
      headerAlign: "center",
      valueGetter: (params) =>
        `${params.row?.dTrabajador?.dPersona?.deS_APELLP} ${
          params.row.dTrabajador.dPersona?.deS_APELLM || ""
        } ${params.row.dTrabajador.dPersona?.noM_PERS || ""}`,
    },
    {
      field: "moN_CONCEPTO",
      headerName: "Monto",
      width: 100,
      headerAlign: "center",
    },
    {
      field: "Cta_sueldo",
      headerName: "Cta. Banco",
      width: 200,
      headerAlign: "center",
      valueGetter: (params) =>
        `${
          params.row?.dTrabajador?.nuM_CCI != null
            ? params.row?.dTrabajador?.nuM_CCI
            : ""
        }`,
    },
    {
      field: "nuM_DOC",
      headerName: "Num Doc",
      width: 100,
      headerAlign: "center",
      valueGetter: (params) => `${params.row?.dTrabajador?.dPersona?.nuM_DOC}`,
    },
  ];

  return (
    <>
      <Grid item md={12} xs={12} sm={12}>
        <div style={{ flexGrow: 1 }}>
          <Stack direction="row" spacing={1} xs={{ mb: 1, display: "flex" }}>
            <div>
              <h1>Generación de Archivos - T_Registro</h1>
            </div>
          </Stack>
        </div>
        <Stack
          direction="row"
          spacing={1}
          xs={{ mb: 1, display: "flex" }}
          marginBottom={3}
        >
          <Grid container spacing={2} justifyContent="center">
            <Grid item md={12} xs={12}>
              <h3 style={{ color: "black" }}>Filtros (14, 18)</h3>
            </Grid>
            <Grid item md={3} sm={12} xs={12}>
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
            {/* <Grid item md={8} sm={12} xs={12} /> */}
            {/* <Grid item md={4  } sm={12} xs={12}/>
          <Grid item md={4} sm={12} xs={12}/> */}
            {/* <Grid item md={12} xs={12}/> */}
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
            <Grid item md={6} sm={12} xs={12}>
              <TextField
                name="fecha_Actual"
                onChange={handleInputChangeDate}
                fullWidth
                type="date"
                size="small"
                InputLabelProps={{
                  shrink: true,
                }}
                value={fecha.fecha_Actual}
                label="Fecha"
              />
            </Grid>
            {/* <Grid item md={3} sm={12} xs={12}>
              <TextField
                name="nuM_PERPLAN"
                size="small"
                onChange={handleInputChange}
                InputLabelProps={{
                  shrink: true,
                }}
                fullWidth
                select
                label="Planilla"
                value={fields.nuM_PERPLAN}
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
                label="SubPlanilla"
                value={fields.nuM_PERPLAN}
              />
            </Grid> */}
            <Grid item md={12} sm={12} xs={12}>
              <Button size="large" variant="outlined" onClick={filterYear}>
                <span>Buscar</span>
              </Button>
            </Grid>
            <Grid item md={7} sm={12} xs={12} />
          </Grid>
        </Stack>
        {/* <Grid container spacing={2} marginTop={3} justifyContent="right">
          <Button variant="contained">Enviar</Button>
        </Grid> */}
      </Grid>
      <br />
      <Grid container spacing={1}>
        {/*       <Grid item md={12} sm={12} xs={12}>
          <h1 style={{ color: "red" }}>Listado de Estructuras</h1>
         </Grid> */}
        <Grid item md={12} sm={12} xs={12}>
          <DataGridDemo
            height={"39vh"}
            id={(row) => row?.coD_PERPLAN}
            rows={data1}
            columns={columns}
          />
        </Grid>
        <Stack
          direction="row"
          spacing={1}
          xs={{ mb: 1, display: "flex" }}
          marginBottom={3}
        >
          <Grid container spacing={2} justifyContent="center">
            <Grid item md={12} xs={12}>
              <h3 style={{ color: "black" }}>Filtros (4, 5, 11, 17)</h3>
            </Grid>
            {/* <Grid item md={3} sm={12} xs={12}>
              <TextField
                name="coD_PERPLAN"
                fullWidth
                InputLabelProps={{
                  shrink: true,
                }}
                size="small"
                label="Código Periodo Planilla"
                onChange={handleInputChange}
                value={fields.coD_PERPLAN}
              />
            </Grid> */}
            <Grid item md={4} sm={12} xs={12}>
              <TextField
                name="coD_UORG"
                fullWidth
                InputLabelProps={{
                  shrink: true,
                }}
                select
                size="small"
                label="Area"
                onChange={handleInputChange}
                value={fields.coD_UORG}
              >
                <MenuItem value={0}>Todos</MenuItem>
                <MenuItem value={null}>Sin especificar</MenuItem>
                {unidad &&
                  unidad.map((unidad) => (
                    <MenuItem value={unidad.coD_UORG}>
                      {unidad.deS_UORG}
                    </MenuItem>
                  ))}
              </TextField>
            </Grid>
            <Grid item md={4} sm={12} xs={12}>
              <TextField
                name="coD_CAR"
                size="small"
                onChange={handleInputChange}
                InputLabelProps={{
                  shrink: true,
                }}
                fullWidth
                select
                label="Cargo"
                value={fields.coD_CAR}
              >
                <MenuItem value={0}>Todos</MenuItem>
                {positions &&
                  positions.map((position) => (
                    <MenuItem value={position.coD_CAR}>
                      {position.deS_CAR}
                    </MenuItem>
                  ))}
              </TextField>
            </Grid>
            <Grid item md={4} sm={12} xs={12}>
              <TextField
                name="coD_CONDICION"
                size="small"
                onChange={handleInputChange}
                InputLabelProps={{
                  shrink: true,
                }}
                fullWidth
                select
                label="C. Laboral"
                value={fields.coD_CONDICION}
              >
                <MenuItem value={0}>Todos</MenuItem>
                {condicion &&
                  condicion.map((data) => (
                    <MenuItem value={data.coD_CONDICION}>
                      {data.noM_CONDICION}
                    </MenuItem>
                  ))}
              </TextField>
            </Grid>
            <Grid item md={12} sm={12} xs={12} />
            <Grid item md={4} sm={12} xs={12} />
          </Grid>
        </Stack>
      </Grid>
      <Grid item md={12} xs={12} sm={12}>
      <Stack
              direction="row"
              spacing={1}
              xs={{ mb: 1, display: "flex" }}
              marginBottom={3}
            >
              <Grid container spacing={2} justifyContent="center">
                <Grid item md={2} sm={12} xs={12}>
                  <Button
                    size="large"
                    variant="outlined"
                    onClick={generarTXTREM}
                  >
                    <span>GenerarREM</span>
                  </Button>
                </Grid>
                <Grid item md={2} sm={12} xs={12}>
                  <Button
                    size="large"
                    variant="outlined"
                    onClick={generarTXTJOR}
                  >
                    <span>GenerarJOR</span>
                  </Button>
                </Grid>
                <Grid item md={2} sm={12} xs={12}>
                  <Button
                    size="large"
                    variant="outlined"
                    onClick={generarTXTNOT}
                  >
                    <span>GenerarNOT</span>
                  </Button>
                </Grid>
                <Grid item md={6} sm={12} xs={12}/>
              </Grid>
            </Stack>
      </Grid>
    </>
  );
};

export default FileGeneration;
