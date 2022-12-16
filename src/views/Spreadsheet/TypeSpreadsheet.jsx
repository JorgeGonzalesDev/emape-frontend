import { useState, useEffect} from "react";
import { Button, Grid, TextField, Stack, MenuItem } from "@mui/material";
import DataGridDemo from "../../components/Table";
import { AlertDelete } from "../../components/Alerts";
import { AlertError, AlertSuccess, AlertWarning } from "../../components/Alerts";
import IconToolTip from "../../components/Icons/IconToolTip";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import {  getTypePlan } from "../../service/common";
import { deleteTypePlan, getTypePlanBy, getTypePlanByParent, saveTypePlan } from "../../service/spreadsheet/typeSpreadsheet";

const TypeSpreadsheet = () => {

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFields({ ...fields, [name]: value });

        if (name === "coD_PRIMARY") {
            const { name, value } = event.target;
            setFields({ ...fields, [name]: value });
            return getSub(value);
        }
    };

    const getSub = async (ind) => {
        const response = await getTypePlanByParent(ind);
        setData2(response.listado);
        console.log(fields)

    }

    const defaultFields = {
        "coD_TIPOPLAN": 0,
        "coD_PADRE": null,
        "noM_TIPOPLAN": '',
        "inD_NIVEL": '',
        "coD_PRIMARY": null,
    };

    const refresh = async () => {
        setFields(defaultFields);
    }

    const defaultErrors = {
        "noM_TIPOPLAN": true,
    };

    const [fields, setFields] = useState(defaultFields);

    const [data, setData] = useState([]);
    const [data2, setData2] = useState([]);
    const [typeplan, setTypeplan] = useState(1);

    const [inputError, setInputError] = useState(defaultErrors);

    const loadData = async () => {
        const response = await getTypePlan('1');
        setData(response.listado);
    };

    useEffect(() => {
        loadData();
    }, []);

    const saveType = async () => {
        if (!validateFields()) return;

        const id = fields.coD_PRIMARY;
        fields.inD_NIVEL = '1';

        if (typeplan === 2) {
            fields.inD_NIVEL = '2';
            fields.coD_PADRE = id;
        };

        const response = await saveTypePlan(fields);
        if (response.code === 0) {
            if (typeplan === 1) {
                await loadData();
            } else {
                await getSub(id)
            }
            setFields({
                "coD_TIPOPLAN": 0,
                "coD_PADRE": null,
                "noM_TIPOPLAN": '',
                "inD_NIVEL": '',
                "coD_PRIMARY": fields.coD_PRIMARY,
            });
            return await AlertSuccess(`${response.message}`);
        } else {
            return await AlertError(`${response.message}`);
        }
    }

    const edit = async (event, row) => {
        const response = await getTypePlanBy(row.coD_TIPOPLAN);
        setFields({
            "coD_TIPOPLAN": response.listado[0]['coD_TIPOPLAN'],
            "coD_PADRE": response.listado[0]['coD_PADRE'],
            "noM_TIPOPLAN": response.listado[0]['noM_TIPOPLAN'],
            "inD_NIVEL": response.listado[0]['inD_NIVEL'],
            "coD_PRIMARY": fields.coD_PRIMARY,
        });
        inputError.noM_TIPOPLAN = false;
    };

    const destroy = async (event, id) => {
        const resultado = await AlertDelete();
        if (resultado) {
            const dataDelete = {
                coD_TIPOPLAN: id,
            };
            await deleteTypePlan(dataDelete);
            await getSub(id);
            await loadData();
        }
    };

    const changeStatus = async (id) => {
        setTypeplan(id);
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
                        edit(event, cellValues.row);
                    }}
                />,
                /*  */
                /*  */
                <IconToolTip
                    text="Delete"
                    icon={<DeleteIcon />}
                    action={(event) => {
                        destroy(event, cellValues.row.coD_TIPOPLAN);
                    }}
                />,
                /*  */
            ],
        },
        {
            field: "coD_TIPOPLAN",
            headerName: "Código",
            width: 150,
            hide: true
        },
        {
            field: "noM_TIPOPLAN",
            headerName: "Nombre",
            width: 300,
        },
    ];

    const validateFields = () => {

        const copyFields = { ...fields };
        delete copyFields.inD_NIVEL;
        delete copyFields.coD_PADRE;
        delete copyFields.coD_TIPOPLAN;
        delete copyFields.coD_PRIMARY;

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

    const form = () => {
        if (typeplan === 1) {
            return (<>

                <div style={{ flexGrow: 1 }}>
                    <Stack direction="row" spacing={1} xs={{ mb: 1, display: "flex" }}>
                        <Button variant="contained" onClick={() => {
                            changeStatus(1)
                        }} >
                            Planilla
                        </Button>
                        <Button variant="" onClick={() => {
                            changeStatus(2)
                        }} >
                            Subplanilla
                        </Button>
                    </Stack>
                    <Stack direction="row" spacing={1} xs={{ mb: 1, display: "flex" }}>
                        <div>
                            <h1>Registrar Planilla</h1>
                        </div>
                    </Stack>
                    <Grid container spacing={1}>
                        <Grid item md={6} sm={12} xs={12}>

                            <DataGridDemo
                                id={(row) => row.coD_TIPOPLAN}
                                rows={data}
                                columns={columns}
                            />
                        </Grid>
                        <Grid item md={6} sm={12} xs={12}>
                            <Grid item md={6} xs={6}>
                                <TextField
                                    name="noM_TIPOPLAN"
                                    value={fields.noM_TIPOPLAN}
                                    fullWidth
                                    error={inputError.noM_TIPOPLAN}
                                    onChange={handleInputChange}
                                    label="Nombre"
                                />
                            </Grid>
                            <br />
                            <Grid item md={6} xs={6}>
                                <Button variant="contained" onClick={saveType} >
                                    Guardar
                                </Button>
                                <Button sx={{ marginLeft: 3 }} variant="contained" onClick={refresh} >
                                    Refrescar
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </div>
            </>)
        } else {
            return (<>
                <div style={{ flexGrow: 1 }}>
                    <Stack direction="row" spacing={1} xs={{ mb: 1, display: "flex" }}>
                        <Button variant="" onClick={() => {
                            changeStatus(1)
                        }} >
                            Planilla
                        </Button>
                        <Button variant="contained" onClick={() => {
                            changeStatus(2)
                        }} >
                            Subplanilla
                        </Button>
                    </Stack>
                    <Stack direction="row" spacing={1} xs={{ mb: 1, display: "flex" }}>
                        <div>
                            <h1>Registrar Sub-Planilla</h1>
                        </div>
                    </Stack>
                    <Stack direction="row" spacing={1} xs={{ mb: 1, display: "flex" }} marginBottom={3}>
                        <Grid container spacing={1}>
                            <Grid item md={3} sm={12} xs={12}>
                                <TextField
                                    name="coD_PRIMARY"
                                    fullWidth
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    size="small"
                                    label="Tipo Planilla"
                                    onChange={handleInputChange}
                                    value={fields.coD_PRIMARY}
                                    select
                                >
                                    {data &&
                                        data.map(data => (
                                            <MenuItem value={data.coD_TIPOPLAN}>
                                                {data.noM_TIPOPLAN}
                                            </MenuItem>
                                        ))}
                                </TextField>
                            </Grid>
                        </Grid>
                    </Stack>
                    <Grid container spacing={1}>
                        <Grid item md={6} sm={12} xs={12}>
                            <DataGridDemo
                                id={(row) => row.coD_TIPOPLAN}
                                rows={data2}
                                columns={columns}
                            />
                        </Grid>
                        <Grid item md={6} sm={12} xs={12}>
                            <Grid item md={6} xs={6}>
                                <TextField
                                    name="noM_TIPOPLAN"
                                    value={fields.noM_TIPOPLAN}
                                    fullWidth
                                    error={inputError.noM_TIPOPLAN}
                                    onChange={handleInputChange}
                                    label="Nombre"
                                />
                            </Grid>
                            <br />
                            <Grid item md={6} xs={6}>
                                <Button variant="contained" onClick={saveType} >
                                    Guardar
                                </Button>
                                <Button sx={{ marginLeft: 3 }} variant="contained" onClick={refresh} >
                                    Refrescar
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </div>
            </>)
        }
    }

    return (
        form()
    )

}

export default TypeSpreadsheet;