import { IconButton, InputAdornment, TextField } from "@mui/material";
import { InputProps } from "./interface";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import React from "react";

export const Input = (props: InputProps) => {
  return (
    <>
      <TextField
        id={props.label}
        variant="standard"
        type={props.type ?? "text" }

        defaultValue={props.defaultValue}
        label={props.label}
        disabled={props.disabled}
        fullWidth={props.fullWidth}
        style={props.style}
        multiline={props.multiline}
        maxRows={props.maxRows}
        size="small"
        slotProps={{
          input: {
            readOnly: props.readOnly,
            startAdornment: (
              <InputAdornment position={props.iconPosition ?? "start"}>
                {<>{props.icon}</>}
              </InputAdornment>
            ),
          },
        }}
      />
    </>
  );
};

export const PasswordInput = (props: InputProps) => {
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  return (
    <>
      <TextField
        id={props.label}
        variant="standard"
        defaultValue={props.defaultValue}
        label={props.label}
        disabled={props.disabled}
        fullWidth={props.fullWidth}
        style={props.style}
        multiline={props.multiline}
        maxRows={props.maxRows}
        size="small"
        type={showPassword ? "text" : "password"}
        slotProps={{
          input: {
            readOnly: props.readOnly,
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  onMouseUp={handleMouseUpPassword}
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          },
        }}
      />
    </>
  );
};
