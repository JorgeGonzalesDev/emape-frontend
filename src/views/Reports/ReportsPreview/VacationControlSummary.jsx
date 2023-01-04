import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button, Grid, TextField, Stack } from "@mui/material";
import { Link } from "react-router-dom";
import jsPDF from "jspdf";
import styled from "styled-components";
import { GetReporteResumenControlDeVacaciones } from "../../../service/common";

const VacationControlSummary = () => {
  const generatePDF = () => {
    const doc = new jsPDF('p', 'pt', 'a4');

    doc.html(document.querySelector(HojaA4), {
      callback: function (doc) {
        doc.save("Reporte-Detalle_De_Vacaciones.pdf");
      }
    })

  };
  const { mes, annio } = useParams();
  const fields = {
    mes: mes,
    annio: annio
  };

  const [dataH, setDataH] = useState([]);
  let num = 0;
  const loadData = async () => {
    const response1 = await GetReporteResumenControlDeVacaciones(fields.annio)
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
              <h1>REPORTE</h1>
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
              <div className="title">
                <h4> RESUMEN CONTROL DE VACACIONES </h4>
              </div>
            </div>
          </div>
          <div className="table-size">
            <table className="table-center border-table">
              <thead>
                <tr>
                  <th className="th-table" colSpan="1">NRO</th>
                  <th className="th-table" colSpan="1">T/REP</th>
                  <th className="th-table" colSpan="1">UND</th>
                  <th className="th-table" colSpan="1">DNI</th>
                  <th className="th-table" colSpan="2">APELLIDO Y NOMBRES</th>
                  <th className="th-table" colSpan="1">FECHA INGRESO PLANILLA</th>
                  <th className="th-table" colSpan="1">2020</th>
                  <th className="th-table" colSpan="1">2021</th>
                  <th className="th-table" colSpan="1">2022</th>
                  <th className="th-table" colSpan="1">2023</th>
                  <th className="th-table" colSpan="1">2024</th>
                  <th className="th-table" colSpan="1">2025</th>
                  <th className="th-table" colSpan="1">TOTAL</th>
                </tr>
              </thead>
              <tbody>
                {dataH &&
                  dataH.map((data, index) => {
                    if (dataH){
                      num = num + 1
                      return (
                        <tr key={index}>
                          <td className="td-table" colSpan="1"><p>{num}</p></td>
                          <td className="td-table" colSpan="1"><p>{data['t_REP']}</p></td>
                          <td className="td-table" colSpan="1"><p>{data['und']}</p></td>
                          <td className="td-table" colSpan="1"><p>{data['dni']}</p></td>
                          <td className="td-table" colSpan="2"><p>{data['apellidoS_NOMBRES']}</p></td>
                          <td className="td-table" colSpan="1"><p>{data['fechA_INGRESO_PLANILLA']}</p></td>
                          <td className="td-table" colSpan="1"><p>{data['a2020']}</p></td>
                          <td className="td-table" colSpan="1"><p>{data['a2021']}</p></td>
                          <td className="td-table" colSpan="1"><p>{data['a2022']}</p></td>
                          <td className="td-table" colSpan="1"><p>{data['a2023']}</p></td>
                          <td className="td-table" colSpan="1"><p>{data['a2024']}</p></td>
                          <td className="td-table" colSpan="1"><p>{data['a2025']}</p></td>
                          <td className="td-table" colSpan="1"><p>{data['total']}</p></td>
                        </tr>
                      )
                    }
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

export default VacationControlSummary; 