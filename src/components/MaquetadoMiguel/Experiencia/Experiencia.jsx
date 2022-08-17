import { Grid, TextField, MenuItem, Button, Checkbox, FormControlLabel } from "@mui/material";
import { useState } from "react";


const Experiencia = () => {
    const [fields, setFields] = useState({
        'number_item': '',
        'type': '',
        'institution': '',
        'position': '',
        'beginning': '',
        'term': '',
        'type_institution': '',
        'functions': '',
        /* Referencia Organización Interna */
        'document': '',
        'working_condition': '',
        'area': '',
        'position_2': '',
        'register_for': '',
        'update_for': '',
        'date_register': '',
        'date_update': '',

    });
    const handleInputChange = event => {
        const { name, value } = event.target;
        setFields({ ...fields, [name]: value });
    }

    const validateFields = () => {

        const copyFields = { ...fields };

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

    const sendData = () => {

        const validate = validateFields();
        if (!validate) {
            alert('Por favor, complete todos los campos');
            return;
        }else{
            alert('Datos enviados correctamente');
        }

        console.log(fields);

    };


    
        return (
            <>
                <Grid container spacing={2}>
                    <Grid item md={12} sm={12}>
                        <h2>Experiencia Laboral</h2>
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
                            label="Cargo"
                            name="position"
                            onChange={handleInputChange}
                            value={fields.position}
                        />
                    </Grid>
                    <Grid item md={12} />
                    <Grid item md={2} sm={12} xs={12}>
                        <TextField
                            fullWidth
                            label="Inicio"
                            name="beginning"
                            onChange={handleInputChange}
                            value={fields.beginning}
                        />
                    </Grid>
                    <Grid item md={2} sm={12} xs={12}>
                        <TextField
                            fullWidth
                            label="Termino"
                            name="term"
                            onChange={handleInputChange}
                            value={fields.term}
                        />
                    </Grid>
                    <Grid item md={12} />
                    {/*  */}
                    <Grid item md={2} sm={12} xs={12}>
                        <TextField
                            fullWidth
                            label="Tipo Institución"
                            name="type_institution"
                            onChange={handleInputChange}
                            value={fields.type_institution}
                        />
                    </Grid>
                    <Grid item md={12} />
                    <Grid item md={2} sm={12} xs={12}>
                        <TextField
                            fullWidth
                            label="Funciones"
                            name="functions"
                            onChange={handleInputChange}
                            value={fields.functions}
                        />
                    </Grid>

                    <Grid item md={12} />

                    {/* Referencia Organización Interna */}
                    <Grid item md={2} sm={12} xs={12}>
                        <TextField
                            fullWidth
                            label="documento"
                            name="document"
                            multiline
                            onChange={handleInputChange}
                            value={fields.document}
                        />
                    </Grid>

                    <Grid item md={12} />

                    <Grid item md={2} sm={12} xs={12}>
                        <TextField
                            fullWidth
                            label="Condición Laboral"
                            name="working_condition"
                            onChange={handleInputChange}
                            value={fields.working_condition}
                        />
                    </Grid>

                    <Grid item md={12} />

                    <Grid item md={2} sm={12} xs={12}>
                        <TextField
                            fullWidth
                            label="Area"
                            name="area"
                            onChange={handleInputChange}
                            value={fields.area}
                        />
                    </Grid>

                    <Grid item md={12} />

                    <Grid item md={2} sm={12} xs={12}>
                        <TextField
                            fullWidth
                            label="Cargo"
                            name="position_2"
                            onChange={handleInputChange}
                            value={fields.position_2}
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
                    <Grid item md={2} sm={12} xs={12}>
                        <TextField
                            fullWidth
                            name="date_register"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            type='date'
                            onChange={handleInputChange}
                            value={fields.date_register}
                        />
                    </Grid>
                    <Grid item md={12} />
                    <Grid item md={2} sm={12} xs={12}>
                        <TextField
                            fullWidth
                            label="Actualizado por"
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

export default Experiencia;