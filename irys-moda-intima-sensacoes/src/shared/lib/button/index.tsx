import { LoadingButton } from "@mui/lab";
import {
  MdCheck,
  MdClose,
  MdDelete,
  MdOutlineAdd,
  MdOutlineRestartAlt,
} from "react-icons/md";
import { ButtonProps } from "./interface";

export const SaveButton = (props: ButtonProps) => {
  return (
    <LoadingButton
      variant="contained"
      color="success"
      size="small"
      onClick={props.onClick}
      loading={props.loading}
      loadingPosition="start"
      startIcon={props.loading ? <MdOutlineRestartAlt /> : <MdCheck />}
    >
      {props.title ?? "Salvar"}
    </LoadingButton>
  );
};

export const DeleteButton = (props: ButtonProps) => {
  return (
    <LoadingButton
      variant="contained"
      color="error"
      size="small"
      onClick={props.onClick}
      loading={props.loading}
      loadingPosition="start"
      startIcon={props.loading ? <MdOutlineRestartAlt /> : <MdDelete />}
    >
      {props.title ?? "Excluir"}
    </LoadingButton>
  );
};

export const CancelButton = (props: ButtonProps) => {
  return (
    <LoadingButton
      variant="contained"
      color="error"
      size="small"
      onClick={props.onClick}
      loading={props.loading}
      loadingPosition="start"
      startIcon={props.loading ? <MdOutlineRestartAlt /> : <MdClose />}
    >
      {props.title ?? "Cancelar"}
    </LoadingButton>
  );
};

export const AddButton = (props: ButtonProps) => {
  return (
    <LoadingButton
      variant="contained"
      color="primary"
      size="small"
      onClick={props.onClick}
      loading={props.loading}
      loadingPosition="start"
      startIcon={props.loading ? <MdOutlineRestartAlt /> : <MdOutlineAdd />}
    >
      {props.title ?? "Adicionar"}
    </LoadingButton>
  );
};

