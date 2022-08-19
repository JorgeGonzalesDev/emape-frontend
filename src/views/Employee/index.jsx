import ResponsiveAppBar from "../../layouts/Header";
import DataGridDemo from "../../components/Table";
import { deletePerson, listPerson } from "../../service/person";
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
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import moment from "moment";

const Employee = () => {

    const [data, setData] = useState([]);

    const loadData = async () => {
        //const response = await listPerson();
        //setData(response.listado);
    };

    useEffect(() => {
        loadData();
    }, []);

    const destroy = async (event, id) => {

        if (window.confirm(`Desea eliminar el registro con el id: ${id}?`)) {

            const dataDelete = {
                "coD_PERS": id
            }

            await deletePerson(dataDelete);
            await loadData();
        }

    };

    const columns = [
        {
            field: 'coD_TRABAJADOR',
            headerName: 'Código',
            width: 100,
        },
        {
            field: 'full_name',
            headerName: 'Apellidos y Nombres',
            width: 400,
            
            valueGetter: (params) =>
                `${params.row.deS_APELLP || ''} ${params.row.deS_APELLM || ''} ${params.row.noM_PERS || ''}`,
        },
        {
            field: 'nuM_DOC',
            headerName: 'Documento',
            width: 100,
        },
        {
            field: 'feC_NACIM',
            headerName: 'Nacimiento',
            width: 200,
            
            valueGetter: (params) =>
                `${moment.utc(params.row.feC_NACIM).format("DD/MM/yyyy")}`,
        },
        {
            field: 'inD_SEXO',
            headerName: 'Sexo',
            width: 150,
            
            valueGetter: (params) =>
                `${params.row.inD_SEXO === 'M' ? "Masculino" : "Femenino"}`,
        },
        {
            field: 'inD_ESTADO',
            headerName: 'Estado',
            width: 150,
            
            valueGetter: (params) =>
                `${params.row.inD_ESTADO === 'A' ? "Activo" : "Inactivo"}`,
        },
        {
            field: 'Acciones',
            type: 'actions',
            getActions: (cellValues) => [
                <Link to={`/maestro/persona/registrar/${cellValues.row.coD_PERS}`} style={{ textDecoration: "none" }}>
                    <GridActionsCellItem
                        icon={<EditIcon />}
                        label="Edit"
                    />
                </Link>,
                <GridActionsCellItem
                    icon={<DeleteIcon />}
                    label="Delete"
                    onClick={(event) => {
                        destroy(event, cellValues.row.coD_PERS);
                    }}
                />,

            ],
        }
    ];

    function CustomToolbar() {
        return (
            <GridToolbarContainer>
                {/* <Link to="/maestro/persona/registrar" style={{ textDecoration: 'none' }}>
                    <Button size="small" variant="text">
                        <PersonAddIcon />
                        <span>&nbsp;&nbsp;&nbsp;Agregar</span>
                    </Button>
                </Link> */}
                <GridToolbarColumnsButton />
                <GridToolbarFilterButton />
                <GridToolbarDensitySelector />
                <GridToolbarExport />
            </GridToolbarContainer>
        );
    }

    return (
        <>
            <ResponsiveAppBar />
            <div style={{ padding: '50px', display: 'flex', height: '100%' }}>
                <div style={{ flexGrow: 1 }}>
                    <DataGridDemo id={(row) => row.coD_PERS}
                        rows={data} columns={columns} toolbar={CustomToolbar} />
                </div>
            </div>
        </>
    )
}

export default Employee;