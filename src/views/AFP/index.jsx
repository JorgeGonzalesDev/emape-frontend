import DataGridDemo from "../../components/Table";
import { listAFPS } from "../../service/afp";
import { useState, useEffect } from "react";
import { Stack , MenuItem} from "@mui/material";

import {
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarExportContainer,
  GridPrintExportMenuItem,
  GridToolbarDensitySelector,
  gridFilteredSortedRowIdsSelector,
  gridVisibleColumnFieldsSelector,
  useGridApiContext,
} from "@mui/x-data-grid";

var XLSX = require("xlsx");

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

  const downloadExcel = (dataExport) => {
    var Headers = [["INFORMACIÓN DE AFP"]];
    let nData = [];
    dataExport.forEach((item) => {
      nData.push({
        Código: item?.coD_AFP,
        Nombre: item?.noM_AFP,
      });
    });

    const workSheet = XLSX.utils.json_to_sheet(nData, { origin: "A2" });
    const workBook = XLSX.utils.book_new();

    const merge = [
      { s: { r: 0, c: 0 }, e: { r: 0, c: 33 } },
      { s: { r: 0, c: 34 }, e: { r: 0, c: 37 } },
    ];

    workSheet["!merges"] = merge;

    XLSX.utils.sheet_add_aoa(workSheet, Headers);
    XLSX.utils.book_append_sheet(workBook, workSheet, "AFP");
    XLSX.write(workBook, { bookType: "xlsx", type: "buffer" });
    XLSX.write(workBook, { bookType: "xlsx", type: "binary" });
    XLSX.writeFile(workBook, "ReporteAFP.xlsx");
  };

  const getData = (apiRef) => {
    const filteredSortedRowIds = gridFilteredSortedRowIdsSelector(apiRef);
    const visibleColumnsField = gridVisibleColumnFieldsSelector(apiRef);
    const data = filteredSortedRowIds.map((id) => {
      const row = {};
      visibleColumnsField.forEach((field) => {
        row[field] = apiRef.current.getCellParams(id, field).value;
      });
      return row;
    });

    return data;
  };

  const ExcelExportMenuItem = (props) => {
    const apiRef = useGridApiContext();

    const { hideMenu } = props;

    return (
      <MenuItem
        onClick={() => {
          const data = getData(apiRef);
          downloadExcel(data);
          hideMenu?.();
        }}
      >
        Excel
      </MenuItem>
    );
  };

  const GridToolbarExport = ({ csvOptions, printOptions, ...other }) => (
    <GridToolbarExportContainer {...other}>
      <ExcelExportMenuItem />
    </GridToolbarExportContainer>
  );

  function CustomToolbar() {
    return (
      <GridToolbarContainer>
        <GridToolbarFilterButton />
        <GridToolbarColumnsButton />
        <GridToolbarDensitySelector />
        <GridToolbarExport
          printOptions={{
            hideFooter: true,
            hideToolbar: true,
            fields: [
              "coD_AFP",
              "noM_AFP",
            ],
          }}
        />
      </GridToolbarContainer>
    );
  }

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
            toolbar={CustomToolbar}
          />
        </div>
    </>
  );
};

export default AFP;
