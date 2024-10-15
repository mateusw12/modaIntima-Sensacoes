import { CSSProperties } from "react";

export interface InputProps {
  label?: string;
  onChange?: (
    value: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  value?: any;
  defaultValue?: any;
  disabled?: boolean;
  readOnly?: boolean;
  fullWidth?: boolean;
  style?: CSSProperties;
  multiline?: boolean;
  maxRows?: number;
  icon?: any;
  iconPosition?: "start" | "end";
  type?: "text" | "color" | "email" | "date" | "number";
  class?: any;
  placeholder?: string;
}
