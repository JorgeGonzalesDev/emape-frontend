import {
    getTipoEstudio
  } from "../../service/studies";
  import MUIModal from "../../components/Modal";
  import DataGridDemo from "../../components/Table";
  import { useState, useEffect, useRef } from "react";
  import SchoolIcon from "@mui/icons-material/School";
  import EditIcon from "@mui/icons-material/Edit";
  import DeleteIcon from "@mui/icons-material/Delete";
  import { Button, Grid, TextField, Stack, MenuItem } from "@mui/material";
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
  import { AlertDelete } from "../../components/Alerts";
  import { AlertSuccess, AlertError } from "../../components/Alerts";
  import IconToolTip from "../../components/Icons/IconToolTip";

  var XLSX = require("xlsx");
  
  const Studies = () => {
    const defaultfields = {
      coD_ESTUDIO: 0,
      noM_ESTUDIO: null,
      inD_ESTADO: null,
    }
    const [fields, setFields] = useState({
      coD_ESTUDIO: 0,
      noM_ESTUDIO: null,
      inD_ESTADO: null,
    });
  
    const [data, setData] = useState([]);
    const levelEducateChild = useRef();
    const [detail, setDetail] = useState({});
  
    const handleInputChange = (event) => {
      const { name, value } = event.target;
      setFields({ ...fields, [name]: value });
    };
  
    const loadData = async () => {
      const response = await getTipoEstudio();
      setData(response.listado);
    };
    /*  */
    /* const destroy = async (event, id) => {
      const resultado = await AlertDelete();
      if (resultado) {
        const dataDelete = {
          'coD_ESTUDIO': id
        };
        await deleteExternalEntity(dataDelete);
        await loadData();
      }
    }; */
    /*  */
    const edit = async (event, row) => {
      setFields(row);
      levelEducateChild.current.handleOpen();
    };
  
    useEffect(() => {
      loadData();
    }, []);
  
    const columns = [
      /* {
        field: "Acciones",
        type: "actions",
        getActions: (cellValues) => [
          <IconToolTip text="Edit" icon={<EditIcon />} action={(event) => {
            edit(event, cellValues.row);
          }} />,
          <IconToolTip text="Delete" icon={<DeleteIcon />} action={(event) => {
            destroy(event, cellValues.row.coD_ESTUDIO);
          }} />,
        ],
      }, */
      {
        field: "coD_ESTUDIO",
        headerName: "Código",
        width: 200,
      },
      {
        field: "noM_ESTUDIO",
        headerName: "Estudio",
        width: 500,
      },
      {
        field: "inD_ESTADO",
        headerName: "Estado",
        width: 400,
      },
    ];
  
    /* const OpenRegister = () => {
      setFields(defaultfields);
      levelEducateChild.current.handleOpen();
    }; */
  
    /* const saveExternalEntity = async () => {
      const response = await AddOrUpdateExternalEntity(fields)
      if (response.code === 0){
        levelEducateChild.current.handleOpen();
        await loadData();
        levelEducateChild.current.handleClose();
        await AlertSuccess(`${response.message}`)
        setFields(defaultfields)
      } else{
        levelEducateChild.current.handleClose();
        return await AlertError(`${response.message}`)
      }
    }; */

    const downloadExcel = (dataExport) => {
      var Headers = [["INFORMACIÓN DE ESTUDIOS"]];
      let nData = [];
      dataExport.forEach((item) => {
        nData.push({
          Código: item?.coD_ESTUDIO,
          Estudio: item?.noM_ESTUDIO,
          Estado: item?.inD_ESTADO,
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
      XLSX.utils.book_append_sheet(workBook, workSheet, "Estudios");
      XLSX.write(workBook, { bookType: "xlsx", type: "buffer" });
      XLSX.write(workBook, { bookType: "xlsx", type: "binary" });
      XLSX.writeFile(workBook, "ReporteEstudios.xlsx");
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
              "coD_ESTUDIO",
              "noM_ESTUDIO",
              "inD_ESTADO",
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
              <h1>Estudios</h1>
            </div>
          </Stack>
              <DataGridDemo
                id={(row) => row?.coD_ESTUDIO}
                rows={data}
                columns={columns}
                toolbar={CustomToolbar}
                />
            </div>
      </>
    );
  };
  
  export default Studies;
  