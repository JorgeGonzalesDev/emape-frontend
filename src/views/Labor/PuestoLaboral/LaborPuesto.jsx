import {
  getPuestoLaboral,
  deletePuesto,
  AddOrUpdatePuesto,
} from "../../../service/labor/laborPuesto";
import MUIModal from "../../../components/Modal";
import DataGridDemo from "../../../components/Table";
import { useState, useEffect, useRef } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Button, Grid, TextField, Stack } from "@mui/material";
import {
  GridActionsCellItem,
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarExport,
  GridToolbarDensitySelector,
} from "@mui/x-data-grid";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { AlertDelete } from "../../../components/Alerts";
import { AlertSuccess, AlertError } from "../../../components/Alerts";
import IconToolTip from "../../../components/Icons/IconToolTip";
  

const LaborPuesto = () => {
  const defaultfields = {
    coD_PUESTO: 0,
    noM_PUESTO: null
  }
  const [fields, setFields] = useState({
    coD_PUESTO: 0,
    noM_PUESTO: null
  });

  const [data, setData] = useState([]);
  const levelLaborPuesto = useRef();
  const [detail, setDetail] = useState({});

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFields({ ...fields, [name]: value });
  };

  const loadData = async () => {
    const response = await getPuestoLaboral();
    setData(response.listado);
  };

  /*  */
  const destroy = async (event, id) => {
    const resultado = await AlertDelete();
    if (resultado) {
      const dataDelete = {
        'coD_PUESTO': id
      };
      await deletePuesto(dataDelete);
      await loadData();
    }
  };
  /*  */

  const edit = async (event, row) => {
    setFields(row);
    levelLaborPuesto.current.handleOpen();
  };

  useEffect(() => {
    loadData();
  }, []);
  /*  */

  const OpenRegister = () => {
    setFields(defaultfields);
    levelLaborPuesto.current.handleOpen();
  };
  /*  */

  const columns = [
    {
      field: "Acciones",
      type: "actions",
      getActions: (cellValues) => [
        <IconToolTip text="Edit" icon={<EditIcon />} action={(event) => {
          edit(event, cellValues.row);
        }} />,
        <IconToolTip text="Delete" icon={<DeleteIcon />} action={(event) => {
          destroy(event, cellValues.row.coD_PUESTO);
        }} />,
      ],
    },
    {
      field: "coD_PUESTO",
      headerName: "Código",
      width: 200,
    },
    {
      field: "noM_PUESTO",
      headerName: "Nombre",
      width: 500,
    },
  ];

  const saveLevelLaborPuesto = async () => {
    const response = await AddOrUpdatePuesto(fields)
    if(response.code === 0){
      levelLaborPuesto.current.handleOpen();
      await loadData();
      levelLaborPuesto.current.handleClose();
      await AlertSuccess(`${response.message}`)
      setFields(defaultfields)
    } else {
      levelLaborPuesto.current.handleClose();
      return await AlertError(`${response.message}`)
    }
  };

  function CustomToolbar() {
    return (
      <GridToolbarContainer>
        <Button size="small" variant="text" onClick={OpenRegister}>
          <PersonAddIcon />
          <span>&nbsp;&nbsp;&nbsp;Agregar</span>
        </Button>
        <GridToolbarColumnsButton />
        <GridToolbarFilterButton />
        <GridToolbarDensitySelector />
        <GridToolbarExport />
      </GridToolbarContainer>
    );
  }
  return (
    <>
      <div style={{ flexGrow: 1 }}>
        <Stack
          direction="row"
          spacing={1} xs={{ mb: 1, display: 'flex' }}
        >
          <div>
            <h1>Puesto Laboral</h1>
          </div>
        </Stack>
        <DataGridDemo
          id={(row) => row.coD_PUESTO}
          rows={data}
          columns={columns}
          toolbar={CustomToolbar}
        />
      </div>
      <MUIModal ref={levelLaborPuesto}>
        <Grid container spacing={2} justifyContent="center">
          <Grid item md={12} xs={12}>
            <h1>{fields.coD_PUESTO ? "Actualizar" : "Registrar"}</h1>
          </Grid>
          <Grid item md={12} xs={6}>
            <TextField
              name="noM_PUESTO"
              onChange={handleInputChange}
              value={fields.noM_PUESTO}
              fullWidth
              label="Nombre"
            />
          </Grid>
          <Grid item md={12} xs={12} />
          <Grid item md={12} xs={6}>
            <Button variant="contained" onClick={saveLevelLaborPuesto}>
              Enviar
            </Button>
          </Grid>
        </Grid>
      </MUIModal>
    </>
  );
};

export default LaborPuesto;
