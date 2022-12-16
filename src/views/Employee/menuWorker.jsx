import { useState } from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import RegisterSteps from '../../components/Employee/RegisterSteps';
import { useParams, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { Button, Stack } from "@mui/material";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { getWorker } from '../../service/worker';
import { getPerson } from '../../service/person';
import RegisterChild from '../../components/Employee/RegisterChild';
import RegisterExp from '../../components/Employee/RegisterExp';
import RegisterEducate from '../../components/Employee/RegisterEducate';
import RegisterAction from '../../components/Employee/RegisterAction';
import RegisterDocument from '../../components/Employee/RegisterDocument';


function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: "20px 0px 0px 0px" }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

export default function BasicTabs() {

    const [value, setValue] = useState(0);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const [dataWorker, setDataWorker] = useState({});
    const [dataPerson, setDataPerson] = useState({});
    const { id } = useParams();
    const navigate = useNavigate();

    const navigateBack = () => {
        navigate(-1)
    }

    const loadData = async () => {
        if (id === 0) {
            navigate("/trabajador")
        }

        const response = await getWorker(id);
        const responsePerson = await getPerson(response.listado[0]['coD_PERS'])
        setDataPerson(
            responsePerson.listado[0]
        )
        setDataWorker({
            coD_TRABAJADOR: response.listado[0]['coD_TRABAJADOR'],
            coD_PERS: response.listado[0]['coD_PERS'],
            coD_UORG: response.listado[0]['coD_UORG'],
            feC_INGRESO: response.listado[0]['feC_INGRESO'],
            inD_ESTADO: response.listado[0]['inD_ESTADO'],
            coD_CAR: response.listado[0]['coD_CAR'],
            feC_CESE: response.listado[0]['feC_CESE'],
            coD_PUESTO: response.listado[0]['coD_PUESTO'],
            coD_CONDICION: response.listado[0]['coD_CONDICION'],
            coD_TIPOTRABAJ: response.listado[0]['coD_TIPOTRABAJ'],
            coD_AFP: response.listado[0]['coD_AFP'],
            nuM_PLAZA: response.listado[0]['nuM_PLAZA'],
            coD_BCOSUELDO: response.listado[0]['coD_BCOSUELDO'],
            nuM_CTASUELDO: response.listado[0]['nuM_CTASUELDO'],
            nuM_CCI: response.listado[0]['nuM_CCI'],
            coD_BCOCTS: response.listado[0]['coD_BCOCTS'],
            nuM_CTACTS: response.listado[0]['nuM_CTACTS'],
            coD_CUSPP: response.listado[0]['coD_CUSPP'],
            inD_REGLABORAL: response.listado[0]['inD_REGLABORAL'],
            inD_REGPENSION: response.listado[0]['inD_REGPENSION'],
            coD_TURNO: response.listado[0]['coD_TURNO'],
            coD_ESSALUD: response.listado[0]['coD_ESSALUD'],
            feC_CUSPP: response.listado[0]['feC_CUSPP'],
            coD_SEGSALUD: response.listado[0]['coD_SEGSALUD'],
            coD_REGLABORAL: response.listado[0]['coD_REGLABORAL'],
            coD_REGPENSION: response.listado[0]['coD_REGPENSION'],
            coD_OCUPLABORAL: response.listado[0]['coD_OCUPLABORAL'],
            coD_CATOCUPACION: response.listado[0]['coD_CATOCUPACION'],
            inD_DISCAPACIDAD: response.listado[0]['inD_DISCAPACIDAD'],
            inD_SINDICALIZADO: response.listado[0]['inD_SINDICALIZADO'],
            inD_SITESPECIAL: response.listado[0]['inD_SITESPECIAL'],
            inD_DOBLETRIBUTO: response.listado[0]['inD_DOBLETRIBUTO'],
            inD_TIPOPAGO: response.listado[0]['inD_TIPOPAGO'],
            inD_PLAME: response.listado[0]['inD_PLAME'],
            obS_TRABAJADOR: response.listado[0]['obS_TRABAJADOR'],
            inD_NOSEGUROAFP: response.listado[0]['inD_NOSEGUROAFP'],
            nrO_CONTRATO: response.listado[0]['nrO_CONTRATO'],
            feC_INI_CONTRATO: response.listado[0]['feC_INI_CONTRATO'],
            feC_FIN_CONTRATO: response.listado[0]['feC_FIN_CONTRATO'],
        })
    }

    useEffect(() => {
        loadData();
    }, []);

    return (
        <Box sx={{ width: '100%' }}>
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
            <Stack
                direction="row"
                spacing={1}
                style={{ marginBottom: 30 }}
            >
                <span style={{ fontSize: 20, fontWeight: "bolder" }}>Trabajador:</span> <span style={{ fontSize: 20 }}>{dataPerson.deS_APELLP} {dataPerson.deS_APELLM} {dataPerson.noM_PERS}</span>
            </Stack>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                    <Tab label="Datos Laborales" />
                    <Tab label="Carga Familiar" />
                    <Tab label="Experienca Laboral" />
                    <Tab label="Educación" />
                    <Tab label="Acciones Laborales" />
                    <Tab label="Documentos" />
                </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
                <RegisterSteps dataWorker={dataWorker} back={navigateBack} />
            </TabPanel>
            <TabPanel value={value} index={1} back={navigateBack}>
                <RegisterChild id={id} />
            </TabPanel>
            <TabPanel value={value} index={2}>
                <RegisterExp id={id} />
            </TabPanel>
            <TabPanel value={value} index={3}>
                <RegisterEducate id={id} />
            </TabPanel>
            <TabPanel value={value} index={4}>
                <RegisterAction id={id} />
            </TabPanel>
            <TabPanel value={value} index={5}>
                <RegisterDocument id={id} />
            </TabPanel>
        </Box>
    );
}
