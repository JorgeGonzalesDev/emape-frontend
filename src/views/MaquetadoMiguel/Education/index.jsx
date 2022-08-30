import ResponsiveAppBar from "../../../layouts/Header";
import DataGridDemo from "../../../components/Table";
import { deleteTrabajadorEducacion, getTrabajadorEducacion, listTrabajadorEducacion } from "../../../service/employee/education";
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

const Education = () => {


    const [data, setData] = useState([]);
    
    const loadData = async () => {
        const response = await listTrabajadorEducacion();
        setData(response.listado);
    };
    
    const destroy = async (event, id) => {
        const resultado = await AlertDelete();

        if (resultado){
            const dataDelete = {
                'coD_TRAEDU': id
            };
            await deleteTrabajadorEducacion(dataDelete);
            await loadData();
        }
    };


    
    useEffect(() => {
        
        loadData();
    }, []);

    const columns = [
        {
            field: 'coD_TRAEDU',
            headerName: 'Cod. Tra. Educación',
            width: 200
        },
        {
            field: 'coD_TRABAJADOR',
            headerName: 'Cod. Trabajador',
            width: 200
        },
        {
            field: 'feC_INICIO',
            headerName: 'Fecha Inicio',
            width: 200
        },
        {
            field: 'feC_TERMINO',
            headerName: 'Fecha Termino',
            width: 500
        },
        {
            field: 'noM_INSTITUCION',
            headerName: 'Nom. Institución',
            width: 400
        },
        {
            field: 'noM_ESPECIALIDAD',
            headerName: 'Nom. Especialidad',
            width: 500
        },
        {
            field: 'coD_GRDINSTRUC',
            headerName: 'Cod. Grado Instrucción',
            width: 400
        },
        {
            field: 'coD_ESTUDIO',
            headerName: 'Cod. Estudio',
            width: 400
        },
        /*  */
        {
            field: 'coD_ENTIDAD',
            headerName: 'Cod. Entidad',
            width: 400
        },
        {
            field: 'nuM_COLEGIATURA',
            headerName: 'N° Colegiatura',
            width: 400
        },
        {
            field: 'feC_TITULO',
            headerName: 'Fecha Titulo',
            width: 400
        },
        {
            field: 'deS_CONTENIDO',
            headerName: 'Des. Contenido',
            width: 400
        },
        {
            field: 'feC_USUMOD',
            headerName: 'Fecha Usu. Modificado',
            width: 400
        },
        {
            field: 'coD_USUMOD',
            headerName: 'Cod. Usu. Modificado',
            width: 400
        },
        {
            field: 'feC_USUREG',
            headerName: 'Fecha Usu. Registrado',
            width: 400
        },
        {
            field: 'coD_USUREG',
            headerName: 'Cod. Usu. Registrado',
            width: 400
        },
        {
            field: 'Acciones',
            type: 'actions',
            getActions: (cellValues) => [
                <Link to={`/MaquetadoMiguel/Education/Registrar/${cellValues.row.coD_TRAEDU}`} style={{ textDecoration: "none" }}>
                    <GridActionsCellItem
                        icon={<EditIcon />}
                        label="Edit"
                    />
                </Link>,
                <GridActionsCellItem
                    icon={<DeleteIcon />}
                    label="Delete"
                    onClick={(event) => {
                        destroy(event, cellValues.row.coD_TRAEDU);
                    }}
                />,

            ],
        }
    ];

    function CustomToolbar() {
        return (
            <GridToolbarContainer>
                <Link to="/MaquetadoMiguel/Education/Registrar" style={{ textDecoration: 'none' }}>
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
                    <DataGridDemo id={(row) => row.coD_TRAEDU}
                        rows={data} columns={columns} toolbar={CustomToolbar} />
                </div>
            </div>
        </>
    )

}

export default Education;