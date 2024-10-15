import React, { useEffect, useState } from "react";
import { ISocialMedia } from "@/lib/database/models/socialMedia/socialMedia";
import axios from "axios";
import { CancelButton, SaveButton } from "@/shared/button";
import { Col, Form, notification, Row } from "antd";
import { Input } from "@/shared/input";
import Modal from "@/shared/modal";
import { MenuItem } from "@mui/material";
import { RecordType } from "@/config/interface/interface";
import { FaFacebookF, FaInstagram, FaTiktok, FaYoutube } from "react-icons/fa";
import { IconType } from "react-icons";
import { Select } from "@/shared/select";
import DataGrid, { DataGridColumn } from "@/shared/dataGrid";

const fetcher = axios.create({
  baseURL: "/api",
});

interface SocialMediaForm {
  id: string;
  name: string;
  iconName: string;
  path: string;
}

interface GridRow {
  id: string;
  key: any;
  name: string;
  iconName: string;
  path: string;
}

const SocialMedia = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [dataSource, setDataSource] = useState<GridRow[]>([]);
  const [isReload, setIsReload] = useState<boolean>(false);

  const [form] = Form.useForm<SocialMediaForm>();

  const icons: RecordType[] = [
    {
      value: "FaInstagram",
      label: "Instagram",
      icon: FaInstagram as IconType,
    },
    {
      value: "FaFacebookF",
      label: "Facebook",
      icon: FaFacebookF as IconType,
    },
    {
      value: "FaTiktok",
      label: "Tik Tok",
      icon: FaTiktok as IconType,
    },
    {
      value: "FaYoutube",
      label: "You tube",
      icon: FaYoutube as IconType,
    },
  ];

  const columns: DataGridColumn[] = [
    { title: "Código", dataIndex: "id", key: "id", responsive: ["md"] },
    { title: "Nome", dataIndex: "name", key: "name" },
    {
      title: "Ícone",
      dataIndex: "iconName",
      key: "iconName",
      responsive: ["md"],
      render: (iconName) => {
        const IconComponent = icons.find(
          (icon) => icon.value === iconName
        )?.icon;
        return IconComponent ? <IconComponent /> : null;
      },
    },
    { title: "Path", dataIndex: "path", key: "path", responsive: ["md"] },
  ];

  useEffect(() => {
    const loadingData = async () => {
      try {
        const response = await fetcher.get("/socialMedia");
        const data: GridRow[] = [];
        for (const item of response.data as ISocialMedia[]) {
          data.push({
            iconName: item.nomeIcone,
            key: item._id ? item._id.toString() : item.nome,
            name: item.nome,
            path: item.path,
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
      const response = await fetch(`/api/socialMedia`, {
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

  const handleAddSocialMedia = async (formValue: SocialMediaForm) => {
    const redeSocial: ISocialMedia = {
      nome: formValue.name,
      nomeIcone: formValue.iconName,
      path: formValue.path,
      _id: formValue.id,
    };

    if (!formValue.id) {
      await fetch("/api/socialMedia", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(redeSocial),
      });
    } else {
      await fetch(`/api/socialMedia`, {
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
        const response = await fetch(`/api/socialMedia?cod=${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const result = (await response.json()) as ISocialMedia;
        form.setFieldsValue({
          iconName: result.nomeIcone,
          id: result._id,
          name: result.nome,
          path: result.path,
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
          <Row>
            <Col span={12}>
              <Form.Item name="iconName">
                <Select
                  label="Ícone"
                  fullWidth
                  value={form.getFieldValue("iconName")}
                  onChange={(event) =>
                    form.setFieldValue("iconName", event.target.value)
                  }
                >
                  {icons.map((item) => (
                    <MenuItem
                      key={item.value as string}
                      value={item.value as string}
                      style={{ display: "flex", alignItems: "center" }}
                    >
                      {item.icon ? (
                        <item.icon style={{ marginRight: "8px" }} />
                      ) : (
                        <></>
                      )}
                      {item.label}
                    </MenuItem>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col offset={1} span={11}>
              <Form.Item
                name="path"
                rules={[
                  {
                    required: true,
                    message: "Por favor, insira a url da pagina",
                  },
                ]}
              >
                <Input label="Path" fullWidth />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </div>
  );
};

export default SocialMedia;
