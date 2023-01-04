import {
  getPlanillaTrabajador,
  AddOrUpdatePlanillaTrabajador,
  deletePlanillaTrabajador,
  AddOrUpdatePlanillaTrabajadorRango,
  AddOrUpdatePlanillaTrabajadorRango2,
  getPlanillaTrabajadorById,
} from "../../service/spreadsheet/payrollandworkers";
import MUIModal from "../../components/Modal";
import DataGridDemo from "../../components/Table";
import { useState, useEffect, useRef } from "react";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Button, Grid, TextField, Stack, MenuItem, Select} from "@mui/material";
import {
  GridActionsCellItem,
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
import { getSubTypePlan, getTrabajador, getTypePlan, getTypePlanById } from "../../service/common";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

var XLSX = require("xlsx");

const PayrollAndWorkers = ({ id }) => {
  const defaultfields = {
    coD_PLATRA: 0,
    coD_PRIMARY: null,
    coD_TIPOPLAN: null,
    coD_TRABAJADOR: null,
  };
  const [fields, setFields] = useState(defaultfields);

  const [data, setData] = useState([]);
  const [data2, setData2] = useState([]);
  const [namePerson, setNamePerson] = useState([]);
  const [responseTypePlan, setResponseTypePlan] = useState([]);
  const [responseSubTypePlan, setResponseSubTypePlan] = useState([]);
  const [mostrarTable, setMostrarTable] = useState(false);
  const [personName, setPersonName] = useState([]);
  const levelEducateChild = useRef();

  const getSub = async (ind) => {
    const response = await getSubTypePlan(ind);
    setResponseSubTypePlan(response.listado);
  }

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFields({ ...fields, [name]: value });

    if (name === "coD_PRIMARY") {
      setFields({
        ...fields,
        [name]: value
      })
      return getSub(value);
    }

  };
  /* const handleInputChangeSelect = (event) => {
    const personName = this.getSelectedRows();
    console.log(personName);
  }; */
  const seleccionado = (rows) => {
    setNamePerson(rows);
    console.log(rows);
  };
  const loadData = async () => {
    const response = await getPlanillaTrabajador();
    setData(response.listado);
    const response2 = await getTypePlan(1);
    setResponseTypePlan(response2.listado);
    const response3 = await getTrabajador();
    setData2(response3.listado);
  };

  /*  */
  const destroy = async (event, id) => {
    const resultado = await AlertDelete();
    if (resultado) {
      const dataDelete = {
        coD_PLATRA: id,
      };
      await deletePlanillaTrabajador(dataDelete);
      await loadData();
    }
  };
  /*  */
  const edit = async (event, row) => {
    setMostrarTable(true);
    const response = await getTypePlanById(row.coD_TIPOPLAN);
    getSub(response.listado[0]['coD_PADRE'])
    setFields({
      coD_PLATRA: row.coD_PLATRA,
      coD_PRIMARY: response.listado[0]['coD_PADRE'],
      coD_TIPOPLAN: row.coD_TIPOPLAN,
      coD_TRABAJADOR: row.coD_TRABAJADOR,
    });
    setNamePerson(`${row?.dTrabajador?.dPersona?.deS_APELLP} ${row?.dTrabajador?.dPersona?.deS_APELLM} ${row?.dTrabajador?.dPersona?.noM_PERS}`);
    levelEducateChild.current.handleOpen();
  };

  useEffect(() => {
    loadData();
  }, []);

  const OpenRegister = () => {
    setMostrarTable(false);
    setNamePerson('')
    setFields(defaultfields);
    levelEducateChild.current.handleOpen();
  };

  const savePlanillaTrabajador = async () => {
    console.log(fields.coD_PLATRA);
    if (fields.coD_PLATRA == 0) {
      const trabajadores = {
        trabajadores : namePerson,
        coD_PLATRA : fields.coD_PLATRA,
        coD_TIPOPLAN : fields.coD_TIPOPLAN
      }
      /* console.log(trabajadores); */
      const response = await AddOrUpdatePlanillaTrabajadorRango2(trabajadores);
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

    } else {
      const validate = await getPlanillaTrabajadorById(fields.coD_TRABAJADOR, fields.coD_TIPOPLAN)
      if (validate['code'] === 0) {
        await AlertError("Ya existe un trabajador con la misma subplanilla")
      } else {
        const response = await AddOrUpdatePlanillaTrabajador(fields);
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

      }
    }
  };

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
            destroy(event, cellValues.row.coD_PLATRA);
          }}
        />,
        /*  */
      ],
    },
    {
      field: "coD_PLATRA",
      headerName: "Código",
      width: 100,
    },
    {
      field: "full_name",
      headerName: "Apellidos y Nombres",
      width: 400,
      valueGetter: (params) =>
        `${params.row?.dTrabajador?.dPersona?.deS_APELLP || ""} ${params.row?.dTrabajador?.dPersona?.deS_APELLM || ""} ${params.row?.dTrabajador?.dPersona?.noM_PERS || ""
        }`,
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

  ];

  const downloadExcel = (dataExport) => {
    var Headers = [["INFORMACIÓN DE PLANILLA Y TRABAJADORES"]];
    let nData = [];
    dataExport.forEach((item) => {
      nData.push({
        Código: item?.coD_PLATRA,
        "Apellidos y nombres": item?.full_name,
        Planilla: item?.coD_TIPOPLAN_P,
        "Subtipo de planilla": item?.coD_TIPOPLAN,
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
    XLSX.utils.book_append_sheet(workBook, workSheet, "Planilla y Trabajadores");
    XLSX.write(workBook, { bookType: "xlsx", type: "buffer" });
    XLSX.write(workBook, { bookType: "xlsx", type: "binary" });
    XLSX.writeFile(workBook, "ReportePlanillaTrabajadores.xlsx");
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
              "coD_PLATRA",
              "full_name",
              "coD_TIPOPLAN_P",
              "coD_TIPOPLAN",
            ],
          }}
        />
      </GridToolbarContainer>
    );
  }

  const columns2 = [
    /* {
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
    }, */
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

  return (
    <>
      <div style={{ flexGrow: 1 }}>
        <Stack direction="row" spacing={1} xs={{ mb: 1, display: "flex" }}>
          <div>
            <h1>Planilla y Trabajadores</h1>
          </div>
        </Stack>
        <DataGridDemo
          id={(row) => row.coD_PLATRA}
          rows={data}
          columns={columns}
          toolbar={CustomToolbar}
        />
      </div>
      <MUIModal ref={levelEducateChild}>
        <Grid container spacing={1.5}>
          {/* traer select Tipo Planilla */}
          <Grid item md={4} sm={12} xs={12}>
            <TextField
              name="coD_PRIMARY"
              fullWidth
              InputLabelProps={{
                shrink: true,
              }}
              size="small"
              label="Tipo Planilla"
              onChange={handleInputChange}
              value={fields.coD_PRIMARY}
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
          {/* traer select Trabajador */}
          <Grid item md={12} />
          <Grid item md={7} sm={12} xs={12} hidden={!mostrarTable}>
            <TextField
              name="namePersona"
              fullWidth
              InputLabelProps={{
                readOnly: true
              }}
              inputProps={{
                disabled: true
              }}
              onChange={handleInputChange}
              label="Nombres y apellidos"
              type="text"
              size="small"
              value={namePerson}
            />
            
            {/* <Select
              fullWidth
              size="small"
              value={personName}
              sx={{overflow:'hidden'}}
              renderValue={() => (
                <Box sx={{ display: 'flex',overflowY: 'hidden',overflowX: 'auto' , gap: 0.5, maxHeight: '60px'}}>
                  {personName.map((value) => (
                    <Chip key={value} label={value} />
                  ))}
                </Box>
              )}
            /> */}
          </Grid>
          <Grid item md={12} />
          <Grid item md={12} hidden={mostrarTable}>
            <DataGridDemo
              height='40vh'
              /* name='personName' */
              id={(row) => row.coD_TRABAJADOR}
              rows={data2}
              columns={columns2}
              numberSize={10}
              checkboxSelection = {true}
              seleccionado = {seleccionado}
              /* value= {personName} */
            />
          </Grid>
          <Grid item md={12} />
          <Grid item md={12}>
            <Button onClick={savePlanillaTrabajador} variant="contained">
              Guardar
            </Button>
          </Grid>
        </Grid>
      </MUIModal>
    </>
  );
};

export default PayrollAndWorkers;