import DataGridDemo from "../Table";
import { Grid, Button, MenuItem, TextField } from "@mui/material";
import { useState, useEffect, useRef } from "react";
import { AlertDelete, AlertWarning } from "../Alerts";
import MUIModal from "../../components/Modal";
import { getPerson, listPerson } from "../../service/person";
import { getTipoPariente, getDocumento, getDocumentoByID } from "../../service/common";
import { listTrabajadorDocumento, deleteTrabajadorDocumento, getTrabajadorDocumento, AddOrUpdateTrabajadorDocumento, getFile } from "../../service/employee/labordocument";
import { saveAs } from 'file-saver';
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
} from '@mui/x-data-grid';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { AlertSuccess, AlertError } from "../Alerts";
import ArrowCircleDownIcon from '@mui/icons-material/ArrowCircleDown';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

var XLSX = require("xlsx");

const RegisterDocument = (
    { id }
) => {

    const [fields, setFields] = useState({
        coD_TRADOC: 0,
        coD_TRABAJADOR: id,
        inD_DOCTRAB: null,
        coD_DOC: null,
        coD_PERS: null,
        coD_TIPPARIENTE: null,
        obS_DOCUMENTO: null,
        inD_FILE: null,
    });

    const defaultErrors = {
        coD_TRABAJADOR: true,
        inD_DOCTRAB: true,
        coD_DOC: true,
        inD_FILE: true,
    };

    const [data, setData] = useState([]);
    const [data2, setData2] = useState([]);
    const [upload, setUpload] = useState(false);
    const [tipoPariente, setTipoPariente] = useState([]);
    const [documento, setDocumento] = useState([]);
    const [inputError, setInputError] = useState({
        coD_TRABAJADOR: false,
        inD_DOCTRAB: false,
        coD_DOC: false,
        inD_FILE: false,
    });

    const loadData = async () => {
        const response = await listTrabajadorDocumento(id);
        if (response.listado === null) {
            setData([])
        } else {
            setData(response.listado);
        }
        const response2 = await listPerson();
        const responseTipo = await getTipoPariente();
        const responseDocumento = await getDocumento();
        setTipoPariente(responseTipo.listado)
        setData2(response2.listado);
        setDocumento(responseDocumento.listado)
    };

    /*  */
    const validateFields = () => {

        const copyFields = { ...fields };
        delete copyFields.coD_TRADOC;
        delete copyFields.coD_PERS;
        delete copyFields.coD_TIPPARIENTE;
        delete copyFields.obS_DOCUMENTO;

        let errors = {};

        Object.keys(copyFields).forEach(key => {
            if (copyFields[key] === '' || copyFields[key] === 0 || !copyFields[key]) {
                console.log(
                    `El campo ${key} => ${copyFields[key]} no puede estar vacío`
                );
                errors[`${key}`] = true;
            }
        });

        if (Object.keys(errors).length > 0) {
            setInputError(errors);
            AlertWarning("Hay campos obligatorios vacios");
            return false;

        }

        setInputError(errors);

        return true;

    }
    /*  */

    const [namePerson, setNamePerson] = useState("");

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

    const columns2 = [
        {
            field: "acciones",
            type: "actions",
            disableExport: true,
            getActions: (cellValues) => [
                <GridActionsCellItem
                    onClick={async () => {
                        setNamePerson(`${cellValues.row?.deS_APELLP} ${cellValues.row?.deS_APELLM} ${cellValues.row?.noM_PERS}`)
                        fields.coD_PERS = cellValues.row?.coD_PERS
                    }}
                    icon={<AddCircleOutlineIcon />} label="Edit" />
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
        }
    ];

    const levelEducateChild = useRef();

    useEffect(() => {

        loadData();
    }, []);

    const OpenRegister = async () => {
        setUpload(false);
        setNamePerson("")
        setFields({
            coD_TRADOC: 0,
            coD_TRABAJADOR: id,
            inD_DOCTRAB: null,
            coD_DOC: null,
            coD_PERS: null,
            coD_TIPPARIENTE: null,
            obS_DOCUMENTO: null,
            inD_FILE: null,
        })
        setInputError(defaultErrors)
        levelEducateChild.current.handleOpen();
    };

    const handleInputChange = async (event) => {

        const { name, type, checked, value } = event.target;
        const val = type === 'checkbox' ? checked : value;

        if (name === 'coD_DOC') {
            const response = await getDocumentoByID(val)
            fields.obS_DOCUMENTO = response.listado[0].deS_DOC
            setFields({
                ...fields,
                [name]: val,
            });
            return
        }

        setFields({
            ...fields,
            [name]: val,
        });

    }

    const downloadDocument = async (event, nameFile) => {

        const response = await getFile(`${nameFile}`);
        const file64 = await response.objeto.basE64;
        const path = `data:application/pdf;base64,${file64}`
        saveAs(`${path}`, `${nameFile}`);

    }

    const columns = [
        {
            field: 'Acciones',
            type: 'actions',
            getActions: (cellValues) => [
                <GridActionsCellItem
                    icon={<EditIcon />}
                    label="Edit"
                    onClick={(event) => {
                        edit(event, cellValues.row.coD_TRADOC, cellValues.row.coD_PERS );
                    }}
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
        },
        {
            field: 'Descargar',
            type: 'actions',
            getActions: (cellValues) => [
                cellValues.row.noM_FILE ? (
                    <GridActionsCellItem
                        icon={<ArrowCircleDownIcon />}
                        label="Edit"
                        onClick={(event) => {
                            console.log(cellValues.row.noM_FILE)
                            downloadDocument(event, cellValues.row.noM_FILE);
                        }}
                    />
                ) : (<>No hay archivo</>)

            ],
        },
    ];

    const downloadExcel = (dataExport) => {
        var Headers = [["INFORMACIÓN DE DOCUMENTOS"]];
        let nData = [];
        dataExport.forEach((item) => {
            nData.push({
                Código: item?.coD_TRADOC,
                Documento: item?.obS_DOCUMENTO,
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
        XLSX.utils.book_append_sheet(workBook, workSheet, "Documentos");
        XLSX.write(workBook, { bookType: "xlsx", type: "buffer" });
        XLSX.write(workBook, { bookType: "xlsx", type: "binary" });
        XLSX.writeFile(workBook, "ReporteDocumentos.xlsx");
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
                <Button size="small" variant="text" onClick={OpenRegister}>
                    <AddCircleIcon />
                    <span>&nbsp;&nbsp;&nbsp;Agregar</span>
                </Button>
                <GridToolbarColumnsButton />
                <GridToolbarFilterButton />
                <GridToolbarDensitySelector />
                <GridToolbarExport
                    printOptions={{
                        hideFooter: true,
                        hideToolbar: true,
                        fields: [
                            "coD_TRADOC",
                            "obS_DOCUMENTO",
                        ],
                    }}
                />
            </GridToolbarContainer>
        );
    }

    const handleFields = async () => {

        const validate = validateFields();
        if (!validate) return;

        const response = await AddOrUpdateTrabajadorDocumento(fields)

        if (response.code === 0) {
            await loadData();
            levelEducateChild.current.handleClose();
            await AlertSuccess(`${response.message}`)
            setNamePerson("")
            setFields({
                coD_TRADOC: 0,
                coD_TRABAJADOR: id,
                inD_DOCTRAB: null,
                coD_DOC: null,
                coD_PERS: null,
                coD_TIPPARIENTE: null,
                obS_DOCUMENTO: null,
                inD_FILE: null,
            })

        } else {
            levelEducateChild.current.handleClose();
            return await AlertError(`${response.message}`)
        }

    }

    const edit = async (event, idT, idP) => {
        setUpload(false);
        const response = await getTrabajadorDocumento(idT);
        if(idP != null){
            const responseP = await getPerson(idP)
            setNamePerson(`${responseP.listado[0].deS_APELLP} ${responseP.listado[0].deS_APELLM} ${responseP.listado[0].noM_PERS}`)
            setFields({
                coD_TRADOC: idT,
                coD_TRABAJADOR: id,
                inD_DOCTRAB: response.listado[0].inD_DOCTRAB,
                coD_DOC: response.listado[0].coD_DOC,
                coD_PERS: idP,
                coD_TIPPARIENTE: response.listado[0].coD_TIPPARIENTE,
                obS_DOCUMENTO: response.listado[0].obS_DOCUMENTO,
            })
        }else{
            setFields({
                coD_TRADOC: idT,
                coD_TRABAJADOR: id,
                inD_DOCTRAB: response.listado[0].inD_DOCTRAB,
                coD_DOC: response.listado[0].coD_DOC,
                coD_PERS: 0,
                coD_TIPPARIENTE: response.listado[0].coD_TIPPARIENTE,
                obS_DOCUMENTO: response.listado[0].obS_DOCUMENTO,
            })
        }
        setInputError({
            coD_TRABAJADOR: false,
            inD_DOCTRAB: false,
            coD_DOC: false,
            inD_FILE: false,
        });
        levelEducateChild.current.handleOpen();
    }

    const changeFile = async (file) => {
        return file;
    }

    const handleFileInputChange = async (e) => {
        if (e.target.files[0]['type'] != 'application/pdf' || e.target.files[0]['size'] >= 4194304) {
            return AlertWarning("Solo está permitodo archivos PDF y como máximo 3MB")
        }
        else {
            setUpload(true);
            const file = e.target.files[0]
            fields.inD_FILE = await changeFile(file);
        }
    };

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
                    <Grid item md={5} sm={12} xs={12}>
                        {
                            (upload ? (<div style={{ color: 'green', display: 'flex' }}>
                                <span><CheckCircleOutlineIcon /></span> <span style={{ marginLeft: 10 }}>Archivo subido correctamente </span>
                            </div>) : (<>
                                <TextField
                                    size="small"
                                    fullWidth
                                    error={inputError.inD_FILE}
                                    accept="application/pdf"
                                    inputProps={{
                                        accept: 'application/pdf'
                                    }}
                                    onChange={handleFileInputChange}
                                    type="file"
                                /></>))
                        }
                    </Grid>
                    <Grid item md={3} sm={12} xs={12}>
                        <TextField
                            fullWidth
                            InputLabelProps={{
                                shrink: true
                            }}
                            name="inD_DOCTRAB"
                            error={inputError.inD_DOCTRAB}
                            select
                            label="Tipo"
                            size="small"
                            onChange={handleInputChange}
                            value={fields.inD_DOCTRAB}
                        >
                            <MenuItem value="P">
                                PERSONAL
                            </MenuItem>
                            <MenuItem value="F">
                                FAMILIAR
                            </MenuItem>
                        </TextField>
                    </Grid>
                    <Grid item md={3} sm={12} xs={12}>
                        <TextField
                            name="coD_DOC"
                            error={inputError.coD_DOC}
                            fullWidth
                            InputLabelProps={{
                                shrink: true
                            }}
                            size="small"
                            select
                            label="Documento"
                            type="text"
                            onChange={handleInputChange}
                            value={fields.coD_DOC}
                        >
                            {documento &&
                                documento.map(documento => (
                                    <MenuItem value={documento.coD_DOC}>
                                        {documento.deS_DOC}
                                    </MenuItem>
                                ))}
                        </TextField>
                    </Grid>
                    <Grid item md={12} />
                    <Grid item md={6} sm={12} xs={12}>
                        <TextField
                            name="namePersona"
                            fullWidth
                            InputLabelProps={{
                                readOnly: true
                            }}
                            label="Nombres y apellidos"
                            type="text"
                            size="small"
                            value={namePerson}
                        />
                    </Grid>
                    <Grid item md={5} sm={12} xs={12}>
                        <TextField
                            name="coD_TIPPARIENTE"
                            fullWidth
                            InputLabelProps={{
                                shrink: true
                            }}
                            size="small"
                            select
                            label="Parentesco"
                            type="text"
                            onChange={handleInputChange}
                            value={fields.coD_TIPPARIENTE}
                        >
                            {tipoPariente &&
                                tipoPariente.map(tipoPariente => (
                                    <MenuItem value={tipoPariente.coD_TIPPARIENTE}>
                                        {tipoPariente.noM_TIPPARIENTE}
                                    </MenuItem>
                                ))}
                        </TextField>
                    </Grid>
                    <Grid item md={12} />
                    <Grid item md={12}>
                        <Button onClick={handleFields} variant="contained" >
                            Guardar
                        </Button>
                    </Grid>
                    <Grid item md={12} />
                    <Grid item md={12}>
                        <DataGridDemo
                            height='50vh'
                            id={(row) => row.coD_PERS}
                            rows={data2}
                            columns={columns2}
                            numberSize={10}
                        />
                    </Grid>
                </Grid>
            </MUIModal>
        </>
    )

}

export default RegisterDocument;