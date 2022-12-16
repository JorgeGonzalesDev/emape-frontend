import {
  getStateCivil, getDepartments, getProvincesByDepartment,
  getDistrictsByProvince,
} from "../../service/common";
import { getLevelEducate } from "../../service/nivelEducate";
import moment from "moment";
import { useParams } from "react-router-dom";
import { getProfessions } from "../../service/profession";
import { Grid, Button, MenuItem, TextField } from "@mui/material";
import { useState, useEffect } from "react";
import { AddOrUpdatePerson, getPerson } from "../../service/person";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { useNavigate } from 'react-router-dom';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { AlertError, AlertSuccess, AlertWarning } from "../Alerts";
import { PATH } from "../../service/config";

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
    inD_ESTADO: "A",
    inD_DOC: "1",
    nuM_DOC: null,
    nuM_RUC: null,
    deS_APELLP: null,
    deS_APELLM: null,
    noM_PERS: null,
    noM_ABR: null,
    inD_SEXO: null,
    feC_NACIM: null,
    coD_NACDPT: null,
    coD_NACPRV: null,
    coD_NACDIS: null,
    deS_DIRACT: null,
    deS_DIRALTERNA: null,
    coD_DIRDPT: null,
    coD_DIRPRV: null,
    coD_DIRDIS: null,
    coD_ESTCIVIL: null,
    coD_GRDINSTRUC: null,
    coD_PROFES: null,
    nuM_TLF: null,
    nuM_CELULAR: null,
    txT_EMAIL: null,
    txT_OBSERV: null,
    coD_VER_NUM_DOC: null
  });


  const defaultErrors = {
    nuM_DOC: true,
    deS_APELLP: true,
    deS_APELLM: true,
    noM_PERS: true,
    inD_SEXO: true,
    feC_NACIM: true,
    coD_ESTCIVIL: true,
  };

  const [inputError, setInputError] = useState(defaultErrors);

  const navigate = useNavigate();

  const navigateBack = () => {
    navigate(-1)
  }

  const validateFields = () => {

    const copyFields = { ...fields };
    delete copyFields.coD_PERS;
    delete copyFields.noM_ABR;
    delete copyFields.coD_NACDPT;
    delete copyFields.coD_NACPRV;
    delete copyFields.coD_NACDIS;
    delete copyFields.deS_DIRACT;
    delete copyFields.deS_DIRALTERNA;
    delete copyFields.coD_DIRDPT;
    delete copyFields.coD_DIRPRV;
    delete copyFields.coD_DIRDIS;
    delete copyFields.nuM_TLF;
    delete copyFields.coD_GRDINSTRUC;
    delete copyFields.coD_PROFES;
    delete copyFields.nuM_CELULAR;
    delete copyFields.txT_EMAIL;
    delete copyFields.txT_OBSERV;
    delete copyFields.nuM_RUC;
    delete copyFields.coD_VER_NUM_DOC;

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
      AlertWarning("Hay campos obligatorios vacios");
      return false;

    }

    setInputError(errors);

    return true;

  }

  const pathPROD = PATH
  // const pathPROD = ""


  const loadData = async () => {
    if (id) {

      setInputError({
        nuM_DOC: false,
        deS_APELLP: false,
        deS_APELLM: false,
        noM_PERS: false,
        inD_SEXO: false,
        feC_NACIM: false,
        coD_ESTCIVIL: false,
      });

      const response = await getPerson(id);
      if (response.listado) {
        setFields({
          coD_PERS: response.listado[0]["coD_PERS"],
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
          coD_VER_NUM_DOC: response.listado[0]["coD_VER_NUM_DOC"]
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
        return (window.location = pathPROD + "/maestro/persona");
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

  const isValidNumber = (value) => {
    return /^[0-9]+$/.test(value);
  }

  const handleInputChange = (event) => {

    const { name, type, checked, value } = event.target;
    const val = type === "checkbox" ? checked : value;

    if (name === "nuM_CELULAR" || name === "nuM_TLF" || name === "nuM_DOC" || name === "nuM_RUC") {
      if (value.length === 0) {
        setFields({
          ...fields,
          [name]: value,
        });
      } else if (isValidNumber(value)) {
        setFields({
          ...fields,
          [name]: value,
        });
      }
      return
    }

    setFields({
      ...fields,
      [name]: val,
    });

    if (name === "coD_NACDPT") {
      setFields({
        ...fields,
        [name]: value,
        coD_NACPRV: "",
        coD_NACDIS: ""
      })
      return getProvinces(value);
    }

    if (name === "coD_NACPRV") {
      setFields({
        ...fields,
        [name]: value,
        coD_NACDIS: ""
      })
      return getDistricts(fields.coD_NACDPT, value);
    }

    if (name === "coD_DIRDPT") {
      setFields({
        ...fields,
        [name]: value,
        coD_DIRPRV: "",
        coD_DIRDIS: ""
      })
      return getProvincesDir(value);
    }

    if (name === "coD_DIRPRV") {
      setFields({
        ...fields,
        [name]: value,
        coD_DIRDIS: ""
      })
      return getDistrictsDir(fields.coD_DIRDPT, value);
    }


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
    if (fields.txT_EMAIL != null) {
      if (!isValidEmail(fields.txT_EMAIL)) {
        return await AlertError("Corre electronico no valido")
      }
    };
    const response = await AddOrUpdatePerson(fields);
    if (response.code === 0) {
      await AlertSuccess(`${response.message}`)
      return navigate(pathPROD + "/maestro/persona");
    } else {
      await AlertError(`${response.message}`)
    }

  };

  const isValidEmail = (email) => {
    return /\S+@\S+\.\S+/.test(email);
  }

  const generalRender = () => {
    return (
      <>
        <Grid item md={12} sm={12}  style={{textAlign:'center'}}>
          <span style={{ fontSize: 25, fontWeight: 'bolder' }} >{id ? "Actualizar Persona" : "Registrar Persona"}</span>
          <p style={{ color: 'red', fontSize: 15 }}>(Los campos con * son obligatorios)</p>
        </Grid>
        <Grid item md={8} sm={12}>
          <h3>Datos Generales</h3>
        </Grid>
        <Grid item md={12} />
        <Grid item md={2} sm={12} xs={12}>
          <TextField
            name="inD_ESTADO"
            fullWidth
            InputLabelProps={{
              shrink: true
            }}
            select
            label="Estado *"
            onChange={handleInputChange}
            size="small"
            error={inputError.inD_ESTADO}
            value={fields.inD_ESTADO}
          >
            <MenuItem value="A" >
              Activo
            </MenuItem>
            <MenuItem value="I">
              Inactivo
            </MenuItem>
          </TextField>
        </Grid>
        <Grid item md={2} xs={12}>
          <TextField
            name="inD_SEXO"
            fullWidth
            InputLabelProps={{
              shrink: true
            }}
            select
            label="Sexo *"
            size="small"
            error={inputError.inD_SEXO}
            onChange={handleInputChange}
            value={fields.inD_SEXO}
          >
            <MenuItem value="M">Masculino</MenuItem>
            <MenuItem value="F">Femenino</MenuItem>
          </TextField>
        </Grid>
        <Grid item md={2} sm={12} xs={12}>
          <TextField
            name="coD_VER_NUM_DOC"
            fullWidth
            InputLabelProps={{
              shrink: true
            }}
            label="Verificación DNI"
            type="text"
            size="small"
            inputProps={{ maxLength: 2 }}
            onChange={handleInputChange}
            value={fields.coD_VER_NUM_DOC}
          />
        </Grid>
        <Grid item md={2}/>
        <Grid item md={12} />
        <Grid item md={2} sm={12} xs={12}>
          <TextField
            name="inD_DOC"
            fullWidth
            InputLabelProps={{
              shrink: true
            }}
            select
            size="small"
            label="Tipo Documento *"
            onChange={handleInputChange}
            error={inputError.inD_DOC}
            value={fields.inD_DOC}
          >
            <MenuItem value="1">
              DNI
            </MenuItem>
            <MenuItem value="2">
              Carnet de Extranjeria
            </MenuItem>
          </TextField>
        </Grid>
        <Grid item md={3} sm={12} xs={12}>
          <TextField
            name="nuM_DOC"
            fullWidth
            InputLabelProps={{
              shrink: true
            }}
            label="Número de doc. *"
            type="text"
            size="small"
            inputProps={{ maxLength: 12 }}
            error={inputError.nuM_DOC}
            onChange={handleInputChange}
            value={fields.nuM_DOC}
          />
        </Grid>
        <Grid item md={3} sm={12} xs={12}>
          <TextField
            name="nuM_RUC"
            fullWidth
            InputLabelProps={{
              shrink: true
            }}
            label="N° RUC"
            type="text"
            size="small"
            inputProps={{ maxLength: 11 }}
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
            InputLabelProps={{
              shrink: true
            }}
            label="Apellido Paterno *"
            type="text"
            size="small"
            inputProps={{ maxLength: 30 }}
            error={inputError.deS_APELLP}
            onChange={handleInputChange}
            value={fields.deS_APELLP}
          />
        </Grid>
        <Grid item md={3} sm={12} xs={12}>
          <TextField
            name="deS_APELLM"
            fullWidth
            InputLabelProps={{
              shrink: true
            }}
            inputProps={{ maxLength: 30 }}
            label="Apellido Materno *"
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
            InputLabelProps={{
              shrink: true
            }}
            inputProps={{ maxLength: 30 }}
            label="Nombres *"
            type="text"
            size="small"
            error={inputError.noM_PERS}
            onChange={handleInputChange}
            value={fields.noM_PERS}
          />
        </Grid>
        <Grid item md={12}/>
        <Grid item md={8} sm={12}>
          <h3>Datos de Nacimiento</h3>
        </Grid>
        <Grid item md={12} />
        <Grid item md={2} sm={12} xs={12}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DesktopDatePicker
              label="Fecha de nacimiento *"
              inputFormat="dd-MM-yyyy"
              value={moment(fields.feC_NACIM).format()}
              onChange={(e) => handleInputChangeDate(e, "feC_NACIM")}
              renderInput={(params) => <TextField size="small" fullWidth
                InputLabelProps={{
                  shrink: true
                }} {...params} />}
            />
          </LocalizationProvider>
        </Grid>
        <Grid item md={2} xs={12}>
          <TextField
            name="coD_NACDPT"
            fullWidth
            InputLabelProps={{
              shrink: true
            }}
            select
            label="Departamento"
            size="small"
            onChange={handleInputChange}
            value={fields.coD_NACDPT}
            error={inputError.coD_NACDPT}
          >
            <MenuItem value={null}>
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
            InputLabelProps={{
              shrink: true
            }}
            name="coD_NACPRV"
            select
            label="Provincia"
            size="small"
            onChange={handleInputChange}
            value={fields.coD_NACPRV}
            error={inputError.coD_NACPRV}
          >
            <MenuItem value={null}>
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
            InputLabelProps={{
              shrink: true
            }}
            name="coD_NACDIS"
            select
            label="Distrito"
            size="small"
            onChange={handleInputChange}
            value={fields.coD_NACDIS}
            error={inputError.coD_NACDIS}
          >
            <MenuItem value={null}>
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

        <Grid item md={8} sm={12}>
          <h3>Datos de Dirección</h3>
        </Grid>
        <Grid item md={12} />
        <Grid item md={4} sm={12} xs={12}>
          <TextField
            fullWidth
            InputLabelProps={{
              shrink: true
            }}
            label="Dirección Principal"
            type="text"
            name="deS_DIRACT"
            size="small"
            onChange={handleInputChange}
            value={fields.deS_DIRACT}
            error={inputError.deS_DIRACT}
            inputProps={{ maxLength: 90 }}
          />
        </Grid>
        <Grid item md={4} sm={12} xs={12}>
          <TextField
            fullWidth
            InputLabelProps={{
              shrink: true
            }}
            label="Dirección Alterna"
            type="text"
            name="deS_DIRALTERNA"
            size="small"
            onChange={handleInputChange}
            value={fields.deS_DIRALTERNA}
            inputProps={{ maxLength: 90 }}
            error={inputError.deS_DIRALTERNA}
          />
        </Grid>
        <Grid item md={12} xs={12} />
        <Grid item md={2.5} xs={12}>
          <TextField
            name="coD_DIRDPT"
            fullWidth
            InputLabelProps={{
              shrink: true
            }}
            select
            label="Departamento"
            size="small"
            onChange={handleInputChange}
            value={fields.coD_DIRDPT}
            error={inputError.coD_DIRDPT}
          >
            <MenuItem value={null}>
              Sin especificar
            </MenuItem>
            {departmentsDir &&
              departmentsDir.map((department) => (
                <MenuItem value={department.coD_DPTO}>
                  {department.deS_DPTO}
                </MenuItem>
              ))}
          </TextField>
        </Grid>
        <Grid item md={2.5} xs={12}>
          <TextField
            fullWidth
            InputLabelProps={{
              shrink: true
            }}
            name="coD_DIRPRV"
            select
            label="Provincia"
            size="small"
            onChange={handleInputChange}
            value={fields.coD_DIRPRV}
            error={inputError.coD_DIRPRV}
          >

            <MenuItem value={null}>
              Sin especificar
            </MenuItem>
            {provincesDir &&
              provincesDir.map((provinces) => (
                <MenuItem value={provinces.coD_PROVI}>
                  {provinces.deS_PROVI}
                </MenuItem>
              ))}
          </TextField>
        </Grid>
        <Grid item md={3} xs={12}>
          <TextField
            fullWidth
            InputLabelProps={{
              shrink: true
            }}
            name="coD_DIRDIS"
            select
            label="Distrito"
            size="small"
            onChange={handleInputChange}
            value={fields.coD_DIRDIS}
            error={inputError.coD_DIRDIS}
          >

            <MenuItem value={null}>
              Sin especificar
            </MenuItem>
            {districtsDir &&
              districtsDir.map((districts) => (
                <MenuItem value={districts.coD_DISTRI}>
                  {districts.deS_DISTRI}
                </MenuItem>
              ))}
          </TextField>
        </Grid>

        {/* espacio */}

        <Grid item md={8} sm={12} xs={12}>
          <h3>Datos Extras</h3>
        </Grid>
        <Grid item md={12} />
        <Grid item md={2} xs={12}>
          <TextField
            name="coD_ESTCIVIL"
            fullWidth
            InputLabelProps={{
              shrink: true
            }}
            select
            label="Estado Civil *"
            size="small"
            onChange={handleInputChange}
            value={fields.coD_ESTCIVIL}
            error={inputError.coD_ESTCIVIL}
          >
            {stateCivil &&
              stateCivil.map((stateCivil) => (
                <MenuItem value={stateCivil.coD_ESTCIVIL}>
                  {stateCivil.deS_ESTCIVIL}
                </MenuItem>
              ))}
          </TextField>
        </Grid>
        <Grid item md={3} xs={12}>
          <TextField
            fullWidth
            InputLabelProps={{
              shrink: true
            }}
            name="coD_GRDINSTRUC"
            select
            label="Nivel educativo"
            size="small"
            onChange={handleInputChange}
            value={fields.coD_GRDINSTRUC}
            error={inputError.coD_GRDINSTRUC}
          >
            <MenuItem value={null}>
              Sin especificar
            </MenuItem>
            {levelEducate &&
              levelEducate.map((levelEducate) => (
                <MenuItem value={levelEducate.coD_GRDINSTRUC}>
                  {levelEducate.abreviadO_GRADO}
                </MenuItem>
              ))}
          </TextField>
        </Grid>
        <Grid item md={3} xs={12}>
          <TextField
            fullWidth
            InputLabelProps={{
              shrink: true
            }}
            name="coD_PROFES"
            select
            label="Profesión"
            size="small"
            onChange={handleInputChange}
            value={fields.coD_PROFES}
            error={inputError.coD_PROFES}
          >
            <MenuItem value={null}>
              Sin especificar
            </MenuItem>
            {professions &&
              professions.map((profession) => (
                <MenuItem value={profession.coD_PROFES}>
                  {profession.abR_PROFES}
                </MenuItem>
              ))}
          </TextField>
        </Grid>
        <Grid item md={12} xs={12} />
        <Grid item md={2.5} sm={12} xs={12}>
          <TextField
            fullWidth
            InputLabelProps={{
              shrink: true
            }}
            label="Teléfono Fijo"
            type="text"
            name="nuM_TLF"
            size="small"
            inputProps={{ maxLength: 20 }}
            onChange={handleInputChange}
            value={fields.nuM_TLF}
            error={inputError.nuM_TLF}
          />
        </Grid>
        <Grid item md={2.5} sm={12} xs={12}>
          <TextField
            fullWidth
            InputLabelProps={{
              shrink: true
            }}
            label="Celular"
            type="text"
            name="nuM_CELULAR"
            size="small"
            inputProps={{ maxLength: 9 }}
            onChange={handleInputChange}
            value={fields.nuM_CELULAR}
            error={inputError.nuM_CELULAR}
          />
        </Grid>
        <Grid item md={3} sm={12} xs={12}>
          <TextField
            fullWidth
            InputLabelProps={{
              shrink: true
            }}
            label="Email"
            type="email"
            name="txT_EMAIL"
            size="small"
            inputProps={{ maxLength: 100 }}
            onChange={handleInputChange}
            value={fields.txT_EMAIL}
            error={inputError.txT_EMAIL}
          />
        </Grid>
        <Grid item md={12} xs={12} />
        <Grid item md={8} xs={12}>
          <TextField
            label="Observaciones"
            multiline
            fullWidth
            inputProps={{ maxLength: 190 }}
            InputLabelProps={{
              shrink: true
            }}
            rows={2}
            name="txT_OBSERV"
            size="small"
            onChange={handleInputChange}
            value={fields.txT_OBSERV}
            error={inputError.txT_OBSERV}
          />
        </Grid>
        {/* f */}
        <Grid item md={12} xs={12} />
        <Grid item md={8} xs={12} sx={{ marginTop: 2 }}>
          <Button onClick={() => {
            navigateBack();
          }} variant="contained">
            < ArrowBackIosNewIcon />
            Regresar
          </Button>
          <Button style={{ marginLeft: 10 }} onClick={savePerson} variant="contained" >
            Guardar
          </Button>
        </Grid>
      </>
    );
  };
  return (

    <>
      <Grid container spacing={1} justifyContent='center' justifyItems='center'>
        {generalRender()}
      </Grid>
    </>

  )
};

export default RegisterSteps;