
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button, Grid, TextField, Stack } from "@mui/material";
import { Link } from "react-router-dom";
import jsPDF from "jspdf";
import styled from "styled-components";
import { GetReportePadronTrabajadores } from "../../../service/common";
var XLSX = require("xlsx");

const WorkersList = () => {
  const generatePDF = () => {
    const doc = new jsPDF('l', 'pt', 'a4');
    doc.html(document.querySelector(HojaA4), {
      callback: function (doc) {
        doc.save("Reporte-Padron-Trabajadores.pdf");
      }
    })
  };

  const { inicio, termino } = useParams();
  const fields = {
  };

  const [dataH, setDataH] = useState([]);
  const loadData = async () => {
    const response1 = await GetReportePadronTrabajadores()
    setDataH(response1.listado);
  };
  console.log(dataH);

  useEffect(() => {
    loadData();
  }, []);

  const downloadExcel = (dataExport) => {
    //var Headers = [[""]];
    let dataH = [];
    dataExport.forEach((item) => {
      dataH.push({
        "DNI": item?.dni,
        "Apellidos y nombres": item?.nomTrab,
        "UnidadOrganizacional": item?.unidadOrganizacional,
        "Condición Laboral": item?.condiciónLaboral,
        "Sexo": item?.SEXO,
        "FEC. NAC": item?.fecNacim,
        "TEL/CEL": item?.teL_CEL,
        "CARGO": item?.cargo,
        "N° RUC": item?.ruc,
        "FEC. INGR": item?.fecIngreso,
        "FEC. CESE": item?.fecCese,
        "ESTADO": item?.estado,
        "SIS. PENSION": item?.sisPension,
        "CUSP": item?.cusp,
        "BANCO": item?.banco,
        "CTA BANCO": item?.ctaBanco,
        "SUELDO": item?.sueldo,
        "MONTO PLANILLA": item?.montoPlan,

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
    XLSX.utils.book_append_sheet(workBook, workSheet, "PADRON DE TRABAJADORES");
    XLSX.write(workBook, { bookType: "xlsx", type: "buffer" });
    XLSX.write(workBook, { bookType: "xlsx", type: "binary" });
    XLSX.writeFile(workBook, "PADRONDETRABAJADORES.xlsx");
  };

  return (
    <>
      <Grid item md={3} xs={12} sm={12}>
        <div xs={{ flexGrow: 1 }}>
          <Stack direction="row" spacing={1} xs={{ mb: 1, display: "flex" }}>
            <div>
              <h1>PADRON DE TRABAJADORES</h1>
            </div>
          </Stack>
        </div>
      </Grid>
      <Stack direction="row" spacing={1} xs={{ display: "flex" }}>
        <Button variant="outlined" onClick={generatePDF}>Generate PDF</Button>
        <Grid item md={3} xs={12} sm={12}>
          <Link
            to="/RRHHDEV/reportes/LegajoReportes"
            style={{ textDecoration: "none" }}
          >
            <Button size="large" variant="outlined">
              Regresar
            </Button>
          </Link>
        </Grid>
          <Button variant="outlined" onClick={() => {
          downloadExcel(dataH);
        }}>Generate Excel</Button>
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
                      PADRON DE TRABAJADORES
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
                  <th className="th-table" colSpan="1">DNI</th>
                  <th className="th-table" colSpan="1">APELLIDOS Y NOMBRES</th>
                  <th className="th-table" colSpan="1">UNIDAD ORGANIZACIONAL</th>
                  <th className="th-table" colSpan="1">CONDICIÓN LABORAL</th>
                  <th className="th-table" colSpan="1">SEXO</th>
                  <th className="th-table" colSpan="1">FEC. NAC</th>
                  <th className="th-table" colSpan="1">TEL/CEL</th>
                  <th className="th-table" colSpan="1">CARGO</th>
                  <th className="th-table" colSpan="1">N° RUC</th>
                  <th className="th-table" colSpan="1">FEC. INGR</th>
                  <th className="th-table" colSpan="1">FEC. CESE</th>
                  <th className="th-table" colSpan="1">ESTADO</th>
                  <th className="th-table" colSpan="1">SIS. PENSION</th>
                  <th className="th-table" colSpan="1">CUSP</th>
                  <th className="th-table" colSpan="1">BANCO</th>
                  <th className="th-table" colSpan="1">CTA BANCO</th>
                  <th className="th-table" colSpan="1">SUELDO</th>
                  <th className="th-table" colSpan="1">MONTO PLANILLA</th>
                </tr>
              </thead>
              <tbody>
                {dataH &&
                  dataH.map((data, index) => {
                    return (
                      <tr key={index}>
                        <td className="td-table" colSpan="1">{data['dni']}</td>
                        <td className="td-table" colSpan="1">{data['nomTrab']}</td>
                        <td className="td-table" colSpan="1">{data['unidadOrganizacional']}</td>
                        <td className="td-table" colSpan="1">{data['condiciónLaboral']}</td>
                        <td className="td-table" colSpan="1">{data['sexo']}</td>
                        <td className="td-table" colSpan="1">{data['fecNacim']}</td>
                        <td className="td-table" colSpan="1">{data['teL_CEL']}</td>
                        <td className="td-table" colSpan="1">{data['cargo']}</td>
                        <td className="td-table" colSpan="1">{data['ruc']}</td>
                        <td className="td-table" colSpan="1">{data['fecIngreso']}</td>
                        <td className="td-table" colSpan="1">{data['fecCese']}</td>
                        <td className="td-table" colSpan="1">{data['estado']}</td>
                        <td className="td-table" colSpan="1">{data['sisPension']}</td>
                        <td className="td-table" colSpan="1">{data['cusp']}</td>
                        <td className="td-table" colSpan="1">{data['banco']}</td>
                        <td className="td-table" colSpan="1">{data['ctaBanco']}</td>
                        <td className="td-table" colSpan="1">{data['sueldo']}</td>
                        <td className="td-table" colSpan="1">{data['montoPlan']}</td>
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
    font-size: 5pt;
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

export default WorkersList; 