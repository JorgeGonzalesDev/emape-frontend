import {
  getCargo,
  deleteCargo,
  AddOrUpdateCargo,
} from "../../service/position";
import MUIModal from "../../components/Modal";
import DataGridDemo from "../../components/Table";
import { useState, useEffect, useRef } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Button, Grid, TextField, Tooltip, IconButton, Stack } from "@mui/material";
import {
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarExport,
  GridToolbarDensitySelector,
} from "@mui/x-data-grid";
import AddCircleIcon from "@mui/icons-material/AddCircle";

const Position = () => {
  const fieldsDefault = {
    coD_CAR: 0,
    deS_CAR: "",
    abR_CAR: "",
  };

  const [fields, setFields] = useState({});
  const [data, setData] = useState([]);
  const levelCargo = useRef();
  const [detail, setDetail] = useState({});

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFields({ ...fields, [name]: value });
  };

  const loadData = async () => {
    const response = await getCargo();
    setData(response.listado);
  };

  const destroy = async (event, id) => {
    if (window.confirm(`Desea eliminar el registro con el id: ${id}?`)) {
      const dataDelete = {
        coD_CAR: id,
      };
      await deleteCargo(dataDelete);
      await loadData();
    }
  };

  const edit = async (event, row) => {
    setFields(row);
    levelCargo.current.handleOpen();
  };

  useEffect(() => {
    loadData();
    setFields(fieldsDefault);
  }, []);

  const columns = [
    {
      field: "Acciones",
      type: "actions",
      getActions: (cellValues) => [
        <Tooltip title="Editar">
          <IconButton onClick={(event) => {
            edit(event, cellValues.row);
          }}>
            <EditIcon />
          </IconButton>
        </Tooltip>,
        <Tooltip title="Desactivar">
          <IconButton onClick={(event) => {
            destroy(event, cellValues.row.coD_CAR);
          }}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>,
      ],
    },
    {
      field: "coD_CAR",
      headerName: "Código",
      width: 200,
    },
    {
      field: "deS_CAR",
      headerName: "Descripcion",
      width: 500,
    },
    {
      field: "abR_CAR",
      headerName: "Abreviado",
      width: 400,
    },
  ];

  const OpenRegister = () => {
    setFields(fieldsDefault);
    levelCargo.current.handleOpen();
  };

  const saveCargo = async () => {
    await AddOrUpdateCargo(fields);
    loadData();
    levelCargo.current.handleClose();
    setFields(fieldsDefault);
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
            <h1>Cargo</h1>
          </div>
        </Stack>
        <DataGridDemo
          id={(row) => row.coD_CAR}
          rows={data}
          columns={columns}
          toolbar={CustomToolbar}
        />
      </div>
      <MUIModal ref={levelCargo}>
        <Grid container spacing={2} justifyContent="center">
          <Grid item md={12} xs={12}>
            <h1>{fields.coD_CAR ? "Actualizar" : "Registrar"}</h1>
          </Grid>
          <Grid item md={12} xs={6}>
            <TextField
              name="deS_CAR"
              onChange={handleInputChange}
              value={fields.deS_CAR}
              fullWidth
              label="Descripción"
            />
          </Grid>
          <Grid item md={12} xs={12} />
          <Grid item md={12} xs={6}>
            <TextField
              name="abR_CAR"
              onChange={handleInputChange}
              value={fields.abR_CAR}
              fullWidth
              label="Abreviado"
            />
          </Grid>
          <Grid item md={12} xs={12} />
          <Grid item md={12} xs={6}>
            <Button variant="contained" onClick={saveCargo}>
              Enviar
            </Button>
          </Grid>
        </Grid>
      </MUIModal>
    </>
  );
};

export default Position;
