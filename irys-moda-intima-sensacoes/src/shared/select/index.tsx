import React from "react";
import { InputLabel, Select as MaterialSelect, SelectChangeEvent } from "@mui/material";
export interface SelectProps {
  label?: string;
  children: any;
  fullWidth?: boolean;
  value?: any;
  onChange?: (event: SelectChangeEvent) => void;
  disabled?: boolean;
}

export const Select = (props: SelectProps) => {
  return (
    <>
      <InputLabel id={props.label}>{props.label}</InputLabel>
      <MaterialSelect
        label={props.label}
        id={props.label}
        placeholder={props.label}
        variant="standard"
        fullWidth={props.fullWidth}
        value={props.value}
        onChange={props.onChange}
        disabled={props.disabled}
        sx={{
          padding: "6px 14px",
          height: "45px",
          display: "flex",
          alignItems: "center",
        }}
      >
        {props.children}
      </MaterialSelect>
    </>
  );
};
