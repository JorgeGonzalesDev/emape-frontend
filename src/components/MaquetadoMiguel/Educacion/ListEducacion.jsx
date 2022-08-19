import ResponsiveAppBar from "../../../layouts/Header";
import DataGridDemo from "../../../components/Table";
import { Grid, Button } from "@mui/material";
import { useState, useEffect } from "react";



const ListEd = () => {

    // const [data, setData] = useState([]);

    // const loadData = async () => {
    //     const response = await listEPerson();
    //     setData(response.listEado);
    // };

    // useEffect(() => {
    //     loadData();
    // }, []);

    const columns = [
        {
            field: 'study',
            headerName: 'Estudio',
            width: 100,
        },
        {
            field: 'institution',
            headerName: 'Institución',
            width: 100,
        },
        {
            field: 'beginning',
            headerName: 'Inicio',
            width: 400
        },
        {
            field: 'term',
            headerName: 'Termino',
            width: 300
        },
        {
            headerName: 'Opciones',
            renderCell: (params) => (
                <strong>
                    <Button
                        variant="contained"
                        size="small"
                        style={{ marginLeft: 16 }}
                    >
                        Open
                    </Button>
                </strong>
            ),
            editable: false,
            sortable: false
        },
    ];

    const rows = [
        {
            id: 1,
            item: 1,
            study: 'PRIMARIA COMPLETA',
            institution: 'TORIBIO RODRIGUEZ',
            beginning: '00/00/2000',
            term: '00/00/2000',
        },
    ];
    /* recordatorio row.item "si va item y id si no tienes item " */
    return (
        <>
            {<ResponsiveAppBar />}
            <div style={{ padding: '50px', display: 'flex', height: '100%' }}>
                <div style={{ flexGrow: 1 }}>
                    <DataGridDemo id={(row) => row.item}
                        rows={rows} columns={columns} />
                </div>
            </div>
        </>
    )

}

export default ListEd; 