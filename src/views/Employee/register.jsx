import ResponsiveAppBar from "../../layouts/Header";
import RegisterSteps from "../../components/Employee/RegisterSteps";
import { useState } from "react";

const RegisterT = () => {
  return (
    <div>
      <ResponsiveAppBar>
        <div style={{ padding: "20px 30px 0px 30px" }}>
          <RegisterSteps />
        </div>
      </ResponsiveAppBar>
    </div>
  );
};

export default RegisterT;
