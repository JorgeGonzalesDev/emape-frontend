import DataGridDemo from "../../components/Table";
import { Stack } from "@mui/material";
import { useState, useEffect } from "react";

const PersonalAction = () => {
  const [data, setData] = useState([]);

  // const loadData = async () => {
  //     const response = await getCondicionLaboral();
  //     setData(response.listado)
  // }

  // useEffect(() => {

  //     loadData();

  // }, []);

  const rows = [];

  const columns = [
    {
      field: "code",
      headerName: "Código",
      width: 200,
    },
    {
      field: "name",
      headerName: "Nombre",
      width: 500,
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
            <h1>Acción Personal</h1>
          </div>
        </Stack>
            <DataGridDemo
              id={(row) => row?.code}
              rows={rows}
              columns={columns}
            />
          </div>
    </>
  );
};

export default PersonalAction;
