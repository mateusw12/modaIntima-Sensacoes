import { Checkbox as MaterialCheckbox, FormControlLabel } from "@mui/material";

export interface CheckboxProps {
  defaultChecked?: boolean;
  label: string;
  value?: any;
  disabled?: boolean;
  onChange?: (event: any) => void;
}

const Checkbox = (props: CheckboxProps) => {
  return (
    <>
      <FormControlLabel
        control={
          <MaterialCheckbox
            onChange={props.onChange}
            value={props.value}
            defaultChecked={props.defaultChecked}
          />
        }
        label={props.label}
        disabled={props.disabled}
      />
    </>
  );
};

export default Checkbox;
