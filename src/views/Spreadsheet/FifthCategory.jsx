import { useState } from "react";
import { useEffect } from "react";
import { getConcept, getSubTypePlan, getTypePlan, getTrabajadorQuintaCategoria } from "../../service/common";

import { GetByPeriodoMesTra, GetByPeriodoMesTra2, AddOrUpdateQuintaCategoria, deleteQuintaCategoria } from "../../service/spreadsheet/fifthcategory";/* aquí va fifthcategory - Servicios por hacer*/

import { AddOrUpdateWorkerConcept, destroyWC, getTrabajadorSpreadsheet } from "../../service/spreadsheet/WorkerAndConcept";/* aquí va fifthcategory - Servicios por hacer*/
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


const FifthCategory = () => {

    const [data, setData] = useState([]);
    const [fullname, setFullName] = useState("");
    const [fields, setFields] = useState({
        coD_TRAQUI: 0,
        nuM_PERIODO: `${new Date().getFullYear()}`,
        nuM_PERPLAN: `${new Date().getMonth()}`,
        coD_TRABAJADOR: null,
        coD_CONCEPTO: null,
        moN_CONCEPTO : null,
        inD_ESTADO: "A",
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

    const edit = async (row) => {

        if (row.dPersona) {
            setFullName(row.dPersona.deS_APELLP+" "+row.dPersona.deS_APELLM+" "+row.dPersona.noM_PERS); 
        }

        fields.coD_TRABAJADOR = row.coD_TRABAJADOR;

        const requestQuintaConcepto = {
            coD_TRABAJADOR: row.coD_TRABAJADOR,
            nuM_PERIODO: fields.nuM_PERIODO,
            nuM_PERPLAN: fields.nuM_PERPLAN
        }

        const response = await GetByPeriodoMesTra(requestQuintaConcepto);
        const response2 = await GetByPeriodoMesTra2(requestQuintaConcepto);

        setData3(response.listado);
        setData2(response2.listado);
    }

    const editWC = async (event, row) => {
        fields.coD_TRAQUI= row.coD_TRAQUI;
        fields.nuM_PERIODO = row.nuM_PERIODO;
        fields.nuM_PERPLAN = row.nuM_PERPLAN;
        fields.coD_TRABAJADOR = row.coD_TRABAJADOR;
        fields.coD_CONCEPTO = row.coD_CONCEPTO;
        fields.moN_CONCEPTO = row?.moN_CONCEPTO;
        fields.inD_ESTADO = row?.inD_ESTADO
        handleChangeTest('nameC', row?.noM_CONCEPTO)
    }

    const editConcept = async (event, row) => {
        console.log(row);
        fields.coD_CONCEPTO = row?.coD_CONCEPTO;
        fields.moN_CONCEPTO = 0;
        handleChangeTest('nameC', row?.noM_CONCEPTO)
    }

    const handleChangeTest = (name, value) => {
        setFieldsTest({ ...fieldsTest, [name]: value });
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFields({ ...fields, [name]: value });

    };
    const handleInputChangeMes = (event) => {
        const { name, value } = event.target;
        setFields({ ...fields, [name]: value });
        setData2([]);
        setData3([]);
        setFullName("");
    };

    const loadData = async () => {
        const response = await getTrabajadorQuintaCategoria();
        setData(response.listado)
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
                    action={() => {
                        edit(cellValues.row);
                    }}
                />,
            ],
        },
        {
            field: "coD_TRABAJADOR",
            headerName: "Código",
            width: 150,
            hide: false
        },
        {
            field: "full_name",
            headerName: "Nombre completo",
            width: 400,
            valueGetter: (params) =>
                `${params.row?.dPersona?.deS_APELLP || ""} ${params.row?.dPersona?.deS_APELLM || ""} ${params.row?.dPersona?.noM_PERS || ""
                }`,
        }
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
        },
        {
            field: "noM_CONCEPTO",
            headerName: "Concepto",
            width: 500,
        }
    ];

    const destroy = async (event, id) => {
        const resultado = await AlertDelete();
        if (resultado) {
            const dataDelete = {
                'coD_TRAQUI': id
            };
            setFields({
                coD_TRAQUI: 0,
                coD_TRABAJADOR: fields.coD_TRABAJADOR,
                nuM_PERIODO: fields.nuM_PERIODO,
                nuM_PERPLAN: fields.nuM_PERPLAN,
                coD_CONCEPTO: 0,
                moN_CONCEPTO : 0,
                inD_ESTADO: "A",
            })

            await deleteQuintaCategoria(dataDelete);
            edit(fields);

        }
        
    };

    const save = async () => {
        // const response = await AddOrUpdateWorkerConcept(fields)
        console.log(fields);
        const response = await AddOrUpdateQuintaCategoria(fields);

        if (response.code === 0) {
            edit(fields);
            handleChangeTest('nameC', '');
            await AlertSuccess(`${response.message}`)

        } else {
            return await AlertError(`${response.message}`)
        }

        setFields({
            coD_TRAQUI: 0,
            coD_TRABAJADOR: fields.coD_TRABAJADOR,
            nuM_PERIODO: fields.nuM_PERIODO,
            nuM_PERPLAN: fields.nuM_PERPLAN,
            coD_CONCEPTO: 0,
            moN_CONCEPTO : 0,
            inD_ESTADO: "A",
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
                    destroy(event, cellValues.row?.coD_TRAQUI);
                }} />,
            ],
        },
        {
            field: "coD_TRAQUI",
            headerName: "Código",
            width: 150,
            hide: false
        },
        {
            field: "inD_ESTADO",
            headerName: "ESTADO",
            width: 150,
            hide: true
        },
        {
            field: "noM_CONCEPTO",
            headerName: "Concepto",
            width: 500,
            // valueGetter: (params) =>
            //     `${params.row?.dConceptoPlanilla?.noM_CONCEPTO}`,
        },
        {
            field: "moN_CONCEPTO",
            headerName: "Monto",
            width: 150,
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
                            <h1>Quinta Categoría</h1>
                        </div>
                    </Stack>
                    <br />
                    <Stack direction="row" spacing={1} xs={{ mb: 1, display: "flex" }} marginBottom={3}>
                        <Grid item md={3} sm={12} xs={12}>
                            <TextField
                                name="nuM_PERIODO"
                                fullWidth
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                size="small"
                                inputProps={{ maxlength: "4" }}
                                type="number"
                                label="N° Periodo"
                                onChange={handleInputChangeMes}
                                value={fields.nuM_PERIODO}
                            />
                        </Grid>
                        <Grid item md={3} sm={12} xs={12}>
                            <TextField
                                name="nuM_PERPLAN"
                                fullWidth
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                size="small"
                                label="Mes"
                                select
                                onChange={handleInputChangeMes}
                                value={fields.nuM_PERPLAN}
                            >
                                <MenuItem value="01">ENERO</MenuItem>
                                <MenuItem value="02">FEBRERO</MenuItem>
                                <MenuItem value="03">MARZO</MenuItem>
                                <MenuItem value="04">ABRIL</MenuItem>
                                <MenuItem value="05">MAYO</MenuItem>
                                <MenuItem value="06">JUNIO</MenuItem>
                                <MenuItem value="07">JULIO</MenuItem>
                                <MenuItem value="08">AGOSTO</MenuItem>
                                <MenuItem value="09">SEPTIEMBRE</MenuItem>
                                <MenuItem value="10">OCTUBRE</MenuItem>
                                <MenuItem value="11">NOVIEMBRE</MenuItem>
                                <MenuItem value="12">DICIEMBRE</MenuItem>
                            </TextField>
                        </Grid>
                        {/* <Grid item md={3} sm={12} xs={12}>
                            <Button
                                size="large"
                                variant="outlined"
                                onClick={captureEvent}
                            >
                                <span>Buscar</span>
                            </Button>
                        </Grid> */}
                    </Stack>

                </Grid>
            </Grid>
            <br />
            <Grid container spacing={1}>
                <Grid item md={5} sm={12} xs={12}>
                    <h3>Trabajador</h3>
                    <DataGridDemo
                        id={(row) => row.coD_TRABAJADOR}
                        rows={data}
                        columns={columns}
                        height={'60vh'}
                    />
                </Grid>
                <Grid item md={1} sm={12} xs={12}></Grid>
                <Grid item md={5} sm={12} xs={12}>
                    <h3>Conceptos para seleccionar</h3>
                    <DataGridDemo
                        id={(row) => row.coD_CONCEPTO}
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
                        id={(row) => row.coD_TRAQUI}
                        rows={data3}
                        columns={columns3}
                        height={'60vh'}
                    />
                </Grid>
                <Grid item md={4} sm={12} xs={12}>
                    <Grid item md={12} xs={6}>
                        <TextField
                            value={fullname}
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
                            InputLabelProps={{
                                shrink: true,
                            }}
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


export default FifthCategory;