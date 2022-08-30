import {
  getProfessions,
  deleteProfessions,
  AddOrUpdateProfessions,
} from "../../service/profession";
import MUIModal from "../../components/Modal";
import DataGridDemo from "../../components/Table";
import { useState, useEffect, useRef } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Button, Grid, TextField, Stack } from "@mui/material";
import { AlertAddUpdate, AlertDelete } from "../../components/Alerts";

import {
  GridActionsCellItem,
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarExport,
  GridToolbarDensitySelector,
} from "@mui/x-data-grid";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { FOCUSABLE_SELECTOR } from "@testing-library/user-event/dist/utils";

const Profession = () => {
  const fieldsDefault = {
    coD_PROFES: 0,
    deS_PROFES: "",
    abR_PROFES: "",
  };

  const [fields, setFields] = useState({});
  const [data, setData] = useState([]);
  const levelProfessions = useRef();
  const [detail, setDetail] = useState({});

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFields({ ...fields, [name]: value });
  };

  const loadData = async () => {
    const response = await getProfessions();
    setData(response.listado);
  };

  const destroy = async (event, id) => {
    const resultado = await AlertDelete();

    if (resultado) {
      const dataDelete = {
        coD_PROFES: id,
      };
      await deleteProfessions(dataDelete);
      await loadData();
    }
  };

  const edit = async (event, row) => {
    setFields(row);
    levelProfessions.current.handleOpen();
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
        <GridActionsCellItem
          icon={<EditIcon />}
          label="Edit"
          onClick={(event) => {
            edit(event, cellValues.row);
          }}
        />,
        <GridActionsCellItem
          icon={<DeleteIcon />}
          label="Delete"
          onClick={(event) => {
            destroy(event, cellValues.row.coD_PROFES);
          }}
        />,
      ],
    },
    {
      field: "coD_PROFES",
      headerName: "Código",
      width: 200,
    },
    {
      field: "deS_PROFES",
      headerName: "Descripcion",
      width: 500,
    },
    {
      field: "abR_PROFES",
      headerName: "Abreviado",
      width: 400,
    },

  ];

  const OpenRegister = () => {
    setFields(fieldsDefault);
    levelProfessions.current.handleOpen();
  };

  const saveProfessions = async () => {
    await AddOrUpdateProfessions(fields);
    AlertAddUpdate(fields.coD_PROFES);
    loadData();
    levelProfessions.current.handleClose();
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
            <h1>Profesión</h1>
          </div>
        </Stack>
          <DataGridDemo
            id={(row) => row.coD_PROFES}
            rows={data}
            columns={columns}
            toolbar={CustomToolbar}
          />
        </div>
      <MUIModal ref={levelProfessions}>
        <Grid container spacing={2} justifyContent="center">
          <Grid item md={12} xs={12}>
            <h1>{fields.coD_PUESTO ? "Actualizar" : "Registrar"}</h1>
          </Grid>
          <Grid item md={12} xs={6}>
            <TextField
              name="deS_PROFES"
              onChange={handleInputChange}
              value={fields.deS_PROFES}
              fullWidth
              label="Descripción"
            />
          </Grid>
          <Grid item md={12} xs={12} />
          <Grid item md={12} xs={6}>
            <TextField
              name="abR_PROFES"
              onChange={handleInputChange}
              value={fields.abR_PROFES}
              fullWidth
              label="Abreviado"
            />
          </Grid>
          <Grid item md={12} xs={12} />
          <Grid item md={12} xs={6}>
            <Button variant="contained" onClick={saveProfessions}>
              Enviar
            </Button>
          </Grid>
        </Grid>
      </MUIModal>
    </>
  );
};

export default Profession;
