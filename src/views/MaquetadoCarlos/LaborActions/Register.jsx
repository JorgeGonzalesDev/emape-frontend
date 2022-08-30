import ResponsiveAppBar from "../../../layouts/Header";
import RegisterSteps from "../../../components/MaquetadoCarlos/AccionesLaborales/index";
import { useState } from "react";


const Register = () => {

    return (
        <div>
            <div style={{ padding: '50px' }} >
            <RegisterSteps />
            </div>
        </div>
    );


}

export default Register;