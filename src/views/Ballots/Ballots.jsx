import {
  listTipoPapeleta, getTipoPapeleta, deleteTipoPapeleta, AddOrUpdateTipoPapeleta,
} from "../../service/ballots";
import MUIModal from "../../components/Modal";
import DataGridDemo from "../../components/Table";
import { useState, useEffect, useRef } from "react";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Button, Grid, TextField, Stack, MenuItem } from "@mui/material";
import {
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarExport,
  gridFilteredSortedRowIdsSelector,
  gridVisibleColumnFieldsSelector,
  useGridApiContext,
  GridToolbarExportContainer,
  GridPrintExportMenuItem,
  GridToolbarDensitySelector,
} from "@mui/x-data-grid";
import { AlertDelete } from "../../components/Alerts";
import { AlertSuccess, AlertError } from "../../components/Alerts";
import IconToolTip from "../../components/Icons/IconToolTip";
import { AlertWarning } from "../../components/Alerts";
var XLSX = require("xlsx");
const Ballots = ({ id }) => {
  const defaultfields = {
    coD_PAPELETA: 0,
    noM_PAPELETA: null,
    inD_ASISTENCIA: null,
    suN_CODTIPSUS: null,
    suN_DESTIPSUS: null

  }
  const defaultErrors = {
    noM_PAPELETA: true,
    inD_ASISTENCIA: true,
  };

  const [fields, setFields] = useState({
    coD_PAPELETA: 0,
    noM_PAPELETA: null,
    inD_ASISTENCIA: null,
    suN_CODTIPSUS: null,
    suN_DESTIPSUS: null
  });

  const [data, setData] = useState([]);
  const levelEducateChild = useRef();
  const [detail, setDetail] = useState({});
  const [inputError, setInputError] = useState(defaultErrors);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFields({ ...fields, [name]: value });
  };

  const loadData = async () => {
    setInputError({
      noM_PAPELETA: false,
      inD_ASISTENCIA: false,
    });

    const response = await listTipoPapeleta();
    setData(response.listado);
  };
  /*  */
  const validateFields = () => {

    const copyFields = { ...fields };
    delete copyFields.coD_PAPELETA;
    delete copyFields.suN_CODTIPSUS;
    delete copyFields.suN_DESTIPSUS;

    let errors = {};

    Object.keys(copyFields).forEach(key => {
      if (copyFields[key] === '' || copyFields[key] === 0 || !copyFields[key]) {
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
  /*  */
  const destroy = async (event, id) => {
    const resultado = await AlertDelete();
    if (resultado) {
      const dataDelete = {
        'coD_PAPELETA': id
      };
      await deleteTipoPapeleta(dataDelete);
      await loadData();
    }
  };
  /*  */
  const edit = async (event, row) => {
    setFields(row);
    levelEducateChild.current.handleOpen();
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
        <IconToolTip text="Edit" icon={<EditIcon />} action={(event) => {
          edit(event, cellValues.row);
        }} />,
        /*  */
        /*  */
        <IconToolTip text="Delete" icon={<DeleteIcon />} action={(event) => {
          destroy(event, cellValues.row.coD_PAPELETA);
        }} />,
        /*  */
      ],
    },
    {
      field: "coD_PAPELETA",
      headerName: "Código",
      width: 150,
    },
    {
      field: "noM_PAPELETA",
      headerName: "Nombre",
      width: 300,
    },
    {
      field: "inD_ASISTENCIA",
      headerName: "Asistencia",
      width: 300,
      valueGetter: (params) =>
        {
          if(params.row.inD_ASISTENCIA === "D") return "Dias"
          if(params.row.inD_ASISTENCIA === "H") return "Horas"
          if(params.row.inD_ASISTENCIA === "N") return "Ninguna"
        },
    },
    {
      field: "suN_CODTIPSUS",
      headerName: "Cod Suspensión",
      width: 150,
    },
    {
      field: "suN_DESTIPSUS",
      headerName: "Descripción Suspensión",
      width: 180,
    },
  ];
  const downloadExcel = (dataExport) => {
    var Headers = [["INFORMACIÓN DE TIPO PAPELETA"]];
    let nData = [];
    dataExport.forEach((item) => {
      nData.push({
        "Código": item?.coD_PAPELETA,
        Nombre: item?.noM_PAPELETA,
        Asistencia: item?.inD_ASISTENCIA,
        "Cod Suspensión" : item?.suN_CODTIPSUS,
        "Descripción Suspensión": item?.suN_DESTIPSUS,


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
    XLSX.utils.book_append_sheet(workBook, workSheet, "Tipo Papeleta");
    XLSX.write(workBook, { bookType: "xlsx", type: "buffer" });
    XLSX.write(workBook, { bookType: "xlsx", type: "binary" });
    XLSX.writeFile(workBook, "ReporteTipoPapeleta.xlsx");
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

  const OpenRegister = () => {
    setFields(defaultfields);
    levelEducateChild.current.handleOpen();
  };

  const saveTipoPapeleta = async () => {
    const validate = validateFields();
    if (!validate) return;
    const response = await AddOrUpdateTipoPapeleta(fields)
    if (response.code === 0) {
      levelEducateChild.current.handleOpen();
      await loadData();
      levelEducateChild.current.handleClose();
      await AlertSuccess(`${response.message}`)
      setFields(defaultfields)
    } else {
      levelEducateChild.current.handleClose();
      return await AlertError(`${response.message}`)
    }
    /* loadData();
    levelEducateChild.current.handleClose();
    setFields(fieldsDefault); */
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
        <GridToolbarExport
          printOptions={{
            hideFooter: true,
            hideToolbar: true,
            fields: [
              "coD_PAPELETA",
              "noM_PAPELETA",
              "inD_ASISTENCIA",
              "suN_CODTIPSUS",
              "suN_DESTIPSUS",
            ],
          }}
        />
      </GridToolbarContainer>
    );
  }

  const GridToolbarExport = ({ csvOptions, printOptions, ...other }) => (
    <GridToolbarExportContainer {...other}>
      <ExcelExportMenuItem />
    </GridToolbarExportContainer>
  );

  return (
    <>
      <div style={{ flexGrow: 1 }}>
        <Stack
          direction="row"
          spacing={1} xs={{ mb: 1, display: 'flex' }}
        >
          <div>
            <h1>Tipo Papeleta</h1>
          </div>
        </Stack>
        <DataGridDemo
          id={(row) => row.coD_PAPELETA}
          rows={data}
          columns={columns}
          toolbar={CustomToolbar}
        />
      </div>
      <MUIModal ref={levelEducateChild}>
        <Grid container spacing={1.5}>
          <Grid item md={12} xs={12}>
            <h1>{fields.coD_PAPELETA ? "Actualizar" : "Registrar"} </h1>
          </Grid>
          <Grid item md={4} sm={12} xs={12}>
            <TextField
              name="noM_PAPELETA"
              fullWidth
              InputLabelProps={{
                shrink: true
              }}
              inputProps={{ maxlength: '100' }}
              size="small"
              label="Nombre"
              error={inputError.noM_PAPELETA}
              onChange={handleInputChange}
              value={fields.noM_PAPELETA}
            />
          </Grid>
          <Grid item md={3} sm={12} xs={12}>
            <TextField
              fullWidth
              InputLabelProps={{
                shrink: true
              }}
              label="Asistencia"
              name="inD_ASISTENCIA"
              error={inputError.inD_ASISTENCIA}
              size="small"
              select
              onChange={handleInputChange}
              value={fields.inD_ASISTENCIA}
            >
              <MenuItem value="0" disabled>
                Sin especificar
              </MenuItem>
              <MenuItem value="D" >
                Dias
              </MenuItem>
              <MenuItem value="H" >
                Horas
              </MenuItem>
              <MenuItem value="N" >
                Ninguna
              </MenuItem>
            </TextField>
          </Grid>
          <Grid item md={12} />
          <Grid item md={4} sm={12} xs={12}>
            <TextField
              name="suN_CODTIPSUS"
              fullWidth
              InputLabelProps={{
                shrink: true
              }}
              inputProps={{ maxlength: '2' }}
              size="small"
              label="Cod Suspensión"
              onChange={handleInputChange}
              value={fields.suN_CODTIPSUS}
            />
          </Grid>
          <Grid item md={12} />
          <Grid item md={4} sm={12} xs={12}>
            <TextField
              name="suN_DESTIPSUS"
              fullWidth
              InputLabelProps={{
                shrink: true
              }}
              inputProps={{ maxlength: '250' }}
              size="small"
              label="Descripción Suspensión"
              onChange={handleInputChange}
              value={fields.suN_DESTIPSUS}
            />
          </Grid>
          <Grid item md={12} />
          <Grid item md={12}>
            <Button onClick={saveTipoPapeleta} variant="contained" >
              Guardar
            </Button>
          </Grid>
        </Grid>
      </MUIModal>
    </>
  );
};

export default Ballots;