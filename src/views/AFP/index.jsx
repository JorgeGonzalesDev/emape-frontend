import DataGridDemo from "../../components/Table";
import { listAFPS } from "../../service/afp";
import { useState, useEffect } from "react";
import ResponsiveAppBar from "../../layouts/Header";

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
      <ResponsiveAppBar>
        <div style={{ padding: "50px", display: "flex", height: "100%" }}>
          <div style={{ flexGrow: 1 }}>
            <DataGridDemo
              id={(row) => row.coD_AFP}
              rows={data}
              columns={columns}
            />
          </div>
        </div>
      </ResponsiveAppBar>
    </>
  );
};

export default AFP;
