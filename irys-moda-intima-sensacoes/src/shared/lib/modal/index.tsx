import React, { useRef, useState, useEffect } from "react";
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

  const [disabled, setDisabled] = useState(true);
  const [bounds, setBounds] = useState({
    left: 0,
    top: 0,
    bottom: 0,
    right: 0,
  });

  const draggleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open && draggleRef.current) {
      draggleRef.current.style.transform = "translate(0, 0)";
      draggleRef.current.style.top = "0";
      draggleRef.current.style.left = "0";
      draggleRef.current.style.bottom = "0";
      draggleRef.current.style.right = "0";
    }
    setBounds({
      left: 0,
      top: 0,
      bottom: 0,
      right: 0,
    });
  }, [open]);

  return (
    <AntdModal
      title={
        <div
          style={{ width: "100%", cursor: "move" }}
          onMouseOver={() => setDisabled(false)}
          onMouseOut={() => setDisabled(true)}
        >
          <span style={{ fontWeight: "bolder" }}>{title}</span>
        </div>
      }
      maskClosable={!maskClosable}
      open={open}
      onOk={onOk}
      onCancel={onCancel}
      footer={footer}
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
      {children}
    </AntdModal>
  );
};

export default Modal;
