import {
  getLevelEducate,
  deleteLevelEducate,
  AddOrUpdateLevelEducate,
} from "../../service/nivelEducate";
import ResponsiveAppBar from "../../layouts/Header";
import MUIModal from "../../components/Modal";
import DataGridDemo from "../../components/Table";
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import SchoolIcon from "@mui/icons-material/School";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Button, Grid, TextField } from "@mui/material";
import {
  GridActionsCellItem,
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarExport,
  GridToolbarDensitySelector,
} from "@mui/x-data-grid";

const LevelEducate = () => {
  const fieldsDefault = {
    coD_GRDINSTRUC: 0,
    deS_GRDINSTRUC: "",
    abreviadO_GRADO: "",
  };

  const [fields, setFields] = useState({});
  const [data, setData] = useState([]);
  const levelEducateChild = useRef();
  const [detail, setDetail] = useState({});

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFields({ ...fields, [name]: value });
  };

  const loadData = async () => {
    const response = await getLevelEducate();
    setData(response.listado);
  };

  const destroy = async (event, id) => {
    if (window.confirm(`Desea eliminar el registro con el id: ${id}?`)) {
      const dataDelete = {
        coD_GRDINSTRUC: id,
      };
      await deleteLevelEducate(dataDelete);
      await loadData();
    }
  };

  const edit = async (event, row) => {
    setFields(row);
    levelEducateChild.current.handleOpen();
  };

  useEffect(() => {
    loadData();
    setFields(fieldsDefault);
  }, []);

  const columns = [
    {
      field: "coD_GRDINSTRUC",
      headerName: "Código",
      width: 200,
    },
    {
      field: "deS_GRDINSTRUC",
      headerName: "Descripción",
      width: 500,
    },
    {
      field: "abreviadO_GRADO",
      headerName: "Abreviado",
      width: 400,
    },
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
            destroy(event, cellValues.row.coD_GRDINSTRUC);
          }}
        />,
      ],
    },
  ];

  const OpenRegister = () => {
    setFields(fieldsDefault);
    levelEducateChild.current.handleOpen();
  };

  const saveLevelEducate = async () => {
    await AddOrUpdateLevelEducate(fields);
    loadData();
    levelEducateChild.current.handleClose();
    setFields(fieldsDefault);
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
        <GridToolbarExport />
      </GridToolbarContainer>
    );
  }

  return (
    <>
      <div style={{ padding: "50px", display: "flex", height: "100%" }}>
        <div style={{ flexGrow: 1 }}>
          <DataGridDemo
            id={(row) => row.coD_GRDINSTRUC}
            rows={data}
            columns={columns}
            toolbar={CustomToolbar}
          />
        </div>
      </div>
      <MUIModal ref={levelEducateChild}>
        <Grid container spacing={2} justifyContent="center">
          <Grid item md={12} xs={12}>
            <h1>{fields.coD_GRDINSTRUC ? "Actualizar" : "Registrar"}</h1>
          </Grid>
          <Grid item md={12} xs={6}>
            <TextField
              name="deS_GRDINSTRUC"
              onChange={handleInputChange}
              value={fields.deS_GRDINSTRUC}
              fullWidth
              label="Nombre"
            />
          </Grid>
          <Grid item md={12} xs={12} />
          <Grid item md={12} xs={6}>
            <TextField
              name="abreviadO_GRADO"
              onChange={handleInputChange}
              value={fields.abreviadO_GRADO}
              fullWidth
              label="Abreviación"
            />
          </Grid>
          <Grid item md={12} xs={12} />
          <Grid item md={12} xs={6}>
            <Button variant="contained" onClick={saveLevelEducate}>
              Enviar
            </Button>
          </Grid>
        </Grid>
      </MUIModal>
    </>
  );
};

export default LevelEducate;
