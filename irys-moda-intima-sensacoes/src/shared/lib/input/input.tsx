import { IconButton, InputAdornment, TextField } from "@mui/material";
import { InputProps } from "./interface";
import { Search, Visibility, VisibilityOff } from "@mui/icons-material";
import React from "react";

export const Input = (props: InputProps) => {
  return (
    <>
      <TextField
        id={props.label}
        variant="standard"
        type={props.type ?? "text"}
        onChange={props.onChange}
        value={props.value}
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
        value={props.value}
        onChange={props.onChange}
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

export const InputSearch = (props: InputProps) => {
  return (
    <>
      <TextField
        id={props.label}
        variant="outlined"
        placeholder={props.label}
        size="small"
        className={props.class}
        value={props.value}
        onChange={props.onChange}
        defaultValue={props.defaultValue}
        disabled={props.disabled}
        fullWidth={props.fullWidth}
        style={props.style}
        multiline={props.multiline}
        maxRows={props.maxRows}
        sx={{
          input: { color: "white" }, // Cor do texto dentro do campo
          "& label": {
            color: "white", // Cor da label
          },
          "& label.Mui-focused": {
            color: "white", // Cor da label quando o campo está focado
          },
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: "white", // Cor da borda
            },
            "&:hover fieldset": {
              borderColor: "white", // Cor da borda ao passar o mouse
            },
            "&.Mui-focused fieldset": {
              borderColor: "white", // Cor da borda quando focado
            },
          },
          "& .MuiInputAdornment-root svg": {
            color: "white", // Cor do ícone de busca
          },
        }}
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
    </>
  );
};
