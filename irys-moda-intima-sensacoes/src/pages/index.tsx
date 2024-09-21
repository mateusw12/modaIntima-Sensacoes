import BaseLayout from "@/components/baseLayout";
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
        <BaseLayout />
      </div>
    </>
  );
}
