import {
    listExternalEntity, getExternalEntity, deleteExternalEntity, AddOrUpdateExternalEntity,
  } from "../../service/externalentity";
  import MUIModal from "../../components/Modal";
  import DataGridDemo from "../../components/Table";
  import { useState, useEffect, useRef } from "react";
  import SchoolIcon from "@mui/icons-material/School";
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
  import { AlertDelete } from "../../components/Alerts";
  import { AlertSuccess, AlertError } from "../../components/Alerts";
  import IconToolTip from "../../components/Icons/IconToolTip";
  
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
    const [detail, setDetail] = useState({});
  
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
            destroy(event, cellValues.row.coD_ENTIDAD);
          }} />,
          /*  */
        ],
      },
      {
        field: "coD_ENTIDAD",
        headerName: "Cod. Entidad",
        width: 200,
      },
      {
        field: "inD_TIPOENTIDAD",
        headerName: "Tipo Entidad",
        width: 500,
      },
      {
        field: "noM_ENTIDAD",
        headerName: "Entidad",
        width: 400,
      },
      {
        field: "deS_DIRECCION",
        headerName: "Dirección",
        width: 400,
      },
      {
        field: "nuM_RUC",
        headerName: "Ruc",
        width: 400,
      },
      {
        field: "nuM_TLF",
        headerName: "Telefono",
        width: 400,
      },
    ];
  
    const OpenRegister = () => {
      setFields(defaultfields);
      levelEducateChild.current.handleOpen();
    };
  
    const saveExternalEntity = async () => {
      const response = await AddOrUpdateExternalEntity(fields)
      if (response.code === 0){
        levelEducateChild.current.handleOpen();
        await loadData();
        levelEducateChild.current.handleClose();
        await AlertSuccess(`${response.message}`)
        setFields(defaultfields)
      } else{
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
        <div style={{ flexGrow: 1 }}>
          <Stack
            direction="row"
            spacing={1} xs={{ mb: 1, display: 'flex' }}
          >
            <div>
              <h1>Entidad Externa</h1>
            </div>
          </Stack>
          <DataGridDemo
            id={(row) => row.coD_ENTIDAD}
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
                    <Grid item md={12} />
                    <Grid item md={4} sm={12} xs={12}>
                        <TextField
                            name="inD_TIPOENTIDAD"
                            fullWidth
                            InputLabelProps={{
                                shrink: true
                            }}
                            inputProps={{maxlength:'1'}}
                            size="small"
                            label="Tipo Entidad"
                            onChange={handleInputChange}
                            value={fields.inD_TIPOENTIDAD}
                        />
                    </Grid>
                    <Grid item md={4} sm={12} xs={12}>
                        <TextField
                            name="noM_ENTIDAD"
                            fullWidth
                            InputLabelProps={{
                                shrink: true
                            }}
                            inputProps={{maxlength:'100'}}
                            size="small"
                            label="Entidad"
                            onChange={handleInputChange}
                            value={fields.noM_ENTIDAD}
                        />
                    </Grid>
                    <Grid item md={12} />
                    <Grid item md={4} sm={12} xs={12}>
                        <TextField
                            name="deS_DIRECCION"
                            fullWidth
                            InputLabelProps={{
                                shrink: true
                            }}
                            inputProps={{maxlength:'100'}}
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
                            inputProps={{maxlength:'12'}}
                            size="small"
                            label="Ruc"
                            onChange={handleInputChange}
                            value={fields.nuM_RUC}
                        />
                    </Grid>
                    <Grid item md={12} />
                    <Grid item md={4} sm={12} xs={12}>
                        <TextField
                            name="nuM_TLF"
                            fullWidth
                            InputLabelProps={{
                                shrink: true
                            }}
                            inputProps={{maxlength:'50'}}
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
  