import ResponsiveAppBar from "../../../layouts/Header";
import RegisterSteps from "../../../components/MaquetadoCarlos/Documentos";
import { useState } from "react";



const Register = () => {

    return (
        <div>
            <ResponsiveAppBar />
            <div style={{ padding: '50px' }} >
                <RegisterSteps />
            </div>
        </div>
    );


}

export default Register;