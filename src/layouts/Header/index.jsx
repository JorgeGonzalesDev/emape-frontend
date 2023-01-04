import { Fragment, useState, useEffect, useContext } from "react";
import { styled, useTheme } from "@mui/material/styles";
import ListSubheader from "@mui/material/ListSubheader";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { Button, Collapse } from "@mui/material";
import * as ROUTES from "../../contants/routes";
import { Link } from "react-router-dom";
import EngineeringIcon from "@mui/icons-material/Engineering";
import UserContext from "../../context/User/UserContext";
import jwt_decode from "jwt-decode";
import SchoolIcon from "@mui/icons-material/School";
import WorkIcon from "@mui/icons-material/Work";
import PersonIcon from "@mui/icons-material/Person";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";
import BadgeIcon from "@mui/icons-material/Badge";
import BrandingWatermarkOutlinedIcon from "@mui/icons-material/BrandingWatermarkOutlined";
import MenuContext from "../../context/Menu/Menu.Context";
import AccessTimeFilledIcon from "@mui/icons-material/AccessTimeFilled";
import SettingsIcon from "@mui/icons-material/Settings";
import HailIcon from "@mui/icons-material/Hail";
import AssignmentIcon from "@mui/icons-material/Assignment";
import SavingsIcon from "@mui/icons-material/Savings";
import SensorOccupiedIcon from "@mui/icons-material/SensorOccupied";
import ReceiptIcon from "@mui/icons-material/Receipt";
import ArticleIcon from "@mui/icons-material/Article";
import FeedIcon from "@mui/icons-material/Feed";
import ArchiveIcon from "@mui/icons-material/Archive";
const drawerWidth = 300;

//const of array of objects
const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  })
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

