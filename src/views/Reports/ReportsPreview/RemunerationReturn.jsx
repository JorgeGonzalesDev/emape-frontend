import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button, Grid, TextField, Stack } from "@mui/material";
import { Link } from "react-router-dom";
import jsPDF from "jspdf";
import styled from "styled-components";
import { getReportTable } from "../../../service/common";
var XLSX = require("xlsx");

const RemunerationReturn = () => {

  /*const generatePDF = () => {
    const doc = new jsPDF('l', 'pt', 'a4');
    doc.html(document.querySelector(HojaA4), {
      callback: function (doc) {
        doc.save("Planilla_Remuneraciones.pdf");
      }
    })
  };*/

  const generatePDF = () => {
    const doc = new jsPDF('l', 'pt', 'a4');
    const margin = 15;
    const scale = (doc.internal.pageSize.width - margin * 2) / document.body.scrollWidth;
    doc.html(document.querySelector(HojaA4), {
      x: margin,
      y: margin,
      html2canvas: { scale: scale },
      callback: function (doc) {
        doc.save("Planilla_Remuneraciones.pdf");
      }
    })
  };

  const downloadExcel = (dataExport) => {
    //var Headers = [["Planilla Remuneraciones"]];
    let dataH = [];
    dataExport.forEach((item) => {
      dataH.push({
        "UNIDAD": item?.unidad,
        "APELLIDOS Y NOMBRES": item?.apellidosNombres,
        "Dias Lab.": item?.diasLaborables,
        "SUELDO BASICO": item?.sueldoBasico,
        "INC AFP 10.23%": item?.afP_020,
        "INC AFP 3%": item?.afP_030,
        "RACIONAMIENTO": item?.racionamiento,
        "ASIG-FAMILIAR": item?.asignacionFamiliar,
        "VACACIONES.": item?.bonif_Vacacional,
        "ESCOLARIDAD": item?.escolaridad,
        "MOVILIDAD": item?.movilidad,
        "Bonif. Vacacional": item?.bonificacionFamiliar,
        "Reint Con CeRift": item?.reintConCertif,
        "Reint sin CeRlif": item?.reintSinCertif,
        "INGRESOS INAFECTOS": item?.ingresosInafectos,
        "Resumen. Bruta": item?.remuneracionBruta,
        "Renum Calculable": item?.reumneracionCalculable,
        "Min Tard": item?.minutosTardanza,
        "Dias Falta": item?.diasFalta,
        "Licencias": item?.licencias,
        "SIST. PENSIONES": item?.sistemaPensiones,
        "Aporte Obligatorio": item?.aporteObligatorio,
        "Prima de Seguro": item?.primaSeguro,
        "TOTAL APORTACION": item?.totalAportacion,
        "Comis. Variable": item?.comisionVariable,
        "FALTAS S/": item?.faltas,
        "TARDANZAS S/": item?.tardanzas,
        "5° CAT": item?.quintaCategoria,
        "CUOTA SINDICAL": item?.cuotaSindical,
        "ESS VIDA": item?.essVida,
        "DESC JUDICIAL 1": item?.desJud1,
        "DESC JUDICIAL 2.": item?.desJud2,
        "cajMet": item?.cajMet,
        "TOTAL DESCUENTOS": item?.totalDescuentos,
        "NETO A PAGAR": item?.netoPagar,
        "EPS": item?.eps,
        "ESSALUD": item?.essalud,
        "TOTAL APORTES": item?.totalAportes,

      });
    });

    const workSheet = XLSX.utils.json_to_sheet(dataH, { origin: "A2" });
    const workBook = XLSX.utils.book_new();

    const merge = [
      { s: { r: 0, c: 0 }, e: { r: 0, c: 33 } },
      { s: { r: 0, c: 34 }, e: { r: 0, c: 37 } },
    ];

    workSheet["!merges"] = merge;

    //XLSX.utils.sheet_add_aoa(workSheet, Headers);
    XLSX.utils.book_append_sheet(workBook, workSheet, "Remuneraciones");
    XLSX.write(workBook, { bookType: "xlsx", type: "buffer" });
    XLSX.write(workBook, { bookType: "xlsx", type: "binary" });
    XLSX.writeFile(workBook, "ReporteDeRemuneraciones.xlsx");
  };


  const { id } = useParams();
  const fields = {
    id: id
  };
  // Diccionario
  const months = {
    '01' : 'Enero',
    '02' : 'Febero',
    '03' : 'Marzo',
    '04' : 'Abril',
    '05' : 'Mayo',
    '06' : 'Junio',
    '07' : 'Julio',
    '08' : 'Agosto',
    '09' : 'Septiembre',
    '10' : 'Octubre',
    '11' : 'Noviembre',
    '12' : 'Diciembre',
  }

  const [dataH, setDataH] = useState([]);
  const loadData = async () => {
    const response1 = await getReportTable(fields.id)
    setDataH(response1.listado);
  };
  console.log(dataH);

  useEffect(() => {
    loadData();
  }, []);

  return (
    <>
      <Grid item md={3} xs={12} sm={12}>
        <div style={{ flexGrow: 1 }}>
          <Stack direction="row" spacing={1} xs={{ mb: 1, display: "flex" }}>
            <div>
              <h1>REPORTE</h1>
            </div>
          </Stack>
        </div>
      </Grid>
      <Stack direction="row" spacing={1} xs={{ display: "flex" }}>
        <Button variant="outlined" onClick={generatePDF}>Generate PDF</Button>
        <Button variant="outlined" onClick={() => {downloadExcel(dataH);}}>Generate Excel</Button>
        <Grid item md={3} xs={12} sm={12}>
          <Link
            to="/RRHHDEV/reportes/PlanillaReporte"
            style={{ textDecoration: "none" }}
          >
            <Button size="large" variant="outlined">
              Regresar
            </Button>
          </Link>
        </Grid>
      </Stack>
      <br />
      <HojaA4>
        <div className="page" id="boleta-pago">
          <div className="border-header d-flex">
            <div className="container">
              <table className="table-content">
                <tbody>
                  <tr>
                    <td colSpan="2">
                      EMPRESA MUNICIPAL ADMINISTRADORA DE PEAJE<br />
                      Sistema Personal
                    </td>
                    <td colSpan="4" className="td-title">
                      Planilla Remuneraciones
                    </td>
                    <td className="td-title">
                      Fecha<br />
                      Hora
                    </td>
                    <td className="td-title">
                      : {new Date().getDate() + '/' + (new Date().getMonth() + 1) + '/' + new Date().getFullYear()}<br />
                      : {new Date().getHours() + ':' + new Date().getMinutes() + ':' + new Date().getSeconds()}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="table-size">
            <table className="table-center border-table">
              <thead>
                <tr>
                <th className="th-table" colSpan="1">UNIDAD</th>
                  <th className="th-table" colSpan="1">APELLIDOS Y NOMBRES</th>
                  <th className="th-table" colSpan="1">Dias Lab.</th>
                  <th className="th-table" colSpan="1">SUELDO BASICO</th>
                  <th className="th-table" colSpan="1">AFP 10.23%</th>
                  <th className="th-table" colSpan="1">INC AFP 3%</th>
                  <th className="th-table" colSpan="1">RACIONAMIENTO</th>
                  <th className="th-table" colSpan="1">ASIG-FAMILIAR</th>
                  <th className="th-table" colSpan="1">VACACIONES</th>
                  <th className="th-table" colSpan="1">ESCOLARIDAD</th>
                  <th className="th-table" colSpan="1">MOVILIDAD</th>
                  <th className="th-table" colSpan="1">Bonif. Vacacional</th>
                  <th className="th-table" colSpan="1">Reint Con CeRift</th>
                  <th className="th-table" colSpan="1">Reint sin CeRlif.</th>
                  <th className="th-table" colSpan="1">INGRESOS INAFECTOS</th>
                  <th className="th-table" colSpan="1">Resumen. Bruta</th>
                  <th className="th-table" colSpan="1">Renum Calculable</th>
                  <th className="th-table" colSpan="1">Min Tard</th>
                  <th className="th-table" colSpan="1">Dias Falta</th>
                  <th className="th-table" colSpan="1">Licencias</th>
                  <th className="th-table" colSpan="1">SIST. PENSIONES</th>
                  <th className="th-table" colSpan="1">Aporte Obligatorio</th>
                  <th className="th-table" colSpan="1">Prima de Seguro</th>
                  <th className="th-table" colSpan="1">Comis. Variable</th>
                  <th className="th-table" colSpan="1">TOTAL APORTACION</th>
                  <th className="th-table" colSpan="1">FALTAS S/</th>
                  <th className="th-table" colSpan="1">TARDANZAS S/</th>
                  <th className="th-table" colSpan="1">5° CAT</th>
                  <th className="th-table" colSpan="1">CUOTA SINDICAL</th>
                  <th className="th-table" colSpan="1">ESS VIDA</th>
                  <th className="th-table" colSpan="1">DESC JUDICIAL 1</th>
                  <th className="th-table" colSpan="1">DESC JUDICIAL 2</th>
                  <th className="th-table" colSpan="1">cajMet</th>
                  <th className="th-table" colSpan="1">OTROS DESCUENTOS </th>
                  <th className="th-table" colSpan="1">TOTAL DESCUENTOS</th>
                  <th className="th-table" colSpan="1">NETO A PAGAR</th>
                  <th className="th-table" colSpan="1">EPS</th>
                  <th className="th-table" colSpan="1">ESSALUD</th>
                  <th className="th-table" colSpan="1">TOTAL APORTES</th>
                </tr>
              </thead>
              <tbody>
                {dataH &&
                  dataH.map((data, index) => {
                    return (
                      <tr key={index}>
                        <td className="td-table" colSpan="1">{data['unidad']}</td>
                        <td className="td-table" colSpan="1">{data['apellidosNombres']}</td>
                        <td className="td-table" colSpan="1">{data['diasLaborables']}</td>
                        <td className="td-table" colSpan="1">{data['sueldoBasico']}</td>
                        <td className="td-table" colSpan="1">{data['afP_020']}</td>
                        <td className="td-table" colSpan="1">{data['afP_030']}</td>
                        <td className="td-table" colSpan="1">{data['racionamiento']}</td>
                        <td className="td-table" colSpan="1">{data['asignacionFamiliar']}</td>
                        <td className="td-table" colSpan="1">{data['bonif_Vacacional']}</td>
                        <td className="td-table" colSpan="1">{data['escolaridad']}</td>
                        <td className="td-table" colSpan="1">{data['movilidad']}</td>
                        <td className="td-table" colSpan="1">{data['bonificacionFamiliar']}</td>
                        <td className="td-table" colSpan="1">{data['reintConCertif']}</td>
                        <td className="td-table" colSpan="1">{data['reintSinCertif']}</td>
                        <td className="td-table" colSpan="1">{data['ingresosInafectos']}</td>
                        <td className="td-table" colSpan="1">{data['remuneracionBruta']}</td>
                        <td className="td-table" colSpan="1">{data['reumneracionCalculable']}</td>
                        <td className="td-table" colSpan="1">{data['minutosTardanza']}</td>
                        <td className="td-table" colSpan="1">{data['diasFalta']}</td>
                        <td className="td-table" colSpan="1">{data['licencias']}</td>
                        <td className="td-table" colSpan="1">{data['sistemaPensiones']}</td>
                        <td className="td-table" colSpan="1">{data['aporteObligatorio']}</td>
                        <td className="td-table" colSpan="1">{data['primaSeguro']}</td>
                        <td className="td-table" colSpan="1">{data['comisionVariable']}</td>
                        <td className="td-table" colSpan="1">{data['totalAportacion']}</td>
                        <td className="td-table" colSpan="1">{data['faltas']}</td>
                        <td className="td-table" colSpan="1">{data['tardanzas']}</td>
                        <td className="td-table" colSpan="1">{data['quintaCategoria']}</td>
                        <td className="td-table" colSpan="1">{data['cuotaSindical']}</td>
                        <td className="td-table" colSpan="1">{data['essVida']}</td>
                        <td className="td-table" colSpan="1">{data['desJud1']}</td>
                        <td className="td-table" colSpan="1">{data['desJud2']}</td>
                        <td className="td-table" colSpan="1">{data['cajMet']}</td>
                        <td className="td-table" colSpan="1">{data['otrosDescuentos']}</td>
                        <td className="td-table" colSpan="1">{data['totalDescuentos']}</td>
                        <td className="td-table" colSpan="1">{data['netoPagar']}</td>
                        <td className="td-table" colSpan="1">{data['eps']}</td>
                        <td className="td-table" colSpan="1">{data['essalud']}</td>
                        <td className="td-table" colSpan="1">{data['totalAportes']}</td>
                      </tr>
                    )
                  })
                }
              </tbody>
            </table>
          </div>
        </div>
      </HojaA4>
    </>
  );
};
const HojaA4 = styled.div`

.title{
  text-align:center;
}

.title h4{
  text-decoration: underline;
}

.table-content{
  font-size: 7px;
  width: 100%;
}

.td-content{
  float: right;
}

.container{
  width: 100%;
}

.page {
  width: 32.5cm;
  padding: 0cm;
  margin: 5px;
  background: white;
  font: 12pt;
  letter-spacing: 0.01px;
  word-spacing: 0.01px;
}
.th-table {
  font-size: 6px;
  padding: 2px;
  border: 0px solid #000;
}
p {
  font-size: 10px;
  margin: 0;
}
h5 {
  margin: 2;
}
.td-title {
  text-align: center;
  font-size: 13px;
  font-weight: bold;
  padding: 3%;
}
.td-table {
  height: 0.5cm;
  border-left: 0px solid #000;
  text-align: center;
  font-size: 5px;
}
.td-table-n {
  height: 0.5cm;
  border-left: 1px solid #000;
  text-align: right;
  font-size: 9px;
  padding-right: 8px;
}
.d-flex {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.table-center {
  margin: 0 auto;
  width: 100%;
  border-collapse: collapse;
}
.border-table {
  border: 1px solid #000;
}
.border-header {
  border-top: 1px solid #000;
  border-left: 1px solid #000;
  border-right: 1px solid #000;
  padding: .5cm;
  border-radius: 10px 10px 0 0;

}
`;

export default RemunerationReturn; 