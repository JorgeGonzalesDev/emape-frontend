import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button, Grid, TextField, Stack } from "@mui/material";
import { Link } from "react-router-dom";
import jsPDF from "jspdf";
import styled from "styled-components";
import { getReportsPreviewPRC } from "../../../service/common";
import { getPeriodoPlanillaByID } from "../../../service/spreadsheet/periodspreadsheet";

const SummaryFormTC = () => {
  const generatePDF = () => {
    const doc = new jsPDF('p', 'pt', 'a4');
    doc.html(document.querySelector(HojaA4), {
      callback: function (doc) {
        doc.save("Reporte-Planilla-Resumen-TipoConcepto.pdf");
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
  const loadData = async () => {
    const response1 = await getReportsPreviewPRC(fields.coD_PERPLAN)
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
              <h1>Planilla Resumen Segun Tipo y Concepto</h1>
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
              <table className="table-content">
                <tbody>
                  <tr>
                    <td colSpan="2">
                      EMPRESA MUNICIPAL ADMINISTRADORA DE<br />
                      Sistem Personal
                    </td>
                    <td>
                      <p>Fecha</p><br />
                      <p>Hora</p>
                    </td>
                    <td>
                      <p>: {new Date().getDate() + '/' + new Date().getMonth() + '/' + new Date().getFullYear()}</p><br />
                      <p>: {new Date().getHours() + ':' + new Date().getMinutes() + ':' + new Date().getSeconds()}</p>
                    </td>
                  </tr>
                  <tr>
                    <td colSpan="4" className="td-title">
                      PLANILLA RESUMEN SEGUN TIPO Y CONCEPTO<br />
                      {data1.length > 0 && (
                        <p>{data1[0]['noM_PERIODO']} DEL {data1[0]['nuM_PERIODO']}</p>
                      )}
                    </td>
                  </tr>
                  <tr>
                    <td>PLANILLA</td>
                    <td>
                      {data1.length > 0 && (
                        <p>: {data1[0]['dTipoPlanilla']['parent']['noM_TIPOPLAN']}</p>
                      )}
                    </td>
                    <td colSpan="2"></td>
                  </tr>
                  <tr>
                    <td>SUBPLANILLA</td>
                    <td>
                      {data1.length > 0 && (
                        <p>: {data1[0]['dTipoPlanilla']['noM_TIPOPLAN']}</p>
                      )}
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
                  <th className="th-table" colSpan="1">N°</th>
                  <th className="th-table" colSpan="1">CODIGO</th>
                  <th className="th-table" colSpan="2">CONCEPTO</th>
                  <th className="th-table" colSpan="1">N° TRABAJADORES</th>
                  <th className="th-table" colSpan="1">MONTO S/.</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="td-table" colSpan="2">
                    <p className="td-subtitle">Tipo Ingreso</p>
                  </td>
                  <td className="td-table" colSpan="4"></td>
                </tr>
                <tr>
                  <td className="td-table" colSpan="1"></td>
                  <td className="td-table" colSpan="1">
                    <p className="td-subtitle">Ingreso</p>
                  </td>
                  <td className="td-table" colSpan="4"></td>
                </tr>
                {dataH &&
                  dataH.map((data, index) => {
                    income = income + data['ingresos']
                    if (data['ingresos'] != 0) {
                      return (
                        <tr key={index}>
                          <td className="td-table" colSpan="1"></td>
                          <td className="td-table" colSpan="1"><p>{data['codigo']}</p></td>
                          <td className="td-table" colSpan="2"><p>{data['concepto']}</p></td>
                          <td className="td-table" colSpan="1"><p>{data['no_Trabajadores']}</p></td>
                          <td className="td-table" colSpan="1"><p>{data['ingresos']}</p></td>
                        </tr>
                      )
                    }
                  })
                }
                <tr>
                  <td className="td-table" colSpan="4"></td>
                  <td className="td-table" colSpan="1">
                    <p className="td-subtitle">Total Subtipo:</p>
                  </td>
                  <td className="td-table" colSpan="1"><p>{income.toFixed(2)}</p></td>
                </tr>
                <tr>
                  <td className="td-table" colSpan="4"></td>
                  <td className="td-table" colSpan="1">
                    <p className="td-subtitle">Total Tipo:</p>
                  </td>
                  <td className="td-table" colSpan="1"><p>{income.toFixed(2)}</p></td>
                </tr>
                <tr>
                  <td className="td-table" colSpan="2">
                    <p className="td-subtitle">Tipo Egreso</p>
                  </td>
                  <td className="td-table" colSpan="4"></td>
                </tr>
                <tr>
                  <td className="td-table" colSpan="1"></td>
                  <td className="td-table" colSpan="1">
                    <p className="td-subtitle">Descuento</p>
                  </td>
                  <td className="td-table" colSpan="4"></td>
                </tr>
                {dataH &&
                  dataH.map((data, index) => {
                    discount = discount + data['egresos']
                    if (data['egresos'] != 0) {
                      return (
                        <tr key={index}>
                          <td className="td-table" colSpan="1"></td>
                          <td className="td-table" colSpan="1"><p>{data['codigo']}</p></td>
                          <td className="td-table" colSpan="2"><p>{data['concepto']}</p></td>
                          <td className="td-table" colSpan="1"><p>{data['no_Trabajadores']}</p></td>
                          <td className="td-table" colSpan="1"><p>{data['egresos']}</p></td>
                        </tr>
                      )
                    }
                  })
                }
                <tr>
                  <td className="td-table" colSpan="4"></td>
                  <td className="td-table" colSpan="1">
                    <p className="td-subtitle">Total SubTipo:</p>
                  </td>
                  <td className="td-table" colSpan="1"><p>{discount.toFixed(2)}</p></td>
                </tr>
                <tr>
                  <td className="td-table" colSpan="4"></td>
                  <td className="td-table" colSpan="1">
                    <p className="td-subtitle">Total Tipo:</p>
                  </td>
                  <td className="td-table" colSpan="1"><p>{discount.toFixed(2)}</p></td>
                </tr>
                <tr>
                  <td className="td-table" colSpan="2">
                    <p className="td-subtitle">Tipo Aporte</p>
                  </td>
                  <td className="td-table" colSpan="4"></td>
                </tr>
                <tr>
                  <td className="td-table" colSpan="1"></td>
                  <td className="td-table" colSpan="1">
                    <p className="td-subtitle">Aporte</p>
                  </td>
                  <td className="td-table" colSpan="4"></td>
                </tr>
                {dataH &&
                  dataH.map((data, index) => {
                    contribution = contribution + data['aportes']
                    if (data['aportes'] != 0) {
                      return (
                        <tr key={index}>
                          <td className="td-table" colSpan="1"></td>
                          <td className="td-table" colSpan="1"><p>{data['codigo']}</p></td>
                          <td className="td-table" colSpan="2"><p>{data['concepto']}</p></td>
                          <td className="td-table" colSpan="1"><p>{data['no_Trabajadores']}</p></td>
                          <td className="td-table" colSpan="1"><p>{data['aportes']}</p></td>
                        </tr>
                      )
                    }
                  })
                }
                <tr>
                  <td className="td-table" colSpan="4"></td>
                  <td className="td-table" colSpan="1">
                    <p className="td-subtitle">Total SubTipo:</p>
                  </td>
                  <td className="td-table" colSpan="1"><p>{contribution.toFixed(2)}</p></td>
                </tr>
                <tr>
                  <td className="td-table" colSpan="4"></td>
                  <td className="td-table" colSpan="1">
                    <p className="td-subtitle">Total Tipo:</p>
                  </td>
                  <td className="td-table" colSpan="1"><p>{contribution.toFixed(2)}</p></td>
                </tr>
              </tbody>
              <tfoot>
                <tr>
                  <th className="th-table" colSpan="4"></th>
                  <th className="th-table" colSpan="1">TOTAL GENERAL:</th>
                  <th className="th-table" colSpan="1">{contribution.toFixed(2)}</th>
                </tr>
              </tfoot>
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
    font-size: 10px;
    width: 100%;
  }

  .td-content{
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
    font-size: 10px;
    padding: 3px;
    border: 1px solid #000;
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
    text-align: center;
  }
  .td-title {
    text-align: center;
    font-size: 13px;
    font-weight: bold;
    padding: 3%;
  }
  .td-subtitle{
    font-weight: bold;
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
    padding: .2cm;
    border-radius: 10px 10px 0 0;

  }
`;

export default SummaryFormTC; 