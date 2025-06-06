"use client"

import { useState, useEffect, useMemo } from "react"
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  flexRender,
} from "@tanstack/react-table"

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  TablePagination,
  TableSortLabel,
  Checkbox,
  Box,
  CircularProgress,
  ButtonGroup,
  Button,
} from "@mui/material"

const DataTable = ({ data, columns, enableCheckbox = false, onSelectionChange, loading, nameColumnId = "name" ,alphabets}) => {
  const [globalFilter, setGlobalFilter] = useState("")
  const [activeAlphabet, setActiveAlphabet] = useState("")
  const [sorting, setSorting] = useState([])
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  })
  const [rowSelection, setRowSelection] = useState({})
  const [filteredData, setFilteredData] = useState(data)

  // Apply alphabetical filter whenever activeAlphabet changes or data changes
  useEffect(() => {
    if (!activeAlphabet) {
      setFilteredData(data)
    } else {
      // Find the name column to filter on
      const nameColumn = columns.find((col) => col.id === nameColumnId || col.accessorKey === nameColumnId)

      if (nameColumn) {
        const filtered = data.filter((row) => {
          let nameValue

          // Handle different ways to access the name value
          if (nameColumn.accessorFn) {
            nameValue = nameColumn.accessorFn(row)
          } else if (nameColumn.accessorKey) {
            nameValue = row[nameColumn.accessorKey]
          } else {
            // Default to first_name + last_name if available
            nameValue = row.first_name && row.last_name ? `${row.first_name} ${row.last_name}` : row.name || ""
          }

          return nameValue.toString().toUpperCase().startsWith(activeAlphabet)
        })

        setFilteredData(filtered)
      } else {
        setFilteredData(data)
      }
    }

    // Reset to first page when changing filters
    setPagination((prev) => ({ ...prev, pageIndex: 0 }))
  }, [activeAlphabet, data, columns, nameColumnId])

  // Notify parent component when selection changes
  useEffect(() => {
    if (enableCheckbox && onSelectionChange) {
      const selectedRows = Object.keys(rowSelection).map((index) => filteredData[Number(index)])
      onSelectionChange(selectedRows)
    }
  }, [rowSelection, filteredData, enableCheckbox, onSelectionChange])

  // Checkbox column
  const checkboxColumn = useMemo(
    () => ({
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={table.getIsAllRowsSelected()}
          indeterminate={table.getIsSomeRowsSelected()}
          onChange={table.getToggleAllRowsSelectedHandler()}
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onChange={row.getToggleSelectedHandler()}
          onClick={(e) => e.stopPropagation()}
        />
      ),
      size: 40,
    }),
    [],
  )

  const tableColumns = useMemo(() => {
    return enableCheckbox ? [checkboxColumn, ...columns] : columns
  }, [columns, enableCheckbox, checkboxColumn])

  // Global filter function for all visible columns
  const globalFilterFn = (row, columnId, filterValue) => {
    return row
      .getVisibleCells()
      .some((cell) => String(cell.getValue()).toLowerCase().includes(filterValue.toLowerCase()))
  }

  const table = useReactTable({
    data: filteredData, // Use the filtered data instead of the original data
    columns: tableColumns,
    state: {
      globalFilter,
      sorting,
      pagination,
      rowSelection,
    },
    enableRowSelection: enableCheckbox,
    onRowSelectionChange: setRowSelection,
    onGlobalFilterChange: setGlobalFilter,
    onSortingChange: setSorting,
    onPaginationChange: setPagination,
    globalFilterFn,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
  })

  const filterByAlphabet = (letter) => {
    if (letter === activeAlphabet) {
      setActiveAlphabet("")
    } else {
      setActiveAlphabet(letter)
    }
  }

  return (
    <div>
      <Paper sx={{ boxShadow: "none", backgroundColor: "transparent" }}>
        <TextField
          value={globalFilter ?? ""}
          size="small"
          onChange={(e) => setGlobalFilter(e.target.value)}
          placeholder="Search all columns..."
          variant="outlined"
          sx={{
            borderRadius: "12px",
            mb: 4,
            ".MuiOutlinedInput-root": {
              border: "2px solid #e0e0e0",
              borderRadius: "12px",
              "& fieldset": { border: "none" },
              "&:hover": {
                border: "2px solid #0076bf",
              },
              "&.Mui-focused": {
                border: "2px solid #0076bf",
                "& fieldset": { border: "none" },
              },
            },
          }}
        />
        {alphabets && <Box
          sx={{
            mb: 2,
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            alignItems: { xs: "flex-start", sm: "center" },
            gap: 1,
          }}
        >
          <ButtonGroup variant="outlined" size="small" sx={{ flexWrap: "wrap" }}>
            {Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i)).map((letter) => (
              <Button
                key={letter}
                onClick={() => filterByAlphabet(letter)}
                sx={{
                  minWidth: "30px",
                  px: 1,
                  backgroundColor: activeAlphabet === letter ? "#0076bf" : "transparent",
                  color: activeAlphabet === letter ? "white" : "inherit",
                  "&:hover": {
                    backgroundColor: activeAlphabet === letter ? "#0076bf" : "rgba(0, 118, 191, 0.1)",
                  },
                }}
              >
                {letter}
              </Button>
            ))}
          </ButtonGroup>
         
        </Box>}

        <TableContainer sx={{ maxHeight: 440, overflowX: "auto" }}>
          <Table stickyHeader>
            <TableHead>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header, index) => (
                    <TableCell
                      key={header.id}
                      align="left"
                      sortDirection={header.column.getIsSorted() || false}
                      sx={{
                        minWidth: header.column.columnDef.id === "select" ? "60px" : "150px",
                        whiteSpace: "nowrap",
                        borderTopLeftRadius: index === 0 ? "8px" : 0,
                        borderTopRightRadius: index === headerGroup.headers.length - 1 ? "8px" : 0,
                      }}
                    >
                      {header.isPlaceholder ? null : header.column.columnDef.id === "select" ? (
                        flexRender(header.column.columnDef.header, header.getContext())
                      ) : (
                        <TableSortLabel
                          active={!!header.column.getIsSorted()}
                          direction={header.column.getIsSorted() || "asc"}
                          onClick={header.column.getToggleSortingHandler()}
                        >
                          {flexRender(header.column.columnDef.header, header.getContext())}
                        </TableSortLabel>
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableHead>

            <TableBody>
              {table.getRowModel().rows.length > 0 ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    hover={enableCheckbox}
                    onClick={enableCheckbox ? () => row.toggleSelected() : undefined}
                    selected={row.getIsSelected()}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell
                        key={cell.id}
                        sx={{
                          minWidth: cell.column.columnDef.id === "select" ? "60px" : "150px",
                          wordBreak: "break-word",
                        }}
                      >
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={table.getAllColumns().length}>
                    <Box py={3} textAlign="center">
                      {!loading ? (
                        <strong style={{ fontSize: "18px" }}>No Data Found</strong>
                      ) : (
                        <CircularProgress sx={{ color: "#0b0962" }} size={50} />
                      )}
                    </Box>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>

        {table.getFilteredRowModel().rows.length > 0 && (
          <TablePagination
            rowsPerPageOptions={[10, 25, 50]}
            component="div"
            count={table.getFilteredRowModel().rows.length}
            rowsPerPage={table.getState().pagination.pageSize}
            page={table.getState().pagination.pageIndex}
            onPageChange={(_, newPage) => {
              table.setPageIndex(newPage)
            }}
            onRowsPerPageChange={(e) => {
              const size = e.target.value ? Number(e.target.value) : 10
              table.setPageSize(size)
            }}
          />
        )}
      </Paper>
    </div>
  )
}

export default DataTable
