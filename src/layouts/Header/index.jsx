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
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import { ExpandLess, ExpandMore, Home, StarBorder } from "@mui/icons-material";
import { Button, Collapse } from "@mui/material";
import * as ROUTES from "../../contants/routes";
import { Link } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import EmojiPeopleIcon from "@mui/icons-material/EmojiPeople";
import EngineeringIcon from "@mui/icons-material/Engineering";
import UserContext from "../../context/User/UserContext";
import jwt_decode from "jwt-decode";
import General, {
  Cargo,
  Personal,
  Profesion,
} from "../../components/Svg/General";
//import Cargo from '../../components/Svg/Cargo';
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";
//import Profesion from '../../components/Svg/Profesion';
import BrandingWatermarkOutlinedIcon from "@mui/icons-material/BrandingWatermarkOutlined";
//import Personal from '../../components/Svg/Personal';
import GroupWorkOutlinedIcon from "@mui/icons-material/GroupWorkOutlined";
import MenuContext from "../../context/Menu/Menu.Context";
const drawerWidth = 240;

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
  const handleClickAsistencia = () => {
    setOpenAsistencia(!openasistencia);
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

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
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
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List
          sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
          component="nav"
          aria-labelledby="nested-list-subheader"
          subheader={
            <ListSubheader component="div" id="nested-list-subheader">
              EMAPE
            </ListSubheader>
          }
        >
          {menu ? (
            <>
              <Link
                to="/inicio"
                style={{ textDecoration: "none", color: "#202020" }}
              >
                <ListItemButton>
                  <ListItemIcon>
                    <HomeIcon />
                  </ListItemIcon>
                  <ListItemText primary="Inicio" />
                </ListItemButton>
              </Link>
              {menu.length === 7 && (
                <>
                  <Fragment>
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
                            <General />
                          </ListItemIcon>
                          <ListItemText primary="MAESTROS" />
                          {opengenerales ? <ExpandLess /> : <ExpandMore />}
                        </ListItemButton>
                        <Collapse
                          in={opengenerales}
                          timeout="auto"
                          unmountOnExit
                        >
                          <ListItemButton sx={{ pl: 4 }}>
                            <ListItemIcon>
                              <Cargo />
                            </ListItemIcon>
                            <ListItem>
                              <Link
                                to={ROUTES.POSITION}
                                style={{
                                  textDecoration: "none",
                                  color: "#202020",
                                }}
                              >
                                <ListItemText primary="Cargo" />
                              </Link>
                            </ListItem>
                          </ListItemButton>
                          <ListItemButton sx={{ pl: 4 }}>
                            <ListItemIcon>
                              <SchoolOutlinedIcon />
                            </ListItemIcon>
                            <ListItem>
                              <Link
                                to={ROUTES.EDUCATIONLEVEL}
                                style={{
                                  textDecoration: "none",
                                  color: "#202020",
                                }}
                              >
                                <ListItemText primary="Nivel Educativo" />
                              </Link>
                            </ListItem>
                          </ListItemButton>
                          <ListItemButton sx={{ pl: 4 }}>
                            <ListItemIcon>
                              <Profesion />
                            </ListItemIcon>
                            <ListItem>
                              <Link
                                to={ROUTES.PROFESSIONS}
                                style={{
                                  textDecoration: "none",
                                  color: "#202020",
                                }}
                              >
                                <ListItemText primary="Profesión" />
                              </Link>
                            </ListItem>
                          </ListItemButton>
                          <ListItemButton sx={{ pl: 4 }}>
                            <ListItemIcon>
                              <BrandingWatermarkOutlinedIcon />
                            </ListItemIcon>
                            <ListItem>
                              <Link
                                to={ROUTES.ENTIDADEXTERNA}
                                style={{
                                  textDecoration: "none",
                                  color: "#202020",
                                }}
                              >
                                <ListItemText primary="Estudios" />
                              </Link>
                            </ListItem>
                          </ListItemButton>
                          <ListItemButton sx={{ pl: 4 }}>
                            <ListItemIcon>
                              <BrandingWatermarkOutlinedIcon />
                            </ListItemIcon>
                            <ListItem>
                              <Link
                                to={ROUTES.ENTIDADEXTERNA}
                                style={{
                                  textDecoration: "none",
                                  color: "#202020",
                                }}
                              >
                                <ListItemText primary="Entidad Externa" />
                              </Link>
                            </ListItem>
                          </ListItemButton>
                          <ListItemButton sx={{ pl: 4 }}>
                            <ListItemIcon>
                              <BrandingWatermarkOutlinedIcon />
                            </ListItemIcon>
                            <ListItem>
                              <Link
                                to={ROUTES.WORKCONDITION}
                                style={{
                                  textDecoration: "none",
                                  color: "#202020",
                                }}
                              >
                                <ListItemText primary="Condición Laboral" />
                              </Link>
                            </ListItem>
                          </ListItemButton>
                          <ListItemButton sx={{ pl: 4 }}>
                            <ListItemIcon>
                              <BrandingWatermarkOutlinedIcon />
                            </ListItemIcon>
                            <ListItem>
                              <Link
                                to={ROUTES.PERSONALACTION}
                                style={{
                                  textDecoration: "none",
                                  color: "#202020",
                                }}
                              >
                                <ListItemText primary="Acción Personal" />
                              </Link>
                            </ListItem>
                          </ListItemButton>
                          <ListItemButton sx={{ pl: 4 }}>
                            <ListItemIcon>
                              <BrandingWatermarkOutlinedIcon />
                            </ListItemIcon>
                            <ListItem>
                              <Link
                                to={ROUTES.JOBCATEGORY}
                                style={{
                                  textDecoration: "none",
                                  color: "#202020",
                                }}
                              >
                                <ListItemText primary="Puesto Laboral" />
                              </Link>
                            </ListItem>
                          </ListItemButton>
                          <ListItemButton sx={{ pl: 4 }}>
                            <ListItemIcon>
                              <BrandingWatermarkOutlinedIcon />
                            </ListItemIcon>
                            <ListItem>
                              <Link
                                to={ROUTES.AFP}
                                style={{
                                  textDecoration: "none",
                                  color: "#202020",
                                }}
                              >
                                <ListItemText primary="AFP" />
                              </Link>
                            </ListItem>
                          </ListItemButton>
                          <ListItemButton sx={{ pl: 4 }}>
                            <ListItemIcon>
                              <BrandingWatermarkOutlinedIcon />
                            </ListItemIcon>
                            <ListItem>
                              <Link
                                to={ROUTES.PERSON}
                                style={{
                                  textDecoration: "none",
                                  color: "#202020",
                                }}
                              >
                                <ListItemText primary="Persona" />
                              </Link>
                            </ListItem>
                          </ListItemButton>
                        </Collapse>
                        {/* add */}
                        <ListItemButton
                          onClick={handleClickLegajo}
                          sx={{ pl: 3 }}
                        >
                          <ListItemIcon>
                            <General />
                          </ListItemIcon>
                          <ListItemText primary="LEGAJO" />
                          {openlegajo ? <ExpandLess /> : <ExpandMore />}
                        </ListItemButton>
                        <Collapse in={openlegajo} timeout="auto" unmountOnExit>
                          <ListItemButton sx={{ pl: 4 }}>
                            <ListItemIcon>
                              <Cargo />
                            </ListItemIcon>
                            <ListItem>
                              <Link
                                to={ROUTES.EMPLOYEE}
                                style={{
                                  textDecoration: "none",
                                  color: "#202020",
                                }}
                              >
                                <ListItemText primary="Trabajador" />
                              </Link>
                            </ListItem>
                          </ListItemButton>
                          <ListItemButton sx={{ pl: 4 }}>
                            <ListItemIcon>
                              <SchoolOutlinedIcon />
                            </ListItemIcon>
                            <ListItem>
                              <Link
                                to={ROUTES.EDUCATIONLEVEL}
                                style={{
                                  textDecoration: "none",
                                  color: "#202020",
                                }}
                              >
                                <ListItemText primary="Reportes" />
                              </Link>
                            </ListItem>
                          </ListItemButton>
                        </Collapse>
                      </List>
                    </Collapse>
                  </Fragment>
                  <Fragment>
                    <ListItemButton onClick={handleClickAsistencia}>
                      <ListItemIcon></ListItemIcon>
                      <ListItemText primary="CONTROL DE ASISTENCIA" />
                      {openasistencia ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>
                    <Collapse in={openasistencia} timeout="auto" unmountOnExit>
                      <List component="div" disablePadding>
                        <ListItemButton
                          onClick={handleClickAsistenciaMaestro}
                          sx={{ pl: 3 }}
                        >
                          <ListItemIcon>
                            <InboxIcon />
                          </ListItemIcon>
                          <ListItemText primary="MAESTROS" />
                          {openasistenciamaestro ? (
                            <ExpandLess />
                          ) : (
                            <ExpandMore />
                          )}
                        </ListItemButton>
                        {/* add */}
                        <Collapse
                          in={openasistenciamaestro}
                          timeout="auto"
                          unmountOnExit
                        >
                          <Link
                            to={ROUTES.EMPLOYEE}
                            style={{ textDecoration: "none", color: "#202020" }}
                          >
                            <ListItemButton sx={{ pl: 3 }}>
                              <ListItemIcon>
                                <EngineeringIcon />
                              </ListItemIcon>
                              <ListItem>
                                <ListItemText primary="Tipo Papeletas" />
                              </ListItem>
                            </ListItemButton>
                          </Link>
                          <Link
                            to={ROUTES.EMPLOYEE}
                            style={{ textDecoration: "none", color: "#202020" }}
                          >
                            <ListItemButton sx={{ pl: 3 }}>
                              <ListItemIcon>
                                <EngineeringIcon />
                              </ListItemIcon>
                              <ListItem>
                                <ListItemText primary="Motivo Laboral" />
                              </ListItem>
                            </ListItemButton>
                          </Link>
                          <Link
                            to={ROUTES.EMPLOYEE}
                            style={{ textDecoration: "none", color: "#202020" }}
                          >
                            <ListItemButton sx={{ pl: 3 }}>
                              <ListItemIcon>
                                <EngineeringIcon />
                              </ListItemIcon>
                              <ListItem>
                                <ListItemText primary="Turno Laboral" />
                              </ListItem>
                            </ListItemButton>
                          </Link>
                        </Collapse>
                        <ListItemButton
                          onClick={handleClickConfiguracion}
                          sx={{ pl: 3 }}
                        >
                          <ListItemIcon>
                            <InboxIcon />
                          </ListItemIcon>
                          <ListItemText primary="CONFIGURACIÓN" />
                          {openconfiguracion ? <ExpandLess /> : <ExpandMore />}
                        </ListItemButton>
                        <Collapse
                          in={openconfiguracion}
                          timeout="auto"
                          unmountOnExit
                        >
                          <Link
                            to={ROUTES.EMPLOYEE}
                            style={{ textDecoration: "none", color: "#202020" }}
                          >
                            <ListItemButton sx={{ pl: 3 }}>
                              <ListItemIcon>
                                <EngineeringIcon />
                              </ListItemIcon>
                              <ListItem>
                                <ListItemText primary="Reloj" />
                              </ListItem>
                            </ListItemButton>
                          </Link>
                        </Collapse>
                      </List>
                    </Collapse>
                  </Fragment>
                </>
              )}
            </>
          ) : (
            <h1>cARGANDO</h1>
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
