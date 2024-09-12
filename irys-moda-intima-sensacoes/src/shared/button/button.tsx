import { LoadingButton } from "@mui/lab";
import { MdCheck, MdOutlineRestartAlt } from "react-icons/md";
import { ButtonProps } from "./interface";

export const SaveButton = (props: ButtonProps) => {
  return (
    <LoadingButton
      variant="contained"
      color="success"
      size="small"
      loading={props.loading}
      loadingPosition="start"
      startIcon={props.loading ? <MdOutlineRestartAlt /> : <MdCheck />}
    >
      {props.title ?? "Salvar"}
    </LoadingButton>
  );
};
