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

const pathPROD = "/RRHH"
// const pathPROD = ""

const Router = () => {
  const { logged } = useContext(UserContext);
  return (
    <Suspense
      fallback={<BarLoader color="#2E3B55" height="10px" width="100%" />}
    >
      <Routes>
        <Route path={pathPROD} element={<Home />} />
        <Route
          path={pathPROD + "/inicio"}
          element={logged ? <Inicio /> : <Navigate to={pathPROD} />}
        />
        <Route
          path={pathPROD + "/legajo"}
          element={logged ? <Document /> : <Navigate to={pathPROD} />}
        />
        <Route
          path={pathPROD + "/maestro/generales"}
          element={logged ? <General /> : <Navigate to={pathPROD} />}
        />
        <Route
          path={pathPROD + "/maestro/generales/nivelEducativo"}
          element={logged ? <LevelEducate /> : <Navigate to={pathPROD} />}
        />
        <Route
          path={pathPROD + "/maestro/generales/profesiones"}
          element={logged ? <Profession /> : <Navigate to={pathPROD} />}
        />
        <Route
          path={pathPROD + "/maestro/generales/Studies"}
          element={logged ? <Studies /> : <Navigate to={pathPROD} />}
        />
        <Route
          path={pathPROD + "/maestro/generales/position"}
          element={logged ? <Position /> : <Navigate to={pathPROD} />}
        />
        <Route
          path={pathPROD + "/maestro/generales/entidadExterna"}
          element={logged ? <ExternalEntity /> : <Navigate to={pathPROD} />}
        />
        <Route
          path={pathPROD + "/maestro/labor"}
          element={logged ? <Labor /> : <Navigate to={pathPROD} />}
        />
        <Route
          path={pathPROD + "/maestro/Labor/cargoLaboral"}
          element={logged ? <LaborPosition /> : <Navigate to={pathPROD} />}
        />
        <Route
          path={pathPROD + "/maestro/Labor/registrar"}
          element={logged ? <RegisterCargo /> : <Navigate to={pathPROD} />}
        />
        <Route
          path={pathPROD + "/maestro/Labor/registrar/:id"}
          element={logged ? <RegisterCargo /> : <Navigate to={pathPROD} />}
        />
        <Route
          path={pathPROD + "/maestro/Labor/registrarPuesto"}
          element={logged ? <RegisterPuesto /> : <Navigate to={pathPROD} />}
        />
        <Route
          path={pathPROD + "/maestro/Labor/registrarPuesto/:id"}
          element={logged ? <RegisterPuesto /> : <Navigate to={pathPROD} />}
        />
        <Route
          path={pathPROD + "/maestro/Labor/condicionLaboral"}
          element={logged ? <WorkingCondition /> : <Navigate to={pathPROD} />}
        />
        <Route
          path={pathPROD + "/maestro/Labor/accionPersonal"}
          element={logged ? <PersonalAction /> : <Navigate to={pathPROD} />}
        />
        <Route
          path={pathPROD + "/maestro/Labor/puestoLaboral"}
          element={logged ? <LaborPuesto /> : <Navigate to={pathPROD} />}
        />
        <Route
          path={pathPROD + "/maestro/persona"}
          element={logged ? <Person /> : <Navigate to={pathPROD} />}
        />
        <Route
          path={pathPROD + "/maestro/AFP"}
          element={logged ? <AFP /> : <Navigate to={pathPROD} />}
        />
        <Route
          path={pathPROD + "/maestro/persona/registrar"}
          element={logged ? <Register /> : <Navigate to={pathPROD} />}
        />
        <Route
          path={pathPROD + "/maestro/persona/registrar/:id"}
          element={logged ? <Register /> : <Navigate to={pathPROD} />}
        />
        <Route
          path={pathPROD + "/trabajador/"}
          element={logged ? <Employee /> : <Navigate to={pathPROD} />}
        />
        <Route
          path={pathPROD + "/trabajador/menu/:id"}
          element={logged ? <BasicTabs /> : <Navigate to={pathPROD} />}
        />
        <Route
          path={pathPROD + "/trabajador/listar/personas"}
          element={logged ? <RegisterWorker /> : <Navigate to={pathPROD} />}
        />
      </Routes>
    </Suspense>
  );
};

export default Router;
