import ResponsiveAppBar from "../../layouts/Header";
import BasicCard from "../../components/Card";
import { Container, Grid } from "@mui/material";
import './style.css'
import { Link } from "react-router-dom";

const Master = () => {

    return (
        <div>
            <ResponsiveAppBar />
            <div style={{ padding: '50px' }} >
                <Grid 
                    container justifyContent='center' spacing={3}>
                    <Grid item >
                        <Link to="generales" style={{ textDecoration: 'none' }}>
                            <BasicCard title="Generales" />
                        </Link>
                    </Grid>
                    <Grid item>
                        <Link to="Labor" style={{ textDecoration: 'none' }}>
                            <BasicCard title="Laborales" />
                        </Link>
                    </Grid>
                    <Grid item>
                        <Link to="persona" style={{ textDecoration: 'none' }}>
                            <BasicCard title="Persona" />
                        </Link>
                    </Grid>
                    <Grid item>
                        <Link to="AFP" style={{ textDecoration: 'none' }}>
                            <BasicCard title="AFP"/>
                        </Link>
                    </Grid>
                    <Grid item>
                        <Link to="" style={{ textDecoration: 'none' }}>
                            <BasicCard title="Niveles" color="gray"/>
                        </Link>
                    </Grid>
                </Grid>
            </div>
        </div>
    )

}

export default Master;