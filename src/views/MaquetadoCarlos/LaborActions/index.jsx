import ResponsiveAppBar from "../../../layouts/Header";
import DataGridDemo from "../../../components/Table";
import { deleteTrabajadorAcciones, listTrabajadorAcciones } from "../../../service/employee/laboraction";
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

const LaborActions = () => {


    const [data, setData] = useState([]);
    
    const loadData = async () => {
        const response = await listTrabajadorAcciones();
        setData(response.listado);
    };

    const destroy = async (event, id) => {
        const resultado = await AlertDelete();

        if (resultado){
            const dataDelete = {
                'coD_TRAACC': id
            };
            await deleteTrabajadorAcciones(dataDelete);
            await loadData();
        }
    };

    
    useEffect(() => {
        
        loadData();
    }, []);

    const columns = [
        {
            field: 'coD_TRAACC',
            headerName: 'Trabajador Accion',
            width: 200
        },
        {
            field: 'coD_TRABAJADOR',
            headerName: 'Trabajador',
            width: 200
        },
        {
            field: 'coD_ACCION',
            headerName: 'Código',
            width: 200
        },
        {
            field: 'feC_ACCION',
            headerName: 'Fecha',
            width: 500
        },
        {
            field: 'nuM_REFDOC',
            headerName: 'N° Documento',
            width: 400
        },
        {
            field: 'noM_INSTITUCION',
            headerName: 'Institución',
            width: 500
        },
        {
            field: 'deS_REFERENCIA',
            headerName: 'Referencia',
            width: 400
        },
        {
            field: 'feC_INICIO',
            headerName: 'Fecha Inicio',
            width: 400
        },
        {
            field: 'feC_TERMINO',
            headerName: 'Fecha Termino',
            width: 400
        },

        {
            field: 'Acciones',
            type: 'actions',
            getActions: (cellValues) => [
                <Link to={`/MaquetadoCarlos/LaborActions/Registrar/${cellValues.row.coD_TRAACC}`} style={{ textDecoration: "none" }}>
                    <GridActionsCellItem
                        icon={<EditIcon />}
                        label="Edit"
                    />
                </Link>,
                <GridActionsCellItem
                    icon={<DeleteIcon />}
                    label="Delete"
                    onClick={(event) => {
                        destroy(event, cellValues.row.coD_TRAACC);
                    }}
                />,

            ],
        }
    ];

    function CustomToolbar() {
        return (
            <GridToolbarContainer>
                <Link to="/MaquetadoCarlos/LaborActions/Registrar" style={{ textDecoration: 'none' }}>
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
                    <DataGridDemo id={(row) => row.coD_TRAACC}
                        rows={data} columns={columns} toolbar={CustomToolbar} />
                </div>
            </div>
        </>
    )

}

export default LaborActions;