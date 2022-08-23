import ResponsiveAppBar from "../../layouts/Header";
import DataGridDemo from "../../components/Table";
import { Grid, Button } from "@mui/material";
import { getCondicionLaboral } from "../../service/labor/workingCondition";
import { useState, useEffect } from "react";

const WorkingCondition = () => {
  const [data, setData] = useState([]);

  const loadData = async () => {
    const response = await getCondicionLaboral();
    setData(response.listado);
  };

  useEffect(() => {
    loadData();
  }, []);

  const columns = [
    {
      field: "coD_CONDICION",
      headerName: "Código",
      width: 200,
    },
    {
      field: "noM_CONDICION",
      headerName: "Condicion Laboral",
      width: 500,
    },
    {
      field: "noM_ABR",
      headerName: "Abreviado",
      width: 400,
    },
    {
      headerName: "Opciones",
      renderCell: (params) => (
        <strong>
          <Button variant="contained" size="small" style={{ marginLeft: 16 }}>
            Open
          </Button>
        </strong>
      ),
      editable: false,
      sortable: false,
    },
  ];

  return (
    <>
      <ResponsiveAppBar>
        <div style={{ padding: "50px", display: "flex", height: "100%" }}>
          <div style={{ flexGrow: 1 }}>
            <DataGridDemo
              id={(row) => row.coD_CONDICION}
              rows={data}
              columns={columns}
            />
          </div>
        </div>
      </ResponsiveAppBar>
    </>
  );
};

export default WorkingCondition;
