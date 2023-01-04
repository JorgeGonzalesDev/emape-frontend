import { Routes, Route, Navigate } from "react-router-dom";
import { Suspense, lazy, useContext } from "react";
import UserContext from "../context/User/UserContext";
import BarLoader from "react-spinners/BarLoader";
import { PATH } from "../service/config";

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
const WorkerAndConcept = lazy(() => import("../views/Spreadsheet/WorkerAndConcept"))
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
const Vacation = lazy(() => import("../components/Employee/RegisterVacation"));

const Ballots = lazy(() => import("../views/Ballots/Ballots"));
const WorkReason = lazy(() => import("../views/Ballots/WorkReason"));
const WorkShift = lazy(() => import("../views/Ballots/WorkShift"));
const WorkHours = lazy(() => import("../views/Ballots/WorkHours"));
const BallotsLabor = lazy(() => import("../views/Control/BallotsLabor"));
const Assistance = lazy(() => import("../views/Control/Assistance"));
const AssistancePRO = lazy(() => import("../views/Control/AssistancePRO"));

const PeriodSpreadsheet = lazy(() => import("../views/Spreadsheet/PeriodSpreadsheet"));
const ConceptSpreadsheet = lazy(() => import("../views/Spreadsheet/ConceptSpreadsheet"));
const PayrollAndWorkers = lazy(() => import("../views/Spreadsheet/PayrollAndWorkers"));
const ConceptsFormula = lazy(() => import("../views/Spreadsheet/ConceptsFormula"));
const CalculateSpreadsheet = lazy(() => import("../views/SpreadsheetProcess/CalculateSpreadsheet"));
const ReportTable = lazy(() => import("../views/Reports/ReportTable"));
const TypeSpreadsheet = lazy(() => import("../views/Spreadsheet/TypeSpreadsheet"));
const Bank = lazy(() => import("../views/BankPayment/Bank"));
const RenumConcept = lazy(() => import('../views/Spreadsheet/RenumConcept'));
const FifthCategory = lazy(() => import('../views/Spreadsheet/FifthCategory'));
const BoletaTrabajador = lazy(() => import('../views/Reports/Employee/Ticket'));
const HistoricalBallot = lazy(() => import('../views/Reports/HistoricalBallot'));
const PlanillaReporte = lazy(() => import('../views/Reports/ReportForm/reportesPlanillaProcesos'));
const PaymentForm = lazy(() => import('../views/Reports/ReportsPreview/PaymentForm'));
const PlanillaResumenConcepto = lazy(() => import('../views/Reports/ReportsPreview/ConceptSummaryForm/index'));
const SummaryFormTC = lazy(() => import('../views/Reports/ReportsPreview/SummaryFormTC'));
const FileGeneration = lazy(() => import("../views/SUNAT/FileGeneration"));
const Lend = lazy(() => import("../views/Reports/Lend/Lend"));

const PayrollAccumulatorAndConcepts = lazy(() => import("../views/PayrollAccumulatorAndConcepts/PayrollAccumulatorAndConcepts"));
const AdministrativeLeansForm = lazy(() => import("../views/Reports/ReportsPreview/AdministrativeLeansForm"));
const ChildrenEmployeesForm = lazy(() => import('../views/Reports/ReportsPreview/ChildrenEmployeesForm'));
const WorkersDatebirthSexForm = lazy (() => import('../views/Reports/ReportsPreview/WorkersDatebirthSexForm'));
const MedicalRestForm = lazy(() => import('../views/Reports/ReportsPreview/MedicalRestForm'));
const SummaryPayrollV1 = lazy(() => import('../views/Reports/ReportsPreview/SummaryPayrollV1'));
const SummaryPayrollV2 = lazy(() => import('../views/Reports/ReportsPreview/SummaryPayrollV2'));
const PermissionsReport = lazy(() => import('../views/Reports/ReportsPreview/PermissionsReport'));

const JudicialRetentions =lazy(() => import("../views/Reports/ReportsPreview/JudicialRetentions"));
const FifthCategoryIncomeWithholdings =lazy(() => import("../views/Reports/ReportsPreview/FifthCategoryIncomeWithholdings"));
const MonthlySummaryOfAbsencesAndTardies =lazy(() => import("../views/Reports/ReportsPreview/MonthlySummaryOfAbsencesAndTardies"));
const VacationControlSummary =lazy(() => import("../views/Reports/ReportsPreview/VacationControlSummary"));
const VacationDetail =lazy(() => import("../views/Reports/ReportsPreview/VacationDetail"));

