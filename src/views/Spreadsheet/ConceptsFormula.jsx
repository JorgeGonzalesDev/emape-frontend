import {
  getFormulaPlanilla,
  AddOrUpdateFormulaPlanilla,
  deleteFormulaPlanilla,
  getByPlanAndConc,
} from "../../service/spreadsheet/payrollworkerandconcepts";
import {
  getAcumuladorConceptoByConceptoId,
  getAcumuladorConceptoByAcuPlanillaId,
} from "../../service/payrollaccumulatorandconcepts";
import {
  getPlanillaTrabajadorByTipoPlan,
  getPlanillaTrabajadorByIndCalculo,
  getPlanillaTrabajadorByFormulaTipoPlan,
} from "../../service/spreadsheet/conceptspreadsheet";
import {getPlanillaConceptoCalculo, UpdateFormulaInd, getAcumuladorPlanilla} from '../../service/spreadsheet/conceptsformula'
import MUIModal from "../../components/Modal";
import DataGridDemo from "../../components/Table";
import { useState, useEffect, useRef } from "react";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import moment from "moment/moment";
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
import { AlertSuccess, AlertError, AlertWarning } from "../../components/Alerts";
import IconToolTip from "../../components/Icons/IconToolTip";
import {
  getTypePlan,
  getSubTypePlan,
  getConcept,
  getTypePlanById,
} from "../../service/common";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

// ICONS ARROWS
import ArrowIconRight from '@mui/icons-material/KeyboardDoubleArrowRight';
import ArrowIconLeft from '@mui/icons-material/KeyboardDoubleArrowLeft';

var XLSX = require("xlsx");

