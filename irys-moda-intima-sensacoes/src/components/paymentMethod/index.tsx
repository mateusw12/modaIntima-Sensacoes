import { IPaymentMethod } from "@/lib/database/models/paymentMethod/paymentMethod";
import { CancelButton, SaveButton } from "@/shared/button";
import Checkbox from "@/shared/checkbox";
import DataGrid, { DataGridColumn } from "@/shared/dataGrid";
import { Input } from "@/shared/input";
import Modal from "@/shared/modal";
import { Col, Form, notification, Row } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";

const fetcher = axios.create({
  baseURL: "/api",
});

interface PaymentMethodForm {
  id: string;
  name: string;
  active: boolean;
}

interface GridRow {
  id: string;
  key: any;
  name: string;
  active: boolean;
}

const PaymentMethod = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [dataSource, setDataSource] = useState<GridRow[]>([]);
  const [isReload, setIsReload] = useState<boolean>(false);

  const [form] = Form.useForm<PaymentMethodForm>();

  const columns: DataGridColumn[] = [
    { title: "Código", dataIndex: "id", key: "id" },
    { title: "Nome", dataIndex: "name", key: "name" },
    { title: "Ativo", dataIndex: "active", key: "active" },
  ];

  useEffect(() => {
    const loadingData = async () => {
      try {
        const response = await fetcher.get("/paymentMethods");
        const data: GridRow[] = [];
        for (const item of response.data as IPaymentMethod[]) {
          data.push({
            key: item._id ? item._id.toString() : item.nome,
            name: item.nome,
            active: item.ativo,
            id: item._id ? item._id.toString() : item.nome,
          });
        }
        setDataSource(data);
      } catch (error) {
        notification.error({
          message: "Erro ao carregar os dados!",
        });
      }
    };

    loadingData();
  }, [isReload]);

  const handleRemovePaymentMethod = async (id: string) => {
    try {
      const response = await fetch(`/api/paymentMethods`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: id }),
      });

      if (response.ok) {
        notification.success({
          message: "Removido com sucesso!",
        });
        setIsReload(!isReload);
      } else {
        throw new Error("Erro ao deletar a rede social");
      }
    } catch (error) {
      console.error(error);
      notification.error({ message: "Erro ao remover o item!" });
    }
  };

  const handleAddPaymentMethod = async (formValue: PaymentMethodForm) => {
    const redeSocial: IPaymentMethod = {
      nome: formValue.name,
      ativo: formValue.active,
      _id: formValue.id,
    };

    if (!formValue.id) {
      await fetch("/api/paymentMethods", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(redeSocial),
      });
    } else {
      await fetch(`/api/paymentMethods`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(redeSocial),
      });
    }

    form.resetFields();
    notification.success({
      message: "Salvo com sucesso!",
    });
    setIsReload(!isReload);
  };

  const loadingModal = async (id?: string) => {
    if (id) {
      try {
        const response = await fetch(`/api/paymentMethods?cod=${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const result = (await response.json()) as IPaymentMethod;
        form.setFieldsValue({
          id: result._id,
          name: result.nome,
          active: result.ativo,
        });
        setIsModalOpen(true);
      } catch (error) {
        console.log(error);
        notification.error({
          message: "Não foi possível encontrar o item!",
        });
      }
    } else {
      setIsModalOpen(true);
    }
  };

  return (
    <div style={{ width: "max-content" }}>
      <DataGrid
        columns={columns}
        dataSource={dataSource}
        showAddButton={true}
        onAddClick={(id) => loadingModal(id as string | undefined)}
        showActionButtonsColumn
        onRemoveClick={(id) => handleRemovePaymentMethod(id as string)}
        showSearchButton
      />
      <Modal
        title="Cadastro de Método de Pagamento"
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        width={600}
        footer={[
          <CancelButton
            key={"cancel"}
            onClick={() => {
              form.resetFields();
              setIsModalOpen(false);
            }}
          />,
          <SaveButton key={"save"} onClick={() => form.submit()} />,
        ]}
      >
        <Form form={form} onFinish={handleAddPaymentMethod} layout="horizontal">
          <Row>
            <Col span={4}>
              <Form.Item name="id">
                <Input label="ID" disabled={true} />
              </Form.Item>
            </Col>
            <Col span={14} offset={1}>
              <Form.Item
                name="name"
                rules={[
                  {
                    required: true,
                    message: "Por favor, insira o nome",
                  },
                ]}
              >
                <Input fullWidth label="Nome" />
              </Form.Item>
            </Col>
            <Col span={4} offset={1}>
              <Form.Item name="active">
                <Checkbox
                  label="Ativo"
                  value={form.getFieldValue("active")}
                  onChange={(event) =>
                    form.setFieldValue("active", event.target.checked)
                  }
                />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </div>
  );
};
export default PaymentMethod;
