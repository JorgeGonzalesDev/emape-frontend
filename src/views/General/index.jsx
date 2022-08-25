import ResponsiveAppBar from "../../layouts/Header";
import BasicCard from "../../components/Card";
import { Container, Grid } from "@mui/material";
import { Link, useParams } from "react-router-dom";

const General = () => {
  return (
    <div>
      <ResponsiveAppBar>
        <div style={{ padding: "50px" }}>
          <Grid container justifyContent="center" spacing={3}>
            <Grid item>
              <Link to="position" style={{ textDecoration: "none" }}>
                <BasicCard title="Cargo" />
              </Link>
            </Grid>
            <Grid item>
              <Link to="nivelEducativo" style={{ textDecoration: "none" }}>
                <BasicCard title="Nivel Educativo" />
              </Link>
            </Grid>
            <Grid item>
              <Link to="profesiones" style={{ textDecoration: "none" }}>
                <BasicCard title="Profesiones" />
              </Link>
            </Grid>
            <Grid item>
              <Link to="#" style={{ textDecoration: "none" }}>
                <BasicCard title="Estudios" color="gray" />
              </Link>
            </Grid>
            <Grid item>
              <Link to="#" style={{ textDecoration: "none" }}>
                <BasicCard title="Entidad Externa" color="gray" />
              </Link>
            </Grid>
          </Grid>
        </div>
      </ResponsiveAppBar>
    </div>
  );
};

export default General;
