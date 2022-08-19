import ResponsiveAppBar from "../../../layouts/Header";
import RegisterSteps from "../../../components/labor/LaborPosition/RegisterSteps";
import { useState } from "react";

const RegisterPosition = () => {


    return (

        <div>
            <ResponsiveAppBar />
            <div style={{ padding: '50px' }} >
                <RegisterSteps  />
            </div>
        </div>
    );
    

}

export default RegisterPosition;