export default function PersistentDrawerLeft({ children }) {
  const theme = useTheme();
  const [open, setOpen] = useState(true);
  const [openmaestro, setOpenMaestro] = useState(false);
  const [openlegajo, setOpenLegajo] = useState(false);
  const [opengenerales, setOpenGenerales] = useState(false);
  const [openasistencia, setOpenAsistencia] = useState(false);
  const [openasistenciamaestro, setOpenAsistenciaMaestro] = useState(false);
  const [openconfiguracion, setOpenConfiguracion] = useState(false);
  const [openproceso, setOpenProceso] = useState(false);
  const [openInterface, setOpenInterface] = useState(false);
  const [opencalcularplanilla, setOpenCalcularPlanilla] = useState(false);
  const [openplanilla, setOpenPlanilla] = useState(false);
  const [openprocesospadre, setOpenProcesosPadre] = useState(false);
  const [openadministrativo, setOpenAdministrativo] = useState(false);
  const [openconfigplanilla, setOpenConfigPlanilla] = useState(false);
  const [openreportespadre, setOpenReportesPadre] = useState(false);
  const [openatrabajador, setOpenTrabajador] = useState(false);
  const [openregistro, setOpenRegistro] = useState(false);
  const [openregistros, setOpenRegistros] = useState(false);

  const { logout } = useContext(UserContext);
  const { loadMenu, menu } = useContext(MenuContext);
  const [userName, setUserName] = useState("");
  const [idUser, setIdUser] = useState("");
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  const handleClickMaestro = () => {
    setOpenMaestro(!openmaestro);
  };
  const handleClickLegajo = () => {
    setOpenLegajo(!openlegajo);
  };
  const handleClickGenerales = () => {
    setOpenGenerales(!opengenerales);
  };
  const handleClickAsistenciaMaestro = () => {
    setOpenAsistenciaMaestro(!openasistenciamaestro);
  };
  const handleClickConfiguracion = () => {
    setOpenConfiguracion(!openconfiguracion);
  };
  const handleClickProcesos = () => {
    setOpenProceso(!openproceso);
  };
  const handleClickCalculaPlanilla = () => {
    setOpenCalcularPlanilla(!opencalcularplanilla);
  };
  const handleClickAsistencia = () => {
    setOpenAsistencia(!openasistencia);
  };
  const handleClickPlanilla = () => {
    setOpenPlanilla(!openplanilla);
  };
  const handleClickConfigPlanilla = () => {
    setOpenConfigPlanilla(!openconfigplanilla);
  };
  const handleClickInterface = () => {
    setOpenInterface(!openInterface);
  };
  const handleClickProcesosPadre = () => {
    setOpenProcesosPadre(!openprocesospadre);
  };
  const handleClickAdministrativo = () => {
    setOpenAdministrativo(!openadministrativo);
  };
  const handleClickReportesPadre = () => {
    setOpenReportesPadre(!openreportespadre);
  };
  const handleClickTrabajador = () => {
    setOpenTrabajador(!openatrabajador);
  };
  const handleClickRegistro = () => {
    setOpenRegistro(!openregistro);
  };
  const handleClickRegistros = () => {
    setOpenRegistros(!openregistros);
  };
  const logoutBtn = () => {
    logout();
  };

  useEffect(() => {
    let token = localStorage.getItem("token");
    let decoded = jwt_decode(token);
    //get first element of object
    let name = Object.values(decoded)[0];
    let id = Object.values(decoded)[1];
    const seveId = async () => {
      await setIdUser(id);
    };
    seveId();
    loadMenu(id);
    setUserName(name);
  }, []);
  let menuFiltradoMaestros = menu.filter((item) => item.dMenu.coD_MENU <= 12);
  let menuFiltradoLegado = menu.filter(
    (item) => item.dMenu.coD_MENU === 14 || item.dMenu.coD_MENU === 15
  );
  let menuFiltradoAsistencia = menu.filter(
    (item) => item.dMenu.coD_MENU >= 18 && item.dMenu.coD_MENU <= 25
  );
  let menuFiltradoAsistenciaMaestro = menu.filter(
    (item) => item.dMenu.coD_MENU >= 18 && item.dMenu.coD_MENU <= 21
  );
  let menuFiltradoControl = menu.filter(
    (item) => item.dMenu.coD_MENU >= 23 && item.dMenu.coD_MENU <= 26 || (item.dMenu.coD_MENU === 49)
  );
  let menuFiltradoControlAsistencia = menu.filter(
    (item) => item.dMenu.coD_MENU >= 18 && item.dMenu.coD_MENU <= 21
  );
  let menuFiltradoPlantilla = menu.filter(
     (item) => (item.dMenu.coD_MENU >= 27 && item.dMenu.coD_MENU <= 36)
      // || (item.dMenu.coD_MENU >= 50 && item.dMenu.coD_MENU <= 52)
  );  
  let menuFiltradoConfiguracion = menu.filter(
    (item) => item.dMenu.coD_MENU >= 29 && item.dMenu.coD_MENU <= 32
  );
  let menuFiltradoConfiguracionAdd = menu.filter(
    (item) => item.dMenu.coD_MENU > 36 && item.dMenu.coD_MENU < 40 || (item.dMenu.coD_MENU === 53) || (item.dMenu.coD_MENU === 54) || (item.dMenu.coD_MENU === 55) 
  );
  //add menuFiltradoConfiguracionAdd to menuFiltradoConfiguracion
  menuFiltradoConfiguracion.push(...menuFiltradoConfiguracionAdd);
  let munuFiltadoInterface = menu.filter((item) => item.dMenu.coD_MENU === 41);
  let menuFiltradoProcesos = menu.filter(
    (item) =>( item.dMenu.coD_MENU >= 34 && item.dMenu.coD_MENU <= 36)
    ||
    ( item.dMenu.coD_MENU >= 51 && item.dMenu.coD_MENU <= 52) || (item.dMenu.coD_MENU === 45)
  );
  console.log("menu");
  console.log(menuFiltradoProcesos);

  let menuFiltradoProcesosAdd = menu.filter(
    (item) => item.dMenu.coD_MENU === 42
  );
  let munuFiltradoRegistros = menu.filter((item) => item.dMenu.coD_MENU === 48);
  //add menuFiltradoProcesosAdd to menuFiltradoProcesos
  menuFiltradoProcesos.push(...menuFiltradoProcesosAdd);
  let menuFiltradoInterface = menu.filter((item) => item.dMenu.coD_MENU === 41);
  let menuFiltroAdministrativo = menu.filter(
    (item) => item.dMenu.coD_MENU === 45
  );
  let sayings = new Map();
  sayings.set(3, ROUTES.POSITION);
  sayings.set(4, ROUTES.EDUCATIONLEVEL);
  sayings.set(5, ROUTES.PROFESSIONS);
  sayings.set(6, ROUTES.Studies);
  sayings.set(7, ROUTES.ENTIDADEXTERNA);
  sayings.set(8, ROUTES.WORKCONDITION);
  sayings.set(9, ROUTES.PERSONALACTION);
  sayings.set(10, ROUTES.JOBCATEGORY);
  sayings.set(11, ROUTES.AFP);
  sayings.set(12, ROUTES.PERSON);
  sayings.set(14, ROUTES.EMPLOYEE);
  sayings.set(15, ROUTES.PlanillaReporte4);
  sayings.set(18, ROUTES.Ballots);
  sayings.set(19, ROUTES.WorkReason);
  sayings.set(20, ROUTES.WorkShift);
  sayings.set(21, ROUTES.WorkHours);
  sayings.set(22, ROUTES.EDUCATIONLEVEL);
  sayings.set(23, ROUTES.BallotsLabor);
  sayings.set(24, ROUTES.VACATION);
  sayings.set(25, ROUTES.Assistance);
  sayings.set(26, ROUTES.AssistancePRO);
  sayings.set(29, ROUTES.PeriodSpreadsheet);
  sayings.set(30, ROUTES.ConceptSpreadsheet);
  sayings.set(31, ROUTES.PayrollAndWorkers);
  sayings.set(32, ROUTES.WorkerAndConcept);
  sayings.set(34, ROUTES.CalculateSpreadsheet);
  sayings.set(51, ROUTES.PlanillaReporte);
  sayings.set(52, ROUTES.CalculateSpreadsheet);
  sayings.set(35, ROUTES.CalculateSpreadsheet);
  sayings.set(36, ROUTES.CalculateSpreadsheet);
  sayings.set(37, ROUTES.ConceptsFormula);
  sayings.set(38, ROUTES.RenumConcept);
  sayings.set(39, ROUTES.TypeSpreadsheet);
  sayings.set(41, ROUTES.Bank);
  sayings.set(42, ROUTES.CalculateSpreadsheet);
  sayings.set(45, ROUTES.Lend);
  sayings.set(48, ROUTES.FileGeneration);
  sayings.set(49, ROUTES.PlanillaReporte3);
  sayings.set(52, ROUTES.BoletaTrabajador);
  sayings.set(53, ROUTES.PayrollAccumulatorAndConcepts);
  sayings.set(54, ROUTES.PlanillaReporte2);
  sayings.set(55, ROUTES.FifthCategory);
  

  let iconsToMenu = new Map();
  iconsToMenu.set(3, <BadgeIcon color="white" />);
  iconsToMenu.set(4, <WorkspacePremiumIcon color="white" />);
  iconsToMenu.set(5, <WorkIcon color="white" />);
  iconsToMenu.set(6, <SchoolIcon color="white" />);
  iconsToMenu.set(7, <BrandingWatermarkOutlinedIcon color="white" />);
  iconsToMenu.set(8, <SensorOccupiedIcon color="white" />);
  iconsToMenu.set(9, <BrandingWatermarkOutlinedIcon color="white" />);
  iconsToMenu.set(10, <BadgeIcon color="white" />);
  iconsToMenu.set(11, <SavingsIcon color="white" />);
  iconsToMenu.set(12, <PersonIcon color="white" />);
  iconsToMenu.set(14, <HailIcon color="white" />);
  iconsToMenu.set(15, <AssignmentIcon color="white" />);
  iconsToMenu.set(18, <ReceiptIcon color="white" />);
  iconsToMenu.set(19, <ArticleIcon color="white" />);
  iconsToMenu.set(20, <FeedIcon color="white" />);
  iconsToMenu.set(21, <FeedIcon color="white" />);
  iconsToMenu.set(22, <AccessTimeFilledIcon color="white" />);
  iconsToMenu.set(23, <AccessTimeFilledIcon color="white" />);
  iconsToMenu.set(24, <AccessTimeFilledIcon color="white" />);
  iconsToMenu.set(25, <AccessTimeFilledIcon color="white" />);
  iconsToMenu.set(26, <AccessTimeFilledIcon color="white" />);
  iconsToMenu.set(29, <AccessTimeFilledIcon color="white" />);
  iconsToMenu.set(30, <AccessTimeFilledIcon color="white" />);
  iconsToMenu.set(31, <AccessTimeFilledIcon color="white" />);
  iconsToMenu.set(32, <AccessTimeFilledIcon color="white" />);
  iconsToMenu.set(41, <AccessTimeFilledIcon color="white" />);
  iconsToMenu.set(34, <AccessTimeFilledIcon color="white" />);
  iconsToMenu.set(45, <AccessTimeFilledIcon color="white" />);
  iconsToMenu.set(48, <AccessTimeFilledIcon color="white" />);
  iconsToMenu.set(49, <AccessTimeFilledIcon color="white" />);
  iconsToMenu.set(51, <AccessTimeFilledIcon color="white" />);
  iconsToMenu.set(52, <AccessTimeFilledIcon color="white" />);
  iconsToMenu.set(54, <AccessTimeFilledIcon color="white" />);
  iconsToMenu.set(55, <AccessTimeFilledIcon color="white" />);
  
  /* coloring kit */
  const colorprimary = "#111926";
  const colorgbaTextoMenu = "rgb(209, 213, 219)";
  const colorEmapeIcon= "white";
  const colorlink= "#00A39C";
  const marginTextSubMenu = -2;
  const paddingTextMenu = 2.5;
  const paddingLeftIcon = 5;
  /* coloring kit old */
  const oldprimary = "#00A39C";
  
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        open={open}
        style={{ backgroundColor: colorprimary }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: "none" }) }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
            SIGRH
          </Typography>
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
            {userName}
          </Typography>
          <Button color="inherit" onClick={logoutBtn}>
            Cerrar sesión
          </Button>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        PaperProps={{
          sx: {
            backgroundColor: colorprimary,
            color: colorgbaTextoMenu,
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <Divider />
        <List
          sx={{ width: "100%", maxWidth: 360, bgcolor: colorprimary }}
          component="nav"
          aria-labelledby="nested-list-subheader"
          subheader={
            <ListSubheader component="div" id="nested-list-subheader" sx={{bgcolor: colorprimary}}>
              <DrawerHeader sx={{color: colorEmapeIcon + ';!important'}}>
                EMAPE
                <IconButton onClick={handleDrawerClose} sx={{color: colorEmapeIcon + ';!important'}}>
                  {theme.direction === "ltr" ? (
                    <ChevronLeftIcon />
                  ) : (
                    <ChevronRightIcon />
                  )}
                </IconButton>
              </DrawerHeader>
            </ListSubheader>
          }
        >
          <br />
          {menu.length === 1 && (
            <>
              {menuFiltradoMaestros.map((item, index) => (
                <Fragment key={index}>
                  <ListItemButton onClick={handleClickMaestro}>
                    <ListItemIcon></ListItemIcon>
                    <ListItemText primary="LEGAJO TRABAJADOR" />
                    {openmaestro ? <ExpandLess /> : <ExpandMore />}
                  </ListItemButton>
                  <Collapse in={openmaestro} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                      <ListItemButton
                        onClick={handleClickGenerales}
                        sx={{ pl: 3 }}
                      >
                        <ListItemIcon>
                          <EngineeringIcon />
                        </ListItemIcon>
                        <ListItemText primary="MAESTROS" />
                        {opengenerales ? <ExpandLess /> : <ExpandMore />}
                      </ListItemButton>
                      <Collapse in={opengenerales} timeout="auto" unmountOnExit>
                        <ListItemButton sx={{ pl: paddingLeftIcon }}>
                          <ListItemIcon>
                            {iconsToMenu.get(item.dMenu.coD_MENU)}
                          </ListItemIcon>
                          <ListItem>
                            <Link
                              to={sayings.get(item.dMenu.coD_MENU)}
                              style={{
                                textDecoration: "none",
                                color: colorlink,
                              }}
                            >
                              <ListItemText primary={item.dMenu.deS_MENU} />
                            </Link>
                          </ListItem>
                        </ListItemButton>
                      </Collapse>
                    </List>
                  </Collapse>
                </Fragment>
              ))}
            </>
          )}

          {menu.length === 1 && (
            <>
              {menuFiltradoConfiguracion.map((item, index) => (
                <Fragment key={index}>
                  <ListItemButton onClick={handleClickPlanilla}>
                    <ListItemIcon></ListItemIcon>
                    <ListItemText primary="PLANILLA" />
                    {openplanilla ? <ExpandLess /> : <ExpandMore />}
                  </ListItemButton>
                  <Collapse in={openplanilla} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                      <ListItemButton
                        onClick={handleClickConfigPlanilla}
                        sx={{ pl: 3 }}
                      >
                        <ListItemIcon>
                          <EngineeringIcon color="white" />
                        </ListItemIcon>
                        <ListItemText primary="CONFIGURACIÓN" />
                        {openconfigplanilla ? <ExpandLess /> : <ExpandMore />}
                      </ListItemButton>
                      <Collapse
                        in={openconfigplanilla}
                        timeout="auto"
                        unmountOnExit
                      >
                        <ListItemButton sx={{ pl: paddingLeftIcon }}>
                          <ListItemIcon>
                            {iconsToMenu.get(item.dMenu.coD_MENU)}
                          </ListItemIcon>
                          <ListItem>
                            <Link
                              to={sayings.get(item.dMenu.coD_MENU)}
                              style={{
                                textDecoration: "none",
                                color: colorlink,
                              }}
                            >
                              <ListItemText
                                primary={
                                  <Typography style={{ color: "#fff" }}>
                                    {item.dMenu.deS_MENU}
                                  </Typography>
                                }
                              />
                            </Link>
                          </ListItem>
                        </ListItemButton>
                      </Collapse>
                    </List>
                  </Collapse>
                </Fragment>
              ))}
            </>
          )}

          {menu.length === 1 && (
            <>
              {menuFiltradoProcesos.map((item, index) => (
                <Fragment key={index}>
                  <ListItemButton onClick={handleClickPlanilla}>
                    <ListItemIcon></ListItemIcon>
                    <ListItemText primary="PLANILLA" />
                    {openplanilla ? <ExpandLess /> : <ExpandMore />}
                  </ListItemButton>
                  <Collapse in={openplanilla} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                      <ListItemButton
                        onClick={handleClickProcesos}
                        sx={{ pl: 3 }}
                      >
                        <ListItemIcon>
                          <EngineeringIcon color="white" />
                        </ListItemIcon>
                        <ListItemText primary="PROCESOS" />
                        {openconfigplanilla ? <ExpandLess /> : <ExpandMore />}
                      </ListItemButton>
                      <Collapse in={openproceso} timeout="auto" unmountOnExit>
                        <ListItemButton sx={{ pl: paddingLeftIcon }}>
                          <ListItemIcon>
                            {iconsToMenu.get(item.dMenu.coD_MENU)}
                          </ListItemIcon>
                          <ListItem>
                            <Link
                              to={sayings.get(item.dMenu.coD_MENU)}
                              style={{
                                textDecoration: "none",
                                color: colorlink,
                              }}
                            >
                              <ListItemText
                                primary={
                                  <Typography style={{ color: "#fff" }}>
                                    {item.dMenu.deS_MENU}
                                  </Typography>
                                }
                              />
                            </Link>
                          </ListItem>
                        </ListItemButton>
                      </Collapse>
                    </List>
                  </Collapse>
                </Fragment>
              ))}
            </>
          )}
          {menu.length === 1 && (
            <>
              {munuFiltadoInterface.map((item, index) => (
                <Fragment key={index}>
                  <ListItemButton onClick={handleClickPlanilla}>
                    <ListItemIcon></ListItemIcon>
                    <ListItemText primary="PLANILLA" />
                    {openplanilla ? <ExpandLess /> : <ExpandMore />}
                  </ListItemButton>
                  <Collapse in={openplanilla} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                      <ListItemButton
                        onClick={handleClickProcesos}
                        sx={{ pl: 3 }}
                      >
                        <ListItemIcon>
                          <EngineeringIcon color="white" />
                        </ListItemIcon>
                        <ListItemText primary="INTERFACE" />
                        {openconfigplanilla ? <ExpandLess /> : <ExpandMore />}
                      </ListItemButton>
                      <Collapse in={openproceso} timeout="auto" unmountOnExit>
                        <ListItemButton sx={{ pl: paddingLeftIcon }}>
                          <ListItemIcon>
                            {iconsToMenu.get(item.dMenu.coD_MENU)}
                          </ListItemIcon>
                          <ListItem>
                            <Link
                              to={sayings.get(item.dMenu.coD_MENU)}
                              style={{
                                textDecoration: "none",
                                color: colorlink,
                              }}
                            >
                              <ListItemText
                                primary={
                                  <Typography style={{ color: "#fff" }}>
                                    {item.dMenu.deS_MENU}
                                  </Typography>
                                }
                              />
                            </Link>
                          </ListItem>
                        </ListItemButton>
                      </Collapse>
                    </List>
                  </Collapse>
                </Fragment>
              ))}
            </>
          )}
          {menu.length === 1 && (
            <>
              {menuFiltroAdministrativo.map((item, index) => (
                <Fragment key={index}>
                  <ListItemButton onClick={handleClickProcesosPadre}>
                    <ListItemIcon></ListItemIcon>
                    <ListItemText primary="PROCESOS" />
                    {openprocesospadre ? <ExpandLess /> : <ExpandMore />}
                  </ListItemButton>
                  <Collapse in={openprocesospadre} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                      <ListItemButton
                        onClick={handleClickAdministrativo}
                        sx={{ pl: 3 }}
                      >
                        <ListItemIcon>
                          <EngineeringIcon color="white" />
                        </ListItemIcon>
                        <ListItemText primary="ADMINISTRATIVOS" />
                        {openadministrativo ? <ExpandLess /> : <ExpandMore />}
                      </ListItemButton>
                      <Collapse
                        in={openadministrativo}
                        timeout="auto"
                        unmountOnExit
                      >
                        <ListItemButton sx={{ pl: paddingLeftIcon }}>
                          <ListItemIcon>
                            {iconsToMenu.get(item.dMenu.coD_MENU)}
                          </ListItemIcon>
                          <ListItem>
                            <Link
                              to={sayings.get(item.dMenu.coD_MENU)}
                              style={{
                                textDecoration: "none",
                                color: colorlink,
                              }}
                            >
                              <ListItemText
                                primary={
                                  <Typography style={{ color: "#fff" }}>
                                    {item.dMenu.deS_MENU}
                                  </Typography>
                                }
                              />
                            </Link>
                          </ListItem>
                        </ListItemButton>
                      </Collapse>
                    </List>
                  </Collapse>
                </Fragment>
              ))}
            </>
          )}
          {menu.length === 1 && (
            <>
              {menuFiltradoLegado.map((item, index) => (
                <Fragment key={index}>
                  <ListItemButton onClick={handleClickMaestro}>
                    <ListItemIcon></ListItemIcon>
                    <ListItemText primary="LEGAJO TRABAJADOR" />
                    {openmaestro ? <ExpandLess /> : <ExpandMore />}
                  </ListItemButton>
                  <Collapse in={openmaestro} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                      <ListItemButton
                        onClick={handleClickLegajo}
                        sx={{ pl: 3 }}
                      >
                        <ListItemIcon>
                          <ArchiveIcon />
                        </ListItemIcon>
                        <ListItemText primary="LEGAJO" />
                        {openlegajo ? <ExpandLess /> : <ExpandMore />}
                      </ListItemButton>
                      <Collapse in={openlegajo} timeout="auto" unmountOnExit>
                        <ListItemButton sx={{ pl: paddingLeftIcon }}>
                          <ListItemIcon>
                            {iconsToMenu.get(item.dMenu.coD_MENU)}
                          </ListItemIcon>
                          <ListItem>
                            <Link
                              to={sayings.get(item.dMenu.coD_MENU)}
                              style={{
                                textDecoration: "none",
                                color: colorlink,
                              }}
                            >
                              <ListItemText primary={item.dMenu.deS_MENU} />
                            </Link>
                          </ListItem>
                        </ListItemButton>
                        <Link
                          to={ROUTES.EXPERIENCIALABORAL}
                          style={{
                            textDecoration: "none",
                            color: colorlink,
                          }}
                        ></Link>
                      </Collapse>
                    </List>
                  </Collapse>
                </Fragment>
              ))}
            </>
          )}
          {menu.length === 1 && (
            <>
              {menuFiltradoControlAsistencia.map((item, index) => (
                <Fragment>
                  <ListItemButton onClick={handleClickAsistencia}>
                    <ListItemIcon></ListItemIcon>
                    <ListItemText primary="CONTROL DE ASISTENCIA" />
                    {openasistencia ? <ExpandLess /> : <ExpandMore />}
                  </ListItemButton>
                  <Collapse in={openasistencia} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                      {menuFiltradoAsistenciaMaestro.length > 0 ? (
                        <>
                          <ListItemButton
                            onClick={handleClickAsistenciaMaestro}
                            sx={{ pl: 3 }}
                          >
                            <ListItemIcon>
                              <EngineeringIcon color="white" />
                            </ListItemIcon>
                            <ListItemText primary="MAESTROS" />
                            {openasistenciamaestro ? (
                              <ExpandLess />
                            ) : (
                              <ExpandMore />
                            )}
                          </ListItemButton>
                          {menuFiltradoAsistenciaMaestro.map((item, index) => (
                            <Fragment key={index}>
                              <Collapse
                                in={openasistenciamaestro}
                                timeout="auto"
                                unmountOnExit
                              >
                                <Link
                                  to={sayings.get(item.dMenu.coD_MENU)}
                                  style={{
                                    textDecoration: "none",
                                    color: colorlink,
                                  }}
                                >
                                  <ListItemButton sx={{ pl: paddingLeftIcon }}>
                                    <ListItemIcon>
                                      {iconsToMenu.get(item.dMenu.coD_MENU)}
                                    </ListItemIcon>
                                    <ListItem>
                                      <ListItemText
                                        primary={
                                          <Typography style={{ color: "#fff" }}>
                                            {item.dMenu.deS_MENU}
                                          </Typography>
                                        }
                                      />
                                    </ListItem>
                                  </ListItemButton>
                                </Link>
                              </Collapse>
                            </Fragment>
                          ))}
                        </>
                      ) : (
                        <></>
                      )}
                      {menuFiltradoControl.length > 0 ? (
                        <>
                          <List component="div" disablePadding>
                            <ListItemButton
                              onClick={handleClickConfiguracion}
                              sx={{ pl: 3 }}
                            >
                              <ListItemIcon>
                                <SettingsIcon color="white" />
                              </ListItemIcon>
                              <ListItemText primary="CONTROL" />
                              {openconfiguracion ? (
                                <ExpandLess />
                              ) : (
                                <ExpandMore />
                              )}
                            </ListItemButton>
                            <Collapse
                              in={openasistencia}
                              timeout="auto"
                              unmountOnExit
                            >
                              {menuFiltradoControl.map((item, index) => (
                                <Fragment key={index}>
                                  <Collapse
                                    in={openconfiguracion}
                                    timeout="auto"
                                    unmountOnExit
                                  >
                                    <Link
                                      to={sayings.get(item.dMenu.coD_MENU)}
                                      style={{
                                        textDecoration: "none",
                                        color: colorlink,
                                      }}
                                    >
                                      <ListItemButton sx={{ pl: paddingLeftIcon }}>
                                        <ListItemIcon>
                                          {iconsToMenu.get(item.dMenu.coD_MENU)}
                                        </ListItemIcon>
                                        <ListItem>
                                          <ListItemText
                                            primary={
                                              <Typography
                                                style={{ color: "#fff" }}
                                              >
                                                {item.dMenu.deS_MENU}
                                              </Typography>
                                            }
                                          />
                                        </ListItem>
                                      </ListItemButton>
                                    </Link>
                                  </Collapse>
                                </Fragment>
                              ))}
                            </Collapse>
                          </List>
                        </>
                      ) : (
                        <></>
                      )}
                    </List>
                  </Collapse>
                </Fragment>
              ))}
            </>
          )}

          {menu.length >= 2 && menuFiltradoMaestros.length > 0 && (
            <>
              <Fragment>
                <ListItemButton onClick={handleClickMaestro} sx={{py: '1.2rem', pl: paddingTextMenu }}>
                  {/* <ListItemIcon></ListItemIcon> */}
                  <ListItemText primary="LEGAJO TRABAJADOR" />
                  {openmaestro ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Collapse in={openmaestro} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    <ListItemButton
                      onClick={handleClickGenerales}
                      sx={{ pl: 3 }}
                    >
                      <ListItemIcon>
                        <EngineeringIcon color="white" />
                      </ListItemIcon>
                      <ListItemText primary="MAESTROS" sx={{ml: marginTextSubMenu}}/>
                      {opengenerales ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>
                    {menuFiltradoMaestros.map((item, index) => (
                      <Fragment key={index}>
                        <Collapse
                          in={opengenerales}
                          timeout="auto"
                          unmountOnExit
                        >
                          <Link
                            to={sayings.get(item.dMenu.coD_MENU)}
                            style={{
                              textDecoration: "none",
                              color: colorlink,
                            }}
                          >
                            <ListItemButton sx={{ pl: paddingLeftIcon }}>
                              <ListItemIcon>
                                {iconsToMenu.get(item.dMenu.coD_MENU)}
                              </ListItemIcon>
                              <ListItem>
                                <ListItemText sx={{ml: marginTextSubMenu}}
                                  primary={
                                    <Typography style={{ color: "#fff" }}>
                                      {item.dMenu.deS_MENU}
                                    </Typography>
                                  }
                                />
                              </ListItem>
                            </ListItemButton>
                          </Link>
                        </Collapse>
                      </Fragment>
                    ))}
                  </List>
                </Collapse>
              </Fragment>
            </>
          )}

          {menu.length >= 2 && menuFiltradoLegado.length > 0 && (
            <>
              <Fragment sx={{margin: "1px;!important"}}>
                {menuFiltradoMaestros.length > 0 ? (
                  <></>
                ) : (
                  <>
                    <ListItemButton onClick={handleClickMaestro}>
                      <ListItemIcon></ListItemIcon>
                      <ListItemText primary="LEGAJO TRABAJADOR" />
                      {openmaestro ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>
                  </>
                )}
                <Collapse in={openmaestro} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    <ListItemButton onClick={handleClickLegajo} sx={{ pl: 3 }}>
                      <ListItemIcon>
                        <ArchiveIcon color="white" />
                      </ListItemIcon>
                      <ListItemText primary="LEGAJO" sx={{ml: marginTextSubMenu}}/>
                      {openlegajo ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>
                    {menuFiltradoLegado.map((item, index) => (
                      <Fragment key={index}>
                        <Collapse in={openlegajo} timeout="auto" unmountOnExit>
                          <Link
                            to={sayings.get(item.dMenu.coD_MENU)}
                            style={{
                              textDecoration: "none",
                              color: colorlink,
                            }}
                          >
                            <ListItemButton sx={{ pl: paddingLeftIcon }}>
                              <ListItemIcon>
                                {iconsToMenu.get(item.dMenu.coD_MENU)}
                              </ListItemIcon>
                              <ListItem>
                                <ListItemText sx={{ml: marginTextSubMenu}}
                                  primary={
                                    <Typography style={{ color: "#fff" }}>
                                      {item.dMenu.deS_MENU}
                                    </Typography>
                                  }
                                />
                              </ListItem>
                            </ListItemButton>
                          </Link>
                        </Collapse>
                      </Fragment>
                    ))}
                  </List>
                </Collapse>
              </Fragment>
            </>
          )}
          {menu.length >= 2 && menuFiltradoAsistencia.length > 0 && (
            <>
              <Fragment>
                <ListItemButton onClick={handleClickAsistencia} sx={{py: '1.2rem', pl: paddingTextMenu}}>
                  {/* <ListItemIcon></ListItemIcon> */}
                  <ListItemText primary="CONTROL DE ASISTENCIA" />
                  {openasistencia ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Collapse in={openasistencia} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    {menuFiltradoAsistenciaMaestro.length > 0 ? (
                      <>
                        <ListItemButton
                          onClick={handleClickAsistenciaMaestro}
                          sx={{ pl: 3 }}
                        >
                          <ListItemIcon>
                            <EngineeringIcon color="white" />
                          </ListItemIcon>
                          <ListItemText primary="MAESTROS" sx={{ml: marginTextSubMenu}}/>
                          {openasistenciamaestro ? (
                            <ExpandLess />
                          ) : (
                            <ExpandMore />
                          )}
                        </ListItemButton>
                        {menuFiltradoAsistenciaMaestro.map((item, index) => (
                          <Fragment key={index}>
                            <Collapse
                              in={openasistenciamaestro}
                              timeout="auto"
                              unmountOnExit
                            >
                              <Link
                                to={sayings.get(item.dMenu.coD_MENU)}
                                style={{
                                  textDecoration: "none",
                                  color: colorlink,
                                }}
                              >
                                <ListItemButton sx={{ pl: paddingLeftIcon }}>
                                  <ListItemIcon>
                                    {iconsToMenu.get(item.dMenu.coD_MENU)}
                                  </ListItemIcon>
                                  <ListItem>
                                    <ListItemText sx={{ml: marginTextSubMenu}}
                                      primary={
                                        <Typography style={{ color: "#fff" }}>
                                          {item.dMenu.deS_MENU}
                                        </Typography>
                                      }
                                    />
                                  </ListItem>
                                </ListItemButton>
                              </Link>
                            </Collapse>
                          </Fragment>
                        ))}
                      </>
                    ) : (
                      <></>
                    )}
                    {menuFiltradoControl.length > 0 ? (
                      <>
                        <List component="div" disablePadding>
                          <ListItemButton
                            onClick={handleClickConfiguracion}
                            sx={{ pl: 3 }}
                          >
                            <ListItemIcon>
                              <SettingsIcon color="white" />
                            </ListItemIcon>
                            <ListItemText primary="CONTROL" sx={{ml: marginTextSubMenu}}/>
                            {openconfiguracion ? (
                              <ExpandLess />
                            ) : (
                              <ExpandMore />
                            )}
                          </ListItemButton>
                          <Collapse
                            in={openasistencia}
                            timeout="auto"
                            unmountOnExit
                          >
                            {menuFiltradoControl.map((item, index) => (
                              <Fragment key={index}>
                                <Collapse
                                  in={openconfiguracion}
                                  timeout="auto"
                                  unmountOnExit
                                >
                                  <Link
                                    to={sayings.get(item.dMenu.coD_MENU)}
                                    style={{
                                      textDecoration: "none",
                                      color: colorlink,
                                    }}
                                  >
                                    <ListItemButton sx={{ pl: paddingLeftIcon }}>
                                      <ListItemIcon>
                                        {iconsToMenu.get(item.dMenu.coD_MENU)}
                                      </ListItemIcon>
                                      <ListItem>
                                        <ListItemText sx={{ml: marginTextSubMenu}}
                                          primary={
                                            <Typography
                                              style={{ color: "#fff" }}
                                            >
                                              {item.dMenu.deS_MENU}
                                            </Typography>
                                          }
                                        />
                                      </ListItem>
                                    </ListItemButton>
                                  </Link>
                                </Collapse>
                              </Fragment>
                            ))}
                          </Collapse>
                        </List>
                      </>
                    ) : (
                      <></>
                    )}
                  </List>
                </Collapse>
              </Fragment>
            </>
          )}


          {menu.length >= 2 && menuFiltradoPlantilla.length > 0 && (            
            <>
              <Fragment>
                <ListItemButton onClick={handleClickPlanilla} sx={{py: '1.2rem', pl: paddingTextMenu}}>
                 {/*  <ListItemIcon></ListItemIcon> */}
                  <ListItemText primary="PLANILLA" />
                  {openplanilla ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Collapse in={openplanilla} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    {menuFiltradoConfiguracion.length > 0 ? (
                      <>
                        <ListItemButton
                          onClick={handleClickConfigPlanilla}
                          sx={{ pl: 3 }}
                        >
                          <ListItemIcon>
                            <EngineeringIcon color="white" />
                          </ListItemIcon>
                          <ListItemText primary="CONFIGURACIÓN" sx={{ml: marginTextSubMenu}}/>
                          {openconfigplanilla ? <ExpandLess /> : <ExpandMore />}
                        </ListItemButton>
                        {menuFiltradoConfiguracion.map((item, index) => (
                          <Fragment key={index}>
                            <Collapse
                              in={openconfigplanilla}
                              timeout="auto"
                              unmountOnExit
                            >
                              <Link
                                to={sayings.get(item.dMenu.coD_MENU)}
                                style={{
                                  textDecoration: "none",
                                  color: colorlink,
                                }}
                              >
                                <ListItemButton sx={{ pl: paddingLeftIcon }}>
                                  <ListItemIcon>
                                    {iconsToMenu.get(item.dMenu.coD_MENU)}
                                  </ListItemIcon>
                                  <ListItem>
                                    <ListItemText sx={{ml: marginTextSubMenu}}
                                      primary={
                                        <Typography style={{ color: "#fff" }}>
                                          {item.dMenu.deS_MENU}
                                        </Typography>
                                      }
                                    />
                                  </ListItem>
                                </ListItemButton>
                              </Link>
                            </Collapse>
                          </Fragment>
                        ))}
                      </>
                    ) : (
                      <></>
                    )}
                    {menuFiltradoProcesos.length > 0 ? (
                      <>
                        <List component="div" disablePadding>
                          <ListItemButton
                            onClick={handleClickProcesos}
                            sx={{ pl: 3 }}
                          >
                            <ListItemIcon>
                              <SettingsIcon color="white" />
                            </ListItemIcon>
                            <ListItemText primary="PROCESOS" sx={{ml: marginTextSubMenu}}/>
                            {openproceso ? <ExpandLess /> : <ExpandMore />}
                          </ListItemButton>
                          <Collapse
                            in={openproceso}
                            timeout="auto"
                            unmountOnExit
                          >
                            {menuFiltradoProcesos.map((item, index) => (
                              <Fragment key={index}>
                                <Collapse
                                  in={openproceso}
                                  timeout="auto"
                                  unmountOnExit
                                >
                                  <Link
                                    to={sayings.get(item.dMenu.coD_MENU)}
                                    style={{
                                      textDecoration: "none",
                                      color: colorlink,
                                    }}
                                  >
                                    <ListItemButton sx={{ pl: paddingLeftIcon }}>
                                      <ListItemIcon>
                                        {iconsToMenu.get(item.dMenu.coD_MENU)}
                                      </ListItemIcon>
                                      <ListItem>
                                        <ListItemText sx={{ml: marginTextSubMenu}}
                                          primary={
                                            <Typography
                                              style={{ color: "#fff" }}
                                            >
                                              {item.dMenu.deS_MENU}
                                            </Typography>
                                          }
                                        />
                                      </ListItem>
                                    </ListItemButton>
                                  </Link>
                                </Collapse>
                              </Fragment>
                            ))}
                          </Collapse>
                        </List>
                      </>
                    ) : (
                      <></>
                    )}
                    {munuFiltadoInterface.length > 0 ? (
                      <>
                        <List component="div" disablePadding>
                          <ListItemButton
                            onClick={handleClickInterface}
                            sx={{ pl: 3 }}
                          >
                            <ListItemIcon>
                              <SettingsIcon color="white" />
                            </ListItemIcon>
                            <ListItemText primary="INTERFACE" sx={{ml: marginTextSubMenu}}/>
                            {openInterface ? <ExpandLess /> : <ExpandMore />}
                          </ListItemButton>
                          <Collapse
                            in={openInterface}
                            timeout="auto"
                            unmountOnExit
                          >
                            {menuFiltradoInterface.map((item, index) => (
                              <Fragment key={index}>
                                <Collapse
                                  in={openInterface}
                                  timeout="auto"
                                  unmountOnExit
                                >
                                  <Link
                                    to={sayings.get(item.dMenu.coD_MENU)}
                                    style={{
                                      textDecoration: "none",
                                      color: colorlink,
                                    }}
                                  >
                                    <ListItemButton sx={{ pl: paddingLeftIcon }}>
                                      <ListItemIcon>
                                        {iconsToMenu.get(item.dMenu.coD_MENU)}
                                      </ListItemIcon>
                                      <ListItem>
                                        <ListItemText sx={{ml: marginTextSubMenu}}
                                          primary={
                                            <Typography
                                              style={{ color: "#fff" }}
                                            >
                                              {item.dMenu.deS_MENU}
                                            </Typography>
                                          }
                                        />
                                      </ListItem>
                                    </ListItemButton>
                                  </Link>
                                </Collapse>
                              </Fragment>
                            ))}
                          </Collapse>
                        </List>
                      </>
                    ) : (
                      <></>
                    )}
                    {/*  */}
                    {menu.length >= 2 && menuFiltradoAsistencia.length > 0 && (
            <>
              <Fragment>
                <ListItemButton onClick={handleClickRegistro} sx={{ pl: 3}} >
                <ListItemIcon>
                  <SettingsIcon color="white" />
                </ListItemIcon>
                  <ListItemText primary="SUNAT" sx={{ml: marginTextSubMenu}}/>
                  {openregistro ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Collapse in={openregistro} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    {munuFiltradoRegistros.length > 0 ? (
                      <>
                        <ListItemButton
                          onClick={handleClickRegistros}
                          sx={{ pl: 3 }}
                        >
                          <ListItemIcon>
                            <EngineeringIcon color="white" />
                          </ListItemIcon>
                          <ListItemText primary="T-REGISTROS" sx={{ml: marginTextSubMenu}}/>
                          {openregistros ? (
                            <ExpandLess />
                          ) : (
                            <ExpandMore />
                          )}
                        </ListItemButton>
                        {munuFiltradoRegistros.map((item, index) => (
                          <Fragment key={index}>
                            <Collapse
                              in={openregistros}
                              timeout="auto"
                              unmountOnExit
                            >
                              <Link
                                to={sayings.get(item.dMenu.coD_MENU)}
                                style={{
                                  textDecoration: "none",
                                  color: colorlink,
                                }}
                              >
                                <ListItemButton sx={{ pl: paddingLeftIcon }}>
                                  <ListItemIcon>
                                    {iconsToMenu.get(item.dMenu.coD_MENU)}
                                  </ListItemIcon>
                                  <ListItem>
                                    <ListItemText sx={{ml: marginTextSubMenu}}
                                      primary={
                                        <Typography style={{ color: "#fff" }}>
                                          {item.dMenu.deS_MENU}
                                        </Typography>
                                      }
                                    />
                                  </ListItem>
                                </ListItemButton>
                              </Link>
                            </Collapse>
                          </Fragment>
                        ))}
                      </>
                    ) : (
                      <></>
                    )}
                  </List>
                </Collapse>
              </Fragment>
            </>
          )}
                  </List>
                </Collapse>
              </Fragment>
            </>
          )}
        </List>
        <Divider />
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
        {children}
      </Main>
    </Box>
  );
}