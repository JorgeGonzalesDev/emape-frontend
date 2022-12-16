import DataGridDemo from "../../components/Table";
import { listPersonNoWorker } from "../../service/person";
import { useState, useEffect } from "react";
import {
    GridActionsCellItem,
    GridToolbarContainer,
    GridToolbarColumnsButton,
    GridToolbarFilterButton,
    GridToolbarExportContainer,
    GridPrintExportMenuItem,
    GridToolbarDensitySelector,
    gridFilteredSortedRowIdsSelector,
    gridVisibleColumnFieldsSelector,
    useGridApiContext,
} from "@mui/x-data-grid";
import moment from "moment";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RegisterSteps from "../../components/Employee/RegisterSteps";
import { Button, Stack, MenuItem } from "@mui/material";
import { useNavigate } from 'react-router-dom';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

var XLSX = require("xlsx");


const RegisterWorker = (
    {
        pageView = 25,
        height = '68vh',
        view = false
    }
) => {

    const [data, setData] = useState([]);
    const [forms, setForms] = useState(false);
    const [personData, setPersonData] = useState({});

    const loadData = async () => {
        const response = await listPersonNoWorker();
        setData(response.listado);
    };

    const navigate = useNavigate();

    const navigateBack = () => {
        navigate(-1)
    }

    useEffect(() => {
        loadData();
    }, []);

    const handleForm = async () => {
        setForms(true);
    }

    const reverseForm = async () => {
        setForms(false);
    }


    const columns = [
        {
            field: "acciones",
            type: "actions",
            disableExport: true,
            getActions: (cellValues) => [
                <GridActionsCellItem
                    onClick={async () => {
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
                `${params.row?.deS_APELLP || ""} ${params.row?.deS_APELLM || ""} ${params.row?.noM_PERS || ""
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
                `${moment(params.row?.feC_NACIM).format("DD-MM-YYYY")}`,
        },
        {
            field: "inD_SEXO",
            headerName: "Sexo",
            width: 130,
            valueGetter: (params) =>
                `${params.row?.inD_SEXO === "M" ? "Masculino" : "Femenino"}`,
        },
        // {
        //     field: "inD_ESTADO",
        //     headerName: "Estado",
        //     width: 130,
        //     valueGetter: (params) =>
        //         `${params.row.inD_ESTADO === "A" ? "Activo" : "Inactivo"}`,
        // },
    ];

    const downloadExcel = (dataExport) => {
        var Headers = [["INFORMACIÓN DE PERSONAS"]];
        let nData = [];
        dataExport.forEach((item) => {
            nData.push({
                Código: item?.coD_PERS,
                "Apellidos y nombres": item?.full_name,
                Documento: item?.nuM_DOC,
                Nacimiento: item?.feC_NACIM,
                Sexo: item?.inD_SEXO,
            });
        });

        const workSheet = XLSX.utils.json_to_sheet(nData, { origin: "A2" });
        const workBook = XLSX.utils.book_new();

        const merge = [
            { s: { r: 0, c: 0 }, e: { r: 0, c: 33 } },
            { s: { r: 0, c: 34 }, e: { r: 0, c: 37 } },
        ];

        workSheet["!merges"] = merge;

        XLSX.utils.sheet_add_aoa(workSheet, Headers);
        XLSX.utils.book_append_sheet(workBook, workSheet, "Registro Trabajadores");
        XLSX.write(workBook, { bookType: "xlsx", type: "buffer" });
        XLSX.write(workBook, { bookType: "xlsx", type: "binary" });
        XLSX.writeFile(workBook, "ReporteRegistroTrabajadores.xlsx");
    };

    const getData = (apiRef) => {
        const filteredSortedRowIds = gridFilteredSortedRowIdsSelector(apiRef);
        const visibleColumnsField = gridVisibleColumnFieldsSelector(apiRef);
        const data = filteredSortedRowIds.map((id) => {
            const row = {};
            visibleColumnsField.forEach((field) => {
                row[field] = apiRef.current.getCellParams(id, field).value;
            });
            return row;
        });

        return data;
    };

    const ExcelExportMenuItem = (props) => {
        const apiRef = useGridApiContext();

        const { hideMenu } = props;

        return (
            <MenuItem
                onClick={() => {
                    const data = getData(apiRef);
                    downloadExcel(data);
                    hideMenu?.();
                }}
            >
                Excel
            </MenuItem>
        );
    };

    const GridToolbarExport = ({ csvOptions, printOptions, ...other }) => (
        <GridToolbarExportContainer {...other}>
            <GridPrintExportMenuItem options={printOptions} />
            <ExcelExportMenuItem />
        </GridToolbarExportContainer>
    );

    function CustomToolbar() {
        return (
            <GridToolbarContainer>
                <GridToolbarFilterButton />
                <GridToolbarColumnsButton />
                <GridToolbarDensitySelector />
                <GridToolbarExport
                    printOptions={{
                        hideFooter: true,
                        hideToolbar: true,
                        fields: [
                            "coD_PERS",
                            "full_name",
                            "nuM_DOC",
                            "feC_NACIM",
                            "inD_SEXO",
                        ],
                    }}
                />
            </GridToolbarContainer>
        );
    }

    const Forms = () => {

        if (!forms) {
            return (
                <>
                    <div style={{ flexGrow: 1 }}>
                        <Stack
                            direction="row"
                            spacing={1}
                            style={{ marginBottom: 30 }}
                        >
                            <Button variant="outlined" onClick={() => {
                                navigateBack();
                            }}>
                                < ArrowForwardIosIcon /> Regresar
                            </Button>
                        </Stack>
                        <DataGridDemo
                            height={height}
                            id={(row) => row.coD_PERS}
                            rows={data}
                            columns={columns}
                            toolbar={CustomToolbar}
                            numberSize={pageView}
                        />
                    </div>
                </>
            )
        } else if (forms) {

            return (
                <>
                    <RegisterSteps back={reverseForm} codePerson={personData?.coD_PERS} fullName={`${personData?.deS_APELLP} ${personData?.deS_APELLM} ${personData.noM_PERS}`} />
                </>
            )

        }
    }

    return (
        <>
            {Forms()}
        </>
    )


};

export default RegisterWorker;