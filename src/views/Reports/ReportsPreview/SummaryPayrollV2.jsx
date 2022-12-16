import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button, Grid, TextField, Stack } from "@mui/material";
import { Link } from "react-router-dom";
import jsPDF from "jspdf";
import styled from "styled-components";
import { GetReporteResumenPlanilla } from "../../../service/common";
import { getPeriodoPlanillaByID } from "../../../service/spreadsheet/periodspreadsheet";

const SummaryPayrollV2 = () => {
  const generatePDF = () => {
    const doc = new jsPDF('p', 'pt', 'a4');
    doc.html(document.querySelector(HojaA4), {
      callback: function (doc) {
        doc.save("Reporte-Planilla-Resumen-V2.pdf");
      }
    })
  };

  const { codp } = useParams();
  const fields = {
    coD_PERPLAN: codp
  };

  const [dataH, setDataH] = useState([]);
  const [data1, setData1] = useState([]);
  let income = 0;
  let discount = 0;
  let contribution = 0;
  let total = 0;
  
  const loadData = async () => {
    const response1 = await GetReporteResumenPlanilla(fields.coD_PERPLAN)
    setDataH(response1.listado);
    const response2 = await getPeriodoPlanillaByID(fields.coD_PERPLAN)
    setData1(response2.listado);
  };
  console.log(dataH);
  console.log(data1);

  useEffect(() => {
    loadData();
  }, []);

  return (
    <>
      <Grid item md={3} xs={12} sm={12}>
        <div style={{ flexGrow: 1 }}>
          <Stack direction="row" spacing={1} xs={{ mb: 1, display: "flex" }}>
            <div>
              <h1>Planilla Resumen V2</h1>
            </div>
          </Stack>
        </div>
      </Grid>
      <Stack direction="row" spacing={1} xs={{ display: "flex" }}>
        <Button variant="outlined" onClick={generatePDF}>Generate PDF</Button>
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

      <HojaA4>
        <div className="page" id="boleta-pago">
          <div className="border-header d-flex">
            <div className="container">
              <div className="title">
                <h4>RESUMEN DE PLANILLA</h4>
              </div>
              <table className="table-content">
                <tbody>
                  <tr>
                    <td>
                      {data1.length > 0 && (
                        <p>Periodo: {data1[0]['nuM_PERIODO']} - {data1[0]['nuM_PERPLAN']}</p>
                      )}
                    </td>
                    <td className="td-right">
                      {data1.length > 0 && (
                        <p>Proceso: 100 - {data1[0]['dTipoPlanilla']['noM_TIPOPLAN']}</p>
                      )}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="table-size">
            <table className="table-center">
              <thead>
                <tr>
                  <th className="th-table" colSpan="3">CONCEPTO</th>
                  <th className="th-table" colSpan="1">CANTIDAD DE PERSONAS</th>
                  <th className="th-table" colSpan="1">TOTAL</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="td-title" colSpan="5">GERENCIA GENERAL</td>
                </tr>
                <tr>
                  <td className="td-title" colSpan="3">INGRESOS</td>
                  <td className="td-table" colSpan="2"></td>
                </tr>
                {dataH &&
                  dataH.map((data, index) => {
                    income = income + data['ingresos']
                    if (data['ingresos'] != 0) {
                      return (
                        <tr key={index}>
                          <td className="td-table" colSpan="1">{data['codigo']}</td>
                          <td className="td-table-c" colSpan="2">{data['concepto']}</td>
                          <td className="td-table" colSpan="1">{data['no_Trabajadores']}</td>
                          <td className="td-table-n" colSpan="1">{data['ingresos'].toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")}</td>
                        </tr>
                      )
                    }
                  })
                }
                <tr>
                  <td className="td-table" colSpan="3"></td>
                  <td className="td-table" colSpan="1">Total Tipo:</td>
                  <td className="td-table-n" colSpan="1">{income.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")}</td>
                </tr>
                <tr>
                  <td className="td-title" colSpan="3">DESCUENTOS</td>
                  <td className="td-table" colSpan="2"></td>
                </tr>
                {dataH &&
                  dataH.map((data, index) => {
                    discount = discount + data['egresos']
                    if (data['egresos'] != 0) {
                      return (
                        <tr key={index}>
                          <td className="td-table" colSpan="1">{data['codigo']}</td>
                          <td className="td-table-c" colSpan="2">{data['concepto']}</td>
                          <td className="td-table" colSpan="1">{data['no_Trabajadores']}</td>
                          <td className="td-table-n" colSpan="1">{data['egresos'].toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")}</td>
                        </tr>
                      )
                    }
                  })
                }
                <tr>
                  <td className="td-table" colSpan="3"></td>
                  <td className="td-table" colSpan="1">Total Tipo:</td>
                  <td className="td-table-n" colSpan="1">{discount.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")}</td>
                </tr>
                <tr>
                  <td className="td-title" colSpan="3">APORTES EMPLEADOR</td>
                  <td className="td-table" colSpan="2"></td>
                </tr>
                {dataH &&
                  dataH.map((data, index) => {
                    contribution = contribution + data['aportes']
                    total = income - discount
                    if (data['aportes'] != 0) {
                      return (
                        <tr key={index}>
                          <td className="td-table" colSpan="1">{data['codigo']}</td>
                          <td className="td-table-c" colSpan="2">{data['concepto']}</td>
                          <td className="td-table" colSpan="1">{data['no_Trabajadores']}</td>
                          <td className="td-table-n" colSpan="1">{data['aportes'].toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")}</td>
                        </tr>
                      )
                    }
                  })
                }
                <tr>
                  <td className="td-table" colSpan="3"></td>
                  <td className="td-table" colSpan="1">Total Tipo:</td>
                  <td className="td-table-n" colSpan="1">{contribution.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")}</td>
                </tr>
              </tbody>
            </table>
            <div className="content-total">
              <table className="table-total border-table">
                <tbody>
                  <tr>
                    <td className="td-total" rowSpan="4">Total General</td>
                    <td className="td-general">INGRESOS:</td>
                    <td className="td-result">{income.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")}</td>
                  </tr>
                  <tr>
                    <td className="td-general">DESCUENTOS:</td>
                    <td className="td-result">{discount.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")}</td>
                  </tr>
                  <tr>
                    <td className="td-general">NETO A PAGAR:</td>
                    <td className="td-result border-table">{total.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")}</td>
                  </tr>
                  <tr>
                    <td className="td-general">APORTES:</td>
                    <td className="td-result">{contribution.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </HojaA4>
    </>
  );
};
const HojaA4 = styled.div`

  .title{
    text-align: center;
  }

  .title h4{
    text-decoration: underline;
  }

  .table-size{
    border: 1px solid #000;
    border-top: 0;
    border-radius: 0 0 10px 10px;
  }

  .table-content{
    font-size: 10px;
    width: 100%;
    padding: 15pt 0;
  }

  .content-total{
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .border-table{
    border: 1px solid #000;
  }
  .table-total{
    margin: 5%;
    padding: 10px;
  }
  .td-total{
    padding: 25pt;
    font-size: 13pt;
    font-weight: bold;
  }
  .td-general{
    font-size: 10pt;
    font-weight: bold;
    padding: 0 12pt;
  }
  .td-result{
    text-align: right;
    font-size: 10pt;
    padding: 2pt 20pt;
  }

  .td-right{
    float: right;
  }

  .container{
    width: 100%;
  }

  .page {
    width: 15.5cm;
    padding: 0cm;
    margin: 5px;
    background: white;
    font: 12pt;
    letter-spacing: 0.01px;
    word-spacing: 0.01px;
  }
  .th-table {
    font-size: 9pt;
    padding: 5px;
    border-bottom: 1px solid #000;
  }
  p {
    font-size: 10px;
    margin: 0;
  }
  h5 {
    margin: 0;
  }
  .td-table {
    height: 0.5cm;
    padding: 0 15px;
    text-align: center;
    font-size: 8pt;
  }
  .td-table-c {
    height: 0.5cm;
    font-size: 8pt;
  }
  .td-table-n {
    height: 0.5cm;
    padding: 0 32px;
    text-align: right;
    font-size: 8pt;
  }
  .td-title {
    font-size: 11px;
    font-weight: bold;
    padding: 3% 3% 2%;
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
  .border-header {
    border-top: 1px solid #000;
    border-left: 1px solid #000;
    border-right: 1px solid #000;
    padding: .2cm;
    border-radius: 10px 10px 0 0;
  }
`;

export default SummaryPayrollV2;