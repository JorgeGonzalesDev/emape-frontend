import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button, Grid, TextField, Stack } from "@mui/material";
import { Link } from "react-router-dom";
import jsPDF from "jspdf";
import { useNavigate } from 'react-router-dom';
import styled from "styled-components";
import moment from "moment/moment";
import { getHistoricalBallot } from "../../../service/common";

const HistoricalBallot = () => {
  const generatePDF = () => {
    const doc = new jsPDF('landscape', 'pt', 'a4');

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
  let count1 = 0;
  let count2 = 0;
  let count3 = 0;
  let count4 = 0;
  let count5 = 0;
  let count6 = 0;
  let income2 = 0;
  let expense2 = 0;
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

  const renderTd = () => {
    if (count5 > count4 && count5 > count6) {

      for (let i = 0; i < count5; i++) {
        return <>
          <tr>
            <td className="td-table"></td>
            <td className="td-table-right"></td>
          </tr>
        </>
      }

    } else if (count4 > count5) {

      count4 = count4 - count5
      for (let i = 0; i < count4; i++) {
        return <>
          <tr>
            <td className="td-table"></td>
            <td className="td-table-right"></td>
          </tr>
        </>
      }
    } else if (count6 > count5) {

      count6 = count6 - count5
      for (let i = 0; i < count6; i++) {
        return <>
          <tr>
            <td className="td-table"></td>
            <td className="td-table-right"></td>
          </tr>
        </>
      }
    }
  }

  const renderTd2 = () => {
    if (count2 > count1 && count2 > count3) {

      for (let i = 0; i < count2; i++) {
        return <>
          <tr>
            <td className="td-table"></td>
            <td className="td-table-right"></td>
          </tr>
        </>
      }

    } else if (count1 > count2) {

      count1 = count1 - count2
      for (let i = 0; i < count1; i++) {
        return <>
          <tr>
            <td className="td-table"></td>
            <td className="td-table-right"></td>
          </tr>
        </>
      }
    } else if (count3 > count2) {

      count3 = count3 - count2
      for (let i = 0; i < count3; i++) {
        return <>
          <tr>
            <td className="td-table"></td>
            <td className="td-table-right"></td>
          </tr>
        </>
      }
    }
  }

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
        <Grid item md={3} xs={12} sm={12}>
          <Button variant="outlined" size="large" onClick={generatePDF}>Generate PDF</Button>
        </Grid>
        <Grid item md={3} xs={12} sm={12}>
          <Button onClick={navigateBack} size="large" variant="outlined">Regresar</Button>
        </Grid>
      </Stack>

      <HojaA4>
        <div className="page" id="boleta-pago">
          <Grid container spacing={1} justifyContent="center">
          <Grid item md={6}>
              <div className="border-header d-flex">
                <div>
                  <Grid container direction="column" alignItems="stretch" justifyContent="center" columns={1}>
                    <Grid item>
                      <p>EMPRESA MUNICIPAL ADMINISTRADORA DE PEAJE DE LIMA - EMAPE</p>
                      <p>R.U.C: 20100063337</p>
                      <p>AV. VIA DE EVITAMIENTO KM. 1.7 - ATE</p>
                      <div className="title">
                        <h4>BOLETA DE PAGO</h4>
                      </div>
                    </Grid>
                  </Grid>
                  <Grid container direction="row" alignItems="stretch" columns={20}>
                    <Grid item xs={14}>
                      <table className="table-content">
                        <tbody>
                          <tr>
                            <td className="td-bold">Código </td>
                            <td className="td-content">: {fields.coD_TRABAJADOR}</td>
                          </tr>
                          {dataH.length > 0 && (
                            <>
                              <tr>
                                <td className="td-bold">Trabajador </td>
                                <td className="td-content">: {dataH[0]['noM_ABR']}</td>
                              </tr>
                              <tr>
                                <td className="td-bold">Cargo </td>
                                <td className="td-content">: {dataH[0]['deS_CAR']}</td>
                              </tr>
                              <tr>
                                <td className="td-bold">U. Organiza.</td>
                                <td className="td-content">: {dataH[0]['deS_UORG']}</td>
                              </tr>
                              <tr>
                                <td className="td-bold">Sist. Pension</td>
                                <td className="td-content">: {dataH[0]['siS_PEN']}</td>
                              </tr>
                              <tr >
                                <td className="td-bold">Fecha Ingreso</td>
                                <td className="td-content">: {moment(dataH[0]['feC_INICIO']).format('DD/MM/yyyy')}</td>
                              </tr>
                              <tr>
                                <td className="td-bold">Tipo Planilla</td>
                                <td className="td-content">: {dataH[0]['noM_TIPOPLAN']}</td>
                              </tr>
                              <tr>
                                <td className="td-bold">Vacaciones</td>
                                <td className="td-content">: {dataH[0]['vacaciones']}</td>
                              </tr>
                              <tr>
                                <td className="td-bold">Tipo Papeleta</td>
                                <td className="td-content">: {dataH[0]['tipO_PAPELETA']}</td>
                              </tr>
                            </>
                          )}
                        </tbody>
                      </table>
                    </Grid>
                    <Grid item xs={6}>
                      <Grid container rowSpacing={2} justifyContent="center">
                        <Grid item xs={12}>
                          <table className="table-content">
                            <tbody>
                              <tr>
                                <td className="td-bold">DNI/C.E</td>
                                {dataH.length > 0 && (
                                  <td>: {dataH[0]['nuM_DOC']}</td>
                                )}
                              </tr>
                              {dataH.length > 0 && (
                                <>
                                  <tr>
                                    <td className="td-bold">Dias Trab.</td>
                                    <td className="td-content">: {dataH[0]['diastrab']}</td>
                                  </tr>
                                  <tr>
                                    <td className="td-bold">Dias Subsidio</td>
                                    <td className="td-content">: {dataH[0]['diaS_SUBSIDIO']}</td>
                                  </tr>
                                </>
                              )}
                            </tbody>
                          </table>
                        </Grid>
                        <Grid item xs={6}>
                          <table className="table-content">
                            <tbody>
                              {dataH.length > 0 && (
                                <>
                                  <tr >
                                    <td rowSpan={2}>
                                      <span className="header-tar">
                                        Per./Fal./Tar.
                                      </span><br />
                                      <div className="body-tar">
                                        Dias: {dataH[0]['dias']}
                                        <br />
                                        Horas: {dataH[0]['horas']}
                                        <br />
                                        Minutos: {dataH[0]['minutos']}
                                      </div>
                                    </td>
                                  </tr>
                                </>
                              )}
                            </tbody>
                          </table>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </div>
              </div>
              <div className="table-size border-body">
                <Grid container>
                  <Grid item md={4}>
                    <table className="table-center">
                      <thead>
                        <tr>
                          <th className="th-table" colSpan="1">INGRESOS</th>
                        </tr>
                      </thead>
                    </table>
                  </Grid>
                  <Grid item md={4}>
                    <table className="table-center">
                      <thead>
                        <tr>
                          <th className="th-table" colSpan="1">EGRESOS</th>
                        </tr>
                      </thead>
                    </table>
                  </Grid>
                  <Grid item md={4}>
                    <table className="table-center">
                      <thead>
                        <tr>
                          <th className="th-table2" colSpan="1">APORTACIONES</th>
                        </tr>
                      </thead>
                    </table>
                  </Grid>
                </Grid>
                <Grid container>
                  <Grid item md={4}>
                    <table className="table-center">
                      <thead>
                        <tr>
                          <th className="th-table" colSpan="1">CONCEPTO</th>
                          <th className="th-table" colSpan="1">MONTO</th>
                        </tr>
                      </thead>
                      <tbody>
                        {dataH &&
                          dataH.map((data) => {
                            if (data['ingresos'] != 0) {
                              income = income + data['ingresos']
                              count1 = count1 + 1
                              return (
                                <>
                                  <tr>
                                    <td className=""><p>{data['noM_CONCEPTO']}</p></td>
                                    <td className="td-table-left"><p>{data['ingresos']}</p></td>
                                  </tr>
                                </>
                              )
                            }
                          })}
                      </tbody>
                    </table>
                  </Grid>
                  <Grid item md={4}>
                    <table className="table-center ">
                      <thead>
                        <tr>  
                          <th className="th-table" colSpan="1">CONCEPTO</th>
                          <th className="th-table" colSpan="1">MONTO</th>
                        </tr>
                      </thead>
                      <tbody>
                        {dataH &&
                          dataH.map((data) => {
                            if (data['egresos'] != 0) {
                              expense = expense + data['egresos']
                              count2 = count2 + 1
                              return (
                                <>
                                  <tr>
                                    <td className="td-table"><p>{data['noM_CONCEPTO']}</p></td>
                                    <td className="td-table-right"><p>{data['egresos']}</p></td>
                                  </tr>
                                </>
                              )
                            }
                          })}
                          {renderTd2()}
                      </tbody>
                    </table>
                  </Grid>
                  <Grid item md={4}>
                    <table className="table-center ">
                      <thead>
                        <tr>
                          <th className="th-table" colSpan="1">CONCEPTO</th>
                          <th className="th-table2" colSpan="1">MONTO</th>
                        </tr>
                      </thead>
                      <tbody>
                        {dataH &&
                          dataH.map((data) => {
                            if (data['egresos'] === 0 && data['ingresos'] === 0) {
                              count3 = count3 + 1
                              return (
                                <>
                                  <tr>
                                    <td className="td-table2"><p>{data['noM_CONCEPTO']}</p></td>
                                    <td className="td-table-right2"><p>{data['aportaciones']}</p></td>
                                  </tr>
                                </>
                              )
                            }
                          })}
                      </tbody>
                    </table>
                  </Grid>
                </Grid>
                <Grid container>
                  <Grid item md={4}>
                    <table className="table-center">
                      <thead>
                        <tr>
                          <th className="th-table-footer2" colSpan="1">INGRESOS</th>
                        </tr>
                      </thead>
                    </table>
                  </Grid>
                  <Grid item md={4}>
                    <table className="table-center">
                      <thead>
                        <tr>
                          <th className="th-table-footer2" colSpan="1">EGRESOS</th>
                        </tr>
                      </thead>
                    </table>
                  </Grid>
                  <Grid item md={4}>
                    <table className="table-center">
                      <thead>
                        <tr>
                          <th className="th-table-footer3" colSpan="1">APORTACIONES</th>
                        </tr>
                      </thead>
                    </table>
                  </Grid>
                </Grid>
                <Grid container>
                  <Grid item md={4}>
                    <table className="table-center">
                      <thead>
                        <tr>
                          <th className="th-table-footer" colSpan="1">Total Ingresos</th>
                          <th className="th-table-footer" colSpan="1"> {income.toFixed(2)}</th>
                        </tr>
                      </thead>
                    </table>
                  </Grid>
                  <Grid item md={4}>
                    <table className="table-center ">
                      <thead>
                        <tr>
                          <th className="th-table-footer" colSpan="1">Total Egresos</th>
                          <th className="th-table-footer" colSpan="1">{expense.toFixed(2)}</th>
                        </tr>
                      </thead>
                    </table>
                  </Grid>
                  <Grid item md={4}>
                    <table className="table-center ">
                      <thead>
                        <tr>
                          <th className="th-table-footer" colSpan="2">NETO A PAGAR {(income.toFixed(2) - expense.toFixed(2)).toFixed(2)}</th>
                        </tr>
                      </thead>
                    </table>
                  </Grid>
                </Grid>
              </div>
            </Grid>
            <Grid item md={6}>
              <div className="border-header d-flex">
                <div>
                  <Grid container direction="column" alignItems="stretch" justifyContent="center" columns={1}>
                    <Grid item>
                      <p>EMPRESA MUNICIPAL ADMINISTRADORA DE PEAJE DE LIMA - EMAPE</p>
                      <p>R.U.C: 20100063337</p>
                      <p>AV. VIA DE EVITAMIENTO KM. 1.7 - ATE</p>
                      <div className="title">
                        <h4>BOLETA DE PAGO</h4>
                      </div>
                    </Grid>
                  </Grid>
                  <Grid container direction="row" alignItems="stretch" columns={20}>
                    <Grid item xs={14}>
                      <table className="table-content">
                        <tbody>
                          <tr>
                            <td className="td-bold">Código </td>
                            <td className="td-content">: {fields.coD_TRABAJADOR}</td>
                          </tr>
                          {dataH.length > 0 && (
                            <>
                              <tr>
                                <td className="td-bold">Trabajador </td>
                                <td className="td-content">: {dataH[0]['noM_ABR']}</td>
                              </tr>
                              <tr>
                                <td className="td-bold">Cargo </td>
                                <td className="td-content">: {dataH[0]['deS_CAR']}</td>
                              </tr>
                              <tr>
                                <td className="td-bold">U. Organiza.</td>
                                <td className="td-content">: {dataH[0]['deS_UORG']}</td>
                              </tr>
                              <tr>
                                <td className="td-bold">Sist. Pension</td>
                                <td className="td-content">: {dataH[0]['siS_PEN']}</td>
                              </tr>
                              <tr >
                                <td className="td-bold">Fecha Ingreso</td>
                                <td className="td-content">: {moment(dataH[0]['feC_INICIO']).format('DD/MM/yyyy')}</td>
                              </tr>
                              <tr>
                                <td className="td-bold">Tipo Planilla</td>
                                <td className="td-content">: {dataH[0]['noM_TIPOPLAN']}</td>
                              </tr>
                              <tr>
                                <td className="td-bold">Vacaciones</td>
                                <td className="td-content">: {dataH[0]['vacaciones']}</td>
                              </tr>
                              <tr>
                                <td className="td-bold">Tipo Papeleta</td>
                                <td className="td-content">: {dataH[0]['tipO_PAPELETA']}</td>
                              </tr>
                            </>
                          )}
                        </tbody>
                      </table>
                    </Grid>
                    <Grid item xs={6}>
                      <Grid container rowSpacing={2} justifyContent="center">
                        <Grid item xs={12}>
                          <table className="table-content">
                            <tbody>
                              <tr>
                                <td className="td-bold">DNI/C.E</td>
                                {dataH.length > 0 && (
                                  <td>: {dataH[0]['nuM_DOC']}</td>
                                )}
                              </tr>
                              {dataH.length > 0 && (
                                <>
                                  <tr>
                                    <td className="td-bold">Dias Trab.</td>
                                    <td className="td-content">: {dataH[0]['diastrab']}</td>
                                  </tr>
                                  <tr>
                                    <td className="td-bold">Dias Subsidio</td>
                                    <td className="td-content">: {dataH[0]['diaS_SUBSIDIO']}</td>
                                  </tr>
                                </>
                              )}
                            </tbody>
                          </table>
                        </Grid>
                        <Grid item xs={6}>
                          <table className="table-content">
                            <tbody>
                              {dataH.length > 0 && (
                                <>
                                  <tr >
                                    <td rowSpan={2}>
                                      <span className="header-tar">
                                        Per./Fal./Tar.
                                      </span><br />
                                      <div className="body-tar">
                                        Dias: {dataH[0]['dias']}
                                        <br />
                                        Horas: {dataH[0]['horas']}
                                        <br />
                                        Minutos: {dataH[0]['minutos']}
                                      </div>
                                    </td>
                                  </tr>
                                </>
                              )}
                            </tbody>
                          </table>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </div>
              </div>
              <div className="table-size border-body">
                <Grid container>
                  <Grid item md={4}>
                    <table className="table-center">
                      <thead>
                        <tr>
                          <th className="th-table" colSpan="1">INGRESOS</th>
                        </tr>
                      </thead>
                    </table>
                  </Grid>
                  <Grid item md={4}>
                    <table className="table-center">
                      <thead>
                        <tr>
                          <th className="th-table" colSpan="1">EGRESOS</th>
                        </tr>
                      </thead>
                    </table>
                  </Grid>
                  <Grid item md={4}>
                    <table className="table-center">
                      <thead>
                        <tr>
                          <th className="th-table2" colSpan="1">APORTACIONES</th>
                        </tr>
                      </thead>
                    </table>
                  </Grid>
                </Grid>
                <Grid container>
                  <Grid item md={4}>
                    <table className="table-center">
                      <thead>
                        <tr>
                          <th className="th-table" colSpan="1">CONCEPTO</th>
                          <th className="th-table" colSpan="1">MONTO</th>
                        </tr>
                      </thead>
                      <tbody>
                        {dataH &&
                          dataH.map((data) => {
                            if (data['ingresos'] != 0) {
                              income2 = income2 + data['ingresos']
                              count4 = count4 + 1
                              return (
                                <>
                                  <tr>
                                    <td className=""><p>{data['noM_CONCEPTO']}</p></td>
                                    <td className="td-table-left"><p>{data['ingresos']}</p></td>
                                  </tr>
                                </>
                              )
                            }
                          })}
                      </tbody>
                    </table>
                  </Grid>
                  <Grid item md={4}>
                    <table className="table-center ">
                      <thead>
                        <tr>
                          <th className="th-table" colSpan="1">CONCEPTO</th>
                          <th className="th-table" colSpan="1">MONTO</th>
                        </tr>
                      </thead>
                      <tbody>
                        {dataH &&
                          dataH.map((data) => {
                            if (data['egresos'] != 0) {
                              expense2 = expense2 + data['egresos']
                              count5 = count5 + 1
                              return (
                                <>
                                  <tr>
                                    <td className="td-table"><p>{data['noM_CONCEPTO']}</p></td>
                                    <td className="td-table-right"><p>{data['egresos']}</p></td>
                                  </tr>
                                </>
                              )
                            }
                          })}
                          {renderTd()}
                      </tbody>
                    </table>
                  </Grid>
                  <Grid item md={4}>
                    <table className="table-center ">
                      <thead>
                        <tr>
                          <th className="th-table" colSpan="1">CONCEPTO</th>
                          <th className="th-table2" colSpan="1">MONTO</th>
                        </tr>
                      </thead>
                      <tbody>
                        {dataH &&
                          dataH.map((data) => {
                            if (data['egresos'] === 0 && data['ingresos'] === 0) {
                              count6 = count6 + 1
                              return (
                                <>
                                  <tr>
                                    <td className="td-table2"><p>{data['noM_CONCEPTO']}</p></td>
                                    <td className="td-table-right2"><p>{data['aportaciones']}</p></td>
                                  </tr>
                                </>
                              )
                            }
                          })}
                      </tbody>
                    </table>
                  </Grid>
                </Grid>
                <Grid container>
                  <Grid item md={4}>
                    <table className="table-center">
                      <thead>
                        <tr>
                          <th className="th-table-footer2" colSpan="1">INGRESOS</th>
                        </tr>
                      </thead>
                    </table>
                  </Grid>
                  <Grid item md={4}>
                    <table className="table-center">
                      <thead>
                        <tr>
                          <th className="th-table-footer2" colSpan="1">EGRESOS</th>
                        </tr>
                      </thead>
                    </table>
                  </Grid>
                  <Grid item md={4}>
                    <table className="table-center">
                      <thead>
                        <tr>
                          <th className="th-table-footer3" colSpan="1">APORTACIONES</th>
                        </tr>
                      </thead>
                    </table>
                  </Grid>
                </Grid>
                <Grid container>
                  <Grid item md={4}>
                    <table className="table-center">
                      <thead>
                        <tr>
                          <th className="th-table-footer" colSpan="1">Total Ingresos</th>
                          <th className="th-table-footer" colSpan="1"> {income.toFixed(2)}</th>
                        </tr>
                      </thead>
                    </table>
                  </Grid>
                  <Grid item md={4}>
                    <table className="table-center ">
                      <thead>
                        <tr>
                          <th className="th-table-footer" colSpan="1">Total Egresos</th>
                          <th className="th-table-footer" colSpan="1">{expense.toFixed(2)}</th>
                        </tr>
                      </thead>
                    </table>
                  </Grid>
                  <Grid item md={4}>
                    <table className="table-center ">
                      <thead>
                        <tr>
                          <th className="th-table-footer" colSpan="2">NETO A PAGAR {(income.toFixed(2) - expense.toFixed(2)).toFixed(2)}</th>
                        </tr>
                      </thead>
                    </table>
                  </Grid>
                </Grid>
              </div>
            </Grid>
          </Grid>
        </div>

      </HojaA4>
    </>
  );
};
const HojaA4 = styled.div`

  .header-tar{
    background-color: #938d8d;
    padding: 5px;
    margin: 0px;
    font-weight: bold;
  }

  .body-tar{
    padding: 2px; 
    margin: 0px;
    border: 1px solid black;
    font-weight: bold;
  }

  .title{
    text-align:center;
  }

  .title h4{
    text-decoration: underline;
    margin: 14px;
    width: 100%;
  }

  .table-content{
    font-size: 9px;
    margin-top: 0px;
  }

  .td-content{
    font-size: 8px;
  }

  .page {
    width: 22cm;
    padding: 0cm;
    margin: 5px;
    background: white;
    font: 12pt;
    letter-spacing: 0.01px;
    word-spacing: 0.01px;
  }

  .th-table {
    font-size: 8px;
    border-bottom: 1px solid #000;
    border-right: 1px solid #000;
  }

  .th-table2 {
    font-size: 8px;
    border-bottom: 1px solid #000;
  }

  .th-table-footer{
    font-size: 8px;
  }

  .th-table-footer2{
    font-size: 8px;
    border-bottom: 1px solid #000;
    border-right: 1px solid #000;
    border-top: 1px solid #000;
  }

  .th-table-footer3{
    font-size: 8px;
    border-bottom: 1px solid #000;
    border-top: 1px solid #000;
  }

  .td-table-right{
    height: 0.8cm;
    text-align: center;
    border-right: 1px solid #000;
  }


  .td-table-right{
    height: 0.8cm;
    text-align: center;
  }
  
  p {
    font-size: 6.5px;
    margin: 0;
  }
  h5 {
    margin: 0;
  }
  
  .td-bold{
    font-weight: bold;
  }

  .td-table {
    height: 0.8cm;
    text-align: center;
    border-left: 1px solid #000;
  }

  .td-table2 {
    height: 0.8cm;
    text-align: center;
  }

  .td-table-left {
    height: 0.8cm;
    text-align: center;
    border-left: 1px solid #000;
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
  .border-table-left {
    border-left: 1px solid #000;
  }
  .border-header {
    border-top: 1px solid #000;
    border-left: 1px solid #000;
    border-right: 1px solid #000;
    padding: .1cm .3cm;
    border-radius: 10px 10px 0 0;
  }

  .border-body {
    border-top: 1px solid #000;
    border-left: 1px solid #000;
    border-right: 1px solid #000;
    border-bottom: 1px solid #000;
    border-radius: 0px 0px 10px 10px;
  }

`;
export default HistoricalBallot;
