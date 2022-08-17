import { Grid, TextField, MenuItem, Button, Checkbox, FormControlLabel } from "@mui/material";
import { useState } from "react";


const Educacion = () => {
    const [fields, setFields] = useState({
        'number_item': '',
        'type': '',
        'study': '',
        'institution': '',
        'date_beginning': '',
        'date_term': '',
        'degree_instruc':'',
        'university':'',
        'tuition_number':'',
        'date_title':'',
        'contents':'',
        'register_for': '',
        'update_for': '',
        'date_register': '',
        'date_update': '',

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
                        <h2>Educacion</h2>
                    </Grid>
                    <Grid item md={2} sm={12} xs={12}>
                        <TextField
                            fullWidth
                            label="N° Item"
                            name="number_item"
                            onChange={handleInputChange}
                            value={fields.number_item}
                        />
                    </Grid>
                    <Grid item md={12} />
                    <Grid item md={2} sm={12} xs={12}>
                        <TextField
                            fullWidth
                            label="tipo"
                            name="type"
                            onChange={handleInputChange}
                            value={fields.type}
                        />
                    </Grid>
                    <Grid item md={12} />
                    <Grid item md={2} sm={12} xs={12}>
                        <TextField
                            fullWidth
                            label="Estudio"
                            name="study"
                            onChange={handleInputChange}
                            value={fields.study}
                        />
                    </Grid>
                    <Grid item md={12} />
                    <Grid item md={2} sm={12} xs={12}>
                        <TextField
                            fullWidth
                            label="Institución"
                            name="institution"
                            onChange={handleInputChange}
                            value={fields.institution}
                        />
                    </Grid>
                    <Grid item md={12} />
                    <Grid item md={2} sm={12} xs={12}>
                        <TextField
                            fullWidth
                            label="Inicio"
                            name="date_beginning"
                            placeholder="00/00/00"
                            onChange={handleInputChange}
                            value={fields.date_beginning}
                        />
                    </Grid>
                    <Grid item md={12} />
                    <Grid item md={2} sm={12} xs={12}>
                        <TextField
                            fullWidth
                            label="Termino"
                            name="date_term"
                            onChange={handleInputChange}
                            value={fields.date_term}
                        />
                    </Grid>
                    <Grid item md={12} />
                    {/*  */}
                    <Grid item md={2} sm={12} xs={12}>
                        <TextField
                            fullWidth
                            label="Grado Instruc"
                            name="degree_instruc"
                            select
                            onChange={handleInputChange}
                            value={fields.degree_instruc}
                        />
                    </Grid>
                    <Grid item md={12} />
                    <Grid item md={2} sm={12} xs={12}>
                        <TextField
                            fullWidth
                            label="Universidad"
                            name="university"
                            select
                            onChange={handleInputChange}
                            value={fields.university}
                        />
                    </Grid>

                    <Grid item md={12} />

                    {/* Referencia Organización Interna */}
                    <Grid item md={2} sm={12} xs={12}>
                        <TextField
                            fullWidth
                            label="N° Colegiatura"
                            name="tuition_number"
                            onChange={handleInputChange}
                            value={fields.tuition_number}
                        />
                    </Grid>

                    <Grid item md={12} />

                    <Grid item md={2} sm={12} xs={12}>
                        <TextField
                            fullWidth
                            label="Fecha Titulo"
                            name="date_title"
                            onChange={handleInputChange}
                            value={fields.date_title}
                        />
                    </Grid>

                    <Grid item md={12} />

                    <Grid item md={2} sm={12} xs={12}>
                        <TextField
                            fullWidth
                            label="Contenido"
                            name="contents"
                            multiline
                            onChange={handleInputChange}
                            value={fields.contents}
                        />
                    </Grid>

                    <Grid item md={12} />

                    <Grid item md={2} sm={12} xs={12}>
                        <TextField
                            fullWidth
                            label="Registrado por"
                            name="register_for"
                            onChange={handleInputChange}
                            value={fields.register_for}
                        />
                    </Grid>

                    <Grid item md={12} />
                    <Grid item md={2} sm={12} xs={12}>
                        <TextField
                            fullWidth
                            name="register_for"
                            onChange={handleInputChange}
                            value={fields.register_for}
                        />
                    </Grid>
                    <Grid item md={2} sm={12} xs={12}>
                        <TextField
                            fullWidth
                            name="date_register"
                            type="date"
                            onChange={handleInputChange}
                            value={fields.date_register}
                        />
                    </Grid>
                    <Grid item md={12} />
                    <Grid item md={2} sm={12} xs={12}>
                        <TextField
                            fullWidth
                            name="update_for"
                            onChange={handleInputChange}
                            value={fields.update_for}
                        />
                    </Grid>
                    <Grid item md={2} sm={12} xs={12}>
                        <TextField
                            fullWidth
                            type='date'
                            name="date_update"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            onChange={handleInputChange}
                            value={fields.date_update}
                        />
                    </Grid>

                </Grid>
            </>
        ) 
    }
}

export default Educacion;