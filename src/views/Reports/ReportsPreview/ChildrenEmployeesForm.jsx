
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button, Grid, TextField, Stack } from "@mui/material";
import { Link } from "react-router-dom";
import jsPDF from "jspdf";
import styled from "styled-components";
import { GetDetalleDeHijosTrabajadores } from "../../../service/common";
import moment from "moment";
var XLSX = require("xlsx");

const ChildrenEmployeesForm = () => {
  const generatePDF = () => {
    const doc = new jsPDF('p', 'pt', 'a4');
    doc.html(document.querySelector(HojaA4), {
      callback: function (doc) {
        doc.save("Reporte-Trabajador-Hijo.pdf");
      }
    })
  };

  const downloadExcel = (dataExport) => {
    //var Headers = [["Reporte de Trabajador y Hijo"]];
    let dataH = [];
    dataExport.forEach((item) => {
      dataH.push({
        "DNI TRAB.": item?.dnI_TRABAJADOR,
        "APELLIDOS Y NOMBRES - TRABAJADOR": item?.apellidoS_NOMBRES_TRABAJADOR,
        "DNI HIJOS": item?.dnI_HIJO,
        "APELLIDOS Y NOMBRES - HIJOS": item?.apellidoS_NOMBRES_HIJOS,
        "F. ING": item?.fechA_INGRESO,
        "EDAD": item?.edad,
        "OBSERVACIONES": item?.observacion,

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
    XLSX.utils.book_append_sheet(workBook, workSheet, "ReporteTrabajadorHijo");
    XLSX.write(workBook, { bookType: "xlsx", type: "buffer" });
    XLSX.write(workBook, { bookType: "xlsx", type: "binary" });
    XLSX.writeFile(workBook, "Reporte-Trabajador-Hijo.xlsx");
  };

  const { codt } = useParams();
  const fields = {
    coD_TRABAJADOR: codt
  };

  const [dataH, setDataH] = useState([]);
  const loadData = async () => {
    const response1 = await GetDetalleDeHijosTrabajadores(fields.coD_TRABAJADOR)
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
              <h1>Detalle de Hijos Trabajadores</h1>
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
                <h4>DETALLE DE HIJOS TRABAJADORES</h4>
              </div>
            </div>
          </div>
          <div className="table-size">
            <table className="table-center border-table">
              <thead>
                <tr>
                  <th className="th-table" colSpan="1">DNI TRAB.</th>
                  <th className="th-table" colSpan="2">APELLIDOS Y NOMBRES - TRABAJADOR</th>
                  <th className="th-table" colSpan="1">DNI HIJOS</th>
                  <th className="th-table" colSpan="2">APELLIDOS Y NOMBRES - HIJOS</th>
                  <th className="th-table" colSpan="2">F. ING</th>
                  <th className="th-table" colSpan="1">EDAD</th>
                  <th className="th-table" colSpan="2">OBSERVACIONES</th>
                </tr>
              </thead>
              <tbody>
                {dataH &&
                  dataH.map((data, index) => {
                    return (
                      <tr key={index}>
                        <td className="td-table" colSpan="1">{data['dnI_TRABAJADOR']}</td>
                        <td className="td-table" colSpan="2">{data['apellidoS_NOMBRES_TRABAJADOR']}</td>
                        <td className="td-table" colSpan="1">{data['dnI_HIJO']}</td>
                        <td className="td-table" colSpan="2">{data['apellidoS_NOMBRES_HIJOS']}</td>
                        <td className="td-table" colSpan="2">{moment(data['fechA_INGRESO']).format('DD/MM/yyyy')}</td>
                        <td className="td-table" colSpan="1">{data['edad']}</td>
                        <td className="td-table" colSpan="2">{data['observacion']}</td>
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
    font-size: 7pt;
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

export default ChildrenEmployeesForm; 