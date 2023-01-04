import { useState, useEffect, useRef } from "react";
import {
  destroyWC,
  getTrabajadorSpreadsheet,
} from "../../service/spreadsheet/WorkerAndConcept";
import {
  getAcumuladorConcepto,
  getConceptoPlanilla,
  getAcumuladorConceptoByConceptoId,
  getAcumuladorConceptoByAcuPlanillaId,
  getAcumuladorPlanilla,
  AddOrUpdateAcumuladorPlanilla,
  AddOrUpdateAcumuladorConcepto,
} from "../../service/payrollaccumulatorandconcepts"; /* importante */
import { Button, Grid, TextField, Stack, MenuItem, Select, Autocomplete, Box, Hidden } from "@mui/material";
import DataGridDemo from "../../components/Table";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import IconToolTip from "../../components/Icons/IconToolTip";
import SlowMotionVideoIcon from "@mui/icons-material/SlowMotionVideo";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { AlertDelete, AlertWarning } from "../../components/Alerts";
import { AlertSuccess, AlertError } from "../../components/Alerts";
import {
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarDensitySelector,
} from "@mui/x-data-grid";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import MUIModal from "../../components/Modal";
import { getConcept } from "../../service/common";

const WorkerAndConcept = () => {
  const [data, setData] = useState([]);
  const defaultfields = {
    coD_ACUPLANILLA: 0,
    coD_ACUMULADOR: null,
    noM_ACUMULADOR: null,
    moN_ACUMULADOR: 0,
    inD_ACUMAFP: null,
    inD_DSCTOESSALUD: null,
    inD_DSCTOAFP: null,
    inD_ESTADO: null,
    inD_TIPOACUMULADOR: "2",
  };
  const defaultest = {
    coD_ACUCONCEPTO: 0,
    coD_ACUPLANILLA: null,
    coD_CONCEPTO: null,
    inD_ESTADO: null,
  };
  const [fields, setFields] = useState(defaultfields);
  const [test, setTest] = useState(defaultest);
  const defaultErrors = {
    noM_ACUMULADOR: true,
    inD_ACUMAFP: true,
    inD_DSCTOESSALUD: true,
    inD_DSCTOAFP: true,
    inD_ESTADO: true,
    inD_TIPOACUMULADOR: true,
  };
  const levelEducateChild = useRef(); /* levelEducateChildTEST */
  const levelEducateChildTEST = useRef(); /* levelEducateChildTEST */
  const [data2, setData2] = useState([]);
  const [valida, setValida] = useState(true);
  const [inputError, setInputError] = useState(defaultErrors);
  const [responseConcept, setResponseConcept] = useState([]);
  const edit = async (event, row) => {
    setValida(false);
    setFields({
      coD_ACUPLANILLA: row.coD_ACUPLANILLA,
      coD_ACUMULADOR: row.coD_ACUMULADOR,
      noM_ACUMULADOR: row.noM_ACUMULADOR,
      moN_ACUMULADOR: row.moN_ACUMULADOR,
      inD_ACUMAFP: row.inD_ACUMAFP,
      inD_DSCTOESSALUD: row.inD_DSCTOESSALUD,
      inD_DSCTOAFP: row.inD_DSCTOAFP,
      inD_ESTADO: row.inD_ESTADO,
      inD_TIPOACUMULADOR: row.inD_TIPOACUMULADOR,
    });
    levelEducateChild.current.handleOpen();
  };

  const editChild = async (event, row) => {
    setTest({
      coD_ACUCONCEPTO: row.coD_ACUCONCEPTO,
      coD_ACUPLANILLA: row.coD_ACUPLANILLA,
      coD_CONCEPTO: row.coD_CONCEPTO,
      inD_ESTADO: row.inD_ESTADO,
    })
    levelEducateChildTEST.current.handleOpen();
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFields({ ...fields, [name]: value });
  };

  const handleInputChangeTest = (event) => {
    const { name, value } = event.target;
    setTest({ ...test, [name]: value });
    /* setResponseConcept({ ...test, [name] : value}); */
  };

  const loadData = async () => {
    setInputError({
      noM_ACUMULADOR: false,
      moN_ACUMULADOR: false,
      inD_ACUMAFP: false,
      inD_DSCTOESSALUD: false,
      inD_DSCTOAFP: false,
      inD_ESTADO: false,
      inD_TIPOACUMULADOR: false,
    }); /* getAcumuladorConcepto */
    const response = await getAcumuladorPlanilla();
    setData(response.listado); /* getConceptoPlanilla */
    /* const response2 = await getAcumuladorConcepto();
    setData2(response2.listado); */
    console.log(response);
    const response3 = await getConcept();
    setResponseConcept(response3.listado);
  };

  const validateFields = () => {

    const copyFields = { ...fields };
    delete copyFields.moN_ACUMULADOR;
    delete copyFields.coD_ACUPLANILLA;
    delete copyFields.coD_ACUMULADOR;

    let errors = {};

    Object.keys(copyFields).forEach((key) => {
      if (copyFields[key] === "" || !copyFields[key]) {
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
        <IconToolTip
          text="Editar"
          icon={<EditIcon />}
          action={(event) => {
            edit(event, cellValues.row);
          }}
        />,
        <IconToolTip
          text="Desplegar"
          icon={<SlowMotionVideoIcon />}
          action={(event) => {
            desplegar(cellValues.row);
          }}
        />,
      ],
    } /* coD_CONCEPTO */,
    /* {
        field: "coD_ACUCONCEPTO",
        headerName: "Código",
        width: 150,
        hide: true,
    }, */
    {
      field: "coD_ACUPLANILLA",
      headerName: "Código",
      width: 150,
      hide: true,
    },
    {
      field: "coD_ACUMULADOR",
      headerName: "Código",
      width: 100,
    },
    {
      field: "noM_ACUMULADOR",
      headerName: "Acumulador",
      width: 200,
    },
  ];
  const desplegar = async (row) => {
    /* fields.coD_ACUPLANILLA = row?.coD_ACUPLANILLA */
    /* despliega 2da tabla */
    const response = await getAcumuladorConceptoByAcuPlanillaId(
      row?.coD_ACUPLANILLA
    );
    setData2(response.listado);
    test.coD_ACUPLANILLA = row?.coD_ACUPLANILLA;
    console.log((test.coD_ACUPLANILLA /* = row?.coD_ACUPLANILLA */));
    console.log(response);
    /* test.coD_CONCEPTO = row?.coD_CONCEPTO
    test.coD_ACUCONCEPTO = row?.coD_ACUCONCEPTO */
  };
  const columns2 = [
    {
      field: "Acciones",
      type: "actions",
      getActions: (cellValues) => [
        <IconToolTip
          text="Editar"
          icon={<EditIcon />}
          action={(event) => {
            editChild(event, cellValues.row);
          }}
        />
      ],
    },
    {
      field: "coD_CONCEPTO" /* coD_CONCEPTO */,
      headerName: "Código",
      width: 150,
      hide: true,
    },
    {
      field: "coD_ACUPLANILLA",
      headerName: "Código",
      width: 100,
      valueGetter: (params) => `${params.row?.dConceptoPlanilla?.coD_CONCEPTO}`,
    },
    {
      field: "coD_ACUCONCEPTO",
      headerName: "Concepto",
      width: 250,
      valueGetter: (params) => `${params.row?.dConceptoPlanilla?.noM_CONCEPTO}`,
    },
    {
      field: "inD_ESTADO",
      headerName: "Estado",
      width: 100,
    },
  ];

  const savePadre = async () => {
    console.log(fields);
    const validate = validateFields();
    if (!validate) return;
    const response = await AddOrUpdateAcumuladorPlanilla(fields);
    if (response.code === 0) {
      await loadData();
      levelEducateChild.current.handleClose();
      await AlertSuccess(`${response.message}`);
    } else {
      levelEducateChild.current.handleClose();
      return await AlertError(`${response.message}`);
    }
  };

  const saveHijos = async () => {
    /* const validate = validateFields();
    if (!validate) return; */
    const response = await AddOrUpdateAcumuladorConcepto(test);
    if (response.code === 0) {
      /* await loadData(); */
      await AlertSuccess(`${response.message}`);
      desplegar(test);
      return levelEducateChildTEST.current.handleClose();
    } else {
      await AlertError(`${response.message}`);
    }

  };

  const OpenRegister = () => {
    setValida(true);
    setFields(defaultfields);
    levelEducateChild.current.handleOpen();
  };

  const OpenRegisterSon = () => {
    /* console.log(test.coD_ACUPLANILLA) */
    //levelEducateChild.current.handleOpen();
    const defaultestLimpio = {
      coD_ACUCONCEPTO: 0,
      coD_ACUPLANILLA: test.coD_ACUPLANILLA,
      coD_CONCEPTO: null,
      inD_ESTADO: null,
    };
    setTest(defaultestLimpio);
    levelEducateChildTEST.current.handleOpen();
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
      </GridToolbarContainer>
    );
  }
  function CustomToolbarSon() {
    return (
      <GridToolbarContainer>
        <Button size="small" variant="text" onClick={OpenRegisterSon}>
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
      <Grid container spacing={1}>
        <Grid item md={12} xs={12} sm={12}>
          <Stack direction="row" spacing={1} xs={{ mb: 1, display: "flex" }}>
            <div>
              <h1>Acumuladores de Planilla</h1>
            </div>
          </Stack>
        </Grid>
      </Grid>
      <br />
      <Grid container spacing={1}>
        <Grid item md={5} sm={12} xs={12}>
          <h3>Lista de Acumuladores</h3>
          <DataGridDemo
            id={(row) => row.coD_ACUPLANILLA}
            rows={data}
            columns={columns}
            height={"60vh"}
            toolbar={CustomToolbar}
          />
        </Grid>
        <Grid item md={1} sm={12} xs={12}></Grid>
      </Grid>
      <br />
      <br />
      <h3>Conceptos del Acumulador</h3>
      <Grid container spacing={1}>
        <Grid item md={8} sm={12} xs={12}>
          <DataGridDemo
            id={(row) => row.coD_ACUCONCEPTO}
            rows={data2}
            columns={columns2}
            toolbar={CustomToolbarSon}
            height={"60vh"}
          />
        </Grid>
      </Grid>
      <MUIModal ref={levelEducateChild}>
        <Grid container spacing={1.5}>
          <Grid item md={4} sm={12} xs={12} hidden={valida}>
            <TextField
              name="coD_ACUMULADOR"
              fullWidth
              InputLabelProps={{
                shrink: true,
              }}
              inputProps={{
                disabled: true,
              }}
              size="small"
              onChange={handleInputChange}
              label="Código"
              value={fields.coD_ACUMULADOR}
            />
          </Grid>
          <Grid item md={4} sm={12} xs={12}>
            <TextField
              name="noM_ACUMULADOR"
              size="small"
              onChange={handleInputChange}
              InputLabelProps={{
                shrink: true,
              }}
              error={inputError.noM_ACUMULADOR}
              type="text"
              fullWidth
              label="Nombre"
              value={fields.noM_ACUMULADOR}
            />
          </Grid>
          <Grid item md={4} sm={12} xs={12}>
            <TextField
              name="moN_ACUMULADOR"
              size="small"
              onChange={handleInputChange}
              InputLabelProps={{
                shrink: true,
              }}
              error={inputError.moN_ACUMULADOR}
              fullWidth
              label="Monto"
              value={fields.moN_ACUMULADOR}
            />
          </Grid>
          <Grid item md={12} />
          <Grid item md={4} sm={12} xs={12}>
            <TextField
              name="inD_ACUMAFP"
              size="small"
              onChange={handleInputChange}
              InputLabelProps={{
                shrink: true,
              }}
              error={inputError.inD_ACUMAFP}
              fullWidth
              select
              label="Acumulador para calculo de A.F.P"
              value={fields.inD_ACUMAFP}
            >
              <MenuItem value="S">SI</MenuItem>
              <MenuItem value="N">NO</MenuItem>
            </TextField>
          </Grid>
          <Grid item md={4} sm={12} xs={12}>
            <TextField
              name="inD_DSCTOESSALUD"
              size="small"
              onChange={handleInputChange}
              InputLabelProps={{
                shrink: true,
              }}
              error={inputError.inD_DSCTOESSALUD}
              fullWidth
              select
              label="Acumulador para descuento de calculo de A.F.P"
              value={fields.inD_DSCTOESSALUD}

            >
              <MenuItem value="S">SI</MenuItem>
              <MenuItem value="N">NO</MenuItem>
            </TextField>
          </Grid>
          <Grid item md={4} sm={12} xs={12}>
            <TextField
              name="inD_DSCTOAFP"
              size="small"
              InputLabelProps={{
                shrink: true,
              }}
              fullWidth
              select
              onChange={handleInputChange}
              label="Acumulador para descuento a ESSALUD"
              error={inputError.inD_DSCTOAFP}
              value={fields.inD_DSCTOAFP}

            >
              <MenuItem value="S">SI</MenuItem>
              <MenuItem value="N">NO</MenuItem>
            </TextField>
          </Grid>
          <Grid item md={12} />
          <Grid item md={4} sm={12} xs={12}>
            {/* inD_ESTADO */}
            <TextField
              name="inD_ESTADO"
              size="small"
              onChange={handleInputChange}
              InputLabelProps={{
                shrink: true,
              }}
              error={inputError.inD_ESTADO}
              fullWidth
              select
              label="ESTADO"
              value={fields.inD_ESTADO}

            >
              <MenuItem value="A">ACTIVO</MenuItem>
              <MenuItem value="I">INACTIVO</MenuItem>
            </TextField>
          </Grid>
          <Grid item md={4} sm={12} xs={12}>
            <TextField
              name="inD_TIPOACUMULADOR"
              size="small"
              onChange={handleInputChange}
              InputLabelProps={{
                shrink: true,
              }}
              error={inputError.inD_TIPOACUMULADOR}
              fullWidth
              select
              label="Tipo Acumulador"
              value={fields.inD_TIPOACUMULADOR}

            >
              <MenuItem value="2">GRUPO</MenuItem>
            </TextField>
          </Grid>

          <Grid item md={12} />
          <Grid item md={12}>
            <Button variant="contained" onClick={savePadre}>
              Guardar
            </Button>
          </Grid>
        </Grid>
      </MUIModal>
      <MUIModal ref={levelEducateChildTEST}>
        <Grid container spacing={1.5}>
          <Grid item md={8} sm={12} xs={12}>
            <Autocomplete
              id="coD_CONCEPTO"
              getOptionLabel={(responseConcept) => `${responseConcept.noM_CONCEPTO}`}
              options={responseConcept}
              disableClearable
              onChange={(event, value) => setTest({ ...test, ['coD_CONCEPTO']: value['coD_CONCEPTO'] })}
              isOptionEqualToValue={(option, value) => option.noM_CONCEPTO === value.noM_CONCEPTO}
              noOptionsText={"No encontrado"}
              value={responseConcept.find((option) => option.coD_CONCEPTO === test.coD_CONCEPTO)}
              renderOption={(props, responseConcept) => (
                <Box component='li' {...props} key={responseConcept.coD_CONCEPTO}>
                  {responseConcept.noM_CONCEPTO}
                </Box>
              )}
              renderInput={(params) => <TextField {...params} size="small" label="Conceptos" />}
            />
          </Grid>
          <Grid item md={4} sm={12} xs={12}>
            <TextField
              name="inD_ESTADO"
              size="small"
              onChange={handleInputChangeTest}
              InputLabelProps={{
                shrink: true,
              }}
              fullWidth
              select
              label="ESTADO"
              value={test.inD_ESTADO}
            >
              <MenuItem value="A">ACTIVO</MenuItem>
              <MenuItem value="I">INACTIVO</MenuItem>
            </TextField>
          </Grid>
          <Grid item md={12} />
          <Grid item md={12} />
          <Grid item md={12}>
            <Button variant="contained" onClick={saveHijos}>
              Guardar
            </Button>
          </Grid>
        </Grid>
      </MUIModal>
    </>
  );
};

export default WorkerAndConcept;
