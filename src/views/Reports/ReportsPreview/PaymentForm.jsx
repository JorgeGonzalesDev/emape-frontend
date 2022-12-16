import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button, Grid, TextField, Stack } from "@mui/material";
import { Link } from "react-router-dom";
import jsPDF from "jspdf";
import styled from "styled-components";
import { GetReportePlanillaPago } from "../../../service/common";
import { getPeriodoPlanillaByID } from "../../../service/spreadsheet/periodspreadsheet";

const PaymentForm = () => {
  const generatePDF = () => {
    const doc = new jsPDF('p', 'pt', 'a4');


    doc.html(document.querySelector(HojaA4), {
      callback: function (doc) {
        doc.save("Reporte-Planilla-Pago.pdf");
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
    const response1 = await GetReportePlanillaPago(fields.coD_PERPLAN)
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
              <h1>Planilla De Pagos</h1>
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
                {data1.length > 0 && (
                  <h4>PLANILLA DE PAGOS N° {data1[0]['nuM_PERIODO']}{data1[0]['nuM_PERPLAN']}{data1[0]['coD_PERPLAN']}-002</h4>
                )}
              </div>
              <table className="table-content">
                <tbody>
                  <tr>
                    <td>
                      <span>Periodo </span>
                      {data1.length > 0 && (
                        <span>: {data1[0]['nuM_PERIODO']} - {data1[0]['nuM_PERPLAN']}</span>
                      )}
                    </td>
                    <td className="td-content">
                      <span>Proceso </span>
                      {data1.length > 0 && (
                        <span>: {data1[0]['coD_PERPLAN']} - {data1[0]['dTipoPlanilla']['noM_TIPOPLAN']}</span>
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
                  <th className="th-table" colSpan="1">CODIGO</th>
                  <th className="th-table" colSpan="2">APELLIDOS Y NOMBRES</th>
                  <th className="th-table" colSpan="1">INGRESOS</th>
                  <th className="th-table" colSpan="1">DESCUENTOS</th>
                  <th className="th-table" colSpan="1">APORTES</th>
                  <th className="th-table" colSpan="1">TOTAL NETO</th>
                </tr>
              </thead>
              <tbody>
                {dataH &&
                  dataH.map((data, index) => {
                    income = income + data['ingresos']
                    discount = discount + data['descuentos']
                    contribution = contribution + data['aportes']
                    total = total + data['totalNeto']
                    return (
                      <tr key={index}>
                        <td className="td-table" colSpan="1"><p>{data['codigo']}</p></td>
                        <td className="td-table" colSpan="2"><p>{data['apellidosNombres']}</p></td>
                        <td className="td-table" colSpan="1"><p>{data['ingresos']}</p></td>
                        <td className="td-table" colSpan="1"><p>{data['descuentos']}</p></td>
                        <td className="td-table" colSpan="1"><p>{data['aportes']}</p></td>
                        <td className="td-table" colSpan="1"><p>{data['totalNeto']}</p></td>
                      </tr>
                    )
                  })
                }
              </tbody>
              <tfoot>
                <tr>
                  <th className="th-table" colSpan="1"></th>
                  <th className="th-table" colSpan="2"></th>
                  <th className="th-table" colSpan="1">{income.toFixed(2)}</th>
                  <th className="th-table" colSpan="1">{discount.toFixed(2)}</th>
                  <th className="th-table" colSpan="1">{contribution.toFixed(2)}</th>
                  <th className="th-table" colSpan="1">{total.toFixed(2)}</th>
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
    border-left: 1px solid #000;
    text-align: center;
    
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

export default PaymentForm; 