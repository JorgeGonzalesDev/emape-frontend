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
import HomeIcon from "@mui/icons-material/Home";
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
  let menuFiltradoMaestros = menu.filter((item) => item.dMenu.coD_MENU <= 12);
  let menuFiltradoLegado = menu.filter(
    (item) => item.dMenu.coD_MENU === 14 || item.dMenu.coD_MENU === 15
  );
  let menuFiltradoAsistencia = menu.filter(
    (item) => item.dMenu.coD_MENU >= 18 && item.dMenu.coD_MENU <= 20
  );
  let menuFiltradoReloj = menu.filter((item) => item.dMenu.coD_MENU === 22);
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
  sayings.set(15, ROUTES.EDUCATIONLEVEL);
  sayings.set(18, ROUTES.EDUCATIONLEVEL);
  sayings.set(19, ROUTES.EDUCATIONLEVEL);
  sayings.set(20, ROUTES.EDUCATIONLEVEL);
  sayings.set(22, ROUTES.EDUCATIONLEVEL);
  let iconsToMenu = new Map();
  iconsToMenu.set(3, <BadgeIcon />);
  iconsToMenu.set(4, <WorkspacePremiumIcon />);
  iconsToMenu.set(5, <WorkIcon />);
  iconsToMenu.set(6, <SchoolIcon />);
  iconsToMenu.set(7, <BrandingWatermarkOutlinedIcon />);
  iconsToMenu.set(8, <SensorOccupiedIcon />);
  iconsToMenu.set(9, <BrandingWatermarkOutlinedIcon />);
  iconsToMenu.set(10, <BadgeIcon />);
  iconsToMenu.set(11, <SavingsIcon />);
  iconsToMenu.set(12, <PersonIcon />);
  iconsToMenu.set(14, <HailIcon />);
  iconsToMenu.set(15, <AssignmentIcon />);
  iconsToMenu.set(18, <ReceiptIcon />);
  iconsToMenu.set(19, <ArticleIcon />);
  iconsToMenu.set(20, <FeedIcon />);
  iconsToMenu.set(22, <AccessTimeFilledIcon />);
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open} style={{backgroundColor: '#00A39C'}}>
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
        <Divider />
        <List
          sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
          component="nav"
          aria-labelledby="nested-list-subheader"
          subheader={
            <ListSubheader component="div" id="nested-list-subheader">
              <DrawerHeader>
                EMAPE
                <IconButton onClick={handleDrawerClose}>
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
                        <ListItemButton sx={{ pl: 4 }}>
                          <ListItemIcon>
                            {iconsToMenu.get(item.dMenu.coD_MENU)}
                          </ListItemIcon>
                          <ListItem>
                            <Link
                              to={sayings.get(item.dMenu.coD_MENU)}
                              style={{
                                textDecoration: "none",
                                color: "#202020",
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
                        <ListItemButton sx={{ pl: 4 }}>
                          <ListItemIcon>
                            {iconsToMenu.get(item.dMenu.coD_MENU)}
                          </ListItemIcon>
                          <ListItem>
                            <Link
                              to={sayings.get(item.dMenu.coD_MENU)}
                              style={{
                                textDecoration: "none",
                                color: "#202020",
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
                            color: "#202020",
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
              {menuFiltradoAsistencia.map((item, index) => (
                <Fragment key={index}>
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
                          <EngineeringIcon />
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
                          to={sayings.get(item.dMenu.coD_MENU)}
                          style={{ textDecoration: "none", color: "#202020" }}
                        >
                          <ListItemButton sx={{ pl: 3 }}>
                            <ListItemIcon>
                              {iconsToMenu.get(item.dMenu.coD_MENU)}
                            </ListItemIcon>
                            <ListItem>
                              <ListItemText primary={item.dMenu.deS_MENU} />
                            </ListItem>
                          </ListItemButton>
                        </Link>
                      </Collapse>
                    </List>
                  </Collapse>
                </Fragment>
              ))}
            </>
          )}
          {menu.length === 1 && (
            <>
              {menuFiltradoReloj.map((item, index) => (
                <Fragment key={index}>
                  <ListItemButton onClick={handleClickAsistencia}>
                    <ListItemIcon></ListItemIcon>
                    <ListItemText primary="CONTROL DE ASISTENCIA" />
                    {openasistencia ? <ExpandLess /> : <ExpandMore />}
                  </ListItemButton>
                  <Collapse in={openasistencia} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                      <ListItemButton
                        onClick={handleClickConfiguracion}
                        sx={{ pl: 3 }}
                      >
                        <ListItemIcon>
                          <SettingsIcon />
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
                          to={sayings.get(item.dMenu.coD_MENU)}
                          style={{ textDecoration: "none", color: "#202020" }}
                        >
                          <ListItemButton sx={{ pl: 3 }}>
                            <ListItemIcon>
                              {iconsToMenu.get(item.dMenu.coD_MENU)}
                            </ListItemIcon>
                            <ListItem>
                              <ListItemText primary={item.dMenu.deS_MENU} />
                            </ListItem>
                          </ListItemButton>
                        </Link>
                      </Collapse>
                    </List>
                  </Collapse>
                </Fragment>
              ))}
            </>
          )}
          {menu.length >= 2 && menuFiltradoMaestros.length > 0 && (
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
                        <EngineeringIcon />
                      </ListItemIcon>
                      <ListItemText primary="MAESTROS" />
                      {opengenerales ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>
                    {menuFiltradoMaestros.map((item, index) => (
                      <Fragment key={index}>
                        <Collapse
                          in={opengenerales}
                          timeout="auto"
                          unmountOnExit
                        >
                          <ListItemButton sx={{ pl: 4 }}>
                            <ListItemIcon>
                              {iconsToMenu.get(item.dMenu.coD_MENU)}
                            </ListItemIcon>
                            <ListItem>
                              <Link
                                to={sayings.get(item.dMenu.coD_MENU)}
                                style={{
                                  textDecoration: "none",
                                  color: "#202020",
                                }}
                              >
                                <ListItemText primary={item.dMenu.deS_MENU} />
                              </Link>
                            </ListItem>
                          </ListItemButton>
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
              <Fragment>
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
                        <ArchiveIcon />
                      </ListItemIcon>
                      <ListItemText primary="LEGAJO" />
                      {openlegajo ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>
                    {menuFiltradoLegado.map((item, index) => (
                      <Fragment key={index}>
                        <Collapse in={openlegajo} timeout="auto" unmountOnExit>
                          <ListItemButton sx={{ pl: 4 }}>
                            <ListItemIcon>
                              {iconsToMenu.get(item.dMenu.coD_MENU)}
                            </ListItemIcon>
                            <ListItem>
                              <Link
                                to={sayings.get(item.dMenu.coD_MENU)}
                                style={{
                                  textDecoration: "none",
                                  color: "#202020",
                                }}
                              >
                                <ListItemText primary={item.dMenu.deS_MENU} />
                              </Link>
                            </ListItem>
                          </ListItemButton>
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
                        <EngineeringIcon />
                      </ListItemIcon>
                      <ListItemText primary="MAESTROS" />
                      {openasistenciamaestro ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>
                    {menuFiltradoAsistencia.map((item, index) => (
                      <Fragment key={index}>
                        <Collapse
                          in={openasistenciamaestro}
                          timeout="auto"
                          unmountOnExit
                        >
                          <ListItemButton sx={{ pl: 4 }}>
                            <ListItemIcon>
                              {iconsToMenu.get(item.dMenu.coD_MENU)}
                            </ListItemIcon>
                            <ListItem>
                              <Link
                                to={sayings.get(item.dMenu.coD_MENU)}
                                style={{
                                  textDecoration: "none",
                                  color: "#202020",
                                }}
                              >
                                <ListItemText primary={item.dMenu.deS_MENU} />
                              </Link>
                            </ListItem>
                          </ListItemButton>
                        </Collapse>
                      </Fragment>
                    ))}
                    {menuFiltradoReloj.length > 0 ? (
                      <>
                        {menuFiltradoReloj.map((item, index) => (
                          <Fragment key={index}>
                            <Collapse
                              in={openasistencia}
                              timeout="auto"
                              unmountOnExit
                            >
                              <List component="div" disablePadding>
                                <ListItemButton
                                  onClick={handleClickConfiguracion}
                                  sx={{ pl: 3 }}
                                >
                                  <ListItemIcon>
                                    <SettingsIcon />
                                  </ListItemIcon>
                                  <ListItemText primary="CONFIGURACIÓN" />
                                  {openconfiguracion ? (
                                    <ExpandLess />
                                  ) : (
                                    <ExpandMore />
                                  )}
                                </ListItemButton>
                                <Collapse
                                  in={openconfiguracion}
                                  timeout="auto"
                                  unmountOnExit
                                >
                                  <Link
                                    to={sayings.get(item.dMenu.coD_MENU)}
                                    style={{
                                      textDecoration: "none",
                                      color: "#202020",
                                    }}
                                  >
                                    <ListItemButton sx={{ pl: 3 }}>
                                      <ListItemIcon>
                                        {iconsToMenu.get(item.dMenu.coD_MENU)}
                                      </ListItemIcon>
                                      <ListItem>
                                        <ListItemText
                                          primary={item.dMenu.deS_MENU}
                                        />
                                      </ListItem>
                                    </ListItemButton>
                                  </Link>
                                </Collapse>
                              </List>
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
        <Divider />
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
        {children}
      </Main>
    </Box>
  );
}
