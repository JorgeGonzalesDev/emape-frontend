import ResponsiveAppBar from "../../../layouts/Header";
import DataGridDemo from "../../../components/Table";
import { Grid, Button } from "@mui/material";
import { useState, useEffect } from "react";



const ListE = () => {

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
            field: 'institution',
            headerName: 'Institución',
            width: 100,
        },
        {
            field: 'position',
            headerName: 'Cargo',
            width: 200
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
            institution: 'Senati',
            position: 'PRACTICAS PRE PROFESIONALES',
            beginning: '23/07/2020',
            term: '23/07/2023',
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

export default ListE; 