import ResponsiveAppBar from "../../layouts/Header";
import Experiencia from "../../components/MaquetadoMiguel/Experiencia/Experiencia";
import Educacion from "../../components/MaquetadoMiguel/Educacion/Educacion";
import ListE from "../../components/MaquetadoMiguel/Experiencia/ListExperiencia";
import ListEd from "../../components/MaquetadoMiguel/Educacion/ListEducacion";

import { useState } from "react";

const MaquetadoMiguel = () => {


    return (

        <div>
            <ResponsiveAppBar />
            <div style={{ padding: '50px' }} >
                <Experiencia  />
                <ListE />
                <Educacion /> 
                <ListEd />
            </div>
        </div>
    );
    

}

export default MaquetadoMiguel;