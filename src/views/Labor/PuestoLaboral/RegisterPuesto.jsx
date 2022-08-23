import ResponsiveAppBar from "../../../layouts/Header";
import RegisterSteps from "../../../components/labor/LaborPuesto/RegisterSteps";
import { useState } from "react";

const RegisterPuesto = () => {
  return (
    <div>
      <ResponsiveAppBar>
        <div style={{ padding: "50px" }}>
          <RegisterSteps />
        </div>
      </ResponsiveAppBar>
    </div>
  );
};

export default RegisterPuesto;
