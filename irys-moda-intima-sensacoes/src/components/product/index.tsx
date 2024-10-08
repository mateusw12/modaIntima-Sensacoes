import { IProduct } from "@/lib/database/models/product/product";
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
      tamanho: formValue.size
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
          </Form>
        </Modal>
      </div>
    </>
  );
};

export default Product;
