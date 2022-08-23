import ResponsiveAppBar from "../../layouts/Header";
import DataGridDemo from "../../components/Table";
import { listPerson } from "../../service/person";
import { useState, useEffect } from "react";
import {
    GridToolbarContainer,
    GridToolbarColumnsButton,
    GridToolbarFilterButton,
    GridToolbarDensitySelector,
    GridActionsCellItem
} from "@mui/x-data-grid";
import moment from "moment";
import { Link } from "react-router-dom";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RegisterSteps from "../../components/Employee/RegisterSteps";

const RegisterWorker = () => {

    const [data, setData] = useState([]);
    const [forms, setForms] = useState(false);
    const [personData, setPersonData] = useState({});

    const loadData = async () => {
        const response = await listPerson();
        setData(response.listado);
    };

    useEffect(() => {
        loadData();
    }, []);

    const handleForm = async () => {
        setForms(true);
    }


    const columns = [
        {
            field: "coD_PERS",
            headerName: "Código",
            width: 120,
        },
        {
            field: "full_name",
            headerName: "Apellidos y Nombres",
            width: 400,
            valueGetter: (params) =>
                `${params.row.deS_APELLP || ""} ${params.row.deS_APELLM || ""} ${params.row.noM_PERS || ""
                }`,
        },
        {
            field: "nuM_DOC",
            headerName: "Documento",
            width: 160,
        },
        {
            field: "feC_NACIM",
            headerName: "Nacimiento",
            width: 160,
            valueGetter: (params) =>
                `${moment(params.row.feC_NACIM).format("DD-MM-YYYY")}`,
        },
        {
            field: "inD_SEXO",
            headerName: "Sexo",
            width: 130,
            valueGetter: (params) =>
                `${params.row.inD_SEXO === "M" ? "Masculino" : "Femenino"}`,
        },
        // {
        //     field: "inD_ESTADO",
        //     headerName: "Estado",
        //     width: 130,
        //     valueGetter: (params) =>
        //         `${params.row.inD_ESTADO === "A" ? "Activo" : "Inactivo"}`,
        // },
        {
            field: "acciones",
            type: "actions",
            disableExport: true,
            getActions: (cellValues) => [
                <GridActionsCellItem
                    onClick={async () => {
                        console.log(cellValues.row);
                        setPersonData(cellValues.row);
                        await handleForm();
                    }}
                    icon={<AddCircleOutlineIcon />} label="Edit" />
                // <GridActionsCellItem
                //     icon={<DeleteIcon />}
                //     label="Delete"
                //     onClick={(event) => {
                //         destroy(event, cellValues.row.coD_PERS);
                //     }}
                // />,
            ],
        },
    ];

    function CustomToolbar() {
        return (
            <GridToolbarContainer>
                <GridToolbarFilterButton />
                <GridToolbarColumnsButton />
                <GridToolbarDensitySelector />
            </GridToolbarContainer>
        );
    }

    if (!forms) {
        return (
            <>
                <ResponsiveAppBar>
                    <div
                        style={{
                            padding: "40px 30px 0px 30px",
                            display: "flex",
                            height: "100%",
                        }}
                    >
                        <div style={{ flexGrow: 1 }}>
                            <DataGridDemo
                                id={(row) => row.coD_PERS}
                                rows={data}
                                columns={columns}
                                toolbar={CustomToolbar}
                            />
                        </div>
                    </div>
                </ResponsiveAppBar>
            </>
        )
    } else if (forms) {

        return (
            <>
                <ResponsiveAppBar>
                    <div style={{ padding: "20px 30px 0px 30px" }}>
                        <RegisterSteps codePerson={personData?.coD_PERS} fullName={`${personData?.deS_APELLP} ${personData?.deS_APELLM} ${personData.noM_PERS}`} />
                    </div>
                </ResponsiveAppBar>
            </>
        )

    }

};

export default RegisterWorker;