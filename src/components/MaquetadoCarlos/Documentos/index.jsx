import { Grid, TextField, Button, MenuItem } from '@mui/material';
import { useState } from "react";

const Documentos = () => {
    const [fields, setFields] = useState({
        'item': '',
        'type': '',
        'document': '',
        'family': '',
        'relationship': '',
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
                    <h2>Documentos</h2>
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
                <Grid item md={3} sm={12} xs={12}>
                    <TextField
                        fullWidth
                        select
                        label="Tipo"
                        name="type"
                        onChange={handleInputChange}
                        value={fields.type}
                    >
                        <MenuItem value="demerito">
                            PERSONAL
                        </MenuItem>
                    </TextField>
                </Grid>
                <Grid item md={6} sm={12} xs={12}>
                    <TextField
                        fullWidth
                        select
                        label="Documento"
                        name="document"
                        onChange={handleInputChange}
                        value={fields.document}
                    >
                        <MenuItem value="demerito">
                            DOCUMENTO
                        </MenuItem>
                    </TextField>
                </Grid>
                <Grid item md={12} />
                <Grid item md={6} sm={12} xs={12}>
                    <TextField
                        fullWidth
                        select
                        label="Familia"
                        name="family"
                        onChange={handleInputChange}
                        value={fields.family}
                    >
                        <MenuItem value="demerito">
                            FAMILIA
                        </MenuItem>
                    </TextField>
                </Grid>
                <Grid item md={6} sm={12} xs={12}>
                    <TextField
                        fullWidth
                        select
                        label="Prentesco"
                        name="relationship"
                        onChange={handleInputChange}
                        value={fields.relationship}
                    >
                        <MenuItem value="demerito">
                            PARENTESCO
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


export default Documentos;