import DataGridDemo from "../../components/Table";
import { listAFPS } from "../../service/afp";
import { useState, useEffect } from "react";
import { Stack } from "@mui/material";

const AFP = () => {
  const [data, setData] = useState([]);

  const loadData = async () => {
    const response = await listAFPS();
    setData(response.listado);
  };

  const columns = [
    {
      field: "coD_AFP",
      headerName: "Código",
      width: 400,
      headerAlign: "center",
    },
    {
      field: "noM_AFP",
      headerName: "Nombre",
      width: 400,
      headerAlign: "center",
    },
  ];

  useEffect(() => {
    loadData();
  }, []);

  return (
    <>
        <div style={{ flexGrow: 1 }}>
        <Stack
          direction="row"
          spacing={1} xs={{ mb: 1, display: 'flex' }}
        >
          <div>
            <h1>AFP</h1>
          </div>
        </Stack>
          <DataGridDemo
            id={(row) => row.coD_AFP}
            rows={data}
            columns={columns}
          />
        </div>
    </>
  );
};

export default AFP;
