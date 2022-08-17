import ResponsiveAppBar from "../../../layouts/Header";
import DataGridDemo from "../../../components/Table";
import { Grid, Button } from "@mui/material";
import { useState, useEffect } from "react";

const ListDO = () => {

    // const [data, setData] = useState([]);

    // const loadData = async () => {
    //     const response = await listPerson();
    //     setData(response.listado);
    // };

    // useEffect(() => {
    //     loadData();
    // }, []);

    const columns = [
        {
            field: 'item',
            headerName: 'Item',
            width: 100,
        },
        {
            field: 'document',
            headerName: 'Documento',
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

    const rows = [
        {
            id: 1,
            item: '2',
            document: 'MEMO 124-2011-EMAPE-GP',
        },
    ];

    return (
        <>
            {/* <ResponsiveAppBar /> */}
            <div style={{ padding: '50px', display: 'flex', height: '100%' }}>
                <div style={{ flexGrow: 1 }}>
                    <DataGridDemo id={(row) => row.item}
                        rows={rows} columns={columns} />
                </div>
            </div>
        </>
    )

}

export default ListDO;