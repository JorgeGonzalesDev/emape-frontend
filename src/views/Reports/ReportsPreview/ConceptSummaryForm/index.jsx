import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button, Grid, TextField, Stack } from "@mui/material";
import { Link } from "react-router-dom";
import jsPDF from "jspdf";
import styled from "styled-components";
import { getReportsPreviewPRC } from "../../../../service/common";
import { getPeriodoPlanillaByID } from "../../../../service/spreadsheet/periodspreadsheet";

const Index = () => {
  
  const generatePDF = () => {
    const doc = new jsPDF('p', 'pt', 'a4');
    /* const pageCount = doc.internal.getNumberOfPages(); //Total Page Number
    for(var i = 1; i <= pageCount; i++) { 
      doc.setPage(i); 
      let pageCurrent = doc.internal.getCurrentPageInfo().pageNumber; //Current Page
      doc.text('page: ' + pageCurrent + '/' + pageCount, 10, doc.internal.pageSize.height - 10);
    } */

    doc.html(document.querySelector(HojaA4), {
      callback: function (doc) {
        doc.save("Planilla-Resumen-Concepto.pdf");
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
    const response = await getReportsPreviewPRC(fields.coD_PERPLAN)
    setDataH(response.listado);
    const response2 = await getPeriodoPlanillaByID(fields.coD_PERPLAN)
    setData1(response2.listado);
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <>
      <Grid item md={3} xs={12} sm={12}>
        <div style={{ flexGrow: 1 }}>
          <Stack direction="row" spacing={1} xs={{ mb: 1, display: "flex" }}>
            <div>
              <h1>Planilla Resumen Segun Concepto</h1>
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
            <div>
              <table className="table-content">
                <tbody>
                  <tr>
                    <td className="td-content">EMPRESA MUNICIPAL ADMINISTRADORA I</td>
                    <td className="td-content"></td>
                    <td className="td-content" style={{textAlign : 'right'}}></td>
                    {dataH.length > 0 && (
                      <td>{dataH[0]['nuM_DOC']}</td>
                    )}
                    <td></td>
                    
                  </tr>
                  <tr>
                    <td className="td-content"><p>SISTEMA PERSONAL</p></td>
                    <td className="td-content"></td>
                    <td className="td-content" style={{textAlign : 'right'}}>Fecha: { new Date().getDate() + '-' + new Date().getMonth() + '-' + new Date().getFullYear()}</td>
                  </tr>
                  <tr>
                    <td className="td-content"></td>
                    <td className="td-content"></td>
                    <td className="td-content" style={{textAlign : 'right'}}>Hora: {new Date().getHours() + ':' + new Date().getMinutes() + ':' + new Date().getSeconds()}</td>
                  </tr>
                </tbody>
              </table>
              <div className="title">
                <h4>PLANILLA RESUMEN SEGUN CONCEPTO</h4>
              </div>
              <table className="table-content">
                <tbody>
                  <tr>
                    {data1.length > 0 && (
                        <td className="td-content">PLANILLA :{data1[0]['dTipoPlanilla']['noM_TIPOPLAN']}</td>
                      )}
                    <td></td>
                  </tr>
                  {data1.length > 0 && (
                    <>
                      <tr>
                        <td className="td-content"> PLANILLA: {data1[0]['dTipoPlanilla']['parent']['noM_TIPOPLAN']}</td>
                        <td className="td-content"></td>
                      </tr>
                      {/* <tr>
                        <td>Cargo </td>
                        <td className="td-content">: {dataH[0]['deS_CAR']}</td>
                      </tr>
                      <tr>
                        <td>U. Organizacional </td>
                        <td className="td-content">: {dataH[0]['deS_UORG']}</td>
                      </tr>
                      <tr>
                        <td>Sist. Pensiones </td>
                        <td className="td-content">: {dataH[0]['siS_PEN']}</td>
                      </tr>
                      <tr>
                        <td>Tipo planilla </td>
                        <td className="td-content">: {dataH[0]['noM_TIPOPLAN']}</td>
                      </tr> */}
                    </>
                  )}
                </tbody>
              </table>
            </div>
            {/* <div>
              {dataH.length > 0 && (
                <p>
                  DNI/C.E: <span>{dataH[0]['nuM_DOC']}</span>
                </p>
              )}
              <p>
                Dias Trab.: <span></span>
              </p>
              <p>
                Dias Subsidio: <span></span>
              </p>
              <div className="squar-nimi">
                <p>
                  Dias: <span></span>
                </p>
                <p>
                  Horas: <span></span>
                </p>
                <p>
                  Minutos: <span></span>
                </p>
              </div>
            </div> */}
          </div>
          <div className="table-size">
            <table className="table-center border-table">
              <thead>
                <tr>
                  <th className="th-table" colSpan="1">CODIGO</th>
                  <th className="th-table" colSpan="2">CONCEPTO</th>
                  <th className="th-table" colSpan="1">N° TRAB.</th>
                  <th className="th-table" colSpan="1">INGRESO S/.</th>
                  <th className="th-table" colSpan="1">EGRESO S/.</th>
                  <th className="th-table" colSpan="1">APORTE S/.</th>
                </tr>
              </thead>
              <tbody>
                {dataH &&
                  dataH.map((data, index) => {
                    income = income + data['ingresos']
                    discount = discount + data['egresos']
                    contribution = contribution + data['aportes']
                    total = total + data['totalNeto']
                    return (
                      <tr key={index}>
                        <td className="td-table" colSpan="1"><p>{data['codigo']}</p></td>
                        <td className="td-table" colSpan="2"><p>{data['concepto']}</p></td>
                        <td className="td-table" colSpan="1"><p>{data['no_Trabajadores']}</p></td>
                        <td className="td-table" colSpan="1"><p>{data['ingresos']}</p></td>
                        <td className="td-table" colSpan="1"><p>{data['egresos']}</p></td>
                        <td className="td-table" colSpan="1"><p>{data['aportes']}</p></td>
                        {/* <td className="td-table" colSpan="1"><p>{data['totalNeto']}</p></td> */}
                      </tr>
                    )
                  })}
              </tbody>
              <tfoot>
                <tr>
                  <th className="th-table" colSpan="1"></th>
                  <th className="th-table" colSpan="1"></th>
                  <th className="th-table" colSpan="2">TOTAL GENERAL:</th>
                  <th className="th-table" colSpan="1">{income.toFixed(2)}</th>
                  <th className="th-table" colSpan="1">{discount.toFixed(2)}</th>
                  <th className="th-table" colSpan="2">{contribution.toFixed(2)}</th>
                  {/* <th className="th-table" colSpan="1">{total.toFixed(2)}</th> */}
                </tr>
                <tr>
                  <th className="th-table" colSpan="1"></th>
                  <th className="th-table" colSpan="1"></th>
                  <th className="th-table" colSpan="2">TOTAL NETO A PAGAR:</th>
                  <th className="th-table" colSpan="1">{(income.toFixed(2) - discount.toFixed(2)).toFixed(2)}</th>
                  <th className="th-table" colSpan="1"></th>
                  <th className="th-table" colSpan="2"></th>
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
  }

  .td-content{
    width: 350px;
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

export default Index; 