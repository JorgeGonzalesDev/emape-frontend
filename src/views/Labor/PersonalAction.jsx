import ResponsiveAppBar from "../../layouts/Header";
import DataGridDemo from "../../components/Table";
import { Grid, Button } from "@mui/material";
import { getCondicionLaboral } from "../../service/labor/workingCondition";
import { useState, useEffect } from "react";

const PersonalAction = () => {

    const [data, setData] = useState([]);

    // const loadData = async () => {
    //     const response = await getCondicionLaboral();
    //     setData(response.listado)
    // }

    // useEffect(() => {
        
    //     loadData();

    // }, []);

    const rows = [{
        'code':1,
        'name':'Hola'
    }
    ] 

    const columns = [
        {
            field: 'code',
            headerName: 'Código',
            width: 200
        },
        {
            field: 'name',
            headerName: 'Nombre',
            width: 500
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

    return (
        <>
            <ResponsiveAppBar />
            <div style={{ padding: '50px', display: 'flex', height: '100%' }}>
                <div style={{ flexGrow: 1 }}>
                    <DataGridDemo id={(row) => row.code}
                        rows={rows} columns={columns} />
                </div>
            </div>
        </>
    )

}

export default PersonalAction;