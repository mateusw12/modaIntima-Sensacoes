import { Select as MaterialSelect } from "@mui/material";
export interface SelectProps {
  label?: string;
  children: any;
  fullWidth?: boolean;
  value?: any;
  onChange?: (event: any) => void;
}

export const Select = (props: SelectProps) => {
  return (
    <>
      <MaterialSelect
        label={props.label}
        variant="standard"
        fullWidth={props.fullWidth}
        value={props.value}
        onChange={props.onChange}
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
