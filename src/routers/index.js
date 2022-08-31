import { Routes, Route, Navigate } from "react-router-dom";
import { Suspense, lazy, useContext } from "react";
import UserContext from "../context/User/UserContext";
import BarLoader from "react-spinners/BarLoader";
const Home = lazy(() => import("../views/Home"));
const Inicio = lazy(() => import("../views/Inicio"));
const Register = lazy(() => import("../views/Person/Register"));
const Person = lazy(() => import("../views/Person"));
const Document = lazy(() => import("../views/Document"));
const Employee = lazy(() => import("../views/Employee"));
const General = lazy(() => import("../views/General"));
const LevelEducate = lazy(() => import("../views/General/LevelEducate"));
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
const Studies = lazy(() => import("../views/General/Studies"));
const ExternalEntity = lazy(() => import("../views/General/ExternalEntity"));
const RegisterWorker = lazy(() => import("../views/Employee/registerWorker"));
const BasicTabs = lazy(() => import("../views/Employee/menuWorker"));

const Router = () => {
  const { logged } = useContext(UserContext);
  return (
    <Suspense
      fallback={<BarLoader color="#2E3B55" height="10px" width="100%" />}
    >
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/inicio"
          element={logged ? <Inicio /> : <Navigate to="/" />}
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
          path="/maestro/generales/Studies"
          element={logged ? <Studies /> : <Navigate to="/" />}
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
