import DataGridDemo from "../Table";
import { Grid, Button} from "@mui/material";
import { useState, useEffect, useRef } from "react";
import { AlertDelete } from "../Alerts";
import MUIModal from "../../components/Modal";
import { listTrabajadorDocumento, deleteTrabajadorDocumento, getTrabajadorDocumento, AddOrUpdateTrabajadorDocumento } from "../../service/employee/labordocument";
import {
    GridActionsCellItem,
    GridToolbarContainer,
    GridToolbarColumnsButton,
    GridToolbarFilterButton,
    GridToolbarExport,
    GridToolbarDensitySelector,
} from '@mui/x-data-grid';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';


const RegisterDocument = (
    { id }
) => {


    const [data, setData] = useState([]);
    const loadData = async () => {
        const response = await listTrabajadorDocumento(id);
        if (response.listado === null) {
            setData([])
        } else {
            setData(response.listado);
        }
    };

    const destroy = async (event, id) => {
        const resultado = await AlertDelete();

        if (resultado) {
            const dataDelete = {
                'coD_TRADOC': id
            };
            await deleteTrabajadorDocumento(dataDelete);
            await loadData();
        }
    };

    const levelEducateChild = useRef();

    useEffect(() => {

        loadData();
    }, []);

    const columns = [
        {
            field: 'Acciones',
            type: 'actions',
            getActions: (cellValues) => [
                <GridActionsCellItem
                    icon={<EditIcon />}
                    label="Edit"
                />,
                <GridActionsCellItem
                    icon={<DeleteIcon />}
                    label="Delete"
                    onClick={(event) => {
                        destroy(event, cellValues.row.coD_TRADOC);
                    }}
                />,

            ],
        },
        {
            field: 'coD_TRADOC',
            headerName: 'Código',
            width: 200
        },
        {
            field: 'obS_DOCUMENTO',
            headerName: 'Documento',
            width: 100
        }
    ];

    function CustomToolbar() {
        return (
            <GridToolbarContainer>
                <Button size="small" variant="text">
                    <AddCircleIcon />
                    <span>&nbsp;&nbsp;&nbsp;Agregar</span>
                </Button>
                <GridToolbarColumnsButton />
                <GridToolbarFilterButton />
                <GridToolbarDensitySelector />
                <GridToolbarExport />
            </GridToolbarContainer>
        );
    }

    const handleFields = async () => {

        // const response = await AddOrUpdateTrabajadorDocumento(fields)

        // if (response.code === 0) {
        //     setFields({
        //         coD_TRAACC: 0,
        //         coD_TRABAJADOR: id,
        //         coD_ACCION: null,
        //         feC_ACCION: null,
        //         nuM_REFDOC: null,
        //         noM_INSTITUCION: null,
        //         deS_REFERENCIA: null,
        //         feC_INICIO: null,
        //         feC_TERMINO: null,
        //     })
        //     levelEducateChild.current.handleOpen();
        //     await loadData();
        //     levelEducateChild.current.handleClose();
        //     await AlertSuccess(`${response.message}`)

        // } else {
        //     levelEducateChild.current.handleClose();
        //     return await AlertError(`${response.message}`)
        // }

    }

    // const edit = async (event, idT) => {
    //     const response = await getTrabajadorDocumento(idT);
    //     setFields({
    //         coD_TRAACC: idT,
    //         coD_TRABAJADOR: id,
    //         noM_INSTITUCION: response.listado[0].noM_INSTITUCION,
    //         nuM_REFDOC: response.listado[0].nuM_REFDOC,
    //         deS_REFERENCIA: response.listado[0].deS_REFERENCIA,
    //         feC_ACCION: response.listado[0].feC_ACCION,
    //         coD_ACCION: response.listado[0].coD_ACCION,
    //         feC_INICIO: response.listado[0].feC_INICIO,
    //         feC_TERMINO: response.listado[0].feC_TERMINO,
    //     })
    //     levelEducateChild.current.handleOpen();
    // }

    return (
        <>
            <Grid container spacing={1}>
                <Grid item md={12} xs={12} sm={12}>
                    <Grid item md={12}>
                        <DataGridDemo id={(row) => row.coD_TRADOC}
                            rows={data} columns={columns} toolbar={CustomToolbar} />
                    </Grid>
                </Grid>
            </Grid>
            <MUIModal ref={levelEducateChild}>
                <Grid container spacing={1.5} >

                    <Grid item md={12}>
                        <Button onClick={handleFields} variant="contained" >
                            Guardar
                        </Button>
                    </Grid>
                </Grid>
            </MUIModal>
        </>
    )

}

export default RegisterDocument;