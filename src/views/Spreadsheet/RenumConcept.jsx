import { useState, useEffect, useRef } from "react";
import { Button, Grid, TextField, Stack, MenuItem } from "@mui/material";
import DataGridDemo from "../../components/Table";
import { deleteConcept, getConcept, getConceptByID, saveConcept } from "../../service/concept";
import { AlertDelete } from "../../components/Alerts";
import { AlertError, AlertSuccess, AlertWarning } from "../../components/Alerts";
import IconToolTip from "../../components/Icons/IconToolTip";
import EditIcon from "@mui/icons-material/Edit";
import MUIModal from "../../components/Modal";
import {
    GridToolbarContainer,
    GridToolbarColumnsButton,
    GridToolbarFilterButton,
    GridToolbarDensitySelector,
} from "@mui/x-data-grid";
import AddCircleIcon from "@mui/icons-material/AddCircle";

import DeleteIcon from "@mui/icons-material/Delete";

const RenumConcept = () => {

    const defaultFields = {
        coD_CONCEPTO: 0,
        noM_CONCEPTO: null,
        inD_TIPOCONCEPTO: null,
        noM_ABREVIADO: null,
        inD_CALCULO: null,
        coD_USUREG: null,
        feC_USUREG: null,
        coD_USUMOD: null,
        feC_USUMOD: null,
        inD_ESTADO: null,
        suN_CODITD: null
    }

    const errorDefaults = {
        noM_CONCEPTO: false,
        inD_TIPOCONCEPTO: false,
        inD_CALCULO: false,
    }

    const OpenRegister = () => {
        setInputError({
            noM_CONCEPTO: true,
            inD_TIPOCONCEPTO: true,
            inD_CALCULO: true,
        })
        setFields(defaultFields);
        levelEducateChild.current.handleOpen();
    };

    const OpenEdit = async (event, id) => {
        const response = await getConceptByID(id);
        setFields({
            coD_CONCEPTO: response.listado[0]['coD_CONCEPTO'],
            noM_CONCEPTO: response.listado[0]['noM_CONCEPTO'],
            inD_TIPOCONCEPTO: response.listado[0]['inD_TIPOCONCEPTO'],
            noM_ABREVIADO: response.listado[0]['noM_ABREVIADO'],
            inD_CALCULO: response.listado[0]['inD_CALCULO'],
            coD_USUREG: null,
            feC_USUREG: null,
            coD_USUMOD: null,
            feC_USUMOD: null,
            inD_ESTADO: null,
            suN_CODITD: response.listado[0]['suN_CODITD']
        });
        levelEducateChild.current.handleOpen();
    }

    const levelEducateChild = useRef();
    const [data, setData] = useState([]);
    const [inputError, setInputError] = useState([]);
    const [fields, setFields] = useState(defaultFields);

    const loadData = async () => {
        const response = await getConcept();
        setData(response.listado);
    };

    useEffect(() => {
        loadData();
    }, []);

    const destroy = async (event, id) => {
        const resultado = await AlertDelete();
        if (resultado) {
            const dataDelete = {
                coD_CONCEPTO: id,
            };
            await deleteConcept(dataDelete);
            await loadData();
        }
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFields({ ...fields, [name]: value });

    };

    const saveC = async () => {

        if (!validateFields()) return;

        const response = await saveConcept(fields);
        if (response.code === 0) {
            levelEducateChild.current.handleClose();
            setFields(defaultFields);
            setInputError(errorDefaults);
            loadData();
            return await AlertSuccess(`${response.message}`);

        } else {
            return await AlertError(`${response.message}`);
        }

    }

    const validateFields = () => {

        const copyFields = { ...fields };
        delete copyFields.coD_CONCEPTO;
        delete copyFields.noM_ABREVIADO;
        delete copyFields.suN_CODITD;
        delete copyFields.coD_USUREG;
        delete copyFields.feC_USUREG;
        delete copyFields.coD_USUMOD;
        delete copyFields.feC_USUMOD;
        delete copyFields.inD_ESTADO;

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

    const columns = [
        {
            field: "Acciones",
            type: "actions",
            getActions: (cellValues) => [
                /*  */
                <IconToolTip
                    text="Edit"
                    icon={<EditIcon />}
                    action={(event) => {
                        OpenEdit(event, cellValues.row.coD_CONCEPTO)
                    }}
                />,
                /*  */
                /*  */
                <IconToolTip
                    text="Delete"
                    icon={<DeleteIcon />}
                    action={(event) => {
                        destroy(event, cellValues.row.coD_CONCEPTO);
                    }}
                />,
                /*  */
            ],
        },
        {
            field: "coD_CONCEPTO",
            headerName: "Código",
            width: 100,
        },
        {
            field: "noM_CONCEPTO",
            headerName: "Concepto",
            width: 300,
        },
        {
            field: "inD_TIPOCONCEPTO",
            headerName: "Tipo Concepto",
            width: 300,
            valueGetter: (params) => {
                if (params.row?.inD_TIPOCONCEPTO === '1') return "INGRESO"
                if (params.row?.inD_TIPOCONCEPTO === '2') return "EGRESO"
                if (params.row?.inD_TIPOCONCEPTO === '3') return "APORTE"
            },
        },
        {
            field: "inD_CALCULO",
            headerName: "Ind. Calculo",
            width: 200,
            valueGetter: (params) => {
                if (params.row?.inD_CALCULO === '1') return "Monto Fijo"
                if (params.row?.inD_CALCULO === '2') return "Fórmula"
                if (params.row?.inD_CALCULO === '3') return "Dato externo"
            },
        },
        {
            field: "suN_CODITD",
            headerName: "Código SUNAT",
            width: 300,
        }
    ];

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
            </GridToolbarContainer>
        );
    }

    return (<>
        <div style={{ flexGrow: 1 }}>
            <Stack direction="row" spacing={1} xs={{ mb: 1, display: "flex" }}>
                <div>
                    <h1>Concepto Renumerativo</h1>
                </div>
            </Stack>
            <DataGridDemo
                id={(row) => row.coD_CONCEPTO}
                rows={data}
                columns={columns}
                toolbar={CustomToolbar}
            />
            <MUIModal ref={levelEducateChild}>
                <Grid container spacing={1.5}>
                    <Grid item md={4} sm={12} xs={12}>
                        <TextField
                            name="noM_CONCEPTO"
                            fullWidth
                            InputLabelProps={{
                                shrink: true,
                            }}
                            inputProps={{maxLength: 100}}
                            size="small"
                            error={inputError.noM_CONCEPTO}
                            label="Nombre concepto"
                            onChange={handleInputChange}
                            value={fields.noM_CONCEPTO}
                        />
                    </Grid>
                    <Grid item md={4} sm={12} xs={12}>
                        <TextField
                            name="noM_ABREVIADO"
                            fullWidth
                            InputLabelProps={{
                                shrink: true,
                            }}
                            inputProps={{maxLength: 20}}
                            size="small"
                            label="Nombre abreviado"
                            onChange={handleInputChange}
                            value={fields.noM_ABREVIADO}
                        />
                    </Grid>
                    <Grid item md={12} sm={12} xs={12} />
                    <Grid item md={4} sm={12} xs={12}>
                        <TextField
                            name="inD_TIPOCONCEPTO"
                            fullWidth
                            InputLabelProps={{
                                shrink: true,
                            }}
                            size="small"
                            label="Tipo concepto"
                            error={inputError.inD_TIPOCONCEPTO}
                            onChange={handleInputChange}
                            value={fields.inD_TIPOCONCEPTO}
                            select
                        >
                            <MenuItem value="1">
                                INGRESO
                            </MenuItem>
                            <MenuItem value="2">
                                EGRESO
                            </MenuItem>
                            <MenuItem value="3">
                                APORTE
                            </MenuItem>
                        </TextField>
                    </Grid>
                    <Grid item md={4} sm={12} xs={12}>
                        <TextField
                            name="inD_CALCULO"
                            fullWidth
                            InputLabelProps={{
                                shrink: true,
                            }}
                            size="small"
                            label="Ind. Calculo"
                            error={inputError.inD_CALCULO}
                            onChange={handleInputChange}
                            value={fields.inD_CALCULO}
                            select
                        >
                            <MenuItem value="1">
                                Monto Fijo
                            </MenuItem>
                            <MenuItem value="2">
                                Fórmula
                            </MenuItem>
                            <MenuItem value="3">
                                Dato externo
                            </MenuItem>
                        </TextField>
                    </Grid>
                    <Grid item md={4} sm={12} xs={12}>
                        <TextField
                            name="suN_CODITD"
                            fullWidth
                            InputLabelProps={{
                                shrink: true,
                            }}
                            inputProps={{ maxLength: 4 }}
                            size="small"
                            label="Cod. Sunat"
                            onChange={handleInputChange}
                            value={fields.suN_CODITD}
                        />
                    </Grid>
                    <Grid item md={12} />
                    <Grid item md={12}>
                        <Button onClick={saveC} variant="contained">
                            Guardar
                        </Button>
                    </Grid>
                </Grid>
            </MUIModal>
        </div>
    </>)

}

export default RenumConcept;