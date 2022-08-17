import './style.css'
import {
    Paper, Grid, TextField
    , Button, IconButton, OutlinedInput, InputLabel
    , InputAdornment, FormControl
} from '@mui/material';
import { useState } from 'react';
import {Visibility, VisibilityOff} from '@mui/icons-material';


const Home = () => {

    const [fields, setFields] = useState({
        email: '',
        password: '',
    })

    const [values, setValues] = useState({
        showPassword: false,
    })

    const handleClickShowPassword = () => {
        setValues({
            ...values,
            showPassword: !values.showPassword,
        });
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleInputChange = event => {
        const { name, value } = event.target;
        setFields({ ...fields, [name]: value });
    };

    const handleLogin = () => {

        if (fields.email === "secret" && fields.password === "secret") {
            window.location.href = "/maestro"
        } else {
            return alert('Credenciales incorrectas')
        };

    }

    return (
        <div className='container'>
            <Paper elevation={3} style={{ width: '300px', padding: '20px' }}
            >
                <Grid style={{ textAlign: 'center' }}>
                    <h3>EMAPE</h3>
                </Grid>
                <Grid>
                    <TextField fullWidth type="email" onChange={handleInputChange} label="Email" variant="outlined" name="email"
                    />
                </Grid>
                <Grid style={{ marginTop: '20px' }}>
                    <FormControl variant="outlined" fullWidth>
                        <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                        <OutlinedInput

                            id="outlined-adornment-password"
                            name="password"
                            type={values.showPassword ? 'text' : 'password'}
                            value={values.password}
                            onChange={handleInputChange}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        edge="end"
                                    >
                                        {values.showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            }
                            label="Password"
                        />
                    </FormControl>
                </Grid>
                <Grid style={{ marginTop: '50px', textAlign: 'center' }}>
                    <Button onClick={handleLogin} variant="contained" >Login</Button>
                </Grid>
            </Paper>
        </div>
    );
}

export default Home;

