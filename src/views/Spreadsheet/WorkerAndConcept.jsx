import { useState } from "react";
import { useEffect } from "react";
import { getConcept, getSubTypePlan, getTypePlan } from "../../service/common";
import { AddOrUpdateWorkerConcept, destroyWC, getTrabajadorSpreadsheet, getTrabajadorConceptoByWorker } from "../../service/spreadsheet/WorkerAndConcept";
import { Button, Grid, TextField, Stack, MenuItem } from "@mui/material";
import DataGridDemo from "../../components/Table";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import IconToolTip from "../../components/Icons/IconToolTip";
import SlowMotionVideoIcon from '@mui/icons-material/SlowMotionVideo';
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { AlertDelete, AlertWarning } from "../../components/Alerts";
import { AlertSuccess, AlertError } from "../../components/Alerts";
import { getPlanillaTrabajadorByTipoPlan } from "../../service/spreadsheet/payrollandworkers";
import { getPlanillaConceptoByTypePlan } from "../../service/spreadsheet/conceptspreadsheet";


const WorkerAndConcept = () => {

    const [data, setData] = useState([]);
    const [fields, setFields] = useState({
        "coD_TRACON": 0,
        "coD_TIPOPLAN": null,
        "coD_TRABAJADOR": null,
        "coD_CONCEPTO": null,
        "moN_CONCEPTO": 0,
        "inD_ESTADO" : null,
    })
    const [responseTypePlan, setResponseTypePlan] = useState([]);
    const [responseSubTypePlan, setResponseSubTypePlan] = useState([]);
    const [data2, setData2] = useState([]);
    const [data3, setData3] = useState([]);
    const [fieldsTest, setFieldsTest] = useState({
        nameW: '',
        nameC: ''
    })

    const filterConcepts = async (listado) => {

        setData3(listado)

        if (data3.length === 0) return;

        const idConcepts = [];

        data3.forEach(element => {
            idConcepts.push(element['coD_CONCEPTO'])
        })

        let newArray = data2.filter(
            (data) => !idConcepts.some((data2) => data2 === data['dConceptoPlanilla']['coD_CONCEPTO']));

        setData2(newArray);

    }

    const edit = async (event, row) => {
        const response = await getPlanillaConceptoByTypePlan(fields.coD_TIPOPLAN);
        setData2(response.listado)
        const response2 = await getTrabajadorSpreadsheet(row.coD_TRABAJADOR, row.coD_TIPOPLAN);
        fields.coD_TRABAJADOR = row.coD_TRABAJADOR;
        fieldsTest.nameW = `${row?.dTrabajador?.dPersona?.deS_APELLP || ""} ${row?.dTrabajador?.dPersona?.deS_APELLM || ""} ${row?.dTrabajador?.dPersona?.noM_PERS || ""}`
        filterConcepts(response2.listado)
    }

    const editWC = async (event, row) => {
        fields.coD_TRACON = row.coD_TRACON
        fields.coD_CONCEPTO = row.coD_CONCEPTO;
        fields.moN_CONCEPTO = row?.moN_CONCEPTO;
        fields.inD_ESTADO = row?.inD_ESTADO
        handleChangeTest('nameC', row?.dConceptoPlanilla?.noM_CONCEPTO)
    }

    const editConcept = async (event, row) => {
        console.log(row);
        fields.coD_CONCEPTO = row?.dConceptoPlanilla?.coD_CONCEPTO
        handleChangeTest('nameC', row?.dConceptoPlanilla?.noM_CONCEPTO)
    }

    const handleChangeTest = (name, value) => {
        setFieldsTest({ ...fieldsTest, [name]: value });
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFields({ ...fields, [name]: value });

        if (name === "coD_PRIMARY") {
            setFields({
                ...fields,
                [name]: value
            })
            return getSub(value);
        }

    };

    const loadData = async () => {

        const response2 = await getTypePlan(1);
        setResponseTypePlan(response2.listado);
    }

    const captureEvent = async () => {
        const response = await getPlanillaTrabajadorByTipoPlan(fields.coD_TIPOPLAN)
        //const response = await getTrabajadorConcepto(fields.coD_TIPOPLAN);
        setData(response.listado);
    }

    const getSub = async (ind) => {
        const response = await getSubTypePlan(ind);
        setResponseSubTypePlan(response.listado);
        handleChangeTest('nameC', '')
        handleChangeTest('nameW', '')
        fields.moN_CONCEPTO = ''
        setData3([])
    }

    useEffect(() => {
        loadData();
    }, []);

    const columns = [
        {
            field: "Acciones",
            type: "actions",
            getActions: (cellValues) => [
                /*  */
                <IconToolTip
                    text="Seleccionar"
                    icon={<SlowMotionVideoIcon />}
                    action={(event) => {
                        edit(event, cellValues.row);
                    }}
                />,
            ],
        },
        {
            field: "coD_PLATRA",
            headerName: "Código",
            width: 150,
            hide: true
        },
        {
            field: "coD_TRABAJADOR",
            headerName: "Código",
            width: 150,
            hide: true
        },
        {
            field: "document_number",
            headerName: "DNI",
            width: 150,
            valueGetter: (params) =>
                `${params.row?.dTrabajador?.dPersona?.nuM_DOC}`,
        },
        {
            field: "full_name",
            headerName: "Nombre completo",
            width: 400,
            valueGetter: (params) =>
                `${params.row?.dTrabajador?.dPersona?.deS_APELLP || ""} ${params.row?.dTrabajador?.dPersona?.deS_APELLM || ""} ${params.row?.dTrabajador?.dPersona?.noM_PERS || ""
                }`,
        },
    ];

    const columns2 = [
        {
            field: "Acciones",
            type: "actions",
            getActions: (cellValues) => [
                /*  */
                <IconToolTip
                    text="Agregar"
                    icon={<AddCircleOutlineIcon />}
                    action={(event) => {
                        editConcept(event, cellValues.row);
                    }}
                />,
            ],
        },
        {
            field: "coD_CONCEPTO",
            headerName: "Código",
            width: 150,
            hide: true,
            valueGetter: (params) => `${params.row?.dConceptoPlanilla?.coD_CONCEPTO}`,
        },
        {
            field: "noM_CONCEPTO",
            headerName: "Concepto",
            width: 500,
            valueGetter: (params) => `${params.row?.dConceptoPlanilla?.noM_CONCEPTO}`,
        },
        {
            field: "inD_TIPOCONCEPTO",
            headerName: "Tipo",
            width: 200,
            valueGetter: (params) => {
                if (params.row?.dConceptoPlanilla?.inD_TIPOCONCEPTO === "1") return "INGRESO"
                if (params.row?.dConceptoPlanilla?.inD_TIPOCONCEPTO === "2") return "EGRESO"
                if (params.row?.dConceptoPlanilla?.inD_TIPOCONCEPTO === "3") return "APORTE"
            },
        }
    ];

    const destroy = async (event, id) => {
        const resultado = await AlertDelete();
        if (resultado) {
            const dataDelete = {
                'coD_TRACON': id
            };
            await destroyWC(dataDelete);
            /* const response2 = await getTrabajadorConceptoByWorker(fields.coD_TRABAJADOR); */
            const response2 = await getTrabajadorSpreadsheet(fields.coD_TRABAJADOR, fields.coD_TIPOPLAN);
            filterConcepts(response2.listado)
            /* await getTrabajadorSpreadsheet(fields.coD_TRABAJADOR, fields.coD_TIPOPLAN); */
        }
    };

    const save = async () => {
        const response = await AddOrUpdateWorkerConcept(fields)
        if (response.code === 0) {
            handleChangeTest('nameC', '')
            handleChangeTest('nameW', fieldsTest.nameW)
/*             const response2 = await getTrabajadorConceptoByWorker(fields.coD_TRABAJADOR); */
            const response2 = await getTrabajadorSpreadsheet(fields.coD_TRABAJADOR, fields.coD_TIPOPLAN);
            filterConcepts(response2.listado)
            await AlertSuccess(`${response.message}`)
        } else {
            return await AlertError(`${response.message}`)
        }
        setFields({
            "coD_TRACON": 0,
            "coD_TIPOPLAN": fields.coD_TIPOPLAN,
            "coD_TRABAJADOR": fields.coD_TRABAJADOR,
            "coD_CONCEPTO": null,
            "moN_CONCEPTO": 0
        })
    }

    const columns3 = [
        {
            field: "Acciones",
            type: "actions",
            getActions: (cellValues) => [
                /*  */
                <IconToolTip text="Editar" icon={<EditIcon />} action={(event) => {
                    editWC(event, cellValues.row);
                }} />,
                /*  */
                /*  */
                <IconToolTip text="Desactivar" icon={<DeleteIcon />} action={(event) => {
                    destroy(event, cellValues.row?.coD_TRACON);
                }} />,
            ],
        },
        {
            field: "coD_CONCEPTO",
            headerName: "Código",
            width: 150,
            hide: true
        },
        {
            field: "noM_CONCEPTO",
            headerName: "Concepto",
            width: 500,
            valueGetter: (params) =>
                `${params.row?.dConceptoPlanilla?.noM_CONCEPTO}`,
        },
        {
            field: "moN_CONCEPTO",
            headerName: "Monto",
            width: 150,
        },
        {
            field: "inD_ESTADO", 
            headerName: 'Estado',
            width: 100
        },
        {
            field: "inD_TIPOCONCEPTO",
            headerName: "Tipo",
            width: 200,
            valueGetter: (params) => {
                if (params.row?.dConceptoPlanilla?.inD_TIPOCONCEPTO === "1") return "INGRESO"
                if (params.row?.dConceptoPlanilla?.inD_TIPOCONCEPTO === "2") return "EGRESO"
                if (params.row?.dConceptoPlanilla?.inD_TIPOCONCEPTO === "3") return "APORTE"
            },
        }
    ];

    return (
        <>
            <Grid container spacing={1}>
                <Grid item md={12} xs={12} sm={12}>
                    <Stack
                        direction="row"
                        spacing={1} xs={{ mb: 1, display: 'flex' }}
                    >
                        <div>
                            <h1>Trabajador y Concepto</h1>
                        </div>
                    </Stack>
                    <br />
                    <Stack direction="row" spacing={1} xs={{ mb: 1, display: "flex" }} marginBottom={3}>
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
                                {responseTypePlan &&
                                    responseTypePlan.map(data => (
                                        <MenuItem value={data.coD_TIPOPLAN}>
                                            {data.noM_TIPOPLAN}
                                        </MenuItem>
                                    ))}
                            </TextField>
                        </Grid>
                        <Grid item md={3} sm={12} xs={12}>
                            <TextField
                                name="coD_TIPOPLAN"
                                fullWidth
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                size="small"
                                label="Subtipo Planilla"
                                onChange={handleInputChange}
                                value={fields.coD_TIPOPLAN}
                                select
                            >
                                {responseSubTypePlan &&
                                    responseSubTypePlan.map(data => (
                                        <MenuItem value={data.coD_TIPOPLAN}>
                                            {data.noM_TIPOPLAN}
                                        </MenuItem>
                                    ))}
                            </TextField>
                        </Grid>
                        <Grid item md={3} sm={12} xs={12}>
                            <Button
                                size="large"
                                variant="outlined"
                                onClick={captureEvent}
                            >
                                <span>Buscar</span>
                            </Button>
                        </Grid>
                    </Stack>

                </Grid>
            </Grid>
            <br />
            <Grid container spacing={1}>
                <Grid item md={5} sm={12} xs={12}>
                    <h3>Trabajador</h3>
                    <DataGridDemo
                        id={(row) => row.coD_PLATRA}
                        rows={data}
                        columns={columns}
                        height={'60vh'}
                    />
                </Grid>
                <Grid item md={1} sm={12} xs={12}></Grid>
                <Grid item md={5} sm={12} xs={12}>
                    <h3>Conceptos para seleccionar</h3>
                    <DataGridDemo
                        id={(row) => row.coD_PLACON}
                        rows={data2}
                        columns={columns2}
                        height={'60vh'}
                    />
                </Grid>
            </Grid>
            <br />
            <br />
            <h3>Conceptos ya seleccionados</h3>
            <Grid container spacing={1}>
                <Grid item md={8} sm={12} xs={12}>

                    <DataGridDemo
                        id={(row) => row.coD_TRACON}
                        rows={data3}
                        columns={columns3}
                        height={'60vh'}
                    />
                </Grid>
                <Grid item md={4} sm={12} xs={12}>
                    <Grid item md={12} xs={6}>
                        <TextField
                            value={fieldsTest.nameW}
                            fullWidth
                            label="Nombre trabajador"
                        />
                    </Grid>
                    <br />
                    <Grid item md={12} xs={6}>
                        <TextField
                            onChange={handleChangeTest}
                            value={fieldsTest.nameC}
                            fullWidth
                            label="Nombre concepto"
                        />
                    </Grid>
                    <br />
                    <Grid item md={12} xs={6}>
                        <TextField
                            name="moN_CONCEPTO"
                            onChange={handleInputChange}
                            value={fields.moN_CONCEPTO}
                            fullWidth
                            label="Monto"
                            type="number"
                        />
                    </Grid>
                    <br />
                    <Grid item md={12} xs={6}>
                        <TextField
                            name="inD_ESTADO"
                            onChange={handleInputChange}
                            value={fields.inD_ESTADO}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            fullWidth
                            label="Estado"
                            select
                        >
                            <MenuItem value={null}>
                                -
                            </MenuItem>
                            <MenuItem value="A">
                                Activo
                            </MenuItem>
                            <MenuItem value="I">
                                Inactivo
                            </MenuItem>
                        </TextField>

                    </Grid>
                    <br />
                    <Grid item md={12} xs={6}>
                        <Button variant="contained" onClick={save}>
                            Guardar
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
        </>
    )

}


export default WorkerAndConcept;