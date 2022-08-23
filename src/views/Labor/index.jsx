import ResponsiveAppBar from "../../layouts/Header";
import BasicCard from "../../components/Card";
import { Container, Grid } from "@mui/material";
import { Link, useParams } from "react-router-dom";

const Labor = () => {
  return (
    <div>
      <ResponsiveAppBar>
        <div style={{ padding: "50px" }}>
          <Grid container justifyContent="center" spacing={3}>
            <Grid item>
              <Link to="cargoLaboral" style={{ textDecoration: "none" }}>
                <BasicCard title="Cargo Laboral" />
              </Link>
            </Grid>
            <Grid item>
              <Link to="condicionLaboral" style={{ textDecoration: "none" }}>
                <BasicCard title="Condición Laboral" />
              </Link>
            </Grid>
            <Grid item>
              <Link to="accionPersonal" style={{ textDecoration: "none" }}>
                <BasicCard title="Acción Personal" />
              </Link>
            </Grid>
            <Grid item>
              <Link to="puestoLaboral" style={{ textDecoration: "none" }}>
                <BasicCard title="Puesto Laboral" />
              </Link>
            </Grid>
          </Grid>
        </div>
      </ResponsiveAppBar>
    </div>
  );
};

export default Labor;
