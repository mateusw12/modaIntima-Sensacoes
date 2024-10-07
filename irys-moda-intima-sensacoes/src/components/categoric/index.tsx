import { ICategoric } from "@/lib/database/models/categoric/categoric";
import { CancelButton, SaveButton } from "@/shared/lib/button";
import DataGrid, { DataGridColumn } from "@/shared/lib/dataGrid";
import { Input } from "@/shared/lib/input";
import Modal from "@/shared/lib/modal";
import { Col, Form, notification, Row } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";

const fetcher = axios.create({
  baseURL: "/api",
});

interface CategoricForm {
  id: string;
  name: string;
}

interface GridRow {
  id: string;
  key: any;
  name: string;
}

const Categoric = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [dataSource, setDataSource] = useState<GridRow[]>([]);
  const [isReload, setIsReload] = useState<boolean>(false);

  const [form] = Form.useForm<CategoricForm>();

  const columns: DataGridColumn[] = [
    { title: "Código", dataIndex: "id", key: "id" },
    { title: "Nome", dataIndex: "name", key: "name" },
  ];

  useEffect(() => {
    const loadingData = async () => {
      try {
        const response = await fetcher.get("/categoric");
        const data: GridRow[] = [];
        for (const item of response.data as ICategoric[]) {
          data.push({
            key: item._id ? item._id.toString() : item.nome,
            name: item.nome,
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

  const handleRemoveSocialMedia = async (id: string) => {
    try {
      const response = await fetch(`/api/categoric`, {
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

  const handleAddSocialMedia = async (formValue: CategoricForm) => {
    const categoric: ICategoric = {
      nome: formValue.name,
      _id: formValue.id,
    };

    if (!formValue.id) {
      await fetch("/api/categoric", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(categoric),
      });
    } else {
      await fetch(`/api/socialMedia`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(categoric),
      });
      categoric;
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
        const response = await fetch(`/api/categoric?cod=${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const result = (await response.json()) as ICategoric;
        form.setFieldsValue({
          id: result._id,
          name: result.nome,
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
    <>
      <div style={{ width: "max-content" }}>
        <DataGrid
          columns={columns}
          dataSource={dataSource}
          showAddButton={true}
          onAddClick={(id) => loadingModal(id as string | undefined)}
          showActionButtonsColumn
          onRemoveClick={(id) => handleRemoveSocialMedia(id as string)}
          showSearchButton
        />

        <Modal
          title="Cadastro de Rede Social"
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
          <Form form={form} onFinish={handleAddSocialMedia} layout="horizontal">
            <Row>
              <Col span={4}>
                <Form.Item name="id">
                  <Input label="ID" disabled={true} />
                </Form.Item>
              </Col>
              <Col span={19} offset={1}>
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
            </Row>
          </Form>
        </Modal>
      </div>
    </>
  );
};

export default Categoric;
