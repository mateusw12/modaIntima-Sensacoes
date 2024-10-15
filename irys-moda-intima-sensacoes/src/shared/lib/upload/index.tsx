import { Button, Typography, Box } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { styled } from "@mui/material/styles";
import { useState } from "react";

export interface UploadProps {
  multiple?: boolean;
  label?: string;
  value?: any;
  onChange?: (event: any) => void;
}

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

export const Upload = (props: UploadProps) => {
  const [fileNames, setFileNames] = useState<string[]>([]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const files = Array.from(event.target.files);
      setFileNames(files.map((file) => file.name));
    }

    if (props.onChange) {
      props.onChange(event);
    }
  };

  return (
    <>
      <Button
        component="label"
        variant="contained"
        tabIndex={-1}
        startIcon={<CloudUploadIcon />}
      >
        {props.label ?? "Anexar Arquivo"}
        <VisuallyHiddenInput
          type="file"
          value={props.value}
          onChange={handleFileChange}
          multiple={props.multiple}
        />
      </Button>

      {fileNames.length > 0 && (
        <Box mt={2}>
          <Typography variant="body2">Arquivos anexados:</Typography>
          <ul>
            {fileNames.map((name, index) => (
              <li key={index}>{name}</li>
            ))}
          </ul>
        </Box>
      )}
    </>
  );
};
