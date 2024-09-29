import emailjs from "emailjs-com";

export interface SendEmailProps {
  city: string;
  phone: string;
  name: string;
  message: string;
  email: string;
  state: string;
}

export const sendEmail = async (props: SendEmailProps) => {
  const SERVICE_ID = process.env.NEXT_PUBLIC_SERVICE_ID;
  const TEMPLATE_ID = process.env.NEXT_PUBLIC_TEMPLATE_ID;
  const USER_ID = process.env.NEXT_PUBLIC_USER_ID;
  await emailjs.send(
    SERVICE_ID ?? "",
    TEMPLATE_ID ?? "",
    {
      to_email: process.env.NEXT_PUBLIC_TO_EMAIL,
      subject: "Atendimento",
      from_name: props.name,
      body: `A Mensagem é de ${props.name}, da cidade ${props.city} - ${props.state}, telefone: ${props.phone}. Conteudo da mensagem: ${props.message}`,
    },
    USER_ID
  );
};
