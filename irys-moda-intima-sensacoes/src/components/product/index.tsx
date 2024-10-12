import { SIZE_ITEMS } from "@/config/constant/constant";
import { RecordType } from "@/config/interface/interface";
import { ICategoric } from "@/lib/database/models/categoric/categoric";
import { IProduct } from "@/lib/database/models/product/product";
import { CancelButton, SaveButton } from "@/shared/lib/button";
import DataGrid, { DataGridColumn } from "@/shared/lib/dataGrid";
import { Input } from "@/shared/lib/input";
import Modal from "@/shared/lib/modal";
import { Select } from "@/shared/lib/select";
import { convertToBase64 } from "@/util/convertBase64";
import { MenuItem } from "@mui/material";
import { Col, Form, notification, Row } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";

const fetcher = axios.create({
  baseURL: "/api",
});

interface ProductForm {
  id: string;
  name: string;
  description: string;
  color: string;
  price: number;
  registrationDate: Date;
  codCategoria: any;
  size: string[];
  image: { name: string; byte: string }[];
}

interface GridRow {
  id: string;
  key: any;
  name: string;
  price: number;
  categoric: string;
  size: string;
}

const Product = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [dataSource, setDataSource] = useState<GridRow[]>([]);
  const [isReload, setIsReload] = useState<boolean>(false);
  const [categories, setCategories] = useState<RecordType[]>([]);
  const [fileList, setFileList] = useState<{ name: string; byte: string }[]>([]); // Estado para armazenar arquivos

  const [form] = Form.useForm<ProductForm>();

  const columns: DataGridColumn[] = [
    { title: "Código", dataIndex: "id", key: "id" },
    { title: "Nome", dataIndex: "name", key: "name" },
    { title: "Categoria", dataIndex: "categoric", key: "categoric" },
    { title: "Tamanho", dataIndex: "size", key: "size" },
    { title: "Preço", dataIndex: "price", key: "price" },
  ];

  useEffect(() => {
    const loadingData = async () => {
      try {
        const response = await fetcher.get("/product");
        const categories = await fetcher.get("/categoric");
        setCategories(
          (categories.data as ICategoric[]).map((el) => {
            return { label: el.nome, value: el._id };
          })
        );
        const data: GridRow[] = [];
        for (const item of response.data as IProduct[]) {
          data.push({
            key: item._id ? item._id.toString() : item.nome,
            name: item.nome,
            id: item._id ? item._id.toString() : item.nome,
            categoric: item.codCategoria,
            price: item.preco,
            size: item.tamanho.map((el) => el.toString()).join(","),
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

  const handleRemoveProduct = async (id: string) => {
    try {
      const response = await fetch(`/api/product`, {
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
        throw new Error("Erro ao deletar o produto");
      }
    } catch (error) {
      console.error(error);
      notification.error({ message: "Erro ao remover o item!" });
    }
  };

  const handleAddProduct = async (formValue: ProductForm) => {
    const product: IProduct = {
      nome: formValue.name,
      _id: formValue.id,
      codCategoria: formValue.codCategoria,
      cor: formValue.color,
      dataCadastro: new Date(),
      descricao: formValue.description,
      preco: formValue.price,
      tamanho: formValue.size,
    };

    if (!formValue.id) {
      await fetch("/api/product", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(product),
      });
    } else {
      await fetch(`/api/product`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(product),
      });
      product;
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
        const response = await fetch(`/api/product?cod=${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const result = (await response.json()) as IProduct;
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

  // Função para converter arquivos para base64
  const handleFileUpload = async (files: FileList) => {
    const filesArray: { name: string; byte: string }[] = [];
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const byteArray = await convertToBase64(file);
      filesArray.push({ name: file.name, byte: byteArray });
    }
    setFileList(filesArray);
    form.setFieldValue("image", filesArray); // Define no form os arquivos em base64
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
          onRemoveClick={(id) => handleRemoveProduct(id as string)}
          showSearchButton
        />

        <Modal
          title="Cadastro de Produto"
          open={isModalOpen}
          onCancel={() => setIsModalOpen(false)}
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
                      message: "Por favor, insira o nome",
                    },
                  ]}
                >
                  <Input fullWidth label="Nome" />
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <Form.Item name="description">
                  <Input label="Descrição" fullWidth maxRows={2} multiline />
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={12}>
                <Form.Item name="codCategoria">
                  <Select
                    label="Categoria"
                    fullWidth
                    value={form.getFieldValue("codCategoria")}
                    onChange={(event) =>
                      form.setFieldValue("codCategoria", event.target.value)
                    }
                  >
                    {categories.map((item) => (
                      <MenuItem
                        key={item.value as string}
                        value={item.value as string}
                        style={{ display: "flex", alignItems: "center" }}
                      >
                        {item.label}
                      </MenuItem>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
              <Col offset={1} span={11}>
                <Form.Item name="size">
                  <Select
                    label="Tamanho"
                    fullWidth
                    // multiple={true}
                    value={form.getFieldValue("size")}
                    onChange={(event) =>
                      form.setFieldValue("size", event.target.value)
                    }
                  >
                    {SIZE_ITEMS.map((item) => (
                      <MenuItem
                        key={item.value as string}
                        value={item.value as string}
                        style={{ display: "flex", alignItems: "center" }}
                      >
                        {item.label}
                      </MenuItem>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={16}>
                <Form.Item name="color">
                  <Input
                    label="Cor"
                    placeholder="Ex: #FFFFFF, red"
                    fullWidth
                    maxRows={2}
                    multiline
                  />
                </Form.Item>
              </Col>
              <Col offset={1} span={7}>
                <Form.Item name="price">
                  <Input type="number" label="Preço" fullWidth />
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <Form.Item
                  name="image"
                  valuePropName="fileList"
                  getValueFromEvent={(e) => e?.target?.files}
                >
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={(e) => handleFileUpload(e.target.files!)}
                  />
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Modal>
      </div>
    </>
  );
};

export default Product;
