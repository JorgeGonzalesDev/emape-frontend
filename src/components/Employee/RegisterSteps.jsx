import { Grid, TextField, MenuItem, Button, Checkbox, FormControlLabel } from "@mui/material";
import { useState } from "react";
import Register from "../../views/Person/Register";

const RegisterSteps = () => {

    const [fields, setFields] = useState({
        'code_employee': '',
        'type_document': '',
        'first_lastname': '',
        'second_lastname': '',
        'full_name': '',

        'code_back': '',
        'document_number': '',
        'ruc': '',
        'name': '',
        'photo': '',
        
        'date_birthday': '',
        'marital_status': '',
        'sex': '',

        'direction_document': '',
        'direction': '',
        'telephone': '',
        'phone': '',
        'email': '',

        'date_register': '',
        'date_update': '',

        'register_for': '',
        'update_for': '',

        'status': '',
        'work_area': '',
        'date_of_admission': '',
        'job_title': '',
        'termination_date': '',
        'job_labor': '',
        'date_end': '',
        'working_condition': '',
        'type_employee': '',
        'workshift': '',
        'fund': '',
        'affiliate': '',
        'plaza': '',
        'level': '',
        'salary_bank': '',
        'salary_account': '',
        'number_CCL': '',
        'bank_CTS': '',
        'count_CTS': '',
        'code_CUSPP': '',
        'job_type': '',
        'pension_type': '',
        'code_ESSALUD': '',
        'labor_regimen': '',
        'pension_regimen': '',
        'health_regimen': '',
        'labor_occupation': '',
        'special_situation': '',
        'occupation_category': '',
        'disability': '',
        'unionized': '',
        'tax_agreement': '',
        'type_pay': '',
        't_register': '',
        'pay_not_AFP': '',
        'older': '',
        'current_age': '',
        'observations': '',
        'date_of_admission_select': '',
        'termination_date_select': '',
        'contract_number': '',

        /* Carga Familiar */

        'relationship': '',
        'dependent':'',
        'legal_burden': '',
        'type_burden': '',
        'fixed_amount': '',
        'percentage': '',
        'bank': '',
        'bank_account': '',
        'number_c_c_i': '',
    });

    const handleInputChange = event => {
        const { name, value } = event.target;
        setFields({ ...fields, [name]: value });
    }

    const [step, setStep] = useState(0);

    const validateFields = () => {

        const copyFields = { ...fields };

        if (step === 0) {

            delete copyFields.full_name;
            delete copyFields.date_birthday;


        }

        let errors = {};

        Object.keys(copyFields).forEach(key => {
            if (copyFields[key] === '') {
                console.log(
                    `El campo ${key} => ${copyFields[key]} no puede estar vacío`
                );

                errors[`${key}`] = true;

            }
        });

        if (Object.keys(errors).length > 0) {
            return false;
        }

        return true;

    }

    const backStep = () => setStep(step - 1);
    const handleSubmit = () => alert('Datos enviado correctamente');

    const nextStep = () => {

        // const validate = validateFields();

        // if (!validate) {
        //     alert('Por favor, complete todos los campos');
        //     return;
        // }

        fields.full_name = `${fields.first_lastname} ${fields.second_lastname} ${fields.name}`;

        console.log(fields);

        setStep(step + 1);

    };


    if (step === 0) {
        return (
            <>
                <Grid container spacing={2}>
                    <Grid item md={12} sm={12}>
                        <h2>Datos Generales</h2>
                    </Grid>
                    <Grid item md={2} sm={12} xs={12}>
                        <TextField
                            fullWidth
                            label="Código Empleado"
                            name="code_employee"
                            onChange={handleInputChange}
                            value={fields.code_employee}
                        />
                    </Grid>
                    {/* Cód. Anterior */}
                    <Grid
                        item md={2} xs={12}>
                        <TextField
                            name="code_back"
                            fullWidth
                            label="Cód. Anterior"
                            onChange={handleInputChange}
                            value={fields.code_back}
                        >
                        </TextField>


                    </Grid>
                    {/* Fin Cód. Anterior */}
                    <Grid item md={12} />
                    {/* Type_document */}
                    <Grid item md={2} sm={12} xs={12}>
                        <TextField
                            name="type_document"
                            fullWidth
                            select
                            label="Tipo Documento"
                            onChange={handleInputChange}
                            value={fields.type_document}
                        >
                            <MenuItem value="dni"  >
                                DNI
                            </MenuItem>
                            <MenuItem value="ext" >
                                Extranjero
                            </MenuItem>
                        </TextField>
                    </Grid>
                    {/* Fin Type_document */}
                    {/* document_number */}
                    <Grid
                        item md={2} xs={12}>
                        <TextField
                            name="document_number"
                            fullWidth
                            label="Número Documento"
                            onChange={handleInputChange}
                            value={fields.document_number}
                        >
                        </TextField>


                    </Grid>
                    {/* Fin document_number */}
                    <Grid item md={12} />

                    <Grid item md={2} sm={12} xs={12}>
                        <TextField
                            name="first_lastname"
                            fullWidth
                            label="Apellido Parterno"
                            onChange={handleInputChange}
                            value={fields.first_lastname}
                        >
                        </TextField>
                    </Grid>
                    {/* Inicio Ruc */}
                    <Grid
                        item md={2} xs={12}>
                        <TextField
                            name="ruc"
                            fullWidth
                            label="Número R.U.C"
                            onChange={handleInputChange}
                            value={fields.ruc}
                        >
                        </TextField>


                    </Grid>
                    {/* fin Ruc */}
                    <Grid item md={12} />
                    <Grid item md={3} sm={12} xs={12}>
                        <TextField
                            name="second_lastname"
                            fullWidth
                            label="Apellido Materno"
                            onChange={handleInputChange}
                            value={fields.second_lastname}
                        />
                    </Grid>
                    <Grid
                        item md={3} sm={12} xs={12}>
                        <TextField
                            name="name"
                            fullWidth
                            label="Nombres"
                            type="text"
                            onChange={handleInputChange}
                            value={fields.name}
                        >
                        </TextField>
                    </Grid>
                    <Grid item md={12} />
                    {/* fin Name */}
                    <Grid item md={6} sm={12} xs={12}>
                        <TextField
                            name="full_name"
                            fullWidth
                            label="Apellido y Nombre"
                            onChange={handleInputChange}
                            type='text'
                            inputProps={
                                { readOnly: true, }
                            }
                            value={`${fields.first_lastname} ${fields.second_lastname} ${fields.name}`}
                        />
                    </Grid>
                    {/* Foto */}
                    <Grid
                        item md={2} xs={12} sm={12}>
                        <TextField
                            name="photo"
                            id="photo"
                            fullWidth
                            type="file"
                            sx={{ display: 'none', }}
                            onChange={handleInputChange}
                            value={fields.photo}
                        >
                        </TextField>
                        <img src="photo" alt="" />
                        <label htmlFor="" for="photo">Foto</label>
                        


                    </Grid>
                    {/* Fin Foto */}

                    <Grid item md={12} />


                    <Grid
                        item md={3} sm={12} xs={12}>
                        <TextField
                            id="date_birthday"
                            name="date_birthday"
                            fullWidth
                            label="Fecha de Nacimiento"
                            type='date'
                            InputLabelProps={{
                                shrink: true,
                            }}
                            onChange={handleInputChange}
                            value={fields.date_birthday}

                        />
                    </Grid>

                    {/* Sex */}

                    <Grid
                        item md={3} sm={12} xs={12}>
                        <TextField
                            name="sex"
                            fullWidth
                            label="Sexo"
                            type='text'
                            onChange={handleInputChange}
                            value={fields.sex}

                        />
                    </Grid>
                    {/* Fin Sex */}
                    {/* Estado civil */}
                    <Grid
                        item md={3} sm={12} xs={12}>
                        <TextField
                            name="marital_status"
                            fullWidth
                            label="Estado vicil"
                            type='text'
                            onChange={handleInputChange}
                            value={fields.marital_status}

                        />
                    </Grid>

                    {/* fin  estado civil */}
                    <Grid item md={12} />
                    {/* Inicio Dirección Legajo */}
                    <Grid item md={9} sm={12} xs={12}>
                        <TextField
                            name="direction_document"
                            fullWidth
                            label="Dirección Legajo"
                            type='text'
                            onChange={handleInputChange}
                            value={fields.direction_document}
                        />
                    </Grid>
                    {/* Fin Dirección Legajo */}
                    <Grid item md={12} />
                    {/* Inicio Dirección Actual */}
                    <Grid item md={9} sm={12} xs={12}>
                        <TextField
                            name="direction"
                            fullWidth
                            label="Dirección Actual"
                            type='text'
                            onChange={handleInputChange}
                            value={fields.direction}
                        />
                    </Grid>
                    <Grid item md={12} />
                    {/* Fin Dirección Actual */}
                    <Grid
                        item md={3} xs={12}>
                        <TextField
                            name="telephone"
                            fullWidth
                            label="Telefono fijo"
                            type='number'
                            maxlength={9}
                            onChange={handleInputChange}
                            value={fields.telephone}
                        />
                    </Grid>

                    {/* celular y mail */}

                    <Grid
                        item md={3} xs={12}>
                        <TextField
                            name="phone"
                            fullWidth
                            label="Celular"
                            type="number"
                            onChange={handleInputChange}
                            value={fields.phone}
                        >
                        </TextField>


                    </Grid>

                    <Grid
                        item md={3} xs={12}>
                        <TextField
                            name="email"
                            fullWidth
                            label="E-mail"
                            type="email"
                            onChange={handleInputChange}
                            value={fields.email}
                        >
                        </TextField>


                    </Grid>

                    {/* fin */}


                    <Grid item md={12} />
                    <Grid
                        item md={4} sm={12} xs={12}>
                        <TextField
                            name="register_for"
                            fullWidth
                            label="Registrado por"
                            onChange={handleInputChange}
                            value={fields.register_for}

                        >
                        </TextField>
                    </Grid>
                    <Grid
                        item md={2} sm={12} xs={12}>
                        <TextField
                            name="date_register"
                            fullWidth
                            type='date'
                            InputLabelProps={{
                                shrink: true,
                            }}
                            onChange={handleInputChange}
                            value={fields.date_register}
                        >
                        </TextField>
                    </Grid>
                    <Grid
                        item md={4} sm={12} xs={12}>
                        <TextField
                            name="update_for"
                            fullWidth
                            label="Modificado por"
                            onChange={handleInputChange}
                            value={fields.update_for}

                        >
                        </TextField>
                    </Grid>
                    <Grid
                        item md={2} sm={12} xs={12}>
                        <TextField
                            name="date_update"
                            fullWidth
                            type='date'
                            InputLabelProps={{
                                shrink: true,
                            }}
                            onChange={handleInputChange}
                            value={fields.date_update}
                        >
                        </TextField>
                    </Grid>

                    <Grid item md={12}>
                        <Button onClick={nextStep} variant="contained">Siguiente</Button>
                    </Grid>
                </Grid>
            </>
        )
    } else if (step === 1) {
        return (
            <>
                <Grid container spacing={2}>
                    <Grid item md={12} sm={12}>
                        <h2>Datos Laborales</h2>
                    </Grid>
                    <Grid item md={4} sm={12} xs={12}>
                        <TextField
                            fullWidth
                            label="Código Empleado"
                            type="text"
                            inputProps={
                                { readOnly: true, }
                            }
                            value={fields.code_employee}
                        />
                    </Grid>
                    <Grid item md={5} sm={12} xs={12}>
                        <TextField
                            fullWidth
                            label="Nombres"
                            name="full_name"
                            type="text"
                            onChange={handleInputChange}
                            value={fields.full_name}
                        />
                    </Grid>
                    <Grid
                        item md={3} sm={12} xs={12}>
                        <TextField
                            name="status"
                            fullWidth
                            label="Estado"
                            type="text"
                            onChange={handleInputChange}
                            value={fields.status}
                        >
                        </TextField>
                    </Grid>
                    <Grid item md={12} />
                    <Grid
                        item md={8} sm={12} xs={12}>
                        <TextField
                            name="work_area"
                            fullWidth
                            label="Area Laboral"
                            type="text"
                            onChange={handleInputChange}
                            value={fields.work_area}
                        >
                        </TextField>
                    </Grid>
                    <Grid
                        item md={4} sm={12} xs={12}>
                        <TextField
                            name="date_of_admission"
                            fullWidth
                            label="Fecha de ingreso"
                            type='date'
                            InputLabelProps={{
                                shrink: true,
                            }}
                            onChange={handleInputChange}
                            value={fields.date_of_admission}

                        />
                    </Grid>
                    <Grid item md={12} />
                    <Grid
                        item md={8} sm={12} xs={12}>
                        <TextField
                            name="job_title"
                            fullWidth
                            select
                            label="Cargo Laboral"
                            type="text"
                            onChange={handleInputChange}
                            value={fields.job_title}
                        >
                            <MenuItem value="a">
                                GERENTE DE PRESUPUESTO
                            </MenuItem>
                            <MenuItem value="b">
                                GERENTE DE PRESUPUESTO
                            </MenuItem>
                        </TextField>
                    </Grid>
                    <Grid
                        item md={4} sm={12} xs={12}>
                        <TextField
                            name="termination_date"
                            fullWidth
                            label="Fecha Cese"
                            type='date'
                            InputLabelProps={{
                                shrink: true,
                            }}
                            onChange={handleInputChange}
                            value={fields.termination_date}

                        />
                    </Grid>
                    <Grid item md={12} />
                    <Grid
                        item md={8} sm={12} xs={12}>
                        <TextField
                            name="job_labor"
                            fullWidth
                            select
                            label="Puesto Laboral"
                            type="text"
                            onChange={handleInputChange}
                            value={fields.job_labor}
                        >
                            <MenuItem value="a">
                                GERENTE DE PRESUPUESTO
                            </MenuItem>
                            <MenuItem value="b">
                                GERENTE DE PRESUPUESTO
                            </MenuItem>
                        </TextField>
                    </Grid>
                    <Grid
                        item md={4} sm={12} xs={12}>
                        <TextField
                            name="date_end"
                            fullWidth
                            label="Fecha Fin Adenda"
                            type='date'
                            InputLabelProps={{
                                shrink: true,
                            }}
                            onChange={handleInputChange}
                            value={fields.date_end}

                        />
                    </Grid>
                    <Grid item md={12} />
                    <Grid
                        item md={4} sm={12} xs={12}>
                        <TextField
                            name="working_condition"
                            fullWidth
                            select
                            label="Condición Laboral"
                            type="text"
                            onChange={handleInputChange}
                            value={fields.working_condition}
                        >
                            <MenuItem value="a">
                                D LEG 728
                            </MenuItem>
                            <MenuItem value="b">
                                D LEG 728
                            </MenuItem>
                        </TextField>
                    </Grid>
                    <Grid
                        item md={4} sm={12} xs={12}>
                        <TextField
                            name="type_employee"
                            fullWidth
                            select
                            label="Tipo Trabajador"
                            type="text"
                            onChange={handleInputChange}
                            value={fields.type_employee}
                        >
                            <MenuItem value="a">
                                FUNCIONARIO
                            </MenuItem>
                            <MenuItem value="b">
                                FUNCIONARIO
                            </MenuItem>
                        </TextField>
                    </Grid>
                    <Grid
                        item md={4} sm={12} xs={12}>
                        <TextField
                            name="workshift"
                            fullWidth
                            select
                            label="Turno Laboral"
                            type="text"
                            onChange={handleInputChange}
                            value={fields.workshift}
                        >
                            <MenuItem value="a">

                            </MenuItem>
                        </TextField>
                    </Grid>
                    <Grid item md={12} />
                    <Grid
                        item md={4} sm={12} xs={12}>
                        <TextField
                            name="fund"
                            fullWidth
                            select
                            label="Fondo A.F.P"
                            type="text"
                            onChange={handleInputChange}
                            value={fields.fund}
                        >
                            <MenuItem value="a">
                                ONP
                            </MenuItem>
                        </TextField>
                    </Grid>
                    <Grid
                        item md={3} sm={12} xs={12}>
                        <TextField
                            name="affiliate"
                            fullWidth
                            label="Afiliado A.F.P"
                            type="date"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            onChange={handleInputChange}
                            value={fields.affiliate}
                        >
                        </TextField>
                    </Grid>
                    <Grid
                        item md={2} sm={12} xs={12}>
                        <TextField
                            name="plaza"
                            fullWidth
                            label="Plaza"
                            type="number"
                            onChange={handleInputChange}
                            value={fields.plaza}
                        >
                        </TextField>
                    </Grid>
                    <Grid
                        item md={3} sm={12} xs={12}>
                        <TextField
                            name="level"
                            fullWidth
                            select
                            label="Nivel"
                            type="text"
                            onChange={handleInputChange}
                            value={fields.level}
                        >
                            <MenuItem value="a">
                                1
                            </MenuItem>
                        </TextField>
                    </Grid>
                    <Grid item md={12} />
                    <Grid
                        item md={4} sm={12} xs={12}>
                        <TextField
                            name="salary_bank"
                            fullWidth
                            select
                            label="Banco Sueldo"
                            type="text"
                            onChange={handleInputChange}
                            value={fields.salary_bank}
                        >
                            <MenuItem value="a">
                                BANCO CONTINENTAL
                            </MenuItem>
                        </TextField>
                    </Grid>
                    <Grid
                        item md={4} sm={12} xs={12}>
                        <TextField
                            name="salary_account"
                            fullWidth
                            label="Cuenta Sueldo"
                            type="text"
                            onChange={handleInputChange}
                            value={fields.salary_account}
                        >
                        </TextField>
                    </Grid>
                    <Grid
                        item md={4} sm={12} xs={12}>
                        <TextField
                            name="number_CCL"
                            fullWidth
                            label="Numero C.C.L"
                            type="text"
                            onChange={handleInputChange}
                            value={fields.number_CCL}
                        >
                        </TextField>
                    </Grid>
                    <Grid item md={12} />
                    <Grid
                        item md={4} sm={12} xs={12}>
                        <TextField
                            name="bank_CTS"
                            fullWidth
                            select
                            label="Banco CTS"
                            type="text"
                            onChange={handleInputChange}
                            value={fields.bank_CTS}
                        >
                            <MenuItem value="a">

                            </MenuItem>
                        </TextField>
                    </Grid>
                    <Grid
                        item md={4} sm={12} xs={12}>
                        <TextField
                            name="count_CTS"
                            fullWidth
                            label="Cuenta CTS"
                            type="text"
                            onChange={handleInputChange}
                            value={fields.count_CTS}
                        >
                        </TextField>
                    </Grid>
                    <Grid
                        item md={4} sm={12} xs={12}>
                        <TextField
                            name="code_CUSPP"
                            fullWidth
                            label="Codigo CUSPP"
                            type="text"
                            onChange={handleInputChange}
                            value={fields.code_CUSPP}
                        >
                        </TextField>
                    </Grid>
                    <Grid item md={12} />
                    <Grid
                        item md={4} sm={12} xs={12}>
                        <TextField
                            name="job_type"
                            fullWidth
                            select
                            label="Tipo Reg. Laboral"
                            type="text"
                            onChange={handleInputChange}
                            value={fields.job_type}
                        >
                            <MenuItem value="a">
                                728(Privado)
                            </MenuItem>
                        </TextField>
                    </Grid>
                    <Grid
                        item md={4} sm={12} xs={12}>
                        <TextField
                            name="pension_type"
                            fullWidth
                            select
                            label="Tipo Reg. Pension"
                            type="text"
                            onChange={handleInputChange}
                            value={fields.pension_type}
                        >
                            <MenuItem value="a">
                                ONP
                            </MenuItem>
                        </TextField>
                    </Grid>
                    <Grid
                        item md={4} sm={12} xs={12}>
                        <TextField
                            name="code_ESSALUD"
                            fullWidth
                            label="Codigo ESSALUD"
                            type="text"
                            onChange={handleInputChange}
                            value={fields.code_ESSALUD}
                        >
                        </TextField>
                    </Grid>
                    <Grid item md={12} />
                    <Grid
                        item md={4} sm={12} xs={12}>
                        <TextField
                            name="labor_regimen"
                            fullWidth
                            select
                            label="Regimen Laboral"
                            type="text"
                            onChange={handleInputChange}
                            value={fields.labor_regimen}
                        >
                            <MenuItem value="a">
                                PRIVADO LABORAL DECRETO
                            </MenuItem>
                        </TextField>
                    </Grid>
                    <Grid
                        item md={4} sm={12} xs={12}>
                        <TextField
                            name="pension_regimen"
                            fullWidth
                            select
                            label="Regimen Pension"
                            type="text"
                            onChange={handleInputChange}
                            value={fields.pension_regimen}
                        >
                            <MenuItem value="a">
                                DECRETO LEY 1999
                            </MenuItem>
                        </TextField>
                    </Grid>
                    <Grid
                        item md={4} sm={12} xs={12}>
                        <TextField
                            name="health_regimen"
                            fullWidth
                            select
                            label="Regimen Seg. Salud"
                            type="text"
                            onChange={handleInputChange}
                            value={fields.health_regimen}
                        >
                            <MenuItem value="a">
                                DECRETO LEY 1999
                            </MenuItem>
                        </TextField>
                    </Grid>
                    <Grid item md={12} />
                    <Grid
                        item md={4} sm={12} xs={12}>
                        <TextField
                            name="labor_occupation"
                            fullWidth
                            select
                            label="Ocupación Laboral"
                            type="text"
                            onChange={handleInputChange}
                            value={fields.labor_occupation}
                        >
                            <MenuItem value="a">
                                JEFE DE EMPLEADO DE OFICINA
                            </MenuItem>
                        </TextField>
                    </Grid>
                    <Grid
                        item md={4} sm={12} xs={12}>
                        <TextField
                            name="special_situation"
                            fullWidth
                            select
                            label="Situacion Especial"
                            type="text"
                            onChange={handleInputChange}
                            value={fields.special_situation}
                        >
                            <MenuItem value="a">
                                Ninguna
                            </MenuItem>
                        </TextField>
                    </Grid>
                    <Grid
                        item md={4} sm={12} xs={12}>
                        <TextField
                            name="occupation_category"
                            fullWidth
                            select
                            label="Categoria Ocupación"
                            type="text"
                            onChange={handleInputChange}
                            value={fields.occupation_category}
                        >
                            <MenuItem value="a">
                                FUNCIONARIO
                            </MenuItem>
                        </TextField>
                    </Grid>
                    <Grid item md={12} />
                    <Grid
                        item md={2} sm={12} xs={12}>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    onChange={handleInputChange}
                                    name="disability"
                                    value={fields.disability} />
                            }
                            label="Dispacitación"
                        />
                    </Grid>
                    <Grid
                        item md={2} sm={12} xs={12}>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    onChange={handleInputChange}
                                    name="unionized"
                                    value={fields.unionized} />
                            }
                            label="Sindicalizado"
                        />
                    </Grid>
                    <Grid
                        item md={4} sm={12} xs={12}>
                        <TextField
                            name="tax_agreement"
                            fullWidth
                            select
                            label="Convenio Evitar Doble Tributación"
                            type="text"
                            onChange={handleInputChange}
                            value={fields.tax_agreement}
                        >
                            <MenuItem value="a">
                                Ninguno
                            </MenuItem>
                        </TextField>
                    </Grid>
                    <Grid
                        item md={4} sm={12} xs={12}>
                        <TextField
                            name="type_pay"
                            fullWidth
                            select
                            label="Tipo de Pago"
                            type="text"
                            onChange={handleInputChange}
                            value={fields.type_pay}
                        >
                            <MenuItem value="a">
                                Deposito Cta
                            </MenuItem>
                        </TextField>
                    </Grid>
                    <Grid item md={12} />
                    <Grid
                        item md={2} sm={12} xs={12}>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    onChange={handleInputChange}
                                    name="t_register"
                                    value={fields.t_register} />
                            }
                            label="T_Registro"
                        />
                    </Grid>
                    <Grid
                        item md={3} sm={12} xs={12}>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    onChange={handleInputChange}
                                    name="pay_not_AFP"
                                    value={fields.pay_not_AFP} />
                            }
                            label="No paga Prima seguro AFP"
                        />
                    </Grid>
                    <Grid
                        item md={3} sm={12} xs={12}>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    onChange={handleInputChange}
                                    name="older"
                                    value={fields.older} />
                            }
                            label="Mayor de 65 años"
                        />
                    </Grid>
                    <Grid
                        item md={4} sm={12} xs={12}>
                        <TextField
                            name="current_age"
                            fullWidth
                            label="Edad Actual"
                            type="number"
                            onChange={handleInputChange}
                            value={fields.current_age}
                        >
                        </TextField>
                    </Grid>
                    <Grid item md={12} />
                    <Grid
                        item md={12} sm={12} xs={12}>
                        <TextField
                            name="observations"
                            fullWidth
                            label="Observaciones"
                            type="text"
                            onChange={handleInputChange}
                            value={fields.observations}
                        >
                        </TextField>
                    </Grid>
                    <Grid item md={12} />
                    <Grid
                        item md={4} sm={12} xs={12}>
                        <TextField
                            name="date_of_admission_select"
                            fullWidth
                            select
                            label="Fecha de ingreso"
                            onChange={handleInputChange}
                            value={fields.date_of_admission_select}

                        >
                            <MenuItem value="a">
                                20/01/2020
                            </MenuItem>
                        </TextField>
                    </Grid>
                    <Grid
                        item md={4} sm={12} xs={12}>
                        <TextField
                            name="termination_date_select"
                            fullWidth
                            select
                            label="Fecha de Fin"
                            onChange={handleInputChange}
                            value={fields.termination_date_select}

                        >
                            <MenuItem value="a">
                                00/00/0000
                            </MenuItem>
                        </TextField>
                    </Grid>
                    <Grid
                        item md={4} sm={12} xs={12}>
                        <TextField
                            name="contract_number"
                            fullWidth
                            label="Numero de Contrato"
                            onChange={handleInputChange}
                            value={fields.contract_number}

                        >
                        </TextField>
                    </Grid>
                    <Grid item md={12} />
                    <Grid
                        item md={4} sm={12} xs={12}>
                        <TextField
                            name="register_for"
                            fullWidth
                            label="Registrado por"
                            onChange={handleInputChange}
                            value={fields.register_for}

                        >
                        </TextField>
                    </Grid>
                    <Grid
                        item md={2} sm={12} xs={12}>
                        <TextField
                            name="date_register"
                            fullWidth
                            type='date'
                            InputLabelProps={{
                                shrink: true,
                            }}
                            onChange={handleInputChange}
                            value={fields.date_register}
                        >
                        </TextField>
                    </Grid>
                    <Grid
                        item md={4} sm={12} xs={12}>
                        <TextField
                            name="update_for"
                            fullWidth
                            label="Modificado por"
                            onChange={handleInputChange}
                            value={fields.update_for}

                        >
                        </TextField>
                    </Grid>
                    <Grid
                        item md={2} sm={12} xs={12}>
                        <TextField
                            name="update_for"
                            fullWidth
                            type='date'
                            InputLabelProps={{
                                shrink: true,
                            }}
                            onChange={handleInputChange}
                            value={fields.date_update}
                        >
                        </TextField>
                    </Grid>

                    <Grid item md={12} />
                    <Grid item md={12}>
                        <Button onClick={backStep} variant="contained">Retroceder</Button>
                        <Button style={{ marginLeft: '30px' }} onClick={nextStep} variant="contained">Siguiente</Button>
                    </Grid>
                </Grid>
            </>

        )
    }
    else if (step === 2){
        return (
        <>
            <Grid container spacing={2}>
                    <Grid item md={12} sm={12}>
                        <h2>Carga Familiar  -  Registro</h2>
                    </Grid>
                    <Grid item md={4} sm={12} xs={12}>
                        <TextField
                            fullWidth
                            label="Código Empleado"
                            name="code_employee"
                            onChange={handleInputChange}
                            value={fields.code_employee}
                        />
                    </Grid>


                    <Grid item md={2} sm={12} xs={12}>
                        <TextField
                            name="status"
                            fullWidth
                            select
                            label="Estado"
                            onChange={handleInputChange}
                            value={fields.status}
                        >
                            <MenuItem value="A"  >
                                Activo
                            </MenuItem>
                            <MenuItem value="I" >
                                Inactivo
                            </MenuItem>
                        </TextField>
                    </Grid>
                    <Grid item md={12} />
                    <Grid item md={6} sm={12} xs={12}>
                    <TextField
                            name="full_name"
                            fullWidth
                            label="Apellido y Nombre"
                            onChange={handleInputChange}
                            type='text'
                            inputProps={
                                { readOnly: true, }
                            }
                            value={`${fields.first_lastname} ${fields.second_lastname} ${fields.name}`}
                        >
                        </TextField>
                    </Grid>
                    {/* Separación con  <Grid item md={12} /> */}
                    <Grid item md={12} />
                    <Grid item md={3} sm={12} xs={12}>
                    <TextField
                            fullWidth
                            label="Parentesco"
                            name="relationship"
                            select
                            onChange={handleInputChange}
                            value={fields.relationship}
                        >
                            <MenuItem value="A">
                                Conyuge-A
                            </MenuItem>
                            <MenuItem value="B" >
                                Conyuge-B
                            </MenuItem>
                        </TextField>
                    </Grid>

                    <Grid item md={4} sm={12} xs={12}>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    onChange={handleInputChange}
                                    name="dependent"
                                    value={fields.dependent} />
                            }
                            label="Dependiente"
                        />
                    </Grid>
                    <Grid item md={12} />
                    <Grid item md={4} sm={12} xs={12}>
                        <FormControlLabel
                                control={
                                    <Checkbox
                                        onChange={handleInputChange}
                                        name="legal_burden"
                                        value={fields.legal_burden} />
                                }
                                label="Carga Judicial"
                            />
                    </Grid>
                    <Grid item md={12} />
                    <Grid item md={12} sm={12}>
                        <h2>Datos Judiciales</h2>
                    </Grid>
                    <Grid item md={2} sm={12} xs={12}>
                    <TextField
                            name="type_burden"
                            fullWidth
                            select
                            label="Tipo"
                            onChange={handleInputChange}
                            value={fields.type_burden}
                        >
                            <MenuItem value="A">
                                Tipo legal-A
                            </MenuItem>
                            <MenuItem value="B" >
                                Tipo Legal-B
                            </MenuItem>
                        </TextField>
                    </Grid>
                    <Grid item md={12} />
                    {/* Monto Fijo */}
                    <Grid item md={2} sm={12} xs={12}>
                        <TextField
                            fullWidth
                            label="Monto Fijo"
                            name="fixed_amount"
                            onChange={handleInputChange}
                            value={fields.fixed_amount}
                        />
                    </Grid>
                    {/* Porcentaje  */}
                    <Grid item md={2} sm={12} xs={12}>
                        <TextField
                            fullWidth
                            label="Porcentaje(%)"
                            name="percentage"
                            onChange={handleInputChange}
                            value={fields.percentage}
                        />
                    </Grid>
                    <Grid item md={12} />
                    {/* Banco */}
                    <Grid item md={4} sm={12} xs={12}>
                        <TextField
                            fullWidth
                            label="Banco"
                            select
                            name="bank"
                            onChange={handleInputChange}
                            value={fields.bank}
                        >
                            <MenuItem value="A">
                                Banco-A
                            </MenuItem>
                            <MenuItem value="B" >
                                Banco-B
                            </MenuItem>
                        </TextField>
                    </Grid>
                    <Grid item md={12} />
                    <Grid item md={4} sm={12} xs={12}>
                        <TextField
                            fullWidth
                            label="Cuenta Banco"
                            name="bank_account"
                            onChange={handleInputChange}
                            value={fields.bank_account}
                        >
                        </TextField>
                    </Grid>
                    <Grid item md={12} />
                    <Grid item md={4} sm={12} xs={12}>
                        <TextField
                            fullWidth
                            label="Número C.C.I."
                            name="number_c_c_i"
                            onChange={handleInputChange}
                            value={fields.number_c_c_i}
                        >
                        </TextField>
                    </Grid>

                    <Grid item md={12} />
                    {/* Planillas */}

                    <fieldset>
                        dasda
                    </fieldset>
                </Grid>
                
        </>
        )
        
    }
}
export default RegisterSteps;