import "./style.css";
import {
  Paper,
  Grid,
  TextField,
  Button,
  IconButton,
  OutlinedInput,
  InputLabel,
  InputAdornment,
  FormControl,
} from "@mui/material";
import { useState, useContext, useEffect } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import UserContext from "../../context/User/UserContext";
import { PATH } from "../../service/config";

const Home = () => {
  const { logged, login, setLogged } = useContext(UserContext);
  const [fields, setFields] = useState({
    user: "",
    password: "",
  });

  const pathPROD = PATH

  useEffect(() => {
    setLogged(window.localStorage.getItem("token"));
    if (logged) {
      window.location = `${pathPROD}/inicio`;
    }
  }, [login]);

  const [values, setValues] = useState({
    showPassword: false,
  });

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFields({ ...fields, [name]: value });
  };

  const handleLogin = () => {
    login(fields.user, fields.password);
  };

  return (
    <div className="container">
      <Paper style={{ width: "300px", padding: "30px", backgroundColor: 'rgba(255, 255, 255,0.8)', color: 'black' }}>
        <Grid style={{ textAlign: "center" }}>
          <h3>EMAPE RRHH</h3>
        </Grid>
        <Grid>
          <TextField
            fullWidth
            type="text"
            onChange={handleInputChange}
            label="Usuario"
            variant="outlined"
            name="user"
          />
        </Grid>
        <Grid style={{ marginTop: "20px" }}>
          <FormControl variant="outlined" fullWidth>
            <InputLabel htmlFor="outlined-adornment-password">
              Contraseña
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              name="password"
              type={values.showPassword ? "text" : "password"}
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
        <Grid style={{ marginTop: "40px", textAlign: "center" }}>
          <Button onClick={handleLogin} variant="contained" style={{ backgroundColor: "#1B6EC2" }}>
            Iniciar sesión
          </Button>
        </Grid>
      </Paper>
    </div>
  );
};

export default Home;
