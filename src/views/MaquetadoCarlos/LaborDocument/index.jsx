import ResponsiveAppBar from "../../../layouts/Header";
import DataGridDemo from "../../../components/Table";
import { deleteTrabajadorDocumento, listTrabajadorDocumento } from "../../../service/employee/labordocument";
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

const LaborDocument = () => {


    const [data, setData] = useState([]);
    
    const loadData = async () => {
        const response = await listTrabajadorDocumento();
        setData(response.listado);
    };

    const destroy = async (event, id) => {
        const resultado = await AlertDelete();

        if (resultado){
            const dataDelete = {
                'coD_TRADOC': id
            };
            await deleteTrabajadorDocumento(dataDelete);
            await loadData();
        }
    };

    
    useEffect(() => {
        
        loadData();
    }, []);

    const columns = [
        {
            field: 'coD_TRADOC',
            headerName: 'Cod. Trabajador Doc.',
            width: 200
        },
        {
            field: 'coD_TRABAJADOR',
            headerName: 'Cod. Trabajador',
            width: 200
        },
        {
            field: 'inD_DOCTRAB',
            headerName: 'Ind. Doc. Trabajador',
            width: 200
        },
        {
            field: 'coD_DOC',
            headerName: 'Cod. Documento',
            width: 150
        },
        {
            field: 'coD_PERS',
            headerName: 'Cod. Persona',
            width: 150
        },
        {
            field: 'coD_TIPPARIENTE',
            headerName: 'Cod. Tipo Pariente',
            width: 150
        },
        {
            field: 'obS_DOCUMENTO',
            headerName: 'Obs. Documento',
            width: 200
        },
        {
            field: 'dDocumento',
            headerName: 'D Documento',
            width: 200
        },
        {
            field: 'Acciones',
            type: 'actions',
            getActions: (cellValues) => [
                <Link to={`/MaquetadoCarlos/Documentos/Registrar/${cellValues.row.coD_TRADOC}`} style={{ textDecoration: "none" }}>
                    <GridActionsCellItem
                        icon={<EditIcon />}
                        label="Edit"
                    />
                </Link>,
                <GridActionsCellItem
                    icon={<DeleteIcon />}
                    label="Delete"
                    onClick={(event) => {
                        destroy(event, cellValues.row.coD_TRADOC);
                    }}
                />,

            ],
        }
    ];

    function CustomToolbar() {
        return (
            <GridToolbarContainer>
                <Link to="/MaquetadoCarlos/Documentos/Registrar" style={{ textDecoration: 'none' }}>
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
                    <DataGridDemo id={(row) => row.coD_TRADOC}
                        rows={data} columns={columns} toolbar={CustomToolbar} />
                </div>
            </div>
        </>
    )

}

export default LaborDocument;