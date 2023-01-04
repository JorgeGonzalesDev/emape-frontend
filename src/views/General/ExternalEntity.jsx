import {
  listExternalEntity, getExternalEntity, deleteExternalEntity, AddOrUpdateExternalEntity, getExternalEntityByRuc,
} from "../../service/externalentity";
import MUIModal from "../../components/Modal";
import DataGridDemo from "../../components/Table";
import { useState, useEffect, useRef } from "react";
import SchoolIcon from "@mui/icons-material/School";
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
import { AlertDelete, AlertWarning } from "../../components/Alerts";
import { AlertSuccess, AlertError } from "../../components/Alerts";
import IconToolTip from "../../components/Icons/IconToolTip";
var XLSX = require("xlsx");
const ExternalEntity = ({ id }) => {
  const defaultfields = {
    coD_ENTIDAD: 0,
    inD_TIPOENTIDAD: null,
    noM_ENTIDAD: null,
    deS_DIRECCION: null,
    nuM_RUC: null,
    nuM_TLF: null
  }
  const [fields, setFields] = useState({
    coD_ENTIDAD: 0,
    inD_TIPOENTIDAD: null,
    noM_ENTIDAD: null,
    deS_DIRECCION: null,
    nuM_RUC: null,
    nuM_TLF: null
  });

  const [data, setData] = useState([]);
  const levelEducateChild = useRef();

  const [inputErrors, setInputErrors] = useState({
    noM_ENTIDAD: true,
    nuM_RUC: true
  })

  const defaultErrors = {
    noM_PUESTO: false,
    nuM_RUC: false
  }

  const validateFields = () => {

    const copyFields = { ...fields };

    delete copyFields.coD_ENTIDAD;
    delete copyFields.inD_TIPOENTIDAD;
    delete copyFields.deS_DIRECCION;
    delete copyFields.nuM_TLF;

    let errors = {};

    Object.keys(copyFields).forEach(key => {
      if (copyFields[key] === null || copyFields[key] === '' || copyFields[key] === 0 || !copyFields[key]) {

        console.log(
          `El campo ${key} => ${copyFields[key]} no puede estar vacío`
        );

        errors[`${key}`] = true;
      }
    });

    if (Object.keys(errors).length > 0) {

      setInputErrors(errors);
      AlertWarning("Hay campos obligatorios vacios");
      return false;
    }

    setInputErrors(errors);
    return true;

  }

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFields({ ...fields, [name]: value });
  };

  const loadData = async () => {
    const response = await listExternalEntity();
    setData(response.listado);
  };
  /*  */
  const destroy = async (event, id) => {
    const resultado = await AlertDelete();
    if (resultado) {
      const dataDelete = {
        'coD_ENTIDAD': id
      };
      await deleteExternalEntity(dataDelete);
      await loadData();
    }
  };
  /*  */
  const edit = async (event, row) => {
    setFields(row);
    setInputErrors(defaultErrors);

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
          destroy(event, cellValues.row?.coD_ENTIDAD);
        }} />,
        /*  */
      ],
    },
    {
      field: "coD_ENTIDAD",
      headerName: "Cod. Entidad",
      width: 100,
    },
    {
      field: "inD_TIPOENTIDAD",
      headerName: "Tipo Entidad",
      width: 100,
      valueGetter: (params) =>
        {
          if(params.row?.inD_TIPOENTIDAD === "1"){
            return `Pública`
          }
          if(params.row?.inD_TIPOENTIDAD === "2"){
            return `Privado`
          }
        },
    },
    {
      field: "noM_ENTIDAD",
      headerName: "Entidad",
      width: 180,
    },
    {
      field: "deS_DIRECCION",
      headerName: "Dirección",
      width: 250,
    },
    {
      field: "nuM_RUC",
      headerName: "Ruc",
      width: 150,
    },
    {
      field: "nuM_TLF",
      headerName: "Telefono",
      width: 150,
    },
  ];

  const OpenRegister = () => {
    setFields(defaultfields);
    levelEducateChild.current.handleOpen();
  };

  const saveExternalEntity = async () => {
    if (fields.coD_ENTIDAD != 0) {
      if (validateFields()) {
        const response = await AddOrUpdateExternalEntity(fields)
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
      } else {
        return
      }
    } else {
      const validate = await getExternalEntityByRuc(fields.nuM_RUC);
      if (validate['code'] === 0) {
        await AlertError("Ya existe una entidad con el mismo ruc")
      } else {
        if (validateFields()) {
          const response = await AddOrUpdateExternalEntity(fields)
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
        } else {
          return
        }
      }
    }
  };

  const downloadExcel = (dataExport) => {
    var Headers = [["INFORMACIÓN DE ENTIDAD EXTERNA"]];
    let nData = [];
    dataExport.forEach((item) => {
      nData.push({
        "Código Entidad": item?.coD_ENTIDAD,
        "Tipo Entidad": item?.inD_TIPOENTIDAD,
        Entidad: item?.noM_ENTIDAD,
        "Dirección": item?.deS_DIRECCION,
        Ruc: item?.nuM_RUC,
        Telefono: item?.nuM_TLF,


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
    XLSX.utils.book_append_sheet(workBook, workSheet, "Entidad Externa");
    XLSX.write(workBook, { bookType: "xlsx", type: "buffer" });
    XLSX.write(workBook, { bookType: "xlsx", type: "binary" });
    XLSX.writeFile(workBook, "ReporteEntidadExterna.xlsx");
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



  function CustomToolbar() {
    return (
      <GridToolbarContainer>
        <Button size="small" variant="text" onClick={OpenRegister}>
          <SchoolIcon />
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
              "coD_ENTIDAD",
              "inD_TIPOENTIDAD",
              "noM_ENTIDAD",
              "deS_DIRECCION",
              "nuM_RUC",
              "nuM_TLF",
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
          direction="row?"
          spacing={1} xs={{ mb: 1, display: 'flex' }}
        >
          <div>
            <h1>Entidad Externa</h1>
          </div>
        </Stack>
        <DataGridDemo
          id={(row) => row?.coD_ENTIDAD}
          rows={data}
          columns={columns}
          toolbar={CustomToolbar}
        />
      </div>
      <MUIModal ref={levelEducateChild}>
        <Grid container spacing={1.5} >
          <Grid item md={12} xs={12}>
            <h1>{fields.coD_ENTIDAD ? "Actualizar" : "Registrar"} </h1>
          </Grid>
          <Grid item md={4} sm={12} xs={12}>
            <TextField
              name="inD_TIPOENTIDAD"
              fullWidth
              InputLabelProps={{
                shrink: true
              }}
              inputProps={{ maxlength: '1' }}
              size="small"
              select
              label="Tipo Entidad"
              onChange={handleInputChange}
              value={fields.inD_TIPOENTIDAD}
            >
              <MenuItem value="0" disabled>
                Sin especificar
              </MenuItem>
              <MenuItem value="1" >
                Pública
              </MenuItem>
              <MenuItem value="2" >
                Privada
              </MenuItem>
            </TextField>
          </Grid>
          <Grid item md={4} sm={12} xs={12}>
            <TextField
              name="noM_ENTIDAD"
              fullWidth
              InputLabelProps={{
                shrink: true
              }}
              error={inputErrors.noM_ENTIDAD}
              inputProps={{ maxlength: '150' }}
              size="small"
              label="Entidad"
              onChange={handleInputChange}
              value={fields.noM_ENTIDAD}
            />
          </Grid>
          <Grid item md={4} sm={12} xs={12}>
            <TextField
              name="deS_DIRECCION"
              fullWidth
              InputLabelProps={{
                shrink: true
              }}
              inputProps={{ maxlength: '100' }}
              size="small"
              label="Dirección"
              onChange={handleInputChange}
              value={fields.deS_DIRECCION}
            />
          </Grid>
          <Grid item md={4} sm={12} xs={12}>
            <TextField
              name="nuM_RUC"
              fullWidth
              InputLabelProps={{
                shrink: true
              }}
              error={inputErrors.nuM_RUC}
              inputProps={{ maxlength: '11' }}
              size="small"
              label="Ruc"
              onChange={handleInputChange}
              value={fields.nuM_RUC}
            />
          </Grid>
          <Grid item md={4} sm={12} xs={12}>
            <TextField
              name="nuM_TLF"
              fullWidth
              InputLabelProps={{
                shrink: true
              }}
              inputProps={{ maxlength: '50' }}
              size="small"
              label="Telefono"
              onChange={handleInputChange}
              value={fields.nuM_TLF}
            />
          </Grid>
          <Grid item md={12} />
          <Grid item md={12}>
            <Button onClick={saveExternalEntity} variant="contained" >
              Guardar
            </Button>
          </Grid>
        </Grid>
      </MUIModal>
    </>
  );
};

export default ExternalEntity;
