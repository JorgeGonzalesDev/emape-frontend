import {
  getStateCivil,
  getDepartments,
  getProvincesByDepartment,
  getDistrictsByProvince,
} from "../../service/common";
import { getLevelEducate } from "../../service/nivelEducate";
import moment from "moment";
import Swal from "sweetalert2";
import { useParams } from "react-router-dom";
import { getProfessions } from "../../service/profession";
import { Grid, Button, MenuItem, TextField } from "@mui/material";
import { useState, useEffect } from "react";
import { AddOrUpdatePerson, getPerson } from "../../service/person";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { useNavigate } from 'react-router-dom';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const RegisterSteps = () => {
  const { id } = useParams();

  const [stateCivil, setStateCivil] = useState([]);
  const [levelEducate, setLevelEducate] = useState([]);
  const [professions, setProfessions] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [departmentsDir, setDepartmentsDir] = useState([]);
  const [provincesDir, setProvincesDir] = useState([]);
  const [districtsDir, setDistrictsDir] = useState([]);
  const [fields, setFields] = useState({
    coD_PERS: 0,
    //feC_USUREG: moment(new Date()).format(),
    inD_ESTADO: 0,
    inD_DOC: 0,
    nuM_DOC: "",
    nuM_RUC: "",
    deS_APELLP: "",
    deS_APELLM: "",
    noM_PERS: "",
    noM_ABR: "",
    inD_SEXO: 0,
    feC_NACIM: moment(new Date()).format(),
    coD_NACDPT: 0,
    coD_NACPRV: 0,
    coD_NACDIS: 0,
    deS_DIRACT: "",
    deS_DIRALTERNA: "",
    coD_DIRDPT: 0,
    coD_DIRPRV: 0,
    coD_DIRDIS: 0,
    coD_ESTCIVIL: 0,
    coD_GRDINSTRUC: 0,
    coD_PROFES: 0,
    nuM_TLF: "",
    nuM_CELULAR: "",
    txT_EMAIL: "",
    txT_OBSERV: "",
  });

  const defaultErrors = {
    inD_ESTADO: false,
    inD_DOC: false,
    nuM_DOC: false,
    nuM_RUC: false,
    deS_APELLP: false,
    deS_APELLM: false,
    noM_PERS: false,
    noM_ABR: false,
    inD_SEXO: false,
    feC_NACIM: false,
    coD_NACDPT: false,
    coD_NACPRV: false,
    coD_NACDIS: false,
    deS_DIRACT: false,
    deS_DIRALTERNA: false,
    coD_DIRDPT: false,
    coD_DIRPRV: false,
    coD_DIRDIS: false,
    coD_ESTCIVIL: false,
    coD_GRDINSTRUC: false,
    coD_PROFES: false,
    nuM_TLF: false,
    nuM_CELULAR: false,
    txT_EMAIL: false,
    txT_OBSERV: false,
  };

  const [inputError, setInputError] = useState(defaultErrors);

  let navigate = useNavigate();

  const navigateBack = () => {
    navigate(-1)
  }

  const validateFields = () => {

    const copyFields = { ...fields };

    delete copyFields.coD_PERS;

    let errors = {};

    Object.keys(copyFields).forEach(key => {
      if (copyFields[key] === '' || copyFields[key] === 0 || !copyFields[key]) {

        console.log(
          `El campo ${key} => ${copyFields[key]} no puede estar vacío`
        );

        errors[`${key}`] = true;
      }
    });

    if (Object.keys(errors).length > 0) {

      setInputError(errors);
      return false;
    }

    setInputError(defaultErrors);
    return true;

  }

  const loadData = async () => {
    if (id) {
      const response = await getPerson(id);
      if (response.listado) {
        setFields({
          coD_PERS: response.listado[0]["coD_PERS"],
          //feC_USUREG: response.listado[0]['feC_USUREG'],
          inD_ESTADO: response.listado[0]['inD_ESTADO'],
          inD_DOC: response.listado[0]['inD_DOC'],
          nuM_DOC: response.listado[0]["nuM_DOC"],
          nuM_RUC: response.listado[0]["nuM_RUC"],
          deS_APELLP: response.listado[0]["deS_APELLP"],
          deS_APELLM: response.listado[0]["deS_APELLM"],
          noM_PERS: response.listado[0]["noM_PERS"],
          noM_ABR: response.listado[0]["noM_ABR"],
          inD_SEXO: response.listado[0]["inD_SEXO"],
          feC_NACIM: response.listado[0]["feC_NACIM"],
          coD_NACDPT: response.listado[0]["coD_NACDPT"],
          coD_NACPRV: response.listado[0]["coD_NACPRV"],
          coD_NACDIS: response.listado[0]["coD_NACDIS"],
          deS_DIRACT: response.listado[0]["deS_DIRACT"],
          deS_DIRALTERNA: response.listado[0]["deS_DIRALTERNA"],
          coD_DIRDPT: response.listado[0]["coD_DIRDPT"],
          coD_DIRPRV: response.listado[0]["coD_DIRPRV"],
          coD_DIRDIS: response.listado[0]["coD_DIRDIS"],
          coD_ESTCIVIL: response.listado[0]["coD_ESTCIVIL"],
          coD_GRDINSTRUC: response.listado[0]["coD_GRDINSTRUC"],
          coD_PROFES: response.listado[0]["coD_PROFES"],
          nuM_TLF: response.listado[0]["nuM_TLF"],
          nuM_CELULAR: response.listado[0]["nuM_CELULAR"],
          txT_EMAIL: response.listado[0]["txT_EMAIL"],
          txT_OBSERV: response.listado[0]["txT_OBSERV"],
        });
        getProvinces(response.listado[0]["coD_NACDPT"]);
        getDistricts(
          response.listado[0]["coD_NACDPT"],
          response.listado[0]["coD_NACPRV"]
        );
        getProvincesDir(response.listado[0]["coD_DIRDPT"]);
        getDistrictsDir(
          response.listado[0]["coD_NACDPT"],
          response.listado[0]["coD_DIRPRV"]
        );
      } else {
        return (window.location = "/maestro/persona");
      }
    }

    const responseStateCivil = await getStateCivil();
    const responseLevelEducate = await getLevelEducate();
    const responseDepartments = await getDepartments();
    const responseProfessions = await getProfessions();
    setStateCivil(responseStateCivil.listado);
    setLevelEducate(responseLevelEducate.listado);
    setDepartments(responseDepartments.listado);
    setDepartmentsDir(responseDepartments.listado);
    setProfessions(responseProfessions.listado);
  };

  useEffect(() => {
    loadData();
  }, []);

  const getProvinces = async (id) => {
    const response = await getProvincesByDepartment(id);
    setProvinces(response.listado);
  };

  const getDistricts = async (idD, idP) => {
    const response = await getDistrictsByProvince(idD, idP);
    setDistricts(response.listado);
  };

  const getProvincesDir = async (id) => {
    const response = await getProvincesByDepartment(id);
    setProvincesDir(response.listado);
  };

  const getDistrictsDir = async (idD, idP) => {
    const response = await getDistrictsByProvince(idD, idP);
    setDistrictsDir(response.listado);
  };

  const handleInputChange = (event) => {

    const { name, type, checked, value } = event.target;

    const val = type === "checkbox" ? checked : value;

    setFields({
      ...fields,
      [name]: val,
    });

    if (name === "coD_NACDPT") getProvinces(value);
    if (name === "coD_NACPRV") getDistricts(fields.coD_NACDPT, value);
    if (name === "coD_DIRDPT") getProvincesDir(value);
    if (name === "coD_DIRPRV") getDistrictsDir(fields.coD_DIRDPT, value);

  };

  const handleInputChangeDate = (value, name) => {
    setFields({
      ...fields,
      [name]: moment(new Date(value)).format(),
    });
  };

  const savePerson = async () => {

    const validate = validateFields();

    if (!validate) return;

    if (!isValidEmail(fields.txT_EMAIL)) {
      return Swal.fire({
        icon: "error",
        title: "Ingrese un correo electronico valido",
        showConfirmButton: false,
        timer: 1500,
      });
    };

    const response = await AddOrUpdatePerson(fields);

    if (response.code === 0) {
      await Swal.fire({
        icon: "success",
        title: "Datos ingresados con exito",
        showConfirmButton: false,
        timer: 1500,
      });

      return (window.location = "/maestro/persona");

    } else {
      return Swal.fire({
        icon: "error",
        title: "Ha ocurrido un error al ingresar los datos",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  function isValidEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
  }

  const generalRender = () => {
    return (
      <>
        <Grid item md={12} xs={12} >
          <Button onClick={() => {
            navigateBack();
          }} variant="outlined">
            < ArrowForwardIosIcon />
            Regresar
          </Button>
        </Grid>
        <Grid item md={12} sm={12}>
          <h1>{id ? "Actualizar Persona" : "Registrar Persona"}</h1>
        </Grid>
        <Grid item md={12} sm={12}>
          <h3>Datos Generales</h3>
        </Grid>
        {/* <Grid item md={2} sm={12} xs={12}>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DesktopDatePicker
                                label="Fecha de registro"
                                inputFormat="dd/MM/yyyy"
                                value={moment(fields.feC_USUREG).format()}
                                onChange={e =>
                                    handleInputChangeDate(e, 'feC_USUREG')}
                                renderInput={(params) => <TextField fullWidth {...params} />}
                            />
                        </LocalizationProvider>
                    </Grid> */}
        <Grid item md={2} sm={12} xs={12}>
          <TextField
            name="inD_ESTADO"
            fullWidth
            select
            label="Estado"
            onChange={handleInputChange}
            size="small"
            error={inputError.inD_ESTADO}
            value={fields.inD_ESTADO}
          >
            <MenuItem value="0" disabled>
              Sin seleccionar
            </MenuItem>
            <MenuItem value="A" >
              Activo
            </MenuItem>
            <MenuItem value="I">
              Inactivo
            </MenuItem>
          </TextField>
        </Grid>
        <Grid item md={12} />
        <Grid item md={2} sm={12} xs={12}>
          <TextField
            name="inD_DOC"
            fullWidth
            select
            size="small"
            label="Tipo Documento"
            onChange={handleInputChange}
            error={inputError.inD_DOC}
            value={fields.inD_DOC}
          >
            <MenuItem value="0" disabled>
              Sin seleccionar
            </MenuItem>
            <MenuItem value="1">
              DNI
            </MenuItem>
            {/* <MenuItem value="2">
                                Extranjero
                            </MenuItem> */}
          </TextField>
        </Grid>
        <Grid item md={3} sm={12} xs={12}>
          <TextField
            name="nuM_DOC"
            fullWidth
            label="Número de doc."
            type="number"
            size="small"
            error={inputError.nuM_DOC}
            onChange={handleInputChange}
            value={fields.nuM_DOC}
          />
        </Grid>
        <Grid item md={3} sm={12} xs={12}>
          <TextField
            name="nuM_RUC"
            fullWidth
            label="N° RUC"
            type="number"
            size="small"
            error={inputError.nuM_RUC}
            onChange={handleInputChange}
            value={fields.nuM_RUC}
          />
        </Grid>
        <Grid item md={12} />
        <Grid item md={3} sm={12} xs={12}>
          <TextField
            name="deS_APELLP"
            fullWidth
            label="Apellido Paterno"
            type="text"
            size="small"
            error={inputError.deS_APELLP}
            onChange={handleInputChange}
            value={fields.deS_APELLP}
          />
        </Grid>
        <Grid item md={3} sm={12} xs={12}>
          <TextField
            name="deS_APELLM"
            fullWidth
            label="Apellido Materno"
            type="text"
            size="small"
            error={inputError.deS_APELLM}
            onChange={handleInputChange}
            value={fields.deS_APELLM}
          />
        </Grid>
        <Grid item md={2} sm={12} xs={12}>
          <TextField
            name="noM_PERS"
            fullWidth
            label="Nombres"
            type="text"
            size="small"
            error={inputError.noM_PERS}
            onChange={handleInputChange}
            value={fields.noM_PERS}
          />
        </Grid>
        <Grid item md={12} />
        <Grid item md={4} xs={12}>
          <TextField
            fullWidth
            label="Apellido y Nombre"
            type="text"
            size="small"
            inputProps={{ readOnly: true }}
            value={`${fields.deS_APELLP} ${fields.deS_APELLM} ${fields.noM_PERS}`}
          />
        </Grid>
        <Grid item md={2} xs={12}>
          <TextField
            name="inD_SEXO"
            fullWidth
            select
            label="Sexo"
            size="small"
            error={inputError.inD_SEXO}
            onChange={handleInputChange}
            value={fields.inD_SEXO}
          >
            <MenuItem value="0" disabled>Sin especificar</MenuItem>
            <MenuItem value="M">Masculino</MenuItem>
            <MenuItem value="F">Femenino</MenuItem>
          </TextField>
        </Grid>
        <Grid item md={12} />
        <Grid item md={12} sm={12}>
          <h3>Datos de Nacimiento</h3>
        </Grid>
        <Grid item md={3} sm={12} xs={12}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DesktopDatePicker
              label="Fecha de nacimiento"
              inputFormat="dd-MM-yyyy"
              value={moment(fields.feC_NACIM).format()}
              onChange={(e) => handleInputChangeDate(e, "feC_NACIM")}
              renderInput={(params) => <TextField size="small" fullWidth {...params} />}
            />
          </LocalizationProvider>
        </Grid>
        {/* <Grid item md={2} sm={12} xs={12}>
                        <TextField
                            name="age"
                            fullWidth
                            label="Edad"
                            type='number'
                            onChange={handleInputChange}
                            value={fields.age}
                            error={inputError.age}
                        />
                    </Grid> */}
        <Grid item md={12} />
        <Grid item md={2} xs={12}>
          <TextField
            name="coD_NACDPT"
            fullWidth
            select
            label="Departamento"
            size="small"
            onChange={handleInputChange}
            value={fields.coD_NACDPT}
            error={inputError.coD_NACDPT}
          >
            <MenuItem value="0" disabled >
              Sin especificar
            </MenuItem>
            {departments &&
              departments.map((department) => (
                <MenuItem value={department.coD_DPTO}>
                  {department.deS_DPTO}
                </MenuItem>
              ))}
          </TextField>
        </Grid>
        <Grid item md={2} xs={12}>
          <TextField
            fullWidth
            name="coD_NACPRV"
            select
            label="Provincia"
            size="small"
            onChange={handleInputChange}
            value={fields.coD_NACPRV}
            error={inputError.coD_NACPRV}
          >
            <MenuItem value="0" disabled >
              Sin especificar
            </MenuItem>
            {provinces &&
              provinces.map((provinces) => (
                <MenuItem value={provinces.coD_PROVI}>
                  {provinces.deS_PROVI}
                </MenuItem>
              ))}
          </TextField>
        </Grid>
        <Grid item md={2} xs={12}>
          <TextField
            fullWidth
            name="coD_NACDIS"
            select
            label="Distrito"
            size="small"
            onChange={handleInputChange}
            value={fields.coD_NACDIS}
            error={inputError.coD_NACDIS}
          >
            <MenuItem value="0" disabled >
              Sin especificar
            </MenuItem>
            {districts &&
              districts.map((districts) => (
                <MenuItem value={districts.coD_DISTRI}>
                  {districts.deS_DISTRI}
                </MenuItem>
              ))}
          </TextField>
        </Grid>
        <Grid item md={12} />
        {/* espacio */}

        <Grid item md={12} sm={12}>
          <h3>Datos de Dirección</h3>
        </Grid>
        <Grid item md={4} sm={12} xs={12}>
          <TextField
            fullWidth
            label="Dirección Principal"
            type="text"
            name="deS_DIRACT"
            size="small"
            onChange={handleInputChange}
            value={fields.deS_DIRACT}
            error={inputError.deS_DIRACT}
          />
        </Grid>
        {/* <Grid item md={2} sm={12} xs={12}>
                    <TextField
                        fullWidth
                        name="locate"
                        select
                        label="Localidad"
                        onChange={handleInputChange}
                        value={fields.locate}
                        error={inputError.locate}
                    >
                        <MenuItem value="1">
                            Lima
                        </MenuItem>
                    </TextField>
                </Grid> */}
        <Grid item md={12} />
        <Grid item md={4} sm={12} xs={12}>
          <TextField
            fullWidth
            label="Dirección Alterna"
            type="text"
            name="deS_DIRALTERNA"
            size="small"
            onChange={handleInputChange}
            value={fields.deS_DIRALTERNA}
            error={inputError.deS_DIRALTERNA}
          />
        </Grid>
        <Grid item md={12} xs={12} />
        <Grid item md={2} xs={12}>
          <TextField
            name="coD_DIRDPT"
            fullWidth
            select
            label="Departamento"
            size="small"
            onChange={handleInputChange}
            value={fields.coD_DIRDPT}
            error={inputError.coD_DIRDPT}
          >
            <MenuItem value="0" disabled>Sin especificar</MenuItem>
            {departmentsDir &&
              departmentsDir.map((department) => (
                <MenuItem value={department.coD_DPTO}>
                  {department.deS_DPTO}
                </MenuItem>
              ))}
          </TextField>
        </Grid>
        <Grid item md={2} xs={12}>
          <TextField
            fullWidth
            name="coD_DIRPRV"
            select
            label="Provincia"
            size="small"
            onChange={handleInputChange}
            value={fields.coD_DIRPRV}
            error={inputError.coD_DIRPRV}
          >
            <MenuItem value="0" disabled>Sin especificar</MenuItem>
            {provincesDir &&
              provincesDir.map((provinces) => (
                <MenuItem value={provinces.coD_PROVI}>
                  {provinces.deS_PROVI}
                </MenuItem>
              ))}
          </TextField>
        </Grid>
        <Grid item md={2} xs={12}>
          <TextField
            fullWidth
            name="coD_DIRDIS"
            select
            label="Distrito"
            size="small"
            onChange={handleInputChange}
            value={fields.coD_DIRDIS}
            error={inputError.coD_DIRDIS}
          >
            <MenuItem value="0" disabled>Sin especificar</MenuItem>
            {districtsDir &&
              districtsDir.map((districts) => (
                <MenuItem value={districts.coD_DISTRI}>
                  {districts.deS_DISTRI}
                </MenuItem>
              ))}
          </TextField>
        </Grid>

        {/* espacio */}

        <Grid item md={12} sm={12} xs={12}>
          <h3>Datos Extras</h3>
        </Grid>
        <Grid item md={2} xs={12}>
          <TextField
            name="coD_ESTCIVIL"
            fullWidth
            select
            label="Estado Civil"
            size="small"
            onChange={handleInputChange}
            value={fields.coD_ESTCIVIL}
            error={inputError.coD_ESTCIVIL}
          >
            <MenuItem value="0" disabled>Sin especificar</MenuItem>
            {stateCivil &&
              stateCivil.map((stateCivil) => (
                <MenuItem value={stateCivil.coD_ESTCIVIL}>
                  {stateCivil.deS_ESTCIVIL}
                </MenuItem>
              ))}
          </TextField>
        </Grid>
        <Grid item md={4} xs={12}>
          <TextField
            fullWidth
            name="coD_GRDINSTRUC"
            select
            label="Nivel educativo"
            size="small"
            onChange={handleInputChange}
            value={fields.coD_GRDINSTRUC}
            error={inputError.coD_GRDINSTRUC}
          >
            <MenuItem value="0" disabled>Sin especificar</MenuItem>
            {levelEducate &&
              levelEducate.map((levelEducate) => (
                <MenuItem value={levelEducate.coD_GRDINSTRUC}>
                  {levelEducate.abreviadO_GRADO}
                </MenuItem>
              ))}
          </TextField>
        </Grid>
        <Grid item md={4} xs={12}>
          <TextField
            fullWidth
            name="coD_PROFES"
            select
            label="Profesión"
            size="small"
            onChange={handleInputChange}
            value={fields.coD_PROFES}
            error={inputError.coD_PROFES}
          >
            <MenuItem value="0" disabled>Sin especificar</MenuItem>
            {professions &&
              professions.map((profession) => (
                <MenuItem value={profession.coD_PROFES}>
                  {profession.abR_PROFES}
                </MenuItem>
              ))}
          </TextField>
        </Grid>
        <Grid item md={12} xs={12} />
        <Grid item md={2} sm={12} xs={12}>
          <TextField
            fullWidth
            label="Teléfono Fijo"
            type="number"
            name="nuM_TLF"
            size="small"
            onChange={handleInputChange}
            value={fields.nuM_TLF}
            error={inputError.nuM_TLF}
          />
        </Grid>
        <Grid item md={2} sm={12} xs={12}>
          <TextField
            fullWidth
            label="Celular"
            type="number"
            name="nuM_CELULAR"
            size="small"
            onChange={handleInputChange}
            value={fields.nuM_CELULAR}
            error={inputError.nuM_CELULAR}
          />
        </Grid>
        <Grid item md={3} sm={12} xs={12}>
          <TextField
            fullWidth
            label="Email"
            type="email"
            name="txT_EMAIL"
            size="small"
            onChange={handleInputChange}
            value={fields.txT_EMAIL}
            error={inputError.txT_EMAIL}
          />
        </Grid>
        <Grid item md={7} xs={12}>
          <TextField
            label="Observaciones"
            multiline
            fullWidth
            rows={4}
            name="txT_OBSERV"
            size="small"
            onChange={handleInputChange}
            value={fields.txT_OBSERV}
            error={inputError.txT_OBSERV}
          />
        </Grid>
        {/* f */}
        <Grid item md={12} xs={12} />
        <Grid item md={12} xs={12}>
          {/* <Button variant="contained" onClick={() => {
            navigateBack();
          }}>
            Cancelar
          </Button> */}
          <Button onClick={savePerson} variant="contained" >
            Guardar
          </Button>
        </Grid>
      </>

    );

  };
  return (

    <>
      <Grid container spacing={2}>
        {generalRender()}
      </Grid>
    </>

  )
};

export default RegisterSteps;
