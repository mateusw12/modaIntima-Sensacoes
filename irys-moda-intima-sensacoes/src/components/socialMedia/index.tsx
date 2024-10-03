import React, { useEffect, useState } from "react";
import { ISocialMedia } from "@/lib/database/models/socialMedia/socialMedia";
import axios from "axios";
import {
  AddButton,
  CancelButton,
  SaveButton,
} from "@/shared/lib/button";
import { Col, Form, Row, Table } from "antd";
import { ColumnsType } from "antd/es/table";
import { Input } from "@/shared/lib/input";
import Modal from "@/shared/lib/modal";
import { MenuItem } from "@mui/material";
import { RecordType } from "@/config/interface/interface";
import { FaFacebookF, FaInstagram, FaTiktok, FaYoutube } from "react-icons/fa";
import { IconType } from "react-icons";
import { Select } from "@/shared/lib/select";

const fetcher = axios.create({
  baseURL: "/api",
});

interface SocialMediaForm {
  id: string;
  name: string;
  iconName: string;
  path: string;
}

interface DataGrid {
  key: string;
  name: string;
  iconName: string;
  path: string;
}

const SocialMedia = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [dataSource, setDataSource] = useState<DataGrid[]>([]);
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

  useEffect(() => {
    const loadingData = async () => {
      try {
        const response = await fetcher.get("/socialMedia");
        const data: DataGrid[] = [];
        for (const item of response.data as ISocialMedia[]) {
          data.push({
            iconName: item.nomeIcone,
            key: item._id?.toString() ?? item.nome,
            name: item.nome,
            path: item.path,
          });
        }
        setDataSource(data);
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      }
    };

    loadingData();
  }, []);

  const handleAddProduct = (values: SocialMediaForm) => {
    console.log("values", values);
  };

  const columns: ColumnsType<DataGrid> = [
    { title: "Nome", dataIndex: "name", key: "name" },
    { title: "Ícone", dataIndex: "iconName", key: "iconName" },
    { title: "Path", dataIndex: "path", key: "path" },
  ];

  return (
    <div>
      <AddButton onClick={() => setIsModalOpen(true)} />
      <Table
        columns={columns}
        dataSource={dataSource}
        style={{ marginTop: 20 }}
      />

      <Modal
        title="Cadastro de Rede Social"
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={[
          <CancelButton
            onClick={() => {
              form.resetFields();
              setIsModalOpen(false);
            }}
          />,
          <SaveButton onClick={() => form.submit()} />,
        ]}
      >
        <Form form={form} onFinish={handleAddProduct} layout="horizontal">
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
                    message: "Por favor, insira o nome do produto",
                  },
                ]}
              >
                <Input fullWidth label="Nome" />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <Form.Item
                name="iconName"
                rules={[
                  {
                    required: true,
                    message: "Por favor, insira o ícone",
                  },
                ]}
              >
                <Select label="Ícone" fullWidth>
                  {icons.map((item) => (
                    <MenuItem
                      key={item.value}
                      value={item.value}
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
