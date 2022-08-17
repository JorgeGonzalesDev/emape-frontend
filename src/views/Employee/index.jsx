import ResponsiveAppBar from "../../layouts/Header";
import { Grid } from "@mui/material";
import BasicCard from "../../components/Card";
import { Link } from "react-router-dom";

const Employee = () => {

    return (

        <div>
            <ResponsiveAppBar />
            <div style={{ padding: '50px' }} >
                <Grid rowSpacing={1} columnSpacing={{ xs: 2, sm: 2, md: 1 }}
                    container justifyContent='center' spacing={4}>
                    <Grid item>
                        <Link to="/trabajador/register" style={{ textDecoration: 'none' }}>
                            <BasicCard title="Registrar" /> 
                        </Link>
                    </Grid>
                    
                </Grid>
            </div>
        </div>
    );

}

export default Employee;