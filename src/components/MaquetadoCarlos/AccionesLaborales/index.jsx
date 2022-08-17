import { Grid, TextField, Button, MenuItem } from '@mui/material';
import { useState } from "react";

const AccionesLaborales = () => {
    const [fields, setFields] = useState({
        'item': '',
        'accion': '',
        'date': '',
        'number_document': '',
        'institution': '',
        'reference': '',
        'date_start': '',
        'date_end': '',
        'cargo': '',
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

    return(
        <>
            <Grid container spacing={2}>
                <Grid item md={12} sm={12}>
                    <h2>Acciones Laborales</h2>
                </Grid>
                <Grid item md={3} sm={12} xs={12}>
                    <TextField
                        fullWidth
                        label="Item"
                        name="item"
                        onChange={handleInputChange}
                        value={fields.item}
                    />
                </Grid>
                <Grid item md={5} sm={12} xs={12}>
                    <TextField
                        fullWidth
                        select
                        label="Acción"
                        name="accion"
                        onChange={handleInputChange}
                        value={fields.accion}
                    >
                        <MenuItem value="demerito">
                            DEMERITO
                        </MenuItem>
                    </TextField>
                </Grid>
                <Grid item md={4} sm={12} xs={12}>
                    <TextField
                        fullWidth
                        label="Fecha"
                        name="date"
                        type="date"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        onChange={handleInputChange}
                        value={fields.date}
                    />
                </Grid>
                <Grid item md={12} />
                <Grid item md={6} sm={12} xs={12}>
                    <TextField
                        fullWidth
                        label="Numero de Documento"
                        name="number_document"
                        onChange={handleInputChange}
                        value={fields.number_document}
                    />
                </Grid>
                <Grid item md={6} sm={12} xs={12}>
                    <TextField
                        fullWidth
                        label="Institucióm"
                        name="institution"
                        onChange={handleInputChange}
                        value={fields.institution}
                    />
                </Grid>
                <Grid item md={12} />
                <Grid item md={12} sm={12} xs={12}>
                    <TextField
                        fullWidth
                        multiline
                        rows={3}
                        label="Referencia"
                        name="reference"
                        onChange={handleInputChange}
                        value={fields.reference}
                    />
                </Grid>
                <Grid item md={12} />
                <Grid item md={12} sm={12} color="red">
                    <h2>Cargos Internos / Externos</h2>
                </Grid>
                <Grid item md={12} />
                <Grid item md={4} sm={12} xs={12}>
                    <TextField
                        fullWidth
                        label="Inicio"
                        name="date_start"
                        type="date"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        onChange={handleInputChange}
                        value={fields.date_start}
                    />
                </Grid>
                <Grid item md={4} sm={12} xs={12}>
                    <TextField
                        fullWidth
                        label="Termino"
                        name="date_end"
                        type="date"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        onChange={handleInputChange}
                        value={fields.date_end}
                    />
                </Grid>
                <Grid item md={4} sm={12} xs={12}>
                    <TextField
                        fullWidth
                        select
                        label="Cargo"
                        name="cargo"
                        onChange={handleInputChange}
                        value={fields.cargo}
                    >
                        <MenuItem value="1">
                            1
                        </MenuItem>
                    </TextField>
                </Grid>
                <Grid item md={12} />
                <Grid item md={4} sm={12} xs={12}>
                    <Button onClick={sendData} variant="contained">Enviar</Button>
                </Grid>
            </Grid>
        </>
    )
}


export default AccionesLaborales;