const PlanillaReporte2 = lazy(() => import('../views/Reports/ReportForm/reportesPlanillaConfig'));
const PlanillaReporte3 = lazy(() => import('../views/Reports/ReportForm/reportesControlAsistencia'));
const PlanillaReporte4 = lazy(() => import('../views/Reports/ReportForm/reportesLegajoTrabajador'));

const RemunerationReturn =lazy(() => import("../views/Reports/ReportsPreview/RemunerationReturn"));

const WorkersList =lazy(() => import("../views/Reports/ReportsPreview/WorkersList"));

const pathPROD = PATH

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
        <Route
          path={pathPROD + "/papeletas/listar/tipopapeletas"}
          element={logged ? <Ballots /> : <Navigate to={pathPROD} />}
        />
        <Route
          path={pathPROD + "/papeletas/listar/motivopapeleta"}
          element={logged ? <WorkReason /> : <Navigate to={pathPROD} />}
        />
        <Route
          path={pathPROD + "/papeletas/listar/turnolaboral"}
          element={logged ? <WorkShift /> : <Navigate to={pathPROD} />}
        />
        <Route
          path={pathPROD + "/control/vacaciones"}
          element={logged ? <Vacation /> : <Navigate to={pathPROD} />}
        />
        <Route
          path={pathPROD + "/papeletas/listar/horariolaboral"}
          element={logged ? <WorkHours /> : <Navigate to={pathPROD} />}
        />
        <Route
          path={pathPROD + "/papeletas/listar/papeletaslaborales"}
          element={logged ? <BallotsLabor /> : <Navigate to={pathPROD} />}
        />
        <Route
          path={pathPROD + "/papeletas/listar/Asistencia"}
          element={logged ? <Assistance /> : <Navigate to={pathPROD} />}
        />
        <Route
          path={pathPROD + "/papeletas/listar/AsistenciaProcesada"}
          element={logged ? <AssistancePRO /> : <Navigate to={pathPROD} />}
        />

        <Route
          path={pathPROD + "/planilla/PlanillaPeriodo"}
          element={logged ? <PeriodSpreadsheet /> : <Navigate to={pathPROD} />}
        />
        <Route
          path={pathPROD + "/planilla/registrar"}
          element={logged ? <TypeSpreadsheet /> : <Navigate to={pathPROD} />}
        />
        <Route
          path={pathPROD + "/planilla/concepto/registrar"}
          element={logged ? <RenumConcept /> : <Navigate to={pathPROD} />}
        />
        <Route
          path={pathPROD + "/planilla/PlanillaConcepto"}
          element={logged ? <ConceptSpreadsheet /> : <Navigate to={pathPROD} />}
        />
        <Route
          path={pathPROD + "/planilla/PlanillaYTrabajadores"}
          element={logged ? <PayrollAndWorkers /> : <Navigate to={pathPROD} />}
        />
        <Route
          path={pathPROD + "/planilla/ConceptsFormula"}
          element={logged ? <ConceptsFormula /> : <Navigate to={pathPROD} />}
        />
        <Route
          path={pathPROD + "/planilla/TrabajadorConcepto"}
          element={logged ? <WorkerAndConcept /> : <Navigate to={pathPROD} />}
        />
        <Route
          path={pathPROD + "/planilla/QuintaCategoria"}
          element={logged ? <FifthCategory /> : <Navigate to={pathPROD} />}
        />
        <Route
          path={pathPROD + "/calcular/planilla/CalcularPlanilla"}
          element={logged ? <CalculateSpreadsheet /> : <Navigate to={pathPROD} />}
        />
        <Route
          path={pathPROD + "/reporte/periodo/:id"}
          element={logged ? <ReportTable /> : <Navigate to={pathPROD} />}
        />
        <Route
          path={pathPROD + "/planilla/Bank"}
          element={logged ? <Bank /> : <Navigate to={pathPROD} />}
        />
        <Route
          path={pathPROD + "/reportes/BoletaTrabajador"}
          element={logged ? <BoletaTrabajador /> : <Navigate to={pathPROD} />}
        />
        <Route
          path={pathPROD + "/reportes/HistoricalBallot/:codt/:codp"}
          element={logged ? <HistoricalBallot /> : <Navigate to={pathPROD} />}
        />
        <Route
          path={pathPROD + "/reportes/PlanillaReporte"}
          element={logged ? <PlanillaReporte /> : <Navigate to={pathPROD} />}
        />
        <Route
          path={pathPROD + "/reportes/PlanillaResumenConcepto/:codp"}
          element={logged ? <PlanillaResumenConcepto /> : <Navigate to={pathPROD} />}
        />
        <Route
        path={pathPROD + "/reportes/PaymentForm/:codp"}
        element={logged ? <PaymentForm /> : <Navigate to={pathPROD} />}
        />
        <Route
        path={pathPROD + "/reportes/SummaryFormTC/:codp"}
        element={logged ? <SummaryFormTC /> : <Navigate to={pathPROD} />}
        />
        <Route
          path={pathPROD + "/sunat/FileGeneration"}
          element={logged ? <FileGeneration /> : <Navigate to={pathPROD} />}
        />
        <Route
          path={pathPROD + "/prestamos/Lend"}
          element={logged ? <Lend /> : <Navigate to={pathPROD} />}
        />
        <Route
          path={pathPROD + "/planilla/PayrollAccumulatorAndConcepts"}
          element={logged ? <PayrollAccumulatorAndConcepts /> : <Navigate to={pathPROD} />}
        />
        <Route
          path={pathPROD + "/reportes/AdministrativeLeansForm/:mes/:annio"}
          element={logged ? <AdministrativeLeansForm /> : <Navigate to={pathPROD} />}
        />
        <Route
          path={pathPROD + "/reportes/ChildrenEmployeesForm/:codt"}
          element={logged ? <ChildrenEmployeesForm /> : <Navigate to={pathPROD} />}
        />
        <Route
          path={pathPROD + "/reportes/WorkersDatebirthSexForm"}
          element={logged ? <WorkersDatebirthSexForm /> : <Navigate to={pathPROD} />}
        />
        <Route
          path={pathPROD + "/reportes/MedicalRestForm/:annio"}
          element={logged ? <MedicalRestForm /> : <Navigate to={pathPROD} />}
        />
        <Route
          path={pathPROD + "/reportes/SummaryPayrollV1/:codp"}
          element={logged ? <SummaryPayrollV1 /> : <Navigate to={pathPROD} />}
        />
        <Route
          path={pathPROD + "/reportes/SummaryPayrollV2/:codp"}
          element={logged ? <SummaryPayrollV2 /> : <Navigate to={pathPROD} />}
        />
        <Route
          path={pathPROD + "/reportes/JudicialRetentions/:mes/:annio"}
          element={logged ? <JudicialRetentions /> : <Navigate to={pathPROD} />}
        />
        <Route
          path={pathPROD + "/reportes/FifthCategoryIncomeWithholdings/:mes/:annio/:COD_TRABAJADOR"}
          element={logged ? <FifthCategoryIncomeWithholdings /> : <Navigate to={pathPROD} />}
        />
        <Route
          path={pathPROD + "/reportes/MonthlySummaryOfAbsencesAndTardies/:mes/:annio"}
          element={logged ? <MonthlySummaryOfAbsencesAndTardies /> : <Navigate to={pathPROD} />}
        />
        <Route
          path={pathPROD + "/reportes/VacationControlSummary/"}
          element={logged ? <VacationControlSummary /> : <Navigate to={pathPROD} />}
        />
        <Route
          path={pathPROD + "/reportes/VacationDetail/:annio"}
          element={logged ? <VacationDetail /> : <Navigate to={pathPROD} />}
        />
        <Route
          path={pathPROD + "/reportes/PlanillaReporteN2"}
          element={logged ? <PlanillaReporte2 /> : <Navigate to={pathPROD} />}
        />
        <Route
          path={pathPROD + "/reportes/ControlReportes"}
          element={logged ? <PlanillaReporte3 /> : <Navigate to={pathPROD} />}
        />
        <Route
          path={pathPROD + "/reportes/LegajoReportes"}
          element={logged ? <PlanillaReporte4 /> : <Navigate to={pathPROD} />}
        />
        <Route
          path={pathPROD + "/reportes/PermissionsReport/:inicio/:termino"}
          element={logged ? <PermissionsReport /> : <Navigate to={pathPROD} />}
        />
        <Route
          path={pathPROD + "/reportes/RemunerationReturn/:id"}
          element={logged ? <RemunerationReturn /> : <Navigate to={pathPROD} />}
        />
        <Route
          path={pathPROD + "/reportes/WorkersList"}
          element={logged ? <WorkersList /> : <Navigate to={pathPROD} />}
        />
      </Routes>
      
    </Suspense>
  );
};

export default Router;
