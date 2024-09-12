import { SaveButton } from "@/shared/button/button";
import Head from "next/head";

export default function Home() {

  return (
    <>
      <Head>
        <title>Irys Moda Íntima e Sensações</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/assets/logo/logo.jpg" />
      </Head>
      <div style={{display: "flex", justifyContent: "center"}}><SaveButton /></div>
     OLA
    </>
  );
}
