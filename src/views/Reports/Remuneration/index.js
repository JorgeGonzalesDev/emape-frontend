import jsPDF from "jspdf";
import styled from "styled-components";
const TablePlanRemuneration = () => {
  const generatePDF = () => {
    const doc = new jsPDF();
    doc.html(document.querySelector("#table-plan-remuneration"), {
      callback: (doc) => {
        doc.save("table-plan-remuneration.pdf");
      },
    });
  };
  return (
    <HojaA4>
      <div className="page" id="table-plan-remuneration">
        <div className="d-flex justify-content-between align-items-center">
          <div>
            <h5>EMAPE</h5>
            <p>GERENCIA DE RRHH</p>
          </div>
          <div>
            <h3 className="text-center my-3">
              PLANILLA DE REMUNERACIONES MARZO 2022
            </h3>
          </div>
          <div>
            <p>Pagina Nro 1</p>
          </div>
        </div>
        <div className="table-size">
          <table className="table table-bordered table-sm">
            <thead>
              <tr>
                <th colSpan="2"></th>
                <th colSpan="2"></th>
                <th colSpan="14">Ingresos</th>
                <th></th>
                <th></th>
                <th></th>
                <th colSpan="4"></th>
              </tr>
              <tr>
                <th scope="col">Item</th>
                <th scope="col">UNIDAD</th>
                <th scope="col">APELLIDOS Y NOMBRES</th>
                <th scope="col">Dias Lab.</th>
                <th scope="col">000010 SUELDO BASICO 2.1.1.1.1.4</th>
                <th scope="col">000020 INC AFP 10.23% 2.1.1.1.2.99</th>
                <th scope="col">000030 INC AFP 3% 2.1.1.1.2.99</th>
                <th scope="col">000082 RACIONAMIENTO 2.1.1.1.2.99</th>
                <th scope="col">000399 ASIG-FAMILIAR 2.1.1.1.2.99</th>
                <th scope="col">VACACIONES</th>
                <th scope="col">LICENCIA CON GOCE HABER</th>
                <th scope="col">100038 MOVILIDAD 2.1.1.1.2.99</th>
                <th scope="col">Bonif. Vacacional</th>
                <th scope="col">Reint Con CeRift</th>
                <th scope="col">Reint sin CeRlif.</th>
                <th scope="col">INGRESOS INAFECTOS</th>
                <th scope="col">Resumen. Bruta</th>
                <th scope="col">Renum Calculable</th>
                <th scope="col">Min Tard</th>
                <th scope="col">Dias Falta</th>
                <th scope="col">Licencias</th>
                <th scope="col">SIST. PENSIONES</th>
                <th scope="col">Aporte Obligatorio</th>
                <th scope="col">Prima de Seguro</th>
                <th scope="col">Comis. Variable</th>
              </tr>
            </thead>
            <tbody></tbody>
          </table>
        </div>
      </div>
      <button onClick={generatePDF}>Generate PDF</button>
    </HojaA4>
  );
};
const HojaA4 = styled.div`
  .page {
    width: 29.7cm;
    min-height: 21cm;
    padding: 2cm;
    margin: 1cm auto;
    border: 1px #d3d3d3 solid;
    border-radius: 5px;
    background: white;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
    font: 1px "Tahoma";
  }
  th {
    font-size: 6px;
  }
`;
export default TablePlanRemuneration;
