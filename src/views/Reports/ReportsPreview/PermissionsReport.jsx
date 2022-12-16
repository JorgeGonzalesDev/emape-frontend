
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button, Grid, TextField, Stack } from "@mui/material";
import { Link } from "react-router-dom";
import jsPDF from "jspdf";
import styled from "styled-components";
import { GetReportePermisos } from "../../../service/common";

const PermissionsReport = () => {
  const generatePDF = () => {
    const doc = new jsPDF('l', 'pt', 'a4');
    doc.html(document.querySelector(HojaA4), {
      callback: function (doc) {
        doc.save("Reporte-Permisos.pdf");
      }
    })
  };

  const { inicio, termino } = useParams();
  const fields = {
    inicio: inicio,
    termino: termino
  };

  const [dataH, setDataH] = useState([]);
  const loadData = async () => {
    const response1 = await GetReportePermisos(fields.inicio, fields.termino)
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
              <h1>Reporte de Permisos</h1>
            </div>
          </Stack>
        </div>
      </Grid>
      <Stack direction="row" spacing={1} xs={{ display: "flex" }}>
        <Button variant="outlined" onClick={generatePDF}>Generate PDF</Button>
        <Grid item md={3} xs={12} sm={12}>
          <Link
            to="/RRHHDEV/reportes/controlReportes"
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
                      EMPRESA MUNICIPAL ADMINISTRADORA DE PEAJE<br />
                      Sistema Personal
                    </td>
                    <td>
                      Fecha<br />
                      Hora
                    </td>
                    <td>
                      : {new Date().getDate() + '/' + new Date().getMonth() + '/' + new Date().getFullYear()}<br />
                      : {new Date().getHours() + ':' + new Date().getMinutes() + ':' + new Date().getSeconds()}
                    </td>
                  </tr>
                  <tr>
                    <td colSpan="4" className="td-title">
                      RELACION DE PAPELETAS <br />
                      DEL 17/10/2022 AL 30/1/2022
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
                  <th className="th-table" colSpan="1">N° PAPELETA</th>
                  <th className="th-table" colSpan="1">FECHA</th>
                  <th className="th-table" colSpan="3">NOMBRE</th>
                  <th className="th-table" colSpan="2">MOTIVO</th>
                  <th className="th-table" colSpan="1">INICIO</th>
                  <th className="th-table" colSpan="1">TERMINO</th>
                  <th className="th-table" colSpan="1">DIA</th>
                  <th className="th-table" colSpan="1">HH:MM</th>
                  <th className="th-table" colSpan="3">OBSERVACION</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="td-table" colSpan="14">TIPO: JUSTIFICACION POR COMISION</td>
                </tr>
                {dataH &&
                  dataH.map((data, index) => {
                    return (
                      <tr key={index}>
                        <td className="td-table text-center" colSpan="1">{data['n_PAPELETA']}</td>
                        <td className="td-table text-center" colSpan="1">{data['fecha']}</td>
                        <td className="td-table" colSpan="3">{data['nombre']}</td>
                        <td className="td-table" colSpan="2">{data['motivo']}</td>
                        <td className="td-table text-center" colSpan="1">{data['inicio']}</td>
                        <td className="td-table text-center" colSpan="1">{data['termino']}</td>
                        <td className="td-table text-right" colSpan="1">{data['dias']}</td>
                        <td className="td-table text-right" colSpan="1">{data['hH_MM']}</td>
                        <td className="td-table" colSpan="3">{data['observacion']}</td>
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
    width: 100%;
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
  .td-title {
    text-align: center;
    font-size: 13px;
    font-weight: bold;
    padding: 3%;
  }
  .td-table {
    height: 0.5cm;
    font-size: 8pt;
    padding: 2px 12px;
  }
  .text-right {
    text-align: right;
  }
  .text-center {
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

export default PermissionsReport; 