import {
  getPlanillaConcepto,
  AddOrUpdatePlanillaConcepto,
  deletePlanillaConcepto,
  getPlanillaConceptoById,
} from "../../service/spreadsheet/conceptspreadsheet";
import MUIModal from "../../components/Modal";
import DataGridDemo from "../../components/Table";
import { useState, useEffect, useRef } from "react";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Button, Grid, TextField, Stack, MenuItem, Select, Autocomplete, Box } from "@mui/material";
import {
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarExportContainer,
  GridToolbarDensitySelector,
  gridFilteredSortedRowIdsSelector,
  gridVisibleColumnFieldsSelector,
  useGridApiContext,
} from "@mui/x-data-grid";
import { AlertDelete } from "../../components/Alerts";
import { AlertSuccess, AlertError } from "../../components/Alerts";
import IconToolTip from "../../components/Icons/IconToolTip";
import { getTypePlan, getSubTypePlan, getConcept, getTypePlanById } from "../../service/common";
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';

var XLSX = require("xlsx");

const ConceptSpreadsheet = ({ id }) => {
  const defaultfields = {
    coD_PLACON: 0,
    coD_PRIMARY: null,
    coD_TIPOPLAN: null,
    coD_CONCEPTO: null,
  };
  const [fields, setFields] = useState(defaultfields);

  const [data, setData] = useState([]);
  const levelEducateChild = useRef();
  const [responseTypePlan, setResponseTypePlan] = useState([]);
  const [responseSubTypePlan, setResponseSubTypePlan] = useState([]);
  const [responseConcept, setResponseConcept] = useState([]);

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

  const loadData = async () => {
    const response = await getPlanillaConcepto();
    setData(response.listado);
    const response2 = await getTypePlan(1);
    setResponseTypePlan(response2.listado);
    const response3 = await getConcept();
    setResponseConcept(response3.listado);
  };

  const getSub = async (ind) => {
    const response = await getSubTypePlan(ind);
    setResponseSubTypePlan(response.listado);
  }

  /*  */
  const destroy = async (event, id) => {
    const resultado = await AlertDelete();
    if (resultado) {
      const dataDelete = {
        coD_PLACON: id,
      };
      await deletePlanillaConcepto(dataDelete);
      await loadData();
    }
  };

  const edit = async (event, row) => {
    const response = await getTypePlanById(row.coD_TIPOPLAN);
    getSub(response.listado[0]['coD_PADRE'])
    setFields({
      coD_PLACON: row.coD_PLACON,
      coD_PRIMARY: response.listado[0]['coD_PADRE'],
      coD_TIPOPLAN: row.coD_TIPOPLAN,
      coD_CONCEPTO: row.coD_CONCEPTO,
    });
    levelEducateChild.current.handleOpen();
  };

  useEffect(() => {
    loadData();
  }, []);

  const OpenRegister = () => {
    setFields(defaultfields);
    levelEducateChild.current.handleOpen();
  };

  const savePlanillaConcepto = async () => {
    if (fields.coD_CONCEPTO != 0) {
      const response = await AddOrUpdatePlanillaConcepto(fields);
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
      const validate = await getPlanillaConceptoById(fields.coD_CONCEPTO, fields.coD_TIPOPLAN);
      if (validate['code'] === 0) {
        await AlertError("Ya existe un concepto con la misma subplanilla")
      } else {
        const response = await AddOrUpdatePlanillaConcepto(fields);
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
    /* loadData();
    levelEducateChild.current.handleClose();
    setFields(fieldsDefault); */
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
            destroy(event, cellValues.row.coD_PLACON);
          }}
        />,
        /*  */
      ],
    },
    {
      field: "coD_PLACON",
      headerName: "Código",
      width: 100,
    },
    {
      field: "coD_CONCEPTO",
      headerName: "Concepto",
      width: 300,
      valueGetter: (params) =>
        `${params.row?.dConceptoPlanilla?.noM_CONCEPTO}`,
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
    var Headers = [["INFORMACIÓN DE PLANILLA CONCEPTO"]];
    let nData = [];
    dataExport.forEach((item) => {
      nData.push({
        Código: item?.coD_PLACON,
        Concepto: item?.coD_CONCEPTO,
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
    XLSX.utils.book_append_sheet(workBook, workSheet, "Planilla Concepto");
    XLSX.write(workBook, { bookType: "xlsx", type: "buffer" });
    XLSX.write(workBook, { bookType: "xlsx", type: "binary" });
    XLSX.writeFile(workBook, "ReportePlanillaConcepto.xlsx");
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
              "coD_PLACON",
              "coD_CONCEPTO",
              "coD_TIPOPLAN_P",
              "coD_TIPOPLAN",
            ],
          }}
        />
      </GridToolbarContainer>
    );
  }

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

  return (
    <>
      <div style={{ flexGrow: 1 }}>
        <Stack direction="row" spacing={1} xs={{ mb: 1, display: "flex" }}>
          <div>
            <h1>Planilla Concepto</h1>
          </div>
        </Stack>
        <DataGridDemo
          id={(row) => row.coD_PLACON}
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
          {/* traer select Concepto Planilla */}
          <Grid item md={4} sm={12} xs={12}>
            {/* <FormControl sx={{width: 230}}>
              <InputLabel id="demo-multiple-name-label">Codigo Concepto</InputLabel>
              <Select
                labelId="demo-multiple-name-label"
                id="demo-multiple-name"
                name="coD_CONCEPTO"
                size="small"
                
                onChange={handleInputChange}
                input={<OutlinedInput label="Codigo Concepto" />}
                fullWidth
                Label='text'
                value={fields.coD_CONCEPTO}
                MenuProps={MenuProps}
              >
              {responseConcept &&
                responseConcept.map(data => (
                  <MenuItem value={data.coD_CONCEPTO}>
                    {data.noM_CONCEPTO}
                  </MenuItem>
                ))}
            </Select>
          </FormControl> */}
            <Autocomplete
              id="coD_CONCEPTO"
              getOptionLabel={(responseConcept) => `${responseConcept.noM_CONCEPTO}`}
              options={responseConcept}
              disableClearable
              onChange={(event, value) => setFields({ ...fields, ['coD_CONCEPTO']: value['coD_CONCEPTO'] })}
              isOptionEqualToValue={(option, value) => option.noM_CONCEPTO === value.noM_CONCEPTO}
              noOptionsText={"No encontrado"}
              value={responseConcept.find((option) => option.coD_CONCEPTO === fields.coD_CONCEPTO)}
              renderOption={(props, responseConcept) => (
                <Box component='li' {...props} key={responseConcept.coD_CONCEPTO}>
                  {responseConcept.noM_CONCEPTO}
                </Box>
              )}
              renderInput={(params) => <TextField {...params} size="small" label="Conceptos" />}
            />
          </Grid>
          <Grid item md={12} />
          <Grid item md={12}>
            <Button onClick={savePlanillaConcepto} variant="contained">
              Guardar
            </Button>
          </Grid>
        </Grid>
      </MUIModal>
    </>
  );
};

export default ConceptSpreadsheet;
