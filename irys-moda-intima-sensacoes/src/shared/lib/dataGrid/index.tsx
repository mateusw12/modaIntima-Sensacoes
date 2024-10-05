import { Table, Spin } from "antd";
import { ColumnsType } from "antd/es/table";
import { AddButton } from "../button";
import { IconButton, InputAdornment, TextField } from "@mui/material";
import { MdOutlineDelete, MdOutlineEdit } from "react-icons/md";
import { useState } from "react";
import { Search } from "@mui/icons-material";

export interface DatGridProps {
  columns: ColumnsType<any>;
  dataSource: any[];
  onAddClick?: (id?: string | number) => void;
  onRemoveClick?: (id?: string | number) => void;
  showAddButton?: boolean;
  showSearchButton?: boolean;
  showActionButtonsColumn?: boolean;
  loading?: boolean;
}

const DataGrid = (props: DatGridProps) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredDataSource = props.dataSource.filter((item) =>
    Object.values(item).some((value: any) =>
      typeof value === "string"
        ? value.toString().toLowerCase().includes(searchTerm.toLowerCase())
        : undefined
    )
  );

  const actionColumn = props.showActionButtonsColumn
    ? [
        {
          title: "Ações",
          dataIndex: "actions",
          key: "actions",
          render: (_: any, record: any) => (
            <>
              <IconButton
                color="primary"
                onClick={() => props.onAddClick?.(record.id)}
              >
                <MdOutlineEdit />
              </IconButton>
              <IconButton
                color="error"
                onClick={() => props.onRemoveClick?.(record.id)}
              >
                <MdOutlineDelete />
              </IconButton>
            </>
          ),
        },
      ]
    : [];

  // Ordena os valores corretamente dependendo do tipo da coluna
  const enhancedColumns = props.columns.map((column: any) => ({
    ...column,
    sorter: (a: any, b: any) => {
      const valueA = a[column.dataIndex];
      const valueB = b[column.dataIndex];

      if (typeof valueA === "number" && typeof valueB === "number") {
        return valueA - valueB;
      }
      if (typeof valueA === "string" && typeof valueB === "string") {
        return valueA.localeCompare(valueB);
      }
      return 0;
    },
    filters: Array.isArray(props.dataSource)
      ? Array.from(
          new Set(props.dataSource.map((item) => item[column.dataIndex]))
        ).map((value) => ({ text: value, value }))
      : [],
    onFilter: (value: any, record: any) => record[column.dataIndex] === value,
  }));

  const columnsWithActions = [...actionColumn, ...enhancedColumns];

  return (
    <div style={{ width: "100%" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 20,
        }}
      >
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
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <Search />
                  </InputAdornment>
                ),
              },
            }}
          />
        )}
      </div>

      {props.loading ? (
        <div style={{ display: "flex", justifyContent: "center", padding: 20 }}>
          <Spin size="large" />
        </div>
      ) : (
        <Table
          columns={columnsWithActions}
          dataSource={filteredDataSource}
          style={{ marginTop: 20 }}
          pagination={false}
        />
      )}
    </div>
  );
};

export default DataGrid;