const ConceptsFormula = ({ id }) => {
  const defaultfields = {
    coD_FORPLAN: 0,
    coD_PRIMARY: null,
    coD_TIPOPLAN: null,
    coD_CONCEPTO: null,
    deS_FORMULA: null,
  };
  const defaultformula={
    coD_FORPLAN: 0,
    coD_TIPOPLAN: 0,
    coD_CONCEPTO: 0,
    deS_FORMULA: '',
  }
  const [fields, setFields] = useState(defaultfields);
  const [formulafields, setFormulaFields] = useState(defaultformula);
  const [fieldsTest, setFieldsTest] = useState({
    nameW: "",
    nameC: "",
  });
  const [data, setData] = useState([]);
  const [data0, setData0] = useState([]);
  const levelEducateChild = useRef();
  const [responseTypePlan, setResponseTypePlan] = useState([]);
  const [responseConcept, setResponseConcept] = useState([]);
  const [responseSubTypePlan, setResponseSubTypePlan] = useState([]);
  const [primary, setPrimary] = useState(null);
  const [data2, setData2] = useState([]);
  const [data3, setData3] = useState([]);

  const getSub = async (ind) => {
    const response = await getSubTypePlan(ind);
    setResponseSubTypePlan(response.listado);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFields({ ...fields, [name]: value });

    if (name === "coD_PRIMARY") {
      setFields({
        ...fields,
        [name]: value,
      });
      return getSub(value);
    }
  };

  const handleInputChangeFormula = (event) => {
    const { name, value } = event.target;
    setFormulaFields({ ...formulafields, [name]: value });

  };

  const loadData = async () => {
    const response2 = await getTypePlan(1);
    const acumuladores = await getAcumuladorPlanilla();
    setData2(acumuladores.listado)
    setResponseTypePlan(response2.listado);
  };
  
  const destroy = async (event, id) => {
    const resultado = await AlertDelete();
    if (resultado) {
      const dataDelete = {
        coD_FORPLAN: id,
      };
      await deleteFormulaPlanilla(dataDelete);
      await loadData();
    }
  };
  
  const buscarconcepto = async () => {
    /* planillaconcepto {COD_TIPOPLAN} */
    const response = await getPlanillaTrabajadorByTipoPlan(fields.coD_TIPOPLAN);
    // const response = await getPlanillaTrabajadorByFormulaTipoPlan(fields.coD_TIPOPLAN, 2);
    const response2 = await getPlanillaTrabajadorByFormulaTipoPlan(fields.coD_TIPOPLAN, 2);

    setData(response.listado);
    setData3(response2.listado);
  };

  const buscarcalculo = async (event, row, alert = 0) => {
    const datosFormula = {
      coD_CONCEPTO: row?.coD_CONCEPTO
    }

    if (alert == 1) {
      const resultado = await AlertDelete();
      if (resultado) {
        await UpdateFormulaInd(datosFormula);
      }
    }else{
      await UpdateFormulaInd(datosFormula);
    }
    buscarconcepto();

  };
  
  const edit = async (event, row) => {

    fields.coD_ACUCONCEPTO = row?.coD_CONCEPTO;
    const response = await getAcumuladorConceptoByConceptoId(
      fields.coD_ACUCONCEPTO
    );
    setData3(response.listado);
    console.log(response);
  };

  // const editConcept = async (event, row) => {
  //   fields.coD_ACUPLANILLA = row?.coD_ACUPLANILLA
  //   const response = await getAcumuladorConceptoByAcuPlanillaId(
  //     fields.coD_ACUPLANILLA
  //   );
  //   setData2(response.listado);
  //   console.log(response);
  // };

    /* getByPlanAndConc */
    const FormulaDes = async (event, row) => {

      const response = await getByPlanAndConc(fields.coD_TIPOPLAN, row?.coD_CONCEPTO);

      console.log(response)


      const selectFormula={
        coD_FORPLAN: 0,
        coD_TIPOPLAN: fields.coD_TIPOPLAN,
        coD_CONCEPTO: row?.coD_CONCEPTO,
        deS_FORMULA: '',
      }

      
      if (response.code === 0){
        setFormulaFields(response.listado[0]);
      }else{
        setFormulaFields(selectFormula);
      }
  
      console.log(formulafields);
    };
  

  useEffect(() => {
    loadData();
  }, []);


  const saveFormulaPlanilla = async () => {
    console.log(formulafields);
    const response = await AddOrUpdateFormulaPlanilla(formulafields);
    if (response.code === 0) {
      await AlertSuccess(`${response.message}`);
      setFormulaFields(defaultformula);
    } else {
      return await AlertError(`${response.message}`);
    }
  };

  const columns = [
    {
      field: "coD_FORPLAN",
      headerName: "Código",
      hide: true,
    },
    {
      field: "coD_CONCEPTO",
      headerName: "Concepto",
      width: 300,
      valueGetter: (params) => `${params.row?.dConceptoPlanilla?.noM_CONCEPTO}`,
    },
    // {
    //   field: "Acciones",
    //   type: "actions",
    //   width: 250,      
    //   getActions: (cellValues) => [
    //     <IconToolTip
    //       text="Edit"
    //       icon={<ArrowIconRight />}
    //       action={(event) => {
    //         buscarcalculo(event, cellValues.row);
    //       }}
    //     />,
    //   ],
    // }
  ];

  const formula = [
    {
      field: "coD_ACUPLANILLA",
      headerName: "Código",
      width: 100,
      hide:true,
    },
    {
      field: "coD_ACUMULADOR",
      headerName: "Código",
      width: 100,
    },
    {
      field: "noM_ACUMULADOR",
      headerName: "Acumulador",
      width: 250,
    },
    {
      field: "inD_TIPOACUMULADOR",
      headerName: "Tipo",
      width: 250,
      valueGetter: (params) => {
        if (params.row?.inD_TIPOACUMULADOR === "1") return "Fijo"
        if (params.row?.inD_TIPOACUMULADOR === "2") return "Grupo"
    },
    },
  ];

  const buscarcalculo2 = [
    {
      field: "Acciones",
      type: "actions",
      getActions: (cellValues) => [
        /*  */
        <IconToolTip
          text="Agregar"
          icon={<AddCircleOutlineIcon />}
          action={(event) => {
            FormulaDes(event, cellValues.row);
          }}
        />,
      ],
    },
    {
      field: "coD_FORPLAN",
      headerName: "Código",
      hide: true,
    },
    {
      field: "coD_CONCEPTO",
      headerName: "Concepto",
      width: 300,
      valueGetter: (params) => `${params.row?.dConceptoPlanilla?.noM_CONCEPTO}`,
    }
  ]
 
  // const columns3 = [
  //   {
  //     field: "Acciones",
  //     type: "actions",
  //     getActions: (cellValues) => [
  //       /*  */
  //       <IconToolTip
  //         text="Agregar"
  //         icon={<AddCircleOutlineIcon />}
  //         action={(event) => {
  //           editConcept(event, cellValues.row);
  //         }}
  //       />,
  //     ],
  //   },
  //   {
  //     field: "coD_CONCEPTO",
  //     headerName: "Código",
  //     width: 150,
  //     hide: true,
  //   },
  //   {
  //     field: "coD_ACUPLANILLA",
  //     headerName: "Código",
  //     width: 100,
  //     valueGetter: (params) =>
  //       `${params.row?.dAcumuladorPlanilla?.coD_ACUMULADOR}`,
  //   },
  //   {
  //     field: "coD_ACUCONCEPTO",
  //     headerName: "Acumulador",
  //     width: 250,
  //     valueGetter: (params) =>
  //       `${params.row?.dAcumuladorPlanilla?.noM_ACUMULADOR}`,
  //   },
  // ];

  /* buscarcalculo */
  // const buscarcalculo2 = [
  //   {
  //     field: "Acciones",
  //     type: "actions",
  //     getActions: (cellValues) => [
  //       /*  */
  //       <IconToolTip
  //         text="Agregar"
  //         icon={<AddCircleOutlineIcon />}
  //         action={(event) => {
  //           FormulaDes(event, cellValues.row);
  //         }}
  //       />,
  //     ],
  //   },
  //   {
  //     field: "coD_PLACON",
  //     headerName: "Código",
  //     width: 150,
  //     hide: true,
  //   },
  //   {
  //     field: "coD_TIPOPLAN",
  //     headerName: "Códigotipoplan",
  //     width: 100,
  //     valueGetter: (params) =>
  //       `${params.row?.dConceptoPlanilla?.coD_CONCEPTO}`,
  //   },
  //   {
  //     field: "coD_CONCEPTO",
  //     headerName: "calculo",
  //     width: 250,
  //     valueGetter: (params) =>
  //       `${params.row?.dConceptoPlanilla?.inD_CALCULO}`,
  //   },
  // ];
  
  const downloadExcel = (dataExport) => {
    var Headers = [["INFORMACIÓN DE FORMULA PLANILLA"]];
    let nData = [];
    dataExport.forEach((item) => {
      nData.push({
        Código: item?.coD_FORPLAN,
        Planilla: item?.coD_TIPOPLAN_P,
        "Subtipo de planilla": item?.coD_TIPOPLAN,
        Concepto: item?.coD_CONCEPTO,
        Formula: item?.deS_FORMULA,
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
    XLSX.utils.book_append_sheet(workBook, workSheet, "Formula Planilla");
    XLSX.write(workBook, { bookType: "xlsx", type: "buffer" });
    XLSX.write(workBook, { bookType: "xlsx", type: "binary" });
    XLSX.writeFile(workBook, "ReporteFormulaPlanilla.xlsx");
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
        <Stack direction="row" spacing={1} xs={{ mb: 1, display: "flex" }}>
          <div>
            <h1>Formula Planilla</h1>
          </div>
          <Grid item md={12} sm={12} xs={12} />
        </Stack>
        <Stack>
          <Grid container spacing={2} justifyContent="center">
            <Grid item md={12} xs={12}>
              <h3 style={{ color: "black" }}>Filtro</h3>
            </Grid>
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
                  responseTypePlan.map((data) => (
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
                  responseSubTypePlan.map((data) => (
                    <MenuItem value={data.coD_TIPOPLAN}>
                      {data.noM_TIPOPLAN}
                    </MenuItem>
                  ))}
              </TextField>
            </Grid>
            <Grid item md={4} sm={12} xs={12}>
              <Button size="large" variant="outlined" onClick={buscarconcepto}>
                <span>Buscar</span>
              </Button>
            </Grid>
            <Grid item md={7} sm={12} xs={12} />
          </Grid>
        </Stack>
        <Grid container spacing={1}>
          <Grid item md={5} sm={12} xs={12}  >
            <h3>Lista de Conceptos de Subplanilla</h3>
            <DataGridDemo
              id={(row) => row.coD_CONCEPTO}
              rows={data}
              columns={columns}
              height={"60vh"}
            />
          </Grid>
          <Grid item md={1} sm={12} xs={12}></Grid>
          <Grid item md={5} sm={12} xs={12}>
            <h3>Lista de Conceptos que requieren Formula</h3>
            <DataGridDemo
              id={(row) => row.coD_PLACON}/* coD_ACUCONCEPTO */
              rows={data3}
              columns={buscarcalculo2}
              height={"60vh"}
            />
            {/* <DataGridDemo
              id={(row) => row.coD_ACUCONCEPTO}
              rows={data2}
              columns={formula}
              height={"60vh"}
            /> */}
          </Grid>
        </Grid>

        <Grid container spacing={1}>
          <Grid item md={5} sm={12} xs={12}>
            <h3>Lista de Acumuladores</h3>
            <DataGridDemo
              id={(row) => row.coD_ACUPLANILLA}
              rows={data2}
              columns={formula}
              height={"60vh"}
            />
          </Grid>
          <Grid item md={1} sm={12} xs={12}></Grid>
          <Grid item md={5} sm={12} xs={12}>
            <h3>Registro de Formula</h3>
                <TextField
                  name="deS_FORMULA"
                  fullWidth
                  InputLabelProps={{
                    shrink: true,
                  }}
                  onChange={handleInputChangeFormula}
                  label="Formula"
                  value={formulafields.deS_FORMULA}
                  sx={{marginBottom: 2}}
                />
                <Button onClick={saveFormulaPlanilla} variant="contained">
                  Guardar
                </Button>
            </Grid>
          <Grid item md={5} sm={12} xs={12}></Grid>
        </Grid>
      </div>
      <MUIModal ref={levelEducateChild}>
        <Grid container spacing={1.5}>
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
              value={primary}
              select
            >
              {responseTypePlan &&
                responseTypePlan.map((data) => (
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
                responseSubTypePlan.map((data) => (
                  <MenuItem value={data.coD_TIPOPLAN}>
                    {data.noM_TIPOPLAN}
                  </MenuItem>
                ))}
            </TextField>
          </Grid>
          <Grid item md={4} sm={12} xs={12}>
            <TextField
              name="coD_CONCEPTO"
              fullWidth
              InputLabelProps={{
                shrink: true,
              }}
              size="small"
              select
              label="Concepto"
              onChange={handleInputChange}
              value={fields.coD_CONCEPTO}
            >
              {responseConcept &&
                responseConcept.map((data) => (
                  <MenuItem value={data.coD_CONCEPTO}>
                    {data.noM_CONCEPTO}
                  </MenuItem>
                ))}
            </TextField>
          </Grid>
          <Grid item md={4} sm={12} xs={12}>
            <TextField
              name="deS_FORMULA"
              fullWidth
              InputLabelProps={{
                shrink: true,
              }}
              inputProps={{ maxlength: "100" }}
              size="small"
              label="Formula"
              onChange={handleInputChange}
              value={fields.deS_FORMULA}
            />
          </Grid>
          <Grid item md={12} />
          <Grid item md={12}>
            <Button onClick={saveFormulaPlanilla} variant="contained">
              Guardar
            </Button>
          </Grid>
        </Grid>
      </MUIModal>
    </>
  );
};

export default ConceptsFormula;
