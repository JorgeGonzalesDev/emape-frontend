
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button, Grid, TextField, Stack } from "@mui/material";
import { Link } from "react-router-dom";
import jsPDF from "jspdf";
import styled from "styled-components";
import moment from "moment/moment";
import { GetReporteDeTrabajadoresFechaNacimientoySexo } from "../../../service/common";
var XLSX = require("xlsx");

const WorkersDatebirthSexForm = () => {
  const generatePDF = () => {
    const doc = new jsPDF('p', 'pt', 'a4');
    doc.html(document.querySelector(HojaA4), {
      callback: function (doc) {
        doc.save("Reporte-TrabajadoresActivos-FechaSexo.pdf");
      }
    })
  };

  const downloadExcel = (dataExport) => {
    //var Headers = [["Reporte Trabajadores Activos FechaSexo"]];
    let dataH = [];
    dataExport.forEach((item) => {
      dataH.push({
        "DNI": item?.nuM_DOC,
        "N°": item?.noM_TIPOTRABAJ,
        "TRABAJADOR": item?.noM_ABR,
        "SEXO": item?.inD_SEXO,
        "F. NACIMIENTO": item?.feC_NACIM,

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
    XLSX.utils.book_append_sheet(workBook, workSheet, "ReporteTrabajadores");
    XLSX.write(workBook, { bookType: "xlsx", type: "buffer" });
    XLSX.write(workBook, { bookType: "xlsx", type: "binary" });
    XLSX.writeFile(workBook, "Reporte-TrabajadoresActivos-FechaSexo.xlsx");
  };

  const [dataH, setDataH] = useState([]);
  const loadData = async () => {
    const response1 = await GetReporteDeTrabajadoresFechaNacimientoySexo()
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
              <h1>Detalle de Fechas de Nacimiento de Personal Activo</h1>
            </div>
          </Stack>
        </div>
      </Grid>
      <Stack direction="row" spacing={1} xs={{ display: "flex" }}>
        <Button variant="outlined" onClick={generatePDF}>Generate PDF</Button>
        <Button variant="outlined" onClick={() => {downloadExcel(dataH);}}>Generate Excel</Button>
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
      </Stack>
      <br />

      <HojaA4>
        <div className="page" id="boleta-pago">
          <div className="border-header d-flex">
            <div className="container">
              <div className="title">
                <h4>DETALLE FECHA NACIMIENTO PERSONAL ACTIVO</h4>
              </div>
            </div>
          </div>
          <div className="table-size">
            <table className="table-center border-table">
              <thead>
                <tr>
                  <th className="th-table" colSpan="1">DNI</th>
                  <th className="th-table" colSpan="2">N°</th>
                  <th className="th-table" colSpan="3">TRABAJADOR</th>
                  <th className="th-table" colSpan="4">SEXO</th>
                  <th className="th-table" colSpan="5">F. NACIMIENTO</th>
                </tr>
              </thead>
              <tbody>
                {dataH &&
                  dataH.map((data, index) => {
                    return (
                      <tr key={index}>
                        <td className="td-table" colSpan="1">{data['nuM_DOC']}</td>
                        <td className="td-table" colSpan="2">{data['noM_TIPOTRABAJ']}</td>
                        <td className="td-table" colSpan="3">{data['noM_ABR']}</td>
                        <td className="td-table" colSpan="4">{data['inD_SEXO']}</td>
                        <td className="td-table" colSpan="5">{moment(data['feC_NACIM']).format('DD/MM/yyyy')}</td>
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
    font-size: 8pt;
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

export default WorkersDatebirthSexForm; 