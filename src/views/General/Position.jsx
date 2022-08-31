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
import { Button, Grid, TextField, Stack } from "@mui/material";
import {
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarExport,
  GridToolbarDensitySelector,
} from "@mui/x-data-grid";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { AlertDelete } from "../../components/Alerts";
import { AlertSuccess, AlertError } from "../../components/Alerts";
import IconToolTip from "../../components/Icons/IconToolTip";

const Position = () => {
  const defaultfields = {
    coD_CAR: 0,
    deS_CAR: null,
    abR_CAR: null,
  }
  const [fields, setFields] = useState({
    coD_CAR: 0,
    deS_CAR: null,
    abR_CAR: null,
  });

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
    const resultado = await AlertDelete();
    if (resultado) {
      const dataDelete = {
        'coD_CAR': id
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
  }, []);

  const columns = [
    {
      field: "Acciones",
      type: "actions",
      getActions: (cellValues) => [
        /*  */
        <IconToolTip text="Editar" icon={<EditIcon />} action={(event) => {
          edit(event, cellValues.row);
        }} />,
        /*  */
        /*  */
        <IconToolTip text="Desactivar" icon={<DeleteIcon />} action={(event) => {
          destroy(event, cellValues.row.coD_CAR);
        }} />,
        /*  */
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

  const OpenRegister = async() => {
    setFields(defaultfields);
    levelCargo.current.handleOpen();
  };

  const saveCargo = async () => {
    const response = await AddOrUpdateCargo(fields)
    if (response.code === 0){
      levelCargo.current.handleOpen();
      await loadData();
      levelCargo.current.handleClose();
      await AlertSuccess(`${response.message}`)
      setFields(defaultfields)
    } else{
      levelCargo.current.handleClose();
      return await AlertError(`${response.message}`)
      
    }
    
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
