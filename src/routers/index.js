import { Routes, Route } from 'react-router-dom';

import Home from '../views/Home';
import Register from '../views/Person/Register';
import Master from '../views/Master';
import Person from '../views/Person';
import Document from '../views/Document';
import Employee from '../views/Employee';
import General from '../views/General';
import LevelEducate from '../views/General/LevelEducate';
import MaquetadoCarlos from '../views/MaquetadoCarlos';
import AFP from '../views/AFP';
import MaquetadoMiguel from '../views/MaquetadoMiguel';
import Labor from '../views/Labor';
import LaborPosition from '../views/Labor/LaborPosition/LaborPosition';
import RegisterCargo from '../views/Labor/LaborPosition/RegisterPosition';
import RegisterPuesto from '../views/Labor/PuestoLaboral/RegisterPuesto';
import WorkingCondition from '../views/Labor/WorkingCondition';
import PersonalAction from '../views/Labor/PersonalAction';
import LaborPuesto from '../views/Labor/PuestoLaboral/LaborPuesto';
import Profession from '../views/General/Profession';
import Position from '../views/General/Position';
import ExternalEntity from '../views/General/ExternalEntity';
import RegisterE from '../views/General/ExternalEntity/Register';
import RegisterWorker from '../views/Employee/registerWorker';
import RegisterT from '../views/Employee/register';


const Router = () => {

    return (
        <Routes>
            <Route
                path="/MaquetadoMiguel"
                element={<MaquetadoMiguel />}
            />
            <Route
                path="/maquetadoCarlos"
                element={<MaquetadoCarlos />}
            />
            <Route
                path="/"
                element={<Home />}
            />
            <Route
                path="/maestro"
                element={<Master />}
            />
            <Route
                path="/legajo"
                element={<Document />}
            />
            <Route
                path="/maestro/generales"
                element={<General />}
            />
            <Route
                path="/maestro/generales/nivelEducativo"
                element={<LevelEducate />}
            />
            <Route
                path="/maestro/generales/profesiones"
                element={<Profession />}
            />
            <Route
                path="/maestro/generales/position"
                element={<Position />}
            />
            <Route
                path="/maestro/generales/entidadExterna"
                element={<ExternalEntity />}
            />
            <Route
                path="/maestro/generales/entidadExterna/Register"
                element={<RegisterE />}
            />
            <Route
                path="/maestro/generales/entidadExterna/Register/:id"
                element={<RegisterE />}
            />
            <Route
                path="/maestro/labor"
                element={<Labor />}
            />
            <Route
                path="/maestro/Labor/cargoLaboral"
                element={<LaborPosition />}
            />
            <Route
                path="/maestro/Labor/registrar"
                element={<RegisterCargo />}
            />
            <Route
                path="/maestro/Labor/registrar/:id"
                element={<RegisterCargo />}
            />
            <Route
                path="/maestro/Labor/registrarPuesto"
                element={<RegisterPuesto />}
            />
            <Route
                path="/maestro/Labor/registrarPuesto/:id"
                element={<RegisterPuesto />}
            />
            <Route
                path="/maestro/Labor/condicionLaboral"
                element={<WorkingCondition />}
            />
            <Route
                path="/maestro/Labor/accionPersonal"
                element={<PersonalAction />}
            />
            <Route
                path="/maestro/Labor/puestoLaboral"
                element={<LaborPuesto />}
            />
            <Route
                path="/maestro/persona"
                element={<Person />}
            />
            <Route
                path="/maestro/AFP"
                element={<AFP />}
            />
            <Route
                path="/maestro/persona/registrar"
                element={<Register />}
            />
            <Route
                path="/maestro/persona/registrar/:id"
                element={<Register />}
            />
            <Route
                path='/trabajador/'
                element={<Employee />}
            />
            <Route
                path='/trabajador/listar/personas'
                element={<RegisterWorker />}
            />
            <Route
                path='/trabajador/registrar'
                element={<RegisterT />}
            />
            <Route
                path='/trabajador/registrar/:id'
                element={<RegisterT />}
            />
        </Routes>
    );

}

export default Router;

