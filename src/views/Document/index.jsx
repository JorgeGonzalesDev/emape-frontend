import ResponsiveAppBar from "../../layouts/Header";
import BasicCard from "../../components/Card";
import { Container, Grid } from "@mui/material";
import { Link } from "react-router-dom";

const Document = () => {
  return (
    <div>
      <ResponsiveAppBar>
        <div style={{ padding: "50px" }}>
          <Grid
            rowSpacing={1}
            columnSpacing={{ xs: 2, sm: 2, md: 1 }}
            container
            justifyContent="center"
            spacing={2}
          >
            <Grid item>
              <Link to="/trabajador" style={{ textDecoration: "none" }}>
                <BasicCard title="Trabajador" />
              </Link>
            </Grid>
            <Grid item>
              <Link to="" style={{ textDecoration: "none" }}>
                <BasicCard title="Reportes" color="gray" />
              </Link>
            </Grid>
          </Grid>
        </div>
      </ResponsiveAppBar>
    </div>
  );
};

export default Document;
