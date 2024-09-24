import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>Irys Moda Íntima e Sensações</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/assets/logo/logo.jpg" />
      </Head>
      <div
        style={{ width: "100%", overflowX: "hidden", boxSizing: "border-box" }}
      >
        <div style={{ padding: "20px" }}>
          <h1>Bem-vindo à Irys Moda Íntima e Sensações!</h1>
          <p>
            Explore nossa coleção de moda íntima e acessórios para todos os
            gostos e estilos.
          </p>
        </div>
      </div>
    </>
  );
}
