import ResponsiveAppBar from "../../layouts/Header";
import DataGridDemo from "../../components/Table";
import { useState, useEffect } from "react";
import { GridActionsCellItem } from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import PersonOffIcon from '@mui/icons-material/PersonOff';
import { Grid, Button } from "@mui/material";
import { useNavigate } from 'react-router-dom';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

import {
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarDensitySelector,
} from "@mui/x-data-grid";
import EngineeringIcon from '@mui/icons-material/Engineering';
import moment from "moment";
import { listWorkers, deleteWorker } from "../../service/worker";
import { AlertDelete } from "../../components/Alerts";
import { Link } from "react-router-dom";
import RegisterSteps from "../../components/Employee/RegisterSteps";


const Employee = () => {
  const [data, setData] = useState([]);
  const [forms, setForms] = useState(false);
  const [codeW, setCodeW] = useState(0);
  const [dataWorker, setDataWorker] = useState([]);


  const handleForm = async () => {
    setForms(true);
  }

  const loadData = async () => {
    const response = await listWorkers();
    setData(response.listado);
  };

  let navigate = useNavigate();

  const navigateBack = () => {
    navigate(-1)
  }

  useEffect(() => {
    loadData();
  }, []);

  const destroy = async (event, id) => {
    const resultado = await AlertDelete();
    if (resultado) {
      const dataDelete = {
        coD_TRABAJADOR: id,
      };
      await deleteWorker(dataDelete);
      await loadData();
    }
  };

  const handleCodeWorker = async (data) => {
    setDataWorker(data)
    setCodeW(data.coD_TRABAJADOR);
    setForms(true);
  }

  const reverseForm = async () => {
    setForms(false);
  }


  const columns = [
    {
      field: "Acciones",
      type: "actions",
      getActions: (cellValues) => [

        <GridActionsCellItem onClick={() => { handleCodeWorker(cellValues.row) }} icon={<EditIcon />} label="Edit" />,
        <GridActionsCellItem
          icon={<PersonOffIcon />}
          label="Delete"
          onClick={(event) => {
            destroy(event, cellValues.row.coD_TRABAJADOR);
          }}
        />,
      ],
    },
    {
      field: "coD_TRABAJADOR",
      headerName: "Código",
      width: 100,
    },
    {
      field: "full_name",
      headerName: "Apellidos y Nombres",
      width: 400,

      valueGetter: (params) =>
        `${params.row.dPersona?.deS_APELLP || ""} ${params.row.dPersona?.deS_APELLM || ""} ${params.row.dPersona?.noM_PERS || ""
        }`,
    },
    {
      field: "nuM_DOC",
      headerName: "Documento",
      width: 100,
      valueGetter: (params) => `${params.row.dPersona?.nuM_DOC}`
    },
    {
      field: "inD_ESTADO",
      headerName: "Estado",
      width: 150,
      valueGetter: (params) =>
        `${params.row.dPersona?.inD_ESTADO === "A" ? "Activo" : "Inactivo"}`,
    },
    // {
    //   field: "T_Reg",
    //   headerName: "T_Reg",
    //   width: 150,
    //   valueGetter: (params) =>
    //     ``,
    // },
    {
      field: "feC_NACIM",
      headerName: "Nacimiento",
      width: 160,
      valueGetter: (params) =>
        `${moment(params.row.dPersona?.feC_NACIM).format("DD-MM-YYYY")}`,
    },
    {
      field: "inD_SEXO",
      headerName: "Sexo",
      width: 150,
      valueGetter: (params) =>
        `${params.row.dPersona?.inD_SEXO === "M" ? "Masculino" : "Femenino"}`,
    },
    {
      field: "deS_UORG",
      headerName: "Área",
      width: 550,
      valueGetter: (params) =>
        `${params.row.dUnidadOrganizacional?.deS_UORG}`,
    },
    {
      field: "deS_CAR",
      headerName: "Cargo",
      width: 550,
      valueGetter: (params) =>
        `${params.row.dCargo?.deS_CAR}`,
    },
  ];

  function CustomToolbar() {
    return (
      <GridToolbarContainer>
        <Link to="/trabajador/listar/personas" style={{ textDecoration: 'none' }}>
          <Button size="small" variant="text">
            <EngineeringIcon />
            <span>&nbsp;&nbsp;&nbsp;Agregar</span>
          </Button>
        </Link>
        <GridToolbarColumnsButton />
        <GridToolbarFilterButton />
        <GridToolbarDensitySelector />
        {/* <GridToolbarExport /> */}
      </GridToolbarContainer>
    );
  }

  const Forms = () => {
    if (!forms) {
      return (
        <>
          <div style={{ flexGrow: 1, marginTop: 15 }}>
            <DataGridDemo
              id={(row) => row.coD_TRABAJADOR}
              rows={data}
              columns={columns}
              toolbar={CustomToolbar}
            />
          </div>
        </>
      )
    } else if (forms) {

      return (
        <>
          <Grid item md={12} xs={12}>
            <Button variant="outlined" onClick={() => {
              reverseForm();
            }}>
              < ArrowForwardIosIcon /> Regresar
            </Button>
          </Grid>
          <RegisterSteps codePerson={0} fullName={`${dataWorker.dPersona.deS_APELLP} ${dataWorker.dPersona.deS_APELLM} ${dataWorker.dPersona.noM_PERS}`} codeW={codeW} />
        </>
      )

    }
  }

  return (
    <>
      <ResponsiveAppBar>
        <div
          style={{
            padding: "10px 30px 0px 30px",
            height: "100%",
          }}
        >
          {Forms()}
        </div>
      </ResponsiveAppBar>
    </>
  )

};

export default Employee;
