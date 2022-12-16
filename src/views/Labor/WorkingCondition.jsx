import DataGridDemo from "../../components/Table";
import { getCondicionLaboral } from "../../service/labor/workingCondition";
import { useState, useEffect } from "react";
import { Stack, MenuItem } from "@mui/material";
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

  const downloadExcel = (dataExport) => {
    var Headers = [["INFORMACIÓN DE PERSONAS"]];
    let nData = [];
    dataExport.forEach((item) => {
      nData.push({
        Código: item?.coD_CONDICION,
        "Condicion Laboral": item?.noM_CONDICION,
        Abreviado: item?.noM_ABR,
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
    XLSX.utils.book_append_sheet(workBook, workSheet, "Condición Laboral");
    XLSX.write(workBook, { bookType: "xlsx", type: "buffer" });
    XLSX.write(workBook, { bookType: "xlsx", type: "binary" });
    XLSX.writeFile(workBook, "ReporteCondicionLaboral.xlsx");
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
        <GridToolbarColumnsButton />
        <GridToolbarFilterButton />
        <GridToolbarDensitySelector />
        <GridToolbarExport
          printOptions={{
            hideFooter: true,
            hideToolbar: true,
            fields: [
              "coD_CONDICION",
              "noM_CONDICION",
              "noM_ABR",
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
            <h1>Condición Laboral</h1>
          </div>
        </Stack>
        <DataGridDemo
          id={(row) => row?.coD_CONDICION}
          rows={data}
          columns={columns}
          toolbar={CustomToolbar}
        />
      </div>
    </>
  );
};

export default WorkingCondition;
