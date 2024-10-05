import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  InputAdornment,
  TextField,
  Paper,
  CircularProgress,
} from "@mui/material";
import { AddButton } from "../button";
import {
  MdArrowDownward,
  MdArrowUpward,
  MdOutlineDelete,
  MdOutlineEdit,
} from "react-icons/md";
import { Search } from "@mui/icons-material";
import { ReactNode, useState } from "react";
import styles from "@/styles/sharedComponents.module.css";

export interface DataGridColumn {
  title: string;
  dataIndex: any;
  key: string;
  responsive?: string[];
  render?: (value: any, record: any) => ReactNode;
}

export interface DataGridProps {
  columns: DataGridColumn[];
  dataSource: Record<string, any>[];
  onAddClick?: (id?: string | number) => void;
  onRemoveClick?: (id?: string | number) => void;
  showAddButton?: boolean;
  showSearchButton?: boolean;
  showActionButtonsColumn?: boolean;
  loading?: boolean;
}

const DataGrid = (props: DataGridProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc" | null>(
    null
  );
  const [sortColumn, setSortColumn] = useState<string | null>(null);

  const filteredDataSource = props.dataSource.filter((item) =>
    Object.values(item).some((value) =>
      typeof value === "string"
        ? value.toLowerCase().includes(searchTerm.toLowerCase())
        : false
    )
  );

  const sortedDataSource = [...filteredDataSource].sort((a, b) => {
    if (!sortColumn) return 0;

    const aValue = a[sortColumn];
    const bValue = b[sortColumn];

    if (aValue < bValue) return sortDirection === "asc" ? -1 : 1;
    if (aValue > bValue) return sortDirection === "asc" ? 1 : -1;
    return 0;
  });

  const handleSort = (columnKey: string) => {
    const newSortDirection = sortDirection === "asc" ? "desc" : "asc";
    setSortDirection(newSortDirection);
    setSortColumn(columnKey);
  };

  return (
    <div className={styles.dataGridContainer}>
      <div className={styles.dataGridToolbar}>
        {props.showAddButton && (
          <AddButton onClick={() => props.onAddClick?.()} />
        )}
        {props.showSearchButton && (
          <TextField
            variant="standard"
            size="small"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Pesquise aqui..."
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
            }}
          />
        )}
      </div>

      {props.loading ? (
        <div style={{ display: "flex", justifyContent: "center", padding: 20 }}>
          <CircularProgress />
          <span style={{ marginLeft: 10 }}>Carregando...</span>
        </div>
      ) : (
        <TableContainer component={Paper} style={{ maxWidth: "100vw" }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {props.showActionButtonsColumn && <TableCell>Ações</TableCell>}
                {props.columns.map((col) => (
                  <TableCell key={col.key} onClick={() => handleSort(col.key)}>
                    {col.title}
                    {sortColumn === col.key &&
                      (sortDirection === "asc" ? <MdArrowUpward /> : <MdArrowDownward />)}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {sortedDataSource.map((row) => (
                <TableRow key={row.key}>
                  {props.showActionButtonsColumn && (
                    <TableCell>
                      <IconButton
                        color="primary"
                        onClick={() => props.onAddClick?.(row.id)}
                      >
                        <MdOutlineEdit />
                      </IconButton>
                      <IconButton
                        color="error"
                        onClick={() => props.onRemoveClick?.(row.id)}
                      >
                        <MdOutlineDelete />
                      </IconButton>
                    </TableCell>
                  )}
                  {props.columns.map((col) => (
                    <TableCell key={col.key}>{row[col.dataIndex]}</TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
};

export default DataGrid;
