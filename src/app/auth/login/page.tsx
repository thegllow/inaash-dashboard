import { Link, useNavigate } from "@/lib/i18n/navigation"
import { InaashApiGuest } from "@/services/inaash"
import { handleFormError } from "@/utils/handle-form-errors"
import { LoginSchema } from "@/validation/auth"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button, PasswordInput, Stack, Text, TextInput, Title } from "@mantine/core"
import { Controller, useForm } from "react-hook-form"
import { useTranslation } from "react-i18next"

const Login = () => {
  const { t } = useTranslation()
  const form = useForm({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })
  const { control, formState } = form
  const { errors } = formState

  const navigate = useNavigate()
  const onSubmit = form.handleSubmit(async (data) => {
    try {
      const response = await InaashApiGuest.post("/admin/loginRegisterResendOtp", data)
      console.log("🚀 ~ onSubmit ~ response:", response)
      navigate(`/auth/otp?email=${encodeURI(data.email)}`)
    } catch (error) {
      handleFormError(error, form)
    }
  })

  return (
    <Stack gap={"xl"}>
      <div className="space-y-1 text-center">
        <Title order={2}>{t("login.title")}</Title>
        <Text c="gray.4">{t("login.description")}</Text>
      </div>
      <Stack component={"form"} onSubmit={onSubmit} gap={"lg"}>
        <Controller
          control={control}
          name="email"
          render={({ field }) => {
            return (
              <TextInput
                label={t("login.form.email-label")}
                {...field}
                error={errors.email && t(`login.form.errors.${errors.email.message as "required"}`)}
              />
            )
          }}
        />
        <Controller
          control={control}
          name="password"
          render={({ field }) => {
            return (
              <PasswordInput
                label={t("login.form.password-label")}
                {...field}
                error={errors.password && t(`login.form.errors.${errors.password.message as "required"}`)}
              />
            )
          }}
        />
        <div>
          <Link className="text-sm font-semibold text-primary" to={"/auth/forgot-password"}>
            {t("login.form.forgot-password")}
          </Link>
        </div>
        <Button type="submit" loading={form.formState.isSubmitting} size="lg" color="primary">
          {t("login.form.sign-in-button")}
        </Button>
        {errors.root ? <p className="text-sm font-medium text-red-500">{errors.root.message}</p> : null}
      </Stack>
    </Stack>
  )
}

export default Login
