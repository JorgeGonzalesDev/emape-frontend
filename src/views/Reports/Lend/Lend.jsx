import DataGridDemo from "../../../components/Table";
import { useState, useEffect, useRef } from "react";
import { Button, Grid, TextField, Stack, MenuItem, Autocomplete } from "@mui/material";
import {
  GetByPeriodoPlanilla
} from "../../../service/historicalspreadsheet";
import { getEmployeeDesByConcept, employeeDesInsertorUpdate, deleteEmployeeDes, getEmployeeDesByConceptFec } from "../../../service/lend/prog";
import { employeeDesCronInsertorUpdate, getEmployeeDesCron, deleteDesCron } from "../../../service/lend/cron";
import IconToolTip from "../../../components/Icons/IconToolTip";
import { AlertSuccess, AlertError, AlertWarning } from "../../../components/Alerts";
import { getSubTypePlan, getTrabajador, getConcept } from "../../../service/common";
import moment from "moment/moment";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import GenerarIcon from '@mui/icons-material/AssignmentReturned';
import PagosIcon from '@mui/icons-material/LocalAtm';

import { AlertDelete } from "../../../components/Alerts";
import MUIModal from "../../../components/Modal";

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import ReceiptIcon from '@mui/icons-material/Receipt';
import PriceCheckIcon from '@mui/icons-material/PriceCheck';
import Box from '@mui/material/Box';
import {
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarDensitySelector,
  GridActionsCellItem
} from '@mui/x-data-grid';


