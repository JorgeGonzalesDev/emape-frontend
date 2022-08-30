import DataGridDemo from "../../../components/Table";
import { deleteExternalEntity, listExternalEntity } from "../../../service/externalentity";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { GridActionsCellItem } from "@mui/x-data-grid";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Button, Stack } from "@mui/material";
import {
    GridToolbarColumnsButton,
    GridToolbarFilterButton,
    GridToolbarExport,
    GridToolbarDensitySelector,
} from '@mui/x-data-grid';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { AlertDelete } from "../../../components/Alerts";

const ExternalEntity = () => {


    const [data, setData] = useState([]);

    const loadData = async () => {
        const response = await listExternalEntity();
        setData(response.listado);
    };

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


    useEffect(() => {

        loadData();
    }, []);

    const columns = [
        {
            field: 'Acciones',
            type: 'actions',
            getActions: (cellValues) => [
                <Link to={`/maestro/generales/entidadExterna/Register/${cellValues.row.coD_ENTIDAD}`} style={{ textDecoration: "none" }}>
                    <GridActionsCellItem
                        icon={<EditIcon />}
                        label="Edit"
                    />
                </Link>,
                <GridActionsCellItem
                    icon={<DeleteIcon />}
                    label="Delete"
                    onClick={(event) => {
                        destroy(event, cellValues.row.coD_ENTIDAD);
                    }}
                />,

            ],
        },
        {
            field: 'coD_ENTIDAD',
            headerName: 'Código',
            width: 200
        },
        {
            field: 'inD_TIPOENTIDAD',
            headerName: 'Tipo Entidad',
            width: 500
        },
        {
            field: 'noM_ENTIDAD',
            headerName: 'Entidad',
            width: 400
        },
        {
            field: 'deS_DIRECCION',
            headerName: 'Dirección',
            width: 500
        },
        {
            field: 'nuM_RUC',
            headerName: 'Ruc',
            width: 400
        },
        {
            field: 'nuM_TLF',
            headerName: 'Telefono',
            width: 400
        }
    ];

    function CustomToolbar() {
        return (
            <>
                <Link to="/maestro/generales/entidadExterna/Register" style={{ textDecoration: 'none' }}>
                    <Button size="small" variant="text">
                        <AddCircleIcon />
                        <span>&nbsp;&nbsp;&nbsp;Agregar</span>
                    </Button>
                </Link>
                <GridToolbarColumnsButton />
                <GridToolbarFilterButton />
                <GridToolbarDensitySelector />
                <GridToolbarExport />
            </>
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
                <DataGridDemo id={(row) => row.coD_ENTIDAD}
                    rows={data} columns={columns} toolbar={CustomToolbar} />
            </div>
        </>
    )

}

export default ExternalEntity;