import { Routes, Route, Navigate } from "react-router-dom";
import { Suspense, lazy, useContext } from "react";
import UserContext from "../context/User/UserContext";
import BarLoader from "react-spinners/BarLoader";
const Home = lazy(() => import("../views/Home"));
const Register = lazy(() => import("../views/Person/Register"));
const Master = lazy(() => import("../views/Master"));
const Person = lazy(() => import("../views/Person"));
const Document = lazy(() => import("../views/Document"));
const Employee = lazy(() => import("../views/Employee"));
const General = lazy(() => import("../views/General"));
const LevelEducate = lazy(() => import("../views/General/LevelEducate"));
const MaquetadoCarlos = lazy(() => import("../views/MaquetadoCarlos/LaborActions"));
const DocumentosTA = lazy(() => import("../views/MaquetadoCarlos/LaborDocument"));
const MaquetadoMiguel = lazy(() => import("../views/MaquetadoMiguel/LaborExperience"));
const Education = lazy(() => import("../views/MaquetadoMiguel/Education"));
const AFP = lazy(() => import("../views/AFP"));
const Labor = lazy(() => import("../views/Labor"));
const LaborPosition = lazy(() =>
  import("../views/Labor/LaborPosition/LaborPosition")
);
const RegisterCargo = lazy(() =>
  import("../views/Labor/LaborPosition/RegisterPosition")
);
const RegisterPuesto = lazy(() =>
  import("../views/Labor/PuestoLaboral/RegisterPuesto")
);
const WorkingCondition = lazy(() => import("../views/Labor/WorkingCondition"));
const PersonalAction = lazy(() => import("../views/Labor/PersonalAction"));
const LaborPuesto = lazy(() =>
  import("../views/Labor/PuestoLaboral/LaborPuesto")
);
const Profession = lazy(() => import("../views/General/Profession"));
const Position = lazy(() => import("../views/General/Position"));
const ExternalEntity = lazy(() => import("../views/General/ExternalEntity"));
const RegisterE = lazy(() =>
  import("../views/General/ExternalEntity/Register")
);
const RegisterWorker = lazy(() => import("../views/Employee/registerWorker"));
const BasicTabs = lazy(() => import("../views/Employee/menuWorker"));

const RegisterEXP = lazy(() =>
  import("../views/MaquetadoMiguel/LaborExperience/Register")
);
const RegisterTA = lazy(() =>
  import("../views/MaquetadoCarlos/LaborActions/Register")
);
const RegisterDO = lazy(() =>
  import("../views/MaquetadoCarlos/LaborDocument/Register")
);
const RegisterEDU = lazy(() =>
  import("../views/MaquetadoMiguel/Education/Register")
);

const Router = () => {
  const { logged } = useContext(UserContext);
  return (
    <Suspense
      fallback={<BarLoader color="#2E3B55" height="10px" width="100%" />}
    >
      <Routes>
        <Route path="/MaquetadoMiguel/LaborExperience" element={<MaquetadoMiguel />} />
        <Route path="/MaquetadoMiguel/LaborExperience/Registrar" element={<RegisterEXP />} />
        <Route path="/MaquetadoMiguel/LaborExperience/Registrar/:id" element={<RegisterEXP />} />
        <Route path="/MaquetadoMiguel/Education" element={<Education />} />
        <Route path="/MaquetadoMiguel/Education/Registrar" element={<RegisterEDU />} />
        <Route path="/MaquetadoMiguel/Education/Registrar/:id" element={<RegisterEDU />} />
        <Route path="/MaquetadoCarlos/LaborActions" element={<MaquetadoCarlos />} />
        <Route path="/MaquetadoCarlos/LaborActions/Registrar" element={<RegisterTA />} />
        <Route path="/MaquetadoCarlos/LaborActions/Registrar/:id" element={<RegisterTA />} />
        <Route path="/MaquetadoCarlos/Documentos" element={<DocumentosTA />} />
        <Route path="/MaquetadoCarlos/Documentos/Registrar" element={<RegisterDO />} />
        <Route path="/MaquetadoCarlos/Documentos/Registrar/:id" element={<RegisterDO />} />
        <Route path="/" element={<Home />} />
        <Route
          path="/maestro"
          element={logged ? <Master /> : <Navigate to="/" />}
        />
        <Route
          path="/legajo"
          element={logged ? <Document /> : <Navigate to="/" />}
        />
        <Route
          path="/maestro/generales"
          element={logged ? <General /> : <Navigate to="/" />}
        />
        <Route
          path="/maestro/generales/nivelEducativo"
          element={logged ? <LevelEducate /> : <Navigate to="/" />}
        />
        <Route
          path="/maestro/generales/profesiones"
          element={logged ? <Profession /> : <Navigate to="/" />}
        />
        <Route
          path="/maestro/generales/position"
          element={logged ? <Position /> : <Navigate to="/" />}
        />
        <Route
          path="/maestro/generales/entidadExterna"
          element={logged ? <ExternalEntity /> : <Navigate to="/" />}
        />
        <Route
          path="/maestro/generales/entidadExterna/Register"
          element={logged ? <RegisterE /> : <Navigate to="/" />}
        />
        <Route
          path="/maestro/generales/entidadExterna/Register/:id"
          element={logged ? <RegisterE /> : <Navigate to="/" />}
        />
        <Route
          path="/maestro/labor"
          element={logged ? <Labor /> : <Navigate to="/" />}
        />
        <Route
          path="/maestro/Labor/cargoLaboral"
          element={logged ? <LaborPosition /> : <Navigate to="/" />}
        />
        <Route
          path="/maestro/Labor/registrar"
          element={logged ? <RegisterCargo /> : <Navigate to="/" />}
        />
        <Route
          path="/maestro/Labor/registrar/:id"
          element={logged ? <RegisterCargo /> : <Navigate to="/" />}
        />
        <Route
          path="/maestro/Labor/registrarPuesto"
          element={logged ? <RegisterPuesto /> : <Navigate to="/" />}
        />
        <Route
          path="/maestro/Labor/registrarPuesto/:id"
          element={logged ? <RegisterPuesto /> : <Navigate to="/" />}
        />
        <Route
          path="/maestro/Labor/condicionLaboral"
          element={logged ? <WorkingCondition /> : <Navigate to="/" />}
        />
        <Route
          path="/maestro/Labor/accionPersonal"
          element={logged ? <PersonalAction /> : <Navigate to="/" />}
        />
        <Route
          path="/maestro/Labor/puestoLaboral"
          element={logged ? <LaborPuesto /> : <Navigate to="/" />}
        />
        <Route
          path="/maestro/persona"
          element={logged ? <Person /> : <Navigate to="/" />}
        />
        <Route
          path="/maestro/AFP"
          element={logged ? <AFP /> : <Navigate to="/" />}
        />
        <Route
          path="/maestro/persona/registrar"
          element={logged ? <Register /> : <Navigate to="/" />}
        />
        <Route
          path="/maestro/persona/registrar/:id"
          element={logged ? <Register /> : <Navigate to="/" />}
        />
        <Route
          path="/trabajador/"
          element={logged ? <Employee /> : <Navigate to="/" />}
        />
        <Route
          path="/trabajador/menu/:id"
          element={logged ? <BasicTabs /> : <Navigate to="/" />}
        />
        <Route
          path="/trabajador/listar/personas"
          element={logged ? <RegisterWorker /> : <Navigate to="/" />}
        />
      </Routes>
    </Suspense>
  );
};

export default Router;
