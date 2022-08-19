import ResponsiveAppBar from "../../layouts/Header";
import RegisterSteps from "../../components/Employee/RegisterSteps";
import { useState } from "react";

const RegisterT = () => {


    return (

        <div>
            <ResponsiveAppBar />
            <div style={{ padding: '50px' }} >
                <RegisterSteps />
            </div>
        </div>
    );
    

}

export default RegisterT;