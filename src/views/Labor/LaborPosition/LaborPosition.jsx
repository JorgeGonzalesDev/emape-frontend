import {
  getOcupacionLaboral,
  deleteOcupacion,
  AddOrUpdateOcupacion,
} from "../../../service/labor/laborposition";
import ResponsiveAppBar from "../../../layouts/Header";
import MUIModal from "../../../components/Modal";
import DataGridDemo from "../../../components/Table";
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
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
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import IconToolTip from "../../../components/Icons/IconToolTip";

const LaborPosition = () => {
  const fieldsDefault = {
    coD_OCUPLABORAL: 0,
    noM_OCUPLABORAL: "",
  };

  const [fields, setFields] = useState({});
  const [data, setData] = useState([]);
  const levelPosition = useRef();
  const [detail, setDetail] = useState({});

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFields({ ...fields, [name]: value });
  };

  const loadData = async () => {
    const response = await getOcupacionLaboral();
    setData(response.listado);
  };

  /* const rows = [{
        'coD_OCUPLABORAL':1,
        'noM_OCUPLABORAL':'Hola',
        'abreviadO_GRADO':'abreviado',
    }
    ] */

  const destroy = async (event, cellValues) => {
    if (
      window.confirm(
        `Desea eliminar el registro con el id: ${cellValues.row?.coD_OCUPLABORAL}?`
      )
    ) {
      const dataDelete = {
        coD_OCUPLABORAL: cellValues.row?.coD_OCUPLABORAL,
      };

      await deleteOcupacion(dataDelete);
      await loadData();
    }
  };

  const edit = async (event, row) => {
    setFields(row);
    levelPosition.current.handleOpen();
  };
  useEffect(() => {
    loadData();
  }, []);
  /*  */
  const OpenRegister = () => {
    setFields(fieldsDefault);
    levelPosition.current.handleOpen();
  };
  /*  */

  const columns = [
    {
      field: "coD_OCUPLABORAL",
      headerName: "Código",
      width: 200,
    },
    {
      field: "noM_OCUPLABORAL",
      headerName: "Cargo Laboral",
      width: 500,
    },
    {
      field: "Acciones",
      type: "actions",
      getActions: (cellValues) => [
      <IconToolTip text="Edit" icon={<EditIcon />} onClick={(event) => {
        edit(event, cellValues.row);
      }} />,
        <GridActionsCellItem
          icon={<DeleteIcon />}
          label="Delete"
          onClick={(event) => {
            destroy(event, cellValues);
          }}
        />,
      ],
    },
  ];

  const saveLevelPosition = async () => {
    await AddOrUpdateOcupacion(fields);
    loadData();
    levelPosition.current.handleClose();
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
      </GridToolbarContainer>
    );
  }
  return (
    <>
      <ResponsiveAppBar>
        <div style={{ padding: "50px", display: "flex", height: "100%" }}>
          <div style={{ flexGrow: 1 }}>
            <DataGridDemo
              id={(row) => row?.coD_OCUPLABORAL}
              rows={data}
              columns={columns}
              toolbar={CustomToolbar}
            />
          </div>
        </div>
        <MUIModal ref={levelPosition}>
          <Grid container spacing={2} justifyContent="center">
            <Grid item md={12} xs={12}>
              <h1>{fields.coD_OCUPLABORAL ? "Actualizar" : "Registrar"}</h1>
            </Grid>
            <Grid item md={12} xs={6}>
              <TextField
                name="noM_OCUPLABORAL"
                onChange={handleInputChange}
                value={fields.noM_OCUPLABORAL}
                fullWidth
                label="Ocupación Laboral"
              />
            </Grid>
            <Grid item md={12} xs={12} />
            <Grid item md={12} xs={6}>
              <Button variant="contained" onClick={saveLevelPosition}>
                Enviar
              </Button>
            </Grid>
          </Grid>
        </MUIModal>
      </ResponsiveAppBar>
    </>
  );
};

export default LaborPosition;
