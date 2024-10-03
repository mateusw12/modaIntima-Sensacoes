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
    width,
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
          width: width,
          maxHeight: modalSize?.maxHeight,
          overflowY: modalSize?.overflowY as any,
          overflow: modalSize?.overflow,
          minHeight: modalSize?.minHeight,
          paddingRight: modalSize?.overflow ? "10px" : undefined,
        },
      }}
    >
      <div style={{ paddingTop: 20 }}>{children}</div>
    </AntdModal>
  );
};

export default Modal;
