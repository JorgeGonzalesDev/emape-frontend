import ResponsiveAppBar from "../../../layouts/Header";
import DataGridDemo from "../../../components/Table";
import { deleteTrabajadorExperiencia, getTrabajadorExperiencia, listTrabajadorExperiencia} from "../../../service/employee/laborexperience";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { GridActionsCellItem } from "@mui/x-data-grid";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Button } from "@mui/material";
import {
    GridToolbarContainer,
    GridToolbarColumnsButton,
    GridToolbarFilterButton,
    GridToolbarExport,
    GridToolbarDensitySelector,
} from '@mui/x-data-grid';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import moment from "moment";
import { AlertDelete } from "../../../components/Alerts";

const LaborExperiencia = () => {


    const [data, setData] = useState([]);
    
    const loadData = async () => {
        const response = await listTrabajadorExperiencia();
        setData(response.listado);
    };

    const destroy = async (event, id) => {
        const resultado = await AlertDelete();

        if (resultado){
            const dataDelete = {
                'coD_TRAEXP': id
            };
            await deleteTrabajadorExperiencia(dataDelete);
            await loadData();
        }
    };

    
    useEffect(() => {
        
        loadData();
    }, []);

    const columns = [
        {
            field: 'coD_TRAEXP',
            headerName: 'Cod. Tra. Experiencia',
            width: 200
        },
        {
            field: 'coD_TRABAJADOR',
            headerName: 'Cod. Trabajador',
            width: 200
        },
        {
            field: 'noM_INSTITUCION',
            headerName: 'Nombre Institución',
            width: 200
        },
        {
            field: 'coD_ENTIDAD',
            headerName: 'Cod. Entidad',
            width: 500
        },
        {
            field: 'inD_INSTITUCION',
            headerName: 'Ind. Institución',
            width: 400
        },
        {
            field: 'reF_DOCCAR',
            headerName: 'Ref. Doc. Cargo',
            width: 500
        },
        {
            field: 'coD_CONDICION',
            headerName: 'Cod. Condición',
            width: 400
        },
        {
            field: 'coD_UORG',
            headerName: 'Cod. UORG',
            width: 400
        },
        /*  */
        {
            field: 'coD_CAR',
            headerName: 'Cod. Cargo',
            width: 400
        },
        {
            field: 'deS_FUNCION',
            headerName: 'D. Función',
            width: 400
        },
        {
            field: 'coD_USUMOD',
            headerName: 'Cod. Usu Modificado',
            width: 400
        },
        {
            field: 'coD_USUREG',
            headerName: 'Cod. Usu. Registrado',
            width: 400
        },
        {
            field: 'dCargo',
            headerName: 'D Cargo',
            width: 400
        },
        {
            field: 'dEntidadExterna',
            headerName: 'D. Entidad Externa',
            width: 400
        },
        {
            field: 'Acciones',
            type: 'actions',
            getActions: (cellValues) => [
                <Link to={`/MaquetadoMiguel/LaborExperience/Registrar/${cellValues.row.coD_TRAEXP}`} style={{ textDecoration: "none" }}>
                    <GridActionsCellItem
                        icon={<EditIcon />}
                        label="Edit"
                    />
                </Link>,
                <GridActionsCellItem
                    icon={<DeleteIcon />}
                    label="Delete"
                    onClick={(event) => {
                        destroy(event, cellValues.row.coD_TRAEXP);
                    }}
                />,

            ],
        }
    ];

    function CustomToolbar() {
        return (
            <GridToolbarContainer>
                <Link to="/MaquetadoMiguel/LaborExperience/Registrar" style={{ textDecoration: 'none' }}>
                    <Button size="small" variant="text">
                        <AddCircleIcon />
                        <span>&nbsp;&nbsp;&nbsp;Agregar</span>
                    </Button>
                </Link>
                <GridToolbarColumnsButton />
                <GridToolbarFilterButton />
                <GridToolbarDensitySelector />
                <GridToolbarExport />
            </GridToolbarContainer>
        );
    }

    return (
        <>
            <div style={{ padding: '50px', display: 'flex', height: '100%' }}>
                <div style={{ flexGrow: 1 }}>
                    <DataGridDemo id={(row) => row.coD_TRAEXP}
                        rows={data} columns={columns} toolbar={CustomToolbar} />
                </div>
            </div>
        </>
    )

}

export default LaborExperiencia;