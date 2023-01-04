import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { styled } from '@mui/material/styles';
import {
    GridToolbarContainer,
    GridToolbarColumnsButton,
    GridToolbarFilterButton,
    GridToolbarExport,
    GridToolbarDensitySelector,
  } from "@mui/x-data-grid";

const StyledGridOverlay = styled('div')(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    '& .ant-empty-img-1': {
        fill: theme.palette.mode === 'light' ? '#aeb8c2' : '#262626',
    },
    '& .ant-empty-img-2': {
        fill: theme.palette.mode === 'light' ? '#f5f5f7' : '#595959',
    },
    '& .ant-empty-img-3': {
        fill: theme.palette.mode === 'light' ? '#dce0e6' : '#434343',
    },
    '& .ant-empty-img-4': {
        fill: theme.palette.mode === 'light' ? '#fff' : '#1c1c1c',
    },
    '& .ant-empty-img-5': {
        fillOpacity: theme.palette.mode === 'light' ? '0.8' : '0.08',
        fill: theme.palette.mode === 'light' ? '#f5f5f5' : '#fff',
    },
}));

function CustomNoRowsOverlay() {

    return (
        <StyledGridOverlay>
            <svg
                width="120"
                height="100"
                viewBox="0 0 184 152"
                aria-hidden
                focusable="false"
            >
                <g fill="none" fillRule="evenodd">
                    <g transform="translate(24 31.67)">
                        <ellipse
                            className="ant-empty-img-5"
                            cx="67.797"
                            cy="106.89"
                            rx="67.797"
                            ry="12.668"
                        />
                        <path
                            className="ant-empty-img-1"
                            d="M122.034 69.674L98.109 40.229c-1.148-1.386-2.826-2.225-4.593-2.225h-51.44c-1.766 0-3.444.839-4.592 2.225L13.56 69.674v15.383h108.475V69.674z"
                        />
                        <path
                            className="ant-empty-img-2"
                            d="M33.83 0h67.933a4 4 0 0 1 4 4v93.344a4 4 0 0 1-4 4H33.83a4 4 0 0 1-4-4V4a4 4 0 0 1 4-4z"
                        />
                        <path
                            className="ant-empty-img-3"
                            d="M42.678 9.953h50.237a2 2 0 0 1 2 2V36.91a2 2 0 0 1-2 2H42.678a2 2 0 0 1-2-2V11.953a2 2 0 0 1 2-2zM42.94 49.767h49.713a2.262 2.262 0 1 1 0 4.524H42.94a2.262 2.262 0 0 1 0-4.524zM42.94 61.53h49.713a2.262 2.262 0 1 1 0 4.525H42.94a2.262 2.262 0 0 1 0-4.525zM121.813 105.032c-.775 3.071-3.497 5.36-6.735 5.36H20.515c-3.238 0-5.96-2.29-6.734-5.36a7.309 7.309 0 0 1-.222-1.79V69.675h26.318c2.907 0 5.25 2.448 5.25 5.42v.04c0 2.971 2.37 5.37 5.277 5.37h34.785c2.907 0 5.277-2.421 5.277-5.393V75.1c0-2.972 2.343-5.426 5.25-5.426h26.318v33.569c0 .617-.077 1.216-.221 1.789z"
                        />
                    </g>
                    <path
                        className="ant-empty-img-3"
                        d="M149.121 33.292l-6.83 2.65a1 1 0 0 1-1.317-1.23l1.937-6.207c-2.589-2.944-4.109-6.534-4.109-10.408C138.802 8.102 148.92 0 161.402 0 173.881 0 184 8.102 184 18.097c0 9.995-10.118 18.097-22.599 18.097-4.528 0-8.744-1.066-12.28-2.902z"
                    />
                    <g className="ant-empty-img-4" transform="translate(149.65 15.383)">
                        <ellipse cx="20.654" cy="3.167" rx="2.849" ry="2.815" />
                        <path d="M5.698 5.63H0L2.898.704zM9.259.704h4.985V5.63H9.259z" />
                    </g>
                </g>
            </svg>
            <Box sx={{ mt: 1 }}>No hay datos disponibles</Box>
        </StyledGridOverlay>
    );
}

function CustomToolbar() {
    return (
      <GridToolbarContainer>
        <GridToolbarColumnsButton />
        <GridToolbarFilterButton />
        <GridToolbarDensitySelector />
      </GridToolbarContainer>
    );
  }


