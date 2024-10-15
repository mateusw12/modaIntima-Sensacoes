import {
  InputLabel,
  Select as MaterialSelect,
  SelectChangeEvent,
} from "@mui/material";
import React from "react";
export interface SelectProps {
  label?: string;
  children: any;
  fullWidth?: boolean;
  value?: string[] | [];
  onChange?: (event: SelectChangeEvent) => void;
  disabled?: boolean;
}

export const Multiselect = (props: SelectProps) => {
  return (
    <>
      <InputLabel id={props.label}>{props.label}</InputLabel>
      <MaterialSelect
        labelId={props.label}
        label={props.label}
        id={props.label}
        multiple
        variant="standard"
        fullWidth={props.fullWidth}
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
