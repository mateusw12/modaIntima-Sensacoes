import { LoadingButton } from "@mui/lab";
import {
  MdCheck,
  MdClose,
  MdDelete,
  MdOutlineAdd,
  MdOutlineEdit,
  MdOutlineRestartAlt,
  MdOutlineSearch,
} from "react-icons/md";

export interface ButtonProps {
  title?: string;
  loading?: boolean;
  size?: "small" | "large" | "medium";
  onClick: () => void;
  onlyIcon?: boolean;
}

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
      {props.onlyIcon ? <></> : <> {props.title ?? "Salvar"}</>}
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
      {props.onlyIcon ? <></> : <> {props.title ?? "Excluir"}</>}
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
      {props.onlyIcon ? <></> : <> {props.title ?? "Cancelar"}</>}
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
      <div style={{ display: "flex", alignItems: "center" }}>
        {props.onlyIcon ? <></> : <>{props.title ?? "Adicionar"}</>}
      </div>
    </LoadingButton>
  );
};

export const EditButton = (props: ButtonProps) => {
  return (
    <LoadingButton
      variant="contained"
      color="primary"
      size="small"
      onClick={props.onClick}
      loading={props.loading}
      loadingPosition="start"
      startIcon={props.loading ? <MdOutlineRestartAlt /> : <MdOutlineEdit />}
    >
      {props.onlyIcon ? <></> : <> {props.title ?? "Editar"}</>}
    </LoadingButton>
  );
};
