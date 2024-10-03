import { Select as MaterialSelect } from "@mui/material";
export interface SelectProps {
  label?: string;
  children: any;
  fullWidth?: boolean;
}

export const Select = (props: SelectProps) => {
  return (
    <>
      <MaterialSelect
        label={props.label}
        variant="standard"
        fullWidth={props.fullWidth}
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