export default function DataGridDemo(
    {
        toolbar = CustomToolbar,
        rows,
        columns,
        id,
        numberSize = 25,
        height = '70vh',
        checkboxSelection = false,
        seleccionado,
    }
) {

    const tableES = {
        // Root
        noRowsLabel: 'Sin filas',
        noResultsOverlayLabel: 'No se encontre resultados',
        errorOverlayDefaultLabel: 'Ha ocurrido un error.',

        // Density selector toolbar button text
        toolbarDensity: 'Tamaño',
        toolbarDensityLabel: 'Density',
        toolbarDensityCompact: 'Pequeño',
        toolbarDensityStandard: 'Mediano',
        toolbarDensityComfortable: 'Largo',

        // Columns selector toolbar button text
        toolbarColumns: 'Columnas',
        toolbarColumnsLabel: 'Select columns',

        // Filters toolbar button text
        toolbarFilters: 'Filtros',
        toolbarFiltersLabel: 'Show filters',
        toolbarFiltersTooltipHide: 'Hide filters',
        toolbarFiltersTooltipShow: 'Show filters',
        toolbarFiltersTooltipActive: (count) =>
            count !== 1 ? `${count} active filters` : `${count} active filter`,

        // Quick filter toolbar field
        toolbarQuickFilterPlaceholder: 'Search…',
        toolbarQuickFilterLabel: 'Search',
        toolbarQuickFilterDeleteIconLabel: 'Clear',

        // Export selector toolbar button text
        toolbarExport: 'Exportar',
        toolbarExportLabel: 'Export',
        toolbarExportCSV: 'CSV',
        toolbarExportPrint: 'PDF',
        toolbarExportExcel: 'Download as Excel',

        // Columns panel text
        columnsPanelTextFieldLabel: 'Buscar columna',
        columnsPanelTextFieldPlaceholder: 'Nombre',
        columnsPanelDragIconLabel: 'Reorder column',
        columnsPanelShowAllButton: 'Mostrar todos',
        columnsPanelHideAllButton: 'Ocultar todos',

        // Filter panel text
        filterPanelAddFilter: 'Add filter',
        filterPanelDeleteIconLabel: 'Delete',
        filterPanelLinkOperator: 'Logic operator',
        filterPanelOperators: 'Condicion', // TODO v6: rename to filterPanelOperator
        filterPanelOperatorAnd: 'And',
        filterPanelOperatorOr: 'Or',
        filterPanelColumns: 'Columna',
        filterPanelInputLabel: 'Valor',
        filterPanelInputPlaceholder: 'Valor',

        // Filter operators text
        filterOperatorContains: 'contiene',
        filterOperatorEquals: 'igual a ',
        filterOperatorStartsWith: 'comienza con',
        filterOperatorEndsWith: 'termina con',
        filterOperatorIs: 'is',
        filterOperatorNot: 'is not',
        filterOperatorAfter: 'is after',
        filterOperatorOnOrAfter: 'is on or after',
        filterOperatorBefore: 'is before',
        filterOperatorOnOrBefore: 'is on or before',
        filterOperatorIsEmpty: 'si es vacio',
        filterOperatorIsNotEmpty: 'no es vacio',
        filterOperatorIsAnyOf: 'es alguno de',

        // Filter values text
        filterValueAny: 'any',
        filterValueTrue: 'true',
        filterValueFalse: 'false',

        // Column menu text
        columnMenuLabel: 'Menu',
        columnMenuShowColumns: 'Show columns',
        columnMenuFilter: 'Filter',
        columnMenuHideColumn: 'Hide',
        columnMenuUnsort: 'Unsort',
        columnMenuSortAsc: 'Sort by ASC',
        columnMenuSortDesc: 'Sort by DESC',

        // Column header text
        columnHeaderFiltersTooltipActive: (count) =>
            count !== 1 ? `${count} active filters` : `${count} active filter`,
        columnHeaderFiltersLabel: 'Show filters',
        columnHeaderSortIconLabel: 'Sort',

        // Rows selected footer text
        footerRowSelected: (count) =>
            count !== 1
                ? `${count.toLocaleString()} rows selected`
                : `${count.toLocaleString()} row selected`,

        // Total row amount footer text
        footerTotalRows: 'Total Rows:',

        // Total visible row amount footer text
        footerTotalVisibleRows: (visibleCount, totalCount) =>
            `${visibleCount.toLocaleString()} of ${totalCount.toLocaleString()}`,

        // Checkbox selection text
        checkboxSelectionHeaderName: 'Checkbox selection',
        checkboxSelectionSelectAllRows: 'Select all rows',
        checkboxSelectionUnselectAllRows: 'Unselect all rows',
        checkboxSelectionSelectRow: 'Select row',
        checkboxSelectionUnselectRow: 'Unselect row',

        // Boolean cell text
        booleanCellTrueLabel: 'yes',
        booleanCellFalseLabel: 'no',

        // Actions cell more text
        actionsCellMore: 'more',

        // Column pinning text
        pinToLeft: 'Pin to left',
        pinToRight: 'Pin to right',
        unpin: 'Unpin',

        // Tree Data
        treeDataGroupingHeaderName: 'Group',
        treeDataExpand: 'see children',
        treeDataCollapse: 'hide children',

        // Grouping columns
        groupingColumnHeaderName: 'Group',
        groupColumn: (name) => `Group by ${name}`,
        unGroupColumn: (name) => `Stop grouping by ${name}`,

        // Master/detail
        detailPanelToggle: 'Detail panel toggle',
        expandDetailPanel: 'Expand',
        collapseDetailPanel: 'Collapse',

        // Used core components translation keys
        MuiTablePagination: {},

        // Row reordering text
        rowReorderingHeaderName: 'Row reordering',

        // Aggregation
        aggregationMenuItemHeader: 'Aggregation',
        aggregationFunctionLabelSum: 'sum',
        aggregationFunctionLabelAvg: 'avg',
        aggregationFunctionLabelMin: 'min',
        aggregationFunctionLabelMax: 'max',
        aggregationFunctionLabelSize: 'size',
        MuiTablePagination: {
            labelDisplayedRows: ({ from, to, count }) =>
                `${from} - ${to} de ${count}`,
            labelRowsPerPage: 'Mostrar de'
        }
    };

    return (
        <Box sx={{ height: height, width: '100%' }}>
            <DataGrid
                components={{
                    NoRowsOverlay: CustomNoRowsOverlay,
                    Toolbar: toolbar
                }}
                disableColumnMenu
                rows={rows ? rows : []}
                columns={columns}
                disableSelectionOnClick
                getRowId={id}
                initialState={{
                    pagination: {
                        pageSize: numberSize,
                    },
                }}
                localeText={tableES}
                checkboxSelection = {checkboxSelection}
                onSelectionModelChange= {seleccionado}
            />
        </Box>
    );
}
