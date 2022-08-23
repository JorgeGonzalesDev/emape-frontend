import * as React from "react";
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
import { Collapse } from "@mui/material";
import * as ROUTES from "../../contants/routes";
import { Link } from "react-router-dom";
import HomeIcon from '@mui/icons-material/Home';
import EmojiPeopleIcon from '@mui/icons-material/EmojiPeople';
import EngineeringIcon from '@mui/icons-material/Engineering';

const drawerWidth = 240;

//const of array of objects
const listMenu = [
  {
    name: "Maestro",
    path: "/maestro",
    icon: <InboxIcon />,
    submenu: [
      {
        name: "General",
        path: "/maestro",
        icon: <InboxIcon />,
      },
      {
        name: "Laborales",
        path: "/laborales",
        icon: <InboxIcon />,
      },
      {
        name: "Persona",
        path: "/persona",
        icon: <InboxIcon />,
      },
      {
        name: "AFP",
        path: "/afp",
        icon: <InboxIcon />,
      },
    ],
  },
  {
    name: "Legajo",
    path: "/legajo",
    icon: <MailIcon />,
    submenu: [
      {
        name: "Trabajador",
        path: "/legajo",
        icon: <InboxIcon />,
      },
      {
        name: "Reportes",
        path: "/reportes",
        icon: <InboxIcon />,
      },
    ],
  },
];
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
  const [open, setOpen] = React.useState(false);
  const [openmaestro, setOpenMaestro] = React.useState(false);
  const [openlegajo, setOpenLegajo] = React.useState(false);
  const [opengenerales, setOpenGenerales] = React.useState(false);
  const [openlaborales, setOpenLaborales] = React.useState(false);
  const [openniveles, setOpenNiveles] = React.useState(false);
  const [openreportes, setOpenReportes] = React.useState(false);
  const [openestudios, setOpenEstudios] = React.useState(false);
  const [openentidadexterna, setOpenEntidadExterna] = React.useState(false);
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
  const handleClickLaborales = () => {
    setOpenLaborales(!openlaborales);
  };
  const handleClickNiveles = () => {
    setOpenNiveles(!openniveles);
  };
  const handleClickReportes = () => {
    setOpenReportes(!openreportes);
  };
  const handleClickEstudios = () => {
    setOpenEstudios(!openestudios);
  };
  const handleClickEntidadExterna = () => {
    setOpenEntidadExterna(!openentidadexterna);
  };
  React.useEffect(() => {
    console.log(listMenu);
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
          <Typography variant="h6" noWrap component="div">
            SIGRH
          </Typography>
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
          <React.Fragment >
            <Link to="/inicio" style={{ textDecoration: 'none', color: '#202020' }}>
              <ListItemButton>
                <ListItemIcon>
                  <HomeIcon />
                </ListItemIcon>
                <ListItemText primary="Inicio" />
              </ListItemButton>
            </Link>
            <ListItemButton onClick={handleClickMaestro}>
              <ListItemIcon>
              </ListItemIcon>
              <ListItemText primary="Maestro" />
              {openmaestro ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={openmaestro} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItemButton onClick={handleClickGenerales} sx={{ pl: 3 }}>
                  <ListItemIcon>
                    <InboxIcon />
                  </ListItemIcon>
                  <ListItemText primary="Generales" />
                  {opengenerales ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Collapse in={opengenerales} timeout="auto" unmountOnExit>
                  <ListItemButton sx={{ pl: 4 }}>
                    <ListItemIcon>
                      <StarBorder />
                    </ListItemIcon>
                    <ListItem>
                      <Link to={ROUTES.POSITION}>
                        <ListItemText primary="Cargo" />
                      </Link>
                    </ListItem>
                  </ListItemButton>
                  <ListItemButton sx={{ pl: 4 }}>
                    <ListItemIcon>
                      <StarBorder />
                    </ListItemIcon>
                    <ListItem>
                      <Link to={ROUTES.EDUCATIONLEVEL}>
                        <ListItemText primary="Nivel Educativo" />
                      </Link>
                    </ListItem>
                  </ListItemButton>
                  <ListItemButton sx={{ pl: 4 }}>
                    <ListItemIcon>
                      <StarBorder />
                    </ListItemIcon>
                    <ListItem>
                      <Link to={ROUTES.PROFESSIONS}>
                        <ListItemText primary="Profesiones" />
                      </Link>
                    </ListItem>
                  </ListItemButton>
                  <ListItemButton sx={{ pl: 4 }}>
                    <ListItemIcon>
                      <StarBorder />
                    </ListItemIcon>
                    <ListItem>
                      <Link to={ROUTES.ENTIDADEXTERNA}>
                        <ListItemText primary="Entidad Externa" />
                      </Link>
                    </ListItem>
                  </ListItemButton>
                  <ListItemButton onClick={handleClickEstudios} sx={{ pl: 4 }}>
                    <ListItemIcon>
                      <InboxIcon />
                    </ListItemIcon>
                    <ListItemText primary="Estudios" />
                    {openestudios ? <ExpandLess /> : <ExpandMore />}
                  </ListItemButton>
                  <ListItemButton
                    onClick={handleClickEntidadExterna}
                    sx={{ pl: 4 }}
                  >
                    <ListItemIcon>
                      <InboxIcon />
                    </ListItemIcon>
                    <ListItemText primary="Entidad Externa" />
                    {openentidadexterna ? <ExpandLess /> : <ExpandMore />}
                  </ListItemButton>
                </Collapse>
                {/* add */}
              </List>
              <List component="div" disablePadding>
                <ListItemButton onClick={handleClickLaborales} sx={{ pl: 3 }}>
                  <ListItemIcon>
                    <InboxIcon />
                  </ListItemIcon>
                  <ListItemText primary="Laborales" />
                  {openlaborales ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Collapse in={openlaborales} timeout="auto" unmountOnExit>
                  <ListItemButton sx={{ pl: 4 }}>
                    <ListItemIcon>
                      <StarBorder />
                    </ListItemIcon>
                    <ListItem>
                      <Link to={ROUTES.JOBTITLE}>
                        <ListItemText primary="Cargo Laboral" />
                      </Link>
                    </ListItem>
                  </ListItemButton>
                  <ListItemButton sx={{ pl: 4 }}>
                    <ListItemIcon>
                      <StarBorder />
                    </ListItemIcon>
                    <ListItem>
                      <Link to={ROUTES.WORKCONDITION}>
                        <ListItemText primary="Condición Laboral" />
                      </Link>
                    </ListItem>
                  </ListItemButton>
                  <ListItemButton sx={{ pl: 4 }}>
                    <ListItemIcon>
                      <StarBorder />
                    </ListItemIcon>
                    <ListItem>
                      <Link to={ROUTES.PERSONALACTION}>
                        <ListItemText primary="Acción Personal" />
                      </Link>
                    </ListItem>
                  </ListItemButton>
                  <ListItemButton sx={{ pl: 4 }}>
                    <ListItemIcon>
                      <StarBorder />
                    </ListItemIcon>
                    <ListItem>
                      <Link to={ROUTES.JOBCATEGORY}>
                        <ListItemText primary="Puesto Laboral" />
                      </Link>
                    </ListItem>
                  </ListItemButton>
                </Collapse>
                <Link to={ROUTES.PERSON} style={{ textDecoration: 'none', color: '#202020' }}>
                  <ListItemButton sx={{ pl: 3 }}>
                    <ListItemIcon>
                      <EmojiPeopleIcon />
                    </ListItemIcon>
                    <ListItem>
                      <ListItemText primary="Persona" />
                    </ListItem>
                  </ListItemButton>
                </Link>
                <ListItemButton sx={{ pl: 3 }}>
                  <ListItemIcon>
                    <StarBorder />
                  </ListItemIcon>
                  <ListItem>
                    <Link to={ROUTES.AFP}>
                      <ListItemText primary="AFP" />
                    </Link>
                  </ListItem>
                </ListItemButton>
                {/* add */}
              </List>
              <List component="div" disablePadding>
                <ListItemButton onClick={handleClickNiveles} sx={{ pl: 3 }}>
                  <ListItemIcon>
                    <InboxIcon />
                  </ListItemIcon>
                  <ListItemText primary="Niveles" />
                  {openniveles ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>

                {/* add */}
              </List>
            </Collapse>
          </React.Fragment>
          <React.Fragment>
            <ListItemButton onClick={handleClickLegajo}>
              <ListItemIcon>
              </ListItemIcon>
              <ListItemText primary="Legajo" />
              {openlegajo ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={openlegajo} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <Link to={ROUTES.EMPLOYEE} style={{ textDecoration: 'none', color: '#202020' }}>
                  <ListItemButton sx={{ pl: 3 }}>
                    <ListItemIcon>
                      <EngineeringIcon />
                    </ListItemIcon>
                    <ListItem>
                      <ListItemText primary="Trabajador" />
                    </ListItem>
                  </ListItemButton>
                </Link>
                <ListItemButton onClick={handleClickReportes} sx={{ pl: 3 }}>
                  <ListItemIcon>
                    <InboxIcon />
                  </ListItemIcon>
                  <ListItemText primary="Reportes" />
                  {openreportes ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                {/* add */}
              </List>
            </Collapse>
          </React.Fragment>
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
