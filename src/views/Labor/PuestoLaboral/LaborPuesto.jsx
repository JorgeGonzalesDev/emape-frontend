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

const LaborPuesto = () => {
  const fieldsDefault = {
    coD_PUESTO: 0,
    noM_PUESTO: "",
  };

  const [fields, setFields] = useState({});
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

  /* const rows = [{
        'coD_GRDINSTRUC':1,
        'deS_GRDINSTRUC':'Hola',
        'abreviadO_GRADO':'abreviado',
    }
    ] */

  const destroy = async (event, cellValues) => {
    if (
      window.confirm(
        `Desea eliminar el registro con el id: ${cellValues.row.coD_PUESTO}?`
      )
    ) {
      const dataDelete = {
        coD_PUESTO: cellValues.row.coD_PUESTO,
      };

      await deletePuesto(dataDelete);
      await loadData();
    }
  };

  const edit = async (event, row) => {
    setFields(row);
    levelLaborPuesto.current.handleOpen();
  };

  useEffect(() => {
    loadData();
  }, []);
  /*  */

  const OpenRegister = () => {
    setFields(fieldsDefault);
    levelLaborPuesto.current.handleOpen();
  };
  /*  */

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
            destroy(event, cellValues);
          }}
        />,
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
    await AddOrUpdatePuesto(fields);
    loadData();
    levelLaborPuesto.current.handleClose();
    setFields(fieldsDefault);
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
