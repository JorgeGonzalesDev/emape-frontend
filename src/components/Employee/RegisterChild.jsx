import { Grid, TextField, MenuItem, Button, Tooltip, IconButton, Autocomplete } from "@mui/material";
import { useState, useEffect, useRef } from "react";
import MUIModal from "../../components/Modal";
import { deleteOneFamWorker, getFamWorker, getOneFamWorker } from "../../service/worker";
import { AlertError, AlertSuccess} from "../Alerts";
import DataGridDemo from "../Table";
import EditIcon from "@mui/icons-material/Edit";
import PersonOffIcon from "@mui/icons-material/PersonOff";
import { AlertDelete } from "../Alerts";
import FamilyRestroomIcon from '@mui/icons-material/FamilyRestroom';
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
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { listPerson } from "../../service/person";
import { getTipoPariente, getBanks, getConcept } from "../../service/common";
import { AddOrUpdateFamWorker } from "../../service/worker";
import { AlertWarning } from "../../components/Alerts";
import Box from '@mui/material/Box';

var XLSX = require("xlsx");

const RegisterSteps = ({
    id,
}) => {

    function CustomToolbar() {
        return (
            <GridToolbarContainer>
                <Button size="small" variant="text" onClick={OpenRegister}>
                    <FamilyRestroomIcon />
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
                    "coD_TRAFAM",
                    "full_name",
                    "Parentesco",
                    ],
                }}
                />
            </GridToolbarContainer>
        );
    }

    const [fields, setFields] = useState({
        "coD_TRAFAM": 0,
        "coD_TRABAJADOR": id,
        "coD_PERS": 0,
        "coD_TIPPARIENTE": null,
        "inD_DEPENDE": null,
        "inD_JUDICIAL": null,
        "inD_CALCULO": null,
        "moN_FIJO": null,
        "prC_JUDICIAL": null,
        "coD_CTABCO": null,
        "coD_BANCO": null,
        "nuM_CCI": null,
        "inD_DISCAPACIDAD": null,
        "inD_ESTUDIO": null,
        "txT_OBSERV": null,
        "coD_CONCEPTO":null,
        "inD_BENEFICIO": null
    });

    const defaultErrors = {
        /* colocar campos que son obligatorios true*/
        coD_TRABAJADOR: true,
        coD_PERS: true,
        coD_TIPPARIENTE: true,
      };

    const levelEducateChild = useRef();
    const [data, setData] = useState([]);
    const [bank, setBank] = useState([]);
    const [responseConcept, setResponseConcept] = useState([]);
    const [data2, setData2] = useState([]);
    const [inputError, setInputError] = useState({
        coD_TRABAJADOR: false,
        coD_PERS: false,
        coD_TIPPARIENTE: false,
      });
    const [tipoPariente, setTipoPariente] = useState([]);
    const loadData = async () => {
        const response = await getFamWorker(id);
        if (response.listado === null) {
            setData([])
        } else {
            setData(response.listado);
        }
        const response2 = await listPerson();
        const responseTipo = await getTipoPariente();
        setTipoPariente(responseTipo.listado)
        setData2(response2.listado);
        const response3 = await getBanks();
        setBank(response3.listado);
        const responseConcept = await getConcept();
        setResponseConcept(responseConcept.listado);
    }

    const validateFields = () => {

        const copyFields = { ...fields };
        delete copyFields.coD_TRAFAM;
        delete copyFields.inD_DEPENDE;
        delete copyFields.inD_JUDICIAL;
        delete copyFields.inD_CALCULO;
        delete copyFields.moN_FIJO;
        delete copyFields.prC_JUDICIAL;
        delete copyFields.coD_CTABCO;
        delete copyFields.coD_BANCO;
        delete copyFields.nuM_CCI;
        delete copyFields.inD_DISCAPACIDAD;
        delete copyFields.inD_ESTUDIO;
        delete copyFields.txT_OBSERV;
    
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

    const edit = async (event, id) => {
        const response = await getOneFamWorker(id);
        setInputError({
            coD_TRABAJADOR: false,
            coD_PERS: false,
            coD_TIPPARIENTE: false,
        })
        setNamePerson(`${response.listado[0].dPersona.deS_APELLP} ${response.listado[0].dPersona.deS_APELLM} ${response.listado[0].dPersona.noM_PERS}`)
        fields.coD_TRAFAM = response.listado[0].coD_TRAFAM
        fields.coD_PERS = response.listado[0].coD_PERS
        fields.coD_TIPPARIENTE = response.listado[0].coD_TIPPARIENTE
        fields.inD_DEPENDE = response.listado[0].inD_DEPENDE
        fields.inD_JUDICIAL = response.listado[0].inD_JUDICIAL
        fields.inD_CALCULO= response.listado[0].inD_CALCULO
        fields.moN_FIJO= response.listado[0].moN_FIJO
        fields.prC_JUDICIAL= response.listado[0].prC_JUDICIAL
        fields.coD_CTABCO=response.listado[0].coD_CTABCO
        fields.coD_BANCO=response.listado[0].coD_BANCO
        fields.nuM_CCI=response.listado[0].nuM_CCI
        fields.inD_DISCAPACIDAD = response.listado[0].inD_DISCAPACIDAD
        fields.inD_ESTUDIO = response.listado[0].inD_ESTUDIO
        fields.txT_OBSERV = response.listado[0].txT_OBSERV
        fields.coD_CONCEPTO= response.listado[0].coD_CONCEPTO
        fields.inD_BENEFICIO= response.listado[0].inD_BENEFICIO
        levelEducateChild.current.handleOpen();
    }

    const destroy = async (event, id) => {

        const resultado = await AlertDelete("¿Estas seguro de esta acción?");
        if (resultado) {
            const request = {
                "coD_TRAFAM": id
            }
            await deleteOneFamWorker(request);
            await loadData()
        }

    }

    useEffect(() => {
        loadData();
    }, []);

    const handleInputChange = event => {

        const { name, type, checked, value } = event.target;

        const val = type === 'checkbox' ? checked : value;

        setFields({
            ...fields,
            [name]: val,
        });

    }

    const OpenRegister = async () => {
        setNamePerson("")
        fields.coD_TRAFAM = 0
        fields.coD_PERS = 0
        fields.coD_TIPPARIENTE = null
        fields.inD_DEPENDE = null
        fields.inD_JUDICIAL = null
        fields.inD_CALCULO = null
        fields.moN_FIJO = null
        fields.prC_JUDICIAL = null
        fields.coD_CTABCO = null
        fields.coD_BANCO = null
        fields.nuM_CCI = null
        fields.inD_DISCAPACIDAD = null
        fields.inD_ESTUDIO = null
        fields.txT_OBSERV = null
        fields.coD_CONCEPTO = null
        fields.inD_BENEFICIO = null
        setInputError(defaultErrors)
        levelEducateChild.current.handleOpen();
    };

    const [namePerson, setNamePerson] = useState("");

    const handleFields = async () => {
        const validate = validateFields();
        if (!validate) return;
        
        const response = await AddOrUpdateFamWorker(fields)

        if (response.code === 0) {
            await loadData();
            levelEducateChild.current.handleClose();
            await AlertSuccess(`${response.message}`)
            namePerson = ""
            fields.coD_TRAFAM = 0
            fields.coD_PERS = 0
            fields.coD_TIPPARIENTE = null
            fields.inD_DEPENDE = null
            fields.inD_JUDICIAL = null
            fields.inD_CALCULO = null
            fields.moN_FIJO = null
            fields.prC_JUDICIAL = null
            fields.coD_CTABCO = null
            fields.coD_BANCO = null
            fields.nuM_CCI = null
            fields.inD_DISCAPACIDAD = null
            fields.inD_ESTUDIO = null
            fields.txT_OBSERV = null
            fields.coD_CONCEPTO = null
            fields.inD_BENEFICIO = null

        } else {
            levelEducateChild.current.handleClose();
            return await AlertError(`${response.message}`)
        }

    }

    const columns2 = [
        {
            field: "acciones",
            type: "actions",
            disableExport: true,
            getActions: (cellValues) => [
                <GridActionsCellItem
                    onClick={async () => {
                        setNamePerson(`${cellValues.row?.deS_APELLP} ${cellValues.row?.deS_APELLM} ${cellValues.row?.noM_PERS}`)
                        fields.coD_PERS = cellValues.row.coD_PERS
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
            headerName: "DNI",
            width: 160,
        }
    ];

    const columns = [
        {
            field: "acciones",
            type: "actions",
            disableExport: false,
            getActions: (cellValues) => [

                <Tooltip title="Editar">
                    <IconButton
                        onClick={(event) => {
                            edit(event, cellValues.row?.coD_TRAFAM);
                        }}>
                        <EditIcon />
                    </IconButton>
                </Tooltip>
                ,
                <Tooltip title="Desactivar">
                    <IconButton onClick={(event) => {
                        destroy(event, cellValues.row?.coD_TRAFAM);
                    }}>
                        <PersonOffIcon />
                    </IconButton>
                </Tooltip>,
            ],
        },
        {
            field: "coD_TRAFAM",
            headerName: "Código",
            width: 120,
        },
        {
            field: "full_name",
            headerName: "Apellidos y Nombres",
            width: 400,
            valueGetter: (params) =>
                `${params.row?.dPersona?.deS_APELLP || ""} ${params.row.dPersona?.deS_APELLM || ""} ${params.row?.dPersona?.noM_PERS || ""}`,
        },
        {
            field: "Parentesco",
            headerName: "Parentesco",
            width: 160,
            valueGetter: (params) =>
                `${params.row?.dTipoPariente?.noM_TIPPARIENTE}`
        },
    ];

    
  const downloadExcel = (dataExport) => {
    var Headers = [["INFORMACIÓN DE CARGA FAMILIAR"]];
    let nData = [];
    dataExport.forEach((item) => {
      nData.push({
        Código: item?.coD_TRAFAM,
        "Apellidos y nombres": item?.full_name,
        Parentesco: item?.Parentesco,
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
    XLSX.utils.book_append_sheet(workBook, workSheet, "Carga Familiar");
    XLSX.write(workBook, { bookType: "xlsx", type: "buffer" });
    XLSX.write(workBook, { bookType: "xlsx", type: "binary" });
    XLSX.writeFile(workBook, "ReporteCargaFamiliar.xlsx");
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

    return (
        <>
            <Grid container spacing={1}>
                <Grid item md={12} xs={12} sm={12}>
                    <Grid item md={12}>
                        <DataGridDemo
                            id={(row) => row?.coD_TRAFAM}
                            rows={data}
                            columns={columns}
                            toolbar={CustomToolbar}
                        />
                    </Grid>
                </Grid>
            </Grid>
            <MUIModal ref={levelEducateChild}>
                <Grid container spacing={1} >

                    <Grid item md={6} sm={12} xs={12}>
                        <TextField
                            name="namePersona"
                            fullWidth
                            InputLabelProps={{
                                readOnly: true
                            }}
                            error={inputError.coD_PERS}
                            label="Nombres y apellidos"
                            type="text"
                            size="small"
                            value={namePerson}
                        />
                    </Grid>
                    <Grid item md={4} sm={12} xs={12}>
                        <TextField
                            name="coD_TIPPARIENTE"
                            fullWidth
                            InputLabelProps={{
                                shrink: true
                            }}
                            error={inputError.coD_TIPPARIENTE}
                            size="small"
                            select
                            label="Parentesco"
                            type="text"
                            onChange={handleInputChange}
                            value={fields.coD_TIPPARIENTE}
                        >
                            <MenuItem value="0" disabled>
                                Sin especificar
                            </MenuItem>
                            {tipoPariente &&
                                tipoPariente.map(tipoPariente => (
                                    <MenuItem value={tipoPariente.coD_TIPPARIENTE}>
                                        {tipoPariente.noM_TIPPARIENTE}
                                    </MenuItem>
                                ))}
                        </TextField>
                    </Grid>
                    <Grid item md={12} />
                    <Grid
                        item md={2} sm={12} xs={12}>
                        <TextField
                            name="inD_DEPENDE"
                            fullWidth
                            InputLabelProps={{
                                shrink: true
                            }}
                            size="small"
                            select
                            label="Dependiente"
                            type="text"
                            onChange={handleInputChange}
                            value={fields.inD_DEPENDE}
                        >
                            <MenuItem value="S">
                                Sí
                            </MenuItem>
                            <MenuItem value="N">
                                No
                            </MenuItem>
                        </TextField>
                    </Grid>
                    <Grid
                        item md={2} sm={12} xs={12}>
                        <TextField
                            name="inD_JUDICIAL"
                            fullWidth
                            InputLabelProps={{
                                shrink: true
                            }}
                            size="small"
                            select
                            label="Carga Judicial"
                            type="text"
                            onChange={handleInputChange}
                            value={fields.inD_JUDICIAL}
                        >
                            <MenuItem value="S">
                                Sí
                            </MenuItem>
                            <MenuItem value="N">
                                No
                            </MenuItem>
                        </TextField>
                    </Grid>
                    <Grid
                        item md={2} sm={12} xs={12}>
                        <TextField
                            name="inD_DISCAPACIDAD"
                            fullWidth
                            InputLabelProps={{
                                shrink: true
                            }}
                            size="small"
                            select
                            label="Discapacidad"
                            type="text"
                            onChange={handleInputChange}
                            value={fields.inD_DISCAPACIDAD}
                        >
                            <MenuItem value="1">
                                Si
                            </MenuItem>
                            <MenuItem value="0">
                                No
                            </MenuItem>
                        </TextField>
                    </Grid>
                    <Grid
                        item md={2} sm={12} xs={12}>
                        <TextField
                            name="inD_ESTUDIO"
                            fullWidth
                            InputLabelProps={{
                                shrink: true
                            }}
                            size="small"
                            select
                            label="Estudia"
                            type="text"
                            onChange={handleInputChange}
                            value={fields.inD_ESTUDIO}
                        >

                            <MenuItem value="1">
                                Si
                            </MenuItem>
                            <MenuItem value="0">
                                No
                            </MenuItem>
                        </TextField>
                    </Grid>
                    <Grid item md={12} />
                    <Grid item md={12} sm={12} xs={12}>
                        <TextField
                            name="txT_OBSERV"
                            multiline
                            fullWidth
                            InputLabelProps={{
                                readOnly: true
                            }}
                            inputProps={{ maxLength: 100 }}
                            label="Observaciones"
                            type="text"
                            onChange={handleInputChange}
                            size="small"
                            value={fields.txT_OBSERV}
                        />
                    </Grid>
                    <Grid item md={12} />
                    <Grid item md={4} sm={12} xs={12}>
                        <TextField
                            name="inD_CALCULO"
                            multiline
                            fullWidth
                            InputLabelProps={{
                                readOnly: true
                            }}
                            label="Tipo Carga Judicial"
                            select
                            onChange={handleInputChange}
                            size="small"
                            value={fields.inD_CALCULO}
                        >
                            <MenuItem value="V">Monto Fijo</MenuItem>
                            <MenuItem value="P">Porcentaje</MenuItem>
                        </TextField>
                    </Grid>
                    <Grid item md={4} sm={12} xs={12}>
                        <TextField
                            name="moN_FIJO"
                            multiline
                            fullWidth
                            InputLabelProps={{
                                readOnly: true
                            }}
                            type='number'
                            inputProps={{ maxLength: 50}}
                            label="Monto Fijo"
                            onChange={handleInputChange}
                            size="small"
                            value={fields.moN_FIJO}
                        />
                    </Grid>
                    <Grid item md={4} sm={12} xs={12}>
                        <TextField
                            name="prC_JUDICIAL"
                            multiline
                            fullWidth
                            InputLabelProps={{
                                readOnly: true
                            }}
                            type='number'
                            inputProps={{ maxLength: 100}}
                            label="Porcentaje (%)"
                            onChange={handleInputChange}
                            size="small"
                            value={fields.prC_JUDICIAL}
                        />
                    </Grid>
                    <Grid item md={12} />
                    <Grid item md={4} sm={12} xs={12}>
                        <TextField
                            name="coD_CTABCO"
                            multiline
                            fullWidth
                            InputLabelProps={{
                                readOnly: true
                            }}
                            type='number'
                            inputProps={{ maxLength: 25 }}
                            label="Cuenta Banco"
                            onChange={handleInputChange}
                            size="small"
                            value={fields.coD_CTABCO}
                        />
                    </Grid>
                    <Grid item md={4} sm={12} xs={12}>
                        <TextField
                            name="coD_BANCO"
                            multiline
                            fullWidth
                            InputLabelProps={{
                                readOnly: true
                            }}
                            label="Código Banco"
                            onChange={handleInputChange}
                            size="small"
                            select
                            value={fields.coD_BANCO}
                        >
                            {bank &&
                            bank.map(data => (
                                <MenuItem value={data.coD_BANCO}>
                                {data?.noM_BANCO}
                                </MenuItem>
                            ))}
                    </TextField>
                    </Grid>
                    <Grid item md={4} sm={12} xs={12}>
                        <TextField
                            name="nuM_CCI"
                            multiline
                            fullWidth
                            InputLabelProps={{
                                readOnly: true
                            }}
                            type='number'
                            inputProps={{ maxLength: 20 }}
                            label="CCI"
                            onChange={handleInputChange}
                            size="small"
                            value={fields.nuM_CCI}
                        />
                    </Grid>
                    {/*  */}
                    <Grid item md={4} sm={12} xs={12}>
                        <Autocomplete
                            id="coD_CONCEPTO"
                            getOptionLabel={(responseConcept) => `${responseConcept.noM_CONCEPTO}`}
                            options={responseConcept}
                            disableClearable
                            onChange={(event, value) => setFields({ ...fields, ['coD_CONCEPTO']: value['coD_CONCEPTO'] })}
                            isOptionEqualToValue={(option, value) => option.noM_CONCEPTO === value.noM_CONCEPTO}
                            noOptionsText={"No encontrado"}
                            value={responseConcept.find((option) => option.coD_CONCEPTO === fields.coD_CONCEPTO)}
                            renderOption={(props, responseConcept) => (
                                <Box component='li' {...props} key={responseConcept.coD_CONCEPTO}>
                                {responseConcept.noM_CONCEPTO}
                                </Box>

                            )}
                            renderInput={(params) => <TextField {...params} size="small" label="Conceptos" />}
                        />
                    </Grid>
                    <Grid item md={4} sm={12} xs={12}>
                        <TextField
                            name="inD_BENEFICIO"
                            multiline
                            fullWidth
                            InputLabelProps={{
                                readOnly: true
                            }}
                            select
                            label="Raci. y Mov. (desc. judic.)"
                            onChange={handleInputChange}
                            size="small"
                            value={fields.inD_BENEFICIO}
                        >
                        <MenuItem value={'S'}>Si</MenuItem>
                        <MenuItem value={'N'}>No</MenuItem>

                        </TextField>
                    </Grid>
                    <Grid item md={12}>
                        <Button onClick={handleFields} variant="contained" >
                            Guardar
                        </Button>
                    </Grid>
                    <Grid item md={12} />
                    <Grid item md={12}>
                        <DataGridDemo
                            height='45vh'
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
export default RegisterSteps;