const Lend = () => {
  const defaultfields = {
    coD_PERPLAN: 0,
    nuM_PERIODO: `${new Date().getFullYear()}`,
    nuM_PERPLAN: 0,
    coD_TIPOPLAN: null,
    coD_CONCEPTO: 0,
  };

  const defaultfieldsprog = {
    coD_TRADES: 0,
    coD_CONCEPTO: 0,
    coD_TRABAJADOR: 0,
    feC_INICIO: new Date(),
    nuM_CUOTAS: 0,
    moN_DEUDA: 0,
    obS_DEUDA: "",
    inD_ESTADO: "A",
  };

  const defaultfecha = {
    fecha_Actual: '',
  }

  const [fields, setFields] = useState(defaultfields);
  const [fieldsprog, setFieldsProg] = useState(defaultfieldsprog);
  const [fecha, setFecha] = useState(defaultfecha);
  const [responseConcept, setResponseConcept] = useState([]);
  const [data, setData] = useState([]);
  const [data1, setData1] = useState([]);
  const [data4, setData4] = useState([]);
  const [namePerson, setNamePerson] = useState([]);

  const levelConceptChild = useRef();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFields({ ...fields, [name]: value });
    setFieldsProg({ ...fieldsprog, [name]: value });
  };

  /* const handleInputChangeDate = (event) => {
    const { name, value } = event.target;
    setFecha({ ...fecha, [name]: value });
  }; */
  const handleInputChangeDate = (value, name) => {
    setFieldsProg({
      ...fieldsprog,
      [name]: moment(new Date(value)).format(),
    });
  };
  const loadData = async () => {

    const response3 = await getConcept();

    const data = response3.listado;

    data.splice(0, 0, {
      coD_CONCEPTO: 0,
      noM_CONCEPTO: 'Todos'
    })

    setResponseConcept(data);

    const response4 = await getTrabajador();
    setData4(response4.listado);

    const response = await getEmployeeDesByConceptFec(fields.nuM_PERIODO, fields.nuM_PERPLAN, fields.coD_CONCEPTO);
    setData1(response.listado);

  };

  useEffect(() => {
    loadData();
  }, []);

  const filterConcept = async () => {

    const response = await getEmployeeDesByConceptFec(fields.nuM_PERIODO, fields.nuM_PERPLAN, fields.coD_CONCEPTO);
    setData1(response.listado);

  }

  const OpenEdit = async (event, row) => {
    setFieldsProg({
      coD_TRADES: row.coD_TRADES,
      coD_CONCEPTO: row.coD_CONCEPTO,
      coD_TRABAJADOR: row.coD_TRABAJADOR,
      feC_INICIO: row.feC_INICIO,
      nuM_CUOTAS: row.nuM_CUOTAS,
      moN_DEUDA: row.moN_DEUDA,
      inD_ESTADO: row.inD_ESTADO,
    });
    setNamePerson(`${row?.dTrabajador?.dPersona?.deS_APELLP} ${row?.dTrabajador?.dPersona?.deS_APELLM} ${row?.dTrabajador?.dPersona?.noM_PERS}`);
    levelConceptChild.current.handleOpen();
  }
  const OpenRegister = async () => {
    setNamePerson("")
    setFieldsProg(defaultfieldsprog);
    levelConceptChild.current.handleOpen();
  };
  const destroy = async (event, id) => {
    const resultado = await AlertDelete();
    if (resultado) {
      const dataDelete = {
        coD_TRADES: id,
      };
      await deleteEmployeeDes(dataDelete);
      const response = await getEmployeeDesByConceptFec(fields.nuM_PERIODO, fields.nuM_PERPLAN, fields.coD_CONCEPTO);
      setData1(response.listado);
    }
  };

  const saveC = async () => {

    const response = await employeeDesInsertorUpdate(fieldsprog);
    if (response.code === 0) {
      setFieldsProg(defaultfieldsprog);
      levelConceptChild.current.handleClose();
      fields.coD_CONCEPTO = fieldsprog.coD_CONCEPTO;
      const response = await getEmployeeDesByConceptFec(fields.nuM_PERIODO, fields.nuM_PERPLAN, fields.coD_CONCEPTO);
      setData1(response.listado);
      return await AlertSuccess(`${response.message}`);
    } else {
      return await AlertError(`${response.message}`);
    }
  }

  const generar = async (event, row) => {


    const response2 = await getEmployeeDesCron(row.coD_TRADES);
    if (response2.code != 100) return AlertWarning('Ya hay un cronograma generado');

    const bodyCron = {
      "coD_DESDET": 0,
      "coD_TRADES": row.coD_TRADES,
      "feC_DESCUENTO": row.feC_INICIO,
      "nuM_CUOTA": row.nuM_CUOTAS,
      "moN_DEUDA": row.moN_DEUDA,
      "obS_DEUDA": "string",
      "inD_ESTADO": row.inD_ESTADO,
      "inD_PAGO": "1"
    }

    const response = await employeeDesCronInsertorUpdate(bodyCron);
    if (response["dato"] == "OK") {
      await AlertSuccess("Cronogroma generado")
    } else {
      await AlertError();
    }

  };

  const obtenerCron = async (event, id) => {
    fieldsprog.coD_TRADES = id;
    const response = await getEmployeeDesCron(id);
    setData(response.listado);
  };

  const editCron = async (event, row) => {

    if (row?.inD_PAGO === "1") {
      var inD_PAGO = "2";
    } else if (row?.inD_PAGO === "2") {
      var inD_PAGO = "1";
    }

    const body = {
      coD_DESDET: row?.coD_DESDET,
      coD_TRADES: row?.coD_TRADES,
      feC_DESCUENTO: row?.feC_DESCUENTO,
      inD_ESTADO: row?.inD_ESTADO,
      inD_PAGO: inD_PAGO,
      moN_DEUDA: row?.moN_DEUDA,
      nuM_CUOTA: row?.nuM_CUOTA,
      obS_DEUDA: row?.obS_DEUDA,
    }

    const response = employeeDesCronInsertorUpdate(body);


    await AlertSuccess(response.message);

    return await obtenerCron(event, row?.coD_TRADES);

  };

  const deleteCron = async (event, id) => {

    const resultado = await AlertDelete();

    if (resultado) {
      const dataDelete = {
        coD_DESDET: id
      };
      await deleteDesCron(dataDelete);
    }
    obtenerCron(event, fieldsprog.coD_TRADES);
  };

  const columns = [
    {
      field: "Acciones",
      type: "actions",
      getActions: (cellValues) => [
        <IconToolTip
          text="Pagó o No pagó"
          icon={<PriceCheckIcon />}
          action={(event) => {
            editCron(event, cellValues.row);
          }}
        />,
        <IconToolTip
          text="Eliminar"
          icon={<DeleteIcon />}
          action={(event) => {
            deleteCron(event, cellValues.row?.coD_DESDET);
          }}
        />,
      ],
    },
    {
      field: "coD_DESDET",
      headerName: "Codigo",
      width: 300,
    },
    {
      field: "feC_DESCUENTO",
      headerName: "Fecha",
      width: 300,
      valueGetter: (params) =>
        `${params.row?.feC_DESCUENTO != null ? moment(params.row?.feC_DESCUENTO).format("DD/MM/YYYY") : ''}`,
    },
    {
      field: "nuM_CUOTA",
      headerName: "Cuota",
      width: 200,
    },
    {
      field: "moN_DEUDA",
      headerName: "Deuda",
      width: 200,
    },
    {
      field: "inD_PAGO",
      headerName: "Indice de pago",
      width: 100,
      valueGetter: (params) => {
        if (params.row?.inD_PAGO === "2") {
          return "No Pagó"
        } else {
          return "Pagó"
        }
      }
    },
  ];

  const columns2 = [
    {
      field: "Acciones",
      type: "actions",
      width: 200,
      getActions: (cellValues) => [
        /*  */
        <IconToolTip
          text="Edit"
          icon={<EditIcon />}
          action={(event) => {
            OpenEdit(event, cellValues.row)
          }}
        />,
        /*  */
        <IconToolTip
          text="Delete"
          icon={<DeleteIcon />}
          action={(event) => {
            destroy(event, cellValues.row?.coD_TRADES);
          }}
        />,
        /*  */
        <IconToolTip
          text="Generar"
          icon={<GenerarIcon />}
          action={(event) => {
            generar(event, cellValues.row);
          }}
        />,
        /*  */
        <IconToolTip
          text="Seleccionar"
          icon={<ReceiptIcon />}
          action={(event) => {
            obtenerCron(event, cellValues.row.coD_TRADES);
          }}
        />,
        /*  */
      ],
    },
    {
      field: "coD_TRADES",
      headerName: "Codigo",
      width: 100,
      hide: false,
      headerAlign: "center",
    },
    {
      field: "dTrabajador",
      headerName: "Apellidos y Nombres",
      width: 280,
      hide: false,
      headerAlign: "center",
      valueGetter: (params) =>
        `${params.row?.dTrabajador?.dPersona?.deS_APELLP} ${params.row.dTrabajador.dPersona?.deS_APELLM || ""} ${params.row.dTrabajador.dPersona?.noM_PERS || ""}`
    },
    {
      field: "dConceptoPlanilla",
      headerName: "Concepto",
      width: 200,
      headerAlign: "center",
      valueGetter: (params) => `${params.row?.dConceptoPlanilla?.noM_CONCEPTO}`,
    },
    {
      field: "feC_INICIO",
      headerName: "Inicio",
      width: 200,
      headerAlign: "center",
      valueGetter: (params) =>
        `${params.row?.feC_INICIO != null ? moment(params.row?.feC_INICIO).format("DD/MM/YYYY") : ''}`,
    },
    {
      field: "nuM_CUOTAS",
      headerName: "Cuotas",
      width: 120,
      headerAlign: "center",
    },
    {
      field: "moN_DEUDA",
      headerName: "Monto",
      width: 100,
      headerAlign: "center",
    },
    {
      field: "inD_ESTADO",
      headerName: "Estado",
      width: 100,
      headerAlign: "center",
      valueGetter: (params) =>
        `${params.row?.inD_ESTADO == "A" ? 'Activo' : 'Inactivo'}`,
    },
  ];

  const columns3 = [
    {
      field: "acciones",
      type: "actions",
      disableExport: true,
      getActions: (cellValues) => [
        <GridActionsCellItem
          onClick={async () => {
            setNamePerson(`${cellValues.row.dPersona.deS_APELLP} ${cellValues.row.dPersona.deS_APELLM} ${cellValues.row.dPersona.noM_PERS}`)
            fieldsprog.coD_TRABAJADOR = cellValues.row.coD_TRABAJADOR
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
      </GridToolbarContainer>
    );
  }

  return (
    <>
      <Grid item md={12} xs={12} sm={12}>
        <div style={{ flexGrow: 1 }}>
          <Stack direction="row" spacing={1} xs={{ mb: 1, display: "flex" }}>
            <div>
              <h1>Trabajador descuento cronograma</h1>
            </div>
          </Stack>
        </div>
        <Stack direction="row" spacing={1} xs={{ mb: 1, display: "flex" }} marginBottom={3}>
          <Grid container spacing={2} justifyContent="center">
            <Grid item md={12} xs={12}>
              <h3 style={{ color: "black" }}>Selección</h3>
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
                <MenuItem selected={true} value={0}>TODOS</MenuItem>
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
              {/* <TextField
                name="coD_CONCEPTO"
                fullWidth
                InputLabelProps={{
                  shrink: true,
                }}
                size="small"
                label="Concepto"
                onChange={handleInputChange}
                value={fields.coD_CONCEPTO}
                select
              >
                <MenuItem selected={true} value={0}>
                  TODOS
                </MenuItem>
                {responseConcept &&
                  responseConcept.map(data => (
                    <MenuItem value={data.coD_CONCEPTO}>
                      {data?.noM_CONCEPTO}
                    </MenuItem>
                  ))}
              </TextField> */}
              <Autocomplete
                id="coD_CONCEPTO"
                getOptionLabel={(responseConcept) => `${responseConcept.noM_CONCEPTO}` || 0}
                options={responseConcept}
                disableClearable
                onChange={(event, value) => setFields({ ...fields, ['coD_CONCEPTO']: value['coD_CONCEPTO'] })}
                isOptionEqualToValue={(option, value) => option.noM_CONCEPTO === value.noM_CONCEPTO}
                noOptionsText={"No encontrado"}
                value={responseConcept.find((option) => option.coD_CONCEPTO === fields.coD_CONCEPTO)}
                renderOption={(props, responseConcept) => (
                  <>
                    <Box component='li' {...props} key={responseConcept.coD_CONCEPTO}>
                      {responseConcept.noM_CONCEPTO}
                    </Box>
                  </>
                )}
                renderInput={(params) => <TextField {...params} size="small" label="Conceptos" />}
              />
            </Grid>
            <Grid item md={3} sm={12} xs={12}>
              <Button
                size="large"
                variant="outlined"
                onClick={filterConcept}
              >
                <span>Buscar</span>
              </Button>
            </Grid>
            <Grid item md={7} sm={12} xs={12} />
          </Grid>
        </Stack>
        <Stack direction="row" spacing={1} xs={{ mb: 1, display: "flex" }} marginBottom={3}>
          <Grid container spacing={2} justifyContent="center">
            <Grid item md={7} sm={12} xs={12} />
          </Grid>
        </Stack>
      </Grid>
      <br />
      <Grid container spacing={1}>
        <Grid item md={12} sm={12} xs={12}>
          <h3 style={{ color: "black" }}>Relación de Descuentos Programados</h3>
        </Grid>
        <Grid item md={12} sm={12} xs={12}>
          <DataGridDemo
            height={"60vh"}
            id={(row) => row.coD_TRADES}
            rows={data1}
            columns={columns2}
            toolbar={CustomToolbar}
          />
        </Grid>
      </Grid>
      <MUIModal ref={levelConceptChild}>
        <Grid container spacing={1.5}>
          <Grid item md={4} sm={12} xs={12}>
            {/* <TextField
              name="coD_CONCEPTO"
              fullWidth
              InputLabelProps={{
                shrink: true,
              }}
              size="small"
              label="Concepto"
              onChange={handleInputChange}
              value={fieldsprog.coD_CONCEPTO}
              select
            >
              {responseConcept &&
                responseConcept.map(data => (
                  <MenuItem value={data.coD_CONCEPTO}>
                    {data?.noM_CONCEPTO}
                  </MenuItem>
                ))}
            </TextField> */}
            <Autocomplete
              id="coD_CONCEPTO"
              getOptionLabel={(responseConcept) => `${responseConcept.noM_CONCEPTO}`}
              options={responseConcept}
              disableClearable
              onChange={(event, value) => setFieldsProg({ ...fieldsprog, ['coD_CONCEPTO']: value['coD_CONCEPTO'] })}
              isOptionEqualToValue={(option, value) => option.noM_CONCEPTO === value.noM_CONCEPTO}
              noOptionsText={"No encontrado"}
              value={responseConcept.find((option) => option.coD_CONCEPTO === fieldsprog.coD_CONCEPTO)}
              renderOption={(props, responseConcept) => (
                <Box component='li' {...props} key={responseConcept.coD_CONCEPTO}>
                  {responseConcept.noM_CONCEPTO}
                </Box>

              )}
              renderInput={(params) => <TextField {...params} size="small" label="Conceptos" />}
            />
          </Grid>
          <Grid item md={6} sm={12} xs={12}>
            <TextField
              name="namePersona"
              fullWidth
              InputLabelProps={{
                shrink: true,
              }}
              size="small"
              label="Nombres y Apellidos"
              onChange={handleInputChange}
              value={namePerson}
            />
          </Grid>
          <Grid item md={12} sm={12} xs={12} />
          <Grid item md={4} sm={12} xs={12}>
            {/* <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DesktopDatePicker
                label="Fecha Inicio"
                inputFormat="dd-MM-yyyy"
                value={moment(fieldsprog.feC_INICIO).format()}
                onChange={e =>
                  handleInputChangeDate(e, 'feC_INICIO')}
                renderInput={(params) => <TextField fullWidth
                  InputLabelProps={{
                    shrink: true
                  }}
                  size="small"
                  {...params} />}
              />
              </LocalizationProvider> */}
            {/*  */}
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DesktopDatePicker
                label="Fecha de Inicio"
                inputFormat="dd-MM-yyyy"
                value={moment(fieldsprog.feC_INICIO).format()}
                onChange={(e) => handleInputChangeDate(e, "feC_INICIO")}
                renderInput={(params) => <TextField size="small" fullWidth
                  InputLabelProps={{
                    shrink: true
                  }} {...params} />}
              />
            </LocalizationProvider>

          </Grid>
          <Grid item md={4} sm={12} xs={12}>
            <TextField
              name="nuM_CUOTAS"
              type="number"
              fullWidth
              InputLabelProps={{
                shrink: true,
              }}
              size="small"
              label="Cuotas"
              onChange={handleInputChange}
              value={fieldsprog.nuM_CUOTAS}
            />
          </Grid>
          <Grid item md={4} sm={12} xs={12}>
            <TextField
              name="moN_DEUDA"
              type="number"
              fullWidth
              InputLabelProps={{
                shrink: true,
              }}
              size="small"
              label="Deuda"
              onChange={handleInputChange}
              value={fieldsprog.moN_DEUDA}
            />
          </Grid>
          <Grid item md={4} sm={12} xs={12}>
            <TextField
              name="inD_ESTADO"
              fullWidth
              InputLabelProps={{
                shrink: true,
              }}
              size="small"
              label="Estado"
              // error={inputError.inD_CALCULO}
              onChange={handleInputChange}
              value={fieldsprog.inD_ESTADO}
              select
            >
              <MenuItem value="A">
                Activo
              </MenuItem>
              <MenuItem value="I">
                Inactivo
              </MenuItem>
            </TextField>
          </Grid>
          <Grid item md={12} />
          <Grid item md={12}>
            <DataGridDemo
              height='40vh'
              id={(row) => row.coD_TRABAJADOR}
              rows={data4}
              columns={columns3}
              numberSize={10}
            />
          </Grid>
          <Grid item md={12} />
          <Grid item md={12}>
            <Button onClick={saveC} variant="contained">
              Guardar
            </Button>
          </Grid>
        </Grid>
      </MUIModal>
      <br />
      <Grid item md={12}>
        <h3 style={{ color: "black" }}>Cronograma de Descuentos</h3>
        <DataGridDemo
          height='60vh'
          id={(row) => row.coD_DESDET}
          rows={data}
          columns={columns}
          numberSize={10}
        />
      </Grid>
    </>
  );
};

export default Lend;
