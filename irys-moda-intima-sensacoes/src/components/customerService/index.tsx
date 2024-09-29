import { useState, useEffect } from "react";
import { Button, TextField, Grid, Box, CircularProgress } from "@mui/material";
import { useForm, SubmitHandler } from "react-hook-form";
import styles from "@/styles/customService.module.css";
import Script from "next/script";
import axios from "axios";
import { notification } from "antd";
import { sendEmail, SendEmailProps } from "@/util/sendEmail";

interface FormData {
  name: string;
  email: string;
  message: string;
  phone: string;
  city: string;
  state: string;
}

const fetcher = axios.create({
  baseURL: "/api",
});

const CustomService = () => {
  const secretKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [grecaptchaLoaded, setGrecaptchaLoaded] = useState(false);

  useEffect(() => {
    const checkGrecaptcha = () => {
      if (typeof grecaptcha !== "undefined") {
        setGrecaptchaLoaded(true);
      } else {
        console.error("grecaptcha não está disponível.");
      }
    };

    if (typeof window !== "undefined") {
      addEventListener("grecaptchaLoaded", checkGrecaptcha);
    }

    return () => {
      if (typeof window !== "undefined") {
        removeEventListener("grecaptchaLoaded", checkGrecaptcha);
      }
    };
  }, []);

  const onSubmit: SubmitHandler<FormData> = async (formData) => {
    setIsSubmitting(true);

    if (grecaptchaLoaded && grecaptcha) {
      grecaptcha.ready(async () => {
        try {
          const token = await grecaptcha.execute(secretKey, {
            action: "submit",
          });

          const response = await fetcher.post("reCapatchaValidation", {
            token,
          });

          if (response.data.success) {
            const sendEmailData: SendEmailProps = {
              city: formData.city,
              state: formData.state,
              name: formData.name,
              email: formData.email,
              message: formData.message,
              phone: formData.phone,
            };

            await sendEmail(sendEmailData);

            notification.success({
              message: "Mensagem enviada com sucesso!",
            });
          } else {
            notification.error({
              message: "Erro ao enviar os dados!",
            });
            console.error("Falha na verificação");
          }
        } catch (error) {
          notification.error({
            message: "Erro ao enviar os dados!",
          });
          console.error("Erro ao validar o reCAPTCHA", error);
        } finally {
          setIsSubmitting(false);
        }
      });
    } else {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Script
        src={`https://www.google.com/recaptcha/api.js?render=${secretKey}`}
        onLoad={() => {
          if (typeof grecaptcha !== "undefined") {
            setGrecaptchaLoaded(true);
          }
        }}
      />
      <div className={styles.customServiceContainer}>
        <h1 className={styles.title}>Atendimento</h1>
        <p className={styles.text}>
          Se preferir, entre em contato direto através do e-mail
          atendimento@irysmodaintima.com.br.
        </p>

        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          sx={{ mt: 3, maxWidth: "600px", margin: "auto" }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Nome"
                {...register("name", { required: "Nome é obrigatório" })}
                error={!!errors.name}
                helperText={errors.name?.message}
                variant="standard"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="E-mail"
                type="email"
                {...register("email", {
                  required: "E-mail é obrigatório",
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: "E-mail inválido",
                  },
                })}
                error={!!errors.email}
                helperText={errors.email?.message}
                variant="standard"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Telefone"
                {...register("phone", {
                  required: "Telefone é obrigatório",
                  pattern: {
                    value: /^[0-9]+$/,
                    message: "Apenas números são permitidos",
                  },
                })}
                error={!!errors.phone}
                helperText={errors.phone?.message}
                variant="standard"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Cidade"
                {...register("city", { required: "Cidade é obrigatória" })}
                error={!!errors.city}
                helperText={errors.city?.message}
                variant="standard"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Estado"
                {...register("state", { required: "Estado é obrigatório" })}
                error={!!errors.state}
                helperText={errors.state?.message}
                variant="standard"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Mensagem"
                multiline
                rows={4}
                {...register("message", {
                  required: "Mensagem é obrigatória",
                })}
                error={!!errors.message}
                helperText={errors.message?.message}
                variant="standard"
              />
            </Grid>
          </Grid>

          <Box mt={3}>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              disabled={isSubmitting}
              startIcon={isSubmitting && <CircularProgress size={20} />}
            >
              {isSubmitting ? "Enviando..." : "Enviar"}
            </Button>
          </Box>
        </Box>
      </div>
    </>
  );
};

export default CustomService;
