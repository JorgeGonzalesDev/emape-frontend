import DataGridDemo from "../../components/Table";
import { getCondicionLaboral } from "../../service/labor/workingCondition";
import { useState, useEffect } from "react";
import { Stack } from "@mui/material";

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
    }
  ];

  return (
    <>
          <div style={{ flexGrow: 1 }}>
          <Stack
          direction="row"
          spacing={1} xs={{ mb: 1, display: 'flex' }}
        >
          <div>
            <h1>Condicional Laboral</h1>
          </div>
        </Stack>
            <DataGridDemo
              id={(row) => row.coD_CONDICION}
              rows={data}
              columns={columns}
            />
          </div>
    </>
  );
};

export default WorkingCondition;
