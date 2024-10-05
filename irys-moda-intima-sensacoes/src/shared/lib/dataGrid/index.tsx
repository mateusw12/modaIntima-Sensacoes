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
import { MdOutlineDelete, MdOutlineEdit } from "react-icons/md";
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

  const filteredDataSource = props.dataSource.filter((item) =>
    Object.values(item).some(
      (value) =>
        typeof value === "string"
          ? value.toLowerCase().includes(searchTerm.toLowerCase())
          : false
    )
  );

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
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                {props.showActionButtonsColumn && <TableCell>Ações</TableCell>}
                {props.columns.map((col) => (
                  <TableCell key={col.key}>{col.title}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredDataSource.map((row) => (
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
