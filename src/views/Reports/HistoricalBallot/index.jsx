import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button, Grid, TextField, Stack } from "@mui/material";
import { Link } from "react-router-dom";
import jsPDF from "jspdf";
import { useNavigate } from 'react-router-dom';
import styled from "styled-components";
import { getHistoricalBallot } from "../../../service/common";

const HistoricalBallot = () => {
  const generatePDF = () => {
    const doc = new jsPDF('p', 'pt', 'a4');


    doc.html(document.querySelector(HojaA4), {
      callback: function (doc) {
        doc.save("Boleta-pago.pdf");
      }
    })

  };
  const { codt, codp } = useParams();
  const fields = {
    coD_TRABAJADOR: codt,
    coD_PERPLAN: codp,
  };

  const navigate = useNavigate();

  const [dataH, setDataH] = useState([]);
  let income = 0;
  let expense = 0;
  const loadData = async () => {
    const response = await getHistoricalBallot(fields.coD_PERPLAN, fields.coD_TRABAJADOR)
    if ((response.listado).length > 0) {
      setDataH(response.listado);
    } else {
      navigate(-1)
    }

  };

  const navigateBack = () => {
    navigate(-1)
  }

  useEffect(() => {
    loadData();
  }, []);

  return (
    <>
      <Grid item md={3} xs={12} sm={12}>
        <div style={{ flexGrow: 1 }}>
          <Stack direction="row" spacing={1} xs={{ mb: 1, display: "flex" }}>
            <div>
              <h1>Boleta Historica</h1>
            </div>
          </Stack>
        </div>
      </Grid>
      <Stack direction="row" spacing={1} xs={{ display: "flex" }}>
        <Button variant="outlined" onClick={generatePDF}>Generate PDF</Button>

        <Grid item md={3} xs={12} sm={12}>
          <Button onClick={navigateBack} size="large" variant="outlined">
            Regresar
          </Button>
        </Grid>
      </Stack>

      <HojaA4>
        <div className="page" id="boleta-pago">
          <div className="border-header d-flex">
            <div>
              <p>EMPRESA MUNICIPAL ADMINISTRADORA DE PEAJE DE LIMA - EMAPE</p>
              <p>R.U.C: 20100063337</p>
              <p>AV. VIA DE EVITAMIENTO KM. 1.7 - ATE</p>
              <div className="title">
                <h4>BOLETA DE PAGO</h4>
              </div>
              <table className="table-content">
                <tbody>
                  <tr>
                    <td>Código </td>
                    <td className="td-content">: {fields.coD_TRABAJADOR}</td>
                    <td>DNI/C.E</td>
                    {dataH.length > 0 && (
                      <td>{dataH[0]['nuM_DOC']}</td>
                    )}
                  </tr>
                  {dataH.length > 0 && (
                    <>
                      <tr>
                        <td>Trabajador </td>
                        <td className="td-content">: {dataH[0]['noM_ABR']}</td>
                      </tr>
                      <tr>
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
                      </tr>
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
                  <th className="th-table" colSpan="1">INGRESOS</th>
                  <th className="th-table" colSpan="1"></th>
                  <th className="th-table" colSpan="1">EGRESOS</th>
                  <th className="th-table" colSpan="1"></th>
                  <th className="th-table" colSpan="2">Aportaciones</th>
                </tr>
                <tr>
                  <th className="th-table" colSpan="1">CONCEPTO</th>
                  <th className="th-table" colSpan="1">MONTO</th>
                  <th className="th-table" colSpan="1">CONCEPTO</th>
                  <th className="th-table" colSpan="1">MONTO</th>
                  <th className="th-table" colSpan="1">CONCEPTO</th>
                  <th className="th-table" colSpan="1">MONTO</th>
                </tr>
              </thead>
              <tbody>
                {dataH &&
                  dataH.map((data) => {
                    if (data['ingresos'] != 0) {
                      income = income + data['ingresos']
                      return (
                        <>
                          <tr>
                            <td className="td-table"><p>{data['noM_CONCEPTO']}</p></td>
                            <td className="td-table"><p>{data['ingresos']}</p></td>
                            <td className="td-table"></td>
                            <td className="td-table"></td>
                            <td className="td-table"></td>
                            <td className="td-table"></td>
                          </tr>
                        </>
                      )
                    } else if (data['egresos'] != 0) {
                      expense = expense + data['egresos']
                      return (
                        <>
                          <tr>
                            <td className="td-table"></td>
                            <td className="td-table"></td>
                            <td className="td-table"><p>{data['noM_CONCEPTO']}</p></td>
                            <td className="td-table"><p>{data['egresos']}</p></td>
                            <td className="td-table"></td>
                            <td className="td-table"></td>
                          </tr>
                        </>
                      )
                    } else if (data['egresos'] === 0 && data['ingresos'] === 0) {
                      return (
                        <>
                          <tr>
                            <td className="td-table"></td>
                            <td className="td-table"></td>
                            <td className="td-table"></td>
                            <td className="td-table"></td>
                            <td className="td-table"><p>{data['noM_CONCEPTO']}</p></td>
                            <td className="td-table"><p>{data['aportaciones']}</p></td>
                          </tr>
                        </>
                      )
                    }
                  })}
                <tr>
                  <td className="td-table"></td>
                  <td className="td-table"></td>
                  <td className="td-table"></td>
                  <td className="td-table"></td>
                  <td className="td-table"></td>
                  <td className="td-table"></td>
                </tr>
                <tr>
                  <td className="td-table"></td>
                  <td className="td-table"></td>
                  <td className="td-table"></td>
                  <td className="td-table"></td>
                  <td className="td-table"></td>
                  <td className="td-table"></td>
                </tr>
                <tr>
                  <td className="td-table"></td>
                  <td className="td-table"></td>
                  <td className="td-table"></td>
                  <td className="td-table"></td>
                  <td className="td-table"></td>
                  <td className="td-table"></td>
                </tr>
                <tr>
                  <td className="td-table"></td>
                  <td className="td-table"></td>
                  <td className="td-table"></td>
                  <td className="td-table"></td>
                  <td className="td-table"></td>
                  <td className="td-table"></td>
                </tr>
                <tr>
                  <td className="td-table"></td>
                  <td className="td-table"></td>
                  <td className="td-table"></td>
                  <td className="td-table"></td>
                  <td className="td-table"></td>
                  <td className="td-table"></td>
                </tr>
                <tr>
                  <td className="td-table"></td>
                  <td className="td-table"></td>
                  <td className="td-table"></td>
                  <td className="td-table"></td>
                  <td className="td-table"></td>
                  <td className="td-table"></td>
                </tr>
                <tr>
                  <td className="td-table"></td>
                  <td className="td-table"></td>
                  <td className="td-table"></td>
                  <td className="td-table"></td>
                  <td className="td-table"></td>
                  <td className="td-table"></td>
                </tr>
                <tr>
                  <td className="td-table"></td>
                  <td className="td-table"></td>
                  <td className="td-table"></td>
                  <td className="td-table"></td>
                  <td className="td-table"></td>
                  <td className="td-table"></td>
                </tr>
                <tr>
                  <td className="td-table"></td>
                  <td className="td-table"></td>
                  <td className="td-table"></td>
                  <td className="td-table"></td>
                  <td className="td-table"></td>
                  <td className="td-table"></td>
                </tr>
                <tr>
                  <td className="td-table"></td>
                  <td className="td-table"></td>
                  <td className="td-table"></td>
                  <td className="td-table"></td>
                  <td className="td-table"></td>
                  <td className="td-table"></td>
                </tr>
                <tr>
                  <td className="td-table"></td>
                  <td className="td-table"></td>
                  <td className="td-table"></td>
                  <td className="td-table"></td>
                  <td className="td-table"></td>
                  <td className="td-table"></td>
                </tr>
                <tr>
                  <td className="td-table"></td>
                  <td className="td-table"></td>
                  <td className="td-table"></td>
                  <td className="td-table"></td>
                  <td className="td-table"></td>
                  <td className="td-table"></td>
                </tr>
                <tr>
                  <td className="td-table"></td>
                  <td className="td-table"></td>
                  <td className="td-table"></td>
                  <td className="td-table"></td>
                  <td className="td-table"></td>
                  <td className="td-table"></td>
                </tr>
              </tbody>
              <tfoot>
                <tr>
                  <th className="th-table" colSpan="1">Total Ingresos</th>
                  <th className="th-table" colSpan="1"> {income.toFixed(2)}</th>
                  <th className="th-table" colSpan="1">Total Egresos</th>
                  <th className="th-table" colSpan="1">{expense.toFixed(2)}</th>
                  <th className="th-table" colSpan="2">NETO A PAGAR {(income.toFixed(2) - expense.toFixed(2)).toFixed(2)}</th>
                </tr>
                <tr>
                  <th className="th-table" colSpan="3" rowSpan="2"></th>
                  <th className="th-table" colSpan="3"></th>
                </tr>
                <tr>
                  <th className="th-table" colSpan="3">TRABAJADOR</th>
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
export default HistoricalBallot;
