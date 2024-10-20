import React from "react";
import { Modal as AntdModal } from "antd";

const Modal = (props: {
  open: boolean;
  title: string;
  width?: number | string;
  maskClosable?: boolean;
  onOk?: () => void;
  onCancel: () => void;
  modalSize?: {
    maxHeight?: string;
    overflowY?: string;
    minHeight?: string;
    overflow?: string;
    minWidth?: string;
    maxWidth?: string;
  };
  children: React.ReactNode;
  footer: React.ReactNode;
}) => {
  const {
    open,
    children,
    onOk,
    onCancel,
    modalSize,
    footer,
    title,
    width = "80vw",
    maskClosable,
  } = props;

  return (
    <AntdModal
      title={<span style={{ fontWeight: "bolder" }}>{title}</span>}
      maskClosable={!maskClosable}
      open={open}
      onOk={onOk}
      onCancel={onCancel}
      footer={
        <div style={{ display: "flex", justifyContent: "flex-end", gap: 10 }}>
          {footer}
        </div>
      }
      width={width}
      style={{ display: "flex", justifyContent: "center" }}
      styles={{
        body: {
          maxHeight: modalSize?.maxHeight || "50vh",
          overflowY: "auto",
          overflow: modalSize?.overflow,
          minHeight: modalSize?.minHeight || "100px",
          paddingRight: modalSize?.overflow ? "10px" : undefined,
          minWidth: modalSize?.minWidth || "80vw",
          maxWidth: modalSize?.maxWidth || "80vw"
        },
      }}
    >
      <div style={{ paddingTop: 20 }}>{children}</div>
    </AntdModal>
  );
};

export default Modal;
